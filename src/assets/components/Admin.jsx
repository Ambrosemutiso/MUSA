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
        <Route path='/admin' element={<AdminLoginSignup/>}/>
        <Route path='/admin/approveuser' element={<AdminApproval/>}/>
        <Route path='/admin/addcandidate' element={<AddCandidate/>}/>
        <Route path='/admin/listcandidates' element={<CandidatesList/>}/>
        <Route path='/admin/results' element={<Results/>}/>
      </Routes>        
    </div>
  )
}

export default Admin