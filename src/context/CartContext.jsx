import { createContext, useContext, useState, useEffect } from "react";
import { 
  getCart, 
  addToCart as addToCartAPI, 
  updateCartItem, 
  removeFromCart as removeFromCartAPI, 
  clearCart as clearCartAPI, 
  addToGuestCart, 
  getGuestCart,
  updateGuestCartItem,
  removeFromGuestCart,
  clearGuestCart
} from "../services/cartService";
import { isAuthenticated } from "../services/authService";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from backend (authenticated users) or guest cart from MongoDB
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated()) {
        try {
          setLoading(true);
          const response = await getCart();
          if (response.success && response.data) {
            // Transform backend cart items to match frontend format
            const transformedItems = response.data.items
              .filter(item => item && item.productId) // Filter out null items
              .map(item => ({
                _id: item.productId._id,
                id: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                image: item.productId.image,
                stock: item.productId.stock,
                quantity: item.quantity
              }));
            setCartItems(transformedItems);
          }
        } catch (error) {
          console.error("Error loading cart from backend:", error);
          // Fallback to localStorage
          const savedCart = localStorage.getItem("organicCart");
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        } finally {
          setLoading(false);
        }
      } else {
        // Load guest cart from MongoDB
        try {
          setLoading(true);
          const response = await getGuestCart();
          console.log('🔄 Loading guest cart from MongoDB:', response);
          if (response.success && response.data && response.data.items && response.data.items.length > 0) {
            // Transform backend cart items to match frontend format
            const transformedItems = response.data.items.map(item => ({
              _id: item.productId._id,
              id: item.productId._id,
              name: item.productId.name,
              price: item.productId.price,
              image: item.productId.image,
              stock: item.productId.stock,
              quantity: item.quantity
            }));
            console.log('✅ Guest cart loaded:', transformedItems);
            setCartItems(transformedItems);
            // Update localStorage as backup
            localStorage.setItem("organicCart", JSON.stringify(transformedItems));
          } else {
            // Fallback to localStorage if MongoDB cart is empty
            const savedCart = localStorage.getItem("organicCart");
            if (savedCart) {
              console.log('📦 Loading from localStorage fallback');
              setCartItems(JSON.parse(savedCart));
            }
          }
        } catch (error) {
          console.error("Error loading guest cart from MongoDB:", error);
          // Fallback to localStorage
          const savedCart = localStorage.getItem("organicCart");
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage for guest users
  useEffect(() => {
    if (!isAuthenticated()) {
      try {
        localStorage.setItem("organicCart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    // Use guest cart API to save to MongoDB
    try {
      console.log('🛒 Adding to cart:', product.name, 'Quantity:', quantity);
      const response = await addToGuestCart(product._id || product.id, quantity);
      if (response.success && response.data) {
        // Transform backend response
        const transformedItems = response.data.items.map(item => ({
          _id: item.productId._id,
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.image,
          stock: item.productId.stock,
          quantity: item.quantity
        }));
        setCartItems(transformedItems);
        console.log('✅ Cart updated successfully:', transformedItems);
        // Show success toast after state update
        setTimeout(() => toast.success("✅ Added to cart! Saved to MongoDB!"), 0);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding to guest cart:", error);
      // Fallback to localStorage only if API completely fails
      const existingItem = cartItems.find((item) => (item.id || item._id) === (product.id || product._id));
      
      if (existingItem) {
        const updatedItems = cartItems.map((item) =>
          (item.id || item._id) === (product.id || product._id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setCartItems(updatedItems);
        setTimeout(() => toast.success(`Added ${quantity} more to cart!`), 0);
      } else {
        setCartItems([...cartItems, { ...product, quantity }]);
        setTimeout(() => toast.success("Added to cart (localStorage)!"), 0);
      }
      return true;
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await removeFromGuestCart(productId);
      if (response.success && response.data) {
        // Transform backend response
        const transformedItems = response.data.items.map(item => ({
          _id: item.productId._id,
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.image,
          stock: item.productId.stock,
          quantity: item.quantity
        }));
        setCartItems(transformedItems);
      }
      setTimeout(() => toast.success("Item removed from cart"), 0);
    } catch (error) {
      console.error("Error removing from cart:", error);
      // Fallback to local removal
      setCartItems((prevItems) => prevItems.filter((item) => (item.id || item._id) !== productId));
      setTimeout(() => toast.success("Item removed from cart"), 0);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const response = await updateGuestCartItem(productId, newQuantity);
      if (response.success && response.data) {
        // Transform backend response
        const transformedItems = response.data.items.map(item => ({
          _id: item.productId._id,
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.image,
          stock: item.productId.stock,
          quantity: item.quantity
        }));
        setCartItems(transformedItems);
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      // Fallback to local update
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          (item.id || item._id) === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      setTimeout(() => toast.error("Failed to update quantity"), 0);
    }
  };

  // Increment quantity
  const incrementQuantity = async (productId) => {
    const item = cartItems.find(i => (i.id || i._id) === productId || i.productId === productId);
    if (item) {
      await updateQuantity(productId, item.quantity + 1);
    }
  };

  // Decrement quantity
  const decrementQuantity = async (productId) => {
    const item = cartItems.find(i => (i.id || i._id) === productId || i.productId === productId);
    if (item && item.quantity > 1) {
      await updateQuantity(productId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      await removeFromCart(productId);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      if (isAuthenticated()) {
        await clearCartAPI();
      } else {
        // Clear guest cart from MongoDB
        await clearGuestCart();
      }
      setCartItems([]);
      localStorage.removeItem("organicCart");
      console.log('✅ Cart cleared successfully!');
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Even if API fails, clear local state
      setCartItems([]);
      localStorage.removeItem("organicCart");
    }
  };

  // Reload cart from backend/MongoDB
  const reloadCart = async () => {
    try {
      setLoading(true);
      if (isAuthenticated()) {
        const response = await getCart();
        if (response.success && response.data) {
          const transformedItems = response.data.items.map(item => ({
            _id: item.productId._id,
            id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            stock: item.productId.stock,
            quantity: item.quantity
          }));
          setCartItems(transformedItems);
          return transformedItems;
        }
      } else {
        const response = await getGuestCart();
        if (response.success && response.data && response.data.items) {
          const transformedItems = response.data.items.map(item => ({
            _id: item.productId._id,
            id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            stock: item.productId.stock,
            quantity: item.quantity
          }));
          setCartItems(transformedItems);
          return transformedItems;
        } else {
          setCartItems([]);
          return [];
        }
      }
    } catch (error) {
      console.error("Error reloading cart:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => (item.id || item._id) === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = cartItems.find((item) => (item.id || item._id) === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    reloadCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

