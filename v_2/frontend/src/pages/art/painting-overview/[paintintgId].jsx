import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import {
  addToCart,
  addToWishList,
  buySingleProduct,
} from "@/app/cartAndWislistSlice";
import { useDispatch } from "react-redux";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import PaintingTile from "@/components/PaintingTile";
import { useRouter } from "next/router";
import { getData, paintngImage } from "@/ApiAuthHelper";
import { toast } from "react-toastify";

const PaintingOverview = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const buyNowHelper = (data) => {
    dispatch(buySingleProduct(data));
    router.push({
      pathname: "/auth/checkout",
      query: {
        singleProduct: true,
      },
    });
  };

  const [painting, setPainting] = useState({});
  const [relatedPaintings, setRelatedPaintings] = useState([]);

  useEffect(() => {
    if (!router.query.paintintgId) return;
    getData(`/getPaintingDetails/${router.query.paintintgId}`).then((data) => {
      if (data?.err) {
        toast.error(data.err);
        return;
      }
      setPainting(data);
    });
    getData("/getAllPaintings/limit?limit=6").then((data) => {
      if (data?.err) {
        toast.error(data.err);
        return;
      }
      setRelatedPaintings(data);
    });
  }, [router.query.paintintgId]);

  const onClickHelper = (type) => {
    const data = {
      price: painting.price,
      offerPrice: painting.offerPrice,
      image: painting.fileName,
      name: painting.name,
      _id: painting._id,
    };

    type === "CART" && dispatch(addToCart(data));
    type === "WISHLIST" && dispatch(addToWishList(data));
  };
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-grow flex-col max-w-screen-xl mx-auto w-full mt-20">
        <section className="text-gray-600 dark:bg-gray-900 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="Painting name"
                className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded"
                src={paintngImage(painting?.fileName)}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
                  {painting?.type}
                </h2>
                <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
                  {painting?.name}
                </h1>

                <p className="leading-relaxed dark:text-gray-300">
                  {painting?.description}
                </p>
                <div className="flex mt-6 pb-5 border-b-2 border-gray-100 mb-5 flex-col">
                  <span className="text-gray-900 dark:text-white text-xl title-font font-medium my-2">
                    Art Work Details
                  </span>
                  <ul>
                    <li>
                      <span className="font-semibold text-lg">Size</span>:
                      <span className="font-normal ml-1 text-lg">
                        {painting?.size}
                      </span>
                    </li>{" "}
                    <li>
                      <span className="font-semibold text-lg">Medium</span>:
                      <span className="font-normal ml-1 text-lg">
                        {painting?.medium}
                      </span>
                    </li>{" "}
                    <li>
                      <span className="font-semibold text-lg">Surface</span>:
                      <span className="font-normal ml-1 text-lg">
                        {painting?.surface}
                      </span>
                    </li>{" "}
                    <li>
                      <span className="font-semibold text-lg">Surface</span>:
                      <span className="font-normal ml-1 text-lg">
                        {painting?.createdIn}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex">
                  <div className="">
                    <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">
                      ₹{painting?.price}
                    </span>
                    <br />
                    <span className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
                      Sold till date: {painting?.sold}
                    </span>
                  </div>
                  <button
                    className="ml-auto rounded-md bg-[#FFA500] px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#FFA50095]"
                    onClick={() =>
                      buyNowHelper({
                        price: painting.price,
                        offerPrice: painting.offerPrice,
                        image: painting.fileName,
                        name: painting.name,
                        _id: painting._id,
                      })
                    }
                  >
                    Buy Now
                  </button>
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                    onClick={() => onClickHelper("CART")}
                  >
                    <IoCartOutline />
                  </button>
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                    onClick={() => onClickHelper("WISHLIST")}
                  >
                    <IoHeartOutline />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto w-full  mb-10">
          <div className="flex items-center justify-center mb-10">
            <span className="uppercase px-5 text-lg md:text-xl font-light">
              You may also like
            </span>
          </div>
          <div className="w-full flex gap-5 md:gap-10 justify-center">
            {relatedPaintings?.map((painting, idx) => (
              <PaintingTile painting={painting} />
            ))}{" "}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PaintingOverview;
