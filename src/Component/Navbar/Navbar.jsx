import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
const Navbar = () => {
  const { user, logout } = use(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("You logout successfully");
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="sticky top-0 z-50">
      <div className="navbar  bg-white shadow-sm border-b border-[#5e5feb] px-5 max-w-5xl mx-auto lg:px-8 rounded-3xl">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <NavLink className="hover:underline hover:text-[#4338ca]" to="/">
                Home
              </NavLink>
              <NavLink
                className="hover:underline hover:text-[#4338ca]"
                to="/all-items"
              >
                All-Items
              </NavLink>
              <NavLink
                className="hover:underline hover:text-[#4338ca]"
                to="/about-us"
              >
                About Us
              </NavLink>
              <NavLink
                className="hover:underline hover:text-[#4338ca]"
                to="/contact-us"
              >
                Contact Us
              </NavLink>
              {user && (
                <NavLink
                  className="hover:underline hover:text-[#4338ca]"
                  to="/ServicesDetails"
                >
                  My Profile
                </NavLink>
              )}
              <div>
                {user ? (
                  <button
                    onClick={handleLogout}
                    to="/register"
                    className="btn btn-outline btn-primary"
                  >
                    Log-Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-primary hover:bg-transparent hover:font-semibold hover:text-black"
                  >
                    Login
                  </Link>
                )}
              </div>
            </ul>
          </div>

          <NavLink
            to="/"
            className="flex justify-around gap-1 items-center ml-2"
          >
            <img
              src="https://images.stockcake.com/public/e/8/3/e8330a9a-7961-4a5f-bb84-a03a35abd4b7_large/cat-paw-close-up-stockcake.jpg"
              alt="WarmPaws Logo"
              className="w-12 h-12 rounded-full"
            />
            <span className="btn btn-ghost text-xl text-[#4338ca]">
              WarmPaws
            </span>
          </NavLink>
        </div>

        <div className="lg:flex items-center justify-between gap-6 md:block w-full ">
          <div className=" lg:flex items-center gap-4 hidden md:block">
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition whitespace-nowrap ${
                  isActive
                    ? "bg-[#5e5feb] text-white"
                    : "hover:bg-gray-100 hover:text-[#4338ca]"
                }`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition whitespace-nowrap ${
                  isActive
                    ? "bg-[#5e5feb] text-white"
                    : "hover:bg-gray-100 hover:text-[#4338ca]"
                }`
              }
              to="/all-items"
            >
              All-Items
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition whitespace-nowrap ${
                  isActive
                    ? "bg-[#5e5feb] text-white"
                    : "hover:bg-gray-100 hover:text-[#4338ca]"
                }`
              }
              to="/about-us"
            >
              About Us
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition whitespace-nowrap ${
                  isActive
                    ? "bg-[#5e5feb] text-white"
                    : "hover:bg-gray-100 hover:text-[#4338ca]"
                }`
              }
              to="/contact-us"
            >
              Contact Us
            </NavLink>
            {user && (
              <NavLink
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition whitespace-nowrap ${
                    isActive
                      ? "bg-[#5e5feb] text-white"
                      : "hover:bg-gray-100 hover:text-[#4338ca]"
                  }`
                }
                to="/profile"
              >
                My Profile
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user && user.photoURL ? (
              <img
                className="w-12 h-12 rounded-full border"
                src={user.photoURL}
                alt="User"
              />
            ) : (
              <FaUserAlt className="w-10 h-10 text-gray-500" />
            )}

            {user ? (
              <button
                onClick={handleLogout}
                to="/register"
                className="btn btn-outline btn-primary hidden md:flex items-center justify-center"
              >
                Log-Out
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary hidden md:flex items-center justify-center hover:bg-transparent hover:font-semibold hover:text-black "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
