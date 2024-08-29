import axios from "axios";

// General API request function
const apiUserRequests = async (method, url, data = null, token = null) => {
  try {
    // Configure headers
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    // Prepare config for the request
    const config = {
      method,
      url,
      headers,
      ...(data && { data }), // Include data only if it's provided
    };

    // Make the API request
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error during API request to ${url}:`, error);
    throw error; // Rethrow the error for further handling
  }
};

// Register
export const fetchRegister = async (formData) => {
  return await apiUserRequests("post", "/customers/register", formData);
};

// Login
export const fetchLogin = async (formData) => {
  return await apiUserRequests("post", "/customers/login", formData);
};

// Get user info for navbar
export const fetchUser = async (token) => {
  return await apiUserRequests("get", "/customers", null, token);
};

// Fetch cart items
export const fetchCartItems = async (token) => {
  return await apiUserRequests(
    "get",
    "/customers/getItems",
    null,

    token
  );
};

// Delete cart item
export const fetchDeleteCartItems = async (id, token) => {
  return await apiUserRequests(
    "delete",
    `/customers/delete/${id}`,
    null,
    token
  );
};

// Add cart items
export const fetchAddCartItems = async (cartProducts, token) => {
  return await apiUserRequests(
    "post",
    "/customers/cartItems",
    cartProducts,
    token
  );
};

// Fetch application areas
export const fetchAppAreas = async () => {
  return await apiUserRequests("get", "/shops");
};

// Fetch products based on selected area, category, and shop
export const fetchAppProducts = async (
  selectedArea,
  selectedCategory,
  selectedShop
) => {
  return await apiUserRequests(
    "get",
    `/areas/${selectedArea}/${selectedCategory}/${selectedShop}`
  );
};

// Fetch single product details
export const fetchSingleProduct = async (
  selectedAreaName,
  selectedCategoryName,
  selectedShopName,
  selectedProduct
) => {
  return await apiUserRequests(
    "get",
    `/areas/${selectedAreaName}/${selectedCategoryName}/${selectedShopName}/${selectedProduct}`
  );
};
