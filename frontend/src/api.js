import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - check if backend is running');
    } else if (!error.response) {
      console.error('Network error - is the backend running?');
    }
    return Promise.reject(error);
  }
);

export const fetchProducts = (category) => api.get('/products', { params: { category } });
export const fetchProduct = (id) => api.get(`/products/${id}`);
export const placeOrder = (payload) => api.post('/orders', payload);
export const fetchOrders = () => api.get('/orders');

export default api;