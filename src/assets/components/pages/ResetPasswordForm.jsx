import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInOut, buttonClick } from './animations';
import { Lock, Show, Hide } from './icons';

const PasswordResetForm = () => {
  const { token } = useParams(); // Get token from URL parameters
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Handle password reset
  const handlePasswordReset = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    // Validate password strength
    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordValidation.test(password)) {
      setMessage('Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      // Make API request to reset password
      const response = await fetch(`https://api.officialmusamakueni.co.ke/password/${token}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password has been reset successfully!');
        setTimeout(() => {
          window.location.replace('/'); // Redirect to homepage after success
        }, 2000);
      } else {
        setMessage(data.error || 'An unexpected error occurred.');
        console.error('Error Response:', data);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Network Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>

        {/* New Password Input */}
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-white shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
          <img src={Lock} alt="Lock Icon" className="w-6 h-6" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 font-semibold px-3 outline-none border-none focus:ring-0"
          />
          <img
            src={showPassword ? Hide : Show}
            alt={showPassword ? "Hide Password" : "Show Password"}
            className="w-6 h-6 cursor-pointer"
            onClick={togglePassword}
          />
        </motion.div>

        {/* Confirm New Password Input */}
        <motion.div
          {...fadeInOut}
          className="flex items-center bg-white shadow-lg rounded-md w-full px-4 py-2 transition-all duration-300 border border-gray-300 focus-within:border-green-400 mb-4"
        >
          <img src={Lock} alt="Lock Icon" className="w-6 h-6" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 font-semibold px-3 outline-none border-none focus:ring-0"
          />
          <img
            src={showConfirmPassword ? Hide : Show}
            alt={showConfirmPassword ? "Hide Password" : "Show Password"}
            className="w-6 h-6 cursor-pointer"
            onClick={toggleConfirmPassword}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          {...buttonClick}
          whileTap={{ scale: 0.95 }}
          className={`w-full text-white py-2 px-4 rounded-md transition-all ${
            isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={isLoading}
          onClick={handlePasswordReset}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </motion.button>

        {/* Error or Success Message */}
        {message && <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default PasswordResetForm;
