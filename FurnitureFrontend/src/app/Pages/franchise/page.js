"use client";
import React, { useState } from "react";
import "./Franchise.css"
import Link from "next/link";
const Franchise = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        budget: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for applying! We’ll be in touch soon.");
    };

    return (

        <>
            <nav aria-label="breadcrumb" className="pretty-breadcrumb">
                <div className="container">
                    <ol className="breadcrumb align-items-center">
                        <li className="breadcrumb-item">
                            <Link href="/">
                                <span className="breadcrumb-link"> Home</span>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Franchise
                        </li>
                    </ol>
                </div>
            </nav>


            <div className="franchise-page">
                <div className="hero-section">
                    <h1>Become a Manmohan Furniture Franchise</h1>
                    <p>Join one of the fastest growing furniture brands in India</p>
                </div>
                <div className="container">
                    <div className="franchise-content-row">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="franchise-content">
                                    <h2>Why Partner With Us?</h2>
                                    <ul className="franchise-benefits">
                                        <li>Established and trusted brand with over X years of experience in the furniture industry</li>
                                        <li>Wide range of premium, modern and traditional furniture products</li>
                                        <li>End-to-end support: store setup, marketing, branding, training, and logistics</li>
                                        <li>Strong presence in the Indian market with growing customer base</li>
                                        <li>Attractive ROI & high profit margins on every sale</li>
                                        <li>Exclusive franchise territory with zero competition from other partners</li>
                                        <li>Latest technology integration for inventory & order management</li>
                                        <li>Flexible showroom designs tailored to your location and customer segment</li>
                                        <li>Dedicated support team to assist in daily operations and growth strategies</li>
                                        <li>Consistent marketing campaigns – both digital & offline to boost visibility</li>
                                        <li>Backed by customer satisfaction and repeat business across regions</li>
                                    </ul>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <form className="franchise-form" onSubmit={handleSubmit}>
                                    <h2>Apply for Franchise</h2>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="budget"
                                            placeholder="Investment Budget (e.g. ₹10-20 Lakhs)"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name="message"
                                            placeholder="Tell us more about yourself or your business plan"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                        />
                                    </div>
                                    <button type="submit" className="franchise-submit-btn">
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Franchise;
