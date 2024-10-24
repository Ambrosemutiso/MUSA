import React from 'react';
import { Link } from 'react-router-dom';
import Folders from '../Img/Folders.png';
import Add from '../Img/add.png';
import Results from '../Img/results.jpg';

const Sidebar = () => {
  return (
    <div className="sidebar bg-green-700 w-64 p-4 shadow-lg py-11">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link to={'/addcandidate'} className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
          <img src={Add} alt="Add" className="icon w-6 h-6 mr-2" />
          <p className="text-white">Add Candidate</p>
        </Link>
        <Link to={'/approveuser'} className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
          <img src={Add} alt="Approve" className="icon w-6 h-6 mr-2" />
          <p className="text-white">Approve Users</p>
        </Link>
        <Link to={'/listcandidates'} className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
          <img src={Folders} alt="Candidates" className="icon w-6 h-6 mr-2" />
          <p className="text-white">Candidates List</p>
        </Link>
        <Link to={'/results'} className="sidebar-item flex items-center p-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
          <img src={Results} alt="Results" className="icon w-6 h-6 mr-2" />
          <p className="text-white">Results</p>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
