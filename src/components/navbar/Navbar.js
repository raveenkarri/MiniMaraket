import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { contextStore } from "../..";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { token, setToken, itemsLen } = useContext(contextStore);
  const location = useLocation();
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/customers");
      if (res.data.user.username) {
        setUser(res.data.user.username);
      }
    };
    getUser();
  }, []);
  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to log out?");

    if (userConfirmed) {
      setToken("");
      navigate("/");
    } else {
      console.log("Can't logout!");
    }
  };
  const goToCart = () => {
    navigate("/mycart");
  };
  const pageNames = {
    "/": token
      ? `Hi ${user}, Welcome to the Home Page `
      : "Please login or register",
    "/shopregistration": "Register Your Shop Here",
    "/customer": "Customer Portal",
    "/login": "Login to Your Account",
    "/products": "Browse Our Products",
    "/productlist": "Select Products and place your order!!",
    "/product": "Product Details",
    "/mycart": "welcom to your cart",
  };
  const currentPageName = pageNames[location.pathname] || "Page";
  return (
    <nav className="navbar">
      <div className="navbar-logo-title">
        <img src="logo.jpg" alt="example" className="navbar-logo" />
        <div className="names">
          <h1 className="navbar-title">
            <i>
              <b>Mini Market</b>
            </i>
          </h1>
          <h3>{currentPageName}</h3>
        </div>
      </div>
      <div className="link-container">
        {token && (
          <>
            <button
              className="logout-button"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>

            <button className="cart-button " type="button" onClick={goToCart}>
              My Cart<i style={{ color: "blue" }}>({itemsLen})</i>
            </button>
          </>
        )}
        <Link id="home" className="home" to="/">
          <i className="fas fa-home home-icon"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
