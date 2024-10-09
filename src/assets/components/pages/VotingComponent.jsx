import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { buttonClick } from './animations';

const VotingComponent = () => {
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState('');
  const [votedPositions, setVotedPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [canVote, setCanVote] = useState(false); // To track if voting is allowed
  const [timeUntilVoting, setTimeUntilVoting] = useState('');

  useEffect(() => {
      // Election start and end dates
  const electionStart = new Date('2024-12-13T06:00:00');
  const electionEnd = new Date('2024-12-14T06:00:00');
    const fetchData = async () => {
      try {
        // Fetch user info
        const userResponse = await axios.get('http://localhost:4000/user', {
          headers: { 'auth-token': localStorage.getItem('auth-token') }
        });
        setUserName(userResponse.data.name || 'User');

        // Fetch candidates
        const candidatesResponse = await axios.get('http://localhost:4000/candidates', {
          headers: { 'auth-token': localStorage.getItem('auth-token') }
        });
        setCandidates(candidatesResponse.data);

        // Fetch voted positions
        const votesResponse = await axios.get('http://localhost:4000/votes', {
          headers: { 'auth-token': localStorage.getItem('auth-token') }
        });
        setVotedPositions(votesResponse.data.votedPositions || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    const checkVotingTime = () => {
      const now = new Date();
      const timeUntilStart = electionStart - now;
      const timeUntilEnd = electionEnd - now;

      if (timeUntilEnd <= 0) {
        setCanVote(false);
        setTimeUntilVoting('Voting has ended.');
      } else if (timeUntilStart > 0) {
        setCanVote(false);
        const days = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntilVoting(`Voting starts in ${days} days, ${hours} hours, and ${minutes} minutes.`);
      } else {
        setCanVote(true);
        setTimeUntilVoting('Voting is now open!');
      }
    };

    // Check voting time on component mount
    fetchData();
    checkVotingTime();

    // Set an interval to check the voting time every minute
    const interval = setInterval(checkVotingTime, 60000); // 1 minute interval

      return () => clearInterval(interval); 
}, []);

  const Vote = async (candidateId, position) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/vote', {
        candidateId,
        position,
      }, {
        headers: { 'auth-token': localStorage.getItem('auth-token') }
      });

      const data = response.data;
      if (data.success) {
        alert('Vote cast successfully!');
        setVotedPositions((prev) => [...prev, position]);
      } else {
        alert(data.errors || 'An error occurred while voting.');
      }
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('An error occurred while voting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-12">
      <header className="bg-green-950 text-white py-2 rounded-b-md shadow-md mb-4">
        <h1 className='text-xl font-semibold'>
          {userName ? `Welcome, ${userName}!` : 'Welcome!'}
        </h1>
      </header>

      {loading && <p className='text-blue-800 text-center text-xl'>Loading...</p>}
      {!canVote && <p className='text-red-600 text-center text-xs'>{timeUntilVoting}</p>}

      <main className='flex flex-col items-center'>
        {!loading && candidates.length === 0 && <p className='text-green-950 text-xl'>{message}</p>}
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {candidates.map((candidate) => (
            <div key={candidate._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col items-center">
              <img src={candidate.image} alt={`${candidate.firstName} ${candidate.lastName}`} className='w-24 h-24 object-cover rounded-full mb-3'/>
              <p className='text-xl font-semibold text-gray-800'>NAME: {candidate.firstName} {candidate.lastName}</p>
              <p className='text-gray-600 text-xl'>POSITION: {candidate.position}</p>
              <p className='text-gray-600 text-xl'>UNIVERSITY: {candidate.university}</p>
              <p className='text-gray-600 text-xl'>CHAPTER: {candidate.chapter}</p>
              <motion.button
                {...buttonClick}
                className={`mt-4 px-4 py-2 rounded-md text-white text-xl font-semibold transition-all duration-150 ${
                  votedPositions.includes(candidate.position) || !canVote ? 'bg-red-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                }`}
                onClick={() => Vote(candidate._id, candidate.position)}
                disabled={votedPositions.includes(candidate.position) || !canVote}
              >
                {votedPositions.includes(candidate.position) ? 'Voted' : 'Vote'}
              </motion.button>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-green-950 text-white py-4 rounded-t-md shadow-md mt-4 text-center">
        {message && <p className='text-xs text-white'>{message}</p>}
      </footer>
    </div>
  );
};

export default VotingComponent;
