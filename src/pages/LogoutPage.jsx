import React from 'react';
import './LogoutPage.css';
import { FiX, FiLogOut, FiHome, FiHeart, FiClock, FiSettings } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

export default function LogoutPage({ onNavigate = () => {}, onConfirmLogout = () => {} }) {
  return (
    <div className="logout-page-wrapper">
      {/* Top Header */}
      <header className="logout-top-bar">
        <span className="logout-brand-title">FAST CARS</span>
        <button onClick={() => onNavigate('Home')} className="logout-close-btn" aria-label="Cancel">
          <FiX size={22} />
        </button>
      </header>

      {/* Main Confirmation Content */}
      <main className="logout-content">
        <div className="logout-card">
          <div className="logout-icon-circle">
            <FiLogOut size={36} color="#3478F6" />
          </div>

          <h2 className="logout-title">Log Out</h2>
          <p className="logout-question">Are you sure you want to log out of your account?</p>

          <div className="logout-actions-group">
            <button
              onClick={() => {
                onConfirmLogout();
                onNavigate('Login');
              }}
              className="logout-confirm-btn pill-btn"
            >
              Log Out
            </button>

            <button
              onClick={() => onNavigate('Home')}
              className="logout-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Nav Bar */}
      <footer className="bottom-nav-bar">
        <div className="bottom-nav-inner">
          <button onClick={() => onNavigate('Home')} className="nav-tab-btn">
            <FiHome size={20} />
            <span>Home</span>
          </button>
          <button onClick={() => onNavigate('Wishlist')} className="nav-tab-btn">
            <FiHeart size={20} />
            <span>Wishlist</span>
          </button>
          <div className="floating-center-tab">
            <button onClick={() => onNavigate('BrowseCars')} className="center-book-circle" aria-label="Book Car">
              <FaCar size={22} />
            </button>
            <span className="center-tab-label">Book</span>
          </div>
          <button onClick={() => onNavigate('History')} className="nav-tab-btn">
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