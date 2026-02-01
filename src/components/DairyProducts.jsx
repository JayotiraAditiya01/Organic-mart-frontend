import React, { useContext } from 'react';
import { dairyProducts } from '../data/dairyProducts';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const DairyProducts = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#10b981',
        color: '#fff',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🥛 Organic Dairy Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fresh, organic dairy products from grass-fed cows. Pure, natural, and healthy!
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dairyProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Stock Badge */}
                {product.inStock && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    In Stock
                  </div>
                )}

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.rating})
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/ unit</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FaShoppingCart className="text-sm" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Our Organic Dairy?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">🐄</div>
                <h4 className="font-semibold text-gray-900 mb-2">Grass-Fed Cows</h4>
                <p className="text-sm text-gray-600">
                  From healthy, happy cows grazing on organic pastures
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🌿</div>
                <h4 className="font-semibold text-gray-900 mb-2">100% Organic</h4>
                <p className="text-sm text-gray-600">
                  No hormones, antibiotics, or artificial ingredients
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">✨</div>
                <h4 className="font-semibold text-gray-900 mb-2">Fresh Daily</h4>
                <p className="text-sm text-gray-600">
                  Delivered fresh from farm to your doorstep
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DairyProducts;
