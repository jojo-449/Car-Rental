import React, { useState } from 'react';
import './SettingsPage.css';
import { authApi } from '../api';
import { assetUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast, ToastView } from '../components/Toast';

import {
  FiArrowLeft,
  FiLock,
  FiShield,
  FiHelpCircle,
  FiLogOut,
  FiChevronRight,
  FiX,
  FiHome,
  FiHeart,
  FiClock,
  FiSettings
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

export default function SettingsPage({
  onNavigate = () => {},
  wishlist = []
}) {
  const { user } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [toastMessage, triggerToast] = useToast(2800);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await authApi.changePassword(oldPassword, newPassword);
      setShowPasswordModal(false);
      setOldPassword('');
      setNewPassword('');
      triggerToast('Password updated successfully');
    } catch (err) {
      triggerToast(err.message);
    }
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
            {user.avatar_url ? (
              <img src={assetUrl(user.avatar_url)} alt={user.full_name} className="settings-user-avatar" />
            ) : (
              <div className="settings-user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#3478F6', color: '#fff', fontWeight: 700 }}>
                {user.full_name?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="user-card-info">
              <h3>{user.full_name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('Profile')}
            className="settings-view-profile-btn"
          >
            Profile
          </button>
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
            {[
              ['Contact Us', 'Send us an enquiry', () => onNavigate('Contact')],
              ['Testimonials', 'Read and share customer reviews', () => onNavigate('Testimonials')],
              ['About Us', 'Who we are', () => onNavigate('Page', { type: 'aboutus' })],
              ['Terms & Conditions', 'Rental terms', () => onNavigate('Page', { type: 'terms' })],
              ['Privacy Policy', 'How we handle your data', () => onNavigate('Page', { type: 'privacy' })],
            ].map(([title, desc, go]) => (
              <button key={title} onClick={go} className="settings-item clickable">
                <div className="settings-item-left">
                  <div className="settings-icon-bubble bubble-purple">
                    <FiShield size={18} />
                  </div>
                  <div>
                    <h4 className="settings-item-title">{title}</h4>
                    <p className="settings-item-desc">{desc}</p>
                  </div>
                </div>
                <FiChevronRight size={18} color="#94a3b8" />
              </button>
            ))}
          </div>
        </div>

        {user.is_admin && (
          <button onClick={() => onNavigate('Admin')} className="settings-logout-btn" style={{ marginBottom: 12 }}>
            <FiShield size={18} />
            <span>Open Admin Panel</span>
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={() => onNavigate('Logout')}
          className="settings-logout-btn"
        >
          <FiLogOut size={18} />
          <span>Log Out of Fast Cars</span>
        </button>

        <p className="app-version-tag">Fast Cars Rental App</p>
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
            <form onSubmit={handlePasswordChange}>
              <div className="modal-form-group">
                <label>Current Password</label>
                <input type="password" required className="modal-input" placeholder="••••••••" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className="modal-form-group">
                <label>New Password</label>
                <input type="password" required minLength={8} className="modal-input" placeholder="At least 8 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <button type="submit" className="pill-btn modal-save-btn">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastView message={toastMessage} />

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
