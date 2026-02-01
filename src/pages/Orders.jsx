import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await getMyOrders();
        if (response.success) {
          setOrders(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const statusConfig = {
    pending: {
      label: "Processing",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      icon: "⏳",
    },
    processing: {
      label: "Processing",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: "⏳",
    },
    shipped: {
      label: "In Transit",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: "🚚",
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-700 border-green-200",
      icon: "✓",
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-700 border-red-200",
      icon: "✕",
    },
  };

  const downloadInvoice = (orderId) => {
    console.log(`Downloading invoice for ${orderId}`);
    toast.success("Invoice download coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Please Login</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to login to view your orders</p>
          <Link to="/login" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const trackOrder = (orderId, trackingId) => {
    console.log(`Tracking order ${orderId} with tracking ID ${trackingId}`);
    // Implement order tracking logic
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-base">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View and track your order history</p>
        </motion.div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="text-8xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No orders found</h2>
            <p className="text-gray-600 mb-8 text-lg">
              You haven't placed any orders yet.
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">#{order._id.slice(-8)}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold border ${
                              statusConfig[order.status].color
                            }`}
                          >
                            {statusConfig[order.status].icon} {statusConfig[order.status].label}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.products.length}{" "}
                          {order.products.length === 1 ? "item" : "items"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {/* View Details Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleExpand(order._id)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                          {expandedOrder === order._id ? "Hide" : "View"} Details
                          <svg
                            className={`w-5 h-5 transition-transform ${
                              expandedOrder === order.id ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.button>

                        {/* Track Order Button */}
                        {order.status !== "cancelled" && order.status !== "delivered" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => trackOrder(order.id, order.trackingId)}
                            disabled={!order.trackingId}
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            Track
                          </motion.button>
                        )}

                        {/* Download Invoice Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => downloadInvoice(order._id)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Invoice
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  <AnimatePresence>
                    {expandedOrder === order._id && order.products && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gray-50 space-y-6">
                          {/* Order Items */}
                          <div>
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                              </svg>
                              Order Items
                            </h4>
                            <div className="space-y-3">
                              {order.products.map((item, itemIdx) => (
                                <motion.div
                                  key={itemIdx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: itemIdx * 0.1 }}
                                  className="flex items-center gap-4 bg-white p-4 rounded-xl"
                                >
                                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 w-16 h-16 flex items-center justify-center text-3xl flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900">{item.name}</h5>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                  </div>
                                  <div className="font-bold text-gray-900">
                                    ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping & Tracking Info */}
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Shipping Address */}
                            <div className="bg-white p-4 rounded-xl">
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                Shipping Address
                              </h4>
                              <p className="text-gray-700">{order.shippingAddress}</p>
                            </div>

                            {/* Tracking Info */}
                            <div className="bg-white p-4 rounded-xl">
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Delivery Info
                              </h4>
                              {order.trackingId && (
                                <p className="text-sm text-gray-600 mb-1">
                                  Tracking ID: <span className="font-mono font-semibold text-gray-900">{order.trackingId}</span>
                                </p>
                              )}
                              {order.deliveryDate && (
                                <p className="text-sm text-gray-700">
                                  Delivered on <span className="font-semibold">{order.deliveryDate}</span>
                                </p>
                              )}
                              {order.estimatedDelivery && (
                                <p className="text-sm text-gray-700">
                                  Estimated delivery: <span className="font-semibold">{order.estimatedDelivery}</span>
                                </p>
                              )}
                              {order.cancelledDate && (
                                <p className="text-sm text-red-600">
                                  Cancelled on <span className="font-semibold">{order.cancelledDate}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div className="bg-white p-4 rounded-xl">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              Order Total
                            </h4>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 font-semibold">Total Amount</span>
                              <span className="text-2xl font-bold text-green-600">
                                ${order.totalAmount?.toFixed(2) || '0.00'}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            {order.status === "delivered" && (
                              <>
                                <Link to="/shop">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                                  >
                                    Buy Again
                                  </motion.button>
                                </Link>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                                >
                                  Leave a Review
                                </motion.button>
                              </>
                            )}
                            {order.status === "processing" && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                              >
                                Cancel Order
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                            >
                              Need Help?
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Summary (when collapsed) */}
                  {expandedOrder !== order.id && (
                    <div className="p-6 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-2">
                            {order.products.slice(0, 3).map((item, idx) => (
                              <div
                                key={idx}
                                className="w-10 h-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full border-2 border-white flex items-center justify-center text-lg overflow-hidden"
                              >
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {order.products.length > 3 && (
                              <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-gray-700">
                                +{order.products.length - 3}
                              </div>
                            )}
                          </div>
                          {order.estimatedDelivery && order.status !== "delivered" && (
                            <p className="text-sm text-gray-600">
                              Est. delivery: <span className="font-semibold">{order.estimatedDelivery}</span>
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">${order.totalAmount?.toFixed(2) || '0.00'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
