import React, { useState, useEffect } from "react";
import "./products.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { fetchAppAreas } from "../../AxiosFunctions";

const CustomerView = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      const res = await fetchAppAreas();
      setAreas(res.Shops);
    };
    fetchAreas();
  }, []);

  const areaHandler = (selectedOption) => {
    setSelectedArea(selectedOption);
    setSelectedCategory("");
    setShops([]);
  };

  const categoryHandler = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setShops([]);
  };

  const shopHandler = () => {
    const filteredShops = areas.filter(
      (area) =>
        area.areaname === selectedArea?.value &&
        area.category === selectedCategory?.value
    );
    setShops(filteredShops);
  };

  const handleBuyProductsClick = (shopname) => {
    navigate("/customer/productlist", {
      state: {
        selectedAreaName: selectedArea.value,
        selectedCategoryName: selectedCategory.value,
        selectedShopName: shopname,
      },
    });
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
    }),
  };

  return (
    <div className="products-container">
      {/* Form Section */}
      <div>
        <form>
          <h1>Select Your Area and Shop:</h1>
          <hr />
          <div className="products-select-container">
            <Select
              value={selectedArea}
              onChange={areaHandler}
              options={[
                ...new Set([...areas.map((area) => area.areaname)]),
              ]?.map((area) => ({
                value: area,
                label: area,
              }))}
              placeholder="Search Area"
              styles={customStyles}
            />
          </div>
          <div className="products-select-container">
            <Select
              value={selectedCategory}
              onChange={categoryHandler}
              options={[
                ...new Set(
                  areas
                    .filter((area) => area.areaname === selectedArea?.value)
                    ?.map((area) => area.category)
                ),
              ]?.map((category) => ({
                value: category,
                label: category,
              }))}
              placeholder="Search Category"
              isDisabled={!selectedArea}
              styles={customStyles}
            />
          </div>
          <div className="products-select-container">
            <button
              className="button-products"
              type="button"
              onClick={shopHandler}
            >
              Find Shops
            </button>
          </div>
        </form>
      </div>

      {/* Shops List Section */}
      <div>
        <ul className="shops-list">
          {shops.map((shop) => (
            <li key={shop.id} className="shop-item">
              <img
                src={shop.shopImage}
                alt="Shop"
                onClick={() => handleBuyProductsClick(shop.shopname)}
                style={{ cursor: "pointer" }}
              />
              <h3>{shop.shopname}</h3>
              <button onClick={() => handleBuyProductsClick(shop.shopname)}>
                Buy Products
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerView;
