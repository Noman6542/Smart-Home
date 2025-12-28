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
    <footer className="bg-base-200 text-base-content max-w-6xl mx-auto">
      <div className="footer p-6 max-w-6xl mx-auto 
                      flex flex-col gap-8
                      md:flex-row md:justify-between md:items-start">

        {/* Contact */}
        <nav className="space-y-3 text-center md:text-left">
          <h6 className="footer-title text-lg font-semibold text-gray-800">
            Contact Us
          </h6>

          <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
            <FaPhoneVolume className="text-indigo-600" />
            <span className="text-sm font-medium">
              +880 1577-036525
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
            <CiLocationOn className="text-indigo-600 text-xl" />
            <span className="text-sm font-medium">
              Dhaka, Bangladesh
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
            <CgMail className="text-indigo-600" />
            <span className="text-sm font-medium">
              mdaanoman6@gmail.com
            </span>
          </div>
        </nav>

        {/* Social */}
        <nav className="space-y-3 text-center md:text-left">
          <h6 className="footer-title text-lg font-semibold text-gray-800">
            Follow Us
          </h6>

          <a
            href="https://www.facebook.com/mdabdullah.alnoman.7737"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 hover:text-indigo-600"
          >
            <FaFacebook className="text-indigo-600" />
            <span className="text-sm font-medium">Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 hover:text-pink-500"
          >
            <FaInstagram className="text-pink-500" />
            <span className="text-sm font-medium">Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/in/abdullah-al-6-noman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 hover:text-blue-600"
          >
            <FaLinkedin className="text-blue-600" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </nav>

        {/* Working Hours */}
        <nav className="space-y-3 text-center md:text-left">
          <h6 className="footer-title text-lg font-semibold text-gray-800">
            Working Hours
          </h6>

          <div className="text-sm text-gray-600">
            <span className="text-indigo-600 font-medium">
              Mon – Fri:
            </span>{" "}
            9:00 AM – 10:00 PM
          </div>

          <div className="text-sm text-gray-600">
            <span className="text-indigo-600 font-medium">
              Sat – Sun:
            </span>{" "}
            10:00 AM – 11:00 PM
          </div>
        </nav>

      </div>

      {/* Bottom bar */}
      <div className="text-center py-4 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Noman. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
