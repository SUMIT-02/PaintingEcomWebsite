import CarouselMain from "@/components/Carousel/CarouselMain";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect } from "react";
import { homeAssets } from "@/utils/Assets";
import PaintingTile from "@/components/PaintingTile";

const dataLooper = Array(6).fill("");

const index = () => {
  return (
    <div className="bg-white w-full h-screen flex flex-col relative ">
      <Navbar />
      <main className="flex flex-grow flex-col px-2 lg:px-0">
        <CarouselMain />
        <section className="max-w-screen-xl mx-auto w-full mb-10">
          <div className="flex items-center justify-center mb-10">
            <hr className="w-2/12 border border-black rounded-xl" />
            <span className="uppercase px-5 text-lg md:text-xl font-light text-center">
              Purchase Orignal Painting
            </span>
            <hr className="w-2/12 border border-black rounded-xl" />
          </div>
          <div className="w-full grid grid-cols-1 md:col-span-2 lg:grid-cols-4 gap-5">
            {dataLooper.map((i, idx) => (
              <div
                data-tabIndex={idx}
                className={`h-96 w-full ${
                  (idx === 2 || idx === 3) && "lg:col-span-2 aspect-video"
                } flex items-end`}
                style={{
                  background: `url(${homeAssets[idx].image})`,
                }}
              >
                <div className="w-full m-10 text-xl text-center bg-white py-2">
                  {homeAssets[idx].name}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-screen-xl mx-auto w-full  mb-10">
          <div className="flex items-center justify-center mb-10">
            <hr className="w-2/12 border border-black rounded-xl" />
            <span className="uppercase px-5 text-lg md:text-xl font-light">
              Buddha paintings
            </span>
            <hr className="w-2/12 border border-black rounded-xl" />
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-6 gap-5 md:gap-10">
            {dataLooper.map((i, idx) => (
              <PaintingTile idx={idx} assets="buddhaAssets" />
            ))}
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto w-full  mb-10">
          <div className="flex items-center justify-center mb-10">
            <hr className="w-2/12 border border-black rounded-xl" />
            <span className="uppercase px-5 text-lg md:text-xl font-light">
              Mordern Art
            </span>
            <hr className="w-2/12 border border-black rounded-xl" />
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-6 gap-5 md:gap-10">
            {dataLooper.map((i, idx) => (
              <PaintingTile idx={idx} assets="mordernAssets" />
            ))}
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto w-full  mb-10">
          <div className="flex items-center justify-center mb-10">
            <hr className="w-2/12 border border-black rounded-xl" />
            <span className="uppercase px-5 text-lg md:text-xl font-light">
              Nature paintings
            </span>
            <hr className="w-2/12 border border-black rounded-xl" />
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-6 gap-5 md:gap-10">
            {dataLooper.map((i, idx) => (
              <PaintingTile idx={idx} assets="natureAssets" />
            ))}
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto w-full  mb-10">
          <div className="flex items-center justify-center mb-10">
            <hr className="w-2/12 border border-black rounded-xl" />
            <span className="uppercase px-5 text-lg md:text-xl font-light">
              Browse By Medium
            </span>
            <hr className="w-2/12 border border-black rounded-xl" />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            <div
              className="h-96 w-full flex items-end cursor-pointer"
              style={{
                background: `url(./assets/home/memories.jpg)`,
                backgroundSize: "cover",
              }}
            >
              <div className=" mx-auto m-10 text-xl text-center bg-white p-5 px-10">
                {homeAssets["drawing"].name}
              </div>
            </div>
            <div
              className="h-96 w-full flex items-end cursor-pointer"
              style={{
                background: `url(./assets/home/painting.webp)`,
                backgroundSize: "cover",
              }}
            >
              <div className="mx-auto m-10 text-xl text-center bg-white p-5 px-10  ">
                {homeAssets["painting"].name}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer paymentVisible />
    </div>
  );
};

export default index;
