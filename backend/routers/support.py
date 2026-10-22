from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from db.database import get_db
from models.user import User
from models.support import FAQ
from models.booking import Booking
from schemas.support import FAQCreate, FAQUpdate, FAQResponse, SupportQueryRequest, SupportQueryResponse
from core.deps import get_current_admin, get_optional_current_user

router = APIRouter(prefix="/support", tags=["Support"])

FALLBACK_ANSWER = (
    "Thank you for contacting FAST CARS Support. "
    "Reach us at support@fastcars.com or call +234 800 FAST CARS."
)
FALLBACK_SUGGESTIONS = ["Check my booking", "Rental requirements", "Payment methods", "Cancellation policy"]


def find_best_faq(query: str, faqs: list) -> Optional[FAQ]:
    words = set(query.split())
    best, best_score = None, 0
    for faq in faqs:
        if query in faq.question.lower():
            return faq
        score = len(words & set(f"{faq.question} {faq.answer} {faq.category}".lower().split()))
        if score > best_score:
            best, best_score = faq, score
    return best if best_score >= 1 else None


@router.get("/faqs", response_model=List[FAQResponse])
def get_faqs(category: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(FAQ)
    if category:
        query = query.filter(FAQ.category.ilike(category))
    return query.order_by(FAQ.id.asc()).all()


@router.get("/faqs/{faq_id}", response_model=FAQResponse)
def get_faq(faq_id: int, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found")
    return faq


@router.post("/ask", response_model=SupportQueryResponse)
def ask_support(
    request: SupportQueryRequest,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
):
    q = request.query.strip().lower()

    # Handle booking-related questions with live user data
    if any(word in q for word in ["booking", "reservation", "check my booking"]):
        if not current_user:
            return SupportQueryResponse(
                query=request.query,
                answer="Please log in to view your reservations. Your full history is on the 'Booking History' page.",
                suggestions=["Log in to account", "How do I book a car?", "Cancellation policy"],
            )
        bookings = db.query(Booking).filter(Booking.user_id == current_user.id).order_by(Booking.created_at.desc()).limit(3).all()
        if not bookings:
            return SupportQueryResponse(
                query=request.query,
                answer=f"Hi {current_user.full_name}, you have no recent bookings. Browse 'Browse Cars' to reserve your next ride!",
                suggestions=["Browse Cars", "Rental requirements", "Pricing & rates"],
            )
        lines = [f"• {b.car.title if b.car else 'Vehicle'} ({b.status}) — {b.from_date.strftime('%d %b %Y')} to {b.to_date.strftime('%d %b %Y')}" for b in bookings]
        return SupportQueryResponse(
            query=request.query,
            answer=f"Your latest bookings, {current_user.full_name}:\n" + "\n".join(lines),
            suggestions=["Modify my reservation", "Return policy", "Contact support"],
        )

    # Match against FAQ knowledgebase
    matched = find_best_faq(q, db.query(FAQ).all())
    if matched:
        return SupportQueryResponse(
            query=request.query,
            answer=matched.answer,
            matched_faq=FAQResponse.model_validate(matched),
            suggestions=["Check my booking", "Rental requirements", "Contact support"],
        )

    return SupportQueryResponse(query=request.query, answer=FALLBACK_ANSWER, suggestions=FALLBACK_SUGGESTIONS)


@router.post("/faqs", response_model=FAQResponse, status_code=status.HTTP_201_CREATED)
def create_faq(faq_in: FAQCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    faq = FAQ(**faq_in.model_dump())
    db.add(faq)
    db.commit()
    db.refresh(faq)
    return faq


@router.put("/faqs/{faq_id}", response_model=FAQResponse)
def update_faq(faq_id: int, faq_in: FAQUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found")
    for field, value in faq_in.model_dump(exclude_unset=True).items():
        setattr(faq, field, value)
    db.commit()
    db.refresh(faq)
    return faq


@router.delete("/faqs/{faq_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_faq(faq_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found")
    db.delete(faq)
    db.commit()
