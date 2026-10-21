import React, { useState } from 'react';
import './SignUpPage.css';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignUpPage({ onNavigate = () => {} }) {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the Terms of Service to create an account.');
      return;
    }
    // Simulate successful registration and navigate home
    onNavigate('Home');
  };

  return (
    <div className="signup-page-wrapper">
      {/* Hero Visual Card */}
      <div className="signup-hero-banner">
        <div className="signup-brand-header">
          <span className="signup-brand-logo-text">FAST CARS</span>
        </div>
        <div className="signup-hero-text">
          <h1>Start Your<br />Journey</h1>
          <p>Join thousands of drivers experiencing pure luxury & performance.</p>
        </div>
      </div>

      {/* Sign Up Form Card */}
      <div className="signup-form-card">
        <div className="signup-form-header">
          <h2>Create Account</h2>
          <p>Sign up in under 60 seconds to reserve vehicles</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Full Name */}
          <div className="signup-input-group">
            <label className="signup-input-label">Full Name</label>
            <div className="signup-input-wrapper">
              <FiUser size={18} className="signup-input-icon" />
              <input
                type="text"
                placeholder="e.g. Joy Jenna"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="signup-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="signup-input-group">
            <label className="signup-input-label">Email Address</label>
            <div className="signup-input-wrapper">
              <FiMail size={18} className="signup-input-icon" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signup-input"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="signup-input-group">
            <label className="signup-input-label">Phone Number</label>
            <div className="signup-input-wrapper">
              <FiPhone size={18} className="signup-input-icon" />
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="signup-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="signup-input-group">
            <label className="signup-input-label">Password</label>
            <div className="signup-input-wrapper">
              <FiLock size={18} className="signup-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="signup-input"
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

          {/* Terms Agreement */}
          <div className="signup-terms-row">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="signup-checkbox"
            />
            <label htmlFor="terms">
              I agree to Fast Cars Terms of Service, Privacy Policy, and Insurance Agreement.
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="pill-btn signup-submit-btn">
            Create Free Account
          </button>
        </form>

        {/* Login Redirect */}
        <div className="login-redirect-prompt">
          <span>Already have an account? </span>
          <button onClick={() => onNavigate('Login')} className="login-redirect-link">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
