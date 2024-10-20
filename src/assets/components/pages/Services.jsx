import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="services" className="py-12 bg-white scroll-mt-16">
      <div className="container mx-auto px-6 lg:px-20" data-aos="fade-up">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">Services</h2>
          <p className="text-lg text-gray-700">
            MUSA prides itself in collaborating with students and other stakeholders to offer the following services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mentorship */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-4">
              <div className="icon bg-blue-600 p-4 rounded-full text-white">
                <i className="bi bi-card-checklist text-2xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-green-700 ml-4">Mentorship</h4>
            </div>
            <p className="text-lg text-gray-700">
              MUSA conducts impactful mentorship sessions, guiding high school and primary school students and peers on their academic journeys. 
              Through mentorship, we shape the leaders of tomorrow, inspiring them to achieve their dreams.
            </p>
          </div>

          {/* Environmental Conservation */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center mb-4">
              <div className="icon bg-blue-600 p-4 rounded-full text-white">
                <i className="bi bi-card-checklist text-2xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-green-700 ml-4">Environmental Conservation</h4>
            </div>
            <p className="text-lg text-gray-700">
              Committed to environmental stewardship, MUSA actively engages in tree planting initiatives and conservation projects. 
              We collaborate with like-minded organizations and communities, working together to preserve the natural beauty of Makueni County for future generations.
            </p>
          </div>

          {/* Bursaries */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center mb-4">
              <div className="icon bg-blue-600 p-4 rounded-full text-white">
                <i className="bi bi-card-checklist text-2xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-green-700 ml-4">Bursaries</h4>
            </div>
            <p className="text-lg text-gray-700">
              In partnership with the county government of Makueni and members of the national assembly, MUSA secures bursaries for our comrades. 
              Additionally, our members contribute to the Makueni County Bursary Advisory Committee, ensuring financial support reaches those in need.
            </p>
          </div>

          {/* Education Financial Support */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center mb-4">
              <div className="icon bg-blue-600 p-4 rounded-full text-white">
                <i className="bi bi-card-checklist text-2xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-green-700 ml-4">Education Financial Support</h4>
            </div>
            <p className="text-lg text-gray-700">
              MUSA, fueled by the generosity of its members and well-wishers, provides essential financial support to students facing economic challenges. 
              Together, we bridge the gap, enabling deserving students to access quality education and pursue their aspirations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
