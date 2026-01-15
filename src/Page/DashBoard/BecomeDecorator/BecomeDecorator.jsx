import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../HooksRole/useAxiosSecure";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { MdOutlinePending } from "react-icons/md";

const BecomeDecorator = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isRequested, setIsRequested] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/decorator-request-status")
      .then((res) => {
        setIsRequested(res.data.requested);
      })
      .catch(() => {
        toast.error("Failed to load request status");
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleRequest = async () => {
    if (isRequested) return;
    try {
      await axiosSecure.post("/become-decorator");
      toast.success("Request sent, please wait for admin approval!");
      setIsRequested(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gray-100 dark:bg-gray-900"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-2xl p-8 text-center
          bg-white dark:bg-gray-800
          shadow-xl dark:shadow-black/40"
      >
        <h2 className="text-2xl font-bold mb-2
          text-gray-800 dark:text-gray-100">
          Become a Decorator
        </h2>

        <p className="mb-5 text-sm
          text-indigo-600 dark:text-indigo-400">
          Take your creativity to the next level and join our decorator
          community today!
        </p>

        {isRequested && (
          <p className="mb-4 flex items-center justify-center gap-2
            text-yellow-600 dark:text-yellow-400 font-medium">
            <MdOutlinePending className="text-xl" />
            Request Pending
          </p>
        )}

        <div className="flex justify-center gap-4">
          <motion.button
            disabled={isRequested || loading}
            onClick={handleRequest}
            whileHover={!isRequested ? { scale: 1.05 } : {}}
            className={`btn btn-sm ${
              isRequested
                ? "btn-disabled bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                : "btn-primary"
            }`}
          >
            {isRequested ? "Requested" : "Continue"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm
              text-gray-700 dark:text-gray-200
              border-gray-400 dark:border-gray-600"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default BecomeDecorator;
