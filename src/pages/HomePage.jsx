


// import React, { useState, useEffect } from 'react';
// import './HomePage.css';

// // standard icon imports from react-icons
// import {
//   FiMenu,
//   FiX,
//   FiHeart,
//   FiChevronDown,
//   FiChevronLeft,
//   FiChevronRight,
//   FiArrowRight,
//   FiHome,
//   FiClock,
//   FiSettings,
//   FiUser,
//   FiHelpCircle,
//   FiLogOut
// } from 'react-icons/fi';
// import { FaHeart, FaCar } from 'react-icons/fa';

// // clean vector logo for the top nav and sidebar
// const FastCarsLogo = ({ isDark = false }) => (
//   <div className="brand-logo-wrap">
//     <svg className="brand-logo-svg" viewBox="0 0 74 32" fill="none">
//       <path
//         d="M6 22C16 10 32 4 48 4C58 4 64 8 68 12"
//         stroke="#3478F6"
//         strokeWidth="2.8"
//         strokeLinecap="round"
//       />
//       <path
//         d="M2 25C18 16 38 12 56 15C65 16 70 21 72 26"
//         stroke={isDark ? '#153B66' : '#93C5FD'}
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//       <circle cx="16" cy="24" r="2.5" fill="#3478F6" />
//       <circle cx="58" cy="24" r="2.5" fill="#3478F6" />
//     </svg>
//     <span className={`brand-logo-text ${isDark ? 'dark-text' : 'light-text'}`}>
//       FAST CARS
//     </span>
//   </div>
// );

// // brand logo svgs for the top brands section
// const MercedesLogo = () => (
//   <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
//     <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
//     <path d="M12 2.5L12 12M12 12L4.5 17.5M12 12L19.5 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//   </svg>
// );

// const HondaLogo = () => (
//   <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
//     <rect x="3" y="3.5" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
//     <path d="M7 6.5V17M17 6.5V17M7 11.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//   </svg>
// );

// const BmwLogo = () => (
//   <svg viewBox="0 0 24 24" width="26" height="26">
//     <circle cx="12" cy="12" r="10" fill="#172033" stroke="#CBD5E1" strokeWidth="1" />
//     <circle cx="12" cy="12" r="7" fill="#FFFFFF" />
//     <path d="M12 5A7 7 0 0 1 19 12H12Z" fill="#0066B1" />
//     <path d="M5 12A7 7 0 0 1 12 19V12Z" fill="#0066B1" />
//   </svg>
// );

// const LamboLogo = () => (
//   <svg viewBox="0 0 24 24" width="26" height="26">
//     <path d="M12 2L4 6V13C4 18 12 22 12 22C12 22 20 18 20 13V6L12 2Z" fill="#C59B27" />
//     <path d="M8.5 10C9.5 9 11 9.5 12 10.5C13 9.5 14.5 9 15.5 10C16 11 15 13 14 14L12 17L10 14C9 13 8 11 8.5 10Z" fill="#111827" />
//   </svg>
// );

// const MaseratiLogo = () => (
//   <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
//     <path d="M12 3L10.5 7L12 8L13.5 7L12 3Z" fill="currentColor" />
//     <path d="M6 7L7.5 11L9.5 9L8 6L6 7Z" fill="currentColor" />
//     <path d="M18 7L16.5 11L14.5 9L16 6L18 7Z" fill="currentColor" />
//     <path d="M10 11H14V14H10V11Z" fill="currentColor" />
//     <path d="M11 14H13V21H11V14Z" fill="currentColor" />
//   </svg>
// );

// const AudiLogo = () => (
//   <svg viewBox="0 0 36 20" width="34" height="18" fill="none">
//     <ellipse cx="7" cy="10" rx="5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
//     <ellipse cx="14" cy="10" rx="5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
//     <ellipse cx="21" cy="10" rx="5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
//     <ellipse cx="28" cy="10" rx="5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
//   </svg>
// );

// export default function HomePage({ onNavigate = () => {} }) {
//   // state for hamburger menu drawer
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // current active bottom nav tab
//   const [activeTab, setActiveTab] = useState('Home');

//   // active slide in hero carousel
//   const [slideIndex, setSlideIndex] = useState(0);

//   // wishlist counter and saved cars array
//   const [wishlistCount, setWishlistCount] = useState(3);
//   const [savedCars, setSavedCars] = useState([1, 2]);

//   // hero slideshow slides
//   const heroSlides = [
//     {
//       id: 1,
//       tag: 'RENT PREMIUM',
//       title: 'Drive the\nExtraordinary',
//       description: 'Get the best cars at the best rates. Fast, secure and reliable.',
//       bgImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
//       carName: 'Mercedes-Benz AMG GT'
//     },
//     {
//       id: 2,
//       tag: 'SUPERCAR EXPERIENCE',
//       title: 'Unleash True\nPerformance',
//       description: 'Top luxury and exotic supercars ready for your next destination.',
//       bgImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
//       carName: 'Porsche 911 Turbo'
//     },
//     {
//       id: 3,
//       tag: 'DAILY COMMUTE',
//       title: 'Comfort Meets\nReliability',
//       description: 'Economic and executive sedans designed for everyday comfort.',
//       bgImage: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1400&q=80',
//       carName: 'BMW M8 Competition'
//     }
//   ];

//   // category cards data
//   const categories = [
//     {
//       id: 'fast',
//       title: 'Fast Cars',
//       subtitle: 'High speed. High thrills.',
//       image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
//     },
//     {
//       id: 'sport',
//       title: 'Sport Cars',
//       subtitle: 'Performance meets style.',
//       image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
//     },
//     {
//       id: 'neutral',
//       title: 'Neutral Cars',
//       subtitle: 'Comfort & class.',
//       image: 'https://media.ed.edmunds-media.com/honda/civic/2026/oem/2026_honda_civic_sedan_si_fq_oem_1_1600.jpg',
//     },
//   ];

//   // brands list
//   const brands = [
//     { name: 'Mercedes', Logo: MercedesLogo },
//     { name: 'Honda', Logo: HondaLogo },
//     { name: 'BMW', Logo: BmwLogo },
//     { name: 'Lamborghini', Logo: LamboLogo },
//     { name: 'Maserati', Logo: MaseratiLogo },
//     { name: 'Audi', Logo: AudiLogo },
//   ];

//   // featured cars with realistic photos covering the cards
//   const featuredCars = [
//     {
//       id: 1,
//       name: 'Mercedes-Benz C63',
//       image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
//       price: 263,
//       tags: [
//         { label: 'Sport', type: 'tag-sport' },
//         { label: 'Automatic', type: 'tag-auto' }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Lamborghini Huracán',
//       image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
//       price: 1126,
//       tags: [
//         { label: 'Supercar', type: 'tag-supercar' },
//         { label: 'Automatic', type: 'tag-auto' }
//       ]
//     },
//     {
//       id: 3,
//       name: 'Honda Civic',
//       image: 'https://media.ed.edmunds-media.com/honda/civic/2026/oem/2026_honda_civic_sedan_si_fq_oem_1_1600.jpg',
//       price: 48,
//       tags: [
//         { label: 'Standard', type: 'tag-standard' },
//         { label: 'Automatic', type: 'tag-auto' }
//       ]
//     },
// {
//       id: 4,
//       name: 'Lexus IS 350 F',
//       image: 'https://www.carscoops.com/wp-content/uploads/2020/10/2021-lexus-is-350-f-sport-1024x554.jpg',
//       price:188,
//       tags:[
//         {label:'sports', type:'tag-sports'},
//          {label:'automatic', type:'tag-auto'}
//       ]
//     }
    
//   ];

//   // lock background scroll when sidebar drawer is open
//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isMenuOpen]);

//   // timer to auto change hero slide every 3 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setSlideIndex((prev) => (prev + 1) % heroSlides.length);
//     }, 3000);

//     return () => clearInterval(timer);
//   }, [heroSlides.length]);

//   // carousel controls
//   const handlePrev = (e) => {
//     e.stopPropagation();
//     setSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
//   };

//   const handleNext = (e) => {
//     e.stopPropagation();
//     setSlideIndex((prev) => (prev + 1) % heroSlides.length);
//   };

//   // navigation router trigger
//   const goToPage = (pageName, data = {}) => {
//     setIsMenuOpen(false);
//     setActiveTab(pageName);
//     onNavigate(pageName, data);
//   };

//   // wishlist bookmark click
//   const handleWishlistToggle = (carId, e) => {
//     e.stopPropagation();
//     if (savedCars.includes(carId)) {
//       setSavedCars(savedCars.filter((id) => id !== carId));
//       setWishlistCount((c) => Math.max(0, c - 1));
//     } else {
//       setSavedCars([...savedCars, carId]);
//       setWishlistCount((c) => c + 1);
//     }
//   };

//   const currentSlide = heroSlides[slideIndex];

//   return (
//     <div className="home-wrapper">
//       {/* sidebar backdrop */}
//       {isMenuOpen && (
//         <div
//           className="drawer-overlay"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}

//       {/* side navigation menu */}
//       <aside className={`side-drawer ${isMenuOpen ? 'drawer-visible' : ''}`}>
//         <div className="drawer-top-bar">
//           <FastCarsLogo isDark={false} />
//           <button
//             onClick={() => setIsMenuOpen(false)}
//             className="drawer-close-btn"
//             aria-label="Close Menu"
//           >
//             <FiX size={22} />
//           </button>
//         </div>

//         {/* scrollable links container */}
//         <div className="drawer-links-area">
//           <nav className="drawer-nav">
//             {[
//               { name: 'Home', page: 'Home', icon: FiHome },
//               { name: 'Browse Cars', page: 'BrowseCars', icon: FaCar },
//               { name: 'Wishlist', page: 'Wishlist', icon: FiHeart },
//               { name: 'Booking History', page: 'History', icon: FiClock },
//               { name: 'Profile', page: 'Profile', icon: FiUser },
//               { name: 'Settings', page: 'Settings', icon: FiSettings },
//               { name: 'Help & Support', page: 'Support', icon: FiHelpCircle },
//             ].map((link) => {
//               const Icon = link.icon;
//               const isSelected = activeTab === link.page;
//               return (
//                 <button
//                   key={link.name}
//                   onClick={() => goToPage(link.page)}
//                   className={`drawer-link ${isSelected ? 'active-link' : ''}`}
//                 >
//                   <Icon size={18} />
//                   <span>{link.name}</span>
//                 </button>
//               );
//             })}
//           </nav>

//           {/* promo banner card */}
//           <div
//             className="drawer-promo"
//             onClick={() => goToPage('BrowseCars')}
//           >
//             <div>
//               <h5>Drive Your Dream</h5>
//               <p>Premium cars. Best rates.</p>
//             </div>
//             <FaCar size={56} className="promo-car-bg" />
//           </div>

//           {/* logout */}
//           <button
//             onClick={() => goToPage('Logout')}
//             className="drawer-logout-btn"
//           >
//             <FiLogOut size={18} />
//             <span>Log Out</span>
//           </button>
//         </div>
//       </aside>

//       {/* header bar */}
//       <header className="main-header">
//         <div className="header-container">
//           {/* hamburger button */}
//           <button
//             onClick={() => setIsMenuOpen(true)}
//             className="header-icon-btn menu-toggle-btn"
//             aria-label="Open Menu"
//           >
//             <FiMenu size={24} />
//           </button>

//           {/* brand logo */}
//           <div onClick={() => goToPage('Home')} className="header-logo-click">
//             <FastCarsLogo isDark={true} />
//           </div>

//           {/* right side icons: wishlist + user avatar */}
//           <div className="header-right-items">
//             <button
//               onClick={() => goToPage('Wishlist')}
//               className="header-icon-btn wishlist-icon-btn"
//               aria-label="Wishlist"
//             >
//               <FiHeart size={22} />
//               {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
//             </button>

//             <div
//               className="user-profile-pill"
//               onClick={() => goToPage('Profile')}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
//                 alt="Joy Jenna"
//                 className="user-avatar-img"
//               />
//               <span className="user-profile-name">Joy Jenna</span>
//               <FiChevronDown size={15} className="user-dropdown-arrow" />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* main body container */}
//       <main className="content-container">
//         {/* hero section slideshow */}
//         <section className="hero-slideshow">
//           {/* background image covering the card */}
//           <div
//             className="hero-background-img"
//             style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
//           />
//           {/* gradient shadow overlay so text is readable */}
//           <div className="hero-dark-overlay" />

//           {/* hero text on top */}
//           <div className="hero-text-content">
//             <span className="hero-small-tag">{currentSlide.tag}</span>
//             <h1 className="hero-main-title">{currentSlide.title}</h1>
//             <p className="hero-subtext">{currentSlide.description}</p>

//             <button
//               onClick={() => goToPage('Booking', { car: currentSlide.carName })}
//               className="hero-action-btn pill-btn"
//             >
//               <span>Book Now</span>
//               <FiArrowRight size={16} />
//             </button>
//           </div>

//           {/* slide arrows */}
//           <button
//             onClick={handlePrev}
//             className="slide-arrow arrow-left"
//             aria-label="Previous Slide"
//           >
//             <FiChevronLeft size={20} />
//           </button>
//           <button
//             onClick={handleNext}
//             className="slide-arrow arrow-right"
//             aria-label="Next Slide"
//           >
//             <FiChevronRight size={20} />
//           </button>

//           {/* pagination dots */}
//           <div className="slideshow-dots">
//             {heroSlides.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setSlideIndex(i)}
//                 className={`dot-indicator ${slideIndex === i ? 'dot-active' : ''}`}
//                 aria-label={`Slide ${i + 1}`}
//               />
//             ))}
//           </div>
//         </section>

//         {/* explore by category */}
//         <section className="page-section">
//           <div className="section-title-row">
//             <h2 className="section-heading">Explore by Category</h2>
//             <button
//               onClick={() => goToPage('Categories')}
//               className="view-all-link"
//             >
//               <span>View All</span>
//               <FiArrowRight size={14} />
//             </button>
//           </div>

//           <div className="category-cards-grid">
//             {categories.map((item) => (
//               <div
//                 key={item.id}
//                 className="category-card interactive-card"
//                 onClick={() => goToPage('CategoryDetail', { cat: item.id })}
//               >
//                 {/* full box photo */}
//                 <div className="category-image-box">
//                   <img src={item.image} alt={item.title} />
//                 </div>

//                 <div className="category-bottom-bar">
//                   <div className="category-text">
//                     <h3>{item.title}</h3>
//                     <p>{item.subtitle}</p>
//                   </div>
//                   <button className="circle-arrow-btn" aria-label="Explore">
//                     <FiArrowRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* top brands section */}
//         <section className="page-section">
//           <div className="section-title-row brand-title-row">
//             <h2 className="section-heading">Top Brands</h2>
//           </div>

//           <div className="brands-horizontal-scroll">
//             <div className="brands-track">
//               {brands.map((b) => {
//                 const BrandIcon = b.Logo;
//                 return (
//                   <div
//                     key={b.name}
//                     className="brand-pill-card interactive-card"
//                     onClick={() => goToPage('BrandDetail', { brand: b.name })}
//                   >
//                     <div className="brand-logo-frame">
//                       <BrandIcon />
//                     </div>
//                     <span className="brand-title">{b.name}</span>
//                   </div>
//                 );
//               })}

//               <button
//                 onClick={() => goToPage('Brands')}
//                 className="brand-scroll-next-btn"
//                 aria-label="View more brands"
//               >
//                 <FiArrowRight size={18} />
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* featured cars section */}
//         <section className="page-section">
//           <div className="section-title-row">
//             <h2 className="section-heading">Featured Cars</h2>
//             <button
//               onClick={() => goToPage('BrowseCars')}
//               className="view-all-link"
//             >
//               <span>View All</span>
//               <FiArrowRight size={14} />
//             </button>
//           </div>

//           <div className="featured-cars-grid">
//             {featuredCars.map((car) => {
//               const isSaved = savedCars.includes(car.id);
//               return (
//                 <div key={car.id} className="car-card interactive-card">
//                   {/* full cover car image */}
//                   <div className="car-image-container">
//                     <img src={car.image} alt={car.name} />
//                     <button
//                       onClick={(e) => handleWishlistToggle(car.id, e)}
//                       className={`card-wishlist-btn ${isSaved ? 'saved' : ''}`}
//                       aria-label="Add to Wishlist"
//                     >
//                       {isSaved ? (
//                         <FaHeart size={16} color="#FF4B55" />
//                       ) : (
//                         <FiHeart size={16} color="#64748B" />
//                       )}
//                     </button>
//                   </div>

//                   <div className="car-info-box">
//                     <h3 className="car-title">{car.name}</h3>

//                     {/* pill badges */}
//                     <div className="car-tags-row">
//                       {car.tags.map((t) => (
//                         <span key={t.label} className={`pill-badge ${t.type}`}>
//                           {t.label}
//                         </span>
//                       ))}
//                     </div>

//                     {/* price row */}
//                     <div className="car-price-row">
//                       <span className="price-number">${car.price}</span>
//                       <span className="price-cycle">/ day</span>
//                     </div>

//                     {/* book now button */}
//                     <button
//                       onClick={() => goToPage('Booking', { carId: car.id, name: car.name, price: car.price })}
//                       className="car-book-btn pill-btn"
//                     >
//                       <span>Book Now</span>
//                       <FiArrowRight size={15} />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       </main>

//       {/* bottom navigation bar */}
//       <footer className="bottom-nav-bar">
//         <div className="bottom-nav-inner">
//           <button
//             onClick={() => goToPage('Home')}
//             className={`nav-tab-btn ${activeTab === 'Home' ? 'tab-active' : ''}`}
//           >
//             <FiHome size={20} />
//             <span>Home</span>
//           </button>

//           <button
//             onClick={() => goToPage('Wishlist')}
//             className={`nav-tab-btn ${activeTab === 'Wishlist' ? 'tab-active' : ''}`}
//           >
//             <div className="tab-icon-wrap">
//               <FiHeart size={20} />
//               {wishlistCount > 0 && <span className="tab-counter-badge">{wishlistCount}</span>}
//             </div>
//             <span>Wishlist</span>
//           </button>

//           {/* elevated book button */}
//           <div className="floating-center-tab">
//             <button
//               onClick={() => goToPage('Booking')}
//               className="center-book-circle"
//               aria-label="Book Car"
//             >
//               <FaCar size={22} />
//             </button>
//             <span className="center-tab-label">Book</span>
//           </div>

//           <button
//             onClick={() => goToPage('History')}
//             className={`nav-tab-btn ${activeTab === 'History' ? 'tab-active' : ''}`}
//           >
//             <FiClock size={20} />
//             <span>History</span>
//           </button>

//           <button
//             onClick={() => goToPage('Settings')}
//             className={`nav-tab-btn ${activeTab === 'Settings' ? 'tab-active' : ''}`}
//           >
//             <FiSettings size={20} />
//             <span>Settings</span>
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { carsData } from '../data/carsData';

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
  FiLogOut
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

// brand logo svgs for the top brands section
const MercedesLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M12 2.5L12 12M12 12L4.5 17.5M12 12L19.5 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const HondaLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <rect x="3" y="3.5" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M7 6.5V17M17 6.5V17M7 11.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BmwLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26">
    <circle cx="12" cy="12" r="10" fill="#172033" stroke="#CBD5E1" strokeWidth="1" />
    <circle cx="12" cy="12" r="7" fill="#FFFFFF" />
    <path d="M12 5A7 7 0 0 1 19 12H12Z" fill="#0066B1" />
    <path d="M5 12A7 7 0 0 1 12 19V12Z" fill="#0066B1" />
  </svg>
);

const LamboLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26">
    <path d="M12 2L4 6V13C4 18 12 22 12 22C12 22 20 18 20 13V6L12 2Z" fill="#C59B27" />
    <path d="M8.5 10C9.5 9 11 9.5 12 10.5C13 9.5 14.5 9 15.5 10C16 11 15 13 14 14L12 17L10 14C9 13 8 11 8.5 10Z" fill="#111827" />
  </svg>
);

const MaseratiLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M12 3L10.5 7L12 8L13.5 7L12 3Z" fill="currentColor" />
    <path d="M6 7L7.5 11L9.5 9L8 6L6 7Z" fill="currentColor" />
    <path d="M18 7L16.5 11L14.5 9L16 6L18 7Z" fill="currentColor" />
    <path d="M10 11H14V14H10V11Z" fill="currentColor" />
    <path d="M11 14H13V21H11V14Z" fill="currentColor" />
  </svg>
);

const AudiLogo = () => (
  <svg viewBox="0 0 36 20" width="34" height="18" fill="none">
    <ellipse cx="7" cy="10" rx="5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
    <ellipse cx="14" cy="10" rx="5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
    <ellipse cx="21" cy="10" rx="5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
    <ellipse cx="28" cy="10" rx="5" ry="5.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export default function HomePage({
  onNavigate = () => {},
  wishlist = [],
  onToggleWishlist = () => {},
  onBookCar = () => {}
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [slideIndex, setSlideIndex] = useState(0);

  // hero slideshow slides
  const heroSlides = [
    {
      id: 1,
      tag: 'RENT PREMIUM',
      title: 'Drive the\nExtraordinary',
      description: 'Get the best cars at the best rates. Fast, secure and reliable.',
      bgImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
      carName: 'Mercedes-Benz AMG GT'
    },
    {
      id: 2,
      tag: 'SUPERCAR EXPERIENCE',
      title: 'Unleash True\nPerformance',
      description: 'Top luxury and exotic supercars ready for your next destination.',
      bgImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
      carName: 'Porsche 911 Turbo'
    },
    {
      id: 3,
      tag: 'DAILY COMMUTE',
      title: 'Comfort Meets\nReliability',
      description: 'Economic and executive sedans designed for everyday comfort.',
      bgImage: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1400&q=80',
      carName: 'BMW M8 Competition'
    }
  ];

  // category cards data
  const categories = [
    {
      id: 'fast',
      title: 'Fast Cars',
      subtitle: 'High speed. High thrills.',
      categoryName: 'Fast Cars',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sport',
      title: 'Sport Cars',
      subtitle: 'Performance meets style.',
      categoryName: 'Sport Cars',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'neutral',
      title: 'Neutral Cars',
      subtitle: 'Comfort & class.',
      categoryName: 'Neutral Cars',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // brands list
  const brands = [
    { name: 'Mercedes', Logo: MercedesLogo },
    { name: 'Honda', Logo: HondaLogo },
    { name: 'BMW', Logo: BmwLogo },
    { name: 'Lamborghini', Logo: LamboLogo },
    { name: 'Maserati', Logo: MaseratiLogo },
    { name: 'Audi', Logo: AudiLogo },
  ];

  // featured cars: grabs the first 4 cars from carsData (includes your exact prices)
  const featuredCars = carsData.slice(0, 4);

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
    }, 3000);
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

  const currentSlide = heroSlides[slideIndex];

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

          <button onClick={() => goToPage('Logout')} className="drawer-logout-btn">
            <FiLogOut size={18} />
            <span>Log Out</span>
          </button>
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

            <div className="user-profile-pill" onClick={() => goToPage('Profile')}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Joy Jenna"
                className="user-avatar-img"
              />
              <span className="user-profile-name">Joy Jenna</span>
              <FiChevronDown size={15} className="user-dropdown-arrow" />
            </div>
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
              onClick={() => goToPage('BrowseCars')}
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
                onClick={() => goToPage('BrowseCars', { category: item.categoryName })}
              >
                <div className="category-image-box">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="category-bottom-bar">
                  <div className="category-text">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
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
              {brands.map((b) => {
                const BrandIcon = b.Logo;
                return (
                  <div
                    key={b.name}
                    className="brand-pill-card interactive-card"
                    onClick={() => goToPage('BrowseCars', { brand: b.name })}
                    title={`View ${b.name} cars`}
                  >
                    <div className="brand-logo-frame">
                      <BrandIcon />
                    </div>
                    <span className="brand-title">{b.name}</span>
                  </div>
                );
              })}

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
      </main>

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