import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProducts = async (params) => {
  const response = await api.get('/products/', { params });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories/');
  return response.data;
};

export const fetchColors = async () => {
  const response = await api.get('/colors/');
  return response.data;
};

export const fetchSizes = async () => {
  const response = await api.get('/sizes/');
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/categories/', categoryData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.patch(`/categories/${id}/`, categoryData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}/`);
  return response.data;
};

export const fetchProductDetail = async (id) => {
  const response = await api.get(`/products/${id}/`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders/', orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get('/orders/');
  return response.data;
};

export const fetchMessages = async () => {
  const response = await api.get('/messages/');
  return response.data;
};

export const fetchHeroBanners = async () => {
  const response = await api.get('/hero-banners/');
  return response.data;
};

export const fetchTikTokReels = async () => {
  const response = await api.get('/tiktok-reels/');
  return response.data;
};

export const fetchSiteSettings = async () => {
  const response = await api.get('/site-settings/');
  return response.data[0]; // Always take the first one
};

export const updateSiteSettings = async (id, settingsData) => {
  // Use PATCH to only update provided fields
  const response = await api.patch(`/site-settings/${id}/`, settingsData, {
    headers: {
      'Content-Type': settingsData instanceof FormData ? 'multipart/form-data' : 'application/json',
    },
  });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products/', productData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.patch(`/products/${id}/`, productData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}/`);
  return response.data;
};

export const fetchDashboardStats = async () => {
  const [products, orders, messages] = await Promise.all([
    api.get('/products/'),
    api.get('/orders/'),
    api.get('/messages/')
  ]);
  return {
    totalProducts: products.data.length,
    totalOrders: orders.data.length,
    totalMessages: messages.data.length,
    totalSales: orders.data.reduce((sum, order) => sum + (parseInt(order.total_amount.replace(/[^0-9]/g, '')) || 0), 0)
  };
};

export default api;
