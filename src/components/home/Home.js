import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { contextStore } from "../..";

function Home() {
  const { token } = useContext(contextStore);
  return (
    <div className="home-container">
      <div className="retailer">
        <h1 className="h1">Retailer</h1>
        <Link to="/shopregistration" className="button">
          Register my shop
        </Link>
      </div>
      <div className="customer">
        <h1 className="h1">Customer</h1>
        <Link to={token ? "/products" : "/login"} className="button">
          Buy Products
        </Link>
      </div>
    </div>
  );
}

export default Home;
