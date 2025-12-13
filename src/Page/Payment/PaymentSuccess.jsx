import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate, useSearchParams } from 'react-router';
import axios from 'axios';

const PaymentSuccess = () => {
  const navigate = useNavigate();
   const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_Server_localhost}/payment-success`, {
        sessionId,
      })
    }
  }, [sessionId])

  return (
    <div className=" max-w-[1150px] h-full mx-auto flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-4 ">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center"
      >
        <CheckCircleIcon className="w-24 h-24 mx-auto text-green-500 mb-6 animate-bounce" />

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your booking. Your payment has been processed successfully.
        </p>

        <button
          onClick={() => navigate('/service')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Go Back to Services
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
