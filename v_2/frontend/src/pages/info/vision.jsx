import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const OurVision = () => {
  return (
    <div className="bg-white w-full h-screen flex flex-col relative ">
      <Navbar />
      <main className="flex flex-grow flex-col lg:px-0 mt-20 max-w-screen-xl mx-auto w-full px-10">
        <div className="w-full text-4xl font-semibold text-left text-gray-400 mt-20">
          Mission
        </div>
        <div className="w-full mt-5">
          <div className="w-full text-lg text-left">
            At {process.env.NEXT_PUBLIC_PROJECT_NAME}, we work with the mission:
          </div>
          <ul className="text-lg mt-10 list-disc">
            <li>
              To become a global platform for artists and art lovers from across
              the world to come together and express their talent and
              appreciation for art
            </li>
            <li>
              To encourage and appreciate the understanding for art and present
              stupendous artworks at all times
            </li>
          </ul>
        </div>
        <div className="w-full text-4xl font-semibold text-left text-gray-400 mt-10">
          Vision
        </div>
        <div className="w-full mt-5">
          <ul className="text-lg mt-10 list-disc">
            <li>
              To shape and enrich the quality of artworks we present on our
              platform and to become an acclaimed name in the area while
              supporting all the global artists with us always
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OurVision;
