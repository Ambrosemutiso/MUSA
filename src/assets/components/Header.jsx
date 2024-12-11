import React from 'react';
import Logo from '../Img/Musalogo.png';
import Profile from '../Img/profile.jpg';

const Header = () => {
  return (
    <header className="fixed top-0 h-10 left-0 w-full bg-white shadow-md px-6 flex items-center justify-between z-50">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-10 w-10 rounded-full mr-3" />
        </div>
      <div className="flex space-x-4 mr-5">
      <img src={Profile} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
      </div>
    </header>
  );
};

export default Header;
