import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section className="min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-between  py-10 gap-10 max-w-6xl mx-auto">
      
      {/* Left Side Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 space-y-6 text-center md:text-left"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Smart Home & Ceremony Decoration  
          <span className="text-primary block mt-1">Book Your Service Easily</span>
        </h1>

        <p className="text-gray-600 text-lg md:pr-10">
          Professional decorators ready to transform your home, events, and ceremonies 
          with elegant designs & on-site premium service.
        </p>

        <button className="btn btn-primary px-8 py-3 text-lg rounded-lg shadow-md">
          Book Decoration Service
        </button>
      </motion.div>

      {/* Right Side Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex justify-center"
      >
        <img
          src="https://i.ibb.co.com/99B4gMSZ/images-q-tbn-ANd9-Gc-T314-DEj3-Vy-OMa9wwa-JRc-ML6ox-Yywkdgp-P7-Q-s.jpg"
          alt="Decoration"
          className="rounded-2xl shadow-xl w-full max-w-md md:max-w-full object-cover"
        />
      </motion.div>

    </section>
  );
};

export default Header;
