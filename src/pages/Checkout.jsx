import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart, reloadCart, loading: cartLoading } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [freshCartItems, setFreshCartItems] = useState([]);
  const [cartChecked, setCartChecked] = useState(false);

  // Reload cart when component mounts to ensure fresh data
  useEffect(() => {
    const loadCartData = async () => {
      console.log('🔄 Checkout page: Starting cart reload...');
      console.log('🔄 Current cartItems from context:', cartItems);
      setInitialLoading(true);
      
      // Wait a bit before even starting to ensure context is loaded
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reload cart from MongoDB
      console.log('📡 Calling reloadCart API...');
      const freshCart = await reloadCart();
      console.log('📦 Fresh cart from MongoDB:', freshCart);
      
      // Store fresh cart items
      if (freshCart && freshCart.length > 0) {
        console.log('✅ Setting fresh cart items:', freshCart.length);
        setFreshCartItems(freshCart);
      } else {
        console.log('⚠️ No items in fresh cart, using context cart');
        setFreshCartItems(cartItems);
      }
      
      // Add extra delay to ensure state updates completely
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setInitialLoading(false);
      setCartChecked(true);
      console.log('✅ Checkout page: Cart reload complete');
      console.log('✅ Final displayCartItems will be:', freshCart?.length || cartItems.length);
    };
    loadCartData();
  }, []); // Empty dependency array - run only once on mount

  // Use fresh cart items if available, otherwise use cartItems from context
  // This ensures we ALWAYS have cart data
  const displayCartItems = freshCartItems.length > 0 ? freshCartItems : cartItems;

  const subtotal = displayCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const discount = 0; // You can add coupon logic here
  const total = subtotal + shipping - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    // Reload cart from MongoDB to ensure we have latest data
    console.log('🔄 Reloading cart before placing order...');
    const latestCartItems = await reloadCart();
    
    // Use displayCartItems as fallback if reload returns empty
    const itemsToOrder = (latestCartItems && latestCartItems.length > 0) ? latestCartItems : displayCartItems;
    
    console.log('🛒 Items to order:', itemsToOrder);
    console.log('🛒 Cart length:', itemsToOrder.length);

    if (!itemsToOrder || itemsToOrder.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      navigate("/cart");
      return;
    }

    if (validateForm()) {
      setLoading(true);
      try {
        console.log('🔍 DEBUG - formData before creating orderData:', formData);
        console.log('🔍 DEBUG - itemsToOrder:', itemsToOrder);
        
        // Prepare order data using the latest cart items
        const orderData = {
          shippingAddress: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: 'India'
          },
          paymentMethod: paymentMethod,
          products: itemsToOrder.map(item => ({
            productId: item.id || item._id || item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image
          })),
          totalAmount: total
        };

        console.log('📡 Sending order data:', orderData);
        console.log('📡 Products array:', orderData.products);
        console.log('📡 Shipping Address:', orderData.shippingAddress);
        console.log('📡 Shipping Address STRINGIFIED:', JSON.stringify(orderData.shippingAddress, null, 2));
        console.log('📡 Form Data:', formData);
        
        // CHECK EACH FIELD
        console.log('🔍 address field:', orderData.shippingAddress.address, 'Length:', orderData.shippingAddress.address?.length);
        console.log('🔍 city field:', orderData.shippingAddress.city, 'Length:', orderData.shippingAddress.city?.length);
        console.log('🔍 state field:', orderData.shippingAddress.state, 'Length:', orderData.shippingAddress.state?.length);
        console.log('🔍 pincode field:', orderData.shippingAddress.pincode, 'Length:', orderData.shippingAddress.pincode?.length);
        
        // Place order via backend API
        const response = await createOrder(orderData);
        
        console.log('✅ Order response:', response);

        setOrderPlaced(true);
        
        // Show beautiful success message with confetti
        const confettiCount = 50;
        for (let i = 0; i < confettiCount; i++) {
          createConfetti();
        }
        
        toast.success(
          (t) => (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <span className="font-bold text-lg">Order Placed Successfully!</span>
              </div>
              <p className="text-sm text-gray-100">
                Order #{response.data?._id || response._id || Math.random().toString(36).substr(2, 9).toUpperCase()} confirmed
              </p>
              <p className="text-xs text-gray-200">
                Order saved to database! We'll send you an email with order details
              </p>
            </div>
          ),
          {
            duration: 5000,
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
            },
          }
        );
        
        // Clear cart after successful order
        await clearCart();
        
        // Redirect to home page after animation
        setTimeout(() => {
          navigate("/");
          toast.success("Thank you for shopping with us! 🌿");
        }, 3000);
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to place order. Please try again.";
        const validationErrors = error.response?.data?.errors;
        
        console.error("❌ Order error:", error.response?.data || error);
        console.error("❌ Full error object:", error);
        
        // Display validation errors clearly
        if (validationErrors && Array.isArray(validationErrors) && validationErrors.length > 0) {
          console.error("🔴 VALIDATION ERRORS:");
          validationErrors.forEach((err, index) => {
            console.error(`  Error ${index + 1}: ${err}`);
          });
          
          // Show each error as a toast
          validationErrors.forEach(err => {
            toast.error(err, { duration: 5000 });
          });
        } else {
          toast.error(errorMsg);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.backgroundColor = ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0'][Math.floor(Math.random() * 5)];
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  };

  const paymentOptions = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
      desc: "Visa, Mastercard, Amex",
    },
    {
      id: "upi",
      name: "UPI Payment",
      icon: "📱",
      desc: "GPay, PhonePe, Paytm",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: "🏦",
      desc: "All major banks",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: "💵",
      desc: "Pay when you receive",
    },
  ];

  // Show loading state while cart is being loaded - LONGER LOADING TIME
  if (initialLoading || !cartChecked) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-base">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg font-semibold">Loading your cart...</p>
              <p className="text-gray-500 text-sm mt-2">Please wait...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ONLY show empty cart if BOTH displayCartItems AND cartItems are empty after loading
  if (cartChecked && !initialLoading && displayCartItems.length === 0 && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-base">
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-center">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some items before checking out</p>
              <Link to="/shop" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-base">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Checkout</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/cart" className="hover:text-green-600 transition-colors">
              Cart
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Shipping Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="123456"
                      maxLength="6"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.pincode
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House no., Building name, Street"
                      rows="3"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.address
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.city
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="California"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.state
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                      }`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Payment Method
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {paymentOptions.map((option) => (
                    <motion.label
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === option.id
                          ? "border-green-500 bg-green-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.id}
                        checked={paymentMethod === option.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{option.icon}</span>
                          <span className="font-semibold text-gray-900">{option.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{option.desc}</p>
                      </div>
                    </motion.label>
                  ))}
                </div>

                {/* Payment Info Message */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800 flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Your payment information is secure. We use industry-standard encryption to protect
                      your data.
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* Place Order Button - Mobile */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="lg:hidden w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Place Order - ${total.toFixed(2)}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {displayCartItems.map((item) => (
                  <div key={item.id || item._id} className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 w-16 h-16 flex items-center justify-center text-3xl flex-shrink-0">
                      {item.img}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    Shipping
                    {shipping === 0 && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-semibold">Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-green-600">${total.toFixed(2)}</span>
              </div>

              {/* Place Order Button - Desktop */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                className="hidden lg:flex w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Place Order
              </motion.button>

              {/* Security Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure checkout
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Easy returns
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Order confirmation via email
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setOrderPlaced(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>

                {/* Confetti Effect */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 1],
                      x: [0, Math.cos((i * Math.PI) / 4) * 100],
                      y: [0, Math.sin((i * Math.PI) / 4) * 100],
                      opacity: [1, 1, 0],
                    }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  />
                ))}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Order Placed! 🎉
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 text-lg mb-6"
              >
                Thank you for your order! We'll send a confirmation email shortly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-green-50 rounded-2xl p-6 mb-6"
              >
                <p className="text-sm text-gray-600 mb-2">Order Number</p>
                <p className="text-2xl font-bold text-green-600">#ORG{Math.floor(Math.random() * 100000)}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link to="/shop" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:shadow-md transition-all"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
                <Link to="/" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Go to Home
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Checkout;
