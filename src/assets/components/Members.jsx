import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { UsersIcon } from '@heroicons/react/outline'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const Members = () => {
  const [chapterData, setChapterData] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.officialmusamakueni.co.ke/chapters', {
          headers: { 'auth-token': localStorage.getItem('auth-token') },
        });

        const data = response.data;
        const total = data.reduce((sum, chapter) => sum + chapter.memberCount, 0);

        setChapterData(data);
        setTotalMembers(total);
      } catch (error) {
        console.error('Error fetching chapter data:', error);
        setErrorMessage('Failed to load chapter data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4 text-blue-600">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-center py-4 text-red-600">{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Chapter Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {chapterData.map((chapter) => {
          const percentage = ((chapter.memberCount / totalMembers) * 100).toFixed(2);

          // Pie chart data
          const chartData = {
            labels: [`${chapter.name} Members`, 'Other Chapters'],
            datasets: [
              {
                data: [chapter.memberCount, totalMembers - chapter.memberCount],
                backgroundColor: ['#10B981', '#E5E7EB'], // Green and Gray
                borderWidth: 1,
              },
            ],
          };

          return (
            <div
              key={chapter.name}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              {/* Icon */}
              <UsersIcon className="w-12 h-12 text-green-500 mb-4" />

              {/* Chapter Info */}
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{chapter.name}</h2>
              <p className="text-gray-600">
                Members: <span className="font-bold">{chapter.memberCount}</span>
              </p>
              <p className="text-gray-600">
                Percentage: <span className="font-bold">{percentage}%</span>
              </p>

              {/* Percentage Bar */}
              <div className="w-full bg-gray-200 h-4 rounded-full mt-4">
                <div
                  className="bg-green-600 h-4 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Pie Chart */}
              <div className="mt-6 w-32 h-32">
                <Pie data={chartData} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Members;
