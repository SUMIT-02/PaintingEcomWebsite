import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { faqData } from "@/utils/Data";
import { MdOutlineSell } from "react-icons/md";
import { useRouter } from "next/router";

const SellPaintingsWithUs = () => {
  const router = useRouter();
  return (
    <div className="bg-white w-full h-screen flex flex-col relative ">
      <Navbar />
      <main className="flex flex-grow flex-col px-2 lg:px-0 mt-20">
        <section className="max-w-screen-xl mx-auto w-full mb-10 flex flex-col md:flex-row">
          <div className=" w-full md:w-2/4 px-10 md:px-0 py-10 flex items-center justify-center  flex-col">
            <span className="text-2xl font-semibold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl uppercase">
              Sell you ART with us
            </span>
            <button
              className="flex items-center mt-5 text-2xl font-semibold text-white bg-[#FFA500] py-2 px-4 rounded-md"
              onClick={() =>
                router.push({ pathname: "/auth", query: { seller: true } })
              }
            >
              <MdOutlineSell />
              <span className="ml-1">Register</span>
            </button>
          </div>
          <section className="max-w-7xl mx-auto px-10 md:px-0 py-10 w-full md:w-2/4">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-2xl mx-auto lg:text-center">
                <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-xl lg:mx-auto mt-4 text-base leading-relaxed text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Facere, assumenda
                </p>
              </div>
              <div className="max-w-3xl mx-auto mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqData.map((faq) => (
                  <div>
                    <h2 className="font-semibold text-xl text-black dark:text-white">
                      {faq.title}
                    </h2>
                    <p className="text-sm leading-6 tracking-wide text-gray-500 mt-6">
                      {faq.data}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer paymentVisible />
    </div>
  );
};

export default SellPaintingsWithUs;
