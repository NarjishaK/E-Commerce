import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (err) {
    console.error("category listing error", err);
    throw err;
  }
};

export const fetchBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/brand`);
    return response.data;
  } catch (err) {
    console.error("brands listing error", err);
    throw err;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    return response.data;
  } catch (err) {
    console.error("product list failed: internal error", err);
    throw err;
  }
};

export const createProduct = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("something went wrong in product create", err);
    throw err;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/product/${id}`);
  } catch (err) {
    console.error("something went wrong in product delete", err);
    throw err;
  }
};
