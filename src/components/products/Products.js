import React, { useState, useEffect } from "react";

import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { fetchAppAreas } from "../AxiosFunctions";

const CustomerView = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [shops, setShops] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      const res = await fetchAppAreas();
      setAreas(res);
    };
    fetchAreas();
  }, []);

  const areaHandler = (selectedOption) => {
    setSelectedArea(selectedOption);
    setSelectedCategory("");
    setSelectedShop("");
  };

  const categoryHandler = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSelectedShop("");
    const area = areas.find((area) => area.areaname === selectedArea.value);
    const category = area.categories.find(
      (cat) => cat.category === selectedOption.value
    );
    setShops(category.shops);
  };

  const shopHandler = (event) => {
    setSelectedShop(event.target.value);
    if (event.target.value) {
      navigate("/productlist", {
        state: {
          selectedArea: selectedArea.value,
          selectedCategory: selectedCategory.value,
          selectedShop: event.target.value,
        },
      });
    }
  };

  // Custom styles for the react-select component
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
    }),
  };

  return (
    <div>
      <div className="">
        <form>
          <div>
            <h1 style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}>
              Select Your Area and Shop:
            </h1>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              value={selectedArea}
              onChange={areaHandler}
              options={areas.map((area) => ({
                value: area.areaname,
                label: area.areaname,
              }))}
              placeholder="Search Area"
              styles={customStyles}
            />
          </div>
          <div>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              value={selectedCategory}
              onChange={categoryHandler}
              options={areas
                .find(
                  (area) =>
                    area.areaname === (selectedArea ? selectedArea.value : "")
                )
                ?.categories.map((cat) => ({
                  value: cat.category,
                  label: cat.category,
                }))}
              placeholder="Search Category"
              isDisabled={!selectedArea}
              styles={customStyles}
            />
          </div>
          <div>
            <select value={selectedShop} onChange={shopHandler}>
              <option value="">select a shop</option>
              {shops.map((shop) => {
                return (
                  <option key={shop.shopname} value={shop.shopname}>
                    {shop.shopname}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerView;
