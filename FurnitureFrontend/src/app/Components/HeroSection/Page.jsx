"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './herosection.css';
import pic1 from '@/app/Components/assets/pic1.jpg';
import pic2 from '@/app/Components/assets/pic2.jpg';
import pic3 from '@/app/Components/assets/pic3.jpg';

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    {
      id: 1,
      title: "Modern Sofa Collection",
      description: "Discover our premium comfort designs",
      image: pic1,
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Bedroom Essentials",
      description: "Transform your sleeping experience",
      image: pic2,
      cta: "Explore"
    },
    {
      id: 3,
      title: "Dining Sets",
      description: "Elegant solutions for your home",
      image: pic3,
      cta: "View Collection"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="hero-section">
      <div className="container-fluid g-0">
        <div className="row g-0">
          {/* Left Side (60%) - Banner */}
          <div className="col-lg-8 col-12 hero-banner pe-1 ps-1">
            <div className="banner-content">
              <div className="banner-image-container">
                <Image 
                  src="/banner1.jpg" 
                  alt="Furniture Banner" 
                  fill
                  className="banner-image"
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="banner-overlay">
                <h2>Summer Sale</h2>
                <h1>UP TO 50 OFF</h1>
                <p>On selected furniture items</p>
                <button className="btn btn-light">SHOP DEALS</button>
              </div>
            </div>
          </div>

          {/* Right Side (40%) - Carousel */}
          <div className="col-lg-4 col-12 hero-carousel hero-divide-mobile">
            <div id="miniCarousel" className="carousel slide">
              <div className="carousel-inner">
                {carouselItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                  >
                    <div className="carousel-image-container">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="carousel-image"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="carousel-caption">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <button className="btn btn-outline-light">{item.cta}</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="carousel-indicators">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === activeIndex ? 'active' : ''}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;