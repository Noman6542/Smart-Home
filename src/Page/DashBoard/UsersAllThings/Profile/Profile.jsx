import { use } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Provider/AuthProvider";


export default function UserProfile() {
  const { user } = use(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-24 text-xl font-semibold text-gray-600">
        Please login to see your profile
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-lg mx-auto mt-14 p-8 rounded-3xl 
                 bg-white/80 backdrop-blur-xl shadow-2xl"
    >
      {/* Profile Image */}
      <div className="flex flex-col items-center text-center relative">
        <motion.img
          src={user.photoURL || "https://i.ibb.co/CKwP1V5/user.png"}
          alt="User"
          className="w-36 h-36 rounded-full border-[5px] border-primary shadow-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Welcome Text */}
        <motion.h2
          className="mt-6 text-2xl font-bold bg-gradient-to-r 
                     from-primary via-indigo-500 to-purple-500 
                     bg-clip-text text-transparent "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome back, {user.displayName?.split(" ")[0] || "User"}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Glad to see you again
        </motion.p>
      </div>

      {/* Info Section */}
      <motion.div
        className="mt-8 p-6 rounded-2xl bg-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="text-lg font-semibold mb-4 text-gray-800">
          Profile Overview
        </h4>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Full Name:</span>{" "}
            {user.displayName || "Not provided"}
          </p>
          <p>
            <span className="font-semibold">Email Address:</span>{" "}
            {user.email}
          </p>
          
        </div>
      </motion.div>

      {/* Footer Quote */}
      <motion.p
        className="mt-6 text-center text-sm italic text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        “A profile is not just data — it’s your digital identity.”
      </motion.p>
    </motion.div>
  );
}
