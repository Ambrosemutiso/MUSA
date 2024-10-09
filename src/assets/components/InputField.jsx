import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInOut } from './animations';

const InputField = ({ placeHolder, icon1, icon2, type, name, value, onChange }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="relative">
      <motion.div
        {...fadeInOut}
        className={`flex items-center bg-white border ${isFocus ? "border-green-500" : "border-gray-300"} rounded-md shadow-sm w-full px-3 py-2`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      >
        {icon1 && <span className="mr-2 text-gray-500">{icon1}</span>}
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeHolder}
          className='w-full text-lg text-gray-700 outline-none border-none focus:ring-0'
        />
        {icon2 && <span className="ml-2 text-gray-500">{icon2}</span>}
      </motion.div>
    </div>
  );
};

export default InputField;
