import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "./productlist.css";
import { fetchAppProducts } from "../../AxiosFunctions";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAreaName, selectedCategoryName, selectedShopName } =
    location.state;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `/shops/${selectedAreaName}/${selectedCategoryName}/${selectedShopName}`
        );

        console.log(res.data.shops[0].products);

        setProducts(res.data.shops[0].products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (selectedShopName) {
      fetchProducts();
    }
  }, [selectedShopName, selectedAreaName, selectedCategoryName]);

  const productHandler = (productName) => {
    if (productName) {
      navigate("/customer/product", {
        state: {
          selectedProduct: productName,
          selectedAreaName: selectedAreaName,
          selectedCategoryName: selectedCategoryName,
          selectedShopName: selectedShopName,
        },
      });
    }
  };

  return (
    <div className="ptoductlist-main">
      <h2>Welcome to {selectedShopName} shop:</h2>
      <hr></hr>
      <div className="productlist-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="productlist-item" key={index}>
              <button
                className="productlist-imagebutton"
                onClick={() => productHandler(product.productname)}
              >
                <img src={product.imageUrl} alt={product.productname} />
              </button>
              <button
                className="productlist-button"
                onClick={() => productHandler(product.productname)}
              >
                {product.productname}
              </button>
            </div>
          ))
        ) : (
          <h1>No products Found in this Shop!</h1>
        )}
      </div>
    </div>
  );
};

export default ProductList;
