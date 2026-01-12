import React from "react";
import { motion } from "framer-motion";
import { Search, CalendarCheck, CreditCard, Sparkles } from "lucide-react";
import { Link } from "react-router";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Browse Services",
    description:
      "Explore a wide range of professional decoration and consultation services tailored to your needs.",
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Book Your Service",
    description:
      "Choose your preferred service, select a date, and confirm your booking in just a few clicks.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Secure Payment",
    description:
      "Make a safe and secure payment through our trusted online payment system.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Enjoy the Experience",
    description:
      "Sit back and relax while our expert decorators deliver an amazing experience.",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          How <span className="text-indigo-600 dark:text-indigo-400">It Works</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Booking professional decoration services has never been easier. Follow these simple steps to get started.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-none hover:shadow-lg dark:hover:shadow-indigo-500/10 transition p-6 text-center border border-gray-100 dark:border-gray-800"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Discover top-rated decorators and book your service today.
        </p>
        <Link
          to="/service"
          className="inline-block px-8 py-3 rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
        >
          Explore Services
        </Link>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
