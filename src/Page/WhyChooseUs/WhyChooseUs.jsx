import React from "react";
import { motion } from "framer-motion";
import { Star, Users, ShieldCheck, Clock } from "lucide-react";

const reasons = [
  {
    icon: <Star className="w-10 h-10 text-indigo-600" />,
    title: "Top Quality Services",
    description:
      "We work only with experienced and verified decorators to ensure premium quality and outstanding results.",
  },
  {
    icon: <Users className="w-10 h-10 text-indigo-600" />,
    title: "Trusted Professionals",
    description:
      "Our decorators are carefully selected and reviewed, so you can book services with complete confidence.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-indigo-600" />,
    title: "Secure & Transparent",
    description:
      "We offer secure payments, clear pricing, and full transparency—no hidden charges, ever.",
  },
  {
    icon: <Clock className="w-10 h-10 text-indigo-600" />,
    title: "On-Time Delivery",
    description:
      "We value your time. Our professionals ensure timely service delivery without compromising quality.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Why <span className="text-indigo-600">Choose Us</span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We go beyond just providing services—we deliver trust, quality, and a seamless experience from start to finish.
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
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center"
          >
            <div className="flex justify-center mb-5">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
