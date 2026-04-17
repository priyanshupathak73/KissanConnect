import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kissanconnect_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (payload) => api.post('/auth/login', payload),
  register: (payload) => api.post('/auth/register', payload),
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userId, payload) => api.put(`/users/${userId}`, payload),
};

export const productApi = {
  getProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (payload) => api.post('/products', payload, payload instanceof FormData
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : undefined),
  updateProduct: (id, payload) => api.put(`/products/${id}`, payload),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export const orderApi = {
  getOrders: (params) => api.get('/orders', { params }),
  createOrder: (payload) => api.post('/orders', payload),
  updateOrderStatus: (id, payload) => api.patch(`/orders/${id}/status`, payload),
  getFarmerEarnings: (farmerId) => api.get(`/orders/farmer/${farmerId}/earnings`),
};

export const userApi = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (payload) => api.post('/users/profile/update', payload),
  updateProfileById: (userId, payload) => api.put(`/users/${userId}`, payload),
};

export default api;
