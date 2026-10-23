import React, { useEffect, useState } from 'react';
import './SupportPage.css';
import { FiArrowLeft } from 'react-icons/fi';
import { contactApi, pagesApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast, ToastView } from '../components/Toast';
import BottomNav from '../components/BottomNav';

export default function ContactPage({ onNavigate = () => {}, wishlist = [] }) {
  const { user } = useAuth();
  const [info, setInfo] = useState(null);
  const [name, setName] = useState(user?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone_number || '');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [toastMessage, showToast] = useToast(3500);

  useEffect(() => {
    pagesApi.get('contactinfo').then(setInfo).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await contactApi.send({ name, email, phone_number: phone || null, message });
      setMessage('');
      showToast('Message sent. We will get back to you shortly.');
    } catch (err) {
      showToast(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="support-page-wrapper">
      <header className="support-top-bar">
        <button onClick={() => onNavigate('Home')} className="back-icon-btn" aria-label="Back to Home">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="support-heading">Contact Us</h1>
        <div style={{ width: '38px' }} />
      </header>
      <main className="support-content" style={{ paddingBottom: 100 }}>
        {info && (
          <div className="ticket-card" style={{ marginBottom: 16 }}>
            <h3>{info.title}</h3>
            <p style={{ whiteSpace: 'pre-line', color: '#334155', lineHeight: 1.6 }}>{info.content}</p>
          </div>
        )}
        <div className="ticket-card">
          <h3>Send us an enquiry</h3>
          <form onSubmit={submit}>
            <div className="ticket-form-group">
              <label>Name</label>
              <input className="ticket-select" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="ticket-form-group">
              <label>Email</label>
              <input className="ticket-select" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="ticket-form-group">
              <label>Phone (optional)</label>
              <input className="ticket-select" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="ticket-form-group">
              <label>Message</label>
              <textarea className="ticket-textarea" required value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button type="submit" disabled={sending} className="pill-btn ticket-submit-btn">
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </main>
      <ToastView message={toastMessage} />
      <BottomNav onNavigate={onNavigate} wishlist={wishlist} />
    </div>
  );
}
