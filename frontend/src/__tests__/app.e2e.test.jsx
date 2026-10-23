// Smoke test against a running backend (uv run uvicorn main:app --port 8080).
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import { WishlistProvider } from '../context/WishlistContext';

window.scrollTo = () => {};

const mount = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </AuthProvider>
    </MemoryRouter>
  );

const login = async (email, password) => {
  const user = userEvent.setup();
  await user.type(await screen.findByPlaceholderText('Enter your email'), email);
  await user.type(screen.getByPlaceholderText('Enter your password'), password);
  await user.click(screen.getByRole('button', { name: 'Log In' }));
  return user;
};

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

describe('guest', () => {
  it('home shows live featured cars, brands and categories', async () => {
    mount('/');
    expect((await screen.findAllByText('Honda Civic')).length).toBeGreaterThan(0);
    expect(await screen.findByText('Explore by Category')).toBeTruthy();
    expect(await screen.findByText('Fast Cars')).toBeTruthy();
  });

  it('browse filters by search', async () => {
    mount('/cars');
    await screen.findByText('Honda Civic');
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Search by model/), 'Lambo');
    await waitFor(() => expect(screen.queryByText('Honda Civic')).toBeNull());
    expect(await screen.findByText('Lamborghini Huracán')).toBeTruthy();
  });

  it('car details shows features and cms pages render', async () => {
    mount('/cars/3');
    expect(await screen.findByText('Accessories & Features')).toBeTruthy();
    cleanup();
    mount('/page/terms');
    expect(await screen.findByText(/valid driver's license/)).toBeTruthy();
  });

  it('protected routes redirect to login', async () => {
    mount('/history');
    expect(await screen.findByText('Welcome Back')).toBeTruthy();
  });
});

describe('customer', () => {
  it('logs in, sees history and wishlist', async () => {
    mount('/login');
    await login('joy.jenna@gmail.com', 'CustomerPassword123');
    expect(await screen.findByText('Joy Jenna')).toBeTruthy();
    cleanup();
    mount('/history');
    expect(await screen.findByText('Booking History')).toBeTruthy();
    await screen.findByText(/Total Cars Rented/);
  });

  it('books a car for free dates, sees it in history, then cancels it', async () => {
    mount('/login');
    await login('joy.jenna@gmail.com', 'CustomerPassword123');
    await screen.findByText('Joy Jenna');
    cleanup();
    mount('/cars/3');
    await screen.findByText('Accessories & Features');
    const [pickup, back] = document.querySelectorAll('input[type="date"]');
    fireEvent.change(pickup, { target: { value: '2031-05-01' } });
    fireEvent.change(back, { target: { value: '2031-05-03' } });
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: /Confirm & Reserve/ }));
    expect(await screen.findByText('Booking History')).toBeTruthy();
    await user.click(await screen.findByText('Cancel booking'));
    expect(await screen.findByText('Cancelled')).toBeTruthy();
  });

  it('rejects bad credentials', async () => {
    mount('/login');
    await login('joy.jenna@gmail.com', 'wrong-password');
    expect(await screen.findByRole('alert')).toBeTruthy();
  });
});

describe('admin', () => {
  it('logs in to the dashboard and opens each admin screen', async () => {
    mount('/login');
    await login('admin@fastcars.com', 'AdminPassword123');
    expect(await screen.findByText('Registered Users', { selector: 'span' })).toBeTruthy();
    cleanup();
    for (const [path, text] of [
      ['/admin/vehicles', 'Post and manage the rental fleet'],
      ['/admin/brands', 'Manage vehicle brands'],
      ['/admin/categories', /Explore by Category/],
      ['/admin/bookings', 'Confirm or cancel customer bookings'],
      ['/admin/testimonials', /Activate or deactivate/],
      ['/admin/queries', /Enquiries from/],
      ['/admin/subscribers', 'Newsletter subscribers'],
      ['/admin/users', /Details of everyone/],
      ['/admin/pages', /Edit About Us/],
    ]) {
      mount(path);
      expect(await screen.findByText(text)).toBeTruthy();
      cleanup();
    }
  });
});
