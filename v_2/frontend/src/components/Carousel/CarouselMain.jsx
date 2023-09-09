import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import CarouselImage1 from "./CarouselImage1";
import CarouselImage2 from "./CarouselImage2";
import CarouselImage3 from "./CarouselImage3";
import CarouselImage4 from "./CarouselImage4";

const CarouselMain = () => {
  return (
    <div className="w-full flex-grow">
      <Carousel
        autoPlay={true}
        interval={5000}
        transitionTime={3000}
        infiniteLoop={true}
        renderArrowNext={() => false}
        renderArrowPrev={() => false}
        statusFormatter={() => false}
        showIndicators={false}
      >
        <div className="h-[70vh] lg:h-screen w-full">
          <CarouselImage1 />
        </div>
        <div className="h-[70vh] lg:h-screen w-full">
          <CarouselImage2 />
        </div>
        <div className="h-[70vh] lg:h-screen w-full">
          <CarouselImage4 />
        </div>
        <div className="h-[70vh] lg:h-screen w-full">
          <CarouselImage3 />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselMain;
