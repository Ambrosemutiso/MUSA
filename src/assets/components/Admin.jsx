import React from 'react';
import './CSS/admin.css';
import Sidebar from './Sidebar';
import AddCandidate from './AddCandidate';
import CandidatesList from './CandidatesList';
import Results from './Results';
import AdminApproval from './AdminApproval';
import AdminLoginSignup from './AdminLoginSignup';
import { Routes, Route } from 'react-router-dom';

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
        <Route path='/' element={<AdminLoginSignup/>}/>
        <Route path='/approveuser' element={<AdminApproval/>}/>
        <Route path='/addcandidate' element={<AddCandidate/>}/>
        <Route path='/listcandidates' element={<CandidatesList/>}/>
        <Route path='/results' element={<Results/>}/>
      </Routes>        
    </div>
  )
}

export default Admin