import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./customer.css";
import { fetchRegister } from "../../AxiosFunctions";

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
      const res = await fetchRegister(formData);
      console.log(res);
      alert("Details submitted");
      setFormData({ username: "", password: "" });
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="registerform">
        <b className="register-title">Customer Registraion:</b>
        <br />
        <hr></hr>
        <form onSubmit={onsubmit}>
          <label className="Lable-register" htmlFor="username">
            Username:
          </label>
          <br />
          <input
            className="register-inputs"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={onchange}
            required
          />
          <br />
          <label className="Lable-register" htmlFor="password">
            Password:
          </label>
          <br />
          <input
            className="register-inputs"
            type="password"
            id="password"
            name="password"
            onChange={onchange}
            value={formData.password}
            required
          />
          <br />
          <hr></hr>
          <button className="buttonclss" type="submit">
            Submit
          </button>
          <br />
          <div className="register-redirect-block">
            <b className="register-redirect">Already Registered</b>
            <Link to="/customer/logincustomer">
              <button className="buttonclss-redirect">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customer;
