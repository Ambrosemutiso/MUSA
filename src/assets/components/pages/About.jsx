import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-12 bg-gray-50 scroll-mt-16">
      <div className="container mx-auto px-6 lg:px-20" data-aos="fade-up">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">About MUSA</h2>
          <div className="box bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700">
              Makueni University Students' Association (MUSA) stands as a beacon of Unity, Vision, and Progress for students in universities and colleges across the country. The association draws membership from students hailing from Makueni County, but enrolled in various universities and colleges across the country. Rooted in the values of unity, diversity, and excellence, our association strives to create an inclusive environment where every member is valued, respected, and supported.
            </p>
          </div>
        </div>

        {/* Vision, Aim, Mission, and Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-4">
              <div className="icon bg-blue-600 p-4 rounded-full text-white">
                <i className="bi bi-bar-chart text-2xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-green-700 ml-4">Vision</h4>
            </div>
            <p className="text-lg text-gray-700">
              To illuminate Makueni County as a hub for producing competent and reliable graduates, fostering a future where education transforms lives and communities.
            </p>
          </div>

          {/* Aim */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center mb-4">
              <div className="icon bg-blue-600 p-4 rounded-full text-white">
                <i className="bi bi-card-checklist text-2xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-green-700 ml-4">Aim</h4>
            </div>
            <p className="text-lg text-gray-700">
              MUSA strives to unite students, alumni, and professionals, celebrating the diversity of ideologies as a catalyst for development.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center mb-4">
              <div className="icon bg-blue-600 p-4 rounded-full text-white">
                <i className="bi bi-bar-chart text-2xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-green-700 ml-4">Mission</h4>
            </div>
            <p className="text-lg text-gray-700">
              To foster peaceful interactions within society through empowering youth via training, awareness creation, advocacy, and collaborations.
            </p>
          </div>

          {/* MUSA Pillars */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center mb-4">
              <div className="icon bg-blue-600 p-4 rounded-full text-white">
                <i className="bi bi-binoculars text-2xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-green-700 ml-4">MUSA Pillars</h4>
            </div>
            <p className="text-lg text-gray-700">
              The pillars of MUSA are:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li>Unity</li>
              <li>Vision</li>
              <li>Progress</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
);
};

export default About;