import React, { use, useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { LuMapPinHouse } from "react-icons/lu";
import { BsInfoCircleFill } from "react-icons/bs";
import {
  MdConnectWithoutContact,
  MdDashboardCustomize,
  MdDesignServices,
} from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import { IoIosLogOut } from "react-icons/io";
import Swal from "sweetalert2";
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

  // Active NavLink style
  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 font-semibold text-white bg-white/20 px-4 py-2 rounded-lg"
      : "flex items-center gap-2 font-semibold text-white px-4 py-2 hover:bg-white/10 rounded-lg transition";

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-b border-white/10">
      <div className="navbar max-w-6xl mx-auto">

        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 w-56 p-4 rounded-xl bg-indigo-800 dark:bg-gray-900 shadow space-y-3">
              <NavLink to="/" className={linkStyle}><IoHomeOutline />Home</NavLink>
              <NavLink to="/service" className={linkStyle}><MdDesignServices />Service</NavLink>
              <NavLink to="/coverage" className={linkStyle}><LuMapPinHouse />Coverage</NavLink>
              <NavLink to="/about" className={linkStyle}><BsInfoCircleFill />About</NavLink>
              <NavLink to="/contact" className={linkStyle}><MdConnectWithoutContact />Contact</NavLink>
            </ul>
          </div>

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white font-bold"
          >
            <img src={logo} alt="logo" className="w-8 h-8 rounded" />
            <span className="text-xl">Smart Home</span>
          </button>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            <NavLink to="/" className={linkStyle}><IoHomeOutline />Home</NavLink>
            <NavLink to="/service" className={linkStyle}><MdDesignServices />Service</NavLink>
            <NavLink to="/coverage" className={linkStyle}><LuMapPinHouse />Coverage</NavLink>
            <NavLink to="/about" className={linkStyle}><BsInfoCircleFill />About</NavLink>
            <NavLink to="/contact" className={linkStyle}><MdConnectWithoutContact />Contact</NavLink>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-3">

          {/* Theme Toggle */}
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={theme === "dark"}
            className="toggle toggle-primary"
          />

          {!user ? (
            <>
              <Link to="/login" className="btn btn-primary hidden md:flex">
                Login
              </Link>
              <Link to="/register" className="btn bg-white text-black hidden md:flex hover:bg-gray-200">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL || "/default.png"}
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {user.displayName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>

                  <hr className="my-3 border-gray-200 dark:border-gray-700" />

                  <NavLink
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
                  >
                    <MdDashboardCustomize />
                    Dashboard
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-3"
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
    </div>
  );
};

export default Navbar;