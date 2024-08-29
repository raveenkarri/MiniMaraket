import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./myProducts.css"; // Import the CSS file
import { Link } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState([]);
  const [token, setToken] = useState(Cookies.get("shopToken"));

  useEffect(() => {
    fetchProdcuts();
  }, []);

  const fetchProdcuts = async () => {
    try {
      const res = await axios.get("/shops/myshop", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setShop(res.data.shop);
      console.log(res.data.shop.products);
      setProducts(res.data.shop.products);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      const confirmDelete = window.confirm(
        "Sure! you want to delete this Product?"
      );
      if (confirmDelete) {
        const res = await axios.delete(`/shops/deleteproduct/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        alert(res.data.message);
        fetchProdcuts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="myProducts-container">
      <div className="myProducts-header">
        <div className="shop-info">
          <h2>Hi {shop.username},</h2>
          <h1>Welcome to {shop.shopname}</h1>
        </div>
        <button className="add-product-button">Add Product</button>
      </div>
      <ul className="myProducts-list">
        {products.map((product) => (
          <li key={product._id} className="myProducts-item">
            <img src={product.imageUrl} alt={product.productname} />
            <div className="myProducts-item-details">
              <h3>{product.productname}</h3>
              <p className="myProducts-price">₹{product.cost}</p>
              <p>{product.description}</p>
              <button className="update-button">Update</button>
              <button
                className="delete-button"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;
