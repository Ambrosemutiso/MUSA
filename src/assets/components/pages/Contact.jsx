import React from 'react';

const Contact = () => {
  return (
    <div className="bg-white text-black py-10 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Contact Information */}
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              If you have any questions or need further information, please feel free to contact us.
            </p>

            {/* Contact Details */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-green-700">Phone</h2>
              <p className="text-lg text-blue-800">+254 790 440 234</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-green-700">Email</h2>
              <p className="text-lg text-blue-800">info@officialmusamakueni.co.ke</p>
            </div>

            {/* Social Media Icons */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-green-700">Follow Us</h2>
              <div className="flex space-x-6">
                <a href="https://www.facebook.com/musamakueni" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
                <a href="https://www.twitter.com/MUSA_makueni017?t=LTZiDkJ9vfNuSGwZvkLCbg&s=09" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
                <a href="https://www.instagram.com/makueni_comrades?igshid=OGQ5ZDc2ODk22ZA==" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
                <a href="https://www.linkedin.com/company/makueni-university-students-association-musa/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <a href="https://www.youtube.com/@musamakueni?si=PiQbW1kBVm7RZ5QI" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-4">Location</h2>
            <div className="border-2 border-green-700 rounded-lg shadow-lg overflow-hidden">
              <iframe
                title="MUSA Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15957.46528146753!2d37.62817124572351!3d-1.7858776562704415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182890b9a80771b3%3A0x28c5067d49a7ff91!2sSoi%20Plaza%2C%20Wote%2C%20Makueni%20County!5e0!3m2!1sen!2ske!4v1635513425615!5m2!1sen!2ske"
                width="100%"
                height="400"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
