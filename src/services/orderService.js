import api from './api';

// Create new order
export const createOrder = async (orderData) => {
  const response = await api.post('/orders/create', orderData);
  return response.data;
};

// Get user's orders
export const getMyOrders = async () => {
  const response = await api.get('/orders/my');
  return response.data;
};

// Get single order by ID
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// Cancel order
export const cancelOrder = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/cancel`);
  return response.data;
};
