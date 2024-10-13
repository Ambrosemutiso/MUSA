import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://api.officialmusamakueni.co.ke/results', {
          headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    fetchResults();
  }, []);

  const createPieChart = (chapter, position, data) => {
    const chartData = {
      labels: data.map(candidate => candidate.name),
      datasets: [{
        label: `${position} Results`,
        data: data.map(candidate => candidate.votes),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#9966f'],
        hoverOffset: 4,
      }],
    };

    return (
      <div
        key={`${chapter}-${position}`}
        className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-md w-full"
      >
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">{position} - {chapter} Results</h2>
        <div className="flex justify-center">
          <Pie data={chartData} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-11">
      {loading ? (
        <p className="text-center text-gray-600">Loading results...</p>
      ) : (
        results.map(chapterResult => (
          <div key={chapterResult._id} className="mb-12">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">{chapterResult._id} Chapter Results</h1>
            <div className="flex flex-wrap justify-center">
              {chapterResult.positions.map(positionData =>
                createPieChart(chapterResult._id, positionData.position, positionData.candidates)
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Results;
