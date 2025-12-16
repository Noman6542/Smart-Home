import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../HooksRole/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get('/users');
        setUsers(res.data);
      } catch (err) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // Handle role change
  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch('/update-role', { email, role: newRole });
      if (res.data.modifiedCount > 0) {
        toast.success(`Role updated to ${newRole}`);
        setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u));
      }
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border break-all">{user.email}</td>
                <td className="py-2 px-4 border">
                  <select
                    value={user.role || 'customer'}
                    onChange={(e) => handleRoleChange(user.email, e.target.value)}
                    className="border rounded px-2 py-1"
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
                <td colSpan={2} className="text-center py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
