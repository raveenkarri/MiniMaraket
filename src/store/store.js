// src/store/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const state = {
  cartProducts: [],
};
const productSlice = createSlice({
  name: "cart",
  initialState: state,
  reducers: {
    addProducts: (state, action) => {},
    removeProducts: (state, action) => {},
  },
});
const Store = configureStore({
  reducer: {
    cart: productSlice.reducer,
  },
});
export const { addProducts, removeProducts } = productSlice.actions;

export default Store;
