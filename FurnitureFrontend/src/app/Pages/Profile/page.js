"use client";
import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import "./profile.css";
import pic1 from "@/app/Components/assets/icon1.jpg";
import pic2 from "@/app/Components/assets/icon2.webp";
import { FaUser, FaShoppingBag, FaMapMarkerAlt, FaCog } from "react-icons/fa";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [avatar, setAvatar] = useState("/User.jpg");
  const fileInputRef = useRef(null);

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const dataSubmit = (e) => {
    e.preventDefault();
    console.log("Address Details:", { address, pincode, city });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo />;
      case "orders":
        return <Orders />;
      case "address":
        return (
          <Address
            address={address}
            setAddress={setAddress}
            pincode={pincode}
            setPincode={setPincode}
            city={city}
            setCity={setCity}
            dataSubmit={dataSubmit}
          />
        );
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Admin Profile UI</title>
      </Head>
      <div className="container-fluid profile-layout">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 sidebar p-4 text-white d-flex flex-column justify-content-between">
            <div>
              <div className="text-center mb-4">
                <div className="profile-avatar-container">
                  <Image
                    src={avatar}
                    alt="Avatar"
                    width={90}
                    height={90}
                    className="rounded-circle profile-avatar mb-2"
                  />
                  <div className="change-icon" onClick={triggerFileInput}>
                    +
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
                <h6 className="mb-0">Mukesh Mahar</h6>
                <small>mukeshmahar00@gmail.com</small><br />
                <small>Delhi India</small>
              </div>

              <ul className="nav flex-column mt-4">
                <li className="nav-item" onClick={() => setActiveTab("profile")}>
                  <a className={`nav-link ${activeTab === "profile" ? "active" : ""}`}>
                    <FaUser /> Profile Info
                  </a>
                </li>
                <li className="nav-item" onClick={() => setActiveTab("orders")}>
                  <a className={`nav-link ${activeTab === "orders" ? "active" : ""}`}>
                    <FaShoppingBag /> Orders
                  </a>
                </li>
                <li className="nav-item" onClick={() => setActiveTab("address")}>
                  <a className={`nav-link ${activeTab === "address" ? "active" : ""}`}>
                    <FaMapMarkerAlt /> Address
                  </a>
                </li>
                <li className="nav-item" onClick={() => setActiveTab("settings")}>
                  <a className={`nav-link ${activeTab === "settings" ? "active" : ""}`}>
                    <FaCog /> Settings
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <button className="btn btn-secondary  w-100 mt-4">Logout</button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 p-4">
            <div className="content-area">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

// Profile Info Component
const ProfileInfo = () => (
  <div className="container">
   <div className="m-5">
   <h4 className="text-center text-secondary">Profile Info</h4>
    <ul className="list-group">
      <li className="list-group-item">
        <strong>Email: </strong><span className="text-success">mukeshmahar00@gmail.com</span>
      </li>
      <li className="list-group-item">
        <strong>Phone: </strong><span className="text-warning">7827433944</span>
      </li>
    </ul>
   </div>
  </div>
);

// Orders Component
const Orders = () => (
  <div className="d-flex flex-wrap">
    <div className="card ms-5 mt-3 " style={{ maxWidth: "585px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <Image src={pic1} className="img-fluid " alt="Order1" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Drawing Room Sofa</h5>
            <ul className="list-group">
              <b>Order No: M-T1265</b>
              <li className="list-group-item">
                12345 - ₹5000 - <span className="text-success">Delivered</span>
              </li>
            </ul>
            <p className="card-text">This is a wider sofa.</p>
            <p className="card-text">
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="card ms-5 mt-3" style={{ maxWidth: "585px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <Image src={pic2} className="img-fluid rounded-start" alt="Order2" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Double Bed</h5>
            <ul className="list-group">
              <b>Order No: M-T1299</b>
              <li className="list-group-item">
                12345 - ₹5000 - <span className="text-warning">Pending</span>
              </li>
            </ul>
            <p className="card-text">This is a double bed with supporting .</p>
            <p className="card-text">
              <small className="text-body-secondary">Last updated 18 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Address Component (UPDATED)
const Address = ({ address, setAddress, pincode, setPincode, city, setCity }) => {
  const [editMode, setEditMode] = useState(false);

  const [tempAddress, setTempAddress] = useState(address);
  const [tempPincode, setTempPincode] = useState(pincode);
  const [tempCity, setTempCity] = useState(city);

  const handleEdit = () => {
    setTempAddress(address);
    setTempPincode(pincode);
    setTempCity(city);
    setEditMode(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAddress(tempAddress);
    setPincode(tempPincode);
    setCity(tempCity);
    setEditMode(false);
  };

  return (
    <div className="container">
      <div className="card shadow p-4 mb-5">
        <h4 className="mb-4 text-primary">Address Details</h4>

        {!editMode ? (
          <>
            <div className="table-responsive mb-4">
              <table className="table table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Address</th>
                    <th>Pin Code</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{address || "-"}</td>
                    <td>{pincode || "-"}</td>
                    <td>{city || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-end">
              <button className="btn btn-warning" onClick={handleEdit}>
                Edit Address
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Name"
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pin Code"
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City Name"
                  value={tempCity}
                  onChange={(e) => setTempCity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-3 text-end">
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Settings Component
// Settings Component
const Settings = () => {
  const [name, setName] = useState("Mukesh Mahar");
  const [email, setEmail] = useState("mukeshmahar00@gmail.com");
  const [phone, setPhone] = useState("7827433944");
  const [password, setPassword] = useState("");

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Account Settings:", { name, email, phone, password });
    // Here you can call an API to save updated settings
  };

  return (
    <div className="container">
      <div className="card shadow p-4">
        <h4 className="mb-4 text-primary">⚙️ Account Settings</h4>
        <form onSubmit={handleSettingsSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* <div className="col-md-6 mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div> */}
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
