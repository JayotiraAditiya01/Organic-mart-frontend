import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, getCartTotal } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const validCoupons = {
    ORGANIC10: { discount: 10, type: "percentage" },
    SAVE5: { discount: 5, type: "fixed" },
    WELCOME20: { discount: 20, type: "percentage" },
  };

  const applyCoupon = () => {
    const upperCode = couponCode.toUpperCase();
    if (validCoupons[upperCode]) {
      setAppliedCoupon({ code: upperCode, ...validCoupons[upperCode] });
      setCouponError("");
      setCouponCode("");
      toast.success(`Coupon "${upperCode}" applied successfully!`);
    } else {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      toast.error("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    toast.success("Coupon removed");
  };

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0;
  const total = subtotal + shipping - discount;

  const hasOutOfStock = cartItems.some((item) => !item.inStock);

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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven't added any organic products yet.
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, idx) => (
                  <motion.div
                    key={item._id || item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden ${
                      item.stock === 0 ? "opacity-75" : ""
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden w-32 h-32 flex-shrink-0">
                          <img src={item.image || item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Link
                                  to={`/product/${item._id || item.id}`}
                                  className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item._id || item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                title="Remove item"
                              >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </motion.button>
                            </div>

                            {!item.inStock && (
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Out of Stock
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                              <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => decrementQuantity(item._id || item.id)}
                                  disabled={item.quantity <= 1}
                                  className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  -
                                </motion.button>
                                <motion.span
                                  key={item.quantity}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  className="px-6 py-2 font-bold text-gray-900 min-w-[3rem] text-center"
                                >
                                  {item.quantity}
                                </motion.span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => incrementQuantity(item._id || item.id)}
                                  disabled={item.quantity >= 99}
                                  className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  +
                                </motion.button>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <motion.div
                                key={item.price * item.quantity}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                className="text-2xl font-bold text-green-600"
                              >
                                ${(item.price * item.quantity).toFixed(2)}
                              </motion.div>
                              {item.quantity > 1 && (
                                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue Shopping */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Continue Shopping
                  </motion.button>
                </Link>
              </motion.div>
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

                {/* Coupon Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      placeholder="Enter code"
                      disabled={appliedCoupon !== null}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    {appliedCoupon ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={removeCoupon}
                        className="px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={applyCoupon}
                        disabled={!couponCode}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </motion.button>
                    )}
                  </div>
                  {couponError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {couponError}
                    </motion.p>
                  )}
                  {appliedCoupon && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex items-center gap-2 text-green-600 text-sm font-semibold"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Coupon "{appliedCoupon.code}" applied!
                    </motion.div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Try: ORGANIC10, SAVE5, or WELCOME20
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="font-semibold"
                    >
                      ${subtotal.toFixed(2)}
                    </motion.span>
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
                    <motion.span
                      key={shipping}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="font-semibold"
                    >
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </motion.span>
                  </div>
                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex justify-between text-green-600"
                    >
                      <span className="font-semibold">Discount</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </motion.div>
                  )}
                  {subtotal < 50 && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <span className="font-semibold">Add ${(50 - subtotal).toFixed(2)} more</span> for
                        free shipping! 🚚
                      </p>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-green-600"
                  >
                    ${total.toFixed(2)}
                  </motion.span>
                </div>

                {/* Checkout Button */}
                {hasOutOfStock && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Remove out-of-stock items to checkout
                    </p>
                  </motion.div>
                )}

                <Link to="/checkout">
                  <motion.button
                    whileHover={{ scale: hasOutOfStock ? 1 : 1.02 }}
                    whileTap={{ scale: hasOutOfStock ? 1 : 0.98 }}
                    disabled={hasOutOfStock}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Proceed to Checkout
                  </motion.button>
                </Link>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure checkout guaranteed
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
