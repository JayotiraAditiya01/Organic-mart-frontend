import { motion } from "framer-motion";

// Product Card Skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
  );
};

// Product Details Skeleton
export const ProductDetailsSkeleton = () => {
  return (
    <div className="container-base py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
        {/* Image Section */}
        <div>
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl mb-4"></div>
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
        
        {/* Details Section */}
        <div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-8"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-full mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
};

// List Item Skeleton
export const ListItemSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  );
};

// General Content Skeleton
export const ContentSkeleton = ({ lines = 3 }) => {
  return (
    <div className="animate-pulse space-y-3">
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
          style={{ width: `${100 - i * 10}%` }}
        ></div>
      ))}
    </div>
  );
};

// Default export for Search page
export default ProductCardSkeleton;
