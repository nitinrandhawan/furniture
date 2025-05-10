// Navbar.js
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";
import { FaPhoneAlt, FaSearch, FaHeart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosPersonAdd } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import CartSidebar from "../CartSidebar/CarSidebar";
import { GoHomeFill } from "react-icons/go";
import { BsFilePlayFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { RiAccountBoxFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineContactSupport } from "react-icons/md";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";

const dropdownContentprev= {

  Furniture: {
    title: "Furniture Collection ",
    columns: [
      ["Living Room", "Bedroom", "Dining Room", "Home Office", "Outdoor"],
      ["Kids Furniture", "Accent Furniture", "Entertainment", "Bar Furniture", "Commercial"],
      ["Bookcases", "Cabinets", "Shelving", "Room Dividers", "Wall Units"],
      ["Furniture Sets", "Recliners", "Rocking Chairs", "Futons", "Ottomans"],
      ["Beds", "Dressers", "Nightstands", "Wardrobes", "Armoires"]
    ]
  },
  "Sofas & Seating": {
    title: "Sofas & Seating Collection",
    columns: [
      ["Sofas", "Sectionals", "Sleeper Sofas", "Loveseats", "Chaise Lounges"],
      ["Recliners", "Accent Chairs", "Armchairs", "Rocking Chairs", "Swivel Chairs"],
      ["Ottomans", "Benches", "Stools", "Poufs", "Bean Bags"],
      ["Sofa Beds", "Daybeds", "Futons", "Convertibles", "Murphy Chairs"],
      ["Outdoor Seating", "Patio Chairs", "Garden Benches", "Porch Swings", "Hammocks"]
    ]
  },
  Mattresses: {
    title: "Mattress Collection",
    columns: [
      ["Memory Foam", "Innerspring", "Hybrid", "Latex", "Pillow Top"],
      ["Gel Memory Foam", "Airbed", "Waterbed", "Adjustable", "Orthopedic"],
      ["King Size", "Queen Size", "Full Size", "Twin Size", "California King"],
      ["Mattress Toppers", "Mattress Pads", "Protectors", "Encasements", "Foundations"],
      ["Pillows", "Bed Frames", "Box Springs", "Bunkie Boards", "Headboards"]
    ]
  },
  "Home Decor": {
    title: "Home Decor Collection",
    columns: [
      ["Wall Art", "Mirrors", "Clocks", "Decorative Accents", "Candles"],
      ["Vases", "Figurines", "Sculptures", "Decorative Bowls", "Trays"],
      ["Throw Pillows", "Blankets", "Throws", "Quilts", "Bedspreads"],
      ["Rugs", "Doormats", "Floor Mats", "Carpets", "Runners"],
      ["Curtains", "Drapes", "Blinds", "Shades", "Valances"]
    ]
  },

  "Kitchen & Dining": {
    title: "Kitchen & Dining Collection",
    columns: [
      ["Dining Tables", "Dining Chairs", "Bar Stools", "Counter Stools", "Benches"],
      ["China Cabinets", "Buffets", "Sideboards", "Servers", "Carts"],
      ["Kitchen Islands", "Baker's Racks", "Pantry Storage", "Pot Racks", "Wine Racks"],
      ["Tableware", "Serveware", "Drinkware", "Flatware", "Barware"],
      ["Kitchen Storage", "Organizers", "Canisters", "Jars", "Containers"]
    ]
  }
};

const Navbar = () => {
  function formatToDropdownContent(apiData) {
    const dropdownContent = {};
  
    apiData.forEach((categoryData) => {
      const categoryName = categoryData.categories[0]?.categoryName || "Unnamed Category";
  
      const columns = categoryData.subCategories.map((subCat) => {
        const productNames = subCat.products.map((prod) => prod.productName);
        return [subCat.name, ...productNames]; // First item is subcategory name
      });
  
      dropdownContent[categoryName] = {
        title: `${categoryName} Collection`,
        columns,
      };
    });
  
    return dropdownContent;
  }
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Modern Sofa",
      image: "/icon1.jpg",
      price: 25000,
      quantity: 1,

    },
    {
      id: 2,
      name: "Wooden Chair",
      image: "/icon2.webp",
      price: 5500,
      quantity: 2,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const closeCart = () => setIsCartOpen(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);
const [dropdownContent, setDropdownContent] = useState(dropdownContentprev);
  const handleMouseEnter = (navItem) => {
    setActiveDropdown(navItem);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Dummy auth check: Replace this with your own logic
    const token = localStorage.getItem("token"); // suppose you store a token after login
    setIsLoggedIn(!!token);
  }, []);


  const fetchDropdownContent = async () => {
    try {
      const reponse = await axiosInstance.get("/api/v1/category/get-categories-with-subcategories-and-products")
     const formattedContent = await formatToDropdownContent(reponse.data.data);
      setDropdownContent(formattedContent);
    } catch (error) {
      console.log("Error fetching dropdown content:", error);
      toast.error("Failed to fetch dropdown content. Please try again.");
    }
  }

  useEffect(() => {
    fetchDropdownContent();
  }, []);
  return (
    <>
      <header className="main-navbar">
        {/* Top Navbar */}
        <div className="container-fluid">
          <div className="top-navbar d-flex justify-content-between align-items-center px-3 py-2 flex-wrap">
            <div className="left d-flex align-items-center gap-3 flex-wrap">
              <span className="fast-delivery">
                <TbTruckDelivery className="fs-2 helpline" /> Fast Delivery
              </span>
            </div>
            <div className="right d-flex text-dark align-items-center gap-3 flex-wrap">
              <span>

                <FaPhoneAlt className="fs-5 helpline" /> 011-46520774
              </span>

              <Link className="nav-link" href="/Pages/franchise">
                Become a Franchise
              </Link>
              <Link className="nav-link" href="/Pages/TrackOrder">
                Track Order
              </Link>
              <Link className="nav-link" href="/Pages/helpCenter">
                Help Center
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Navbar */}
        <div className="middle-navbar d-flex justify-content-between align-items-center px-3 py-3 flex-wrap">
          <div className="search-bar flex-grow-1 d-none d-md-block" style={{ maxWidth: "30%" }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Products, Colors & More .."
              />
              <span className="input-group-text bg-white">
                <FaSearch className="helpline" />
              </span>
            </div>
          </div>
          <div className="logo text-center mx-auto">
            <Link href="/">
              <Image src="/logo.webp" alt="Manmohan Furnitures" width={100} height={60} />
            </Link>
          </div>
          <div className="auth-section d-flex align-items-center justify-content-end gap-3">
            <div className="d-flex gap-2">
              <Link href={"/Pages/Signup"} className="btn btn-brown">
                SIGN UP
              </Link>
              <Link href={"/Pages/login"} className="btn btn-brown">
                LOGIN
              </Link>
            </div>
            <div className="d-grid align-items-center">
              <IoIosPersonAdd />
            </div>
            <Link href={"/Pages/Profile"} className="text-decoration-none text-dark">    <span>Profile</span></Link>

            <span>
              <Link href="/Pages/Wishlist" className="text-decoration-none text-dark">
                <FaHeart /> Wishlist (0)
              </Link>
            </span>
            {/* 🛒 Updated this line below: */}
            <span style={{ cursor: "pointer" }} onClick={() => setIsCartOpen(true)}>
              <MdShoppingCart /> Cart (2)
            </span>
          </div>
        </div>

        {/* Bottom Navbar */}
        <nav className="bottom-navbar navbar navbar-expand-lg navbar-light bg-light text-dark px-3">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {Object.keys(dropdownContent).map((navItem) => (
                <li
                  className="nav-item dropdown"
                  key={navItem}
                  onMouseEnter={() => handleMouseEnter(navItem)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link className="nav-link" href="#">
                    {navItem} <IoIosArrowDown />
                  </Link>
                  {activeDropdown === navItem && (
                    <div
                      className="mega-dropdown"
                      onMouseEnter={() => setActiveDropdown(navItem)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <h4>{dropdownContent[navItem].title}</h4>
                      <div className="dropdown-grid">
                        {dropdownContent[navItem].columns.map((column, colIndex) => (
                          <div className="dropdown-column" key={colIndex}>
                            {column.map((item, itemIndex) =>
                              itemIndex === 0 ? (
                                <span className="dropdown-item first-dropdown-item" key={itemIndex}>
                                  {item}
                                </span>
                              ) : (
                                <Link href="/Pages/Category" className="dropdown-item" key={itemIndex}>
                                  {item}
                                </Link>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
              <li className="nav-item">
                <Link className="nav-link" href="/Pages/products">
                  Furnishing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/Pages/All-category">
                  All Category
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Lamps & Lighting
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Luxury
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Modular
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* 🧾 Cart Sidebar component at the bottom */}
        <CartSidebar
          isOpen={isCartOpen}
          onClose={closeCart}
          cartItems={cartItems}
          onRemoveItem={(id) => {
            const updated = cartItems.filter(item => item.id !== id);
            setCartItems(updated);
          }}
        />

      </header>
      <div className="responsive-topbar">
        {/* First Row */}
        <div className="responsve-topbar-main d-flex align-items-center justify-content-between px-3 py-2">

          {/* Menu Button */}
          <div className="d-md-none">
            <button
              className="btn btn-brown"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <IoMenu className="fs-3" />
            </button>
          </div>

          {/* Logo Centered */}
          <div className="text-center flex-grow-1">
            <Link href="/">
              <Image src="/logo.webp" alt="Manmohan Furnitures" width={100} height={60} />
            </Link>
          </div>

          {/* Profile Icon Right */}
          <div className="text-center">
            {isLoggedIn ? (
              <Link href="/Pages/Wishlist">
                <FaRegHeart className="responsive-topbar-icons fs-2" />
                <br />
                <span>Wishlist</span>
              </Link>
            ) : (
              <Link href={"/Pages/Signup"}>
                <button className="btn btn-brown" style={{fontSize:'12px'}}>Sign Up</button>
              </Link>
            )}
          </div>
        </div>

        {/* Second Row - Search */}
        <div className="topbar-search">
          <input type="search" className="form-control" placeholder="Search..." />
        </div>

        {/* Mobile Menu Dropdown (Main Categories) */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <ul className="list-unstyled">
              <li onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={'/'}><CiHome /> Home</Link>
              </li>
              <li onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={'/Pages/about-us'}><IoIosInformationCircleOutline /> About</Link>
              </li>
              <li onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={'/Pages/contact-us'}><MdOutlineContactSupport /> Contact Us</Link>
              </li>
              <li onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={'/Pages/Category'}><BiCategoryAlt /> Category</Link>
              </li>
              <li onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={'/Pages/addtocart'}><CiShoppingCart /> Cart</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="responsive-navbar bottom-bar">
        <div className="responsive-main">
          <p><Link href={"/"}> <GoHomeFill className="responsive-icons" /> Home</Link></p>
          <p><Link href={"/Pages/videosec"}> <BsFilePlayFill className="responsive-icons" /> Video</Link></p>
          <p><Link href={"/Pages/Category"}> <BiSolidCategory className="responsive-icons" /> Category</Link></p>
          <p><Link href={"/Pages/Profile"}> <RiAccountBoxFill className="responsive-icons" /> Account</Link></p>
          <p><Link href={"/Pages/addtocart"}> <FaShoppingCart className="responsive-icons" /> Cart</Link></p>
        </div>
      </div>
    </>
  );
};

export default Navbar;