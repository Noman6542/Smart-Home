import React from "react";

const Footer = () => {
  return (
    <footer className="footer p-5 bg-base-200 text-base-content mt-16 flex justify-around items-center max-w-6xl mx-auto">
      <nav>
        <h6 className="footer-title">Contact</h6>
        <p>📞 01577-036525</p>
        <p>📍 Dhaka, Bangladesh</p>
        <p>✉️ styledecor@gmail.com</p>
      </nav>
      <nav>
        <h6 className="footer-title">Follow Us</h6>
        <a className="link link-hover">Facebook</a>
        <a className="link link-hover">Instagram</a>
        <a className="link link-hover">LinkedIn</a>
      </nav>
      <nav>
        <h6 className="footer-title">Working Hours</h6>
        <p>Mon - Fri: 9AM - 10PM</p>
        <p>Sat - Sun: 10AM - 11PM</p>
      </nav>
    </footer>
  );
};

export default Footer;
