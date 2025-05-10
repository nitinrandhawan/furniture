"use client";
import React, { useEffect, useState } from "react";
import "../../products.css";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import Image from "next/image";
import { useParams } from "next/navigation";
import { extractIdFromSlug } from "@/app/utils/generate-slug";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { NoItem } from "@/app/utils/NoItem";

const Page = () => {
  const [wishlistedProductId, setWishlistedProductId] = useState(null);
const [products, setProducts] = useState([]);
  const { subcategoryId:id } = useParams();
  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    setWishlistedProductId((prevId) =>
      prevId === productId ? null : productId
    );
  };
  const fetchProductsBySubCategory = async (id) => {
    try {
       const subCategoryId = extractIdFromSlug(id);
      const response = await axiosInstance.get(`/api/v1/sub-category/get-products-by-sub-category/${subCategoryId}`);
      if (response.status === 200) {
      setProducts(response?.data?.data);

      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error?.response?.data?.message ||"Failed to fetch products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProductsBySubCategory(id)
  }, [id]);

  return (
    <>
      {/* Product filter section */}
      <section className="product-filter py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="filter-first">
                <h2 className="fw-bold text-white me-4">Filter By</h2>
                {/* Price Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Price
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Under $50
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        $50 - $100
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Above $100
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Category Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Category
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Clothing
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Accessories
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Shoes
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Material Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Material
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Cotton
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Leather
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Synthetic
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Size Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Size
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        S
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        M
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        L
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        XL
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Discount Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Discount
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        10% or more
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        30% or more
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        50% or more
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="filter-second">
                <strong className="text-white">Sort By</strong>
                <select className="form-select form-select-sm w-auto">
                  <option value="relevance">Relevance</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product list */}
      <section className="product-list">
        <div className="product-list-header">
          <h2>Products</h2>
          <p>Explore our wide range of products</p>
        </div>
        <div className="container">
          <div className="row">
           {
              products?.length === 0 && (
                <NoItem name="Products" / >
              )
           }
            {products?.map((item, index) => {
              return (
                <div className="col-md-3 col-6" key={index}>
                  <div
                    className="product-card"
                    style={{ position: "relative" }}
                  >
                    <Link
                      href={`/Pages/products/${item?._id}`}
                      className="product-link"
                    >
                      <Image
                        className="product-image"
                        src={item?.images[0] || "/images/placeholder.png"}
                        alt="product-image"
                        width={300}
                        height={300}
                      />
                      <div className="product-details">
                        <h3>{item.productName}</h3>
                        <div className="product-price-section">
                          <p className="final-price">₹{item?.finalPrice}</p>
                          <p className="price">
                            <del>₹{item?.price}</del>
                          </p>
                          <p className="discount">{item?.discount}% OFF</p>
                        </div>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        className="wishlist-btn"
                        onClick={(e) => toggleWishlist(e, item.id)}
                        aria-label="Add to Wishlist"
                      >
                        {wishlistedProductId === item.id ? (
                          <FaHeart className="wishlist-icon red" />
                        ) : (
                          <FaRegHeart className="wishlist-icon" />
                        )}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wishlist styles */}
    </>
  );
};

export default Page;
