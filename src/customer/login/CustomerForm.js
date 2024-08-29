import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { contextStore } from "../../index";
import { fetchLogin, fetchRegister } from "../../AxiosFunctions";

const CustomerForm = () => {
  const { setToken } = useContext(contextStore);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await fetchLogin(formData);

        setToken(response.accessToken);
        console.log(response);
        alert("Login successfull");
        navigate("/customer/products");
      } else {
        await fetchRegister(formData);
        alert("Registration successful");
        setFormData({ username: "", password: "" });
        setIsLogin(true); // Switch to login after successful registration
      }
    } catch (error) {
      console.error(error);
      alert(isLogin ? "Login failed" : "Registration failed");
    }
  };

  return (
    <div className="customer-form-container">
      <div className="form-box">
        <h4 className="form-title">
          {isLogin ? "Customer Login:" : "Customer Registration:"}
        </h4>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-inputs"
            placeholder="Enter Username"
            required
          />
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-inputs"
            placeholder="Enter Password"
            required
          />
          <button type="submit" className="form-button">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="toggle-block">
          <b className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already registered?"}
          </b>
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
