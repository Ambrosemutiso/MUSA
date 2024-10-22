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

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Start with null to show loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      setIsLoggedIn(true); // Admin is logged in
    } else {
      setIsLoggedIn(false); // Admin is not logged in
    }
  }, [navigate]);

  const handleLogin = (token) => {
    localStorage.setItem('admin-token', token);
    setIsLoggedIn(true);
    navigate('/results'); // Redirect to the results page after login
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Loading state while checking login
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
            {/* Redirect all other routes to login if not logged in */}
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
                {/* If admin is logged in, redirect login path to the results page */}
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
