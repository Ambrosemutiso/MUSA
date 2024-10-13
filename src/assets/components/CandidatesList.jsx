import React, { useEffect, useState } from 'react';
import './CSS/listcandidates.css';
import Remove from '../Img/Trash.png';


const CandidatesList = () => {
  const [Candidates, setCandidates] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch('https://api.officialmusamakueni.co.ke/allcandidates');
    const data = await response.json();
    setCandidates(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeCandidate = async (id) => {
    await fetch('https://api.officialmusamakueni.co.ke/removecandidate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    fetchInfo();
  };

  return (
    <div className='listcandidates bg-green-700'>
      <div className="flex justify-between items-center py-7 px-11">
      <div className="w-28 h-[2px] rounded bg-white"></div>
        <p className="text-white ml-11 mr-11 text-xl capitalize">All Candidates</p>
        <div className="w-28 h-[2px] rounded bg-white"></div>
        </div>
      <div className="listcandidates-format-main text-green-950">
        <p className='text-white'>Candidate</p>
        <p className='text-white'>First Name</p>
        <p className='text-white'>Last Name</p>
        <p className='text-white'>University</p>
        <p className='text-white'>Chapter</p>
        <p className='text-white'>Position</p>
        <p className='text-white'>Remove</p>
      </div>
      <div className="listcandidates-allcandidates bg-white">
        {Candidates.map((candidate) => (
          <div key={candidate._id} className="listcandidates-format-main listcandidates-format bg-white">
            <img src={candidate.image} alt={candidate.firstName} className="listcandidates-candidate-icon" />
            <p className="text-xs text-green-950 px-7 py-5">{candidate.firstName}</p>
            <p className="text-xs text-green-950 px-7 py-5">{candidate.lastName}</p>
            <p className="text-xs text-green-950 px-7 py-5">{candidate.university}</p>
            <p className="text-xs text-green-950 px-7 py-5">{candidate.chapter}</p>
            <p className="text-xs text-green-950 px-7 py-5">{candidate.position}</p>
            <img
              onClick={() => removeCandidate(candidate.id)}
              src={Remove}
              alt="Remove"
              className="listcandidates-remove-icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;
