"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import pic1 from '@/app/Components/assets/icon1.jpg'
import './checkout.css'
import Link from 'next/link'

export default function Checkout() {
    let [cuppen, SetCuppen] = useState("")
    const [isSuccess, setIsSuccess] = useState("")
    const [hasAttempt, setHasAttempt] = useState(false)
    const handleApply = () => {
        setHasAttempt(true)
        if (cuppen === "Free20%") {
            setIsSuccess(true)
        } else {
            setIsSuccess(false)

        }
    }

    function ShowMessage() {
        alert("Your order has been confirmed successfully.");
    }

    return (
        <section>

            <nav aria-label="breadcrumb" className="prettyBreadcrumb">
                <div className="container">
                    <ol className="breadcrumb align-items-center mt-3">
                        <li className="breadcrumb-item">
                            <Link href="/">
                                <span className="breadcrumbLink">Home</span>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Checkout
                        </li>
                    </ol>
                </div>
            </nav>
            <div className='checkoutsec'>
                <div className='checkouttitle text-center'>
                    <p>Checkouts</p>
                </div>
                <div className='container'>
                    <div className='row'>
                        {/* Shipping Form */}
                        <div className='col-lg-7'>
                            <div className='shippingForm'>
                                <p>Shipping Address</p>
                                <hr />
                                <form>
                                    <div>
                                        <label>Name*</label>
                                        <input type="text" placeholder="Full Name" className='form-control' />
                                    </div>
                                    <div>
                                        <label>Phone*</label>
                                        <input type="text" placeholder="Phone Number" className='form-control' />
                                    </div>
                                    <div>
                                        <label>Address*</label>
                                        <input type="text" placeholder="Address" className='form-control' />
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>City*</label>
                                            <input type="text" placeholder="City" className='form-control' />
                                            <label>State*</label>
                                            <input type="text" placeholder="State" className='form-control' />
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Country*</label>
                                            <input type="text" placeholder="Country" className='form-control' />
                                            <label>Pin Code*</label>
                                            <input type="text" placeholder="Pin Code" className='form-control' />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='col-lg-5 orderSummary'>
                            <p>Order Summary</p>
                            <hr />
                            <div className="table-responsive">
                                <table className="table table-bordered text-center align-middle">
                                    <thead className="tabletheme">
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Image src={pic1} alt="Bed Pan Premium 2 in 1" height={100} width={100} />
                                            </td>
                                            <td>Bed Pan Premium 2 in 1</td>
                                            <td>$1222</td>
                                            <td>1</td>
                                            <td>$1222</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <table className="table table-bordered mt-4 checkout-total-table">
                                    <tbody>
                                        <tr>
                                            <td><strong>Sub-Total</strong></td>
                                            <td>$175</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Shipping</strong></td>
                                            <td>Free</td>
                                        </tr>
                                        <tr className="table-total-row">
                                            <td><strong>Total</strong></td>
                                            <td><strong>$175</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <input type="text" placeholder='Enter Voucher Code' className='form-control my-2' value={cuppen} onChange={(e) => SetCuppen(e.target.value)} />
                            <button className='btn btn-brown  w-100 mb-3' onClick={handleApply}>Apply</button>
                            {hasAttempt && (isSuccess ? <p className='text-primary'>Voucher is Successfully Apply</p> : <p className='text-danger'>Invalid  Voucher </p>)
                            }

                            <div>
                                <label><b>Payment Method</b></label>
                                <select className='form-control'>
                                    <option className='bg-secondary'>Select Option</option>
                                    <option className='bg-secondary'>Online</option>
                                    <option className='bg-secondary'>Cash On Delivery</option>
                                </select>
                                <button className='btn btn-brown w-100 mt-3 mb-3' onClick={ShowMessage}>Confirm Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
