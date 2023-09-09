import { getData, postFormData } from "@/ApiAuthHelper";
import React, { useEffect, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UploadPaintng = () => {
  const { user } = useSelector((state) => state.userAuth);
  const [paintingFields, setPaintingFields] = useState({
    name: "",
    description: "",
    size: "",
    type: "PAINTING",
    medium: "",
    surface: "",
    createdIn: "",
    price: "",
    offerPrice: "",
    paintingImage: "",
    typeCategory: "",
    stock: "",
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
  } = paintingFields;

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
    formData.set(name, value);
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
      !paintingImage ||
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
    formData.set("typeCategory", typeCategory);
    formData.set("medium", medium);
    formData.set("surface", surface);
    formData.set("type", type);
    postFormData("/uploadPainting", formData).then((data) => {
      if (data?.err) return toast.error(data.err);
      toast.success(data.msg);
      setPaintingFields({
        name: "",
        description: "",
        size: "",
        type: "",
        medium: "",
        surface: "",
        createdIn: "",
        price: "",
        offerPrice: "",
        paintingImage: "",
        typeCategory: "",
        formData: new FormData(),
      });
    });
  };

  return (
    <div className="h-full w-full">
      <main className="flex flex-grow flex-col px-2 max-w-screen-xl mx-auto w-full mb-10 mt-20 justify-center">
        <section className="flex items-center flex-col md:flex-row justify-center">
          <div className="h-52 w-44 border-dashed border-2 border-[#FFA500] rounded-md mr-5 flex items-center justify-center flex-col">
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
              <span className="text-lg font-semibold mt-10">Art Medium*</span>
              <select
                className="focus:outline-none border-2 p-3 px-5 rounded-lg font-semibold mt-2"
                onChange={fieldOnChangeHelper("medium")}
                value={medium}
              >
                <option disabled>Select how art is made</option>
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

export default UploadPaintng;
