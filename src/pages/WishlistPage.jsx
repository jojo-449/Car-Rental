// import React from 'react';
// import './WishlistPage.css';
// import { carsData } from '../data/carsData';

// //  icons
// import { FiArrowLeft, FiHeart } from 'react-icons/fi';
// import { FaHeart } from 'react-icons/fa';

// export default function WishlistPage({
//   onNavigate = () => {},
//   wishlist = [],
//   allCars = [],
//   onToggleWishlist = () => {},
//   onBookCar = () => {}
// }) {
//   // get the cars that are actually in the user's wishlist
//   // const savedCarsList = allCars.filter((car) => wishlist.includes(car.id));
//   const savedCarsList = carsData.filter((car) => wishlist.includes(car.id));

//   return (
//     <div className="wishlist-page-wrapper">
//       {/* top bar */}
//       <header className="wishlist-top-bar">
//         <button
//           onClick={() => onNavigate('Home')}
//           className="back-icon-btn"
//           aria-label="Back to Home"
//         >
//           <FiArrowLeft size={22} />
//         </button>
//         <h1 className="wishlist-heading">My Wishlist</h1>
//         <div style={{ width: '38px' }} />
//       </header>

//       <main className="wishlist-content">
//         {savedCarsList.length === 0 ? (
//           <div className="empty-wishlist-box">
//             <FiHeart size={54} className="empty-heart-icon" />
//             <h3>Your wishlist is empty</h3>
//             <p>Save cars you are interested in to book them quickly later.</p>
//             <button
//               onClick={() => onNavigate('BrowseCars')}
//               className="browse-now-btn pill-btn"
//             >
//               Browse Available Cars
//             </button>
//           </div>
//         ) : (
//           <div className="wishlist-items-list">
//             {savedCarsList.map((car) => (
//               <div key={car.id} className="wishlist-card interactive-card">
//                 {/* car thumbnail */}
//                 <div className="wishlist-thumbnail">
//                   <img src={car.image} alt={car.name} />
//                 </div>

//                 {/* car name and price */}
//                 <div className="wishlist-details">
//                   <h3 className="wishlist-car-name">{car.name}</h3>
//                   <div className="wishlist-price">
//                     <span className="price-val">${car.price}</span>
//                     <span className="price-sub">/ day</span>
//                   </div>
//                 </div>

//                 {/* action buttons: heart removal & book button */}
//                 <div className="wishlist-card-actions">
//                   <button
//                     onClick={() => onToggleWishlist(car.id)}
//                     className="wishlist-remove-btn"
//                     aria-label="Remove from Wishlist"
//                   >
//                     <FaHeart size={18} color="#FF4B55" />
//                   </button>

//                   <button
//                     onClick={() => onBookCar(car)}
//                     className="wishlist-view-btn pill-btn"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


import React from 'react';
import './WishlistPage.css';
import { carsData } from '../data/carsData';

import { FiArrowLeft, FiHeart, FiArrowRight, FiHome, FiClock, FiSettings } from 'react-icons/fi';
import { FaHeart, FaCar } from 'react-icons/fa';

export default function WishlistPage({
  onNavigate = () => {},
  wishlist = [],
  onToggleWishlist = () => {},
  onBookCar = () => {}
}) {
  // grabs the actual saved cars from carsData
  const savedCarsList = carsData.filter((car) => wishlist.includes(car.id));

  return (
    <div className="wishlist-page-wrapper">
      <header className="wishlist-top-bar">
        <button onClick={() => onNavigate('Home')} className="back-icon-btn" aria-label="Back">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="wishlist-heading">My Wishlist</h1>
        <div style={{ width: '38px' }} />
      </header>

      <main className="wishlist-content">
        <div className="wishlist-header-info">
          <span className="wishlist-count-text">{savedCarsList.length} saved cars</span>
        </div>

        {savedCarsList.length === 0 ? (
          <div className="empty-wishlist-box">
            <FiHeart size={54} className="empty-heart-icon" />
            <h3>Your wishlist is empty</h3>
            <p>Tap the heart icon on any car to bookmark it here.</p>
            <button onClick={() => onNavigate('BrowseCars')} className="browse-now-btn pill-btn">
              Browse Available Cars
            </button>
          </div>
        ) : (
          <div className="wishlist-items-list">
            {savedCarsList.map((car) => (
              <div
                key={car.id}
                className="wishlist-card interactive-card"
                onClick={() => onNavigate('CarDetails', { car })}
                title={`View details for ${car.name}`}
              >
                <div className="wishlist-thumbnail">
                  <img src={car.image} alt={car.name} />
                </div>

                <div className="wishlist-details">
                  <h3 className="wishlist-car-name">{car.name}</h3>
                  <div className="wishlist-price">
                    <span className="price-val">${car.price}</span>
                    <span className="price-sub">/ day</span>
                  </div>
                  <div className="car-tags-row" style={{ margin: '6px 0 10px 0' }}>
                    {car.tags.map((t) => (
                      <span key={t.label} className={`pill-badge ${t.type}`}>{t.label}</span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookCar(car);
                    }}
                    className="wishlist-view-btn pill-btn"
                  >
                    <span>Book Now</span>
                    <FiArrowRight size={14} />
                  </button>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(car.id);
                  }}
                  className="wishlist-remove-btn"
                  aria-label="Remove"
                  title="Remove from wishlist"
                >
                  <FaHeart size={18} color="#FF4B55" />
                </button>
              </div>
            ))}
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
          <button onClick={() => onNavigate('Wishlist')} className="nav-tab-btn tab-active">
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