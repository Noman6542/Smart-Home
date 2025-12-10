import { Outlet, NavLink, useNavigate } from "react-router";
import {
  MdAddBusiness,
  MdDashboardCustomize,
  MdDesignServices,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaListAlt } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import Footer from "../Shared/Footer/Footer";

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 max-w-6xl mx-auto">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Dashboard</h2>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-full"
        >
          <IoArrowBack className="text-xl" /> Back
        </button>

        <nav className="space-y-3 mt-4">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg transition-all duration-300
    ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-200"}`
            }
          >
            <CgProfile /> My Profile
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg transition-all duration-300
    ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-200"}`
            }
          >
            <FaListAlt /> My Bookings
          </NavLink>

          <NavLink
            to="/dashboard/service"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg transition-all duration-300
    ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-200"}`
            }
          >
            <MdAddBusiness /> Add Service
          </NavLink>

          <NavLink
            to="/dashboard/payments"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg transition-all duration-300
    ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-200"}`
            }
          >
            <IoMdCash /> Payment History
          </NavLink>
        </nav>

        <div className="border-t pt-4">
          <p className="text-center text-sm text-gray-500">
            Smart Home & Decoration System
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
