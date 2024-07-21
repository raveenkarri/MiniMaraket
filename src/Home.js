import React from 'react'
import { Link } from 'react-router-dom'
import "./home.css"


function Home() {
  return (

    <div className="home-container">
    <div className="retailer">
      <h1 className='h1'>Retailer</h1>
      <Link to="/shopregistration" className="button">Register my shop</Link>
    </div>
    <div className="customer">
      <h1 className='h1'>Customer</h1>
      <Link to="/customer" className="button">Buy Products</Link>
    </div>
  </div>
  )
}

export default Home