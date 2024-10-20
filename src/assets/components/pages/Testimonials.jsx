import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Emmanuel, Left, Naom, Peter, Right, Sharon, Valentine } from './Img';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Testimonials</h2>
          <p className="text-lg text-green-700">See what our members are saying</p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}  t
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full"
        >
          <SwiperSlide>
            <div className="testimonial-item bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105 duration-300">
              <p className="text-lg text-gray-600 italic relative mb-4">
                <img src={Left} className="inline-block w-6 h-6" alt="left quote" />
                <span className="ml-2">
                MUSA has empowered students across Makueni County, giving them the tools to become leaders and change-makers in their communities.
                </span>
                <img src={Right} className="inline-block w-6 h-6 ml-2" alt="right quote" />
              </p>
              <img src={Valentine} className="w-16 h-16 rounded-full mx-auto mb-4" alt="Valentine Mwende" />
              <h3 className="text-xl font-semibold text-gray-800">Valentine Mwende</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-item bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105 duration-300">
              <p className="text-lg text-gray-600 italic relative mb-4">
                <img src={Left} className="inline-block w-6 h-6" alt="left quote" />
                <span className="ml-2">
                MUSA's impact extends far beyond the classroom, fostering a strong sense of unity and purpose among all its members.
                </span>
                <img src={Right} className="inline-block w-6 h-6 ml-2" alt="right quote" />
              </p>
              <img src={Emmanuel} className="w-16 h-16 rounded-full mx-auto mb-4" alt="Emmanuel Ndonye" />
              <h3 className="text-xl font-semibold text-gray-800">Emmanuel Ndonye</h3>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial-item bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105 duration-300">
              <p className="text-lg text-gray-600 italic relative mb-4">
                <img src={Left} className="inline-block w-6 h-6" alt="left quote" />
                <span className="ml-2">
                Thanks to MUSA, we've been able to connect and uplift each other through mentorship, environmental initiatives, and community service.
                </span>
                <img src={Right} className="inline-block w-6 h-6 ml-2" alt="right quote" />
              </p>
              <img src={Naom} className="w-16 h-16 rounded-full mx-auto mb-4" alt="Naom Kyalo" />
              <h3 className="text-xl font-semibold text-gray-800">Naom Kyalo</h3>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial-item bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105 duration-300">
              <p className="text-lg text-gray-600 italic relative mb-4">
                <img src={Left} className="inline-block w-6 h-6" alt="left quote" />
                <span className="ml-2">
                Through MUSA, students have found a platform to express their talents, build meaningful networks, and contribute positively to society.
                </span>
                <img src={Right} className="inline-block w-6 h-6 ml-2" alt="right quote" />
              </p>
              <img src={Sharon} className="w-16 h-16 rounded-full mx-auto mb-4" alt="Sharon Musyoka" />
              <h3 className="text-xl font-semibold text-gray-800">Sharon Musyoka</h3>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial-item bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105 duration-300">
              <p className="text-lg text-gray-600 italic relative mb-4">
                <img src={Left} className="inline-block w-6 h-6" alt="left quote" />
                <span className="ml-2">
                MUSA has been instrumental in shaping us into responsible citizens, ready to tackle the challenges of tomorrow with confidence.
                </span>
                <img src={Right} className="inline-block w-6 h-6 ml-2" alt="right quote" />
              </p>
              <img src={Peter} className="w-16 h-16 rounded-full mx-auto mb-4" alt="Peter Mutisya" />
              <h3 className="text-xl font-semibold text-gray-800">Peter Mutisya</h3>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
