import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { ProductDetailsSkeleton } from "../components/SkeletonLoader";
import OptimizedImage from "../components/OptimizedImage";
import { mockProducts } from "../data/mockProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // First useEffect - fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate loading delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 300));
        const foundProduct = mockProducts.find(p => p._id === id);
        console.log('Looking for product with ID:', id);
        console.log('Found product:', foundProduct);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error('Product not found with ID:', id);
          setError('Product not found');
          toast.error("Product not found!");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError(error.message);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Second useEffect - scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Now handle early returns AFTER all hooks
  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {error || 'Product Not Found'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find the product you're looking for.
        </p>
        <Link 
          to="/shop" 
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  console.log('Rendering product:', product);

  // Add default values for missing fields
  const productData = {
    ...product,
    images: product.images || [product.image],
    imageAlts: product.imageAlts || [product.name],
    originalPrice: product.originalPrice || product.price + 20,
    reviews: product.reviews || Math.floor(Math.random() * 500) + 50,
    stockCount: product.stockCount || 100,
    benefits: product.benefits || [
      `Rich in essential nutrients`,
      `100% organic and chemical-free`,
      `Fresh and naturally grown`,
      `Supports healthy lifestyle`
    ],
    nutrition: product.nutrition || {
      calories: '50-100',
      protein: '2-5g',
      carbs: '10-20g',
      fiber: '3-5g'
    },
    features: product.features || [
      'Certified Organic',
      'Farm Fresh',
      'No Pesticides',
      'Eco-Friendly Packaging'
    ],
    userReviews: product.userReviews || []
  };

  const {
    name,
    price,
    originalPrice,
    category,
    rating,
    reviews,
    inStock,
    stockCount,
    images,
    imageAlts,
    description,
    benefits,
    nutrition,
    features,
    userReviews,
  } = productData;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${name} added to cart!`);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, Math.min(stockCount, prev + amount)));
  };

  const currentImage = images?.[selectedImage] || "https://images.unsplash.com/photo-1546470427-227a9e66c17b?w=800&h=600&fit=crop&q=80";
  const currentImageAlt = imageAlts?.[selectedImage] || name;

  const buyNow = async () => {
    try {
      console.log('🚀 Buy Now clicked - Adding to cart first...');
      // Add item to cart and wait for it to complete
      await addToCart(product, quantity);
      
      // Wait longer for cart to sync with MongoDB (increased from 800ms to 1500ms)
      console.log('⏳ Waiting for MongoDB sync...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('✅ Cart synced, navigating to checkout...');
      toast.success("Redirecting to checkout...");
      setQuantity(1);
      
      // Use navigate instead of window.location to preserve state
      navigate('/checkout');
    } catch (error) {
      console.error('Error in buyNow:', error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  const scrollToReviews = () => {
    document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="container-base">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-600 mb-6"
        >
          <Link to="/" className="hover:text-green-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-green-600 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{name}</span>
        </motion.div>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-4 cursor-zoom-in relative h-96 group"
              onClick={() => setShowZoom(true)}
            >
              <OptimizedImage
                src={currentImage}
                alt={currentImageAlt}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1 shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
                Click to zoom
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {images && images.length > 0 && images.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden h-24 transition-all ${
                    selectedImage === idx
                      ? "ring-4 ring-green-500 shadow-lg"
                      : "hover:ring-2 hover:ring-green-300 dark:hover:ring-green-600"
                  }`}
                >
                  <OptimizedImage
                    src={img}
                    alt={imageAlts?.[idx] || name}
                    className="w-full h-full"
                    fallback={
                      <span className="text-3xl">🌿</span>
                    }
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category */}
            <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              {category}
            </div>

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating) ? "fill-current" : "fill-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{rating}</span>
              </div>
              <button
                onClick={scrollToReviews}
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                ({reviews} reviews)
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl font-bold text-green-600">${price}</span>
              <span className="text-2xl text-gray-400 line-through">${originalPrice}</span>
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                Save {Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-semibold">
                    In Stock ({stockCount} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-semibold">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">{description}</p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features?.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(-1)}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors font-bold text-gray-700 text-xl"
                    disabled={quantity <= 1}
                  >
                    -
                  </motion.button>
                  <span className="px-8 py-4 font-bold text-xl text-gray-900">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(1)}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors font-bold text-gray-700 text-xl"
                    disabled={quantity >= stockCount}
                  >
                    +
                  </motion.button>
                </div>
                <span className="text-sm text-gray-600">
                  Max: {stockCount} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={buyNow}
                disabled={!inStock}
                className="flex-1 py-4 bg-gray-900 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Buy Now
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Secure checkout guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {["description", "benefits", "nutrition"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-semibold text-lg whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "text-green-600 border-b-4 border-green-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "description" && "Description"}
                  {tab === "benefits" && "Health Benefits"}
                  {tab === "nutrition" && "Nutrition Facts"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
                  <p className="text-gray-600 leading-relaxed text-lg mt-4">
                    Our organic honey comes from bees that forage on diverse wildflowers, giving it a unique
                    and complex flavor profile. Each jar is carefully harvested and minimally processed to
                    preserve the natural goodness of raw honey. We work directly with local beekeepers who
                    practice sustainable and ethical beekeeping methods.
                  </p>
                </motion.div>
              )}

              {activeTab === "benefits" && (
                <motion.div
                  key="benefits"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Health Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits?.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 bg-green-50 p-4 rounded-xl"
                      >
                        <svg
                          className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 leading-relaxed">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "nutrition" && (
                <motion.div
                  key="nutrition"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Facts</h3>
                  <div className="bg-gray-50 rounded-xl p-6 max-w-md">
                    <div className="border-b-8 border-gray-900 pb-2 mb-4">
                      <p className="font-bold text-sm">Serving Size: {nutrition?.servingSize || '100g'}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                        <span className="font-bold text-lg">Calories</span>
                        <span className="font-bold text-lg">{nutrition?.calories}</span>
                      </div>
                      {nutrition && Object.entries(nutrition)
                        .filter(([key]) => !["servingSize", "calories", "vitamins"].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="font-semibold text-gray-900">{value}</span>
                          </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-300">
                      <p className="font-semibold text-gray-900 mb-2">Contains vitamins:</p>
                      <div className="flex flex-wrap gap-2">
                        {nutrition?.vitamins?.map((vitamin) => (
                          <span
                            key={vitamin}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            {vitamin}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          id="reviews-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="scroll-mt-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Write a Review
            </motion.button>
          </div>

          {/* Reviews Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <div className="text-6xl font-bold text-gray-900 mb-2">{rating}</div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">Based on {reviews} reviews</p>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const percentage = stars === 5 ? 85 : stars === 4 ? 10 : stars === 3 ? 3 : stars === 2 ? 2 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-8">{stars}★</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {userReviews && userReviews.length > 0 ? userReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      {review.verified && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-current" : "fill-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span className="text-sm font-medium">Helpful</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Reply</span>
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                <p className="text-gray-500 text-lg">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>

          {/* Load More Reviews */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200"
            >
              Load More Reviews
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {showZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowZoom(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 20 }}
              className="max-w-5xl max-h-full"
            >
              <OptimizedImage
                src={currentImage}
                alt={currentImageAlt}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>
            <button className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetails;
