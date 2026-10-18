
// import React, { useState } from 'react';
// import HomePage from './pages/HomePage';
// import BrowseCars from './pages/BrowseCars';
// import WishlistPage from './pages/WishlistPage';
// import HistoryPage from './pages/HistoryPage';
// import ProfilePage from './pages/ProfilePage';

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('Home');

//   return (
//     <div className="app-root">
//       {currentPage === 'Home' && <HomePage onNavigate={setCurrentPage} />}
//       {currentPage === 'BrowseCars' && <BrowseCars onNavigate={setCurrentPage} />}
//       {currentPage === 'Wishlist' && <WishlistPage onNavigate={setCurrentPage} />}
//       {currentPage === 'History' && <HistoryPage onNavigate={setCurrentPage} />}
//       {currentPage === 'Profile' && <ProfilePage onNavigate={setCurrentPage} />}
//     </div>
//   );
// }




import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import BrowseCars from './pages/BrowseCars';
import WishlistPage from './pages/WishlistPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [navParams, setNavParams] = useState({});

  // shared wishlist IDs: start with cars 1 and 2
  const [wishlist, setWishlist] = useState([1, 2]);

  // booking records
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 101,
      carName: 'Mercedes-Benz C63',
      rentedDate: '12 Apr 2025',
      status: 'Returned',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 102,
      carName: 'Lamborghini Huracán',
      rentedDate: '03 Apr 2025',
      status: 'Returned',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 103,
      carName: 'Honda Civic',
      rentedDate: '20 Mar 2025',
      status: 'Returned',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=400&q=80'
    }
  ]);

  // navigation router
  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setNavParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // toggle car in/out of wishlist
  const handleToggleWishlist = (carId) => {
    if (wishlist.includes(carId)) {
      setWishlist(wishlist.filter((id) => id !== carId));
    } else {
      setWishlist([...wishlist, carId]);
    }
  };

  // booking action
  const handleBookCar = (car) => {
    const newBooking = {
      id: Date.now(),
      carName: car.name,
      rentedDate: 'Today',
      status: 'Pending',
      image: car.image
    };
    setBookingHistory([newBooking, ...bookingHistory]);
    handleNavigate('History');
  };

  return (
    <div className="app-root">
      {currentPage === 'Home' && (
        <HomePage
          onNavigate={handleNavigate}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onBookCar={handleBookCar}
        />
      )}

      {currentPage === 'BrowseCars' && (
        <BrowseCars
          onNavigate={handleNavigate}
          initialBrand={navParams.brand || 'All'}
          initialCategory={navParams.category || 'All'}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onBookCar={handleBookCar}
        />
      )}

      {currentPage === 'Wishlist' && (
        <WishlistPage
          onNavigate={handleNavigate}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onBookCar={handleBookCar}
        />
      )}

      {currentPage === 'History' && (
        <HistoryPage
          onNavigate={handleNavigate}
          bookingHistory={bookingHistory}
        />
      )}

      {currentPage === 'Profile' && (
        <ProfilePage onNavigate={handleNavigate} />
      )}

      {currentPage === 'Login' && (
        <LoginPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'Logout' && (
        <LogoutPage
          onNavigate={handleNavigate}
          onConfirmLogout={() => setWishlist([])}
        />
      )}
    </div>
  );
}