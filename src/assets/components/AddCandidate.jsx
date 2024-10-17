import React, { useState } from 'react';
import Upload from '../Img/cloud.jpg';
import { buttonClick, fadeInOut } from './animations';
import { motion } from 'framer-motion';

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


const AddCandidate = () => {
  const [image, setImage] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState({
    firstName: "",
    lastName: "",
    university: "",
    chapter: "",
    position: "",
    image: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setCandidateDetails({ ...candidateDetails, [e.target.name]: e.target.value });
  };

  const Add_Candidate = async () => {
    console.log(candidateDetails);
    let responseData;
    let candidate = candidateDetails;

    let formData = new FormData();
    formData.append('candidate', image);
    await fetch('https://api.officialmusamakueni.co.ke/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',        
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData.success) {
      candidate.image = responseData.image_url;
      console.log(candidate);
      await fetch('https://api.officialmusamakueni.co.ke/addcandidate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Candidate Added") : alert("Failed");
      });
    }
  };

  return (
    <div className="mt-11 bg-gray-100 w-full min-h-screen flex justify-center items-center px-4 py-7">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-20 md:w-28 h-[2px] rounded bg-green-400"></div>
          <p className="text-green-700 text-xl md:text-2xl font-semibold text-center">Add Candidate</p>
          <div className="w-20 md:w-28 h-[2px] rounded bg-green-400"></div>
        </div>
        <div className="flex flex-col gap-6">
          <InputField value={candidateDetails.firstName} onChange={changeHandler} type='text' name='firstName' placeHolder='First Name' />
          <InputField value={candidateDetails.lastName} onChange={changeHandler} type='text' name='lastName' placeHolder='Last Name' />
          <InputField value={candidateDetails.university} onChange={changeHandler} type='text' name='university' placeHolder='University/College' />
          <InputField value={candidateDetails.chapter} onChange={changeHandler} type='text' name='chapter' placeHolder='Chapter' />
          
          <div className="w-full">
            <label className="block text-gray-700 font-medium">Position</label>
            <select value={candidateDetails.position} onChange={changeHandler} name='position' className='mt-2 block w-full bg-green-100 border border-gray-300 rounded-md px-3 py-2'>
              <option value='' disabled>Select a Position</option>
              <option value='ChairPerson'>Chairperson</option>
              <option value='vice chairperson'>Vice Chairperson</option>
              <option value='Sec Gen'>Secretary General</option>
              <option value='Vice Sec Gen'>Vice Secretary General</option>
              <option value='Treasurer'>Treasurer</option>
              <option value='Project Coordinator'>Project Coordinator</option>
              <option value='College Rep'>College Representative</option>
              <option value='Pwd'>PWD</option>
            </select>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 font-medium mb-2">Upload Image</p>
            <div className="flex justify-center">
              <label htmlFor='file-input' className="cursor-pointer">
                <img src={image ? URL.createObjectURL(image) : Upload} alt="" className="w-24 h-24 object-cover rounded-full border border-gray-300 shadow-sm" />
              </label>
              <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
          </div>

          <motion.button
            {...buttonClick}
            onClick={Add_Candidate}
            className='mt-6 w-full px-4 py-3 rounded-md bg-green-500 text-white text-lg font-semibold hover:bg-green-600 transition-all duration-150'>
            Submit
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
