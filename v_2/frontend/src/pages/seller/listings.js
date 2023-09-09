import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { filterOptions } from "@/utils/Data";
import PaintingTile from "@/components/PaintingTile";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "@/ApiAuthHelper";
import { toast } from "react-toastify";
import EditPainting from "@/components/Modals/EditPainting";
import DeletePainting from "@/components/Modals/DeletePainting";

const artist = () => {
  const router = useRouter();

  const { user, isUserAuth, isSeller } = useSelector((state) => state.userAuth);

  if (!isUserAuth || user.role === 0) router.replace("/");

  const [paintings, setPaintings] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    getData(`/getSellerPaintings/${user._id}`).then((data) => {
      if (data?.err) {
        return toast.warn(data.err);
      }

      setPaintings(data);
    });
  }, [reload]);

  const [updateModalData, setUpdateModalData] = useState({});

  const [editModal, setEditModal] = useState(false);
  const [deletePaintingModal, setDeletePaintingModal] = useState(false);

  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-grow flex-col max-w-screen-xl mx-auto w-full mt-20">
        <h1 className="mx-auto my-5 lg:my-10 font-semibold text-3xl lg:text-5xl">
          Your Listings
        </h1>
        <div className="flex items-center p-10 lg:w-full w-max lg:m-0 m-auto justify-center">
          <select className="focus:outline-none border border-black p-1 rounded-full px-2 ">
            {filterOptions.map((option) => (
              <option value={option.value}>{option.title}</option>
            ))}
          </select>
        </div>
        <div className="flex relative">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2 mx-auto ">
            {paintings?.map((painting, idx) => (
              <PaintingTile
                idx={idx}
                sellerView
                painting={painting}
                openEditModal={(data) => {
                  setUpdateModalData(data);
                  setEditModal(true);
                }}
                deletePaintingModal={(data) => {
                  setUpdateModalData(data);
                  setDeletePaintingModal(true);
                }}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      {editModal && (
        <EditPainting
          painting={updateModalData}
          closeModal={() => {
            setEditModal(false);
            setReload(!reload);
          }}
        />
      )}
      {deletePaintingModal && (
        <DeletePainting
          paintingId={updateModalData._id}
          closeModal={() => {
            setDeletePaintingModal(false);
            setReload(!reload);
          }}
        />
      )}
    </div>
  );
};

export default artist;
