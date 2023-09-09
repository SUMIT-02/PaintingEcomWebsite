import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getData } from "@/ApiAuthHelper";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Orders = () => {
  const { user } = useSelector((state) => state.userAuth);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getData(`/allOrders/${user._id}`).then((data) => {
      if (data?.err) {
        toast.error(data.err);
        return;
      }
      setOrders(data);
    });
  }, []);

  const router = useRouter();
  return (
    <div className="bg-white w-full h-screen flex flex-col relative">
      <Navbar />
      <main className="flex flex-grow flex-col px-2 lg:px-0 max-w-screen-xl mx-auto mt-20 w-full">
        <span className="mx-auto mb-5 font-semibold text-3xl">Your Orders</span>
        <div className="flex flex-col w-full divide-y">
          {orders.map((order, idx) => (
            <div
              className="w-full p-2 rounded-md flex select-none cursor-pointer mt-5 pt-5"
              onClick={() => {
                router.push(`/user/order/${order._id}`);
              }}
            >
              <div className="text-lg font-semibold flex flex-col w-1/4">
                <span className="font-light mx-auto text-sm text-center md:text-base">
                  Order Id{" "}
                </span>
                <span className="text-[#FFA500] mx-auto text-sm text-center md:text-base mt-2">
                  {order.orderId}
                </span>
              </div>
              <div className="text-lg font-semibold flex flex-col w-1/4">
                <span className="font-light mx-auto text-sm text-center md:text-base">
                  Date
                </span>
                <span className="text-[#FFA500] mx-auto text-sm text-center md:text-base mt-2">
                  {new Intl.DateTimeFormat("en-US" /*, o*/).format(
                    new Date(order.createdAt)
                  )}
                </span>
              </div>
              <div className="text-lg font-semibold flex flex-col w-1/4">
                <span className="font-light mx-auto text-sm text-center md:text-base">
                  Total Amount
                </span>
                <span className="text-[#FFA500] mx-auto text-sm text-center md:text-base mt-2">
                  ₹{order.total}
                </span>
              </div>
              <div className="text-lg font-semibold flex flex-col w-1/4">
                <span className="font-light mx-auto text-sm text-center md:text-base">
                  Payment Status
                </span>
                {order.paymentStatus ? (
                  <span className="text-white mx-auto text-sm text-center md:text-base rounded-md bg-[#4DD63790] px-2 py-1 mt-2">
                    Confirmed
                  </span>
                ) : (
                  <span className="text-white mx-auto text-sm text-center md:text-base rounded-md bg-[#E2171790] px-2 py-1 mt-2">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
