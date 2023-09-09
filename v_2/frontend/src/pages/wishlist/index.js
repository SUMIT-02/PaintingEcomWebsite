import Navbar from "@/components/Navbar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import {
  deleteFromWishList,
  moveWhishlistToCart,
} from "../../app/cartAndWislistSlice";
import { useRouter } from "next/router";
import { paintngImage } from "@/ApiAuthHelper";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const { wishList } = useSelector((state) => state.cartWishlist);

  if (wishList.length === 0) {
    toast.warn("Looks like your wishlist is empty 🥲🥲");
  }

  const discountCalculater = (orignal, discount) => {
    return Math.round((discount / orignal) * 100);
  };

  const checkOutDataHelper = () => {
    let total = 0;
    let discount = 0;

    wishList.forEach((prod) => {
      total += prod.price;
      if (prod.offerPrice > 0) {
        discount += prod.price - prod.offerPrice;
      }
    });
    return { total, discount: total - discount };
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const checkOutHelper = (e) => {
    e.preventDefault();
    dispatch(moveWhishlistToCart());
    router.replace("/cart");
  };

  return (
    <main>
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-900  dark:nx-bg-neutral-900 mt-10">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Your Wishlist
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="lg:col-span-8 bg-white dark:bg-slate-600"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {wishList.map((product, productIdx) => (
                  <div key={productIdx} className="px-4">
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={paintngImage(product.image)}
                          alt={product.name}
                          className="h-24 w-24 rounded-md object-contain object-center sm:h-38 sm:w-38"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={product.href || "#"}
                                  className="font-medium text-lg text-gray-700 dark:text-white"
                                >
                                  {product.name}
                                </a>
                              </h3>
                            </div>

                            <div className="mt-1 flex items-end">
                              <p className="text-xs line-through font-medium text-gray-500 dark:text-gray-100">
                                Rs. {product.price}
                              </p>
                              {product.offerPrice > 0 && (
                                <>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    &nbsp;&nbsp;Rs. {product.offerPrice}
                                  </p>
                                  &nbsp;&nbsp;
                                  <p className="text-sm font-medium text-green-500">
                                    {discountCalculater(
                                      product.price,
                                      product.offerPrice
                                    )}
                                    %
                                  </p>
                                </>
                              )}
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-100 ml-3">
                                Quantity: x{product?.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <IoTrashOutline
                        className="my-auto text-[#E21717] text-xl cursor-pointer"
                        onClick={() =>
                          dispatch(deleteFromWishList(product._id))
                        }
                      />
                    </li>
                  </div>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            {wishList.length > 0 && (
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white dark:bg-slate-600 lg:col-span-4 lg:mt-0 lg:p-0 flex w-full flex-col"
              >
                <h2
                  id="summary-heading"
                  className=" px-4 py-3 sm:p-4 border-b border-gray-200 text-lg font-medium text-gray-900 dark:text-gray-200"
                >
                  Price Details
                </h2>

                <div>
                  <dl className=" space-y-1  px-6 py-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800 dark:text-gray-200">
                        Price ({wishList.length} item)
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        ₹ {checkOutDataHelper().total}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm text-gray-800 dark:text-gray-200">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700 dark:text-green-400">
                        -{" "}
                        {checkOutDataHelper().total -
                          checkOutDataHelper().discount}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800 dark:text-gray-200">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700 dark:text-green-400">
                        Free
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4 border-y border-dashed ">
                      <dt className="text-base font-medium text-gray-900 dark:text-white">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ₹ {checkOutDataHelper().discount}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-6 pb-4 font-medium text-green-700 dark:text-green-400">
                    You will save ₹{" "}
                    {checkOutDataHelper().total - checkOutDataHelper().discount}{" "}
                    on this order
                  </div>
                </div>
                <button
                  className="mx-auto py-2 px-5 mb-5 bg-[#FFA500] rounded-md font-semibold text-white"
                  onClick={checkOutHelper}
                >
                  Checkout To Cart
                </button>
              </section>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
