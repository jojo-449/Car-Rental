import React, { useState } from 'react';
import './LoginPage.css';
import { FiUser, FiLock, FiEye, FiEyeOff, FiX, FiCheckCircle } from 'react-icons/fi';

export default function LoginPage({ onNavigate = () => {} }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login
    onNavigate('Home');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setShowForgotModal(false);
    triggerToast(`Password reset link sent to ${forgotEmail}`);
    setForgotEmail('');
  };

  return (
    <div className="login-page-wrapper">
      {/* Hero Visual Card */}
      <div className="login-hero-banner">
        <div className="login-brand-header">
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
            <label className="remember-me-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="remember-checkbox"
              />
              <span>Remember me</span>
            </label>
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
          <button type="submit" className="login-submit-btn pill-btn">
            Log In
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
              Enter your email address and we will send you a secure link to reset your account password.
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
              <button type="submit" className="pill-btn modal-save-btn">
                Send Reset Link
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
    </div>
  );
}
