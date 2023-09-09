import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white w-full h-screen flex flex-col relative ">
      <Navbar />
      <main className="flex flex-grow flex-col lg:px-0 mt-20 max-w-screen-xl mx-auto w-full px-10">
        <div className="w-full text-4xl font-semibold text-left text-gray-400 mt-20">
          About Us
        </div>
        <div className="w-full mt-5">
          <span className="text-lg">
            As Henry Matisse said, “Creativity takes courage” and Edward Hopper
            claimed, “if I could say it in words there would be no reason to
            paint”, it is evident that art is a wonderful and strange thing.
          </span>
          <p className="text-lg mt-10">
            he reflection of thoughts and representation of ideas, art is
            something to which everyone can connect. Artists and art lovers are
            the ones who form this magical amalgamation through art.{" "}
            {process.env.NEXT_PUBLIC_PROJECT_NAME}
            aims to bring these thoughts and ideas together by connecting the
            leading artists and art lovers on a single platform. With the idea
            of providing artists with a platform where they can showcase and
            sell their art while the art lovers can have high-quality and modern
            artwork accessible, {process.env.NEXT_PUBLIC_PROJECT_NAME} offers a
            wide collection of paintings, drawings, handicrafts and artworks.
          </p>
          <p className="text-lg mt-10">
            We have created a platform where artists can freely express their
            thoughts and ideas through magnificent paintings. From abstract
            paintings and modern art paintings to Radha Krishna and Buddha
            paintings, you can get a wide collection of different types of
            paintings at NEXT_PUBLIC_PROJECT_NAME. We strive to put forth an
            exclusive assortment of paintings for you to explore.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
