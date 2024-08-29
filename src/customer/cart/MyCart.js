import React, { useContext, useEffect, useState } from "react";
import { contextStore } from "../../index";
import { fetchCartItems, fetchDeleteCartItems } from "../../AxiosFunctions";
import "./mycart.css";

const MyCart = () => {
  const [items, setItems] = useState([]);
  const { token, setItemslen } = useContext(contextStore);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const res = await fetchCartItems(token);
      console.log(res);
      setItems(res.cartProducts);
      setUsername(res.user.username);
      setItemslen(res.cartProducts.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const confirmDelete = window.confirm("Confirm Delete?");
      if (confirmDelete) {
        await fetchDeleteCartItems(id, token);
        getCartItems();
      }
    } catch (error) {
      alert("item not deleted");
    }
  };

  return (
    <div className="mycart-container">
      <div className="mycart-header">
        <h1>Hi {username}, Your Cart</h1>
        <h1>
          Total items cost:
          {items && items.length > 0
            ? items.reduce((acc, cur) => (acc += cur.cost), 0)
            : 0}
        </h1>
      </div>
      <hr />
      <div className="mycart-items">
        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <div>
                  <span>
                    <strong>Product Name:</strong> {item.productname}
                  </span>
                  <span>
                    <strong>Cost:</strong> {item.cost}
                  </span>
                </div>
                <div>
                  <strong>Description:</strong> {item.description}
                </div>
                <button type="button" onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <h3>No Items found! Please add products</h3>
        )}
      </div>
    </div>
  );
};

export default MyCart;
