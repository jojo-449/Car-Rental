import React, { useState } from 'react';
import './SupportPage.css';

import {
  FiArrowLeft,
  FiPhoneCall,
  FiMessageSquare,
  FiMail,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiCheckCircle,
  FiX,
  FiSend,
  FiHome,
  FiHeart,
  FiClock,
  FiSettings
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

export default function SupportPage({
  onNavigate = () => {},
  wishlist = []
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am Fast Cars Virtual Assistant. How can I assist you with your rental today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Ticket form state
  const [ticketSubject, setTicketSubject] = useState('General Inquiry');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      q: 'What are the requirements to rent a car?',
      a: 'To rent a vehicle with Fast Cars, you must be at least 21 years old (25 for supercars like Lamborghini or McLaren), hold a valid driving license for at least 1 year, and provide a valid credit/debit card for security verification.'
    },
    {
      q: 'What is included in the rental price?',
      a: 'All rentals include standard third-party liability insurance, 24/7 roadside assistance, standard mileage allowance (200 miles/day), and complete vehicle cleaning prior to delivery.'
    },
    {
      q: 'Can I cancel or modify my booking?',
      a: 'Yes, cancellations made up to 24 hours before your scheduled pickup receive a 100% full refund with zero fees. You can view your current bookings in the History tab.'
    },
    {
      q: 'How does vehicle pickup and return work?',
      a: 'You can choose between contactless express pickup at any of our airport or city hubs, or request VIP doorstep delivery directly to your home or hotel.'
    },
    {
      q: 'What happens if I experience a mechanical breakdown or flat tire?',
      a: 'Every Fast Cars booking comes with complimentary 24/7 roadside assistance. Tap the red "Call Assistance" button at the top of this page to reach our dispatch team instantly.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    // Simulated reply
    setTimeout(() => {
      let botResponse = 'Thank you for reaching out! Our rental concierge has received your inquiry and is checking available options for you.';
      if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
        botResponse = 'Our daily rates start from $48/day for standard sedans up to $1,850/day for exotic supercars, with transparent pricing and no hidden fees!';
      } else if (userText.toLowerCase().includes('license') || userText.toLowerCase().includes('age')) {
        botResponse = 'You must be at least 21 years old with a valid driving license. Supercars require drivers to be 25+.';
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
    triggerToast('Support ticket #FC-' + Math.floor(1000 + Math.random() * 9000) + ' created successfully!');
    setTimeout(() => {
      setTicketMessage('');
      setTicketSubmitted(false);
    }, 2500);
  };

  return (
    <div className="support-page-wrapper">
      {/* Top Bar */}
      <header className="support-top-bar">
        <button
          onClick={() => onNavigate('Home')}
          className="back-icon-btn"
          aria-label="Back to Home"
        >
          <FiArrowLeft size={22} />
        </button>
        <h1 className="support-heading">Help & Support</h1>
        <div style={{ width: '38px' }} />
      </header>

      <main className="support-content">
        {/* Emergency Assistance Banner */}
        <div className="support-emergency-banner">
          <div className="banner-left">
            <div className="emergency-icon-circle">
              <FiPhoneCall size={22} />
            </div>
            <div className="banner-text">
              <h3>24/7 Roadside Assistance</h3>
              <p>Breakdown, flat tire, or emergency help on the road</p>
            </div>
          </div>
          <button
            onClick={() => triggerToast('Connecting to 24/7 Roadside Assistance: 1-800-555-FAST')}
            className="call-now-btn"
          >
            <FiPhoneCall size={14} />
            <span>Call Now</span>
          </button>
        </div>

        {/* Quick Contact Channels Grid */}
        <div className="support-channels-grid">
          <div
            className="channel-card"
            onClick={() => setShowChatModal(true)}
          >
            <div className="channel-icon" style={{ background: '#eff6ff', color: '#3478f6' }}>
              <FiMessageSquare size={20} />
            </div>
            <h4 className="channel-title">Live Chat</h4>
            <p className="channel-desc">Instant online help</p>
          </div>

          <div
            className="channel-card"
            onClick={() => triggerToast('Fast Cars Concierge: +1 (800) 555-3278')}
          >
            <div className="channel-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
              <FiPhoneCall size={20} />
            </div>
            <h4 className="channel-title">Call Support</h4>
            <p className="channel-desc">+1 (800) 555-FAST</p>
          </div>

          <div
            className="channel-card"
            onClick={() => {
              const el = document.getElementById('ticket-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="channel-icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
              <FiMail size={20} />
            </div>
            <h4 className="channel-title">Send Ticket</h4>
            <p className="channel-desc">Email response &lt; 2h</p>
          </div>
        </div>

        {/* FAQ Search */}
        <div className="faq-search-box">
          <FiSearch size={18} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search questions or policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Accordions */}
        <h3 className="faq-section-header">Frequently Asked Questions</h3>
        <div className="faq-list">
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
              No FAQs matched "{searchQuery}". You can submit a support request below!
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="faq-accordion-item">
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <FiChevronUp size={18} color="#3478f6" /> : <FiChevronDown size={18} color="#94a3b8" />}
                  </button>
                  {isOpen && <div className="faq-answer">{faq.a}</div>}
                </div>
              );
            })
          )}
        </div>

        {/* Submit Support Ticket Card */}
        <div className="ticket-card" id="ticket-section">
          <h3>Submit a Support Request</h3>
          <p>Our concierge team will review your message and reply via email within 2 hours.</p>

          <form onSubmit={handleTicketSubmit}>
            <div className="ticket-form-group">
              <label>Subject</label>
              <select
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="ticket-select"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Booking Modification">Booking Modification</option>
                <option value="Payment & Invoicing">Payment & Invoicing</option>
                <option value="Vehicle Issue">Vehicle Issue</option>
                <option value="Lost & Found">Lost & Found</option>
              </select>
            </div>

            <div className="ticket-form-group">
              <label>Your Message</label>
              <textarea
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                required
                placeholder="Describe what you need assistance with..."
                className="ticket-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={ticketSubmitted}
              className="pill-btn ticket-submit-btn"
            >
              {ticketSubmitted ? 'Ticket Submitted ✓' : 'Send Message'}
            </button>
          </form>
        </div>
      </main>

      {/* Live Chat Modal */}
      {showChatModal && (
        <div className="chat-modal-overlay" onClick={() => setShowChatModal(false)}>
          <div className="chat-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <div className="chat-header-user">
                <span className="chat-status-dot" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px' }}>Fast Cars Live Support</h4>
                  <span style={{ fontSize: '11px', opacity: 0.8 }}>Online • Typically replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="modal-close-icon"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="chat-messages-area">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="chat-input-row">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="chat-send-btn">
                <FiSend size={15} />
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

      {/* Bottom Navigation */}
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
