"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdDelete } from "react-icons/md";
import Image from "next/image";
import "./CartSidebar.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  fetchCartItems,
  increaseQuantity,
  removeFromCart,
  safeJSONParse,
  setCartFromLocalStorage,
  updateQuantity,
} from "@/app/redux/slice/cartSlice";

const CartSidebar = ({ isOpen, onClose, cartItems = [], onRemoveItem }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/Pages/addtocart");
  };
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const { user, loading } = useSelector((state) => state.auth);
  const handleDecrease = async (productId, quantity) => {
    if (quantity === 1) return;
    if (user && user?.email) {
      try {
        await dispatch(
          updateQuantity({ productId: productId?._id, action: "decrease" })
        );
        dispatch(fetchCartItems());
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(decreaseQuantity({ productId }));
    }
  };

  const handleIncreaseQuantity = async (productId, quantity, stock) => {
    if (quantity === stock) return;
    if (user && user?.email) {
      try {
        await dispatch(
          updateQuantity({ productId: productId?._id, action: "increase" })
        );
        dispatch(fetchCartItems());
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(increaseQuantity({ productId }));
    }
  };
  const handleRemove = async (productId) => {
    if (user && user?.email) {
      try {
        const response = await axiosInstance.post(
          "/api/v1/cart/remove-from-cart",
          { productId: productId?._id }
        );

        dispatch(removeFromCart({ productId: productId?._id }));
      } catch (error) {
        console.log("error", error?.response?.data.message || error.message);
      }
    } else {
      dispatch(removeFromCart({ productId: productId }));
    }
  };
  const total = items.reduce((sum, item) => {
    const price =
      item?.finalPrice ??
      item?.productId?.finalPrice ??
      0; 
  
    return sum + price * (item?.quantity || 1);
  }, 0);
  useEffect(() => {
    if (loading) return;

    if (user && user?.email) {
      dispatch(fetchCartItems());
    } else {
      if (typeof window !== "undefined") {
        const cartData = localStorage.getItem("cart");
        const parsedCart = safeJSONParse(cartData);
        if (parsedCart && Array.isArray(parsedCart)) {
          dispatch(setCartFromLocalStorage(parsedCart));
        }
      }
    }
  }, [loading]);
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
                <>
                  <p className="text-muted text-center">Your cart is empty.</p>
                  <Image
                    src="/Empty.webp"
                    alt="Empty Cart"
                    width={400}
                    height={400}
                  />
                  <b>
                    What would you like to buy ? Pick From Our Best Selling
                    Categories
                  </b>
                  <p className="space-x-2">
                    <Link
                      href="/furniture"
                      className="hover:underline text-blue-600"
                    >
                      Furniture
                    </Link>
                    <span>||</span>
                    <Link
                      href="/sofas-seating"
                      className="hover:underline text-blue-600"
                    >
                      Sofas & Seating
                    </Link>
                    <span>||</span>
                    <Link
                      href="/kitchen-dining"
                      className="hover:underline text-blue-600"
                    >
                      Kitchen & Dining
                    </Link>
                  </p>
                </>
              ) : (
                items.map((item, index) => (
                  <div
                    className="cart-item border-bottom d-flex gap-3 py-3"
                    key={index}
                  >
                    <Image
                      src={item?.image || item?.productId?.images[0]}
                      width={130}
                      height={100}
                      alt={item?.name || item?.productId?.productName}
                      className="rounded"
                    />
                    <div className="flex-grow-1">
                      <p className="fw-semibold mb-2">{item?.name || item?.productId?.productName}</p>
                      <div className="quantity-box  d-flex align-items-center gap-4 mb-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleDecrease(item.productId, item.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{item?.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleIncreaseQuantity(
                              item.productId,
                              item.quantity,
                              item.stock
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <strong className="themeColor">₹{item?.finalPrice || item?.productId?.finalPrice}</strong>
                    </div>
                    <div className="d-grid justify-content-between mb-3">
                      <MdDelete
                        className="text-danger mb-2 fs-5 cursor-pointer"
                        onClick={() => handleRemove(item.productId)}
                      />

                      {/* <span>Total</span>
                      <strong className="themeColor">₹{total}</strong> */}
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
                <button
                  className="btn btn-success w-100 d-flex justify-content-center align-items-center gap-2"
                  onClick={handleClick}
                >
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

export default CartSidebar;
