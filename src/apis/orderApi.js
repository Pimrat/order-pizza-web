import axios from "axios";

const orderApi = {};

orderApi.createOrder = (productId) => axios.post("/order", productId);

orderApi.getOrder = (userId) => axios.get(`/order/${userId}`);

orderApi.getAllOrder = () => axios.get("/order");

orderApi.updateOrder = (orderId, userId) =>
  axios.patch(`/order/${orderId}/${userId}`);

orderApi.deleteOrder = (orderId) => axios.delete(`/order/${orderId}`);

export default orderApi;
