import React, { useEffect, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import "./addProducts.css";
import Cookies from "js-cookie";

const AddProducts = () => {
  const initialFormData = {
    productname: "",
    cost: "",
    description: "",
    imageUrl: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [token] = useState(Cookies.get("shopToken"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    if (isSubmitting && formData.imageUrl) {
      submitForm();
    }
  }, [formData.imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.imageUrl) {
      submitForm();
    }
  };

  const submitForm = async () => {
    try {
      const response = await axios.post("/shops/addproduct", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsSubmitting(false);
      alert("Submitted successfully!");
      console.log(response.data);
      setFormData(initialFormData);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
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
      console.log(signature, expire, token);
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
    console.log("Success", res);
    setFormData((prevState) => ({
      ...prevState,
      imageUrl: res.url,
    }));
  };

  return (
    <div className="addProducts-container">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Add New Products:</h2>
          <hr />
          <label>Product Name:</label>
          <br />
          <input
            type="text"
            placeholder="Enter product Name"
            name="productname"
            value={formData.productname}
            onChange={onchange}
          />
          <br />
          <label>Product Cost in Rupees:</label>
          <br />
          <input
            type="number"
            placeholder="Enter Price of the product"
            name="cost"
            value={formData.cost}
            onChange={onchange}
          />
          <br />
          <label>About Product:</label>
          <br />
          <input
            type="text"
            placeholder="Brand of the product"
            name="description"
            value={formData.description}
            onChange={onchange}
          />
          <br />
          <label>Product Image:</label>
          <br />
          <div className="image-upload-container">
            <IKContext
              urlEndpoint={urlEndpoint}
              publicKey={publicKey}
              authenticator={authenticator}
            >
              <IKUpload
                fileName="product-image.jpg"
                onError={onError}
                onSuccess={onSuccess}
                placeholder="Choose image"
              />
            </IKContext>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
