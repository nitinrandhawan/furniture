import React from 'react';
import styles from './wishlist.css';
import { FaTrashAlt, FaFacebookF, FaTwitter, FaPinterestP, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosHeartEmpty } from "react-icons/io";

const wishlistItems = [
  {
    id: 1,
    name: "Sofa Set",
    image: "/icon1.jpg",
    price: "$14.99",
    discountPrice: "$13.49",
    stock: "In Stock",
    date: "June 17, 2024",
    isVariable: false,
  },
  {
    id: 2,
    name: "Sofa cum Bed",
    image: "/icon2.webp",
    price: "$18.00",
    stock: "In Stock",
    date: "June 17, 2024",
    isVariable: true,
  },
  {
    id: 3,
    name: "Book Shelves",
    image: "/icon3.webp",
    price: "$104.99",
    stock: "In Stock",
    date: "June 17, 2024",
    isVariable: false,
  },
  {
    id: 4,
    name: "Coffee Table",
    image: "/icon4.jpg",
    price: "$12.99 – $14.99",
    stock: "In Stock",
    date: "June 17, 2024",
    isVariable: true,
  },
];

const Page = () => {
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
             Wishlist
            </li>
          </ol>
        </div>
      </nav>

      <div className={styles.wishtlistMain}>
        <div className="container">
          <div className="text-center pt-2">
            <IoIosHeartEmpty className='wishlighicon' />
            <h1 className='text-center'>My Wishlist</h1>
          </div>

          {/* Desktop Table View */}
          <div className='d-none d-md-block'>
            <table className={`table table-bordered ${styles.wishlistTable}`}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Product Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Stock Status</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {wishlistItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.id}
                    </td>
                    <td className="d-flex align-items-center gap-3">
                      <Image
                        src={item.image}
                        width={60}
                        height={60}
                        alt={item.name}
                        className={styles.productImg}
                      />
                      {item.name}
                    </td>
                    <td>
                      {item.discountPrice ? (
                        <>
                          <del className="text-muted me-2">{item.price}</del>
                          <span className="fw-semibold">{item.discountPrice}</span>
                        </>
                      ) : (
                        <span>{item.price}</span>
                      )}
                    </td>
                    <td>
                      <span>{item.stock}</span>
                    </td>
                    <td>
                      <button className={`btn btn-sm text-light actionBtn mt-2 ${styles.actionBtn}`}>
                        Add to cart
                      </button>
                    </td>
                    <td className="text-center">
                      <FaTrashAlt className={styles.trashIcon} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - 2 per row */}
          <div className='d-md-none py-3'>
            <div className='row g-3'>
              {wishlistItems.map(item => (
                <div className='col-6' key={item.id}>
                  <div className={`card h-100 ${styles.wishlistCard}`}>
                    <div className="card-body wishlist-card-body">
                      <div className="text-center">
                        <Image
                          src={item.image}
                          width={120}
                          height={120}
                          alt={item.name}
                          className={`${styles.mobileProductImg} mb-2`}
                        />
                        <h5 className="mb-1 ">{item.name}</h5>
                        <p className="mb-1">
                          {item.discountPrice ? (
                            <>
                              <del className="text-muted me-2">{item.price}</del>
                              <span className="fw-semibold">{item.discountPrice}</span>
                            </>
                          ) : (
                            <span>{item.price}</span>
                          )}
                        </p>
                      </div>
                      <FaTrashAlt className="trashIcon" />
                      <div className=" text-center">
                        <p className="m-0"><small className="text-success">{item.stock}</small></p>
                        <p className="m-0"><small>Added on: {item.date}</small></p>
                        <div className="d-flex flex-column align-items-center">
                          {/* <input
                            type="number"
                            defaultValue={1}
                            className={`form-control text-center mb-2 ${styles.quantityInput}`}
                          /> */}
                          <button className={`btn btn-sm text-light w-100 actionBtn`}>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className={`d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4 mb-3 ${styles.shareSection}`}>
            <div className="d-flex gap-3 align-items-center">
              <strong>Share on:</strong>
              <FaFacebookF className={styles.socialIcon} />
              <FaTwitter className={styles.socialIcon} />
              <FaPinterestP className={styles.socialIcon} />
              <FaEnvelope className={styles.socialIcon} />
              <FaWhatsapp className={styles.socialIcon} />
            </div>
            <div className="d-flex gap-2">
              <button className={`btn text-light actionBtn ${styles.addAllBtn}`}>
                ADD ALL TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;