import React, { useRef, useState } from 'react';
import './ProfilePage.css';
import { authApi } from '../api';
import { uploadImage, assetUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/cars';
import { useToast, ToastView } from '../components/Toast';

// standard react-icons
import {
  FiArrowLeft,
  FiEdit3,
  FiCheck,
  FiX,
  FiHome,
  FiHeart,
  FiClock,
  FiSettings
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

export default function ProfilePage({
  onNavigate = () => {},
  wishlist = []
}) {
  const { user: account, setUser: setAccount } = useAuth();
  const user = {
    name: account.full_name,
    email: account.email,
    phone: account.phone_number || '',
    country: account.country || '',
    memberSince: formatDate(account.created_at),
    avatar: assetUrl(account.avatar_url),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [toastMessage, triggerToast] = useToast(2500);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await authApi.updateProfile({
        full_name: formData.name,
        phone_number: formData.phone,
        country: formData.country,
      });
      setAccount(updated);
      setIsEditing(false);
      triggerToast('Profile updated successfully');
    } catch (err) {
      triggerToast(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadImage(file, 'avatars');
      const updated = await authApi.updateProfile({ avatar_url: url });
      setAccount(updated);
      triggerToast('Profile photo updated');
    } catch (err) {
      triggerToast(err.message);
    }
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
        <div style={{ width: '38px' }} />
      </header>

      <main className="profile-content" style={{ paddingBottom: '90px' }}>
        {/* avatar and user card */}
        <div className="profile-header-card">
          <div className="avatar-wrapper">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#3478F6', color: '#fff', fontSize: 36, fontWeight: 700 }}>
                {user.name?.[0]?.toUpperCase()}
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatar} />
            <div className="verified-badge" title="Verified Customer">
              <FiCheck size={12} color="#ffffff" />
            </div>
          </div>

          <h2 className="profile-user-name">{user.name}</h2>
          <p className="profile-user-email">{user.email}</p>

          <button
            onClick={() => fileRef.current?.click()}
            style={{ background: 'none', border: 'none', color: '#3478F6', fontSize: 13, cursor: 'pointer', marginBottom: 8 }}
          >
            Change photo
          </button>

          <button
            onClick={() => {
              setFormData({ ...user });
              setIsEditing(true);
            }}
            className="edit-profile-btn pill-btn"
          >
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

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="settings-modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="modal-close-icon"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="modal-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  disabled
                  title="Email cannot be changed"
                  className="modal-input"
                  value={formData.email}
                  onChange={() => {}}
                />
              </div>

              <div className="modal-form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  required
                  className="modal-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="modal-form-group">
                <label>Country</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>

              <button type="submit" disabled={saving} className="pill-btn modal-save-btn">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastView message={toastMessage} />

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
