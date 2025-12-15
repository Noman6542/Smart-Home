import React from "react";
import useRole from "../../HooksRole/useRole";
import Loading from "../../../Loading/Loading";


const Statistic = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-6">Dashboard Statistics</h2>

      {role === "admin" && (
        <div className="space-y-4">
          <p className="text-lg font-semibold">Admin Panel Stats:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Total Users: 120</li>
            <li>Total Decorators: 35</li>
            <li>Active Bookings: 78</li>
            <li>Revenue: $12,500</li>
          </ul>
        </div>
      )}

      {role === "decorator" && (
        <div className="space-y-4">
          <p className="text-lg font-semibold">Decorator Stats:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>My Services: 12</li>
            <li>Bookings Assigned: 20</li>
            <li>Pending Requests: 5</li>
            <li>Earnings: $3,200</li>
          </ul>
        </div>
      )}

      {role === "customer" && (
        <div className="space-y-4">
          <p className="text-lg font-semibold">Your Stats:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>My Bookings: 8</li>
            <li>Completed Bookings: 5</li>
            <li>Pending Payments: 2</li>
            <li>Total Spend: $1,450</li>
          </ul>
        </div>
      )}

      {!role && (
        <p className="text-gray-500">
          Role not found. Please contact support.
        </p>
      )}
    </div>
  );
};

export default Statistic;
