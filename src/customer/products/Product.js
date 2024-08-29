import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Product.css";
import axios from "axios";
import { contextStore } from "../..";
import { fetchAddCartItems } from "../../AxiosFunctions";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { token, setItemslen } = useContext(contextStore);
  const location = useLocation();
  const {
    selectedProduct,
    selectedAreaName,
    selectedCategoryName,
    selectedShopName,
  } = location.state;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `/shops/${selectedAreaName}/${selectedCategoryName}/${selectedShopName}`
        );

        let products = res.data.shops[0].products;
        const filteredProduct = products.filter(
          (product) => product.productname === selectedProduct
        );

        if (filteredProduct.length > 0) {
          setProduct(filteredProduct);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [
    selectedShopName,
    selectedAreaName,
    selectedCategoryName,
    selectedProduct,
  ]);

  const addtoCart = async () => {
    if (product.length === 0) return;

    const cartProduct = {
      productname: product[0].productname,
      cost: product[0].cost,
      description: product[0].description,
      imageUrl: product[0].imageUrl,
    };

    try {
      const res = await fetchAddCartItems(cartProduct, token);
      setItemslen((prev) => prev + 1);
      alert(res.message);
    } catch (error) {
      alert("Item adding failed");
    }
  };

  return (
    <div className="product-container">
      {product.length > 0 ? (
        <div className="product-content">
          <img
            className="product-image"
            src={product[0].imageUrl}
            alt={product[0].productname}
          />
          <div className="product-details">
            <h1>Product Name: {product[0].productname}</h1>
            <p>Description: {product[0].description}</p>
            <p>Price: {product[0].cost}</p>
            <button
              className="product-addToCart"
              type="button"
              onClick={addtoCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;
