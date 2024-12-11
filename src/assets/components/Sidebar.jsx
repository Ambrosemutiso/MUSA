import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserAddIcon, 
  ViewListIcon, 
  ClipboardListIcon, 
  ChartBarIcon, 
  UsersIcon 
} from '@heroicons/react/outline';

const Sidebar = () => {
  return (
    <div className="sidebar bg-green-700 w-64 p-4 shadow-lg py-11">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to={'/addcandidate'}
          className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <UserAddIcon className="icon w-6 h-6 mr-2 text-white" />
          <p className="text-white">Add Candidate</p>
        </Link>
        <Link
          to={'/approveuser'}
          className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <ViewListIcon className="icon w-6 h-6 mr-2 text-white" />
          <p className="text-white">Approve User</p>
        </Link>
        <Link
          to={'/listcandidates'}
          className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <ClipboardListIcon className="icon w-6 h-6 mr-2 text-white" />
          <p className="text-white">Candidates</p>
        </Link>
        <Link
          to={'/results'}
          className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <ChartBarIcon className="icon w-6 h-6 mr-2 text-white" />
          <p className="text-white">Results</p>
        </Link>
        <Link
          to={'/chapterstatistics'}
          className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <UsersIcon className="icon w-6 h-6 mr-2 text-white" />
          <p className="text-white">Statistics</p>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
