import React from "react";
import { motion } from "framer-motion";
import { Target, HeartHandshake, ShieldCheck } from "lucide-react";

const missions = [
  {
    icon: <Target className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
    title: "Our Vision",
    description:
      "To become the most trusted platform for professional decoration and smart home services, connecting customers with skilled experts seamlessly.",
  },
  {
    icon: (
      <HeartHandshake className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
    ),
    title: "Our Commitment",
    description:
      "We are committed to delivering quality, reliability, and satisfaction by ensuring every service meets our high standards.",
  },
  {
    icon: (
      <ShieldCheck className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
    ),
    title: "Our Promise",
    description:
      "Your trust matters to us. We promise secure payments, transparent pricing, and dependable service every step of the way.",
  },
];

const OurMission = () => {
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
          Our{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Mission
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Our mission is to simplify the way people discover, book, and enjoy
          professional decoration services by combining technology, trust, and
          creativity.
        </p>
      </motion.div>

      {/* Mission Cards */}
      <div className="grid gap-10 md:grid-cols-3">
        {missions.map((item, index) => (
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

      {/* Bottom Statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-20 bg-indigo-50 dark:bg-gray-900 rounded-3xl p-10 text-center border border-indigo-100 dark:border-gray-800"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Building Trust Through Excellence
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We believe great experiences start with great values. Our platform
          empowers customers and decorators alike, creating meaningful
          connections and memorable results.
        </p>
      </motion.div>
    </section>
  );
};

export default OurMission;
