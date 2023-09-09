import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Footer from "../../components/Footer";
import { getData, sellerProfileImage } from "@/ApiAuthHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const artist = () => {
  const router = useRouter();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getData("/getAllSellers").then((data) => {
      if (data?.err) {
        return toast.warn(data.err);
      }
      setSellers(data);
    });
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const searchFilter = () => {
    if (!searchInput) return sellers;

    return sellers.filter((seller) =>
      seller.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-grow flex-col max-w-screen-xl mx-auto w-full mt-20">
        <div className="flex w-full py-5 justify-center items-center">
          <div className="flex p-2 items-center w-full">
            <input
              type="text"
              className="border border-black focus:outline-none p-1 px-2 w-full  md:w-2/6 rounded-md text-xl"
              placeholder="Search for the artist"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <IoSearchOutline className="text-3xl text-black ml-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {searchFilter()?.map((seller) => (
            <div
              className="w-4/6 mx-auto lg:m-0 lg:w-full p-2 flex flex-col items-center cursor-pointer"
              onClick={() =>
                router.push(`/art/all-artworks?sellerId=${seller._id}`)
              }
            >
              <img
                className="w-full h-56 lg:h-72 aspect-square"
                src={
                  seller.profileImage
                    ? sellerProfileImage(seller.profileImage)
                    : "./assets/artist.jpg"
                }
              />
              <span className="text-2xl mt-3 font-medium truncate max-w-full">
                {seller.fullName}
              </span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default artist;
