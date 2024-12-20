import { useState, useEffect } from "react";
import Button from "../../component/Button";
import paymentApi from "../../apis/paymentApi";
import { toast } from "react-toastify";

export default function AdminOrder({ payments }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(payments);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setOrders(payments);
  }, [payments]);

  const handleStatusClick = (order) => {
    if (selectedOrder?.id === order.id) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(order);
    }
  };

  const handleConfirmPayment = async (orderId) => {
    setIsUpdating(true);
    try {
      const res = await paymentApi.updatePayment(orderId, "SUCCESS");
      console.log("Response Data:", res.data);
      
      // Immediately update the order status
      setOrders((prevOrders) =>
        prevOrders.map((payment) =>
          payment.order.id === orderId 
            ? {
                ...payment,
                order: {
                  ...payment.order,
                  status: "SUCCESS"
                }
              }
            : payment
        )
      );

      toast.success("Confirm payment successfully");
    } catch (err) {
      console.error("Error confirming payment:", err);
      toast.error("Failed to confirm payment");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeclinePayment = async (orderId) => {
    setIsUpdating(true);
    try {
      const res = await paymentApi.updatePayment(orderId, "DECLINE");
      console.log("Response Data:", res.data);
      
      // Immediately update the order status
      setOrders((prevOrders) =>
        prevOrders.map((payment) =>
          payment.order.id === orderId 
            ? {
                ...payment,
                order: {
                  ...payment.order,
                  status: "DECLINE"
                }
              }
            : payment
        )
      );

      toast.warning("Payment declined");
    } catch (err) {
      console.error("Error declining payment:", err);
      toast.error("Failed to decline payment");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-11/12">
      {orders.map((payment) => (
        <div key={payment.id} className="flex flex-col py-2 border-b">
          <div className="flex justify-around items-center">
            <div className="w-1/4 text-center">{payment.order.id}</div>
            <div className="w-1/4 text-center">
              {new Date(payment.paymentDate).toISOString().slice(0, 10)}
            </div>
            <div className="w-1/4 text-center">
              {Number(payment.priceTotal).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ฿
            </div>
            <div className="w-1/4 text-center">
              <Button
                bg={
                  payment.order.status === "SUCCESS"
                    ? "green"
                    : payment.order.status === "DECLINE"
                    ? "red"
                    : "orange"
                }
                width={100}
                color={payment.order.status === "SUCCESS" ? "white" : "black"}
                onClick={() => handleStatusClick(payment.order)}
                disabled={isUpdating}
              >
                {payment.order.status}
              </Button>
            </div>
          </div>

          {selectedOrder?.id === payment.order.id && (
            <div className="p-4 bg-gray-100 mt-2 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Order Details</h3>
              <div className="mb-2">
                {payment.order.OrderItem &&
                payment.order.OrderItem.length > 0 ? (
                  payment.order.OrderItem.map((item, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-3 gap-4 mb-1">
                        <div className="text-left">
                          {item.products && item.products.productName
                            ? item.products.productName
                            : "Product Name Not Available"}
                        </div>
                        <div className="text-center">
                          Amount: {item.itemAmount || ""}
                        </div>
                        <div className="text-right">
                          Total Price: {item.totalPrice || ""} ฿
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No items available</div>
                )}
              </div>

              {payment.order.status === "PENDING" && (
                <div className="flex justify-end gap-4">
                  <Button
                    bg="blue"
                    color="white"
                    onClick={() => handleConfirmPayment(payment.order.id)}
                    disabled={isUpdating}
                  >
                    Confirm Payment
                  </Button>
                  <Button
                    bg="red"
                    color="black"
                    onClick={() => handleDeclinePayment(payment.order.id)}
                    disabled={isUpdating}
                  >
                    Decline
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};