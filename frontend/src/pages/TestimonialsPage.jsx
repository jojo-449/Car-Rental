import React, { useEffect, useState } from 'react';
import './SupportPage.css';
import { FiArrowLeft } from 'react-icons/fi';
import { testimonialsApi } from '../api';
import { assetUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast, ToastView } from '../components/Toast';
import BottomNav from '../components/BottomNav';

export default function TestimonialsPage({ onNavigate = () => {}, wishlist = [] }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [toastMessage, showToast] = useToast(3500);

  useEffect(() => {
    testimonialsApi.list().then(setItems).catch((e) => showToast(e.message));
  }, [showToast]);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await testimonialsApi.create(content);
      setContent('');
      showToast('Thanks! Your testimonial will appear once approved.');
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
        <h1 className="support-heading">Testimonials</h1>
        <div style={{ width: '38px' }} />
      </header>
      <main className="support-content" style={{ paddingBottom: 100 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          {items.length === 0 && <p style={{ textAlign: 'center', color: '#64748b' }}>No testimonials yet.</p>}
          {items.map((t) => (
            <div key={t.id} className="ticket-card" style={{ margin: 0 }}>
              <p style={{ margin: '0 0 10px', lineHeight: 1.6 }}>“{t.content}”</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {t.user?.avatar_url && (
                  <img src={assetUrl(t.user.avatar_url)} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                )}
                <strong style={{ fontSize: 13 }}>{t.user?.full_name || 'Customer'}</strong>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{new Date(t.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="ticket-card" style={{ marginTop: 20 }}>
          <h3>Share your experience</h3>
          {user ? (
            <form onSubmit={submit}>
              <div className="ticket-form-group">
                <textarea className="ticket-textarea" required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tell others about your rental…" />
              </div>
              <button type="submit" disabled={sending} className="pill-btn ticket-submit-btn">
                {sending ? 'Posting…' : 'Post Testimonial'}
              </button>
            </form>
          ) : (
            <button className="pill-btn ticket-submit-btn" onClick={() => onNavigate('Login')}>
              Log in to post a testimonial
            </button>
          )}
        </div>
      </main>
      <ToastView message={toastMessage} />
      <BottomNav onNavigate={onNavigate} wishlist={wishlist} />
    </div>
  );
}
