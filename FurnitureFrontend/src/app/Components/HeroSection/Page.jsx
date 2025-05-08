'use client';

import { useEffect, useState } from 'react';
import './herosection.css'

const HeroCarousel = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js'); // Bootstrap JS for carousel
  }, []);

  // Dynamic carousel data (could come from API, or JSON)
  const slides = [
    {
      id: 1,
      image: '/banner1.jpg',
      title: 'New Arrival: Summer Collection',
      description: 'Explore the latest styles with our summer collection!',
      cta: 'Shop Now',
      link: '#shop-now'
    },
    {
      id: 2,
      image: '/banner2.jpg',
      title: 'Winter Specials',
      description: 'Get ready for winter with our cozy apparel.',
      cta: 'Shop Winter',
      link: '#shop-winter'
    },
    {
      id: 3,
      image: '/banner1.jpg',
      title: 'Big Sale on Accessories',
      description: 'Huge discounts on all accessories!',
      cta: 'Shop Accessories',
      link: '#shop-accessories'
    }
  ];

  return (
    <div id="heroCarousel" className="carousel slide herosectionSec" data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators herosectionSec-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel Inner */}
      <div className="carousel-inner herosectionSec-inner rounded-4 shadow">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === 0 ? 'active' : ''} herosectionSec-item`}
          >
            <img src={slide.image} className="d-block w-100 herosectionSec-img" alt={slide.title} />
            <div className="carousel-caption d-none d-md-block herosectionSec-caption animated fadeInUp">
              <h5>{slide.title}</h5>
              <p>{slide.description}</p>
              <a href={slide.link} className="btn btn-lg herosectionSec-btn">{slide.cta}</a>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev herosectionSec-control"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next herosectionSec-control"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroCarousel;
