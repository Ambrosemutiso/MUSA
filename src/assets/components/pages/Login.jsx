import React, { useState } from 'react';
import { BG } from './Img';
import { Envelope, Google, Lock, Hide, Show } from '../pages/icons';
import { motion } from 'framer-motion';
import { buttonClick, fadeInOut } from '../pages/animations';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../pages/config/firebase.config';
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

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            console.log(token);
          });
        }
      });
    });
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log('Login Function Executed', formData);
    let responseData;
    
    await fetch('https://api.officialmusamakueni.co.ke/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => (responseData = data));

    if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/candidates');
    } else {
        alert(responseData.errors); 
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex py-10">
      <img src={BG} alt="" className="w-full h-full object-cover absolute left-0 right-0 backdrop-blur-md"/>
      <div className="mt-5 flex flex-col items-center w-full max-w-lg mx-auto h-full bg-lightOverlay z-10 backdrop-blur-md p-4 py-12 gap-6 sm:w-11/12">
        <p className="text-3xl font-semibold text-white">Welcome Back</p>
        <p className="text-xl text-white -mt-4">Login Here</p>
        <div className="flex items-center justify-center">
          <div className="w-24 h-[1px] rounded bg-white"></div>
          <div className="w-24 h-[1px] rounded bg-white"></div>
        </div>
        <div className="w-full max-w-md flex-col items-center gap-6 px-4 md:px-12 py-2 text-white">
          <LoginInput
            name="email"
            value={formData.email}
            placeHolder={'Email'}
            icon1={<img src={Envelope} alt="" className="w-6 h-6" />}
            onChange={changeHandler}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
          />
          <LoginInput
            name="password"
            value={formData.password}
            placeHolder={'Password'}
            icon1={<img src={Lock} alt="" className="w-6 h-6" />}
            onChange={changeHandler}
            inputState={password}
            inputStateFunc={setPassword}
            type={showPassword ? 'text' : 'password'}
            icon2={
              <img
                src={showPassword ? Show : Hide}
                alt={showPassword ? "Hide Password" : "Show Password"}
                className="w-6 h-6 cursor-pointer"
                onClick={togglePassword} />}
          />
          <div className="flex justify-end py-2 w-full">
            <Link 
              to='/reset'
              className="text-white underline hover:text-green-400 transition"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-end py-2 w-full">
          Doesnt have an account?
            <Link 
              to='/signup'
              className="text-white underline hover:text-green-400 transition"
            >
              Signup here
            </Link>
          </div>
          <motion.button
            {...buttonClick}
            onClick={login}
            className="w-full px-4 py-2 rounded-md bg-green-400 cursor-pointer text-white text-lg capitalize hover:bg-green-500 transition-all duration-150"
          >
            Login
          </motion.button>
        </div>
        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center w-full px-4 py-2 bg-white cursor-pointer rounded-xl gap-4 max-w-sm"
          onClick={loginWithGoogle}
        >
          <img src={Google} alt="" className="w-6 h-6" />
          <p className="text-black">Sign In with Google</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
