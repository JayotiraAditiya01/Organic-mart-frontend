import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const LikesContext = createContext();

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
};

export const LikesProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  // Load liked products from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      try {
        setLikedProducts(JSON.parse(savedLikes));
      } catch (error) {
        console.error('Error loading liked products:', error);
        setLikedProducts([]);
      }
    }
  }, []);

  // Save to localStorage whenever likedProducts changes
  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const isLiked = prev.includes(productId);
      
      if (isLiked) {
        toast.success('Removed from favorites');
        return prev.filter(id => id !== productId);
      } else {
        toast.success('Added to favorites');
        return [...prev, productId];
      }
    });
  };

  const isLiked = (productId) => {
    return likedProducts.includes(productId);
  };

  const clearLikes = () => {
    setLikedProducts([]);
    localStorage.removeItem('likedProducts');
    toast.success('All favorites cleared');
  };

  const value = {
    likedProducts,
    toggleLike,
    isLiked,
    clearLikes,
    likedCount: likedProducts.length
  };

  return (
    <LikesContext.Provider value={value}>
      {children}
    </LikesContext.Provider>
  );
};
