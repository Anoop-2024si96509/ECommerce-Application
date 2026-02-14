import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

// Add token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

export const productService = {
  getAllProducts: (search, category) => 
    api.get('/products', { params: { search, category } }),
  getProductById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories')
};

export const orderService = {
  createOrder: (items) => api.post('/orders', { items }),
  getUserOrders: () => api.get('/orders'),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`)
};

export const paymentService = {
  processPayment: (data) => api.post('/payment/process', data)
};

export default api;
