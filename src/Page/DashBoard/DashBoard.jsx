import { Outlet, NavLink, useNavigate } from "react-router";
import { MdAddBusiness, MdInventory2 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaListAlt, FaPalette } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import useRole from "../HooksRole/useRole";
import { FcStatistics } from "react-icons/fc";
import Loading from "../../Loading/Loading";


const DashboardLayout = () => {
  const navItem = ({ isActive }) =>
  `flex items-center gap-3 p-3 rounded-lg transition-all duration-300
   ${isActive 
     ? "bg-blue-600 text-white shadow-md" 
     : "text-gray-700 hover:bg-gray-200"
   }`;

  const navigate = useNavigate();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 max-w-6xl mx-auto">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Dashboard</h2>

        <button
          onClick={() => navigate("/")}
          className=" flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg w-full"
        >
          <IoArrowBack /> Back
        </button>
        

        <nav className="space-y-3 mt-4">

          <NavLink to="/dashboard/Statistic" className={navItem}>
            <FcStatistics /> Statistic
          </NavLink>

          {/* ===== Common ===== */}
          <NavLink to="/dashboard/profile" className={navItem}>
            <CgProfile /> My Profile
          </NavLink>

          {/* ===== Customer ===== */}
          {role === "customer" && (
            <>
              <NavLink to="/dashboard/bookings" className={navItem}>
                <FaListAlt /> My Bookings
              </NavLink>

              <NavLink to="/dashboard/payments" className={navItem}>
                <IoMdCash /> Payment History
              </NavLink>
            </>
          )}

          {/* ===== Decorator ===== */}
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

          {/* ===== Admin ===== */}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/manage-decorator" className={navItem}>
                <FaPalette /> Manage Decorator
              </NavLink>
            </>
          )}
        </nav>

        <p className="text-center text-sm text-gray-500 pt-4 border-t">
          Smart Home & Decoration System
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
