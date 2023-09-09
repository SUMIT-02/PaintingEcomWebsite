import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ErrorPage from "next/error";
import Sidebar from "@/components/Sidebar";
import { filterOptions } from "@/utils/Data";
import PaintingTile from "@/components/PaintingTile";
import { getData } from "@/ApiAuthHelper";
import { toast } from "react-toastify";

const fkLooper = Array(49).fill("");

const allowedSlugs = ["all-artworks", "paintings", "drawings", "offers"];

const artist = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!allowedSlugs.includes(slug)) return <ErrorPage statusCode={404} />;

  const renderTitle = () => {
    if (slug === "all-artworks") return "All Artworks";
    if (slug === "paintings") return "Paintings";
    if (slug === "drawings") return "Drawings";
    if (slug === "offers") return "Offers";
  };
  const [paintings, setPaintings] = useState([]);

  const generateApiPath = () => {
    if (slug === "offers") return "/getAllPaintings/offers";
    return "/getAllPaintings";
  };

  useEffect(() => {
    const apiPath = router.query.sellerId
      ? `/getSellerPaintings/${router.query.sellerId}`
      : generateApiPath();
    getData(apiPath).then((data) => {
      if (data?.err) {
        return toast.warn(data.err);
      }

      setPaintings(data);
    });
  }, [slug]);
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-grow flex-col max-w-screen-xl mx-auto w-full mt-20">
        <h1 className="mx-auto my-5 lg:my-10 font-semibold text-3xl lg:text-5xl">
          {renderTitle()}
        </h1>
        <div className="items-center p-10 lg:w-full w-max lg:m-0 m-auto">
          <select className="focus:outline-none border border-black p-1 rounded-full px-2 ">
            {filterOptions.map((option) => (
              <option value={option.value}>{option.title}</option>
            ))}
          </select>
        </div>
        <div className="flex relative">
          {/* <Sidebar /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2 mx-auto ">
            {paintings?.map((painting, idx) => (
              <PaintingTile idx={painting._id} painting={painting} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default artist;