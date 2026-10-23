import math
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from db.database import get_db
from models.user import User
from models.car import Car
from models.booking import Booking
from schemas.booking import BookingCreate, BookingStatusUpdate, BookingResponse
from core.deps import get_current_user, get_current_admin

router = APIRouter(prefix="/bookings", tags=["Bookings"])


def get_or_404(db, booking_id) -> Booking:
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    return booking


@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(booking_in: BookingCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == booking_in.car_id).first()
    if not car:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Car not found")
    if not car.is_available:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This car is currently unavailable")
    if booking_in.to_date < booking_in.from_date:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Return date cannot be before start date")

    overlap = (
        db.query(Booking)
        .filter(
            Booking.car_id == car.id,
            Booking.status.notin_(["Cancelled", "Returned"]),
            Booking.from_date < booking_in.to_date,
            Booking.to_date > booking_in.from_date,
        )
        .first()
    )
    if overlap:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This car is already booked for the selected dates")

    rental_days = max(1, math.ceil((booking_in.to_date - booking_in.from_date).total_seconds() / 86400))
    booking = Booking(
        user_id=current_user.id,
        car_id=car.id,
        from_date=booking_in.from_date,
        to_date=booking_in.to_date,
        message=booking_in.message,
        total_cost=rental_days * car.price_per_day,
        status="Pending",
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.get("/my-history")
def get_user_booking_history(
    status_filter: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_bookings = db.query(Booking).filter(Booking.user_id == current_user.id)
    query = user_bookings
    if status_filter and status_filter.lower() != "all":
        query = query.filter(Booking.status.ilike(status_filter))

    return {
        "metrics": {
            "total_rented": user_bookings.count(),
            "returned": user_bookings.filter(Booking.status.ilike("Returned")).count(),
            "yet_to_return": user_bookings.filter(Booking.status.in_(["Confirmed", "Active"])).count(),
            "pending": user_bookings.filter(Booking.status.ilike("Pending")).count(),
        },
        "bookings": [BookingResponse.model_validate(b) for b in query.order_by(Booking.created_at.desc()).all()],
    }


@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking(booking_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = get_or_404(db, booking_id)
    if not current_user.is_admin and booking.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    return booking


@router.put("/{booking_id}/cancel", response_model=BookingResponse)
def cancel_booking(booking_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = get_or_404(db, booking_id)
    if not current_user.is_admin and booking.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    if booking.status in ["Cancelled", "Returned"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Booking is already {booking.status}")
    booking.status = "Cancelled"
    db.commit()
    db.refresh(booking)
    return booking


@router.get("/admin/all", response_model=List[BookingResponse])
def get_all_bookings_admin(status_filter: Optional[str] = Query(None), db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    query = db.query(Booking)
    if status_filter:
        query = query.filter(Booking.status.ilike(status_filter))
    return query.order_by(Booking.created_at.desc()).all()


@router.put("/admin/{booking_id}/status", response_model=BookingResponse)
def update_booking_status(booking_id: int, status_update: BookingStatusUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    booking = get_or_404(db, booking_id)
    booking.status = status_update.status
    db.commit()
    db.refresh(booking)
    return booking
