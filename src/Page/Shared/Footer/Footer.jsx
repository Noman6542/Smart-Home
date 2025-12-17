import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneVolume,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  return (
    <footer className="footer p-5 bg-base-200 text-base-content flex justify-around items-center max-w-6xl mx-auto">
      <nav className="space-y-3 text-center md:text-left">
        <h6 className="footer-title text-lg font-semibold text-gray-800 mb-3">
          Contact Us
        </h6>

        <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-indigo-600 transition">
          <FaPhoneVolume className="text-indigo-600 text-lg" />
          <span className="text-sm font-medium">+880 1577-036525</span>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-indigo-600 transition">
          <CiLocationOn className="text-indigo-600 text-xl" />
          <span className="text-sm font-medium">Dhaka, Bangladesh</span>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-indigo-600 transition">
          <CgMail className="text-indigo-600 text-lg" />
          <span className="text-sm font-medium">mdaanoman6@gmail.com</span>
        </div>
      </nav>

      <nav className="space-y-3 text-center md:text-left">
        <h6 className="footer-title text-lg font-semibold text-gray-800 mb-3">
          Follow Us
        </h6>

        <a
          href="https://www.facebook.com/mdabdullah.alnoman.7737"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-indigo-600 transition"
        >
          <FaFacebook className="text-lg text-indigo-600" />
          <span className="text-sm font-medium">Facebook</span>
        </a>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-pink-500 transition"
        >
          <FaInstagram className="text-lg text-blue-600" />
          <span className="text-sm font-medium">Instagram</span>
        </a>

        <a
          href="https://www.linkedin.com/in/abdullah-al-6-noman"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-blue-600 transition"
        >
          <FaLinkedin className="text-lg text-blue-600" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
      </nav>

      <nav className="space-y-3 text-center md:text-left">
        <h6 className="footer-title text-lg font-semibold text-gray-800 mb-3">
          Working Hours
        </h6>

        <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
          <span className="text-indigo-600 font-medium">Mon – Fri</span>
          <span className="text-sm">9:00 AM – 10:00 PM</span>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
          <span className="text-indigo-600 font-medium">Sat – Sun</span>
          <span className="text-sm">10:00 AM – 11:00 PM</span>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
