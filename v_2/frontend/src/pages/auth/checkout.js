import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getData, paintngImage, postData } from "@/ApiAuthHelper";
import { toast } from "react-toastify";
import { emptyCart } from "@/app/cartAndWislistSlice";

const Checkout = () => {
  const { cart, singleProductDetails } = useSelector(
    (state) => state.cartWishlist
  );
  const router = useRouter();

  const { user, isUserAuth } = useSelector((state) => state.userAuth);

  if (!isUserAuth) router.replace("/");

  const dispatch = useDispatch();

  const [products, setProducts] = useState(
    router.query.singleProduct ? singleProductDetails : cart
  );

  useEffect(() => {
    setProducts(products.map((product) => ({ ...product, productError: "" })));
  }, []);

  const totalBill = () => {
    let total = 0;
    products.forEach((item) => {
      if (item.offerPrice > 0) total += item.offerPrice * item.quantity;
      else total += item.price * item.quantity;
    });
    return total;
  };

  const [formFields, setFormFields] = useState({
    email: user?.email || "",
    fullName: user?.fullName || "",
    phone: "",
    pincode: "",
    address1: "",
    address2: "",
    landmark: "",
    paymentMode: "",
    saveAddress: false,
  });
  const {
    email,
    fullName,
    phone,
    pincode,
    address1,
    address2,
    landmark,
    paymentMode,
    saveAddress,
  } = formFields;

  const filedChangeHandler = (name) => (e) => {
    const value = e.target.value;
    setFormFields({ ...formFields, [name]: value });
  };

  const filedValidator = () => {
    if (
      !email ||
      !fullName ||
      !phone ||
      !pincode ||
      !address1 ||
      !address2 ||
      !landmark ||
      !paymentMode
    )
      return toast.warn("Fields Missing");

    const apiData = {
      email,
      fullName,
      phone,
      address: { pincode, address1, address2, landmark },
      paymentMode,
      saveAddress,
      products,
      total: totalBill(),
      userId: user._id,
    };

    postData("/placeorder", apiData).then((data) => {
      if (data?.err) {
        toast.warn(data.err);
        if (data.products) {
          setProducts(data.products);
        }
        return;
      }
      toast.success(data.msg);
      if (paymentMode === "cod_pay") {
        dispatch(emptyCart());
        router.replace("/user/orders");
        return;
      }

      razorPayHelper(data.myOrder, data.orderIdOrder);
    });
  };

  const checkoutHelper = (e) => {
    e.preventDefault();
    filedValidator();
  };

  const addrzrpyScript = () => {
    const body = document.querySelector("body");
    const script = document.createElement("script");
    script.setAttribute("src", "https://checkout.razorpay.com/v1/checkout.js");
    body.appendChild(script);
  };

  const razorPayHelper = (orderData, orderId) => {
    addrzrpyScript();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      name: process.env.NEXT_PUBLIC_PROJECT_NAME,
      description: "Some Description",
      order_id: orderData?.id,
      handler: async (response) => {
        postData("/capture/razropayPayment", { ...response, orderId }).then(
          (data) => {
            toast.success(data.msg);
            dispatch(emptyCart());
            router.replace("/user/orders");
          }
        );
      },
      theme: {
        color: "#FFA500",
      },
    };
    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Something went wrong  - RZRPAY");
    }
  };

  return (
    <div className="bg-white w-full h-screen flex flex-col relative ">
      <Navbar />
      <main className="flex flex-grow flex-col px-2 lg:px-0">
        <section>
          <h1 className="sr-only">Checkout</h1>

          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-50 dark:bg-slate-200 py-12 md:py-24">
              <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
                <div>
                  <p className="text-2xl font-medium tracking-tight text-gray-900">
                    Rs. {totalBill()}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    For the purchase of
                  </p>
                </div>

                <div>
                  <div className="flow-root">
                    <ul className="-my-4 divide-y divide-gray-100 dark:divide-gray-300">
                      {products.map((item) => (
                        <>
                          {" "}
                          <li className="flex items-center gap-4 py-4">
                            <img
                              src={paintngImage(item.image)}
                              alt=""
                              className="h-16 w-16 rounded object-cover"
                            />

                            <div>
                              <h3 className="text-sm text-gray-900">
                                {item.name}
                              </h3>

                              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                <div>
                                  <dt className="inline text-sm font-semibold">
                                    Price:{" "}
                                  </dt>
                                  <dd className="inline text-sm font-semibold">
                                    Rs.{" "}
                                    {item.offerPrice > 0
                                      ? item.offerPrice
                                      : item.price}
                                  </dd>
                                </div>
                              </dl>
                              <dl className="text-sm font-medium text-gray-500 dark:text-gray-100">
                                Quantity: x{item?.quantity}
                              </dl>
                            </div>
                          </li>
                          {item.productError && (
                            <span className="text-red-400">
                              {item.productError}
                            </span>
                          )}
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-400 py-12 md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <form className="grid grid-cols-6 gap-4">
                  <div className="col-span-6">
                    <label
                      htmlFor="Email"
                      className="block text-xs font-medium text-gray-700 dark:text-gray-900"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="Email"
                      placeholder="Email"
                      className="mt-1  dark:bg-slate-600 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      onChange={filedChangeHandler("email")}
                      value={email}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="FullName"
                      className="block text-xs font-medium text-gray-700 dark:text-gray-900"
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="FullName"
                      placeholder="Full Name"
                      className="mt-1 dark:bg-slate-600 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      onChange={filedChangeHandler("fullName")}
                      value={fullName}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="Phone"
                      className="block text-xs font-medium text-gray-700 dark:text-gray-900"
                    >
                      Phone
                    </label>

                    <input
                      type="tel"
                      id="Phone"
                      placeholder="Phone"
                      className="mt-1  dark:bg-slate-600 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      onChange={filedChangeHandler("phone")}
                      value={phone}
                    />
                  </div>
                  <fieldset className="col-span-6">
                    <legend className="block text-sm font-medium text-gray-700 dark:text-gray-900">
                      Billing Address
                    </legend>

                    <div className="mt-1 space-y-2 rounded-md shadow-sm">
                      <div>
                        <label className="sr-only" htmlFor="PostalCode">
                          ZIP/Post Code
                        </label>

                        <input
                          type="text"
                          id="PostalCode"
                          placeholder="ZIP/Post Code"
                          className="mt-1  dark:bg-slate-600 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          onChange={filedChangeHandler("pincode")}
                          value={pincode}
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="AL1">
                          Address Line 1
                        </label>

                        <input
                          type="text"
                          id="AL1"
                          placeholder="Address Line 1"
                          className="mt-1  dark:bg-slate-600 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          onChange={filedChangeHandler("address1")}
                          value={address1}
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="AL2">
                          Address Line 1
                        </label>

                        <input
                          type="text"
                          id="AL2"
                          placeholder="Address Line 2"
                          className="mt-1  dark:bg-slate-600 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          onChange={filedChangeHandler("address2")}
                          value={address2}
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="LM">
                          Landmark
                        </label>

                        <input
                          type="text"
                          id="LM"
                          placeholder="Landmark"
                          className="mt-1  dark:bg-slate-600 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          onChange={filedChangeHandler("landmark")}
                          value={landmark}
                        />
                      </div>
                    </div>
                  </fieldset>{" "}
                  <fieldset className="col-span-6">
                    <legend className="block text-sm font-medium text-gray-700 dark:text-gray-900">
                      Payment Method
                    </legend>

                    <div>
                      <label for="Country" class="sr-only">
                        Country
                      </label>
                      <select
                        id="Country"
                        class="mt-1 dark:bg-slate-600 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        onChange={filedChangeHandler("paymentMode")}
                        value={paymentMode}
                      >
                        <option value="" disabled>
                          Select Payment Method
                        </option>
                        <option value="online_pay">Card/ UPI/ QR</option>
                        <option value="cod_pay">COD (Cash On Delivery)</option>
                      </select>
                    </div>
                  </fieldset>{" "}
                  {/* <fieldset className="col-span-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name=""
                        id="SVL"
                        checked={saveAddress}
                        onClick={() => {
                          setFormFields({
                            ...formFields,
                            saveAddress: !saveAddress,
                          });
                        }}
                      />
                      <span class="text-black w-full ml-2">
                        Save this information for next purchase
                      </span>
                    </div>
                  </fieldset> */}
                  <div className="col-span-6">
                    <button
                      className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                      onClick={checkoutHelper}
                    >
                      Pay Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer paymentVisible />
    </div>
  );
};

export default Checkout;
