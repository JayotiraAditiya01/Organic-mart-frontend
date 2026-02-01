import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSearch, FiX, FiFilter, FiTrendingUp } from 'react-icons/fi';
import OptimizedImage from '../components/OptimizedImage';
import SkeletonLoader from '../components/SkeletonLoader';
import { API_BASE_URL } from '../services/api';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [localCount, setLocalCount] = useState(0);
  const [externalCount, setExternalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [hasSearched, setHasSearched] = useState(false);

  const categories = ['All', 'Dairy', 'Organic Medicines', 'Farm Products', 'Fruits', 'Vegetables'];

  // Helper function to perform search without dependency issues
  const performSearch = async (term) => {
    setLoading(true);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        q: term.trim(),
        category: selectedCategory === 'All' ? '' : selectedCategory,
        limit: 30,
        includeExternal: 'true'
      });

      const response = await fetch(`${API_BASE_URL}/products/search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Search failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
        setTotalResults(data.totalResults || 0);
        setLocalCount(data.localCount || 0);
        setExternalCount(data.externalCount || 0);

        if (data.data.length === 0) {
          toast.info('No products found. Try a different search term.');
        } else {
          toast.success(`Found ${data.totalResults} products!`);
        }
      } else {
        toast.error(data.message || 'Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Error searching products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Perform search
  const handleSearch = async (term) => {
    if (!term || term.trim().length < 2) {
      toast.error('Please enter at least 2 characters');
      return;
    }
    performSearch(term);
  };

  // Search on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      handleSearch(searchTerm);
    }
  };

  // Search on initial load if query exists
  useEffect(() => {
    if (query && query.trim().length >= 2) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [query]);

  // Sort products
  const sortedProducts = () => {
    const sorted = [...products];
    
    if (sortBy === 'price-low') {
      return sorted.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return sorted.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return sorted.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'newest') {
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return sorted;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
      {/* Search Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for organic products, medicines, fruits..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Results Info */}
          {hasSearched && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Results: <strong>{totalResults}</strong> total
                {localCount > 0 && <span> • {localCount} from our store</span>}
                {externalCount > 0 && <span> • {externalCount} available on demand</span>}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasSearched ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow p-6 sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                <FiFilter size={20} className="text-green-600" />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={selectedCategory === cat}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-gray-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonLoader key={i} />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts().map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden group"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <OptimizedImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {product.source === 'external' && (
                            <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              Available on Demand
                            </div>
                          )}
                          {product.isOrganic && (
                            <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              🌿 Organic
                            </div>
                          )}
                          {product.comparePrice && product.comparePrice > product.price && (
                            <div className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              Sale
                            </div>
                          )}
                        </div>

                        {/* External Source Label */}
                        {product.source === 'external' && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <p className="text-white text-xs font-medium">
                              {product.externalSource || 'Partner Seller'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="mb-2">
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                          {product.name}
                        </h3>

                        <p className="text-gray-600 text-xs mb-3 line-clamp-1">
                          {product.unit}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>
                                {i < Math.round(product.rating) ? '★' : '☆'}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            ({product.numReviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-green-600">
                              ₹{product.price.toFixed(2)}
                            </p>
                            {product.comparePrice && product.comparePrice > product.price && (
                              <p className="text-sm text-gray-500 line-through">
                                ₹{product.comparePrice.toFixed(2)}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.success('Added to cart!');
                            }}
                            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <FiTrendingUp size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find "{searchTerm}". Would you like to request this product?
                  </p>
                  <button
                    onClick={() => toast.info('Request feature coming soon!')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Request Product
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FiSearch size={64} className="mx-auto text-green-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Search for Products
            </h2>
            <p className="text-gray-600 mb-6">
              Find organic fruits, vegetables, dairy, medicines, and farm products from our collection
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg inline-block text-left">
              <p className="text-blue-900 font-medium">💡 Tip:</p>
              <p className="text-blue-800 text-sm">
                Can't find what you're looking for? We also search from partner sellers worldwide!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
