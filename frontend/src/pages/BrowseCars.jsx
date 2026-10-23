import React, { useState, useEffect } from 'react';
import './BrowseCars.css';
import { carsApi, brandsApi, categoriesApi } from '../api';
import { adaptCar } from '../utils/cars';

import { FiArrowLeft, FiSearch, FiHeart, FiArrowRight, FiHome, FiClock, FiSettings } from 'react-icons/fi';
import { FaHeart, FaCar } from 'react-icons/fa';

export default function BrowseCars({
  onNavigate = () => {},
  initialBrandId = '',
  initialCategoryId = '',
  wishlist = [],
  onToggleWishlist = () => {},
  onBookCar = () => {}
}) {
  const [selectedBrand, setSelectedBrand] = useState(initialBrandId ? String(initialBrandId) : 'All');
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId ? String(initialCategoryId) : 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    brandsApi.list().then(setBrands).catch(() => {});
    categoriesApi.list().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    carsApi
      .list({
        brand_id: selectedBrand,
        category_id: selectedCategory,
        search: debouncedSearch,
      })
      .then((cars) => {
        if (cancelled) return;
        setFilteredCars(cars.map(adaptCar));
        setError('');
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [selectedBrand, selectedCategory, debouncedSearch]);

  const brandTabs = [{ id: 'All', name: 'All' }, ...brands.map((b) => ({ id: String(b.id), name: b.name }))];
  const categoryTabs = [{ id: 'All', name: 'All' }, ...categories.map((c) => ({ id: String(c.id), name: c.name }))];
  const selectedBrandName = brandTabs.find((b) => b.id === selectedBrand)?.name || 'All';

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
          {selectedBrandName !== 'All' ? `${selectedBrandName} Cars` : 'Browse Cars'}
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
              key={brand.id}
              onClick={() => setSelectedBrand(brand.id)}
              className={`category-pill ${selectedBrand === brand.id ? 'pill-active' : ''}`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Category filter tabs */}
        <div className="category-pills-row" style={{ marginTop: '8px' }}>
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`category-pill ${selectedCategory === tab.id ? 'pill-active' : ''}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* cars count info */}
        <div className="browse-results-count">
          <span>{loading ? 'Loading vehicles…' : <>Showing <strong>{filteredCars.length}</strong> available vehicles</>}</span>
          {error && <span style={{ color: '#DC2626', marginLeft: 8 }}>{error}</span>}
        </div>

        {/* cars grid */}
        {!loading && filteredCars.length === 0 ? (
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