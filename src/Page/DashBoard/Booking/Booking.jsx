// MyBookings.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/bookings/user/${user.email}`);
        if (res.data?.success === false) {
          setBookings([]);
        } else {
          setBookings(res.data.data || res.data);
        }
      } catch (err) {
        console.error(err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (!user) return <p className="text-center py-10">Please login to view your bookings.</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Service</th>
                <th>Price</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {bookings.map((b) => (
                  <motion.tr
                    key={b._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <td>{b._id}</td>
                    <td>{b.serviceTitle}</td>
                    <td>BDT {b.servicePrice}</td>
                    <td>{new Date(b.date).toLocaleDateString()}</td>
                    <td>{b.location}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-sm ${b.status === "completed" ? "bg-green-100 text-green-800" : b.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
                        {b.status}
                      </span>
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
