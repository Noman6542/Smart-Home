import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const ManageDecorator = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/manage-decorator/${user.email}`
        );
        setBookings(res.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Status toggle
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    try {
      await axios.patch(
        `http://localhost:5000/bookings/${id}/status`,
        { status: newStatus }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      );

      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Cancel booking
  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await axios.delete(`http://localhost:5000/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking cancelled");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Assigned Projects</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No assigned bookings found.
        </p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {bookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td>{index + 1}</td>

                    <td className="font-medium">
                      {booking.serviceName}
                    </td>

                    <td>
                      <p className="font-semibold">{booking.name}</p>
                      <p className="text-sm text-gray-500">
                        {booking.email}
                      </p>
                    </td>

                    <td className="font-semibold text-green-600">
                      ${booking.price}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleStatusToggle(
                            booking._id,
                            booking.status
                          )
                        }
                        className="btn btn-xs btn-outline"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        Cancel
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageDecorator;
