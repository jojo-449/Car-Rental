import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseCars from './pages/BrowseCars';
import WishlistPage from './pages/WishlistPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LogoutPage from './pages/LogoutPage';
import SettingsPage from './pages/SettingsPage';
import SupportPage from './pages/SupportPage';
import CarDetailsPage from './pages/CarDetailsPage';
import CmsPage from './pages/CmsPage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Vehicles from './admin/Vehicles';
import { BrandsPage, CategoriesPage } from './admin/NamedCrud';
import {
  BookingsPage, TestimonialsAdmin, QueriesPage, SubscribersPage, UsersPage, PagesAdmin, AdminPassword,
} from './admin/Moderation';
import { RequireAuth, RequireAdmin } from './components/Guards';
import { useAuth } from './context/AuthContext';
import { useWishlist } from './context/WishlistContext';
import { useAppNav } from './utils/useAppNav';

// props shared by every customer page
function usePageProps() {
  const onNavigate = useAppNav();
  const { ids, toggle } = useWishlist();
  return {
    onNavigate,
    wishlist: ids,
    onToggleWishlist: toggle,
    // booking needs dates, so "Book Now" opens the vehicle page
    onBookCar: (car) => onNavigate('CarDetails', { car }),
  };
}

function Home() {
  return <HomePage {...usePageProps()} />;
}

function Browse() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return (
    <BrowseCars
      key={search}
      {...usePageProps()}
      initialBrandId={params.get('brand_id') || ''}
      initialCategoryId={params.get('category_id') || ''}
    />
  );
}

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <CarDetailsPage key={id} carId={id} {...usePageProps()} onBooked={() => navigate('/history')} />;
}

function Wishlist() {
  const { items } = useWishlist();
  return <WishlistPage {...usePageProps()} wishlistItems={items} />;
}

function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const props = usePageProps();
  const from = location.state?.from || '/';
  const dest = (u) => (u.is_admin && from === '/' ? '/admin' : from);
  if (user) return <Navigate to={dest(user)} replace />;
  return <LoginPage {...props} onLoggedIn={(u) => navigate(dest(u), { replace: true })} />;
}

function SignUp() {
  const navigate = useNavigate();
  return <SignUpPage {...usePageProps()} onRegistered={() => navigate('/', { replace: true })} />;
}

function Logout() {
  const { logout } = useAuth();
  return <LogoutPage {...usePageProps()} onConfirmLogout={logout} />;
}

// thin wrappers that inject the shared navigation/wishlist props
const withPageProps = (Component) =>
  function Wrapped() {
    return <Component {...usePageProps()} />;
  };
const History = withPageProps(HistoryPage);
const Profile = withPageProps(ProfilePage);
const Settings = withPageProps(SettingsPage);
const Support = withPageProps(SupportPage);
const Contact = withPageProps(ContactPage);
const Testimonials = withPageProps(TestimonialsPage);

function Cms() {
  const { type } = useParams();
  return <CmsPage type={type} {...usePageProps()} />;
}

export default function App() {
  const { loading } = useAuth();
  if (loading) return <div className="route-loading" style={{ padding: 40, textAlign: 'center' }}>Loading…</div>;

  const guard = (el) => <RequireAuth>{el}</RequireAuth>;

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Browse />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/wishlist" element={guard(<Wishlist />)} />
        <Route path="/history" element={guard(<History />)} />
        <Route path="/profile" element={guard(<Profile />)} />
        <Route path="/settings" element={guard(<Settings />)} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/page/:type" element={<Cms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={guard(<Logout />)} />

        <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="brands" element={<BrandsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="queries" element={<QueriesPage />} />
          <Route path="subscribers" element={<SubscribersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="pages" element={<PagesAdmin />} />
          <Route path="password" element={<AdminPassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
