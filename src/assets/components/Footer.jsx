import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Logo from '../Img/Musalogo.png';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="max:w-full bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <img src={Logo} alt="Logo" className="w-11 h-11 rounded-full" />
          </div>
          <div className="w-full md:w-2/4 mb-6 md:mb-0">
            <ul className="flex flex-wrap justify-center space-x-8">
              <li><Link to='/' className="hover:text-gray-400">Home</Link></li>
              <li><Link to='/' className="hover:text-gray-400">About</Link></li>
              <li><Link to='/' className="hover:text-gray-400">Services</Link></li>
              <li><Link to='/' className="hover:text-gray-400">Contact</Link></li>
              <li><Link to='/terms-and-conditions' className="hover:text-gray-400">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 flex justify-center md:justify-end space-x-6">
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
        </div>
        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-white pt-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Makueni University Students Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
