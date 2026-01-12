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
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400">
      <div
        className="max-w-6xl mx-auto p-6
                   flex flex-col gap-8
                   md:flex-row md:justify-between md:items-start"
      >
        {/* Contact */}
        <nav className="space-y-3 text-center md:text-left">
          <h6 className="text-lg font-semibold text-gray-800 dark:text-white">
            Contact Us
          </h6>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <FaPhoneVolume className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium">
              +880 1577-036525
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <CiLocationOn className="text-indigo-600 dark:text-indigo-400 text-xl" />
            <span className="text-sm font-medium">
              Dhaka, Bangladesh
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <CgMail className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium">
              mdaanoman6@gmail.com
            </span>
          </div>
        </nav>

        {/* Social */}
        <nav className="space-y-3 text-center md:text-left">
          <h6 className="text-lg font-semibold text-gray-800 dark:text-white">
            Follow Us
          </h6>

          <a
            href="https://www.facebook.com/mdabdullah.alnoman.7737"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <FaFacebook className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium">Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 hover:text-pink-500 transition"
          >
            <FaInstagram className="text-pink-500" />
            <span className="text-sm font-medium">Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/in/abdullah-al-6-noman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaLinkedin className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </nav>

        {/* Working Hours */}
        <nav className="space-y-3 text-center md:text-left">
          <h6 className="text-lg font-semibold text-gray-800 dark:text-white">
            Working Hours
          </h6>

          <div className="text-sm">
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
              Mon – Fri:
            </span>{" "}
            9:00 AM – 10:00 PM
          </div>

          <div className="text-sm">
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
              Sat – Sun:
            </span>{" "}
            10:00 AM – 11:00 PM
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="text-center py-4 text-sm border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Noman. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
