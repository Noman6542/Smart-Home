import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { MdAddBusiness, MdHomeWork, MdInventory2 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaListAlt, FaPalette } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoMdCash } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import useRole from "../HooksRole/useRole";
import { FcStatistics } from "react-icons/fc";
import Loading from "../../Loading/Loading";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { role, roleLoading } = useRole();
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  if (roleLoading) return <Loading />;

  const navItem = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-300
    ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  
  return (
    <div className="flex max-w-6xl mx-auto min-h-screen 
      bg-gray-100 dark:bg-gray-900">

      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex w-64 bg-white dark:bg-gray-800 
        shadow-xl p-6 flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Dashboard
          </h2>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 p-2 
              hover:bg-gray-200 dark:hover:bg-gray-700 
              rounded-lg w-full mt-4
              text-gray-700 dark:text-gray-300"
          >
            <IoArrowBack /> Back
          </button>

          <nav className="space-y-3 mt-6">
            <NavLink to="/dashboard" className={navItem} end>
              <FcStatistics /> Statistic
            </NavLink>

            <NavLink to="/dashboard/profile" className={navItem}>
              <CgProfile /> My Profile
            </NavLink>

            {role === "customer" && (
              <>
                <NavLink to="/dashboard/bookings" className={navItem}>
                  <FaListAlt /> My Bookings
                </NavLink>
                <NavLink to="become-decorator" className={navItem}>
                  <MdHomeWork /> Become a Decorator
                </NavLink>
              </>
            )}

            {role === "decorator" && (
              <>
                <NavLink to="/dashboard/service" className={navItem}>
                  <MdAddBusiness /> Add Service
                </NavLink>
                <NavLink to="/dashboard/inventory" className={navItem}>
                  <MdInventory2 /> My Services
                </NavLink>
              </>
            )}

            {role === "admin" && (
              <>
                <NavLink to="/dashboard/manage-decorator" className={navItem}>
                  <FaPalette /> Manage Users
                </NavLink>
                <NavLink to="/dashboard/decorator Request" className={navItem}>
                  <RiAdminFill /> Decorator Request
                </NavLink>
              </>
            )}
          </nav>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t dark:border-gray-700">
          Smart Home & Decoration System
        </p>
      </div>

      {/* Sidebar (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 m-2 bg-blue-600 text-white rounded-md"
        >
          {sidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        <div
          className={`fixed inset-0 z-40 transition-all duration-300 ${
            sidebarOpen
              ? "bg-black bg-opacity-50"
              : "bg-transparent pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className={`absolute left-0 top-0 w-64 h-full 
              bg-white dark:bg-gray-800 shadow-xl p-6 
              flex flex-col justify-between z-50
              transform transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                Dashboard
              </h2>

              <button
                onClick={() => {
                  navigate("/");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 p-2 
                  hover:bg-gray-200 dark:hover:bg-gray-700 
                  rounded-lg w-full mt-4
                  text-gray-700 dark:text-gray-300"
              >
                <IoArrowBack /> Back
              </button>

              <nav className="space-y-3 mt-6">
                <NavLink to="/dashboard" className={navItem} end onClick={() => setSidebarOpen(false)}>
                  <FcStatistics /> Statistic
                </NavLink>

                <NavLink to="/dashboard/profile" className={navItem} onClick={() => setSidebarOpen(false)}>
                  <CgProfile /> My Profile
                </NavLink>

                {role === "customer" && (
                  <>
                    <NavLink to="/dashboard/bookings" className={navItem} onClick={() => setSidebarOpen(false)}>
                      <FaListAlt /> My Bookings
                    </NavLink>
                    <NavLink to="/dashboard/payments" className={navItem} onClick={() => setSidebarOpen(false)}>
                      <IoMdCash /> Payment History
                    </NavLink>
                  </>
                )}

                {role === "decorator" && (
                  <>
                    <NavLink to="/dashboard/service" className={navItem} onClick={() => setSidebarOpen(false)}>
                      <MdAddBusiness /> Add Service
                    </NavLink>
                    <NavLink to="/dashboard/inventory" className={navItem} onClick={() => setSidebarOpen(false)}>
                      <MdInventory2 /> My Services
                    </NavLink>
                  </>
                )}

                {role === "admin" && (
                  <NavLink to="/dashboard/manage-decorator" className={navItem} onClick={() => setSidebarOpen(false)}>
                    <FaPalette /> Manage Decorator
                  </NavLink>
                )}
              </nav>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t dark:border-gray-700">
              Smart Home & Decoration System
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 md:p-6 text-gray-800 dark:text-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
