import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyInventory = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH SELLER SERVICES
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchInventory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_Server_localhost}/my-Inventory/${user.email}`
        );
        setServices(res.data?.data || []);
      } catch (error) {
        console.error(error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [user]);

  // DELETE SERVICE (Toast Confirm)
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="space-y-3">
          <p>Are you sure you want to delete this service?</p>
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sm btn-error"
              onClick={async () => {
                try {
                  await axios.delete(`${import.meta.env.VITE_Server_localhost}/services/${id}`);
                  setServices((prev) =>
                    prev.filter((service) => service._id !== id)
                  );
                  toast.success("Service deleted successfully!");
                } catch (error) {
                  console.error(error);
                  toast.error("Failed to delete service!");
                } finally {
                  toast.dismiss(t.id);
                }
              }}
            >
              Delete
            </button>

            <button
              className="btn btn-sm btn-outline"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (!user) {
    return (
      <p className="text-center py-10">
        Please login to view your inventory.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">My Inventory</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not added any services yet.
        </p>
      ) : (
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {services.map((service, index) => (
                  <motion.tr
                    key={service._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="hover:bg-gray-50"
                  >
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </td>

                    <td className="font-medium">{service.title}</td>

                    <td>
                      <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-700">
                        {service.type}
                      </span>
                    </td>

                    <td className="font-semibold text-green-600">
                      ${service.price}
                    </td>

                    <td className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/update-service/${service._id}`)
                        }
                        className="btn btn-sm btn-primary"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(service._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
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

export default MyInventory;
