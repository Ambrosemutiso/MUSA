import React, { useState } from 'react';
import axios from 'axios';

const AdminLoginSignup = ({ onLogin }) => {
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); 

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.officialmusamakueni.co.ke/adminsignup', {
        name: adminName,
        email,
        password,
      });
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('admin-token', token);

      // Call the onLogin callback to set login state
      onLogin(token);
    } catch (error) {
      const errorMsg = error.response?.data?.errors || error.message;
      setError('Signup failed: ' + errorMsg);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.officialmusamakueni.co.ke/adminlogin', {
        email,
        password,
      });
      const { token } = response.data;

      localStorage.setItem('admin-token', token);

      onLogin(token);
    } catch (error) {
      const errorMsg = error.response?.data?.errors || error.message;
      setError('Login failed: ' + errorMsg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={isLoginMode ? handleLogin : handleSignup}
      >
        <h2 className="text-2xl font-bold mb-6">{isLoginMode ? 'Admin Login' : 'Admin Signup'}</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {!isLoginMode && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminName">
              Admin Name
            </label>
            <input
              type="text"
              id="adminName"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required={!isLoginMode} 
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoginMode ? 'Login' : 'Signup'}
          </button>
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-500 hover:text-blue-800 font-bold"
          >
            {isLoginMode ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginSignup;
