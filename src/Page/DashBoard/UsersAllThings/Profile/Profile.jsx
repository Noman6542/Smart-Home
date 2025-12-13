import { use } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Provider/AuthProvider";

export default function UserProfile() {
  const { user } = use(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Please login to see your profile
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto mt-12 p-6 rounded-2xl shadow-xl bg-white"
    >
      {/* Profile Image */}
      <div className="flex flex-col items-center text-center">
        <motion.img
          src={user.photoURL || "https://i.ibb.co/CKwP1V5/user.png"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-primary shadow-md"
          whileHover={{ scale: 1.05 }}
        />

        {/* Welcome */}
        <motion.h2
          className="text-xl font-semibold mt-4 text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          👋 Welcome back!
        </motion.h2>

        {/* Name */}
        <h3 className="text-2xl font-bold mt-1">
          {user.displayName || "User"}
        </h3>

        {/* Email */}
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Info Card */}
      <motion.div
        className="mt-6 p-4 bg-gray-100 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-lg font-semibold mb-3">
          Profile Information
        </h4>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-bold">Name:</span>{" "}
            {user.displayName || "Not set"}
          </p>
          <p>
            <span className="font-bold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-bold">Verified:</span>{" "}
            {user.emailVerified ? "Yes ✅" : "No ❌"}
          </p>
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="mt-5 flex gap-3">
        <button className="btn btn-primary flex-1">
          Edit Profile
        </button>
        <button className="btn btn-outline flex-1">
          Logout
        </button>
      </div>
    </motion.div>
  );
}
