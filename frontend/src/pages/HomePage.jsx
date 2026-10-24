import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { carsApi, brandsApi, categoriesApi, testimonialsApi, contactApi } from '../api';
import { adaptCar } from '../utils/cars';
import { assetUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast, ToastView } from '../components/Toast';

import {
  FiMenu,
  FiX,
  FiHeart,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiHome,
  FiClock,
  FiSettings,
  FiUser,
  FiHelpCircle,
  FiLogOut,
  FiMessageSquare,
  FiMail,
  FiShield,
  FiCalendar,
  FiZap,
  FiCopy,
  FiCheck
} from 'react-icons/fi';
import { FaHeart, FaCar, FaStar, FaUserCheck } from 'react-icons/fa';

// clean vector logo for the top nav and sidebar
const FastCarsLogo = ({ isDark = false }) => (
  <div className="brand-logo-wrap">
    <svg className="brand-logo-svg" viewBox="0 0 74 32" fill="none" aria-hidden="true">
      <path
        d="M6 22C16 10 32 4 48 4C58 4 64 8 68 12"
        stroke="#3478F6"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M2 25C18 16 38 12 56 15C65 16 70 21 72 26"
        stroke={isDark ? '#153B66' : '#93C5FD'}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="24" r="2.5" fill="#3478F6" />
      <circle cx="58" cy="24" r="2.5" fill="#3478F6" />
    </svg>
    <span className={`brand-logo-text ${isDark ? 'dark-text' : 'light-text'}`}>
      FAST CARS
    </span>
  </div>
);

// High-fidelity vector emblems for top car brands (eliminates broken images and duplicate text)
function BrandEmblem({ name, logoUrl }) {
  const brand = (name || '').toLowerCase();

  if (brand.includes('mercedes')) {
    return (
      <svg viewBox="0 0 40 40" className="brand-svg-emblem" aria-hidden="true">
        <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M20 5 L20 20 L7.8 27 L20 20 L32.2 27 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (brand.includes('bmw')) {
    return (
      <svg viewBox="0 0 40 40" className="brand-svg-emblem" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#111827" stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="13" fill="#FFFFFF" />
        <path d="M20 7 A13 13 0 0 1 33 20 L20 20 Z" fill="#0066B1" />
        <path d="M20 20 L7 20 A13 13 0 0 1 20 7 Z" fill="#FFFFFF" />
        <path d="M20 20 L33 20 A13 13 0 0 1 20 33 Z" fill="#FFFFFF" />
        <path d="M20 20 L20 33 A13 13 0 0 1 7 20 Z" fill="#0066B1" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="#111827" strokeWidth="0.8" />
      </svg>
    );
  }

  if (brand.includes('audi')) {
    return (
      <svg viewBox="0 0 52 24" className="brand-svg-emblem" aria-hidden="true" style={{ width: 44, height: 20 }}>
        <circle cx="11" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="21" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="31" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="41" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    );
  }

  if (brand.includes('porsche')) {
    return (
      <svg viewBox="0 0 36 44" className="brand-svg-emblem" aria-hidden="true">
        <path d="M6 4 L30 4 L30 24 C30 34 20 40 18 41 C16 40 6 34 6 24 Z" fill="#C5A059" stroke="#9A7B38" strokeWidth="1.5" />
        <path d="M10 8 L26 8 L26 22 C26 30 18 35 18 35 C18 35 10 30 10 22 Z" fill="#1C1C1C" />
        <path d="M12 11 L17 11 L17 21 L12 21 Z" fill="#C8102E" />
        <path d="M19 11 L24 11 L24 21 L19 21 Z" fill="#C5A059" />
      </svg>
    );
  }

  if (brand.includes('lamborghini')) {
    return (
      <svg viewBox="0 0 38 44" className="brand-svg-emblem" aria-hidden="true">
        <path d="M19 2 L35 7 L31 34 L19 42 L7 34 L3 7 Z" fill="#1A1A1A" stroke="#E5B242" strokeWidth="2" />
        <path d="M19 12 L25 18 L22 22 L26 25 L21 28 L19 25 L16 28 L12 24 L16 21 L13 18 Z" fill="#E5B242" />
      </svg>
    );
  }

  if (brand.includes('maserati')) {
    return (
      <svg viewBox="0 0 36 40" className="brand-svg-emblem" aria-hidden="true">
        <path
          d="M18 4 L18 36 M18 4 L14 10 L16 18 M18 4 L22 10 L20 18 M11 10 L8 14 L11 20 M25 10 L28 14 L25 20 M8 20 C10 26 26 26 28 20 L28 22 C28 28 8 28 8 22 Z"
          fill="none"
          stroke="#C8102E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="18" cy="34" rx="5" ry="2" fill="#153B66" />
      </svg>
    );
  }

  if (brand.includes('honda')) {
    return (
      <svg viewBox="0 0 38 34" className="brand-svg-emblem" aria-hidden="true">
        <rect x="3" y="3" width="32" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M10 8 L14 26 L17 26 L17 19 L21 19 L21 26 L24 26 L28 8 L23.5 8 L21.5 16 L16.5 16 L14.5 8 Z" fill="currentColor" />
      </svg>
    );
  }

  if (logoUrl) {
    return <img src={assetUrl(logoUrl)} alt="" aria-hidden="true" style={{ width: 26, height: 26, objectFit: 'contain' }} />;
  }

  return <FaCar size={22} aria-hidden="true" />;
}

export default function HomePage({
  onNavigate = () => {},
  wishlist = [],
  onToggleWishlist = () => {},
  onBookCar = () => {}
}) {
  const { user, isAdmin, login } = useAuth();
  const [toastMessage, showToast] = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [sliderCars, setSliderCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [featuredCars, setFeaturedCars] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [slideIndex, setSlideIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState('');
  const [demoLoading, setDemoLoading] = useState('');

  useEffect(() => {
    carsApi.slider().then((c) => setSliderCars(c.map(adaptCar))).catch(() => {});
    carsApi.featured().then((c) => setFeaturedCars(c.map(adaptCar).slice(0, 4))).catch(() => {});
    categoriesApi.list().then(setCategories).catch(() => {});
    brandsApi.list().then(setBrands).catch(() => {});
    testimonialsApi.list().then(setTestimonials).catch(() => {});
  }, []);

  const slideTitles = [
    'Drive the\nExtraordinary',
    'Unleash True\nPerformance',
    'Precision Meets\nSpeed',
    'Pure Adrenaline\n& Control',
    'Italian Luxury\n& Heritage',
    'Sculpted for\nHigh Velocity',
    'Command the\nOpen Road'
  ];

  // hero slides come from the cars flagged is_slider
  const heroSlides = sliderCars.length
    ? sliderCars.map((car, i) => ({
        id: car.id,
        car,
        tag: car.category ? car.category.toUpperCase() : 'SPORT CARS',
        title: slideTitles[i % slideTitles.length],
        description: car.raw?.overview || car.overview || 'Twin-turbo engine delivering high performance with luxury comfort.',
        bgImage: car.image,
        carName: car.name,
        price: car.price || 120,
        transmission: car.raw?.transmission || 'Automatic',
        power: car.raw?.power || '503 HP'
      }))
    : [
        {
          id: 1,
          tag: 'SPORT CARS',
          title: 'Drive the\nExtraordinary',
          description: 'Twin-turbo V8 engine delivering high performance with luxury comfort.',
          bgImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80',
          carName: 'Mercedes-Benz C63',
          price: 120,
          transmission: 'Automatic',
          power: '503 HP'
        },
        {
          id: 2,
          tag: 'FAST CARS',
          title: 'Unleash True\nPerformance',
          description: 'Naturally aspirated V10 supercar engineered to thrill at top speeds.',
          bgImage: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=80',
          carName: 'Lamborghini Huracán',
          price: 450,
          transmission: 'Automatic',
          power: '640 HP'
        },
        {
          id: 3,
          tag: 'SPORT CARS',
          title: 'Precision Meets\nSpeed',
          description: 'Twin-turbo inline-6 delivering 503 HP with race-tuned dynamics.',
          bgImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80',
          carName: 'BMW M4 Competition',
          price: 150,
          transmission: 'Automatic',
          power: '503 HP'
        },
        {
          id: 4,
          tag: 'FAST CARS',
          title: 'Pure Adrenaline\n& Control',
          description: 'Twin-turbo flat-six launching 0-60 in 2.6 seconds of unbridled adrenaline.',
          bgImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=80',
          carName: 'Porsche 911 Turbo S',
          price: 420,
          transmission: 'Automatic',
          power: '640 HP'
        },
        {
          id: 5,
          tag: 'SPORT CARS',
          title: 'Italian Luxury\n& Heritage',
          description: 'Italian craftsmanship meets twin-turbocharged racing heritage.',
          bgImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
          carName: 'Maserati Ghibli Trofeo',
          price: 210,
          transmission: 'Automatic',
          power: '580 HP'
        },
        {
          id: 6,
          tag: 'FAST CARS',
          title: 'Sculpted for\nHigh Velocity',
          description: 'Handcrafted AMG 4.0L V8 biturbo engine with active aerodynamics.',
          bgImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
          carName: 'Mercedes-AMG GT Coupe',
          price: 350,
          transmission: 'Automatic',
          power: '577 HP'
        }
      ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await contactApi.subscribe(newsletterEmail);
      setNewsletterEmail('');
      showToast('Thanks for subscribing!');
    } catch (err) {
      showToast(err.message);
    }
  };

  const handleCopyText = (text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showToast(`Copied ${text}`);
      setTimeout(() => setCopiedKey(''), 2000);
    }
  };

  const handleQuickDemoLogin = async (email, password, role) => {
    setDemoLoading(role);
    try {
      await login(email, password);
      showToast(`Logged in as ${role === 'admin' ? 'Administrator' : 'Joy Jenna'}!`);
      if (role === 'admin') {
        goToPage('Admin');
      }
    } catch (err) {
      showToast(err.message || 'Quick login failed');
    } finally {
      setDemoLoading('');
    }
  };

  // lock background scroll when sidebar drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // timer to auto change hero slide every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const goToPage = (pageName, data = {}) => {
    setIsMenuOpen(false);
    setActiveTab(pageName);
    onNavigate(pageName, data);
  };

  const currentSlide = heroSlides[slideIndex % heroSlides.length];

  return (
    <div className="home-wrapper">
      {/* sidebar backdrop */}
      {isMenuOpen && (
        <div className="drawer-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* side navigation menu */}
      <aside className={`side-drawer ${isMenuOpen ? 'drawer-visible' : ''}`}>
        <div className="drawer-top-bar">
          <FastCarsLogo isDark={false} />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="drawer-close-btn"
            aria-label="Close Menu"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="drawer-links-area">
          <nav className="drawer-nav">
            {[
              { name: 'Home', page: 'Home', icon: FiHome },
              { name: 'Browse Cars', page: 'BrowseCars', icon: FaCar },
              { name: 'Wishlist', page: 'Wishlist', icon: FiHeart },
              { name: 'Booking History', page: 'History', icon: FiClock },
              { name: 'Profile', page: 'Profile', icon: FiUser },
              { name: 'Settings', page: 'Settings', icon: FiSettings },
              { name: 'Help & Support', page: 'Support', icon: FiHelpCircle },
              { name: 'Testimonials', page: 'Testimonials', icon: FiMessageSquare },
              { name: 'Contact Us', page: 'Contact', icon: FiMail },
              ...(isAdmin ? [{ name: 'Admin Panel', page: 'Admin', icon: FiShield }] : [])
            ].map((link) => {
              const Icon = link.icon;
              const isSelected = activeTab === link.page;
              return (
                <button
                  key={link.name}
                  onClick={() => goToPage(link.page)}
                  className={`drawer-link ${isSelected ? 'active-link' : ''}`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="drawer-promo" onClick={() => goToPage('BrowseCars')}>
            <div>
              <h5>Drive Your Dream</h5>
              <p>Premium cars. Best rates.</p>
            </div>
            <FaCar size={56} className="promo-car-bg" />
          </div>

          {user ? (
            <button onClick={() => goToPage('Logout')} className="drawer-logout-btn">
              <FiLogOut size={18} />
              <span>Log Out</span>
            </button>
          ) : (
            <button onClick={() => goToPage('Login')} className="drawer-logout-btn">
              <FiUser size={18} />
              <span>Log In</span>
            </button>
          )}
        </div>
      </aside>

      {/* header bar */}
      <header className="main-header">
        <div className="header-container">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="header-icon-btn menu-toggle-btn"
            aria-label="Open Menu"
          >
            <FiMenu size={24} />
          </button>

          <div onClick={() => goToPage('Home')} className="header-logo-click">
            <FastCarsLogo isDark={true} />
          </div>

          <div className="header-right-items">
            {/* Wishlist count syncs with shared wishlist state */}
            <button
              onClick={() => goToPage('Wishlist')}
              className="header-icon-btn wishlist-icon-btn"
              aria-label="Wishlist"
            >
              <FiHeart size={22} />
              {wishlist.length > 0 && <span className="wishlist-badge">{wishlist.length}</span>}
            </button>

            {user ? (
              <div className="user-profile-pill" onClick={() => goToPage('Profile')}>
                {user.avatar_url ? (
                  <img src={assetUrl(user.avatar_url)} alt="" className="user-avatar-img" />
                ) : (
                  <span className="user-avatar-img" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#3478F6', color: '#fff', fontWeight: 700 }}>
                    {user.full_name?.[0]?.toUpperCase()}
                  </span>
                )}
                <span className="user-profile-name">{user.full_name}</span>
                <FiChevronDown size={15} className="user-dropdown-arrow" />
              </div>
            ) : (
              <button className="user-profile-pill user-login-cta" onClick={() => goToPage('Login')}>
                <FiUser size={16} />
                <span className="user-profile-name">Log In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="content-container">
        {/* Slideshow Hero Section */}
        <section className="hero-slideshow">
          <div
            className="hero-background-img"
            style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
          />
          <div className="hero-dark-overlay" />

          <div className="hero-text-content">
            <div className="hero-pill-row">
              <span className="hero-small-tag">{currentSlide.tag}</span>
              {currentSlide.carName && (
                <span className="hero-car-model-tag">✦ {currentSlide.carName}</span>
              )}
            </div>

            <h1 className="hero-main-title">{currentSlide.title}</h1>
            <p className="hero-subtext">{currentSlide.description}</p>

            {/* Quick Hero Performance Specs Bar */}
            <div className="hero-specs-row">
              <div className="hero-spec-pill">
                <span className="spec-label">Daily Rate</span>
                <strong className="spec-val">${currentSlide.price}</strong>
              </div>
              <div className="hero-spec-pill">
                <span className="spec-label">Gearbox</span>
                <strong className="spec-val">{currentSlide.transmission}</strong>
              </div>
              <div className="hero-spec-pill">
                <span className="spec-label">Protection</span>
                <strong className="spec-val">Full Coverage</strong>
              </div>
            </div>

            <div className="hero-actions-group">
              <button
                onClick={() => (currentSlide.car ? onBookCar(currentSlide.car) : goToPage('BrowseCars'))}
                className="hero-action-btn pill-btn"
              >
                <span>Book Now</span>
                <FiArrowRight size={16} />
              </button>
              {currentSlide.car && (
                <button
                  onClick={() => goToPage('CarDetails', { car: currentSlide.car })}
                  className="hero-secondary-btn pill-btn"
                >
                  <span>View Details</span>
                </button>
              )}
            </div>
          </div>

          <button onClick={handlePrev} className="slide-arrow arrow-left" aria-label="Previous">
            <FiChevronLeft size={20} />
          </button>
          <button onClick={handleNext} className="slide-arrow arrow-right" aria-label="Next">
            <FiChevronRight size={20} />
          </button>

          <div className="slideshow-dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={`dot-indicator ${slideIndex === i ? 'dot-active' : ''}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Explore Categories: "View All" leads to BrowseCars */}
        <section className="page-section">
          <div className="section-title-row">
            <div>
              <h2 className="section-heading">Explore by Category</h2>
              <p className="section-subheading">Hand-selected luxury, supercar & sport collections</p>
            </div>
            <button onClick={() => goToPage('BrowseCars')} className="view-all-link">
              <span>View All</span>
              <FiArrowRight size={14} />
            </button>
          </div>

          <div className="category-cards-grid">
            {categories.map((item) => (
              <div
                key={item.id}
                className="category-card interactive-card"
                onClick={() => goToPage('BrowseCars', { category_id: item.id })}
              >
                <div className="category-image-box">
                  <img src={assetUrl(item.image_url)} alt="" aria-hidden="true" />
                  <span className="category-overlay-tag">Fleet</span>
                </div>
                <div className="category-bottom-bar">
                  <div className="category-text">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <button className="circle-arrow-btn" aria-label={`Explore ${item.name}`}>
                    <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Brands: Arrow leads to BrowseCars; Clicking a logo opens that brand's cars */}
        <section className="page-section">
          <div className="section-title-row brand-title-row">
            <div>
              <h2 className="section-heading">Top Brands</h2>
              <p className="section-subheading">World-class automotive engineering</p>
            </div>
            <button onClick={() => goToPage('BrowseCars')} className="view-all-link">
              <span>All Brands</span>
              <FiArrowRight size={14} />
            </button>
          </div>

          <div className="brands-horizontal-scroll">
            <div className="brands-track">
              {brands.map((b) => (
                <div
                  key={b.id}
                  className="brand-pill-card interactive-card"
                  onClick={() => goToPage('BrowseCars', { brand_id: b.id })}
                  title={`View ${b.name} cars`}
                >
                  <div className="brand-logo-frame">
                    <BrandEmblem name={b.name} logoUrl={b.logo_url} />
                  </div>
                  <span className="brand-title">{b.name}</span>
                </div>
              ))}

              <button
                onClick={() => goToPage('BrowseCars')}
                className="brand-scroll-next-btn"
                aria-label="View all brands"
              >
                <FiArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Featured Cars: "View All" leads to BrowseCars */}
        <section className="page-section">
          <div className="section-title-row">
            <div>
              <h2 className="section-heading">Featured Cars</h2>
              <p className="section-subheading">Ready for instant reservation today</p>
            </div>
            <button onClick={() => goToPage('BrowseCars')} className="view-all-link">
              <span>View All</span>
              <FiArrowRight size={14} />
            </button>
          </div>

          <div className="featured-cars-grid">
            {featuredCars.map((car) => {
              const isSaved = wishlist.includes(car.id);
              return (
                <div
                  key={car.id}
                  className="car-card interactive-card"
                  onClick={() => goToPage('CarDetails', { car })}
                  title={`View details for ${car.name}`}
                >
                  <div className="car-image-container">
                    <img src={car.image} alt="" aria-hidden="true" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(car.id);
                      }}
                      className={`card-wishlist-btn ${isSaved ? 'saved' : ''}`}
                      aria-label="Add to Wishlist"
                    >
                      {isSaved ? (
                        <FaHeart size={16} color="#FF4B55" />
                      ) : (
                        <FiHeart size={16} color="#64748B" />
                      )}
                    </button>
                  </div>

                  <div className="car-info-box">
                    <h3 className="car-title">{car.name}</h3>
                    <div className="car-tags-row">
                      {car.tags.map((t) => (
                        <span key={t.label} className={`pill-badge ${t.type}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <div className="car-price-row">
                      <span className="price-number">${car.price}</span>
                      <span className="price-cycle">/ day</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookCar(car);
                      }}
                      className="car-book-btn pill-btn"
                    >
                      <span>Book Now</span>
                      <FiArrowRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="page-section">
            <div className="section-title-row">
              <div>
                <h2 className="section-heading">What Our Customers Say</h2>
                <p className="section-subheading">Verified experiences from real drivers</p>
              </div>
              <button onClick={() => goToPage('Testimonials')} className="view-all-link">
                <span>View All</span>
                <FiArrowRight size={14} />
              </button>
            </div>
            <div className="testimonials-track-container">
              <div className="testimonials-track">
                {testimonials.slice(0, 5).map((t) => (
                  <div key={t.id} className="testimonial-card-v2 interactive-card">
                    <div className="testimonial-stars-row">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color="#F59E0B" size={14} />
                      ))}
                    </div>
                    <p className="testimonial-quote">“{t.content}”</p>
                    <div className="testimonial-author-row">
                      <div className="author-avatar-circle">
                        {t.user?.full_name ? t.user.full_name[0].toUpperCase() : 'C'}
                      </div>
                      <div className="author-meta">
                        <strong className="author-name">{t.user?.full_name || 'Joy Jenna'}</strong>
                        <span className="author-verified">
                          <FaUserCheck size={11} color="#10B981" /> Verified Renter
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works: Visual 4-Step Process */}
        <section className="page-section how-it-works-section">
          <div className="section-title-row">
            <div>
              <h2 className="section-heading">How it works</h2>
              <p className="section-subheading">Effortless luxury car rental from start to finish</p>
            </div>
          </div>

          <div className="how-it-works-grid">
            <div className="how-step-card interactive-card">
              <div className="step-header-row">
                <div className="step-number-badge">01</div>
                <div className="step-icon-wrap">
                  <FaCar size={20} color="#3478F6" />
                </div>
              </div>
              <h3 className="step-title">Browse & Choose</h3>
              <p className="step-desc">
                Explore our fleet with no account needed. View detailed performance specs, transparent pricing, and customer reviews.
              </p>
            </div>

            <div className="how-step-card interactive-card">
              <div className="step-header-row">
                <div className="step-number-badge">02</div>
                <div className="step-icon-wrap">
                  <FiCalendar size={20} color="#3478F6" />
                </div>
              </div>
              <h3 className="step-title">Select Dates</h3>
              <p className="step-desc">
                Pick your pickup and return dates with guaranteed real-time availability and transparent, all-inclusive daily rates.
              </p>
            </div>

            <div className="how-step-card interactive-card">
              <div className="step-header-row">
                <div className="step-number-badge">03</div>
                <div className="step-icon-wrap">
                  <FiShield size={20} color="#3478F6" />
                </div>
              </div>
              <h3 className="step-title">Instant Reserve</h3>
              <p className="step-desc">
                Register in 30 seconds or log in to confirm. Track active bookings and manage cancellations directly in Booking History.
              </p>
            </div>

            <div className="how-step-card interactive-card">
              <div className="step-header-row">
                <div className="step-number-badge">04</div>
                <div className="step-icon-wrap">
                  <FiZap size={20} color="#3478F6" />
                </div>
              </div>
              <h3 className="step-title">Enjoy the Drive</h3>
              <p className="step-desc">
                Pick up your spotless, fully insured vehicle with 24/7 VIP concierge and emergency roadside assistance included.
              </p>
            </div>
          </div>

          {/* Quick Demo Access Card */}
          <div className="demo-credentials-banner">
            <div className="demo-banner-header">
              <div className="demo-badge">QUICK TEST ACCESS</div>
              <h3 className="demo-banner-title">Try Fast Cars with One Click</h3>
              <p className="demo-banner-sub">
                Explore the platform instantly using our pre-configured customer or fleet administrator accounts.
              </p>
            </div>

            <div className="demo-accounts-grid">
              {/* Customer Account */}
              <div className="demo-account-card">
                <div className="demo-role-tag customer-tag">Customer Account</div>
                <div className="demo-field-row">
                  <span className="demo-label">Email:</span>
                  <code className="demo-code">joy.jenna@gmail.com</code>
                  <button
                    type="button"
                    className="demo-copy-btn"
                    onClick={() => handleCopyText('joy.jenna@gmail.com', 'cust-email')}
                    title="Copy email"
                  >
                    {copiedKey === 'cust-email' ? <FiCheck size={14} color="#10B981" /> : <FiCopy size={14} />}
                  </button>
                </div>
                <div className="demo-field-row">
                  <span className="demo-label">Password:</span>
                  <code className="demo-code">CustomerPassword123</code>
                  <button
                    type="button"
                    className="demo-copy-btn"
                    onClick={() => handleCopyText('CustomerPassword123', 'cust-pass')}
                    title="Copy password"
                  >
                    {copiedKey === 'cust-pass' ? <FiCheck size={14} color="#10B981" /> : <FiCopy size={14} />}
                  </button>
                </div>
                <button
                  type="button"
                  className="demo-login-btn pill-btn"
                  disabled={demoLoading === 'customer'}
                  onClick={() => handleQuickDemoLogin('joy.jenna@gmail.com', 'CustomerPassword123', 'customer')}
                >
                  <span>{demoLoading === 'customer' ? 'Signing in...' : 'Sign In as Joy Jenna'}</span>
                  <FiArrowRight size={14} />
                </button>
              </div>

              {/* Admin Account */}
              <div className="demo-account-card admin-highlight">
                <div className="demo-role-tag admin-tag">Admin & Fleet Manager</div>
                <div className="demo-field-row">
                  <span className="demo-label">Email:</span>
                  <code className="demo-code">admin@fastcars.com</code>
                  <button
                    type="button"
                    className="demo-copy-btn"
                    onClick={() => handleCopyText('admin@fastcars.com', 'admin-email')}
                    title="Copy email"
                  >
                    {copiedKey === 'admin-email' ? <FiCheck size={14} color="#10B981" /> : <FiCopy size={14} />}
                  </button>
                </div>
                <div className="demo-field-row">
                  <span className="demo-label">Password:</span>
                  <code className="demo-code">AdminPassword123</code>
                  <button
                    type="button"
                    className="demo-copy-btn"
                    onClick={() => handleCopyText('AdminPassword123', 'admin-pass')}
                    title="Copy password"
                  >
                    {copiedKey === 'admin-pass' ? <FiCheck size={14} color="#10B981" /> : <FiCopy size={14} />}
                  </button>
                </div>
                <button
                  type="button"
                  className="demo-login-btn admin-btn pill-btn"
                  disabled={demoLoading === 'admin'}
                  onClick={() => handleQuickDemoLogin('admin@fastcars.com', 'AdminPassword123', 'admin')}
                >
                  <span>{demoLoading === 'admin' ? 'Signing in...' : 'Sign In as Admin'}</span>
                  <FiShield size={14} />
                </button>
              </div>
            </div>

            <div className="demo-footer-note">
              <span>Forgot your password?</span> On the login page, tap &ldquo;Forgot password&rdquo; and enter your registered email and phone number to reset.
            </div>
          </div>
        </section>

        {/* Newsletter & Luxury Trust Footer */}
        <section className="page-section newsletter-section">
          <div className="newsletter-lux-card">
            <div className="newsletter-text-col">
              <span className="newsletter-small-tag">VIP PERKS & UPDATES</span>
              <h2 className="newsletter-heading">Stay in the loop</h2>
              <p className="newsletter-sub">
                Subscribe for private supercar drops, weekend specials, and zero-deposit member privileges.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="newsletter-form-inline">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="newsletter-lux-input"
              />
              <button type="submit" className="newsletter-lux-btn pill-btn">
                <span>Subscribe</span>
                <FiArrowRight size={15} />
              </button>
            </form>
          </div>

          {/* Trust Guarantees Bar */}
          <div className="trust-guarantees-bar">
            <div className="trust-item">
              <FiShield size={18} color="#3478F6" />
              <span>Full Comprehensive Insurance</span>
            </div>
            <div className="trust-item">
              <FiZap size={18} color="#3478F6" />
              <span>Instant Confirmation</span>
            </div>
            <div className="trust-item">
              <FiClock size={18} color="#3478F6" />
              <span>24/7 Roadside Concierge</span>
            </div>
          </div>

          {/* Footer Navigation Links */}
          <div className="homepage-footer-nav">
            <button className="footer-nav-link" onClick={() => goToPage('Page', { type: 'aboutus' })}>About Us</button>
            <span className="footer-nav-dot">•</span>
            <button className="footer-nav-link" onClick={() => goToPage('Page', { type: 'terms' })}>Terms</button>
            <span className="footer-nav-dot">•</span>
            <button className="footer-nav-link" onClick={() => goToPage('Page', { type: 'privacy' })}>Privacy</button>
            <span className="footer-nav-dot">•</span>
            <button className="footer-nav-link" onClick={() => goToPage('Contact')}>Contact Us</button>
            <span className="footer-nav-dot">•</span>
            <button className="footer-nav-link" onClick={() => goToPage('Support')}>Help & Support</button>
          </div>
          <div className="homepage-copyright">
            © 2026 Fast Cars Luxury Fleet. All rights reserved.
          </div>
        </section>
      </main>

      <ToastView message={toastMessage} />

      {/* bottom navigation bar */}
      <footer className="bottom-nav-bar">
        <div className="bottom-nav-inner">
          <button onClick={() => goToPage('Home')} className="nav-tab-btn tab-active">
            <FiHome size={20} />
            <span>Home</span>
          </button>
          <button onClick={() => goToPage('Wishlist')} className="nav-tab-btn">
            <div className="tab-icon-wrap">
              <FiHeart size={20} />
              {wishlist.length > 0 && <span className="tab-counter-badge">{wishlist.length}</span>}
            </div>
            <span>Wishlist</span>
          </button>
          <div className="floating-center-tab">
            <button onClick={() => goToPage('BrowseCars')} className="center-book-circle" aria-label="Book">
              <FaCar size={22} />
            </button>
            <span className="center-tab-label">Book</span>
          </div>
          <button onClick={() => goToPage('History')} className="nav-tab-btn">
            <FiClock size={20} />
            <span>History</span>
          </button>
          <button onClick={() => goToPage('Settings')} className="nav-tab-btn">
            <FiSettings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
