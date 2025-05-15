'use client';
import React, { useEffect } from 'react';
import './footer.css';
import Image from 'next/image';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaWallet, FaLaptop, FaInstagramSquare, FaFacebookSquare, FaTwitterSquare,FaPinterest } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/app/redux/slice/categorySllice';
import { generateSlug } from '@/app/utils/generate-slug';


const Footer = () => {
  // useEffect(() => {
  //   AOS.init({ duration: 600 });
  // }, []);
  const dispatch=useDispatch()
const {categories} = useSelector((state) => state.category)

useEffect(() => {
  dispatch(fetchCategories())
}, [dispatch]);
  return (
    <footer className="footer text-dark">
      <div className="container Footersection">
        <div className="logoSection">
          <Image src="/logo.webp" alt="Manmohan Furnitures Logo" width={100} height={60} />
          <p className="logoText">
            Our website offers a wide range of products, including premium dupes that are not sold through authorized channels.
            However, we ensure top-notch quality at competitive prices, providing our customers with the best value.
          </p>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-3 col-6 mb-4">
          <div className='QuickLinkSec'>
          <h3 className="heading">Quick Links</h3>
            <ul className="list">
              <li><Link href="/Pages/Checkout">Shop</Link></li>
              <li><Link href="Components/faqs">FAQs</Link></li>
              {/* <li><Link href="/order-status">Check Order Status</Link></li> */}
              <li><Link href="https://wa.me/your-number">Join WhatsApp Community</Link></li>
              <li><Link href="https://instagram.com/yourpage" target="_blank">Follow us on Instagram</Link></li>
            </ul>
          </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
           <div className='BestSellersSec'>
           <h3 className="heading">Our Best Sellers</h3>
            <ul className="list innerListGrid">
              {
                categories?.slice(0, 5)?.map((category, index) => (
                  <li key={index}><Link href={`/Pages/category/${generateSlug(category?.categoryName, category?._id)}`}>{category?.categoryName}</Link></li>
                ))
              }
            </ul>
           </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
           <div className='CategoriesSec'>
           <h3 className="heading">Our Categories</h3>
            <ul className="list innerListGrid">
              <li><Link href="/category/earbuds">Earbuds & Headphones</Link></li>
              <li><Link href="/category/mobile-accessories">Mobile & Tablet Accessories</Link></li>
              <li><Link href="/category/men-watches">Men Wrist Watch</Link></li>
              <li><Link href="/category/women-watches">Women Wrist Watch</Link></li>
              <li><Link href="/category/massagers">Portable Massagers</Link></li>
              <li><Link href="/category/home-essentials">Home Essentials</Link></li>
              <li><Link href="/category/everyday">Everyday Essentials</Link></li>
            </ul>
           </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
         <div className='InformationSec'>
         <h3 className="heading">More Information</h3>
            <ul className="list">
              <li><Link href="/Pages/about-us">About Us</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/shipping-policy">Shipping Policy</Link></li>
              <li><Link href="/Pages/term-conditions">Terms & Conditions</Link></li>
              <li><Link href="/returns">Returns & Exchanges</Link></li>
              <li><Link href="/Pages/contact-us">Contact Us</Link></li>
            </ul>
         </div>
          </div>
        </div>


        <div className="footerBottomSec">
  <div className="bottomFlexWrapper d-flex flex-wrap justify-content-between">
    
    {/* Payment Methods */}
    <div className="paymentsec">
      <h4>We Accept</h4>
      <div className="d-flex gap-3 align-items-center">
        <Link href="#" aria-label="Visa" style={{ color: "brown" }}><FaCcVisa className="fs-1" /></Link>
        <Link href="#" aria-label="MasterCard" style={{ color: "darkblue" }}><FaCcMastercard className="fs-1" /></Link>
        <Link href="#" aria-label="Amex" style={{ color: "green" }}><FaCcAmex className="fs-1" /></Link>
        <Link href="#" aria-label="Wallet" style={{ color: "black" }}><FaWallet className="fs-1" /></Link>
        <Link href="#" aria-label="Net Banking" style={{ color: "#5b3917" }}><FaLaptop className="fs-1" /></Link>
      </div>
    </div>

    {/* Social Media Links */}
    <div className="SocialLinks d-grid">
      <h4 style={{fontSize:'14px' , marginTop:'0.5rem' , marginBottom:'0'}}>Like what you see? Follow us here</h4>
      <div className="socialMediaSec justify-content-center d-flex gap-3">
        <Link href="https://www.instagram.com/manmohanfurnitures/#" target="_blank" aria-label="Instagram" className="instagramicon">
          <FaInstagramSquare className="fs-1" />
        </Link>
        <Link href="https://www.facebook.com/ManmohanFurnitureshomedecor" target="_blank" aria-label="Facebook" className="facebookicon">
          <FaFacebookSquare className="fs-1" />
        </Link>
        <Link href="https://x.com/i/flow/login?redirect_after_login=%2FManmohanMMF" target="_blank" aria-label="Twitter" className="twittericon">
          <FaTwitterSquare className="fs-1" />
        </Link>
        <a href="https://in.pinterest.com/manmohanfurnitures/" target="_blank" aria-label="Pinterest">
          <FaPinterest className="fs-1" />
        </a>
      </div>
    </div>
  </div>
</div>

      </div> 

      <div className="text-center mt-4">
        <small>© {new Date().getFullYear()} Manmohan Furnitures. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
