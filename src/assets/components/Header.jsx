import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './pages/Img';

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="h-10 z-20 w-screen bg-white fixed flex items-center justify-between px-4 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={Logo} alt="MUSA Logo" className="h-10 w-10 mr-2" />
        <p className="text-green-700 text-xl font-bold">MUSA</p>
      </div>

      {/* Menu Icon */}
      <button
        className="md:hidden text-green-700 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } absolute md:relative top-14 md:top-0 right-0 w-3/4 md:w-auto bg-white md:bg-transparent flex-col md:flex-row items-center md:flex space-y-4 md:space-y-0 md:space-x-6 shadow-md md:shadow-none`}
      >
        <Link
          to="/"
          className={`font-medium ${
            isActive('/')
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-700 hover:text-green-700'
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`font-medium ${
            isActive('/about')
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-700 hover:text-green-700'
          }`}
        >
          About
        </Link>
        <Link
          to="/services"
          className={`font-medium ${
            isActive('/services')
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-700 hover:text-green-700'
          }`}
        >
          Services
        </Link>
        <Link
          to="/contact"
          className={`font-medium ${
            isActive('/contact')
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-700 hover:text-green-700'
          }`}
        >
          Contact
        </Link>
        <Link
          to="/testimonials"
          className={`font-medium ${
            isActive('/testimonials')
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-700 hover:text-green-700'
          }`}
        >
          Testimonials
        </Link>
        <Link
          to="/terms-and-conditions"
          className={`font-medium ${
            isActive('/terms-and-conditions')
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-700 hover:text-green-700'
          }`}
        >
          Terms of Service
        </Link>
        <Link
          to="/privacy-policy"
          className={`font-medium ${
            isActive('/privacy-policy')
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-700 hover:text-green-700'
          }`}
        >
          Privacy Policy
        </Link>
        <Link
          to="/signup"
          className={`font-medium ${
            isActive('/signup')
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-700 hover:text-green-700'
          }`}
        >
          Join Us
        </Link>

        {/* Social Icons */}
<div className="flex space-x-4 mt-4 md:mt-0">
  <a href="https://www.facebook.com/musamakueni" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
    <i className="fab fa-facebook fa-lg"></i>
  </a>
  <a href="https://www.twitter.com/MUSA_makueni017?t=LTZiDkJ9vfNuSGwZvkLCbg&s=09" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
    <i className="fab fa-twitter fa-lg"></i>
  </a>
  <a href="https://www.instagram.com/makueni_comrades?igshid=OGQ5ZDc2ODk22ZA==" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
    <i className="fab fa-instagram fa-lg"></i>
  </a>
  <a href="https://www.linkedin.com/company/makueni-university-students-association-musa/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
    <i className="fab fa-linkedin fa-lg"></i>
  </a>
  <a href="https://www.youtube.com/@musamakueni?si=PiQbW1kBVm7RZ5QI" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
    <i className="fab fa-youtube fa-lg"></i>
  </a>
</div>

      </nav>
    </header>
  );
};

export default Header;
