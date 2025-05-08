import React from 'react'
import image1 from "@/app/Components/assets/icon1.jpg"
import image2 from "@/app/Components/assets/icon2.webp"
import image3 from "@/app/Components/assets/icon3.webp"
import image4 from "@/app/Components/assets/icon4.jpg"
import image5 from "@/app/Components/assets/icon6.webp"
import image6 from "@/app/Components/assets/icon7.webp"
import image7 from "@/app/Components/assets/icon8.jpg"
import Image from 'next/image'
import Link from 'next/link'
import AllProducts from '@/app/Components/all-products/page'
import './category.css'

const page = () => {
    const categories = [
        {
            productImage: image1,
            productName: "Sofa Set",
        },
        {
            productImage: image2,
            productName: "Dining Table",
        },
        {
            productImage: image3,
            productName: "Chairs",
        },
        {
            productImage: image4,
            productName: "Cabinets",
        },
        {
            productImage: image5,
            productName: "Countertops",
        },
        {
            productImage: image6,
            productName: "Bar Stools",
        },
        {
            productImage: image7,
            productName: "Storage",
        },
    ]
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
                            All Categories
                        </li>
                    </ol>
                </div>
            </nav>
            <div className='category-page'>
                <div className='container'>
                    <div className='heading-section'>
                        <h1 className='text-center'>All Furnitures</h1>
                        <hr />
                        <p className='text-center'>Explore our wide range of kitchen furniture, designed to enhance your cooking and dining experience. From stylish cabinets to comfortable dining sets, we have everything you need to create the perfect kitchen.</p>
                    </div>
                    <div className='row'>
                        {categories.map((category, index) => (
                            <div className='col-lg-2 col-md-3 col-sm-4 col-4' key={index}>
                                <div className='category-card imageSec '>
                                    <Link href='/Pages/SubCategory'>
                                        <Image
                                            src={category.productImage}
                                            alt={category.productName}
                                            className='img-fluid'
                                            width={200}
                                            height={200}
                                        />
                                        <h5 className='category-product-nam'>{category.productName}</h5>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="AdvertisementSec container-fluid p-3">
                <div className="position-relative w-100" style={{ height: '200px' }}>
                    <Image
                        src="/advertisement.jpg"
                        alt="Advertisement Image"
                        layout="fill"
                        objectFit="cover"
                        className="img-fluid"
                        priority
                    />
                </div>
            </div> */}

            {/* <Product /> */}
            <AllProducts />





        </>
    )
}

export default page