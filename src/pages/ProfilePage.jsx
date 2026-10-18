import React from 'react';
import './ProfilePage.css';

// standard react-icons
import { FiArrowLeft, FiEdit3, FiCheck } from 'react-icons/fi';

export default function ProfilePage({ onNavigate = () => {} }) {
  // static profile data directly from the mockup
  const user = {
    name: 'Joy Jenna',
    email: 'joy.jenna@gmail.com',
    phone: '+234 801 234 5678',
    country: 'Nigeria',
    memberSince: '12 Jan 2025',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  };

  return (
    <div className="profile-page-wrapper">
      {/* top bar with back arrow */}
      <header className="profile-top-bar">
        <button
          onClick={() => onNavigate('Home')}
          className="back-icon-btn"
          aria-label="Back to Home"
        >
          <FiArrowLeft size={22} />
        </button>
        <h1 className="profile-page-heading">My Profile</h1>
        <div style={{ width: '38px' }} /> {/* keeps title centered */}
      </header>

      <main className="profile-content">
        {/* avatar and user card */}
        <div className="profile-header-card">
          <div className="avatar-wrapper">
            <img src={user.avatar} alt={user.name} className="profile-avatar-img" />
            <div className="verified-badge" title="Verified Customer">
              <FiCheck size={12} color="#ffffff" />
            </div>
          </div>

          <h2 className="profile-user-name">{user.name}</h2>
          <p className="profile-user-email">{user.email}</p>

          <button className="edit-profile-btn pill-btn">
            <FiEdit3 size={15} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* account details table */}
        <div className="account-details-card">
          <h3 className="section-subtitle">Account Details</h3>

          <div className="details-list">
            <div className="detail-item">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{user.name}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{user.email}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">{user.phone}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Country</span>
              <span className="detail-value">{user.country}</span>
            </div>

            <div className="detail-item last-item">
              <span className="detail-label">Member Since</span>
              <span className="detail-value">{user.memberSince}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}