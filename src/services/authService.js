import api from './api';

// Register new user
export const register = async (userData) => {
  try {
    console.log('🔵 Registering user:', { name: userData.fullName || userData.name, email: userData.email });
    const response = await api.post('/auth/register', {
      name: userData.fullName || userData.name,
      email: userData.email,
      password: userData.password,
    });
    
    console.log('✅ Registration successful:', response.data);
    
    if (response.data.success) {
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    console.log('🔵 Logging in user:', credentials.email);
    const response = await api.post('/auth/login', credentials);
    
    console.log('✅ Login successful:', response.data);
    
    if (response.data.success) {
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Get user profile
export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
