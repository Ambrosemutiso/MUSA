import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonClick } from './animations'; // Removed unused fadeInOut
import { Envelope, Lock, Person, Show, Hide } from '../icons'; // icons for input fields

const AdminLoginSignup = () => {
  const [isSignup, setIsSignup] = useState(true); // to toggle between signup and login

  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isSignup) {
      const { password, confirmPassword } = formData;
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const signup = async () => {
        console.log('Signup Function Executed', formData);
        let responseData;
        await fetch('https://api.officialmusamakueni.co.ke/adminsignup', {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => (responseData = data));

        if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace('/adminsignup');
        } else {
          alert(responseData.errors);
        }
      };

      signup(); // Call the signup function
    } else {
      const login = async () => {
        console.log('Login Function Executed', formData);
        let responseData;
        await fetch('https://api.officialmusamakueni.co.ke/adminlogin', {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => (responseData = data));

        if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace('/results');
        } else {
          alert(responseData.errors);
        }
      };

      login(); // Call the login function
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center w-full min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between gap-16 mt-0">
          <div className="w-28 h-[2px] rounded bg-green-400"></div>
          <p className="text-2xl font-semibold text-center mb-6">
            {isSignup ? 'Admin Signup' : 'Admin Login'}
          </p>
          <div className="w-28 h-[2px] rounded bg-green-400"></div>
        </div>

        <div className="w-full flex-col items-center justify-center gap-6 px-4 md:px-12 py-0.5 text-green-400 text-x">
          {/* If signup, show admin name field */}
          {isSignup && (
            <LoginInput
              name="adminName"
              value={formData.adminName}
              onChange={changeHandler}
              type="text"
              icon1={<img src={Person} alt="Admin" className="w-6 h-6" />}
              placeHolder="Admin Name"
            />
          )}

          {/* Email field */}
          <LoginInput
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            icon1={<img src={Envelope} alt="Email" className="w-6 h-6" />}
            placeHolder="Email"
          />

          {/* Password field */}
          <LoginInput
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type={showPassword ? 'text' : 'password'}
            icon1={<img src={Lock} alt="Password" className="w-6 h-6" />}
            placeHolder="Password"
            icon2={
              <img
                src={showPassword ? Show : Hide}
                alt={showPassword ? 'Hide Password' : 'Show Password'}
                className="w-6 h-6 cursor-pointer"
                onClick={togglePassword}
              />
            }
          />

          {/* If signup, show confirm password field */}
          {isSignup && (
            <LoginInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              type={showConfirmPassword ? 'text' : 'password'}
              icon1={<img src={Lock} alt="Confirm Password" className="w-6 h-6" />}
              placeHolder="Confirm Password"
              icon2={
                <img
                  src={showConfirmPassword ? Show : Hide}
                  alt={showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
                  className="w-6 h-6 cursor-pointer"
                  onClick={toggleConfirmPassword}
                />
              }
            />
          )}
        </div>

        {/* Submit button */}
        <motion.button
          {...buttonClick}
          className="w-full px-4 py-2 mt-4 rounded-md bg-green-400 text-white text-lg font-semibold hover:bg-green-500 transition-all duration-150"
          onClick={handleSubmit}
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </motion.button>

        {/* Toggle between login and signup */}
        <div className="mt-4 text-center">
          {isSignup ? (
            <p>
              Already have an account?{' '}
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => setIsSignup(false)}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => setIsSignup(true)}
              >
                Sign up here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable input component
const LoginInput = ({ name, value, onChange, type, icon1, placeHolder, icon2 }) => (
  <div className="relative flex items-center mb-4">
    {icon1 && <div className="absolute left-3">{icon1}</div>}
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeHolder}
      className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
    />
    {icon2 && <div className="absolute right-3">{icon2}</div>}
  </div>
);

export default AdminLoginSignup;
