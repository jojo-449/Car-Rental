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
  FiShield
} from 'react-icons/fi';
import { FaHeart, FaCar } from 'react-icons/fa';

// clean vector logo for the top nav and sidebar
const FastCarsLogo = ({ isDark = false }) => (
  <div className="brand-logo-wrap">
    <svg className="brand-logo-svg" viewBox="0 0 74 32" fill="none">
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

export default function HomePage({
  onNavigate = () => {},
  wishlist = [],
  onToggleWishlist = () => {},
  onBookCar = () => {}
}) {
  const { user, isAdmin } = useAuth();
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
      }))
    : [
        {
          id: 1,
          tag: 'SPORT CARS',
          title: 'Drive the\nExtraordinary',
          description: 'Twin-turbo V8 engine delivering high performance with luxury comfort.',
          bgImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80',
          carName: 'Mercedes-Benz C63',
        },
        {
          id: 2,
          tag: 'FAST CARS',
          title: 'Unleash True\nPerformance',
          description: 'Naturally aspirated V10 supercar engineered to thrill at top speeds.',
          bgImage: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=80',
          carName: 'Lamborghini Huracán',
        },
        {
          id: 3,
          tag: 'SPORT CARS',
          title: 'Precision Meets\nSpeed',
          description: 'Twin-turbo inline-6 delivering 503 HP with race-tuned dynamics.',
          bgImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80',
          carName: 'BMW M4 Competition',
        },
        {
          id: 4,
          tag: 'FAST CARS',
          title: 'Pure Adrenaline\n& Control',
          description: 'Twin-turbo flat-six launching 0-60 in 2.6 seconds of unbridled adrenaline.',
          bgImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=80',
          carName: 'Porsche 911 Turbo S',
        },
        {
          id: 5,
          tag: 'SPORT CARS',
          title: 'Italian Luxury\n& Heritage',
          description: 'Italian craftsmanship meets twin-turbocharged racing heritage.',
          bgImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
          carName: 'Maserati Ghibli Trofeo',
        },
        {
          id: 6,
          tag: 'FAST CARS',
          title: 'Sculpted for\nHigh Velocity',
          description: 'Handcrafted AMG 4.0L V8 biturbo engine with active aerodynamics.',
          bgImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
          carName: 'Mercedes-AMG GT Coupe',
        },
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

  // lock background scroll when sidebar drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // timer to auto change hero slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
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
              ...(isAdmin ? [{ name: 'Admin Panel', page: 'Admin', icon: FiShield }] : []),
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
                  <img src={assetUrl(user.avatar_url)} alt={user.full_name} className="user-avatar-img" />
                ) : (
                  <span className="user-avatar-img" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#3478F6', color: '#fff', fontWeight: 700 }}>
                    {user.full_name?.[0]?.toUpperCase()}
                  </span>
                )}
                <span className="user-profile-name">{user.full_name}</span>
                <FiChevronDown size={15} className="user-dropdown-arrow" />
              </div>
            ) : (
              <button className="user-profile-pill" onClick={() => goToPage('Login')}>
                <FiUser size={16} />
                <span className="user-profile-name">Log In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="content-container">
        {/* Slideshow "Book Now" leads to BrowseCars */}
        <section className="hero-slideshow">
          <div
            className="hero-background-img"
            style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
          />
          <div className="hero-dark-overlay" />

          <div className="hero-text-content">
            <span className="hero-small-tag">{currentSlide.tag}</span>
            <h1 className="hero-main-title">{currentSlide.title}</h1>
            <p className="hero-subtext">{currentSlide.description}</p>

            <button
              onClick={() => (currentSlide.car ? goToPage('CarDetails', { car: currentSlide.car }) : goToPage('BrowseCars'))}
              className="hero-action-btn pill-btn"
            >
              <span>Book Now</span>
              <FiArrowRight size={16} />
            </button>
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
            <h2 className="section-heading">Explore by Category</h2>
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
                  <img src={assetUrl(item.image_url)} alt={item.name} />
                </div>
                <div className="category-bottom-bar">
                  <div className="category-text">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <button className="circle-arrow-btn" aria-label="Explore">
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
            <h2 className="section-heading">Top Brands</h2>
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
                    {b.logo_url ? (
                      <img src={assetUrl(b.logo_url)} alt={b.name} style={{ width: 26, height: 26, objectFit: 'contain' }} />
                    ) : (
                      <FaCar size={22} />
                    )}
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
            <h2 className="section-heading">Featured Cars</h2>
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
                    <img src={car.image} alt={car.name} />
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
              <h2 className="section-heading">What Our Customers Say</h2>
              <button onClick={() => goToPage('Testimonials')} className="view-all-link">
                <span>View All</span>
                <FiArrowRight size={14} />
              </button>
            </div>
            <div className="brands-horizontal-scroll">
              <div className="brands-track" style={{ alignItems: 'stretch' }}>
                {testimonials.slice(0, 5).map((t) => (
                  <div key={t.id} className="brand-pill-card" style={{ flexDirection: 'column', alignItems: 'flex-start', minWidth: 260, maxWidth: 280, whiteSpace: 'normal', gap: 8, padding: 16 }}>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>“{t.content}”</p>
                    <strong style={{ fontSize: 13 }}>{t.user?.full_name || 'Customer'}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quick guide */}
        <section className="page-section">
          <div className="section-title-row">
            <h2 className="section-heading">How it works</h2>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: '#334155' }}>
            <p style={{ margin: '0 0 10px' }}>
              You can look around the site without an account. Browse the cars, read the reviews and send us a
              message from the Contact page whenever you like.
            </p>
            <p style={{ margin: '0 0 10px' }}>
              <strong>To register:</strong> press Log In at the top, then Sign Up. Fill in your name, email, phone number
              and a password of at least 8 characters, then tick the terms box. You are logged in straight away.
            </p>
            <p style={{ margin: '0 0 10px' }}>
              <strong>To book a car:</strong> open a car, pick your pickup and return dates, and press Reserve. We confirm it
              and you can follow it under Booking History, where you can also cancel it. Tap the heart on any car to
              save it to your wishlist.
            </p>
            <p style={{ margin: '0 0 10px' }}>
              <strong>Forgot your password?</strong> On the login page press "Forgot password", then enter the email and
              phone number you registered with, and choose a new one.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Want to try it out?</strong> There are two test accounts. Customer: joy.jenna@gmail.com with
              password CustomerPassword123. Admin: admin@fastcars.com with password AdminPassword123 (the admin account
              also gets an Admin Panel link in the menu).
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section className="page-section">
          <div className="section-title-row">
            <h2 className="section-heading">Stay in the loop</h2>
          </div>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email for offers & news"
              style={{ flex: '1 1 220px', padding: '12px 16px', borderRadius: 999, border: '1px solid #E2E8F0', fontSize: 14 }}
            />
            <button type="submit" className="hero-action-btn pill-btn">
              <span>Subscribe</span>
            </button>
          </form>
          <div style={{ display: 'flex', gap: 16, marginTop: 20, fontSize: 13, flexWrap: 'wrap' }}>
            <button className="view-all-link" onClick={() => goToPage('Page', { type: 'aboutus' })}>About Us</button>
            <button className="view-all-link" onClick={() => goToPage('Page', { type: 'terms' })}>Terms</button>
            <button className="view-all-link" onClick={() => goToPage('Page', { type: 'privacy' })}>Privacy</button>
            <button className="view-all-link" onClick={() => goToPage('Contact')}>Contact Us</button>
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