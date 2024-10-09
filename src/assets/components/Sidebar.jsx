import React from 'react';
import './CSS/sidebar.css';
import { Link } from 'react-router-dom';
import Folders from '../Img/Folders.png';
import Add from '../Img/add.png';
import Results from '../Img/results.jpg';

const Sidebar = () => {
  return (
    <div className='sidebar bg-green-700'>
      <Link to={'/addcandidate'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={Add} alt="" className="icon"/>
        <p>Add</p>
      </div>
      </Link>
      <Link to={'/approveuser'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={Add} alt="" className="icon"/>
        <p>Approve</p>
      </div>
      </Link>
      <Link to={'/listcandidates'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={Folders} alt="" className="icon"/>
        <p>Candidates</p>
      </div>
      </Link> 
      <Link to={'/results'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={Results} alt="" className="icon" />
        <p>Results</p>
      </div>
      </Link>               
    </div>
  )
}

export default Sidebar;