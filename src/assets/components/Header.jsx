import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './header.css';
import { Logo } from './pages/Img';

const Header = () => {
  return (
    <header className="h-11 z-20 w-screen bg-white fixed flex items-center justify-between px-4 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={Logo} alt="MUSA Logo" className="h-10 w-10 mr-2" />
        <p className="text-green-700 text-xl text-bold">MUSA</p>
      </div>

      {/* Social Media Icons Section */}
      <div className="flex space-x-4 mr-5">
        <a href="https://www.facebook.com/musamakueni" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </a>
        <a href="https://www.twitter.com/MUSA_makueni017?t=LTZiDkJ9vfNuSGwZvkLCbg&s=09" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
        <a href="https://www.instagram.com/makueni_comrades?igshid=OGQ5ZDc2ODk22ZA==" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
        <a href="https://www.linkedin.com/company/makueni-university-students-association-musa/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a href="https://api.whatsapp.com/send?phone=+254790440234&text=Hello%20there.%20directed%20from%20MUSA%20website" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faWhatsapp} size="lg" />
        </a>
        <a href="https://www.youtube.com/@musamakueni?si=PiQbW1kBVm7RZ5QI" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faYoutube} size="lg" />
        </a>
      </div>
    </header>
  );
};

export default Header;
