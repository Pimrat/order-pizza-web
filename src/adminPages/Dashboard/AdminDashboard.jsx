import { useState } from "react";
import AdminHeader from "../../component/AdminHeader";
import Side from "../../component/Side";
import { useEffect } from "react";
import paymentApi from "../../apis/paymentApi";
import AdminOrder from "./AdminOrder";

export default function AdminDashboard() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentRes = await paymentApi.getAllPayment();
        // เก็บข้อมูลลงใน state
        const sortedPayments = paymentRes.data
          .sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate))
          .reverse();
        setPayments(sortedPayments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div className='bg-[#F8FCFF] min-h-[90vh] rounded-lg flex justify-center'>
          <div className='w-[80vw] flex gap-8 my-4'>
            <div className='border-2 border-[#415F6C] rounded-lg  h-full w-1/4'>
              <Side />
            </div>
            <div className='border-2 border-[#415F6C] rounded-lg  h-full w-3/4'>
              <div className='mt-8'>
                <div className='flex flex-col items-center w-full'>
                  <div className='w-11/12 flex justify-around py-2 font-semibold'>
                    <div className='w-1/4 text-center'>Order ID</div>
                    <div className='w-1/4 text-center'>Payment Date</div>
                    <div className='w-1/4 text-center'>Total</div>
                    <div className='w-1/4 text-center'>Status</div>
                  </div>

                  <hr className='border border-[#0D1618] w-11/12 mx-auto my-4' />

                  <AdminOrder payments={payments} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
