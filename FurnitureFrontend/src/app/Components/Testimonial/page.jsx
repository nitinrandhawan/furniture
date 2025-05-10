// components/TestimonialSlider.jsx
"use client"
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./testimonial.css"; 
const testimonials = [
  {
    name: "Vishnu Sahu",
    role: "Senior Software Engineer",
    image: "/testimonial1.jpg",
    message: "This product changed my life! I highly recommend it to everyone.",
  },
  {
    name: "Gaurov Panchal",
    role: "Senior Software Engineer",
    image: "/testimonial2.jpg",
    message: "A fantastic service with excellent customer support.",
  },
  {
    name: "Mukesh Singh",
    role: "Developer",
    image: "/testimonial4.jpg",
    message: "Clean UI and fast performance. I'm truly impressed.",
  },
  {
    name: "Nitin Gupta",
    role: "Backend Developer",
    image: "/profile.jpg",
    message: "Clean UI and fast performance. I'm truly impressed.",
  }
];

const TestimonialSlider = () => {
  return (
    <>    
        <h2 className="theme-text text-center mt-3">Client Testimonial</h2>  
      <div className="testimonialMainSec">
   
    <div className="testimonial-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <img src={"../../public/testimonial1.jpg"} alt={t.name} className="testimonial-img" />
              <h3 className="text-light">{t.name}</h3>
              <p className="role text-light">{t.role}</p>
              <p className="message text-light">“{t.message}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
    </>

  );
};

export default TestimonialSlider;
