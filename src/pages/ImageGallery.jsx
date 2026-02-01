import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState('fruits')

  const categories = {
    fruits: { count: 25, name: 'Fruits' }
  }

  // Professional fruit names
  const fruitNames = [
    'Fresh Apple', 'Ripe Banana', 'Juicy Orange', 'Sweet Grapes', 'Tropical Mango',
    'Fresh Strawberries', 'Golden Pineapple', 'Watermelon Slice', 'Green Kiwi', 'Fresh Papaya',
    'Pomegranate', 'Blueberries', 'Red Raspberries', 'Blackberries', 'Green Pear',
    'Sweet Peach', 'Purple Plums', 'Red Cherries', 'Tropical Guava', 'Fresh Lychee',
    'Orange Apricot', 'Cantaloupe Melon', 'Honeydew Melon', 'Dragon Fruit', 'Passion Fruit'
  ]

  const getImages = (category) => {
    const count = categories[category].count
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      src: `/images/products/${category}/${category}-${String(i + 1).padStart(2, '0')}.jpg`,
      alt: category === 'fruits' ? fruitNames[i] : `${categories[category].name} ${i + 1}`,
      name: category === 'fruits' ? fruitNames[i] : `${categories[category].name} ${i + 1}`
    }))
  }

  const images = getImages(selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container-base">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🌿 Product Image Gallery
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Browse our collection of {Object.values(categories).reduce((sum, cat) => sum + cat.count, 0)} professional HD images
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {Object.entries(categories).map(([key, { name, count }]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {name} ({count})
            </motion.button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white font-bold text-lg mb-1">
                  {image.name}
                </p>
                <p className="text-green-300 text-sm">
                  Fresh & Organic
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                #{image.id}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📊 Gallery Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Object.entries(categories).map(([key, { name, count }]) => (
              <div key={key} className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {count}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {name}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              {Object.values(categories).reduce((sum, cat) => sum + cat.count, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-1">
              Total HD Images
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
