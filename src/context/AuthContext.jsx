import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, logout as logoutService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      console.log('🔍 Checking authentication...');
      if (isAuthenticated()) {
        const currentUser = getCurrentUser();
        console.log('✅ User authenticated:', currentUser);
        setUser(currentUser);
      } else {
        console.log('❌ No authenticated user');
        setUser(null);
      }
      setLoading(false);
      setIsAuthChecked(true);
    };

    // Add a small delay to ensure localStorage is ready
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = (userData, token) => {
    console.log('🔑 Logging in user:', userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    console.log('🚪 Logging out user');
    await logoutService();
    setUser(null);
  };

  const updateUser = (userData) => {
    console.log('📝 Updating user:', userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    isAuthChecked,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
