import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5003/login', formData);
      if (response.status === 200) {
        navigate('/products');
      } else {
        alert('Username or password incorrect!!!!');
      }
      console.log(response.data);
      setFormData({ username: '', password: '' });
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  }

  return (
    <div className="body-bg">
      <div className="container">
        <img src='/registerimage.jpeg' alt='register'/>
        <div className="login-form">
          <legend className="login-legend">Customer Login</legend>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="login-label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="login-input"
              required
            />
            <label htmlFor="password" className="login-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              required
            />
            <button type="submit" className="login-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
