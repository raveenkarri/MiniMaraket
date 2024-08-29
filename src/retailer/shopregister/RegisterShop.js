import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./registerShop.css";
import { IKUpload, IKContext } from "imagekitio-react";
import { fetchAppAreas } from "../../AxiosFunctions";

const RegisterShop = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const initialFormData = {
    username: "",
    password: "",
    areaname: "",
    category: "",
    shopname: "",
    shopImage: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAreas = async () => {
    const res = await fetchAppAreas();
    setAreas(res.Shops);
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    if (isSubmitting && formData.shopImage) {
      submitForm();
    }
  }, [formData.shopImage]);

  const areaHandler = (selectedOption) => {
    setSelectedArea(selectedOption);
    setFormData({
      ...formData,
      areaname: selectedOption ? selectedOption.value : "",
    });
    setSelectedCategory(null);
  };

  const categoryHandler = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setFormData({
      ...formData,
      category: selectedOption ? selectedOption.value : "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.shopImage) {
      submitForm();
    }
  };

  const submitForm = async () => {
    try {
      const response = await axios.post("/shops/addshop", formData);
      alert("Submitted successfully!");
      console.log(response.data);
      fetchAreas();
      setFormData(initialFormData);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const clearHandler = () => {
    setSelectedArea("");
    setSelectedCategory("");
    setFormData(initialFormData);
  };

  const urlEndpoint = "https://ik.imagekit.io/fsbc1hx6u";
  const publicKey = "public_Fz5mhywWLJl5zB0i0lISiFEsUYM=";

  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:5005/auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err) => {
    console.log("Error", err);
    setIsSubmitting(false);
  };

  const onSuccess = (res) => {
    setFormData((prevState) => ({
      ...prevState,
      shopImage: res.url,
    }));
    console.log(res);
  };

  return (
    <div className="shop-register-body">
      <div className="shop-register-container">
        <div className="shopregister-selects">
          <div>
            <h1 className="shopregister-select-title">
              Select Your Area and Shop:
            </h1>
            <Select
              className="shopregister-select"
              value={selectedArea}
              onChange={areaHandler}
              options={[
                ...new Set([...areas.map((area) => area.areaname)]),
              ]?.map((area) => ({
                value: area,
                label: area,
              }))}
              placeholder="Select Area"
            />
          </div>
          <div>
            <Select
              className="shopregister-select"
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
              placeholder="Select Category"
            />
            <button
              className="shopregister-select-button"
              onClick={clearHandler}
            >
              Clear Form
            </button>
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="shopregister-form">
          <h1 className="shopregister-select-title">RegisterShop Your Shop:</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="shopregister-label">Shop User Name:</label>
              <br />
              <input
                className="shopregister-input"
                placeholder="Enter User Name or Email"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="shopregister-label">Password:</label>
              <br />
              <input
                className="shopregister-input"
                placeholder="Enter Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="shopregister-label">Area Name:</label>
              <br />
              <input
                className="shopregister-input"
                placeholder="Enter New Area name"
                type="text"
                name="areaname"
                value={formData.areaname}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="shopregister-label">Category:</label>
              <br />
              <input
                className="shopregister-input"
                placeholder="Enter Shop Category "
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="shopregister-label">Shop Name:</label>
              <br />
              <input
                className="shopregister-input"
                placeholder="Enter Your Shop Name"
                type="text"
                name="shopname"
                value={formData.shopname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="shopregister-label">Shop Image:</label>
              <br />
              <IKContext
                urlEndpoint={urlEndpoint}
                publicKey={publicKey}
                authenticator={authenticator}
              >
                <IKUpload
                  className="shopregister-image"
                  fileName="shop-image.jpg"
                  onError={onError}
                  onSuccess={onSuccess}
                  placeholder="Choose image"
                />
              </IKContext>
            </div>
            <button
              className="shopregister-form-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterShop;
