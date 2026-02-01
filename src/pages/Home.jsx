import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";
import LikeButton from "../components/LikeButton";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { mockProducts } from "../data/mockProducts";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const categories = [
    { name: "Dairy", icon: "🥛", items: "12 Products", description: "Fresh & Pure" },
    { name: "Organic Medicines", icon: "💊", items: "10 Products", description: "Natural Wellness" },
    { name: "Farm Products", icon: "🌾", items: "10 Products", description: "Farm Fresh" },
    { name: "Fruits", icon: "🍎", items: "8 Products", description: "Fresh & Sweet" },
    { name: "Vegetables", icon: "🥬", items: "8 Products", description: "Garden Fresh" },
  ];

  // Get featured products from mockProducts - using actual product data with real images
  const featuredProducts = [
    mockProducts.find(p => p._id === '122'), // Fresh Milk Carton (Dairy)
    mockProducts.find(p => p._id === '124'), // Fruit Yogurt (Dairy)
    mockProducts.find(p => p._id === '64'),  // Ashwagandha (Organic Medicine)
    mockProducts.find(p => p._id === '126'), // Honey with Cheese (Dairy)
    mockProducts.find(p => p._id === '5'),   // Fresh Blueberries (Fruits)
    mockProducts.find(p => p._id === '2'),   // Strawberries (Fruits)
    mockProducts.find(p => p._id === '106'), // Organic Dates (Farm Products)
    mockProducts.find(p => p._id === '112'), // Butter Block (Dairy)
  ].filter(Boolean); // Remove any undefined products

  const testimonials = [
    { name: "Sarah Johnson", role: "Health Enthusiast", text: "Best organic products I've ever purchased! The quality is outstanding and delivery is always on time.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80" },
    { name: "Michael Chen", role: "Chef", text: "As a professional chef, I rely on OrganicMart for the freshest ingredients. Never disappointed!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80" },
    { name: "Emily Rodriguez", role: "Nutritionist", text: "I recommend OrganicMart to all my clients. Their commitment to organic farming is exceptional.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80" },
  ];

  const whyChooseUs = [
    { title: "100% Organic", desc: "Certified organic products from trusted farms", icon: "🌱" },
    { title: "Farm to Door", desc: "Direct from farmers to your doorstep", icon: "🚚" },
    { title: "Fresh Daily", desc: "Harvested fresh every morning", icon: "☀️" },
    { title: "Best Prices", desc: "Competitive pricing without compromise", icon: "💰" },
  ];

  const handleAddToCart = (product) => {
    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    };
    addToCart(cartProduct, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address!');
      return;
    }

    setIsSubscribing(true);

    // Simulate API call
    setTimeout(() => {
      // Create BLOCKBUSTER confetti blast - BLACK & RED colors for 5-6 seconds!
      const totalConfetti = 150; // More confetti for blockbuster effect
      const duration = 6000; // 6 seconds
      
      for (let i = 0; i < totalConfetti; i++) {
        setTimeout(() => {
          createBlockbusterConfetti();
        }, i * 30); // Stagger the confetti creation
      }

      toast.success(
        (t) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎉</span>
              <span className="font-bold text-xl">Successfully Subscribed!</span>
            </div>
            <p className="text-sm text-gray-100">
              Welcome! Check your email for a special 15% discount code.
            </p>
          </div>
        ),
        {
          duration: 5000,
          style: {
            background: 'linear-gradient(135deg, #000000 0%, #dc2626 100%)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          },
        }
      );

      setEmail('');
      setIsSubscribing(false);
    }, 1500);
  };

  const createBlockbusterConfetti = () => {
    const confetti = document.createElement('div');
    confetti.className = 'blockbuster-confetti';
    
    // Random position across the screen
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    
    // BLACK and RED colors only
    const colors = ['#000000', '#1a1a1a', '#2d2d2d', '#dc2626', '#ef4444', '#b91c1c', '#991b1b'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random size for more dynamic effect
    const size = Math.random() * 10 + 8;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    
    // Random animation duration
    confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    // Random rotation speed
    confetti.style.setProperty('--rotate-speed', Math.random() * 720 + 360 + 'deg');
    
    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 6000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white dark:bg-gray-900"
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white py-3 text-center text-sm font-medium overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="inline-block whitespace-nowrap"
        >
          <span className="mx-8">🌿 Free Shipping on Orders Over $50</span>
          <span className="mx-8">🎉 New Customers Get 15% Off</span>
          <span className="mx-8">🌱 100% Organic & Certified</span>
          <span className="mx-8">🚚 Same Day Delivery Available</span>
          <span className="mx-8">🌿 Free Shipping on Orders Over $50</span>
          <span className="mx-8">🎉 New Customers Get 15% Off</span>
        </motion.div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 dark:bg-green-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 dark:bg-emerald-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-teal-300 dark:bg-teal-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container-base relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full shadow-xl mb-8 border border-green-200 dark:border-green-800"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">🏆 Award Winning Organic Store</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.1]"
              >
                <span className="text-gray-900 dark:text-white">Nourish Your</span>
                <br />
                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Body & Soul
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-xl"
              >
                Discover premium organic products that support your health and the planet. 
                <span className="font-semibold text-green-600 dark:text-green-400"> Farm-fresh quality</span>, delivered to your door.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Start Shopping
                      <motion.svg 
                        className="w-5 h-5"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-800 dark:text-white font-bold rounded-full shadow-xl border-2 border-gray-200 dark:border-gray-700 flex items-center gap-2 hover:border-green-500 dark:hover:border-green-500 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  Watch Story
                </motion.button>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { value: "48+", label: "Premium Products", icon: "🌿" },
                  { value: "5K+", label: "Happy Customers", icon: "😊" },
                  { value: "100%", label: "Organic Certified", icon: "✓" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg"
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image Section - Enhanced */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[650px]">
                {/* Main Image Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80"
                      alt="Fresh organic fruits"
                      className="w-full h-64 object-cover rounded-3xl shadow-2xl"
                    />
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&q=80"
                      alt="Organic vegetables"
                      className="w-full h-48 object-cover rounded-3xl shadow-2xl"
                    />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                    className="space-y-6 mt-12"
                  >
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80"
                      alt="Organic grains"
                      className="w-full h-48 object-cover rounded-3xl shadow-2xl"
                    />
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400&q=80"
                      alt="Healthy organic food"
                      className="w-full h-64 object-cover rounded-3xl shadow-2xl"
                    />
                  </motion.div>
                </div>

                {/* Floating Trust Badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🏅</div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-lg">Certified</div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-semibold">USDA Organic</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                  className="absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl shadow-2xl text-white"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">15%</div>
                    <div className="text-sm font-semibold">OFF</div>
                    <div className="text-xs opacity-90 mt-1">First Order</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1"
          >
            <div className="w-1.5 h-3 bg-green-600 dark:bg-green-400 rounded-full mx-auto"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container-base">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {[
              { name: "USDA Organic", icon: "🏅" },
              { name: "Non-GMO", icon: "🌱" },
              { name: "Gluten Free", icon: "🌾" },
              { name: "Eco Friendly", icon: "♻️" },
              { name: "Farm Fresh", icon: "🚜" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="font-semibold text-sm">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-base">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-bold mb-4"
            >
              SHOP BY CATEGORY
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              Browse Our Collection
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Carefully curated organic products for every aspect of your healthy lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <Link key={idx} to={`/shop?category=${category.name}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden"
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-green-500/10 group-hover:via-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>
                  
                  {/* Decorative Circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 dark:bg-green-900 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300"
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {category.description}
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-bold text-sm flex items-center gap-1">
                      {category.items}
                      <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container-base">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-700 dark:text-green-300 rounded-full text-sm font-bold mb-4"
            >
              ⭐ BESTSELLERS
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              Customer Favorites
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Premium organic products loved by thousands of health-conscious customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -15, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                    <LikeButton productId={product._id} />
                    <Link to={`/product/${product._id}`}>
                      <OptimizedImage
                        src={product.image}
                        alt={product.description}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      />
                    </Link>
                    
                    {/* Floating Rating Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-xl border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-1.5 text-sm font-bold">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-900 dark:text-white">{product.rating}</span>
                      </div>
                    </motion.div>

                    {/* Quick Add Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.button>
                  </div>

                  <div className="p-6">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      ⭐ {product.rating} rating
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                      </div>
                      <Link to={`/product/${product._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-semibold text-sm hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-colors"
                        >
                          View
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-2xl overflow-hidden text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore All Products
                  <motion.svg 
                    className="w-5 h-5"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-green-200 dark:bg-green-900 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-200 dark:bg-emerald-900 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container-base relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-bold mb-4"
            >
              WHY CHOOSE US
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              The OrganicMart Difference
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust us for their organic lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-3xl flex items-center justify-center text-5xl shadow-xl group-hover:shadow-2xl transition-all"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900 relative">
        {/* Quote Icon Background */}
        <div className="absolute top-20 left-10 text-green-100 dark:text-green-900 opacity-30">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>

        <div className="container-base relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-bold mb-4"
            >
              ⭐ CUSTOMER REVIEWS
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join thousands of happy customers who have transformed their lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 group-hover:border-green-200 dark:group-hover:border-green-800 h-full">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-green-500 dark:text-green-400 opacity-20">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all ring-4 ring-green-400"
                      >
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + idx * 0.15 + i * 0.05 }}
                          className="text-yellow-400 text-xl"
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Verified Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + idx * 0.15 }}
                    className="absolute -bottom-3 right-8 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "4.9/5", label: "Average Rating" },
              { value: "5000+", label: "Happy Customers" },
              { value: "10,000+", label: "Orders Delivered" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800"
              >
                <div className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container-base relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-[3rem] p-12 md:p-16 border border-white/20 shadow-2xl">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30"
                >
                  <span className="text-3xl">📧</span>
                  <span className="text-white font-bold text-sm">JOIN OUR NEWSLETTER</span>
                </motion.div>
                
                <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                  Get 15% Off Your First Order
                </h2>
                <p className="text-2xl text-white/90 mb-4">
                  Subscribe and receive exclusive deals, recipes & wellness tips
                </p>
                <p className="text-white/80 text-sm flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Join 10,000+ subscribers • No spam, ever
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto"
              >
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isSubscribing}
                      className="w-full px-8 py-6 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all shadow-2xl text-lg font-medium disabled:opacity-50"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubscribing}
                    className="px-12 py-6 bg-white text-green-600 font-bold rounded-full shadow-2xl hover:shadow-white/50 transition-all text-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              >
                {[
                  { icon: "🎁", text: "Exclusive Discounts" },
                  { icon: "📚", text: "Free Recipes" },
                  { icon: "💡", text: "Health Tips" },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-3 text-white/90">
                    <span className="text-3xl">{benefit.icon}</span>
                    <span className="font-semibold">{benefit.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
