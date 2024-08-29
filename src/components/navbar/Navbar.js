import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { contextStore } from "../..";
import Cookies from "js-cookie";
import { fetchUser, fetchCartItems } from "../../AxiosFunctions";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { token, setToken, itemsLen, setItemslen } = useContext(contextStore); // Include setItemslen

  const location = useLocation();

  useEffect(() => {
    const getUserAndCartItems = async () => {
      try {
        if (token) {
          const res = await fetchUser(token);

          setUser(res.user.username);

          // Fetch cart items and update itemsLen
          const cartRes = await fetchCartItems(token);
          setItemslen(cartRes.cartProducts.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserAndCartItems();
  }, [token]);

  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to log out?");
    if (userConfirmed) {
      setToken("");
      Cookies.remove("token");
      navigate("/");
    }
  };

  const goToCart = () => {
    navigate("/customer/mycart");
  };

  const pageNames = {
    "/": token
      ? `Hi ${user}, Welcome to the Home Page `
      : "Please login or register",
    "/retailer/shopregister": "Register Your Shop Here",
    "/retailer/shoplogin": "Login to your shop",
    "/retailer/myproducts": "Add your products",
    "/customer/logincustomer": "Login to Your Account...Or Register",
    "/customer/products": "Browse Our Products",
    "/customer/productlist": "Select Products and place your order!!",
    "/customer/product": "Product Details",
    "/customer/mycart": "Welcome to your cart",
  };

  const currentPageName = pageNames[location.pathname] || "Page";

  return (
    <div className="navbar">
      <div className="navbar-logo-title">
        <img src="/navbar-logo.jpg" alt="example" className="navbar-logo" />
        <div className="names">
          <h1 className="navbar-title">
            <i>
              <b>Mini Market</b>
            </i>
          </h1>
          <h2>{currentPageName}</h2>
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

            <button className="cart-button" type="button" onClick={goToCart}>
              My Cart
              <b>
                <i style={{ color: "red" }}>({itemsLen})</i>
              </b>
            </button>
          </>
        )}
        <Link
          id="home"
          className="home"
          to={token ? "/customer/products" : "/"}
        >
          <i className="fas fa-home home-icon"></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
