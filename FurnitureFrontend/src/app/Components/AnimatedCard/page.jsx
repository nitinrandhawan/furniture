"use client"
import React, { useState } from 'react';
import styles from './animatedProduct.css';
import Image from 'next/image';
import { RiHeartAddFill } from "react-icons/ri";
import Link from 'next/link';

const productData = [
  {
    id: 1,
    images: [
      '/pic1.jpg',
      '/pic2.jpg',
      '/pic3.jpg',
    ],
    subimage:
      '/pic1.jpg'
    ,
    name: 'Awesome Gadget X',
    description: 'The latest and brand new  with  beds .',
    price: '22499',
    basePrice: '40499',
    discount: "30%"
  },
  {
    id: 2,
    images: [
      '/img1.jpg',
      '/img2.jpg',
      '/img3.jpg',
    ],
    subimage:
      '/img1.jpg'
    ,
    name: 'Stylish T-Shirt',
    description: 'A comfortable and trendy sofa  for home furniture .',
    price: '11299',
    basePrice: '22499',
    discount: "40%"
  },
  {
    id: 3,
    images: [
      '/img4.jpg',
      '/img5.jpg',
      '/img6.jpg',
    ],
    subimage:
      '/img4.jpg'
    ,
    name: 'Ergonomic Mouse',
    description: 'Designed for comfort and long-lasting products .',
    price: '15349',
    basePrice: '25499',
    discount: "15%"
  },
  {
    id: 4,
    images: [
      '/img6.jpg',
      '/img7.jpg',
      '/img8.jpg',

    ],
    subimage:
      '/img6.jpg'
    ,
    name: 'Portable Speaker',
    description: 'Enjoy your comfortable beds.',
    price: '11599',
    basePrice: '17499',
    discount: "19%"
  },
  {
    id: 5,
    images: [
      '/img8.jpg',
      '/img9.jpg',
      '/img10.jpg',

    ],
    subimage:
      '/icon1.jpg'
    ,
    name: 'Smartwatch Pro',
    description: '  tranding furnitures in affordable price.',
    price: '24799',
    basePrice: '42499',
    discount: "22%"
  },

];

export default function Products() {

  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };


  return (
    <>

      <div className='mt-3 mb-3'>
        <div className={`container mt-4 ${styles.productContainer}`}>
          <div className="row row-cols-2   row-cols-sm-3 row-cols-md-5 g-4">
            {productData.map((product) => (
              <div className="col" key={product.id}>
                <div className={`card AniCardSec h-100 shadow-sm ${styles.productCard}`}>
                  {/* Image Carousel */}
                  <div id={`carousel-${product.id}`} className={`carousel slide ${styles.productCarousel}`} data-bs-ride="carousel" data-bs-interval="2000"
                    data-bs-pause="false">
                    <div className={`carousel-inner ${styles.productCarouselInner}`}>
                      {product.images.map((image, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                          <Image
                          width={'100'}
                          height={'200'}
                            src={image}
                            className={`d-block  w-100 ${styles.productCarouselImage}`}
                            alt={product.name}
                          />
                          <p className='discountSec'>{product.discount}Off</p>
                        </div>
                      ))}

                    </div>
                    {product.images.length > 1 && (
                      <>
                        <button
                          className={`carousel-control-prev ${styles.productCarouselControlPrev}`}
                          type="button"
                          data-bs-target={`#carousel-${product.id}`}
                          data-bs-slide="prev"
                        >
                          <span className={`carousel-control-prev-icon ${styles.productCarouselControlPrevIcon}`} aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className={`carousel-control-next  ${styles.productCarouselControlNext}`}
                          type="button"
                          data-bs-target={`#carousel-${product.id}`}
                          data-bs-slide="next"
                        >
                          <span className={`carousel-control-next-icon ${styles.productCarouselControlNextIcon}`} aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className='wishlistIconSec'>
                    <RiHeartAddFill
                      className='fs-light'
                      style={{ color: isLiked ? 'red' : 'inherit' }}
                      onClick={handleClick}
                    />
                  </div>
                  <div className={`card-body product-card-body ${styles.productCardBody}`}>
                    <div className='d-flex align-items-center m-0'>
                      <p className={`card-text ${styles.productCardPrice} m-0`}> ₹ {product.price}</p>
                      <p className='mb-0  text-success'><del className='ms-2 text-center'> &#8377;{product.basePrice}</del></p>
                    </div>
                    <h6 className={`card-title m-0  ${styles.productCardTitle}`}>{product.name}</h6>

                  </div>
                  <div className='card-dropdown'>
                    <div className='d-flex gap-3'>
                      <Image src={product.subimage} alt="subimage" height={40} width={40} />
                      <b className={`card-text  text-muted ${styles.productCardDescription}`}>{product.description}</b>
                    </div>
                    <div className='d-flex'>
                      <p className='mt-2 text-success'> <del className='ms-2 text-center'> &#8377;{product.basePrice}</del></p>
                    </div>


                    {/* <Link href={"/Pages/products/id"}> <button className={`btn btn-sm btn-outline-secondary w-100 ${styles.productViewDetailsButton}`}>View Details</button></Link> */}
                    <Link href={"/Pages/products/id"}> <button className={`cardbtn text-light w-100 ${styles.productViewDetailsButton}`}>View Details</button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}