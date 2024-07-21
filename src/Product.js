import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Product.css'; 

const Product = () => {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const { producttoProductpage, selectedAreaName, selectedCategoryName, selectedShopName } = location.state;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/areas/${selectedAreaName}/${selectedCategoryName}/${selectedShopName}/${producttoProductpage}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (selectedShopName && selectedAreaName && selectedCategoryName && producttoProductpage) {
      fetchProduct();
    }
  }, [selectedShopName, selectedAreaName, selectedCategoryName, producttoProductpage]);

  return (
    <div className="product-container">
      {product ? (
        <div className="product-content">
          <img className="product-image" src={`http://localhost:5002/${product.image}`} alt={product.productname} />
          <div className="product-details">
            <h1>Prouct Name  :  {product.productname}</h1>
            <p>Description :  {product.description}</p>
            <p>Price : {product.cost}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;
