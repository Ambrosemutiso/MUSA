import React, { useState } from 'react';
import AdminLoginSignup from './assets/components/AdminLoginSignup';
import Admin from './assets/components/Admin';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    // Save the token in local storage and update login state
    localStorage.setItem('admin-token', token);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <AdminLoginSignup onLogin={handleLogin} />
      ) : (
        <div>
          <Admin/>
        </div>
      )}
    </div>
  );
};

export default App;
