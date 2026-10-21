import React, { useState } from 'react';
import './SettingsPage.css';

import {
  FiArrowLeft,
  FiBell,
  FiLock,
  FiGlobe,
  FiShield,
  FiHelpCircle,
  FiLogOut,
  FiChevronRight,
  FiDollarSign,
  FiCheckCircle,
  FiX,
  FiHome,
  FiHeart,
  FiClock,
  FiSettings,
  FiRefreshCw
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

export default function SettingsPage({
  onNavigate = () => {},
  wishlist = []
}) {
  const [notifications, setNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [currency, setCurrency] = useState('USD ($)');
  const [distanceUnit, setDistanceUnit] = useState('Miles');
  const [language, setLanguage] = useState('English');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2800);
  };

  return (
    <div className="settings-page-wrapper">
      {/* Top Bar */}
      <header className="settings-top-bar">
        <button
          onClick={() => onNavigate('Home')}
          className="back-icon-btn"
          aria-label="Back to Home"
        >
          <FiArrowLeft size={22} />
        </button>
        <h1 className="settings-heading">Settings</h1>
        <div style={{ width: '38px' }} />
      </header>

      <main className="settings-content">
        {/* User Card */}
        <div className="settings-user-card">
          <div className="user-card-left">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Joy Jenna"
              className="settings-user-avatar"
            />
            <div className="user-card-info">
              <h3>Joy Jenna</h3>
              <p>joy.jenna@gmail.com</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('Profile')}
            className="settings-view-profile-btn"
          >
            Profile
          </button>
        </div>

        {/* Section: Preferences */}
        <div className="settings-section">
          <h2 className="settings-section-title">App Preferences</h2>
          <div className="settings-card">
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-bubble">
                  <FiDollarSign size={18} />
                </div>
                <div>
                  <h4 className="settings-item-title">Currency</h4>
                  <p className="settings-item-desc">Prices displayed across all cars</p>
                </div>
              </div>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  triggerToast(`Currency changed to ${e.target.value}`);
                }}
                className="settings-select"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="NGN (₦)">NGN (₦)</option>
                <option value="CAD ($)">CAD ($)</option>
              </select>
            </div>

            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-bubble bubble-purple">
                  <FiGlobe size={18} />
                </div>
                <div>
                  <h4 className="settings-item-title">Language</h4>
                  <p className="settings-item-desc">Preferred interface language</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  triggerToast(`Language updated to ${e.target.value}`);
                }}
                className="settings-select"
              >
                <option value="English">English (US)</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
              </select>
            </div>

            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-bubble bubble-amber">
                  <FiRefreshCw size={18} />
                </div>
                <div>
                  <h4 className="settings-item-title">Distance Unit</h4>
                  <p className="settings-item-desc">Speedometer and odometer units</p>
                </div>
              </div>
              <select
                value={distanceUnit}
                onChange={(e) => {
                  setDistanceUnit(e.target.value);
                  triggerToast(`Units set to ${e.target.value}`);
                }}
                className="settings-select"
              >
                <option value="Miles">Miles (mph)</option>
                <option value="Kilometers">Kilometers (km/h)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Notifications */}
        <div className="settings-section">
          <h2 className="settings-section-title">Notifications</h2>
          <div className="settings-card">
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-bubble bubble-green">
                  <FiBell size={18} />
                </div>
                <div>
                  <h4 className="settings-item-title">Push Notifications</h4>
                  <p className="settings-item-desc">Updates about active rentals and alerts</p>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-bubble bubble-amber">
                  <FiBell size={18} />
                </div>
                <div>
                  <h4 className="settings-item-title">Special Offers & Deals</h4>
                  <p className="settings-item-desc">Discounts and seasonal promotions</p>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={promoEmails}
                  onChange={(e) => setPromoEmails(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Section: Security */}
        <div className="settings-section">
          <h2 className="settings-section-title">Security & Privacy</h2>
          <div className="settings-card">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="settings-item clickable"
            >
              <div className="settings-item-left">
                <div className="settings-icon-bubble bubble-purple">
                  <FiLock size={18} />
                </div>
                <div>
                  <h4 className="settings-item-title">Change Password</h4>
                  <p className="settings-item-desc">Update security credentials</p>
                </div>
              </div>
              <FiChevronRight size={18} color="#94a3b8" />
            </button>

            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-bubble bubble-green">
                  <FiShield size={18} />
                </div>
                <div>
                  <h4 className="settings-item-title">2-Step Verification</h4>
                  <p className="settings-item-desc">Add extra login security</p>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => {
                    setTwoFactor(e.target.checked);
                    triggerToast(e.target.checked ? '2FA Enabled' : '2FA Disabled');
                  }}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Section: Support */}
        <div className="settings-section">
          <h2 className="settings-section-title">Support & About</h2>
          <div className="settings-card">
            <button
              onClick={() => onNavigate('Support')}
              className="settings-item clickable"
            >
              <div className="settings-item-left">
                <div className="settings-icon-bubble">
                  <FiHelpCircle size={18} />
                </div>
                <div>
                  <h4 className="settings-item-title">Help & Support</h4>
                  <p className="settings-item-desc">FAQs, roadside assistance & contact</p>
                </div>
              </div>
              <FiChevronRight size={18} color="#94a3b8" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => onNavigate('Logout')}
          className="settings-logout-btn"
        >
          <FiLogOut size={18} />
          <span>Log Out of Fast Cars</span>
        </button>

        <p className="app-version-tag">Fast Cars Rental App • Version 2.4.0</p>
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="settings-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="modal-close-icon"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowPasswordModal(false);
                triggerToast('Password updated successfully');
              }}
            >
              <div className="modal-form-group">
                <label>Current Password</label>
                <input type="password" required className="modal-input" placeholder="••••••••" />
              </div>
              <div className="modal-form-group">
                <label>New Password</label>
                <input type="password" required minLength={6} className="modal-input" placeholder="At least 6 characters" />
              </div>
              <button type="submit" className="pill-btn modal-save-btn">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1e293b',
          color: '#ffffff',
          padding: '10px 18px',
          borderRadius: '30px',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: '999',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <FiCheckCircle size={16} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bottom Navigation */}
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
          <button onClick={() => onNavigate('History')} className="nav-tab-btn">
            <FiClock size={20} />
            <span>History</span>
          </button>
          <button onClick={() => onNavigate('Settings')} className="nav-tab-btn tab-active">
            <FiSettings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
