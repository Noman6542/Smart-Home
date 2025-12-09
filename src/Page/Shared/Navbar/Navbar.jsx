import React, { use, useEffect, useState } from "react";

import { IoHomeOutline } from "react-icons/io5";
import { LuMapPinHouse } from "react-icons/lu";
import { BsInfoCircleFill } from "react-icons/bs";
import {
  MdConnectWithoutContact,
  MdDashboardCustomize,
  MdDesignServices,
  MdOutlineHomeRepairService,
} from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import { IoIosLogOut } from "react-icons/io";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../../Provider/AuthProvider";
import { auth } from "../../../Firebase/Firebase.init";
import logo from "../../../assets/Screenshot 2025-12-06 192121.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Theme toggle
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = () => {
    auth.signOut();
    Swal.fire("Logged out", "See you soon!", "success");
    setDropdownOpen(false);
  };

  // NavLink Active Style
  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center space-x-2 font-bold text-white bg-white/20 px-4 py-2 rounded-lg"
      : "flex items-center space-x-2 font-bold text-white px-4 py-2 hover:bg-white/10 rounded-lg";

  return (
    <div className="navbar bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 shadow-xl sticky top-0 z-50 backdrop-blur-lg border-b border-white/10 max-w-6xl mx-auto">
      {/* LEFT SIDE */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          {/* Mobile Items */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-indigo-800 rounded-xl mt-3 w-56 p-4 shadow space-y-4"
          >
            <NavLink to="/" className={linkStyle}>
              <IoHomeOutline className="w-5 h-5" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/service" className={linkStyle}>
              <MdDesignServices className="w-5 h-5" />

              <span>Service</span>
            </NavLink>

            <NavLink to="/coverage" className={linkStyle}>
              <LuMapPinHouse className="w-5 h-5" />
              <span>Coverage</span>
            </NavLink>

            <NavLink to="/about" className={linkStyle}>
              <BsInfoCircleFill className="w-5 h-5" />

              <span>About</span>
            </NavLink>

            <NavLink to="/contact" className={linkStyle}>
              <MdConnectWithoutContact className="w-5 h-5" />
              <span>Contact</span>
            </NavLink>
            
            <NavLink to="/decorator" className={linkStyle}>
              <MdConnectWithoutContact className="w-5 h-5" />
              <span className="text-black font-semibold">Decorator</span>
            </NavLink>
          </ul>
        </div>

        {/* LOGO */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-white font-bold tracking-tight"
        >
          <img src={logo} alt="" className="w-8 h-8" />
          <span className="text-xl">Smart Home</span>
        </button>
      </div>

      {/* CENTER NAV (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-4">
          <NavLink to="/" className={linkStyle}>
            <IoHomeOutline className="w-6 h-6" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/service" className={linkStyle}>
            <MdDesignServices className="w-5 h-5" />

            <span>Service</span>
          </NavLink>
          <NavLink to="/coverage" className={linkStyle}>
            <LuMapPinHouse className="w-5 h-5" />
            <span>Coverage</span>
          </NavLink>

          <NavLink to="/about" className={linkStyle}>
            <BsInfoCircleFill className="w-5 h-5" />

            <span>About</span>
          </NavLink>

          <NavLink to="/contact" className={linkStyle}>
            <MdConnectWithoutContact className="w-5 h-5" />
            <span>Contact</span>
          </NavLink>
          
          <NavLink
            to="/decorator"
            className="bg-emerald-500 hover:bg-emerald-700 flex justify-center items-center p-3 gap-2 rounded-full text-white"
          >
            <MdOutlineHomeRepairService className="w-5 h-5  " />
            <span className=" font-semibold">Decorator</span>
          </NavLink>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end relative">
        {/* If NOT Logged In */}
        {!user ? (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="btn btn-primary hidden md:flex items-center justify-center hover:bg-white hover:text-black"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-secondary hidden md:flex items-center justify-center hover:bg-white hover:text-black"
            >
              Register
            </Link>
          </div>
        ) : (
          // If Logged In
          <div className="relative">
            <img
              src={user.photoURL || "/default.png"}
              alt="user"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl p-4 z-50">
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>

                <div className="my-2">
                  <hr />
                </div>
                <NavLink to='/dashboard' className="w-full flex justify-center items-center gap-2 bg-[#00b894] hover:bg-[#636e72] text-white py-2 rounded-lg mt-2">
                  <MdDashboardCustomize />
                  Dashboard
                </NavLink>

                <div className="flex items-center justify-between mt-3 mb-2">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={theme === "dark"}
                    className="toggle toggle-primary"
                  />
                </div>
                {/* <Link
                  to="/my-profile"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                >
                  <CgProfile className="w-6 h-6" />
                  <span>My Profile</span>
                </Link> */}

                <div className="w-full mt-2">
                  <hr></hr>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 gap 2 rounded-lg mt-2"
                >
                  <IoIosLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
