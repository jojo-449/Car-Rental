import React, { useState } from 'react';
import './HistoryPage.css';

// standard icons
import {
  FiArrowLeft,
  FiHome,
  FiHeart,
  FiClock,
  FiSettings
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

export default function HistoryPage({
  onNavigate = () => {},
  bookingHistory = [],
  wishlist = []
}) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // filter bookings
  const filteredHistory = bookingHistory.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  const totalCount = bookingHistory.length;
  const returnedCount = bookingHistory.filter((b) => b.status === 'Returned').length;
  const pendingCount = bookingHistory.filter((b) => b.status === 'Pending' || b.status === 'Active').length;

  return (
    <div className="history-page-wrapper" style={{ paddingBottom: '140px' }}>
      <header className="history-top-bar">
        <button
          onClick={() => onNavigate('Home')}
          className="back-icon-btn"
          aria-label="Back to Home"
        >
          <FiArrowLeft size={22} />
        </button>
        <h1 className="history-heading">Booking History</h1>
        <div style={{ width: '38px' }} />
      </header>

      <main className="history-content">
        {/* filter tabs */}
        <div className="history-tabs-row">
          <button
            onClick={() => setSelectedFilter('All')}
            className={`history-filter-pill ${selectedFilter === 'All' ? 'pill-active' : ''}`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setSelectedFilter('Pending')}
            className={`history-filter-pill ${selectedFilter === 'Pending' ? 'pill-active' : ''}`}
          >
            Active ({pendingCount})
          </button>
          <button
            onClick={() => setSelectedFilter('Returned')}
            className={`history-filter-pill ${selectedFilter === 'Returned' ? 'pill-active' : ''}`}
          >
            Returned ({returnedCount})
          </button>
        </div>

        {/* bookings list */}
        {filteredHistory.length === 0 ? (
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '36px 20px',
            textAlign: 'center',
            color: '#64748b',
            border: '1px solid #e5e9f0',
            marginTop: '16px'
          }}>
            <p style={{ margin: '0 0 12px 0' }}>No bookings found in this category.</p>
            <button
              onClick={() => onNavigate('BrowseCars')}
              className="pill-btn"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              Browse Available Cars
            </button>
          </div>
        ) : (
          <div className="history-items-list">
            {filteredHistory.map((item) => (
              <div key={item.id} className="history-card interactive-card">
                <div className="history-thumbnail">
                  <img src={item.image} alt={item.carName} />
                </div>

                <div className="history-details">
                  <h3 className="history-car-name">{item.carName}</h3>
                  <span className="history-rented-date">Rented: {item.rentedDate}</span>
                </div>

                <span className={`history-status-badge ${item.status === 'Returned' ? 'badge-returned' : 'badge-pending'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* summary statistics bar at bottom matching mockup */}
        <div className="history-summary-stats" style={{ marginBottom: '20px' }}>
          <div className="stat-column">
            <span className="stat-label">Total Cars Rented</span>
            <strong className="stat-number stat-blue">{totalCount}</strong>
          </div>
          <div className="stat-divider" />
          <div className="stat-column">
            <span className="stat-label">Active / Pending</span>
            <strong className="stat-number stat-red">{pendingCount}</strong>
          </div>
          <div className="stat-divider" />
          <div className="stat-column">
            <span className="stat-label">Returned</span>
            <strong className="stat-number stat-green">{returnedCount}</strong>
          </div>
        </div>
      </main>

      {/* bottom navigation bar */}
      <footer className="bottom-nav-bar">
        <div className="bottom-nav-inner">
          <button onClick={() => onNavigate('Home')} className="nav-tab-btn">
            <FiHome size={20} />
            <span>Home</span>
          </button>
          <button onClick={() => onNavigate('Wishlist')} className="nav-tab-btn">
            <div className="tab-icon-wrap">
              <FiHeart size={20} />
              {wishlist.length > 0 && <span className="tab-counter-badge">{wishlist.length}</span>}
            </div>
            <span>Wishlist</span>
          </button>
          <div className="floating-center-tab">
            <button onClick={() => onNavigate('BrowseCars')} className="center-book-circle" aria-label="Book Car">
              <FaCar size={22} />
            </button>
            <span className="center-tab-label">Book</span>
          </div>
          <button onClick={() => onNavigate('History')} className="nav-tab-btn tab-active">
            <FiClock size={20} />
            <span>History</span>
          </button>
          <button onClick={() => onNavigate('Settings')} className="nav-tab-btn">
            <FiSettings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
