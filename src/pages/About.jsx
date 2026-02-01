import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: "😊" },
    { number: "100+", label: "Organic Products", icon: "🌿" },
    { number: "50+", label: "Partner Farms", icon: "🚜" },
    { number: "5 Years", label: "In Business", icon: "⭐" }
  ];

  const values = [
    {
      icon: "🏆",
      title: "Quality First",
      description: "Every product is carefully selected and tested to meet the highest organic standards. We never compromise on quality or purity."
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "We're committed to eco-friendly practices, from farm to delivery. Our goal is to create a healthier planet for future generations."
    },
    {
      icon: "🤝",
      title: "Community Support",
      description: "We partner with local farmers and suppliers, ensuring fair trade practices and supporting community growth."
    },
    {
      icon: "🔍",
      title: "Full Transparency",
      description: "Complete transparency in sourcing and processing. You deserve to know exactly where your food comes from."
    },
    {
      icon: "💚",
      title: "Health Focus",
      description: "Promoting healthier lifestyles through nutrition education and access to pure, chemical-free organic products."
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "Continuously improving our services, from product selection to delivery methods, to serve you better."
    }
  ];

  const timeline = [
    { year: "2020", event: "Founded Organic Mart", description: "Started with 5 local farm partners and a small online store" },
    { year: "2021", event: "Expanded Product Line", description: "Added organic medicines and farm products to our catalog" },
    { year: "2022", event: "10,000 Customers", description: "Reached milestone of serving 10,000 happy customers" },
    { year: "2023", event: "50+ Partner Farms", description: "Expanded network to include 50+ certified organic farms" },
    { year: "2024", event: "Same-Day Delivery", description: "Launched same-day delivery service in major cities" }
  ];

  const team = [
    { name: "Sarah Johnson", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80" },
    { name: "Michael Chen", role: "Head of Sourcing", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80" },
    { name: "Emma Davis", role: "Quality Assurance", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80" },
    { name: "James Wilson", role: "Customer Success", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80" }
  ];

  const certifications = [
    { name: "USDA Organic", icon: "✅" },
    { name: "Non-GMO Project", icon: "🌾" },
    { name: "Fair Trade Certified", icon: "🤝" },
    { name: "Carbon Neutral", icon: "🌱" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12"
    >
      <div className="container-base max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Organic Mart
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your trusted source for 100% certified organic products. Fresh from farm to your table.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border-t-4 border-green-500"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Founded in 2020, Organic Mart began with a simple yet powerful mission: to make high-quality organic products accessible to everyone. What started as a passion project by a group of health enthusiasts has grown into a thriving community of over 10,000 customers who share our commitment to healthy, sustainable living.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We partner with more than 50 local farmers and trusted suppliers who share our values. Every product in our store is carefully vetted to ensure it meets our strict organic standards. From fresh produce and dairy to organic medicines and farm products, we bring you only the best.
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our commitment goes beyond just selling products. We believe in creating a positive impact on our planet and supporting the communities that make our mission possible. Through sustainable farming practices, fair trade partnerships, and eco-friendly packaging, we're working towards a healthier future for all.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, Organic Mart stands as a testament to what's possible when quality, sustainability, and community come together. Join us in our journey towards a healthier, more sustainable world—one organic product at a time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Journey</h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="flex-grow border-l-4 border-green-200 dark:border-green-700 pl-6 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.event}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
              >
                <div className="mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-green-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-xl p-8 text-white mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Certified & Trusted</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <div className="text-4xl mb-2">{cert.icon}</div>
                <p className="font-semibold">{cert.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Organic Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Experience the difference of truly organic products. Start your journey to healthier living today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
            >
              Shop Now
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
