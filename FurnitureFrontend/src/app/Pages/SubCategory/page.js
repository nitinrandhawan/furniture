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
import './subcategory.css'

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
            <div className='category-page'>
                <div className='container'>
                    <div className='heading-section'>
                        <h1 className='text-center'>Sub Category</h1>
                        <hr />
                        <p className='text-center'>Explore our wide range of kitchen furniture, designed to enhance your cooking and dining experience.</p>
                    </div>
                    <div className='row'>
                        {categories.map((category, index) => (
                            <div className='col-lg-2 col-md-3 col-sm-4 col-4' key={index}>
                                <div className='category-card imageSec '>
                                    <Link href='/Pages/products'>
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

            <AllProducts />





        </>
    )
}

export default page;