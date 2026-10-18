import React, { useState } from 'react';
import './HistoryPage.css';

// standard icons
import { FiArrowLeft } from 'react-icons/fi';

export default function HistoryPage({
  onNavigate = () => {},
  bookingHistory = []
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
    <div className="history-page-wrapper">
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
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setSelectedFilter('Returned')}
            className={`history-filter-pill ${selectedFilter === 'Returned' ? 'pill-active' : ''}`}
          >
            Returned ({returnedCount})
          </button>
        </div>

        {/* bookings list */}
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

        {/* summary statistics bar at bottom matching mockup */}
        <div className="history-summary-stats">
          <div className="stat-column">
            <span className="stat-label">Total Cars Rented</span>
            <strong className="stat-number stat-blue">{totalCount}</strong>
          </div>
          <div className="stat-divider" />
          <div className="stat-column">
            <span className="stat-label">Yet to Return</span>
            <strong className="stat-number stat-red">{pendingCount}</strong>
          </div>
          <div className="stat-divider" />
          <div className="stat-column">
            <span className="stat-label">Returned</span>
            <strong className="stat-number stat-green">{returnedCount}</strong>
          </div>
        </div>
      </main>
    </div>
  );
}