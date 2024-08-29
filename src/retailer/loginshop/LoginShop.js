import React, { useContext, useState } from "react";
import axios from "axios";
import "./loginShop.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginShop = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/shops/loginshop", formData);
      console.log(res);
      Cookies.set("shopToken", res.data.token);
      navigate("/retailer/myproducts");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shoplogin-container">
      <div className="shoplogin-flex">
        <div className="shoplogin-title">
          <h1>Login Shop:</h1>
        </div>
        <div className="shoplogin-form">
          <form onSubmit={handleSubmit}>
            <label>Shop UserName:</label>
            <br />
            <input
              type="text"
              placeholder="Enter shop UserName"
              name="username"
              value={formData.username}
              onChange={onchange}
            />
            <br />
            <label>Shop Password:</label>
            <br />
            <input
              type="password"
              placeholder="Enter shop UserName"
              name="password"
              value={formData.password}
              onChange={onchange}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginShop;
