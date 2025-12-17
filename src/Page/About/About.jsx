import { motion } from "framer-motion";
import { Home, HeartHandshake, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide professional home decoration and interior styling services
          designed to make your space beautiful, comfortable, and memorable.
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Who We Are */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow p-6 text-center"
        >
          <Home className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Who We Are</h3>
          <p className="text-gray-600 text-sm">
            A creative team of decorators focused on delivering stylish and
            high-quality interior decoration solutions.
          </p>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow p-6 text-center"
        >
          <HeartHandshake className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm">
            To transform homes into elegant and comfortable spaces through
            thoughtful design and trusted service.
          </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow p-6 text-center"
        >
          <Sparkles className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Why Choose Us</h3>
          <p className="text-gray-600 text-sm">
            Experienced decorators, transparent pricing, secure booking, and
            customer-focused service.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
