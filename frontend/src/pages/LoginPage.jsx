import React, { useState } from 'react';
import './LoginPage.css';
import { authApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast, ToastView } from '../components/Toast';
import { FiUser, FiLock, FiEye, FiEyeOff, FiX, FiArrowLeft } from 'react-icons/fi';

export default function LoginPage({ onNavigate = () => {}, onLoggedIn = () => {} }) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotPassword, setForgotPassword] = useState('');
  const [toastMessage, triggerToast] = useToast(3500);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const user = await login(email, password);
      onLoggedIn(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      await authApi.recover({ email: forgotEmail, phone_number: forgotPhone, new_password: forgotPassword });
      setShowForgotModal(false);
      setEmail(forgotEmail);
      setForgotPhone('');
      setForgotPassword('');
      triggerToast('Password reset. You can now log in.');
    } catch (err) {
      triggerToast(err.message);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Hero Visual Card */}
      <div className="login-hero-banner">
        <div className="login-brand-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={() => onNavigate('Home')}
            aria-label="Back to Home"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.18)', color: '#fff', cursor: 'pointer' }}
          >
            <FiArrowLeft size={20} />
          </button>
          <span className="login-brand-logo-text">FAST CARS</span>
        </div>
        <div className="login-hero-text">
          <h1>Drive Your<br />Dreams</h1>
          <p>Premium cars. Great rates.<br />Unforgettable journeys.</p>
        </div>
      </div>

      {/* Login Card Form */}
      <div className="login-form-card">
        <div className="login-form-header">
          <h2>Welcome Back</h2>
          <p>Log in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="login-input-group">
            <label className="login-input-label">Email address</label>
            <div className="login-input-wrapper">
              <FiUser size={18} className="login-input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="login-input-group">
            <label className="login-input-label">Password</label>
            <div className="login-input-wrapper">
              <FiLock size={18} className="login-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="login-options-row">
            <span />
            <button
              type="button"
              onClick={() => {
                setForgotEmail(email);
                setShowForgotModal(true);
              }}
              className="forgot-password-link"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          {error && <p role="alert" style={{ color: '#DC2626', fontSize: 13, margin: '0 0 10px' }}>{error}</p>}
          <button type="submit" disabled={submitting} className="login-submit-btn pill-btn">
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        {/* Sign up prompt */}
        <div className="signup-prompt">
          <span>Don't have an account? </span>
          <button onClick={() => onNavigate('SignUp')} className="signup-link">
            Sign Up
          </button>
        </div>

        {/* Bottom Logo */}
        <div className="login-bottom-logo">
          <span className="bottom-logo-name">FAST CARS</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="settings-modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>Reset Password</h3>
              <button
                onClick={() => setShowForgotModal(false)}
                className="modal-close-icon"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
              Confirm your registered email and phone number, then choose a new password.
            </p>
            <form onSubmit={handleForgotSubmit}>
              <div className="modal-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  className="modal-input"
                  placeholder="name@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>
              <div className="modal-form-group">
                <label>Registered Phone Number</label>
                <input type="tel" required className="modal-input" placeholder="+234 801 234 5678" value={forgotPhone} onChange={(e) => setForgotPhone(e.target.value)} />
              </div>
              <div className="modal-form-group">
                <label>New Password</label>
                <input type="password" required minLength={8} className="modal-input" placeholder="At least 8 characters" value={forgotPassword} onChange={(e) => setForgotPassword(e.target.value)} />
              </div>
              <button type="submit" className="pill-btn modal-save-btn">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastView message={toastMessage} />
    </div>
  );
}
