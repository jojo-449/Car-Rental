import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './admin.css';
import { useAuth } from '../context/AuthContext';

const LINKS = [
  ['/admin', 'Dashboard', true],
  ['/admin/vehicles', 'Vehicles'],
  ['/admin/brands', 'Brands'],
  ['/admin/categories', 'Categories'],
  ['/admin/bookings', 'Bookings'],
  ['/admin/testimonials', 'Testimonials'],
  ['/admin/queries', 'Contact Queries'],
  ['/admin/subscribers', 'Subscribers'],
  ['/admin/users', 'Registered Users'],
  ['/admin/pages', 'Page Content'],
  ['/admin/password', 'Change Password'],
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">FAST CARS ADMIN</div>
        {LINKS.map(([to, label, end]) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            {label}
          </NavLink>
        ))}
        <div className="admin-sidebar-spacer" />
        <button className="admin-nav-link" onClick={() => navigate('/')}>← View Website</button>
        <button className="admin-nav-link" onClick={() => { logout(); navigate('/login'); }}>Log Out</button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
