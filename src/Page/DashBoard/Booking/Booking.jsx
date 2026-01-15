import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_Server_localhost}/bookings/user/${user.email}`
        );
        setBookings(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Payment
  const handlePayment = async (booking) => {
    try {
      const paymentInfo = {
        serviceId: booking.serviceId,
        serviceName: booking.serviceTitle,
        serviceType: booking.serviceType,
        description: booking.serviceTitle,
        price: booking.servicePrice,
        userName: user.displayName,
        userEmail: user.email,
        bookingId: booking._id,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_Server_localhost}/create-checkout-session`,
        paymentInfo
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      toast.error("Payment initiation failed!");
    }
  };

  // Cancel booking
  const handleDelete = (bookingId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 text-sm">
          <span className="text-gray-800 dark:text-gray-200">
            Are you sure you want to cancel this booking?
          </span>

          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sm btn-error"
              onClick={async () => {
                try {
                  const res = await axios.delete(
                    `${import.meta.env.VITE_Server_localhost}/bookings/${bookingId}`
                  );
                  if (res.data.success) {
                    setBookings((prev) =>
                      prev.filter((b) => b._id !== bookingId)
                    );
                    toast.success("Booking cancelled successfully!");
                  }
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to cancel booking!");
                } finally {
                  toast.dismiss(t.id);
                }
              }}
            >
              Yes
            </button>

            <button
              className="btn btn-sm btn-outline"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (!user)
    return (
      <p className="text-center py-16 text-gray-600 dark:text-gray-400">
        Please login to view your bookings.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        My Bookings
      </h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have no bookings yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border
          border-gray-200 dark:border-gray-700"
        >
          <table className="table w-full
            bg-white dark:bg-gray-800"
          >
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th>Service</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {bookings.map((booking) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="font-medium">
                      {booking.serviceTitle}
                    </td>

                    <td>USD ${booking.servicePrice}</td>

                    <td>
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="flex gap-2">
                      {booking.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handlePayment(booking)}
                            className="btn btn-sm btn-primary"
                          >
                            Pay
                          </button>

                          <button
                            onClick={() => handleDelete(booking._id)}
                            className="btn btn-sm btn-error"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          Paid
                        </span>
                      )}
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

export default MyBookings;
