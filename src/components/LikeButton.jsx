import { motion } from 'framer-motion';
import { useLikes } from '../context/LikesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeButton = ({ productId, className = '' }) => {
  const { isLiked, toggleLike } = useLikes();
  const liked = isLiked(productId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(productId);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:scale-110 transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {liked ? (
        <FaHeart className="w-5 h-5 text-red-500" />
      ) : (
        <FaRegHeart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      )}
    </motion.button>
  );
};

export default LikeButton;
