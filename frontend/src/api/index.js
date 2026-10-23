import { get, post, put, del, request } from './client';

export const authApi = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password }, auth: false }),
  register: (data) => request('/auth/register', { method: 'POST', body: data, auth: false }),
  me: () => get('/auth/me'),
  updateProfile: (data) => put('/auth/profile', data),
  changePassword: (old_password, new_password) => post('/auth/change-password', { old_password, new_password }),
  recover: (data) => request('/auth/recover-password', { method: 'POST', body: data, auth: false }),
};

export const carsApi = {
  list: (params) => get('/cars', params),
  featured: () => get('/cars/featured'),
  slider: () => get('/cars/slider'),
  get: (id) => get(`/cars/${id}`),
  create: (data) => post('/cars', data),
  update: (id, data) => put(`/cars/${id}`, data),
  remove: (id) => del(`/cars/${id}`),
};

const crud = (base) => ({
  list: () => get(base),
  create: (data) => post(base, data),
  update: (id, data) => put(`${base}/${id}`, data),
  remove: (id) => del(`${base}/${id}`),
});
export const brandsApi = crud('/brands');
export const categoriesApi = crud('/categories');

export const wishlistApi = {
  list: () => get('/wishlist'),
  toggle: (carId) => post(`/wishlist/toggle/${carId}`),
};

export const bookingsApi = {
  create: (data) => post('/bookings', data),
  history: (status_filter) => get('/bookings/my-history', { status_filter }),
  cancel: (id) => put(`/bookings/${id}/cancel`),
  adminAll: (status_filter) => get('/bookings/admin/all', { status_filter }),
  adminStatus: (id, status) => put(`/bookings/admin/${id}/status`, { status }),
};

export const testimonialsApi = {
  list: () => get('/testimonials'),
  create: (content) => post('/testimonials', { content }),
  adminAll: () => get('/testimonials/all'),
  setStatus: (id, status) => put(`/testimonials/${id}/status`, { status }),
  remove: (id) => del(`/testimonials/${id}`),
};

export const contactApi = {
  send: (data) => request('/contact', { method: 'POST', body: data, auth: false }),
  subscribe: (email) => request('/contact/subscribe', { method: 'POST', body: { email }, auth: false }),
  queries: () => get('/contact/queries'),
  setQueryStatus: (id, status) => put(`/contact/queries/${id}/status`, { status }),
  removeQuery: (id) => del(`/contact/queries/${id}`),
  subscribers: () => get('/contact/subscribers'),
  removeSubscriber: (id) => del(`/contact/subscribers/${id}`),
};

export const supportApi = {
  faqs: (category) => get('/support/faqs', { category }),
  ask: (query) => post('/support/ask', { query }),
};

export const pagesApi = {
  list: () => get('/pages'),
  get: (type) => get(`/pages/${type}`),
  update: (type, data) => put(`/pages/${type}`, data),
};

export const adminApi = {
  dashboard: () => get('/admin/dashboard'),
  users: () => get('/admin/users'),
};
