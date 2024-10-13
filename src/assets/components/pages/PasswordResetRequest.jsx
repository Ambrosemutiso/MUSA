import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInOut, buttonClick } from './animations';
import { Envelope } from './icons';

const EmailInput = ({ placeHolder, icon1, icon2, type, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <motion.div
        {...fadeInOut}
        className="flex items-center bg-white shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400"
      >
        {icon1}
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeHolder}
          className="w-full bg-transparent text-gray-800 placeholder-gray-500 font-semibold px-3 outline-none border-none focus:ring-0"
        />
        {icon2}
      </motion.div>
    </div>
  );
};
const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async () => {
    // Email validation
    if (!email.includes('@')) {
      setMessage('Please enter a valid email.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://officialmusamakueni.co.ke/api/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage('Password reset link sent! Please check your email.');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Password Reset</h2>
        
        <EmailInput
          type="email"
          icon1={<img src={Envelope} alt="" className="w-6 h-6" />}
          placeHolder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
        />
        
        <motion.button {...buttonClick} {...fadeInOut}
          className={`w-full text-white py-2 px-4 rounded-md transition-all ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          onClick={handlePasswordReset}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </motion.button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordResetRequest;
