import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { contextStore } from "../..";

function Home() {
  const { token } = useContext(contextStore);
  return (
    <div className="home-container">
      <div className="home-retailer">
        <span className="home-retailer-name">Retailer</span>
        <p className="home-info">
          Please,
          <br />
          Register your shop...
          <br />
          <Link to="/retailer/shopregister">
            <h4 className="home-button">Register my shop</h4>
          </Link>
          Login to your Shop...
          <Link to="/retailer/shoplogin">
            <h4 className="home-button">Login to my shop</h4>
          </Link>
        </p>
      </div>
      <div className="vertical-line"></div>
      <div className="home-customer">
        <span className="home-customer-name">Customer</span>
        <p className="home-info">
          Please,
          <br /> Select your area and category,
          <br />
          and select your products and place order ..
        </p>
        <Link to={token ? "/products" : "/customer/logincustomer"}>
          <p className="home-button">Buy Products</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
