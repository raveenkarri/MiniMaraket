import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "./productlist.css";
import { fetchAppProducts } from "../AxiosFunctions";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedArea, selectedCategory, selectedShop } = location.state;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchAppProducts(
          selectedArea,
          selectedCategory,
          selectedShop
        );
        setProducts(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (selectedShop) {
      fetchProducts();
    }
  }, [selectedShop, selectedArea, selectedCategory]);

  const productHandler = (productName) => {
    if (productName) {
      navigate("/product", {
        state: {
          selectedProduct: productName,
          selectedAreaName: selectedArea,
          selectedCategoryName: selectedCategory,
          selectedShopName: selectedShop,
        },
      });
    }
  };

  return (
    <div className="product-list">
      <h2>Products in Shop :{selectedShop}</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-item" key={index}>
            <img
              src={`https://mini-market-api.onrender.com/${product.image}`}
              alt={product.productname}
            />
            <button
              className="product-button"
              onClick={() => productHandler(product.productname)}
            >
              <h3>{product.productname}</h3>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
