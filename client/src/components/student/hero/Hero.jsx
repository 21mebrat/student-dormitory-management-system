import React from 'react'
import './hero.css'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import A from '../../../assets/buildigA.jfif' // Example image
import B from '../../../assets/buildingB.jfif' // Example image
import C from '../../../assets/buildingC.jfif' // Example image
import D from '../../../assets/buildingD.jfif' // Example image
import E from '../../../assets/buildingE.jfif' // Example image

const Hero = () => {
  return (
    <div className="student-hero">
      <div className="student-hero-left">
        <h1>DMU DORMITORY BUILDING OVERVIEW</h1>
        <p>
          The DMU Dormitory Building provides a modern, safe, and comfortable living space for students. With its state-of-the-art facilities and convenient location, it aims to create an ideal environment for studying and relaxation. The dormitory features spacious rooms, communal areas for social interaction, and amenities that cater to the diverse needs of students. Whether you're looking for a quiet study space or a place to unwind with friends, the DMU Dormitory is designed to meet your needs and enhance your student experience.
        </p>
      </div>
      <div className="student-hero-right">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
         
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination,Autoplay]}
          className="mySwiper"
        >
          {/* SwiperSlides with images for the slideshow */}
          <SwiperSlide>
            <img className="img" src={A} alt="Building 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="img" src={D} alt="Building 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="img" src={E} alt="Building 5" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Hero
