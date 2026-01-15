import { use } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaIdBadge,
  FaUserShield,
  FaEdit,
  FaKey,
} from "react-icons/fa";
import useRole from "../../../HooksRole/useRole";

const Profile = () => {
  const { user } = use(AuthContext);
  const { role, roleLoading } = useRole();

  if (!user) {
    return (
      <div className="text-center mt-24 text-xl font-semibold text-gray-600 dark:text-gray-300">
        Please login to see your profile
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto mt-14 p-6 rounded-2xl 
                 bg-white dark:bg-gray-900 
                 shadow-xl dark:shadow-gray-800"
    >
      {/* ===== Header ===== */}
      <div className="flex flex-col items-center text-center">
        <img
          src={user.photoURL || "https://i.ibb.co/CKwP1V5/user.png"}
          alt="user"
          className="w-32 h-32 rounded-full border-4 border-primary"
        />

        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
          {user.displayName || "User"}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Welcome to your profile
        </p>
      </div>

      {/* ===== User Info ===== */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg 
                        bg-gray-100 dark:bg-gray-800">
          <FaEnvelope className="text-primary text-lg" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
            <p className="font-medium text-gray-800 dark:text-gray-100 break-all">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg 
                        bg-gray-100 dark:bg-gray-800">
          <FaIdBadge className="text-primary text-lg" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">User ID</p>
            <p className="font-medium text-gray-800 dark:text-gray-100 break-all">
              {user.uid}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg 
                        bg-gray-100 dark:bg-gray-800">
          <FaUserShield className="text-primary text-lg" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
            <p className="font-medium text-gray-800 dark:text-gray-100 break-all">
              {roleLoading ? "Loading..." : role || "user"}
            </p>
          </div>
        </div>
      </div>

      {/* ===== Action Buttons ===== */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="btn btn-outline btn-primary flex gap-2 items-center">
          <FaEdit /> Update Profile
        </button>

        <button className="btn btn-outline btn-warning flex gap-2 items-center">
          <FaKey /> Change Password
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
