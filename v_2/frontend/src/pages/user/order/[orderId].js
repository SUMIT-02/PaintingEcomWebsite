import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { getData } from "@/ApiAuthHelper";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { paintngImage } from "@/ApiAuthHelper";

const OrderDetails = () => {
  const router = useRouter();
  const [products, setproducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const orderId = router.query.orderId;

  useEffect(() => {
    getData(`/getOrder/${orderId}`).then((data) => {
      if (data?.err) {
        toast.error(data.err);
        return;
      }

      setproducts(data.products);
      setOrderDetails(data);
    });
  }, [router.query.orderId]);
  return (
    <div className="bg-white w-full h-screen flex flex-col relative ">
      <Navbar />
      <main className="flex flex-grow flex-col px-2 lg:px-0 mt-20 max-w-screen-xl w-full mx-auto">
        {" "}
        <div className="px-4 mx-auto my-4 md:my-6 w-full">
          <h2 className="font-medium text-3xl dark:text-white">
            Order Details
          </h2>
          <div className="mt-3 font-normal dark:text-gray-400">
            Check the status of recent and old orders & discover more products
          </div>
          <div className="mt-8 md:flex-row flex flex-col border border-gray-300 rounded-lg overflow-hidden">
            <div className="md:max-w-xs w-full border-r border-gray-300 bg-gray-100 dark:border-gray-300 dark:bg-gray-800">
              <div className="p-8">
                <div className="grid md:grid-cols-1 sm:grid-cols-4 grid-cols-2">
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 dark:text-white">
                      Order Id
                    </div>
                    <div className="text-sm font-medium dark:text-gray-400">
                      {orderDetails?.orderId}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 dark:text-white">
                      Date
                    </div>
                    <div className="text-sm font-medium dark:text-gray-400">
                      {orderDetails?.createdAt &&
                        new Intl.DateTimeFormat("en-US" /*, o*/).format(
                          new Date(orderDetails?.createdAt)
                        )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 dark:text-white">
                      Total
                    </div>
                    <div className="text-sm font-medium dark:text-gray-400">
                      {orderDetails?.total}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 dark:text-white">
                      Payment Status
                    </div>
                    <div className="text-sm font-medium dark:text-gray-400">
                      {orderDetails.paymentStatus ? "Confirmed" : "Failed"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 dark:bg-gray-600">
              <div className="p-8">
                <ul className="divide-y divide-gray-200 dark:divide-gray-500 -my-7">
                  {products?.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex items-stretch flex-1">
                        <div className="flex-shrink-0">
                          <img
                            className="w-20 h-20 border border-gray-200 rounded-lg object-contain"
                            src={paintngImage(product.id.fileName)}
                            alt={product.id.name}
                          />
                        </div>

                        <div className="flex flex-col justify-between ml-5">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                              {product.id.name}
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-300">
                              Size: {product.id.size}
                            </p>
                          </div>

                          <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-300">
                            x {product.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between ml-auto">
                        <p className="text-sm font-bold text-right text-gray-900 dark:text-white">
                          Rs.{" "}
                          {product.id.offerPrice > 0
                            ? product.id.offerPrice * product.quantity
                            : product.id.price * product.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr className="my-8 border-t border-t-gray-200 dark:border-gray-500" />
                {/* <div className="space-x-4">
                  <button className="rounded-md bg-gray-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-gray-500">
                    Download Invoice
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetails;
