import React, { useState } from 'react';
import './LoginPage.css';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage({ onNavigate = () => {} }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login
    onNavigate('Home');
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
              onClick={() => alert('Password recovery link sent.')}
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
          <button onClick={() => alert('Sign up page coming soon')} className="signup-link">
            Sign Up
          </button>
        </div>

        {/* Bottom Logo */}
        <div className="login-bottom-logo">
          <span className="bottom-logo-name">FAST CARS</span>
        </div>
      </div>
    </div>
  );
}