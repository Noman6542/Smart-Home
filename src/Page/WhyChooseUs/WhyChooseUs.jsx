import React from "react";
import { motion } from "framer-motion";
import { Star, Users, ShieldCheck, Clock } from "lucide-react";

const reasons = [
  {
    icon: <Star className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
    title: "Top Quality Services",
    description:
      "We work only with experienced and verified decorators to ensure premium quality and outstanding results.",
  },
  {
    icon: <Users className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
    title: "Trusted Professionals",
    description:
      "Our decorators are carefully selected and reviewed, so you can book services with complete confidence.",
  },
  {
    icon: (
      <ShieldCheck className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
    ),
    title: "Secure & Transparent",
    description:
      "We offer secure payments, clear pricing, and full transparency—no hidden charges, ever.",
  },
  {
    icon: <Clock className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
    title: "On-Time Delivery",
    description:
      "We value your time. Our professionals ensure timely service delivery without compromising quality.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Why{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Choose Us
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          We go beyond just providing services—we deliver trust, quality, and a
          seamless experience from start to finish.
        </p>
      </motion.div>

      {/* Reasons Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-none hover:shadow-xl dark:hover:shadow-indigo-500/10 transition p-8 text-center border border-gray-100 dark:border-gray-800"
          >
            <div className="flex justify-center mb-5">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
