import api from './api';

// Generate or get session ID for guest users
const getSessionId = () => {
  let sessionId = localStorage.getItem('guestSessionId');
  if (!sessionId) {
    sessionId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('guestSessionId', sessionId);
  }
  return sessionId;
};

// Get user's cart
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

// Get guest cart
export const getGuestCart = async () => {
  const sessionId = getSessionId();
  const response = await api.post('/cart/guest/get', { sessionId });
  return response.data;
};

// Add item to cart (for authenticated users)
export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post('/cart/add', { productId, quantity });
  return response.data;
};

// Add item to guest cart
export const addToGuestCart = async (productId, quantity = 1) => {
  try {
    const sessionId = getSessionId();
    console.log('🛒 Adding to guest cart:', { productId, quantity, sessionId });
    console.log('📡 Full URL:', api.defaults.baseURL + '/cart/guest/add');
    
    const response = await api.post('/cart/guest/add', { productId, quantity, sessionId });
    console.log('✅ Guest cart response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error in addToGuestCart:', error.response?.data || error.message);
    throw error;
  }
};

// Update guest cart item quantity
export const updateGuestCartItem = async (productId, quantity) => {
  try {
    const sessionId = getSessionId();
    console.log('🔄 Updating guest cart:', { productId, quantity, sessionId });
    const response = await api.put('/cart/guest/update', { productId, quantity, sessionId });
    console.log('✅ Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error in updateGuestCartItem:', error.response?.data || error.message);
    throw error;
  }
};

// Remove item from guest cart
export const removeFromGuestCart = async (productId) => {
  try {
    const sessionId = getSessionId();
    console.log('🗑️ Removing from guest cart:', { productId, sessionId });
    const response = await api.delete(`/cart/guest/remove/${productId}`, { data: { sessionId } });
    console.log('✅ Remove response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error in removeFromGuestCart:', error.response?.data || error.message);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  const response = await api.put('/cart/update', { productId, quantity });
  return response.data;
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/remove/${productId}`);
  return response.data;
};

// Clear entire cart
export const clearCart = async () => {
  const response = await api.delete('/cart/clear');
  return response.data;
};

// Clear guest cart
export const clearGuestCart = async () => {
  try {
    const sessionId = getSessionId();
    // Find and clear the cart in MongoDB
    const response = await api.post('/cart/guest/clear', { sessionId });
    return response.data;
  } catch (error) {
    console.error('❌ Error clearing guest cart:', error.response?.data || error.message);
    throw error;
  }
};
