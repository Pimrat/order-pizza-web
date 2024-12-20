import axios from "axios";

const orderItemApi = {};

orderItemApi.createOrderItem = () => axios.post("/orderItem");

orderItemApi.getOrderItem = () => axios.get("/orderItemm");

orderItemApi.updateOrderItem = (userId) => axios.patch(`'orderItem/${userId}`);

orderItemApi.deleteOrderItem = (userId) => axios.delete(`/orderItem/${userId}`);

export default orderItemApi;
