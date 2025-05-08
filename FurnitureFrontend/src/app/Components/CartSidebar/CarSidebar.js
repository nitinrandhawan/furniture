"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdDelete } from "react-icons/md";
import Image from "next/image";
import "./CartSidebar.css";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // ✅ Correct for App Router


const CartSidebar = ({ isOpen, onClose, cartItems = [], onRemoveItem }) => {
  const [items, setItems] = useState([]);
    const router = useRouter();


        const handleClick = ()=>{
            router.push('/Pages/addtocart')
    
         
          }


  // Sync local state when cartItems prop changes
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
          }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    onRemoveItem(id); // inform parent
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="cart-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="cart-header text-center">
              <h5>
                Your cart <span className="text-muted">({items.length})</span>
              </h5>
              <MdClose className="close-icon" onClick={onClose} />
            </div>

            <div className="cart-body">
              {items.length === 0 ? (
                <><p className="text-muted text-center">Your cart is empty.</p>
                  <Image src="/Empty.webp" alt="Empty Cart" width={400} height={400} />
                  <b>What would you like to buy ? Pick From Our Best Selling Categories</b>
                  <p className="space-x-2">
                    <Link href="/furniture" className="hover:underline text-blue-600">Furniture</Link>
                    <span>||</span>
                    <Link href="/sofas-seating" className="hover:underline text-blue-600">Sofas & Seating</Link>
                    <span>||</span>
                    <Link href="/kitchen-dining" className="hover:underline text-blue-600">Kitchen & Dining</Link>
                  </p>
                </>
              ) : (
                items.map((item) => (
                  <div className="cart-item border-bottom d-flex gap-3 py-3" key={item.id}>
                    <Image
                      src={item.image}
                      width={130}
                      height={100}
                      alt={item.name}
                      className="rounded"
                    />
                    <div className="flex-grow-1">
                      <p className="fw-semibold mb-2">{item.name}</p>
                      <div className="quantity-box  d-flex align-items-center gap-4 mb-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <strong className="themeColor">₹{item.price}</strong>
                    </div>
                    <div className="d-grid justify-content-between mb-3">
                    <MdDelete
                      className="text-danger mb-2 fs-5 cursor-pointer"
                      onClick={() => handleRemove(item.id)}
                    />

                  <span>Total</span>
                  <strong className="themeColor">₹{total}</strong>
                </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="d-flex justify-content-between mb-3">
                  <span>Total</span>
                  <strong className="themeColor">₹{total}</strong>
                </div>
                <button className="btn btn-success w-100 d-flex justify-content-center align-items-center gap-2" onClick={handleClick}    >
                  PLACE ORDER
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar ;