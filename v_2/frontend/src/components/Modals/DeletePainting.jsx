import {
  deleteData,
  getData,
  patchFormData,
  postFormData,
} from "@/ApiAuthHelper";
import React, { useEffect, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeletePainting = ({ closeModal, paintingId }) => {
  const deletePainting = () => {
    deleteData(`/deletePainting/${paintingId}`).then((data) => {
      if (data?.err) {
        return toast.error(data.err);
      }

      toast.success(data.msg);
      closeModal();
    });
  };
  return (
    <div className="h-screen w-full absolute top-0 right-0 bg-[#00000095] pt-20 overflow-y-scroll overflow-x-hidden">
      <main className="flex flex-grow flex-col  max-w-screen-xl mx-auto w-max mb-10 mt-20 justify-center bg-white p-10 rounded-lg items-end">
        <MdOutlineCancel
          className="justify-end mb-10 text-2xl cursor-pointer"
          onClick={closeModal}
        />{" "}
        <span className="w-full text-center">
          Are you sure you want to delete this painting? (This proccess is
          irreversible)
        </span>
        <div className="mt-5">
          <button
            className="bg-emerald-500 text-white px-3 py-2 rounded-md mr-5"
            onClick={closeModal}
          >
            {" "}
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md"
            onClick={deletePainting}
          >
            {" "}
            Yes, Delete
          </button>
        </div>
      </main>
    </div>
  );
};

export default DeletePainting;
