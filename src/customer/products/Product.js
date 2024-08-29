import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Product.css";
import axios from "axios";
import { contextStore } from "../..";
import { fetchAddCartItems, fetchSingleProduct } from "../../AxiosFunctions";

const Product = () => {
  const [product, setProduct] = useState(null);
  const { token, setItemslen } = useContext(contextStore);
  const location = useLocation();
  const {
    selectedProduct,
    selectedAreaName,
    selectedCategoryName,
    selectedShopName,
  } = location.state;
  const [cartProducts, setCartProducts] = useState({
    productname: " ",
    cost: null,
    description: " ",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `/shops/${selectedAreaName}/${selectedCategoryName}/${selectedShopName}`
        );
        console.log(res);
        console.log(location.state);

        let products = res.data.shops[0].products;
        console.log({ products });
        setProduct(
          products.filter((product) => product.productname === selectedProduct)
        );

        //setProduct(res.data.shops[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // if (
    //   selectedselctedShopName &&
    //   selectedAreaName &&
    //   selectedCategoryName &&
    //   selectedProduct
    // ) {
    fetchProduct();
    // }
  }, [
    selectedShopName,
    selectedAreaName,
    selectedCategoryName,
    selectedProduct,
  ]);

  const addtoCart = async () => {
    try {
      const res = await fetchAddCartItems(cartProducts, token);
      // Set cartProducts after product is fetched
      setCartProducts({
        productname: product[0].productname,
        cost: product[0].cost,
        description: product[0].description,
        imageUrl: product[0].imageUrl,
      });
      setItemslen((prev) => prev + 1);
      alert(res.message);
    } catch (error) {
      alert("Item adding failed");
    }
  };
  return (
    <div className="product-container">
      {product ? (
        <div className="product-content">
          <img
            className="product-image"
            src={product[0].imageUrl}
            alt={product[0].productname}
          />
          <div className="product-details">
            <h1>Prouct Name : {product[0].productname}</h1>
            <p>Description : {product[0].description}</p>
            <p>Price : {product.cost}</p>
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
