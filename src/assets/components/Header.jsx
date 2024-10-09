import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Logo from '../Img/Musalogo.png';
import Profile from '../Img/profile.jpg';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md py-2 px-6 flex items-center justify-between z-50">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-10 w-10 rounded-full mr-3" />
        <div className="flex flex-col">
          <p className="text-lg font-bold text-green-600">MUSA</p>
          <p className="text-sm text-green-500">ELECTORAL COMMISSION BOARD</p>
        </div>
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
      <img src={Profile} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
      </div>
    </header>
  );
};

export default Header;
