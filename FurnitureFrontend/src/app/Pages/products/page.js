"use client"
import React, { useEffect, useState } from 'react'
import './products.css'
import axios from 'axios';
import Link from 'next/link';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from 'react-icons/fa6';
import Image from 'next/image';

const Page = () => {
    // State to track the wishlisted product ID
    const [wishlistedProductId, setWishlistedProductId] = useState(null);

    // Function to toggle wishlist for a specific product
    const toggleWishlist = (e, productId) => {
        e.preventDefault(); // Prevent navigation when clicking the heart
        setWishlistedProductId((prevId) => (prevId === productId ? null : productId)); // Toggle wishlist state
    };

    // Fetch products from API
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const URL = 'https://api.sddipl.com/api/product/get-all-products-with-pagination';
        axios.get(URL)
            .then((response) => {
                console.log("Products:", response.data?.data);
                setProducts(response.data?.data || []);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            })
    }, [])

    return (
        <>
            {/* Product filter section */}
            <section className='product-filter py-2'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-8'>
                            <div className='filter-first'>
                                <h2 className='fw-bold text-white me-4'>Filter By</h2>
                                {/* Price Dropdown */}
                                <div className="dropdown">
                                    <button className="btn btn-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                        Price
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Under $50</a></li>
                                        <li><a className="dropdown-item" href="#">$50 - $100</a></li>
                                        <li><a className="dropdown-item" href="#">Above $100</a></li>
                                    </ul>
                                </div>
                                {/* Category Dropdown */}
                                <div className="dropdown">
                                    <button className="btn btn-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                        Category
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Clothing</a></li>
                                        <li><a className="dropdown-item" href="#">Accessories</a></li>
                                        <li><a className="dropdown-item" href="#">Shoes</a></li>
                                    </ul>
                                </div>
                                {/* Material Dropdown */}
                                <div className="dropdown">
                                    <button className="btn btn-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                        Material
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Cotton</a></li>
                                        <li><a className="dropdown-item" href="#">Leather</a></li>
                                        <li><a className="dropdown-item" href="#">Synthetic</a></li>
                                    </ul>
                                </div>
                                {/* Size Dropdown */}
                                <div className="dropdown">
                                    <button className="btn btn-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                        Size
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">S</a></li>
                                        <li><a className="dropdown-item" href="#">M</a></li>
                                        <li><a className="dropdown-item" href="#">L</a></li>
                                        <li><a className="dropdown-item" href="#">XL</a></li>
                                    </ul>
                                </div>
                                {/* Discount Dropdown */}
                                <div className="dropdown">
                                    <button className="btn btn-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                        Discount
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">10% or more</a></li>
                                        <li><a className="dropdown-item" href="#">30% or more</a></li>
                                        <li><a className="dropdown-item" href="#">50% or more</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='filter-second'>
                                <strong className="text-white">Sort By</strong>
                                <select className='form-select form-select-sm w-auto'>
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
            <section className='product-list'>
                <div className='product-list-header'>
                    <h2>Products</h2>
                    <p>Explore our wide range of products</p>
                </div>
                <div className='container'>
                    <div className='row'>
                        {products?.map((item, index) => {
                            return (
                                <div className='col-md-3 col-6' key={index}>
                                    <div className='product-card' style={{ position: 'relative' }}>
                                        <Link href={`/Pages/products/id`} className='product-link'>
                                            <Image
                                                className='product-image'
                                                src={item.images[0]}
                                                alt='product-image'
                                                width={300}
                                                height={300}
                                            />
                                            <div className='product-details'>
                                                <h3>{item.productName}</h3>
                                                <div className='product-price-section'>
                                                    <p className='final-price'>₹{item.price}</p>
                                                    <p className='price'><del>₹{item.price}</del></p>
                                                    <p className='discount'>{item.price}% OFF</p>
                                                </div>
                                            </div>

                                            {/* Wishlist Button */}
                                            <button
                                                className='wishlist-btn'
                                                onClick={(e) => toggleWishlist(e, item.id)}
                                                aria-label='Add to Wishlist'
                                            >
                                                {wishlistedProductId === item.id ? (
                                                    <FaHeart className='wishlist-icon red' />
                                                ) : (
                                                    <FaRegHeart className='wishlist-icon' />
                                                )}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Wishlist styles */}

        </>
    )
}

export default Page;
