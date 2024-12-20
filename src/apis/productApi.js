import axios from "axios";

const productApi = {};

productApi.getAllProduct = () => axios.get("/product");

// admin
productApi.createProduct = (formData) => axios.post("/product", formData);

productApi.getProductById = (productId) => axios.get(`/product/${productId}`);

productApi.updateProduct = (productId, formData) =>
  axios.patch(`/product/${productId}`, formData);

productApi.deleteProduct = (productId) => axios.delete(`/product/${productId}`);

export default productApi;
