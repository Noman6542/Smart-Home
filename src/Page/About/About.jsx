import { motion } from "framer-motion";
import { Home, HeartHandshake, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 
      bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold 
          text-gray-800 dark:text-white mb-4">
          About Us
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We provide professional home decoration and interior styling services
          designed to make your space beautiful, comfortable, and memorable.
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* Who We Are */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 
            rounded-2xl shadow-lg p-6 text-center
            transition-colors duration-300"
        >
          <Home className="w-10 h-10 text-indigo-600 mx-auto mb-4" />

          <h3 className="text-xl font-semibold mb-2 
            text-gray-800 dark:text-white">
            Who We Are
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm">
            A creative team of decorators focused on delivering stylish and
            high-quality interior decoration solutions.
          </p>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 
            rounded-2xl shadow-lg p-6 text-center
            transition-colors duration-300"
        >
          <HeartHandshake className="w-10 h-10 text-indigo-600 mx-auto mb-4" />

          <h3 className="text-xl font-semibold mb-2 
            text-gray-800 dark:text-white">
            Our Mission
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm">
            To transform homes into elegant and comfortable spaces through
            thoughtful design and trusted service.
          </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 
            rounded-2xl shadow-lg p-6 text-center
            transition-colors duration-300"
        >
          <Sparkles className="w-10 h-10 text-indigo-600 mx-auto mb-4" />

          <h3 className="text-xl font-semibold mb-2 
            text-gray-800 dark:text-white">
            Why Choose Us
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Experienced decorators, transparent pricing, secure booking, and
            customer-focused service.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
