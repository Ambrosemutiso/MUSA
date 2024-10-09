import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInOut, buttonClick } from './animations';
import { Call, Envelope, Home, ID, Location, Lock, Show, Hide, Mpesa, Person } from './icons'; // EyeOpen for show password, EyeClosed for hide password
import { Link } from 'react-router-dom';

const LoginInput = ({ placeHolder, icon1, icon2, type, name, value, onChange }) => {
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

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    chapter: '',
    university: '',
    admNumber: '',
    transaction: '',
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

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const signup = async () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.username || !formData.email || !formData.transaction) {
      alert('Please fill out all required fields');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.');
      return;
    }

    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between gap-16 mt-0">
          <div className="w-28 h-[2px] rounded bg-green-400"></div>
          <p className="flex text-2xl font-semibold text-center mb-6">SignUp</p>
          <div className="w-28 h-[2px] rounded bg-green-400"></div>
        </div>

        <div className="w-full flex-col items-center justify-center gap-6 px-4 md:px-12 py-0.5 text-green-400 text-x">
          <LoginInput name='username' value={formData.username} onChange={changeHandler} type='text' icon1={<img src={Person} alt="" className="w-6 h-6" />} placeHolder="Your Full Names" />
          <LoginInput name='email' value={formData.email} onChange={changeHandler} type='email' icon1={<img src={Envelope} alt="" className="w-6 h-6" />} placeHolder="Your Email" />
          <LoginInput name='phoneNumber' value={formData.phoneNumber} onChange={changeHandler} type='tel' icon1={<img src={Call} alt="" className="w-6 h-6" />} placeHolder="Phone Number" />
          <LoginInput name='idNumber' value={formData.idNumber} onChange={changeHandler} type='number' icon1={<img src={ID} alt="" className="w-6 h-6" />} placeHolder="ID Number" />
          <LoginInput name='chapter' value={formData.chapter} onChange={changeHandler} type='text' icon1={<img src={Location} alt="" className="w-6 h-6" />} placeHolder="Chapter" />
          <LoginInput name='university' value={formData.university} onChange={changeHandler} type='text' icon1={<img src={Home} alt="" className="w-6 h-6" />} placeHolder="University/College" />
          <LoginInput name='admNumber' value={formData.admNumber} onChange={changeHandler} type='String' icon1={<img src={ID} alt="" className="w-6 h-6" />} placeHolder="Admission Number" />
          <LoginInput name='transaction' value={formData.transaction} onChange={changeHandler} type='String' icon1={<img src={Mpesa} alt="" className="w-6 h-6" />} placeHolder="M-Pesa Transaction Code" /> {/* Transaction code input */}

          <LoginInput
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type={showPassword ? 'text' : 'password'}
            icon1={<img src={Lock} alt="" className="w-6 h-6" />}
            placeHolder="Password"
            icon2={
              <img
                src={showPassword ? Show : Hide}
                alt={showPassword ? "Hide Password" : "Show Password"}
                className="w-6 h-6 cursor-pointer"
                onClick={togglePassword}
              />
            }
          />

          <LoginInput
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={changeHandler}
            type={showConfirmPassword ? 'text' : 'password'}
            icon1={<img src={Lock} alt="" className="w-6 h-6" />}
            placeHolder="Confirm Password"
            icon2={
              <img
                src={showConfirmPassword ? Show : Hide}
                alt={showConfirmPassword ? "Hide Confirm Password" : "Show Confirm Password"}
                className="w-6 h-6 cursor-pointer"
                onClick={toggleConfirmPassword}
              />
            }
          />
        </div>

        <p className="ml-11">Already have an account? <Link {...fadeInOut} to="/" className="text-green-400 underline">login here</Link></p>
        <p className="ml-11">Not yet paid registration fee? <Link {...fadeInOut} to="/pay-registration-fee" className="text-green-400 underline">click here</Link></p>

        <div className="flex items-center gap-2 mt-4">
          <input type="checkbox" name="check" id="right" required />
          <p>I agree to the terms and conditions of this Association</p>
        </div>

        <motion.button
          {...buttonClick}
          className="w-full px-4 py-2 mt-4 rounded-md bg-green-400 text-white text-lg font-semibold hover:bg-green-500 transition-all duration-150"
          onClick={signup}
        >
          SignUp
        </motion.button>
      </div>
    </div>
  );
};

export default LoginSignup;
