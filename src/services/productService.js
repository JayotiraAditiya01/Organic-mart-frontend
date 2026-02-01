import api from './api';

// Get all products
export const getProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/products${queryString ? `?${queryString}` : ''}`);
  return response.data;
};

// Get single product by ID
export const getProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

// Get featured products
export const getFeaturedProducts = async () => {
  const response = await api.get('/products?featured=true&limit=8');
  return response.data;
};

// Search products
export const searchProducts = async (searchTerm) => {
  const response = await api.get(`/products?search=${searchTerm}`);
  return response.data;
};
