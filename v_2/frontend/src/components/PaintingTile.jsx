import React from "react";
import { IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

import { useDispatch } from "react-redux";
import {
  addToCart,
  addToWishList,
  buySingleProduct,
} from "../app/cartAndWislistSlice";

import { useRouter } from "next/router";
import { paintngImage } from "@/ApiAuthHelper";

const PaintingTile = ({
  painting,
  sellerView,
  openEditModal,
  deletePaintingModal,
}) => {
  const dispatch = useDispatch();

  const data = {
    price: painting?.price,
    offerPrice: painting?.offerPrice,
    image: painting?.fileName,
    name: painting?.name,
    _id: painting?._id,
  };

  const addToCartHelper = () => {
    dispatch(addToCart(data));
  };
  const addToWishListHelper = () => {
    dispatch(addToWishList(data));
  };
  const buyNowHelper = () => {
    dispatch(buySingleProduct(data));
    router.push({
      pathname: "/auth/checkout",
      query: {
        singleProduct: true,
      },
    });
  };

  const router = useRouter();

  const discountCalc = (price, offerPrice) => {
    return 100 - (offerPrice * 100) / price;
  };

  return (
    <div>
      <div
        className="h-64 bg-contain relative group w-40"
        style={{
          background: `url(${paintngImage(painting?.fileName)})`,
          backgroundSize: "cover",
        }}
      >
        {!sellerView && (
          <div
            className="absolute h-full w-full group-hover:bg-black opacity-20 "
            onClick={() =>
              router.push(`/art/painting-overview/${painting._id}`)
            }
          />
        )}
        {!sellerView && (
          <div className="absolute left-3 flex flex-col top-4">
            {painting?.offerPrice > 0 && (
              <span className="text-center bg-[#FFA500] px-2 text-white font-light">
                {Math.round(
                  discountCalc(painting?.price, painting?.offerPrice)
                )}
                %
              </span>
            )}
            {painting?.stock <= 0 && (
              <span className="text-center bg-gray-400 px-2 mt-1 text-white font-semibold">
                Sold Out
              </span>
            )}
          </div>
        )}
        <div className="absolute right-3 group-hover:flex flex-col top-4 hidden">
          {sellerView ? (
            <div
              className="bg-white h-7 aspect-square flex items-center justify-center cursor-pointer"
              onClick={() => openEditModal(painting)}
            >
              <AiOutlineEdit className="text-xl text-black" />
            </div>
          ) : (
            painting?.stock > 0 && (
              <div
                className="bg-white h-7 aspect-square flex items-center justify-center cursor-pointer"
                onClick={addToWishListHelper}
              >
                <IoHeartOutline className="text-xl text-black" />
              </div>
            )
          )}
          {sellerView ? (
            <div
              className="bg-white h-7 aspect-square flex items-center justify-center cursor-pointer"
              onClick={() => deletePaintingModal(painting)}
            >
              <BiTrashAlt className="text-xl text-black" />
            </div>
          ) : (
            painting?.stock > 0 && (
              <div
                className="bg-white h-7 aspect-square flex items-center justify-center cursor-pointer"
                onClick={addToCartHelper}
              >
                <IoCartOutline className="text-xl text-black" />
              </div>
            )
          )}
        </div>

        {!sellerView && painting?.stock > 0 && (
          <div
            className="hidden -mb-2 group-hover:flex absolute w-full  bg-[#FFA50080]  h-16 bottom-0 right-0 items-center justify-center text-lg font-semibold text-white z-10 cursor-pointer select-none"
            onClick={buyNowHelper}
          >
            Buy Now
          </div>
        )}
      </div>
      <div className="flex mt-2 flex-col w-3/6 mx-auto lg:m-0 lg:w-full p-2">
        <span className="max-w-full truncate font-semibold text-lg">
          {painting?.name}
        </span>
        <div className="flex flex-wrap">
          <span
            className={`font-medium text-red-600 mr-2 ${
              painting?.offerPrice > 0 && "line-through "
            }`}
          >
            Rs. {painting?.price}
          </span>
          {painting?.offerPrice > 0 && (
            <span className="font-medium text-gray-500">
              Rs.{painting?.offerPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaintingTile;
