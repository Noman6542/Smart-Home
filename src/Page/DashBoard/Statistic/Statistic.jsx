import React from "react";
import useRole from "../../HooksRole/useRole";
import Loading from "../../../Loading/Loading";
import {
  FaUsers,
  FaPaintRoller,
  FaClipboardList,
  FaDollarSign,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";

const StatCard = ({ icon: Icon, title, value }) => {
  return (
    <div className="bg-base-100 rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition">
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        <Icon className="text-2xl" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const Statistic = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-base-200 rounded-2xl min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* ---------------- ADMIN ---------------- */}
      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={FaUsers}
            title="Total Users"
            value="120"
          />
          <StatCard
            icon={FaPaintRoller}
            title="Total Decorators"
            value="35"
          />
          <StatCard
            icon={FaClipboardList}
            title="Active Bookings"
            value="78"
          />
          <StatCard
            icon={FaDollarSign}
            title="Total Revenue"
            value="$12,500"
          />
        </div>
      )}

      {/* ---------------- DECORATOR ---------------- */}
      {role === "decorator" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={FaBriefcase}
            title="My Services"
            value="12"
          />
          <StatCard
            icon={FaClipboardList}
            title="Assigned Bookings"
            value="20"
          />
          <StatCard
            icon={FaClock}
            title="Pending Requests"
            value="5"
          />
          <StatCard
            icon={FaDollarSign}
            title="Total Earnings"
            value="$3,200"
          />
        </div>
      )}

      {/* ---------------- CUSTOMER ---------------- */}
      {role === "customer" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={FaClipboardList}
            title="My Bookings"
            value="8"
          />
          <StatCard
            icon={FaBriefcase}
            title="Completed Bookings"
            value="5"
          />
          <StatCard
            icon={FaClock}
            title="Pending Payments"
            value="2"
          />
          <StatCard
            icon={FaDollarSign}
            title="Total Spend"
            value="$1,450"
          />
        </div>
      )}

      {/* ---------------- FALLBACK ---------------- */}
      {!role && (
        <div className="text-center text-gray-500 mt-10">
          Role not found. Please contact support.
        </div>
      )}
    </div>
  );
};

export default Statistic;
