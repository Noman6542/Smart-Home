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
      toast.success("Request sent,Please wait for admin approval!");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Become a Decorator</h2>
        <p className="text-indigo-600 mb-4">
        Take your creativity to the next level and join our decorator community today!
      </p>


        {isRequested && (
          <p className="mb-4 flex items-center justify-center gap-2 text-yellow-600 font-medium">
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
                ? "btn-disabled bg-gray-300 cursor-not-allowed"
                : "btn-primary"
            }`}
          >
            {isRequested ? "Requested" : "Continue"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default BecomeDecorator;
