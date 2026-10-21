import React, { useState } from 'react';
import './CarDetailsPage.css';
import { carsData } from '../data/carsData';

import {
  FiArrowLeft,
  FiHeart,
  FiShield,
  FiZap,
  FiActivity,
  FiUsers,
  FiArrowRight,
  FiCompass,
  FiBluetooth,
  FiKey
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

export default function CarDetailsPage({
  car = null,
  onNavigate = () => {},
  wishlist = [],
  onToggleWishlist = () => {},
  onBookCar = () => {}
}) {
  // Use passed car or default to first car in catalog
  const selectedCar = car || carsData[0];

  const [days, setDays] = useState(2);
  const [pickupDate, setPickupDate] = useState('2026-10-22');
  const [returnDate, setReturnDate] = useState('2026-10-24');
  const [protectionPlan, setProtectionPlan] = useState('standard'); // standard or full

  const isSaved = wishlist.includes(selectedCar.id);

  // Compute specs based on car category/brand
  const isSupercar = selectedCar.category === 'Fast Cars' || selectedCar.brand === 'Lamborghini' || selectedCar.brand === 'Ferrari';
  const isExecutive = selectedCar.category === 'Neutral Cars';

  const specs = {
    topSpeed: isSupercar ? '205 mph' : isExecutive ? '155 mph' : '180 mph',
    accel: isSupercar ? '2.9 sec' : isExecutive ? '6.4 sec' : '4.1 sec',
    hp: isSupercar ? '640 HP' : isExecutive ? '255 HP' : '473 HP',
    seats: isSupercar ? '2 Seats' : '5 Seats',
    engine: isSupercar ? '5.2L V10' : isExecutive ? '2.0L Turbo' : '3.0L Twin-Turbo'
  };

  const insuranceDaily = protectionPlan === 'full' ? 35 : 0;
  const baseCost = selectedCar.price * days;
  const insuranceCost = insuranceDaily * days;
  const serviceFee = 25;
  const totalCost = baseCost + insuranceCost + serviceFee;

  const handleBooking = () => {
    const bookingRecord = {
      id: Date.now(),
      carName: selectedCar.name,
      rentedDate: `${pickupDate} to ${returnDate} (${days} days)`,
      status: 'Active',
      image: selectedCar.image,
      totalPaid: totalCost
    };
    onBookCar(selectedCar, bookingRecord);
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
        {/* Car Hero Image Card */}
        <div className="cardetails-hero-image-card">
          <img src={selectedCar.image} alt={selectedCar.name} />
          <span className="cardetails-category-tag">{selectedCar.category}</span>
          <span className="cardetails-brand-pill">{selectedCar.brand}</span>
        </div>

        {/* Main Details & Specs */}
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
              <span className="cardetails-price-num">${selectedCar.price}</span>
              <span className="cardetails-price-unit">per day</span>
            </div>
          </div>

          {/* Performance Specs Grid */}
          <div className="car-specs-grid">
            <div className="spec-box">
              <FiZap size={18} className="spec-icon" />
              <span className="spec-label">0-60 MPH</span>
              <span className="spec-value">{specs.accel}</span>
            </div>
            <div className="spec-box">
              <FiActivity size={18} className="spec-icon" />
              <span className="spec-label">Top Speed</span>
              <span className="spec-value">{specs.topSpeed}</span>
            </div>
            <div className="spec-box">
              <FiZap size={18} className="spec-icon" />
              <span className="spec-label">Power</span>
              <span className="spec-value">{specs.hp}</span>
            </div>
            <div className="spec-box">
              <FiUsers size={18} className="spec-icon" />
              <span className="spec-label">Capacity</span>
              <span className="spec-value">{specs.seats}</span>
            </div>
          </div>

          {/* Highlights & Inclusions */}
          <h3 className="cardetails-section-title">Vehicle Highlights</h3>
          <div className="features-grid">
            <div className="feature-item">
              <FiCompass size={16} color="#3478f6" />
              <span>Built-in GPS Nav</span>
            </div>
            <div className="feature-item">
              <FiBluetooth size={16} color="#3478f6" />
              <span>Apple CarPlay / Auto</span>
            </div>
            <div className="feature-item">
              <FiKey size={16} color="#3478f6" />
              <span>Keyless Push Start</span>
            </div>
            <div className="feature-item">
              <FiShield size={16} color="#3478f6" />
              <span>360 Parking Cameras</span>
            </div>
          </div>
        </div>

        {/* Booking Configuration & Calculator */}
        <div className="booking-config-card">
          <h3 className="cardetails-section-title" style={{ marginTop: 0 }}>Rental Duration & Dates</h3>

          <div className="duration-selector-row">
            <div>
              <strong style={{ fontSize: '14px', display: 'block' }}>Rental Period</strong>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Select number of days</span>
            </div>
            <div className="duration-counter">
              <button
                onClick={() => setDays(Math.max(1, days - 1))}
                className="duration-btn"
                aria-label="Decrease days"
              >
                -
              </button>
              <span className="duration-number">{days} {days === 1 ? 'day' : 'days'}</span>
              <button
                onClick={() => setDays(days + 1)}
                className="duration-btn"
                aria-label="Increase days"
              >
                +
              </button>
            </div>
          </div>

          <div className="booking-dates-row">
            <div className="booking-date-field">
              <label>Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
            <div className="booking-date-field">
              <label>Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>

          {/* Protection Plans */}
          <h3 className="cardetails-section-title">Insurance & Protection</h3>
          <div className="protection-options">
            <div
              className={`protection-card ${protectionPlan === 'standard' ? 'selected' : ''}`}
              onClick={() => setProtectionPlan('standard')}
            >
              <div className="protection-left">
                <input
                  type="radio"
                  name="protection"
                  checked={protectionPlan === 'standard'}
                  onChange={() => setProtectionPlan('standard')}
                  className="protection-radio"
                />
                <div className="protection-info">
                  <h5>Standard Protection</h5>
                  <p>Includes basic liability & 24/7 roadside assistance</p>
                </div>
              </div>
              <span className="protection-price">Included</span>
            </div>

            <div
              className={`protection-card ${protectionPlan === 'full' ? 'selected' : ''}`}
              onClick={() => setProtectionPlan('full')}
            >
              <div className="protection-left">
                <input
                  type="radio"
                  name="protection"
                  checked={protectionPlan === 'full'}
                  onChange={() => setProtectionPlan('full')}
                  className="protection-radio"
                />
                <div className="protection-info">
                  <h5>Full Peace-of-Mind Protection</h5>
                  <p>Zero excess, covers tire/glass damages & scratch waivers</p>
                </div>
              </div>
              <span className="protection-price">+$35 / day</span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="price-breakdown">
            <div className="price-row">
              <span>Car Rental (${selectedCar.price} × {days} days)</span>
              <strong>${baseCost}</strong>
            </div>
            {insuranceCost > 0 && (
              <div className="price-row">
                <span>Full Protection ($35 × {days} days)</span>
                <strong>+${insuranceCost}</strong>
              </div>
            )}
            <div className="price-row">
              <span>Standard Concierge & Cleaning Fee</span>
              <strong>+${serviceFee}</strong>
            </div>
            <div className="price-row total">
              <span>Estimated Total Amount</span>
              <strong style={{ color: '#3478f6', fontSize: '18px' }}>${totalCost}</strong>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Sticky Bottom Bar */}
      <footer className="cardetails-sticky-bar">
        <div className="sticky-bar-inner">
          <div className="sticky-price-group">
            <h4>${totalCost}</h4>
            <span>Total for {days} {days === 1 ? 'day' : 'days'}</span>
          </div>
          <button
            onClick={handleBooking}
            className="pill-btn confirm-booking-btn"
          >
            <span>Confirm & Reserve</span>
            <FiArrowRight size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
}
