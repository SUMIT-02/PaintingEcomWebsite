import { getData, patchFormData, postFormData } from "@/ApiAuthHelper";
import React, { useEffect, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditPainting = ({ painting, closeModal }) => {
  const { user } = useSelector((state) => state.userAuth);

  const [paintingFields, setPaintingFields] = useState({
    name: painting.name,
    description: painting.description,
    size: painting.size,
    type: painting.type,
    medium: painting.medium,
    surface: painting.surface,
    createdIn: painting.createdIn,
    price: painting.price,
    offerPrice: painting.offerPrice,
    paintingImage: painting.paintingImage,
    typeCategory: painting.typeCategory,
    stock: painting.stock,
    fileName: painting.fileName,
    formData: new FormData(),
  });
  const {
    name,
    description,
    size,
    type,
    medium,
    surface,
    createdIn,
    price,
    offerPrice,
    paintingImage,
    typeCategory,
    stock,
    formData,
    fileName,
  } = paintingFields;

  const loadFormData = () => {
    formData.set("name", name);
    formData.set("description", description);
    formData.set("size", size);
    formData.set("type", type);
    formData.set("medium", medium);
    formData.set("surface", surface);
    formData.set("createdIn", createdIn);
    formData.set("price", price);
    formData.set("offerPrice", offerPrice);
    formData.set("paintingImage", paintingImage);
    formData.set("typeCategory", typeCategory);
    formData.set("stock", stock);
    formData.set("fileName", fileName);
  };

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    getData("/getAllFilters").then((data) => {
      if (data?.err) {
        return toast.warn(data.err);
      }

      setFilters(data);

      setPaintingFields({
        ...paintingFields,
        typeCategory: typeFilterOption("PAINTING")?.categories[0].categoryName,
        medium: typeFilterOption("SURFACE")?.categories[0].categoryName,
        surface: typeFilterOption("MEDIUM")?.categories[0].categoryName,
      });
    });
  }, []);

  const loadLocalImgUrl = () => {
    if (!paintingImage) return "";
    return URL.createObjectURL(paintingImage);
  };

  const fieldOnChangeHelper = (name) => (e) => {
    const value = name === "paintingImage" ? e.target.files[0] : e.target.value;
    setPaintingFields({ ...paintingFields, [name]: value });
  };

  const typeFilterOption = (type) => {
    return filters?.filter((fil) => fil.type === type)[0];
  };

  const formFieldsverification = () => {
    if (
      !name ||
      !description ||
      !size ||
      !type ||
      !medium ||
      !surface ||
      !createdIn ||
      !price ||
      !stock ||
      !typeCategory
    )
      return toast.warn("All fields are required");
    if (isNaN(createdIn)) return toast.warn("Year should be in number ");
    if (isNaN(price)) return toast.warn("Price should be in number ");
    if (isNaN(offerPrice))
      return toast.warn("Offer Price should be in number ");
    uploadPaintingHelper();
  };

  const uploadPaintingHelper = () => {
    formData.set("userId", user._id);
    formData.set("fileName", painting.fileName);
    loadFormData();
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // patchFormData(`/updatePainting/${painting._id}`, formData).then((data) => {
    //   if (data?.err) return toast.error(data.err);
    //   toast.success(data?.msg);
    //   setPaintingFields({
    //     name: "",
    //     description: "",
    //     size: "",
    //     type: "",
    //     medium: "",
    //     surface: "",
    //     createdIn: "",
    //     price: "",
    //     offerPrice: "",
    //     paintingImage: "",
    //     typeCategory: "",
    //     stock: "",
    //     formData: new FormData(),
    //   });
    //   closeModal();
    // });
  };

  return (
    <div className="h-screen w-full absolute top-0 right-0 bg-[#00000095] pt-20 overflow-y-scroll overflow-x-hidden">
      <main className="flex flex-grow flex-col px-2 max-w-screen-xl mx-auto w-full mb-10 mt-20 justify-center bg-white p-10 rounded-lg items-end">
        <MdOutlineCancel
          className="justify-end mb-10 text-2xl mr-20 cursor-pointer"
          onClick={closeModal}
        />{" "}
        <section className="flex items-center flex-col md:flex-row justify-center w-full">
          <div className="h-52 w-44 border-dashed border-2 border-[#FFA500] rounded-md mr-5 flex items-center justify-center flex-col ">
            {!paintingImage ? (
              <>
                <IoImagesOutline />
                <span className="text-xs mx-auto text-center mt-2">
                  Select your profile image
                  <br />
                  (Compulsory)
                </span>
              </>
            ) : (
              <img
                src={loadLocalImgUrl()}
                alt=""
                className="object-contain h-full w-full"
              />
            )}
          </div>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            className="mt-5 md:mt-0"
            onChange={fieldOnChangeHelper("paintingImage")}
          />
        </section>{" "}
        <section className="mt-10 flex flex-col w-full items-center ">
          <div className="">
            <h1 className="text-3xl font-semibold">Enter your art details</h1>
          </div>
          <div className="w-full md:w-4/12">
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">Art name*</span>
              <input
                type="text"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("name")}
                value={name}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Art Description*
              </span>
              <textarea
                type="text"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2 resize-none"
                onChange={fieldOnChangeHelper("description")}
                value={description}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Art Size (Dimensions)*
              </span>
              <input
                type="text"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("size")}
                value={size}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">Art Type*</span>
              <select
                className="focus:outline-none border-2 p-3 px-5 rounded-lg font-semibold mt-2"
                onChange={fieldOnChangeHelper("type")}
                value={type}
              >
                <option disabled>Select art type</option>
                <option value="PAINTING" className="font-semibold">
                  Painting
                </option>{" "}
                <option value="DRAWING" className="font-semibold">
                  Drawing
                </option>
              </select>
            </div>{" "}
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Art Type Category*
              </span>
              <select
                className="focus:outline-none border-2 p-3 px-5 rounded-lg font-semibold mt-2"
                onChange={fieldOnChangeHelper("typeCategory")}
                value={typeCategory}
              >
                <option disabled>Select art type category</option>
                {typeFilterOption(type)?.categories?.map((cate) => (
                  <option value={cate.categoryName} className="font-semibold">
                    {cate.categoryName}
                  </option>
                ))}
              </select>
            </div>{" "}
            <div className="flex flex-col w-full">
              <option disabled>Select how art is made</option>
              <select
                className="focus:outline-none border-2 p-3 px-5 rounded-lg font-semibold mt-2"
                onChange={fieldOnChangeHelper("medium")}
                value={medium}
              >
                <option disabled></option>
                {typeFilterOption("MEDIUM")?.categories?.map((cate) => (
                  <option value={cate.categoryName} className="font-semibold">
                    {cate.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">Art Surface*</span>
              <select
                className="focus:outline-none border-2 p-3 px-5 rounded-lg font-semibold mt-2"
                onChange={fieldOnChangeHelper("surface")}
                value={surface}
              >
                <option disabled>Select art surface</option>
                {typeFilterOption("SURFACE")?.categories?.map((cate) => (
                  <option value={cate.categoryName} className="font-semibold">
                    {cate.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Quantity In Stock*
              </span>
              <input
                type="number"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("stock")}
                value={stock}
              />
            </div>{" "}
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Art CreatedIn* (YYYY format)
              </span>
              <input
                type="number"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("createdIn")}
                value={createdIn}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">Art Price*</span>
              <input
                type="number"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("price")}
                value={price}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Art Offer Price
              </span>
              <input
                type="number"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("offerPrice")}
                value={offerPrice}
              />
            </div>
          </div>
        </section>
        <button
          className="bg-[#FFA500] mx-auto text-white rounded-md px-5 py-2 font-semibold text-xl mt-10 focus:border-2 focus:border-[#FFA500] focus:bg-white focus:text-[#FFA500]"
          onClick={formFieldsverification}
        >
          Submit
        </button>
      </main>
    </div>
  );
};

export default EditPainting;
