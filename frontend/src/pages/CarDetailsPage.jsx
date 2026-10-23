import React, { useEffect, useState } from 'react';
import './CarDetailsPage.css';
import { carsApi, bookingsApi } from '../api';
import { adaptCar, formatMoney, FEATURES } from '../utils/cars';
import { useAuth } from '../context/AuthContext';
import { useToast, ToastView } from '../components/Toast';

import { FiArrowLeft, FiHeart, FiZap, FiUsers, FiArrowRight, FiCalendar, FiCheck, FiX } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const isoDay = (d) => d.toISOString().slice(0, 10);
const dayOffset = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return isoDay(d);
};

export default function CarDetailsPage({
  carId,
  onNavigate = () => {},
  wishlist = [],
  onToggleWishlist = () => {},
  onBooked = () => {}
}) {
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [pickupDate, setPickupDate] = useState(dayOffset(1));
  const [returnDate, setReturnDate] = useState(dayOffset(3));
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, showToast] = useToast(4000);

  useEffect(() => {
    carsApi
      .get(carId)
      .then((c) => setCar(adaptCar(c)))
      .catch((e) => setLoadError(e.message));
  }, [carId]);

  if (loadError) {
    return (
      <div className="cardetails-page-wrapper">
        <main className="cardetails-content" style={{ textAlign: 'center', paddingTop: 80 }}>
          <p>{loadError}</p>
          <button className="pill-btn" onClick={() => onNavigate('BrowseCars')} style={{ padding: '10px 20px' }}>
            Browse Cars
          </button>
        </main>
      </div>
    );
  }
  if (!car) {
    return <div className="cardetails-page-wrapper"><p style={{ textAlign: 'center', paddingTop: 80 }}>Loading…</p></div>;
  }

  const selectedCar = car;
  const raw = car.raw;
  const isSaved = wishlist.includes(selectedCar.id);

  const from = new Date(pickupDate);
  const to = new Date(returnDate);
  const validDates = !isNaN(from) && !isNaN(to) && to >= from;
  const days = validDates ? Math.max(1, Math.ceil((to - from) / 86400000)) : 0;
  const totalCost = days * selectedCar.price;

  const handleBooking = async () => {
    if (!user) {
      onNavigate('Login');
      return;
    }
    if (!validDates) {
      showToast('Return date cannot be before the pickup date');
      return;
    }
    setSubmitting(true);
    try {
      await bookingsApi.create({
        car_id: selectedCar.id,
        from_date: `${pickupDate}T00:00:00`,
        to_date: `${returnDate}T00:00:00`,
        message: message || null,
      });
      onBooked();
    } catch (e) {
      showToast(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cardetails-page-wrapper">
      {/* Top Header Bar */}
      <header className="cardetails-top-bar">
        <button
          onClick={() => onNavigate('BrowseCars')}
          className="back-icon-btn"
          aria-label="Back"
        >
          <FiArrowLeft size={22} />
        </button>
        <h1 className="cardetails-heading">{selectedCar.name}</h1>
        <button
          onClick={() => onToggleWishlist(selectedCar.id)}
          className={`card-wishlist-btn ${isSaved ? 'saved' : ''}`}
          style={{ position: 'static', width: '38px', height: '38px' }}
          aria-label="Save to Wishlist"
        >
          {isSaved ? <FaHeart size={18} color="#FF4B55" /> : <FiHeart size={18} color="#64748B" />}
        </button>
      </header>

      <main className="cardetails-content">
        <div className="cardetails-hero-image-card">
          <img src={selectedCar.image} alt={selectedCar.name} />
          {selectedCar.category && <span className="cardetails-category-tag">{selectedCar.category}</span>}
          <span className="cardetails-brand-pill">{selectedCar.brand}</span>
        </div>

        <div className="cardetails-main-card">
          <div className="car-header-row">
            <div>
              <h1>{selectedCar.name}</h1>
              <div className="car-tags-row">
                {selectedCar.tags.map((t) => (
                  <span key={t.label} className={`pill-badge ${t.type}`}>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="cardetails-price-badge">
              <span className="cardetails-price-num">{formatMoney(selectedCar.price)}</span>
              <span className="cardetails-price-unit">per day</span>
            </div>
          </div>

          <div className="car-specs-grid">
            <div className="spec-box">
              <FiZap size={18} className="spec-icon" />
              <span className="spec-label">Fuel</span>
              <span className="spec-value">{raw.fuel_type}</span>
            </div>
            <div className="spec-box">
              <FiCalendar size={18} className="spec-icon" />
              <span className="spec-label">Model Year</span>
              <span className="spec-value">{raw.model_year}</span>
            </div>
            <div className="spec-box">
              <FiZap size={18} className="spec-icon" />
              <span className="spec-label">Transmission</span>
              <span className="spec-value">{raw.transmission}</span>
            </div>
            <div className="spec-box">
              <FiUsers size={18} className="spec-icon" />
              <span className="spec-label">Capacity</span>
              <span className="spec-value">{raw.seating_capacity} Seats</span>
            </div>
          </div>

          {raw.overview && (
            <>
              <h3 className="cardetails-section-title">Overview</h3>
              <p style={{ margin: 0, color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{raw.overview}</p>
            </>
          )}

          <h3 className="cardetails-section-title">Accessories & Features</h3>
          <div className="features-grid">
            {FEATURES.map(([key, label]) => (
              <div key={key} className="feature-item" style={raw[key] ? undefined : { opacity: 0.45 }}>
                {raw[key] ? <FiCheck size={16} color="#10B981" /> : <FiX size={16} color="#94A3B8" />}
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="booking-config-card">
          <h3 className="cardetails-section-title" style={{ marginTop: 0 }}>Rental Dates</h3>

          <div className="booking-dates-row">
            <div className="booking-date-field">
              <label>Pickup Date</label>
              <input
                type="date"
                min={isoDay(new Date())}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
            <div className="booking-date-field">
              <label>Return Date</label>
              <input
                type="date"
                min={pickupDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>

          <div className="booking-date-field" style={{ marginTop: 12 }}>
            <label>Message (optional)</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Pickup time, special requests…"
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #E2E8F0', font: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Car Rental ({formatMoney(selectedCar.price)} × {days} {days === 1 ? 'day' : 'days'})</span>
              <strong>{formatMoney(totalCost)}</strong>
            </div>
            <div className="price-row total">
              <span>Total Amount</span>
              <strong style={{ color: '#3478f6', fontSize: '18px' }}>{formatMoney(totalCost)}</strong>
            </div>
          </div>
        </div>
      </main>

      <footer className="cardetails-sticky-bar">
        <div className="sticky-bar-inner">
          <div className="sticky-price-group">
            <h4>{formatMoney(totalCost)}</h4>
            <span>Total for {days} {days === 1 ? 'day' : 'days'}</span>
          </div>
          <button
            onClick={handleBooking}
            disabled={submitting || !raw.is_available}
            className="pill-btn confirm-booking-btn"
          >
            <span>{!raw.is_available ? 'Unavailable' : user ? (submitting ? 'Reserving…' : 'Confirm & Reserve') : 'Log in to Reserve'}</span>
            <FiArrowRight size={17} />
          </button>
        </div>
      </footer>
      <ToastView message={toastMessage} />
    </div>
  );
}
