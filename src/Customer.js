import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./customer.css";

const Customer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const onchange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mini-market-api.onrender.com/customers/register",
        formData
      );
      console.log(response.data);
      alert("Details submitted");
      setFormData({ username: "", password: "" });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="registerform">
        <legend>
          <h1>Customer Registraion</h1>
          <form onSubmit={onsubmit}>
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={onchange}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              onChange={onchange}
              value={formData.password}
              required
            />
            <br />
            <button className="buttonclss" type="submit">
              Submit
            </button>
            <br />

            <h1>Already Registered</h1>
            <Link to="/login">
              <button className="buttonclss">Login</button>
            </Link>
          </form>
        </legend>
      </div>
      <div>
        <img className="imageclass" src="/registerform.jpeg" alt="register" />
      </div>
    </div>
  );
};

export default Customer;
