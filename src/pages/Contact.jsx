import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      detail: "support@organicmart.com",
      subtext: "We'll respond within 24 hours"
    },
    {
      icon: "📞",
      title: "Call Us",
      detail: "+1 (555) 123-4567",
      subtext: "Mon-Sat: 9AM - 6PM"
    },
    {
      icon: "📍",
      title: "Visit Us",
      detail: "123 Organic Street, Green Valley",
      subtext: "CA 90210, United States"
    },
    {
      icon: "⏰",
      title: "Business Hours",
      detail: "Monday - Saturday",
      subtext: "9:00 AM - 6:00 PM"
    }
  ];

  const faqs = [
    {
      question: "What are your delivery hours?",
      answer: "We deliver Monday to Saturday, 9 AM to 6 PM."
    },
    {
      question: "Do you offer bulk orders?",
      answer: "Yes! Contact us for special pricing on bulk orders."
    },
    {
      question: "Are all products certified organic?",
      answer: "100% of our products are certified organic."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12"
    >
      <div className="container-base max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We're here to help! Reach out to us and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border-t-4 border-green-500"
            >
              <div className="text-4xl mb-3">{info.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {info.title}
              </h3>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">
                {info.detail}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {info.subtext}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="delivery">Delivery Question</option>
                      <option value="product">Product Information</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </form>
            </div>
          </motion.div>

          {/* FAQ Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Quick FAQs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Answers
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <p className="text-green-50 mb-4">
                Stay connected on social media for updates, recipes, and special offers!
              </p>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition"
                >
                  <span className="text-xl">📘</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition"
                >
                  <span className="text-xl">📷</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition"
                >
                  <span className="text-xl">🐦</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition"
                >
                  <span className="text-xl">💼</span>
                </motion.a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">
                🚨 Urgent Issue?
              </h3>
              <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                For urgent order or delivery issues, call us directly:
              </p>
              <a href="tel:+15551234567" className="text-lg font-bold text-red-600 dark:text-red-400 hover:underline">
                +1 (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>

        {/* Store Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose Our Store?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the best in organic shopping with our premium services and commitment to quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Certified Organic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)" }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg p-8 border-2 border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300"
            >
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto shadow-lg">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                100% Certified Organic
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Every product is certified organic and rigorously tested for quality. We guarantee authenticity with full traceability from farm to table.
              </p>
              <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400 font-semibold text-center">
                  ✓ USDA Certified | ✓ Non-GMO
                </p>
              </div>
            </motion.div>

            {/* Feature 2: Farm Fresh Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
              className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-2xl shadow-lg p-8 border-2 border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
            >
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto shadow-lg">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Farm-Fresh Daily Deliveries
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Products delivered fresh from local farms every morning. Order today and receive tomorrow with our express delivery service.
              </p>
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-400 font-semibold text-center">
                  ✓ Same-Day Available | ✓ Free Delivery $50+
                </p>
              </div>
            </motion.div>

            {/* Feature 3: Expert Staff */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)" }}
              className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl shadow-lg p-8 border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
            >
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto shadow-lg">
                <span className="text-3xl">👨‍🌾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Expert Staff Available
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Our knowledgeable team includes certified nutritionists and organic farming experts ready to help with product selection and advice.
              </p>
              <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-700 dark:text-purple-400 font-semibold text-center">
                  ✓ Nutrition Consulting | ✓ Recipe Ideas
                </p>
              </div>
            </motion.div>

            {/* Feature 4: Free Parking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.2)" }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl shadow-lg p-8 border-2 border-orange-100 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300"
            >
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto shadow-lg">
                <span className="text-3xl">🅿️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Convenient Free Parking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Spacious parking lot with easy access and dedicated spots for quick pickups. Wheelchair accessible with covered areas.
              </p>
              <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-700 dark:text-orange-400 font-semibold text-center">
                  ✓ 100+ Spaces | ✓ EV Charging Stations
                </p>
              </div>
            </motion.div>
          </div>

          {/* Visit Us CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-10 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              Visit Our Store Today!
            </h3>
            <p className="text-green-50 text-lg mb-6 max-w-2xl mx-auto">
              Experience the difference of shopping organic in person. Our friendly team is waiting to serve you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-white">
                <p className="font-semibold text-lg">📍 123 Organic Street</p>
                <p className="text-green-100">Green Valley, CA 90210</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/30"></div>
              <div className="text-white">
                <p className="font-semibold text-lg">⏰ Mon - Sat</p>
                <p className="text-green-100">9:00 AM - 6:00 PM</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/30"></div>
              <motion.a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                📍 Get Directions
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
