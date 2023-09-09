import { useRouter } from "next/router";
import React from "react";

const CarouselImage1 = () => {
  const router = useRouter();
  return (
    <div
      style={{
        background: `linear-gradient(90deg, rgba(2,0,36,0.3) 100%, rgba(0,0,0,0.8) 100%), url(https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
      }}
      className="bg-cover h-full w-full flex items-center justify-center"
    >
      <div className="flex flex-col text-white text-left">
        <span className="text-6xl lg:text-9xl font-semibold">Savour the</span>
        <span className="text-4xl lg:text-6xl font-normal mt-1">
          pure bliss of
        </span>
        <span className="text-3xl lg:text-5xl font-light mb-10 mt-1">art</span>
        <button
          className="w-full border-2 rounded-lg p-1 text-xl mt-3 mx-auto focus:outline-none"
          onClick={() => router.push("/art/all-artworks")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default CarouselImage1;
