import React, { useContext } from "react";
import Navbar from "./components/navbar/Navbar";

import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Products from "./customer/products/Products";
import Footer from "./components/footer/Footer";
import ProductList from "./customer/products/ProductList";
import Product from "./customer/products/Product";
import ErrorPage from "./errorPage";
import { contextStore } from ".";

import MyCart from "./customer/cart/MyCart";
import RegisterShop from "./retailer/shopregister/RegisterShop";
import AddProducts from "./retailer/updateProducts/AddProducts";
import MyOrders from "./retailer/myOrders/MyOrders";
import LoginShop from "./retailer/loginshop/LoginShop";
import MyProducts from "./retailer/MyProducts/MyProducts";
import CustomerForm from "./customer/login/CustomerForm";

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

        <Route path="/retailer">
          <Route path="shopregister" element={<RegisterShop />} />
          <Route path="shoplogin" element={<LoginShop />} />
          <Route path="addproduct" element={<AddProducts />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="myproducts" element={<MyProducts />} />
        </Route>
        <Route path="/customer">
          <Route path="logincustomer" element={<CustomerForm />} />

          <Route
            path="mycart"
            element={
              <ProtectedRoute>
                <MyCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="product"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="productlist"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
}

export default App;
// import { IKImage, IKContext, IKUpload } from "imagekitio-react";

// function App() {
//   return (
//     <div className="App">
//       <h1>ImageKit React quick start</h1>

//       <IKImage
//         urlEndpoint={urlEndpoint}
//         path="/test-upload_PEl_0ChaM.png?updatedAt=1723907000588"
//         transformation={[{ height: 300, width: 400 }]}
//         lqip={{ active: true }}
//         loading="lazy"
//         height="300"
//         width="400"
//       />

//       <IKContext
//         publicKey={publicKey}
//         urlEndpoint={urlEndpoint}
//         authenticator={authenticator}
//       >
//         <p>Upload an image</p>
//         <IKUpload
//           fileName="test-upload.png"
//           onError={onError}
//           onSuccess={onSuccess}
//         />
//       </IKContext>
//     </div>
//   );
// }

// export default App;
