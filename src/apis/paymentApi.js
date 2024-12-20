import axios from "axios";

const paymentApi = {};

paymentApi.createPayment = (paymentData) => axios.post("/payment", paymentData);

paymentApi.getAllPayment = () => axios.get("/payment");

paymentApi.getPaymentById = (orderId) => axios.get(`/payment/${orderId}`);

paymentApi.updatePayment = (orderId, status) =>
  axios.patch(`/payment/${orderId}`, { status });

paymentApi.deletePayment = (paymentId) => axios.delete(`/payment/${paymentId}`);

export default paymentApi;
