import { paintingFilterOption } from "@/utils/Data";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.innerWidth <= 768 ? setIsMobileView(true) : setIsMobileView(false);

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
    function handleWindowSizeChange() {
      if (window.innerWidth <= 768) {
        setIsMobileView(false);
        setIsMenuOpen();
      } else {
        setIsMobileView(false);
        setIsMenuOpen(false);
      }
    }
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-2/6  px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <div className="flex-col justify-between flex-1 mt-6 w-full ">
        <nav className="flex-1 -mx-3 space-y-3 w-full">
          <div className="w-full">
            <span className="text-2xl font-normal text-gray-500">By Price</span>
            <hr className="w-1/6 border border-black rounded-xl mt-1" />
            <input
              type="range"
              className="w-10/12 mt-3 accent-[#FFA500] outline-none"
            />
            <div className="flex justify-between w-10/12 font-semibold">
              <span>Rs.5000</span>
              <span>Rs.25000</span>
            </div>
            <button className="my-5 w-32 rounded-md border-2 border-[#FFA500] py-2 px-5 font-semibold text-lg">
              Filter
            </button>
          </div>
          <div className="w-full mt-16">
            <span className="text-2xl font-normal text-gray-500">
              Paintings
            </span>
            <hr className="w-1/6 border border-black rounded-xl mt-1" />
            <div className="flex justify-start font-semibold mt-3">
              <select className="focus:outline-none border border-black p-3 px-5 rounded-lg font-semibold">
                {paintingFilterOption.map((option) => (
                  <option value={option.value} className="font-semibold">
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mt-16">
            <span className="text-2xl font-normal text-gray-500">
              Materials
            </span>
            <hr className="w-1/6 border border-black rounded-xl mt-1" />
            <div className="flex justify-start font-semibold mt-3">
              <select className="focus:outline-none border border-black p-3 px-5 rounded-lg font-semibold">
                {paintingFilterOption.map((option) => (
                  <option value={option.value} className="font-semibold">
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mt-16">
            <span className="text-2xl font-normal text-gray-500">Surface</span>
            <hr className="w-1/6 border border-black rounded-xl mt-1" />
            <div className="flex justify-start font-semibold mt-3">
              <select className="focus:outline-none border border-black p-3 px-5 rounded-lg font-semibold">
                {paintingFilterOption.map((option) => (
                  <option value={option.value} className="font-semibold">
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mt-16">
            <span className="text-2xl font-normal text-gray-500">Surface</span>
            <hr className="w-1/6 border border-black rounded-xl mt-1" />
            <div className="flex justify-start font-semibold mt-3">
              <select className="focus:outline-none border border-black p-3 px-5 rounded-lg font-semibold">
                {paintingFilterOption.map((option) => (
                  <option value={option.value} className="font-semibold">
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mt-16">
            <span className="text-2xl font-normal text-gray-500">By Rooms</span>
            <hr className="w-1/6 border border-black rounded-xl mt-1" />
            <div className="flex justify-start font-semibold mt-3">
              <select className="focus:outline-none border border-black p-3 px-5 rounded-lg font-semibold">
                {paintingFilterOption.map((option) => (
                  <option value={option.value} className="font-semibold">
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mt-16">
            <span className="text-2xl font-normal text-gray-500">Elements</span>
            <hr className="w-1/6 border border-black rounded-xl mt-1" />
            <div className="flex justify-start font-semibold mt-3">
              <select className="focus:outline-none border border-black p-3 px-5 rounded-lg font-semibold">
                {paintingFilterOption.map((option) => (
                  <option value={option.value} className="font-semibold">
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
