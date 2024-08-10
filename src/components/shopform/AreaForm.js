import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./areaform.css";

const AreaForm = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [imageFiles, setImageFiles] = useState([]); // State to store selected image files

  const initialFormData = {
    areaname: "",
    category: "",
    shopname: "",
    products: [{ productname: "", cost: "", description: "", image: "" }],
  };

  const [formData, setFormData] = useState(initialFormData);

  const fetchAreas = async () => {
    const res = await axios.get("/areas");
    setAreas(res.data);
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const areaHandler = (selectedOption) => {
    setSelectedArea(selectedOption);
    setFormData({
      ...formData,
      areaname: selectedOption ? selectedOption.value : "",
    });
    setSelectedCategory(null);
    setSelectedShop(null);
  };

  const categoryHandler = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setFormData({
      ...formData,
      category: selectedOption ? selectedOption.value : "",
    });
  };

  const shopHandler = (selectedOption) => {
    setSelectedShop(selectedOption);
    setFormData({
      ...formData,
      shopname: selectedOption ? selectedOption.value : "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toUpperCase() });
  };

  const handleProductChange = (index, e) => {
    const newProducts = formData.products.map((product, i) => {
      if (i === index) {
        return { ...product, [e.target.name]: e.target.value };
      }
      return product;
    });
    setFormData({ ...formData, products: newProducts });
  };

  const handleImageChange = (index, e) => {
    const files = e.target.files;
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = files[0];
    setImageFiles(newImageFiles);

    const newProducts = formData.products.map((product, i) => {
      if (i === index) {
        return { ...product, image: files[0].name };
      }
      return product;
    });
    setFormData({ ...formData, products: newProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("areaname", formData.areaname);
    data.append("category", formData.category);
    data.append("shopname", formData.shopname);
    formData.products.forEach((product, index) => {
      data.append(`products[${index}][productname]`, product.productname);
      data.append(`products[${index}][cost]`, product.cost);
      data.append(`products[${index}][description]`, product.description);
      if (imageFiles[index]) {
        data.append("images", imageFiles[index]); // Append the image file
      }
    });

    try {
      const response = await axios.post("/areas", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Submitted successfully!");
      console.log(response.data);
      // Reset form data to initial state
      setFormData({
        products: [{ productname: "", cost: "", description: "", image: "" }],
      });

      fetchAreas();
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
    }),
  };

  return (
    <div className="container">
      <div className="select-container">
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
              placeholder="Select Area"
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
              placeholder="Select Category"
              styles={customStyles}
              isDisabled={!selectedArea}
            />
          </div>
          <div>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              value={selectedShop}
              onChange={shopHandler}
              options={areas
                .find(
                  (area) =>
                    area.areaname === (selectedArea ? selectedArea.value : "")
                )
                ?.categories.find(
                  (cat) =>
                    cat.category ===
                    (selectedCategory ? selectedCategory.value : "")
                )
                ?.shops.map((shop) => ({
                  value: shop.shopname,
                  label: shop.shopname,
                }))}
              placeholder="Select Shopname"
              styles={customStyles}
              isDisabled={!selectedCategory}
            />
          </div>
        </form>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <h1 style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}>
          For Adding new area and shop:
        </h1>
        <div>
          <label className="label">Area Name:</label>
          <input
            className="input"
            type="text"
            name="areaname"
            value={formData.areaname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Category:</label>
          <input
            className="input"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Shop Name:</label>
          <input
            className="input"
            type="text"
            name="shopname"
            value={formData.shopname}
            onChange={handleChange}
            required
          />
        </div>
        {formData.products.map((product, index) => (
          <div key={index}>
            <div>
              <label className="label">Product Name:</label>
              <input
                className="input"
                type="text"
                name="productname"
                value={product.productname}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="label">Cost:</label>
              <input
                className="input"
                type="number"
                name="cost"
                value={product.cost}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="label">Description:</label>
              <input
                className="input"
                type="text"
                name="description"
                value={product.description}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="label">Image:</label>
              <input
                className="inputimage"
                type="file"
                name="image"
                onChange={(e) => handleImageChange(index, e)}
                required
              />
            </div>
          </div>
        ))}

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AreaForm;
