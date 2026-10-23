import React from 'react';
import { FiHome, FiHeart, FiClock, FiSettings } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

export default function BottomNav({ onNavigate, wishlist = [], active = '' }) {
  const tab = (name) => `nav-tab-btn ${active === name ? 'tab-active' : ''}`;
  return (
    <footer className="bottom-nav-bar">
      <div className="bottom-nav-inner">
        <button onClick={() => onNavigate('Home')} className={tab('Home')}>
          <FiHome size={20} />
          <span>Home</span>
        </button>
        <button onClick={() => onNavigate('Wishlist')} className={tab('Wishlist')}>
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
        <button onClick={() => onNavigate('History')} className={tab('History')}>
          <FiClock size={20} />
          <span>History</span>
        </button>
        <button onClick={() => onNavigate('Settings')} className={tab('Settings')}>
          <FiSettings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </footer>
  );
}
