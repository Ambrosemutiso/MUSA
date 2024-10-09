import React from 'react';
import { motion } from 'framer-motion';
import { buttonClick, fadeInOut } from './animations';
import { Link } from 'react-router-dom';

const Payment = () => {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Payment Procedure</h2>
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-green-100 shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
                    <p className="ml-0 text-black">1. Open your M-PESA App</p>
        </motion.div>
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-green-100 shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
                    <p className="ml-0 text-black">2. Go to paybill option</p>
        </motion.div>
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-green-100 shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
                    <p className="ml-0 text-black">3. Enter 522522 then click ok</p>
        </motion.div>
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-green-100 shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
                    <p className="ml-0 text-black">4. Enter 1318095522 as the account no</p>
        </motion.div>
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-green-100 shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
                    <p className="ml-0 text-black">5. Enter Amount Ksh.300</p>
        </motion.div>
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-green-100 shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
                    <p className="ml-0 text-black">6. Enter your M-PESA pin then click send</p>
        </motion.div>
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-green-100 shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
                    <p className="ml-0 text-black">7. Copy the transaction code and paste it in the transaction field at the signup page</p>
        </motion.div>
        <motion.button 
          {...buttonClick} {...fadeInOut}
          className="w-full px-4 py-2 mt-4 rounded-md bg-green-700 text-white text-lg font-semibold hover:bg-green-500 transition-all duration-150">
          <Link to='/signup'> Proceed</Link></motion.button>
      </div>
    </div>
  );
};

export default Payment;
