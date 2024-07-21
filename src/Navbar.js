import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const pageNames = {
    '/': 'Welcome to the Home Page ',
    '/shopregistration': 'Register Your Shop Here',
    '/customer': 'Customer Portal',
    '/login': 'Login to Your Account',
    '/products': 'Browse Our Products',
    '/productlist':'Select Products and place your order!!',
    '/product':'Product Details'

  };
  const currentPageName = pageNames[location.pathname] || 'Page';
  return (
    <nav className="navbar">
      <div className="navbar-logo-title">
        <img src="logo.jpg" alt="example" className="navbar-logo" />
        <div className='names'>
        <h1 className="navbar-title"><i><b>Mini Market</b></i></h1>
        <h3>{currentPageName}</h3>
        </div>
      </div>
      <div className="link-container">
        <Link id="home" className="home" to="/">
          <i className="fas fa-home home-icon"></i>
         
        </Link>
      </div>
    </nav>
  );
};


export default Navbar;
