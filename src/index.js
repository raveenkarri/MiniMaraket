import React, { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Cookies from "js-cookie";

axios.defaults.baseURL = "https://mini-market-api.onrender.com"; // "http://localhost:5005"; //"https://mini-market-api.onrender.com";

export const contextStore = createContext();

// Create a provider component
const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(() => Cookies.get("token") || "");
  const [shopToken, setShopToken] = useState(
    () => Cookies.get("shopToken") || ""
  );
  const [itemsLen, setItemslen] = useState(0);

  useEffect(() => {
    if (token) {
      Cookies.set("token", token);
    } else {
      Cookies.remove("token");
    }
  }, [token]);

  return (
    <contextStore.Provider
      value={{
        token,
        setToken,
        shopToken,
        setShopToken,
        itemsLen,
        setItemslen,
      }}
    >
      {children}
    </contextStore.Provider>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
