import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../HooksRole/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // Handle role change
  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch("/update-role", {
        email,
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(`Role updated to ${newRole}`);
        setUsers(
          users.map((u) =>
            u.email === email ? { ...u, role: newRole } : u
          )
        );
      }
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-600 dark:text-gray-300">
        Loading users...
      </p>
    );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Manage Users
      </h2>

      <div className="overflow-x-auto">
        <table
          className="min-w-full border rounded-lg 
                     bg-white dark:bg-gray-800 
                     border-gray-200 dark:border-gray-700"
        >
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="py-2 px-4 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                Email
              </th>
              <th className="py-2 px-4 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                Role
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="py-2 px-4 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 break-all">
                  {user.email}
                </td>

                <td className="py-2 px-4 border border-gray-200 dark:border-gray-600">
                  <select
                    value={user.role || "customer"}
                    onChange={(e) =>
                      handleRoleChange(user.email, e.target.value)
                    }
                    className="w-full px-2 py-1 rounded 
                               bg-white dark:bg-gray-900 
                               text-gray-800 dark:text-gray-100 
                               border border-gray-300 dark:border-gray-600 
                               focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="customer">Customer</option>
                    <option value="decorator">Decorator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
