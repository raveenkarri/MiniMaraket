import React, { useContext } from "react";
import Navbar from "./components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AreaForm from "./components/shopform/AreaForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Customer from "./components/register/Customer";
import Login from "./components/login/Login";
import Products from "./components/products/Products";
import Footer from "./components/footer/Footer";
import ProductList from "./components/products/ProductList";
import Product from "./components/products/Product";
import ErrorPage from "./errorPage";
import { contextStore } from ".";

import MyCart from "./components/MyCart";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(contextStore);
  return token ? children : <ErrorPage />;
};

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/shopregistration" element={<AreaForm />} />
        <Route path="/customer" element={<Customer />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/mycart"
          element={
            <ProtectedRoute>
              <MyCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productlist"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
      </Routes>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
