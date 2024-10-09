import React, { useState } from 'react'
import './loginsignup.css'
import { motion } from 'framer-motion'
import { buttonClick } from './animations';
import LoginInput from './LoginInput';
import { Call, Closed, Envelope, Home, ID, Location, Lock, Open, Person } from './icons';
import { Logo } from '../../Img';
import {Link} from 'react-router-dom'


const LoginSignup = () => {
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:"",
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const signup = async () =>{
    console.log("Signup Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/login");
    }
    else{
      alert(responseData.errors)
    }
  }





  document.addEventListener('DOMContentLoaded',function() {
  const passwordInput = document.getElementById('#password');
  const togglePassword = document.getElementById('#toggle-password');

  if (!togglePassword) {
    console.error('togglePassword element not found')
  }
  let showPassword = false;

  togglePassword.addEventListener('click',function(){
    showPassword = !showPassword;
    if (showPassword) {
      passwordInput.type = 'text';
      togglePassword.src = {Open};
    } else {
      passwordInput.type = 'password';
      togglePassword.src = {Closed};
    }
  });
});

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <div className="flex items-center justify-between gap-16">
        <div className="w-28 h-[2px] rounded bg-green-400"></div>
        <img src={Logo} alt="" className="w-40 h-40" />
        <div className="w-28 h-[2px] rounded bg-green-400"></div>
        </div>
        <div className="w-full flex-col items-center justify-center gap-6 px-4 md:px-12 py-1 text-green-200 text-x">
          <LoginInput name='username' value={formData.username} onChange={changeHandler} type='text'icon1={<img src={Person} alt="" className="w-6 h-6 text-white" />} placeHolder={"Your Name"}/>
          <LoginInput name='email' value={formData.email} onChange={changeHandler} type='email'icon1={<img src={Envelope} alt="" className="w-6 h-6 text-white" />} placeHolder={'Email Adress'}/>
          <LoginInput name='password' value={formData.password} onChange={changeHandler} type='password'icon1={<img src={Lock} alt="" className="w-6 h-6 text-white" />} placeHolder={'password'}icon2={<img src={Open} alt="Show Password" id='toggle-password' className="w-6 h-6 text-white"/>}/>

        </div>

        <p className='loginsignup-login'>Already have an account?<Link to='/login' className='text-green-400 underline cursor-pointer bg-transparent'>login here</Link></p>
        <div className="loginsignup-agree">
        <input type='checkbox' name='check' id='right'/>
          <p>by continuing, i agree to the terms and conditions of this Association</p>
        </div>
        <motion.button {...buttonClick} className="w-full px-4 py-2 rounded-md bg-green-400 cursor-pointer text-white text-xl capitalize hover:bg-green-500 transition-all duration-150" onClick={signup}>Submit</motion.button>
      </div>
    </div>

  )
}

export default LoginSignup;