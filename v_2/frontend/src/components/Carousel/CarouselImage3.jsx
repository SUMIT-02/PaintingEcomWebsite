import { useRouter } from "next/router";
import React from "react";

const CarouselImage3 = () => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full lg:flex-row-reverse flex-col-reverse">
      <div className="w-full lg:w-4/6 h-full flex  items-center justify-center">
        <div className="flex flex-col text-center lg:text-right">
          <span className="text-6xl lg:text-8xl font-semibold">Art</span>
          <span className="text-4xl lg:text-7xl font-normal">for every</span>
          <span className="text-3xl lg:text-6xl font-light">soul</span>
          <button
            className="w-full border-2 border-black rounded-lg p-1 text-xl mt-5 mx-auto focus:outline-none"
            onClick={() => router.push("/art/all-artworks")}
          >
            Shop Now
          </button>
        </div>
      </div>

      <div
        className="w-full lg:w-2/6 h-full"
        style={{
          background: ` linear-gradient(90deg, rgba(2,0,36,0.1) 100%, rgba(0,0,0,0.8) 100%), url(https://images.unsplash.com/photo-1565555334121-4a4f177af7b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)`,
        }}
      />
    </div>
  );
};

export default CarouselImage3;
