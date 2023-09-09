import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SellerDetails from "@/components/SellerDetails";
import UpdateFilters from "@/components/UpdateFilters";
import UploadPaintng from "@/components/UploadPaintng";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// TODO CEHCK IF USER IS AUTH OR ELSE SEND TO LOGIN PAGE WITH SELLER SWITCH ON

const SellerDashboard = () => {
  const [tabName, setTabName] = useState("uploadArt");
  const { isUserAuth, isSeller, user } = useSelector((state) => state.userAuth);
  const router = useRouter();

  if (!isUserAuth || user.role === 0) router.replace("/");

  return (
    <div className="bg-white w-full h-screen flex flex-col relative">
      <Navbar />
      <main className="flex flex-grow flex-col px-2 lg:px-0 max-w-screen-xl mx-auto mt-20 w-full">
        <div className="flex justify-center">
          <span
            className={`mr-10 text-lg font-semibold cursor-pointer select-none ${
              tabName === "uploadArt" &&
              "border-b border-[#FFA500] text-[#FFA500]"
            }`}
            onClick={() => setTabName("uploadArt")}
          >
            Upload Art
          </span>
          <span
            className={`mr-10 text-lg font-semibold cursor-pointer select-none ${
              tabName === "profile" &&
              "border-b border-[#FFA500] text-[#FFA500]"
            }`}
            onClick={() => setTabName("profile")}
          >
            My Profile
          </span>
          <span
            className={`mr-10 text-lg font-semibold cursor-pointer select-none ${
              tabName === "filters" &&
              "border-b border-[#FFA500] text-[#FFA500]"
            }`}
            onClick={() => setTabName("filters")}
          >
            Filters
          </span>
        </div>
        <section className="mt-10">
          {tabName === "uploadArt" && <UploadPaintng />}
          {tabName === "profile" && <SellerDetails />}
          {tabName === "filters" && <UpdateFilters />}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
