import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { fadeInOut } from '../pages/animations';

const LoginInput = ({placeHolder, icon1, icon2, type, name, value, onChange}) => {
  const [isFocus] = useState(false);
  return <div className="py-1">
  <motion.div 
  {...fadeInOut}
  className={`flex items-center justify-center bg-green-400 backdrop-blur-md rounded-md w-full px-4 py-1
     ${isFocus ? "shadow-md shadow-green-200" : "shadow-none"}`
   } >
      {icon1}
      <input name={name} value={value} onChange={onChange} type={type} placeholder={placeHolder} className='w-full h-full bg-blue-100  text-xl text-blue-950 fontsize-1px font-semibold outline-1px border-none'
      />
      {icon2}
    </motion.div>
    </div>
}

export default LoginInput