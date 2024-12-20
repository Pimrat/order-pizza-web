import { useState, useRef } from "react";
import Button from "../../component/Button";
import paymentApi from "../../apis/paymentApi";
import orderApi from "../../apis/orderApi";
import { toast } from "react-toastify";

export default function OrderBox({
  orders,
  payments,
  setOrders,
  authUser,
  setPayments,
}) {
  const [cancelingOrder, setCancelingOrder] = useState(null); // ใช้สำหรับติดตามการยกเลิกคำสั่งซื้อ

  const handleSendPayment = async (order) => {

    const amountTotal = order.OrderItem.reduce(
      (acc, item) => acc + item.itemAmount,
      0
    );
    const priceTotal = order.OrderItem.reduce(
      (acc, item) => acc + parseFloat(item.totalPrice),
      0
    ).toFixed(2);

    const formData = new FormData();
    formData.append("orderId", order.id);
    formData.append("amountTotal", amountTotal);
    formData.append("priceTotal", priceTotal);
    formData.append("paymentDate", new Date().toISOString());

    try {
      await paymentApi.createPayment(formData);
      toast.success("Payment success");

      // รีเฟรชข้อมูลคำสั่งซื้อและการชำระเงิน
      const orderRes = await orderApi.getOrder(authUser?.id);
      const fetchedOrders = orderRes.data.order;
      console.log("Fetched orders:", fetchedOrders);
      setOrders(fetchedOrders);

      const paymentPromises = fetchedOrders.map((order) =>
        paymentApi.getPaymentById(order.id)
      );
      const paymentResponses = await Promise.all(paymentPromises);
      const paymentMap = paymentResponses.reduce((acc, res) => {
        if (res.data) {
          acc[res.data.orderId] = res.data;
        }
        return acc;
      }, {});
      console.log("Fetched payments:", paymentMap);
      setPayments(paymentMap);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setCancelingOrder(orderId);
      try {
        await orderApi.deleteOrder(orderId);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
        toast.success("Order cancelled successfully");
      } catch (err) {
        console.error(err);
      } finally {
        setCancelingOrder(null);
      }
    }
  };

  return (
    <div>
      {orders.map((order) => {
        const productNames = order.OrderItem.map(
          (item) => item.products.productName
        ).join(", ");
        const quantities = order.OrderItem.map((item) => item.itemAmount).join(
          ", "
        );
        const totalOrderPrice = order.OrderItem.reduce(
          (acc, item) => acc + parseFloat(item.totalPrice),
          0
        ).toFixed(2);

        // ตรวจสอบการมีอยู่ของข้อมูลการชำระเงิน
        const payment = payments[order.id];
        const hasUploaded = payment;

        return (
          <div
            key={order.id}
            className='w-3/6 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md mb-4'
          >
            <div className='flex justify-between'>
              <div className='flex gap-8'>
                <div className="flex flex-col justify-center">
                  {order.OrderItem.map((item) => (
                    <div key={item.id} className='w-32 h-auto'>
                      <img
                        src={item.products.productImage}
                        alt={item.products.productName}
                        className='w-fit h-fit my-2 object-cover'
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div>Menu: {productNames}</div>
                  <div>Q'TY: {quantities} pcs</div>
                  <div>Total: {totalOrderPrice} ฿</div>
                  {order.status === "PENDING" && !hasUploaded && (
                    <div className='mt-4'>
                      <hr className='border-2' />
                      <small>QR Code Payment</small>
                      <img
                        src='/QRCode.png' // ตรวจสอบให้แน่ใจว่า path นี้ถูกต้อง
                        alt='QR Code'
                        className='w-24'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='my-2'>
                  Status :
                  <span className='mx-2'>
                    {order.status === "PENDING" ? (
                      <Button className='cursor-default' bg='orange'>
                        PENDING
                      </Button>
                    ) : (
                      <Button
                      className={`cursor-default ${order.status === "SUCCESS" ? "bg-success" : "bg-error"}`}
                      color={order.status === "SUCCESS" ? "white" : "black"}
                      >
                        {order.status}
                      </Button>
                    )}
                  </span>
                </div>
                {(order.status === "PENDING" ||
                  order.status === "CANCELLED") && (
                  <div className='mt-5 flex flex-col gap-4'>
                    {order.status === "PENDING" && !hasUploaded && (
                      <Button
                        fontSize='text-xl'
                        bg="yellow"
                        fontWeight='font-semibold'
                        onClick={() => handleSendPayment(order)}
                      >
                        Confirm Payment
                      </Button>
                    )}
                    {order.status === "PENDING" && !hasUploaded && (
                      <Button
                        className="bg-error"
                        fontSize='text-xl'
                        fontWeight='font-semibold'
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancelingOrder === order.id}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
