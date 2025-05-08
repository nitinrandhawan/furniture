"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import './productdetail.css';
import { IoCallOutline } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import Product from "@/app/Components/Products/product";
import { FaCartArrowDown } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const faqData = [
  {
    question: "Specifications",
    answer: "We offer a wide range of furniture including sofas, beds, dining tables, chairs, wardrobes, and more for homes and offices.",
  },
  {
    question: "Brand & Collection Overview",
    answer: "Yes, we provide custom furniture options based on your requirements. You can contact our team to discuss your ideas.",
  },
  {
    question: "Care & Maintenance",
    answer: "Delivery usually takes 5-10 business days depending on your location and the type of furniture ordered.",
  },
  {
    question: "Seller",
    answer: "We accept returns within 7 days of delivery if the product is damaged or defective. Please refer to our return policy page for more details.",
  },
  {
    question: "Warranty",
    answer: "Yes, we provide free installation services for selected furniture items. Our delivery team will handle the setup.",
  },
  {
    question: "Q&A",
    answer: "Yes, we provide free installation services for selected furniture items. Our delivery team will handle the setup.",
  },
];

const ImageCarousel = ({ product }) => {
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(mainSlider.current);
    setNav2(thumbSlider.current);
  }, []);

  const imageArray = new Array(6).fill(product.image);

  const mainSettings = {
    asNavFor: nav2,
    ref: mainSlider,
    arrows: false,
    fade: true,
  };

  const thumbSettings = {
    asNavFor: nav1,
    ref: thumbSlider,
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      }
    ]
  };

  return (
    <div className="carousel-wrapper" style={{ maxWidth: "580px", margin: "auto", height:"650px" }}>
      <Slider {...mainSettings}>
        {imageArray.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              className="img-fluid"
              style={{ height: '500px', objectFit: 'cover', borderRadius: '10px', width: '100%' }}
              alt={`Main ${i}`}
            />
          </div>
        ))}
      </Slider>
      <div className="mt-3">
        <Slider {...thumbSettings}>
          {imageArray.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                className="img-fluid"
                style={{ padding: 5, height: 100, objectFit: 'cover', borderRadius: '5px', width: '100%' }}
                alt={`Thumb ${i}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const Page = () => {
  const [product, setProduct] = useState(null);
  const URL = 'https://fakestoreapi.com/products/1';

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);

  return (
    <>
      <nav aria-label="breadcrumb" className="pretty-breadcrumb">
        <div className="container">
          <ol className="breadcrumb align-items-center">
            <li className="breadcrumb-item">
              <Link href="/"><span className="breadcrumb-link">Home</span></Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/Pages/products"><span className="breadcrumb-link">Products</span></Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">Product Details</li>
          </ol>
        </div>
      </nav>

      <div className='product-details'>
        <div className='container'>
          <div className='row'>
            <div className="col-md-6">
                
              {product && <ImageCarousel product={product} />}
            </div>

            <div className='col-md-6'>
              {product && (
                <div className='product-details-content'>
                  <h2 className='details-heading Producttitle'>{product.title}</h2>
                  <p className='detail-description'>{product.description}</p>
                  <hr />
                  <div className='price-section'>
                    <p className='final-price'> ₹{product.price}</p>
                    <p className='price'><del>MRP ₹{product.price}</del></p>
                    <p className='discount'>{product.price}% OFF</p>
                  </div>
                  <div className='product-overview'>
                    <h3>Product Overview</h3>
                    <hr />
                    <ul className='overview-list'>
                      <li><strong>Material :</strong> <span className='text-info'>Sofa & Bed </span></li>
                      <li><strong>FINISH :</strong> {product.rating?.rate} ({product.rating?.count} reviews)</li>
                      <li><strong>Dimensions(inch) :</strong> {product.stock ? "In Stock" : "Out of Stock"}</li>
                      <li><strong>Dimensions(Cm):</strong>54.4L * 62w *55H</li>
                      <li><strong>Brand :</strong> Wooden Street</li>
                      <li><strong>Pack Content :</strong>1 Study Table </li>
                      <li><strong>FEATURES :</strong> With Drawer</li>
                      <li><strong>STORAGE :</strong> With Storage</li>
                      <li><strong>Table Top Material :</strong> Engineered Wood</li>
                      <li><strong>SKU :</strong>WS59838</li>
                      <li><strong> Delivery Condition :</strong> Expert-Assembly </li>
                      <li><strong> Ratings :</strong></li>
                    </ul>
                    <div className='product-details-cart-button'>
                    <Link href="/Pages/addtocart" className='add-to-cart'>  <button className=' cartbtn '> <FaCartArrowDown className='fs-3'/> ADD TO CART</button></Link>
                      <button className='buy-now'>  <MdElectricBolt className='fs-3' />   Buy Now</button>
                    </div>
                  </div>
                </div>
              )} 

              <div className={`container my-3 faqSection`}>
                <div className={`accordion accordionCustom`} id="faqAccordion">
                  {faqData.map((item, index) => (
                    <div className={`accordion-item accordionItem`} key={index}>
                      <h2 className="accordion-header" id={`faq${index}`}>
                        <button
                          className={`accordion-button ${index !== 0 ? "collapsed" : ""} accordionButton`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={`collapse${index}`}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "" : ""}`}
                        aria-labelledby={`faq${index}`}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className={`accordion-body accordionBody`}>
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className='container'>
            <div className='cal-contact-section'>
              <h2>Need Help in Buying?</h2>
              <Link className='request-call' href="tel:+919319846114">Request A Call Back</Link>
              <p>Or</p>
              <div className='call-main'>
                <div className='calling-main'>
                  <IoCallOutline className='icn' />
                  <div>
                    <p>Call Us</p>
                    <Link href="tel:+919319846114">+91 9319846114</Link>
                  </div>
                </div>
                <p className='call-line'>|</p>
                <div className='calling-main'>
                  <TbMessages className='icn' />
                  <div>
                    <p>Live Chat</p>
                    <Link href="#">Talk To Expert</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-5'>
            <Product />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
