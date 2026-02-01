import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { mockProducts } from "../data/mockProducts";
import toast from "react-hot-toast";
import { ProductCardSkeleton } from "../components/SkeletonLoader";
import OptimizedImage from "../components/OptimizedImage";
import LikeButton from "../components/LikeButton";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Map navbar categories to shop categories
  const categoryMapping = {
    "Fresh Vegetables": "Vegetables",
    "Organic Fruits": "Fruits",
    "Dairy Products": "Dairy",
    "Grains & Pulses": "Farm Products",
    "Herbs & Spices": "Organic Medicines",
    "Beverages": "Organic Medicines"
  };

  // Handle URL category parameter
  useEffect(() => {
    const categoryToLoad = categoryFromUrl ? (categoryMapping[categoryFromUrl] || categoryFromUrl) : "All";
    setSelectedCategory(categoryToLoad);
  }, [categoryFromUrl]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use mock products for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        setAllProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error loading products:", error);
        toast.error("Failed to load products");
        setAllProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", "Dairy", "Organic Medicines", "Farm Products", "Fruits", "Vegetables"];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });
    
    // Limit "All" category to 60 products with mix from all categories
    if (selectedCategory === "All" && filtered.length > 60) {
      const categories = ["Fruits", "Vegetables", "Dairy", "Organic Medicines", "Farm Products"];
      const productsPerCategory = Math.floor(60 / categories.length); // 12 per category
      let mixedProducts = [];
      
      categories.forEach(cat => {
        const categoryProducts = filtered.filter(p => p.category === cat);
        mixedProducts.push(...categoryProducts.slice(0, productsPerCategory));
      });
      
      filtered = mixedProducts.slice(0, 60);
    }
    
    // Sort products
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Featured - keep original order
        break;
    }
    
    return sorted;
  }, [allProducts, selectedCategory, priceRange, minRating, searchQuery, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Organic Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Browse our collection of fresh, certified organic products
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  e.preventDefault();
                  navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
              placeholder="Search for organic products..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-72"
          >
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 px-4 py-3 bg-white rounded-xl shadow-md font-semibold text-gray-700 flex items-center justify-between"
            >
              <span>Filters</span>
              <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Category Filter */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-all font-medium ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                    className="w-full accent-green-600"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">${priceRange[0]}</span>
                    <span className="font-semibold text-gray-700">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                        minRating === rating
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-medium">
                        {rating > 0 ? `${rating}+ Stars` : "All Ratings"}
                      </span>
                      {rating > 0 && (
                        <span className="flex">
                          {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange([0, 200]);
                  setMinRating(0);
                  setSearchQuery("");
                }}
                className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 flex items-center justify-between"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> products
              </p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </motion.div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredProducts.map((product, idx) => (
                      <motion.div
                        key={product._id || product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
                      >
                        {/* Product Image */}
                        <div className="relative h-64 overflow-hidden">
                          <LikeButton productId={product._id || product.id} />
                          <OptimizedImage
                            src={product.image || product.img}
                            alt={product.description || product.name}
                            className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                          />
                          {product.stock === 0 && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              Out of Stock
                            </div>
                          )}
                          {product.stock > 0 && product.rating >= 4.8 && (
                            <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              ⭐ Popular
                            </div>
                          )}
                        </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{product.category}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl font-bold text-green-600">
                            ${product.price}
                          </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Add to Cart
                            </span>
                            {/* Ripple effect */}
                            <motion.span
                              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                              initial={false}
                              whileHover={{
                                scale: [0, 2],
                                opacity: [0.2, 0],
                              }}
                              transition={{ duration: 0.6 }}
                            />
                          </motion.button>
                          
                          <Link to={`/product/${product._id || product.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              title="View Details"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters or search query</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCategory("All");
                      setPriceRange([0, 200]);
                      setMinRating(0);
                      setSearchQuery("");
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Clear All Filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
