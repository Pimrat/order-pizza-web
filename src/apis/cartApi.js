import axios from "axios";

const cartApi = {};

cartApi.createCart = (amount) => axios.post("/cart", amount);

cartApi.getCart = (userId) => axios.get(`/cart/${userId}`);

cartApi.updateCart = (amount, cartId, userId) =>
  axios.patch(`/cart/${cartId}`, { amount, userId });

cartApi.deleteCart = (cartId) => axios.delete(`/cart/${cartId}`);

cartApi.clearCart = (userId) => axios.delete(`/cart/clear/${userId}`);

export default cartApi;
