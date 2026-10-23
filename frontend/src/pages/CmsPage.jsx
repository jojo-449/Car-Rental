import React, { useEffect, useState } from 'react';
import './SupportPage.css';
import { FiArrowLeft } from 'react-icons/fi';
import { pagesApi } from '../api';
import BottomNav from '../components/BottomNav';

export default function CmsPage({ type, onNavigate = () => {}, wishlist = [] }) {
  const [page, setPage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setPage(null);
    setError('');
    pagesApi.get(type).then(setPage).catch((e) => setError(e.message));
  }, [type]);

  return (
    <div className="support-page-wrapper">
      <header className="support-top-bar">
        <button onClick={() => onNavigate('Home')} className="back-icon-btn" aria-label="Back to Home">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="support-heading">{page?.title || 'Loading…'}</h1>
        <div style={{ width: '38px' }} />
      </header>
      <main className="support-content" style={{ paddingBottom: 100 }}>
        <div className="ticket-card">
          {error && <p style={{ color: '#DC2626' }}>{error}</p>}
          {page && (
            <>
              <p style={{ whiteSpace: 'pre-line', lineHeight: 1.7, color: '#334155' }}>{page.content}</p>
              <p style={{ fontSize: 12, color: '#94a3b8' }}>
                Last updated {new Date(page.updated_at).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      </main>
      <BottomNav onNavigate={onNavigate} wishlist={wishlist} />
    </div>
  );
}
