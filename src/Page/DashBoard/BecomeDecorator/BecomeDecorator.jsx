import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const BecomeDecorator = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Become a Decorator
        </h2>

        <p className="text-gray-600 mb-6">
          You are about to apply as a decorator. Continue or close this window.
        </p>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // future: API call / request
              navigate("/dashboard");
            }}
            className="btn btn-primary btn-sm"
          >
            Continue
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
