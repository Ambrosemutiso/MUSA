import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AddCandidate from './AddCandidate';
import CandidatesList from './CandidatesList';
import Results from './Results';
import AdminApproval from './AdminApproval';
import AdminLoginSignup from './AdminLoginSignup';
import Header from './Header';
import Footer from './Footer';
import Members from './Members';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
  }, [navigate]);

  const handleLogin = (token) => {
    localStorage.setItem('admin-token', token);
    setIsLoggedIn(true);
    navigate('/results'); 
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        {!isLoggedIn ? (
          <Routes>
            <Route
              path="/adminlogin"
              element={<AdminLoginSignup onLogin={handleLogin} />}
            />
            <Route path="*" element={<AdminLoginSignup onLogin={handleLogin} />} />
          </Routes>
        ) : (
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/approveuser" element={<AdminApproval />} />
                <Route path="/addcandidate" element={<AddCandidate />} />
                <Route path="/listcandidates" element={<CandidatesList />} />
                <Route path="/results" element={<Results />} />
                <Route path="/Chapterstatistics" element={<Members/>} />
                <Route path="/adminlogin" element={<Results />} />
                <Route path="*" element={<Results />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
