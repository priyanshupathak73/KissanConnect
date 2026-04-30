import axios from 'axios';

// Storage keys used by both frontend and the API layer
const TOKEN_STORAGE_KEY = 'kissanconnect_token';

// Create a shared axios instance for API requests. Base URL can be overridden
// by environment variable `REACT_APP_API_URL` for deployment.
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach authorization token automatically when present in localStorage.
apiClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // In restricted environments (e.g. server-side rendering) localStorage may be unavailable.
  }
  return config;
});

// Centralized error extractor to keep service calls tidy.
const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || 'Request failed';
};

// Authentication-related endpoints
export const authService = {
  login: async (credentials) => {
    try {
      const res = await apiClient.post('/auth/login', credentials);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  register: async (payload) => {
    try {
      const res = await apiClient.post('/auth/register', payload);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  getProfile: async (userId) => {
    try {
      const res = await apiClient.get(`/users/${userId}`);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  // Note: server expects PUT /users/:id for profile updates
  updateProfile: async (userId, payload) => {
    try {
      const res = await apiClient.put(`/users/${userId}`, payload);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
};

// Product-related endpoints
export const productService = {
  getAll: async (params) => {
    try {
      const res = await apiClient.get('/products', { params });
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  getById: async (id) => {
    try {
      const res = await apiClient.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  // Accepts either JSON body or FormData for file uploads
  create: async (payload) => {
    try {
      const config = {};
      if (payload instanceof FormData) {
        config.headers = { 'Content-Type': 'multipart/form-data' };
      }
      const res = await apiClient.post('/products', payload, config);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  update: async (id, payload) => {
    try {
      const res = await apiClient.put(`/products/${id}`, payload);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  remove: async (id) => {
    try {
      const res = await apiClient.delete(`/products/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
};

// Order-related endpoints
export const orderService = {
  list: async (params) => {
    try {
      const res = await apiClient.get('/orders', { params });
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  create: async (payload) => {
    try {
      const res = await apiClient.post('/orders', payload);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  updateStatus: async (orderId, payload) => {
    try {
      const res = await apiClient.patch(`/orders/${orderId}/status`, payload);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  getFarmerEarnings: async (farmerId) => {
    try {
      const res = await apiClient.get(`/orders/farmer/${farmerId}/earnings`);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
};

// User convenience endpoints (profile update endpoint used by some frontend pages)
export const userService = {
  getProfile: async (userId) => authService.getProfile(userId),
  updateProfile: async (payload) => {
    try {
      const res = await apiClient.post('/users/profile/update', payload);
      return res.data;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  },
  updateById: async (userId, payload) => authService.updateProfile(userId, payload),
};

export default apiClient;
