// app/my-orders/page.jsx or wherever your page is
"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './MyOrder.css';

import pic1 from "@/app/Components/assets/icon1.jpg";
import pic2 from "@/app/Components/assets/icon2.webp";

const orders = [
  {
    id: "M-T1265",
    name: "Drawing Room Sofa",
    price: 5000,
    date: "20/12/2025",
    image: pic1,
  },
  {
    id: "M-T1266",
    name: "Luxury Chair Set",
    price: 3200,
    date: "18/12/2025",
    image: pic2,
  },
  {
    id: "M-T1267",
    name: "Elegant Coffee Table",
    price: 2500,
    date: "15/12/2025",
    image: pic2,
  },
];

const MyOrder = () => {
  return (
    <div className="container py-4">
      <div className="row g-4">
        {orders.map((order) => (
          <div className="col-md-6 col-12" key={order.id}>
            
              <div className="myproduct-div shadow p-3 rounded bg-white h-100">
                <div className="d-flex gap-3 align-items-center">
                  <div className="product-image">
                    <Image src={order.image} alt="product" width={100} height={100} className="rounded" />
                  </div>
                  <div className="myorder-product-details">
                    <h5 className="mb-1 text-dark">{order.name}</h5>
                    <p className="mb-1 text-muted">Order No: {order.id}</p>
                    <p className="mb-1 text-muted">₹{order.price}</p>
                    <p className="mb-0 text-muted">Buy Date: <b>{order.date}</b></p>
                    <Link href={`/Pages/my-order/${order.id}`} className="text-decoration-none">
                    <button className='btn themeColor mt-3 text-light'>View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
