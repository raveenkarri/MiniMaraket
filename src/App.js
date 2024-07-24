import React from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AreaForm from './components/AreaForm';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Home';
import  Customer from './Customer'
import Login from './Login';
import Products from './Products';
import Footer from './Footer';
import ProductList from './ProductList';
import Product from './Product';

// this is main component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <header><Navbar/></header>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/shopregistration' element={<AreaForm/>}/>
        <Route path='/customer' element={<Customer/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/productlist' element={<ProductList/>}/>
        </Routes>
        
        <footer><Footer/></footer>
        </BrowserRouter>
     
    </div>
  );
}

export default App;
