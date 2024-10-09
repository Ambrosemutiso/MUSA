import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { buttonClick } from './animations';

const VotingComponent = ({ user }) => {
  const [chapter, setChapter] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState('');
  const [votedPositions, setVotedPositions] = useState([]);

  const handleChapterChange = (event) => {
    setChapter(event.target.value);
  };

  useEffect(() => {
    if (chapter) {
      axios.get(`http://localhost:4000/candidates?chapter=${chapter}`)
        .then((response) => {
          setCandidates(response.data);
          if (response.data.length === 0) {
            setMessage(`No candidates found for the ${chapter} chapter.`);
          }
        })
        .catch((error) => {
          console.error('Error fetching candidates:', error);
          setMessage('Error fetching candidates.');
        });
    }
  }, [chapter]);

  const Vote = async (candidate, position) => {
    try {
        const response = await fetch("http://localhost:4000/vote", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user, // Ensure userId is a number
                candidate, // Ensure candidateId is a number
                position, // Ensure position is passed correctly
                chapter,
            }),
        });

        const data = await response.json();
        if (data.success) {
            alert("Vote cast successfully!");
            setVotedPositions((prev) => [...prev, position]);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error casting vote:', error);
        alert('An error occurred while voting. Please try again.');
    }
};


  return (
    <div className="py-11 items-center">
      <div className="w-full h-10 bg-blue-950 items-center justify-center">
        <select value={chapter} onChange={handleChapterChange} className='bg-blue-500 text-white'>
          <option value="" className='bg-blue-500 text-white'>Select Chapter</option>
          <option value="kaiti" className='bg-blue-500 text-white'>Kaiti</option>
          <option value="Mbooni" className='bg-blue-500 text-white'>Mbooni</option>
          <option value="Kibwezi East" className='bg-blue-500 text-white'>Kibwezi E</option>
          <option value="Kbwezi West" className='bg-blue-500 text-white'>Kibwezi W</option>
          <option value="Makueni" className='bg-blue-500 text-white'>Makueni</option>
          <option value="Kilome" className='bg-blue-500 text-white'>Kilome</option>
        </select>
      </div>
      <div className='flex ml-11 mt-11'>
        {candidates.map((candidate) => (
          <div key={candidate.id} className="">
            <div className="px-2 rounded-md bg-green-950 py-4">
              <p className='text-white'>NAME: {candidate.firstName} {candidate.lastName}</p>
              <p className='text-white'>POSITION: {candidate.position}</p>
              <p className='text-white'>UNIVERSITY: {candidate.university}</p>
              <p className='text-white'>CHAPTER: {candidate.chapter}</p>
              <img src={candidate.image} alt={`${candidate.firstName} ${candidate.lastName}`} className='w-20 h-20'/>
              <motion.button
                {...buttonClick}
                className={`w-full px-4 py-2 rounded-md ${votedPositions.includes(candidate.position) ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-400 cursor-pointer'} text-white text-xl capitalize hover:bg-green-500 transition-all duration-150`}
                onClick={() => Vote(candidate.id, candidate.position)}
                disabled={votedPositions.includes(candidate.position)}
              >
                {votedPositions.includes(candidate.position) ? 'Voted' : 'Vote'}
              </motion.button>
            </div>
          </div>
        ))}
      </div>
      {message && <p className='text-blue-950'>{message}</p>}
    </div>
  );
};

export default VotingComponent;
