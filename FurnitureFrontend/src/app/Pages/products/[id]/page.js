"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./productdetail.css";
import { IoCallOutline } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import Product from "@/app/Components/Products/product";
import { FaCartArrowDown } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, AddToCartToServer } from "@/app/redux/slice/cartSlice";
import { extractIdFromSlug } from "@/app/utils/generate-slug";

const ImageCarousel = ({ product }) => {
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(mainSlider.current);
    setNav2(thumbSlider.current);
  }, []);

  const imageArray = product?.images || [];

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
      },
    ],
  };

  return (
    <div
      className="carousel-wrapper"
      style={{ maxWidth: "580px", margin: "auto", height: "650px" }}
    >
      <Slider {...mainSettings}>
        {imageArray.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              className="img-fluid"
              style={{
                height: "500px",
                objectFit: "cover",
                borderRadius: "10px",
                width: "100%",
              }}
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
                style={{
                  padding: 5,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: "5px",
                  width: "100%",
                }}
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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchProductDetails = async () => {
   const productId= extractIdFromSlug(id);
    try {
      const response = await axiosInstance.get(
        `/api/v1/product/get-single-product/${productId}`
      );
      const data = response?.data?.data;
      setProduct(data);
      setFaqData([
        {
          question: "Specifications",
          answer: data?.Specifications,
        },
        {
          question: "Brand & Collection Overview",
          answer: data?.BrandCollectionOverview,
        },
        {
          question: "Care & Maintenance",
          answer: data?.CareMaintenance,
        },
        {
          question: "Seller",
          answer: data?.seller,
        },
        {
          question: "Warranty",
          answer: data?.Warranty,
        },
      ]);
    } catch (error) {
      console.log("product details", error.message);
      toast.error("Failed to fetch product details. Please try again.");
    }
  };
  const fetchRelatedProducts = async ({ subCategoryId }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/sub-category/get-products-by-sub-category/${subCategoryId}`
      );
      if (response.status == 200) {
        const data = response?.data?.data;
        setRelatedProducts(data);
      }
    } catch (error) {
      console.log("product details", error.message);
      toast.error("Failed to fetch product details. Please try again.");
    }
  };
  const { user } = useSelector((state) => state.auth);
  const handleAddToCart = () => {
    let quantity = 1;
  
    if (quantity > product.stock) {
      toast.error("Out of stock");
      return;
    }

    if(user?.email){
      dispatch(AddToCartToServer({productId:product._id,quantity}))
      toast.success("Product added to cart",{
        position: "bottom-right",
      })}
      else{
      dispatch(
        addToCart({
          productId: product._id,
          quantity,
          image: product.images[0],
          finalPrice: product.finalPrice,
          name: product.productName,
          dimensionsCm: product.dimensionsCm,
          stock: product.stock,
          discount: product.discount,
          price: product.price,
        })
      );
      toast.success("Product added to cart", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product) {
      const subCategoryId = product?.subCategory?._id;
      if (!subCategoryId) return;
      fetchRelatedProducts({ subCategoryId: product?.subCategory?._id });
    }
  }, [id, product]);

  return (
    <>
      <nav aria-label="breadcrumb" className="pretty-breadcrumb">
        <div className="container">
          <ol className="breadcrumb align-items-center">
            <li className="breadcrumb-item">
              <Link href="/">
                <span className="breadcrumb-link">Home</span>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/Pages/products">
                <span className="breadcrumb-link">Products</span>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product Details
            </li>
          </ol>
        </div>
      </nav>

      <div className="product-details">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {product && <ImageCarousel product={product} />}
            </div>

            <div className="col-md-6">
              {product && (
                <div className="product-details-content">
                  <h2 className="details-heading Producttitle">
                    {product?.productName}
                  </h2>
                  <div
                    className="detail-description"
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  ></div>
                  <hr />
                  <div className="price-section">
                    <p className="final-price"> ₹{product?.finalPrice}</p>
                    <p className="price">
                      <del>MRP ₹{product?.price}</del>
                    </p>
                    <p className="discount">{product?.discount}% OFF</p>
                  </div>
                  <div className="product-overview">
                    <h3>Product Overview</h3>
                    <hr />
                    <ul className="overview-list">
                      <li>
                        <strong>Material :</strong>{" "}
                        <span className="text-info">{product?.material}</span>
                      </li>
                      <li>
                        <strong>WEIGHT :</strong>
                        {product?.weight}
                      </li>
                      <li>
                        <strong>Dimensions(inch) :</strong>{" "}
                        {product?.dimensionsInch}
                      </li>
                      <li>
                        <strong>Dimensions(Cm):</strong>
                        {product?.dimensionsCm}
                      </li>
                      <li>
                        <strong>Brand :</strong> {product?.brand}
                      </li>
                      <li>
                        <strong>SKU :</strong>
                        {product?.sku}
                      </li>
                      <li>
                        <strong>Stock :</strong>
                        {product?.stock === 0 ? "Out of Stock" : product?.stock}
                      </li>
                    </ul>
                    <div className="product-details-cart-button">
                      {" "}
                      <button
                        className=" cartbtn "
                        onClick={ handleAddToCart}
                      >
                        {" "}
                        <FaCartArrowDown className="fs-3" /> ADD TO CART
                      </button>
                      <button className="buy-now">
                        {" "}
                        <MdElectricBolt className="fs-3" /> Buy Now
                      </button>
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
                          className={`accordion-button ${
                            index !== 0 ? "collapsed" : ""
                          } accordionButton`}
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
                        className={`accordion-collapse collapse ${
                          index === 0 ? "" : ""
                        }`}
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
          <div className="container">
            <div className="cal-contact-section">
              <h2>Need Help in Buying?</h2>
              <Link className="request-call" href="tel:+919319846114">
                Request A Call Back
              </Link>
              <p>Or</p>
              <div className="call-main">
                <div className="calling-main">
                  <IoCallOutline className="icn" />
                  <div>
                    <p>Call Us</p>
                    <Link href="tel:+919319846114">+91 9319846114</Link>
                  </div>
                </div>
                <p className="call-line">|</p>
                <div className="calling-main">
                  <TbMessages className="icn" />
                  <div>
                    <p>Live Chat</p>
                    <Link href="#">Talk To Expert</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-5">
              <Product products={relatedProducts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
