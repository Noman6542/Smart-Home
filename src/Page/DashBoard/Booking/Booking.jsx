import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);

  // All bookings state
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings by email
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/bookings/user/${user.email}`
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

  // HANDLE PAYMENT (Stripe Redirect)
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
        "http://localhost:5000/create-checkout-session",
        paymentInfo
      );

      // Redirect to Stripe checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      toast.error("Payment initiation failed!");
    }
  };

  // HANDLE DELETE / CANCEL BOOKING
  const handleDelete = (bookingId) => {
  toast(
    (t) => (
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to cancel this booking?</span>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="btn btn-sm btn-error"
            onClick={async () => {
              try {
                const res = await axios.delete(`http://localhost:5000/bookings/${bookingId}`);
                if (res.data.success) {
                  setBookings((prev) => prev.filter((b) => b._id !== bookingId));
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
      <p className="text-center py-10">Please login to view your bookings.</p>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
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
                  >
                    <td>{booking.serviceTitle}</td>
                    <td>USD ${booking.servicePrice}</td>
                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>

                    {/* STATUS BADGE */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* ACTIONS: Pay / Paid / Cancel */}
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
                        <span className="text-green-600 font-semibold">Paid</span>
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