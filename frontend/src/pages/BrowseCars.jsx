// import React, { useState } from 'react';

// import './BrowseCars.css';

// // standard react-icons
// import {
//   FiArrowLeft,
//   FiSearch,
//   FiHeart,
//   FiArrowRight,
//   FiSliders
// } from 'react-icons/fi';
// import { FaHeart } from 'react-icons/fa';

// // sample car catalogue
// const initialCars = [
//   {
//     id: 1,
//     name: 'Mercedes-Benz C63',
//     brand: 'Mercedes',
//     category: 'Sport Cars',
//     price: 263,
//     image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=700&q=80',
//     tags: [
//       { label: 'Sport', type: 'tag-sport' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Lamborghini Huracán',
//     brand: 'Lamborghini',
//     category: 'Fast Cars',
//     price: 1126,
//     image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=80',
//     tags: [
//       { label: 'Supercar', type: 'tag-supercar' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Honda Civic',
//     brand: 'Honda',
//     category: 'Neutral Cars',
//     price: 48,
//     image: 'https://media.ed.edmunds-media.com/honda/civic/2026/oem/2026_honda_civic_sedan_si_fq_oem_1_1600.jpg',
//     tags: [
//       { label: 'Standard', type: 'tag-neutral' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 4,
//     name: '2024 BMW M4 Competition',
//     brand: 'BMW',
//     category: 'Sport Cars',
//     price: 450,
//     image: 'https://hips.hearstapps.com/hmg-prod/images/2022-bmw-m4-front-three-quarters-64075157a1722.jpg',
//     tags: [
//       { label: 'Sport', type: 'tag-sport' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 5,
//     name: 'Audi R8 V10',
//     brand: 'Audi',
//     category: 'Fast Cars',
//     price: 901,
//     image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=700&q=80',
//     tags: [
//       { label: 'Supercar', type: 'tag-supercar' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 6,
//     name: 'Maserati Ghibli Hybrid',
//     brand: 'Maserati',
//     category: 'Neutral Cars',
//     price: 369,
//     image: 'https://cimg0.ibsrv.net/ibimg/hgm/1920x1080-1/100/752/maserati-ghibli_100752668.jpg',
//     tags: [
//       { label: 'Luxury', type: 'tag-sport' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   }
// ];

// export default function BrowseCars({
//   onNavigate = () => {},
//   wishlist = [],
//   onToggleWishlist = () => {},
//   onBookCar = () => {}
// }) {
//   // filter & search state
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');

//   const filterTabs = ['All', 'Fast Cars', 'Sport Cars', 'Neutral Cars'];

//   // filter cars based on category and search query
//   const filteredCars = initialCars.filter((car) => {
//     const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
//     const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           car.brand.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="browse-page-wrapper">
//       {/* top header bar */}
//       <header className="browse-top-bar">
//         <button
//           onClick={() => onNavigate('Home')}
//           className="back-icon-btn"
//           aria-label="Back to Home"
//         >
//           <FiArrowLeft size={22} />
//         </button>
//         <h1 className="browse-page-heading">Browse Cars</h1>
//         <div style={{ width: '38px' }} /> {/* keeps title centered */}
//       </header>

//       <main className="browse-content">
//         {/* search bar input */}
//         <div className="browse-search-box">
//           <FiSearch size={18} className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search by model or brand (e.g. BMW, Honda)..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="search-input"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery('')}
//               className="search-clear-btn"
//             >
//               ×
//             </button>
//           )}
//         </div>

//         {/* category pill filter tabs */}
//         <div className="category-pills-row">
//           {filterTabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setSelectedCategory(tab)}
//               className={`category-pill ${selectedCategory === tab ? 'pill-active' : ''}`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* cars count info */}
//         <div className="browse-results-count">
//           <span>Showing <strong>{filteredCars.length}</strong> available vehicles</span>
//         </div>

//         {/* cars grid */}
//         {filteredCars.length === 0 ? (
//           <div className="no-cars-found">
//             <p>No vehicles match your search criteria.</p>
//             <button
//               onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
//               className="reset-filters-btn"
//             >
//               Reset Filters
//             </button>
//           </div>
//         ) : (
//           <div className="browse-cars-grid">
//             {filteredCars.map((car) => {
//               const isSaved = wishlist.includes(car.id);
//               return (
//                 <div key={car.id} className="car-card interactive-card">
//                   {/* full cover car photo */}
//                   <div className="car-image-container">
//                     <img src={car.image} alt={car.name} />
//                     <button
//                       onClick={() => onToggleWishlist(car.id)}
//                       className={`card-wishlist-btn ${isSaved ? 'saved' : ''}`}
//                       aria-label="Bookmark car"
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

//                     {/* tags */}
//                     <div className="car-tags-row">
//                       {car.tags.map((t) => (
//                         <span key={t.label} className={`pill-badge ${t.type}`}>
//                           {t.label}
//                         </span>
//                       ))}
//                     </div>

//                     {/* price */}
//                     <div className="car-price-row">
//                       <span className="price-number">${car.price}</span>
//                       <span className="price-cycle">/ day</span>
//                     </div>

//                     {/* book now button -> directly books and saves to history */}
//                     <button
//                       onClick={() => onBookCar(car)}
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
//         )}
//       </main>
//     </div>
//   );
// }

import React, { useState } from 'react';
import './BrowseCars.css';
import { carsData } from '../data/carsData';

import { FiArrowLeft, FiSearch, FiHeart, FiArrowRight, FiHome, FiClock, FiSettings } from 'react-icons/fi';
import { FaHeart, FaCar } from 'react-icons/fa';

export default function BrowseCars({
  onNavigate = () => {},
  initialBrand = 'All',
  initialCategory = 'All',
  wishlist = [],
  onToggleWishlist = () => {},
  onBookCar = () => {}
}) {
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const brandTabs = ['All', 'Mercedes', 'Honda', 'BMW', 'Lamborghini', 'Maserati', 'Audi', 'Lexus'];
  const categoryTabs = ['All', 'Fast Cars', 'Sport Cars', 'Neutral Cars'];

  // filter cars based on brand, category, and search query
  const filteredCars = carsData.filter((car) => {
    const matchesBrand = selectedBrand === 'All' || car.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesSearch;
  });

  return (
    <div className="browse-page-wrapper">
      {/* top header bar */}
      <header className="browse-top-bar">
        <button
          onClick={() => onNavigate('Home')}
          className="back-icon-btn"
          aria-label="Back to Home"
        >
          <FiArrowLeft size={22} />
        </button>
        <h1 className="browse-page-heading">
          {selectedBrand !== 'All' ? `${selectedBrand} Cars` : 'Browse Cars'}
        </h1>
        <div style={{ width: '38px' }} />
      </header>

      <main className="browse-content">
        {/* search bar input */}
        <div className="browse-search-box">
          <FiSearch size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by model or brand (e.g. BMW, Honda)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="search-clear-btn">
              ×
            </button>
          )}
        </div>

        {/* Brand filter tabs (activated when brand logo clicked on Home) */}
        <div className="category-pills-row">
          {brandTabs.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`category-pill ${selectedBrand.toLowerCase() === brand.toLowerCase() ? 'pill-active' : ''}`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Category filter tabs */}
        <div className="category-pills-row" style={{ marginTop: '8px' }}>
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className={`category-pill ${selectedCategory === tab ? 'pill-active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* cars count info */}
        <div className="browse-results-count">
          <span>Showing <strong>{filteredCars.length}</strong> available vehicles</span>
        </div>

        {/* cars grid */}
        {filteredCars.length === 0 ? (
          <div className="no-cars-found">
            <p>No vehicles match your search criteria.</p>
            <button
              onClick={() => { setSelectedBrand('All'); setSelectedCategory('All'); setSearchQuery(''); }}
              className="reset-filters-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="browse-cars-grid">
            {filteredCars.map((car) => {
              const isSaved = wishlist.includes(car.id);
              return (
                <div
                  key={car.id}
                  className="car-card interactive-card"
                  onClick={() => onNavigate('CarDetails', { car })}
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
                      aria-label="Bookmark car"
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
        )}
      </main>

      {/* bottom navigation bar */}
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