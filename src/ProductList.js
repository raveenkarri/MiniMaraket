import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedArea, selectedCategory, selectedShop } = location.state;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/areas/${selectedArea}/${selectedCategory}/${selectedShop}`);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error); 
      }
    };

    if (selectedShop) {
      fetchProducts();
    }
  }, [selectedShop, selectedArea, selectedCategory]);

  const productHandler = (productName) => {
    if(productName){
      navigate('/product', {
        state: {
          producttoProductpage: productName,
          selectedAreaName: selectedArea,
          selectedCategoryName: selectedCategory,
          selectedShopName: selectedShop
        }
      });
    }
  };

  return (
    <div className="product-list">
      <h2>Products in Shop :{selectedShop}</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-item" key={index}>
            <img src={`http://localhost:5002/${product.image}`} alt={product.productname} />
            <button className="product-button" onClick={() => productHandler(product.productname)}>
              <h3>{product.productname}</h3>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
