import { postFormData } from "@/ApiAuthHelper";
import { authUser } from "@/app/userAuthSlice";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SellerOnboard = () => {
  const { isUserAuth, isSeller, user } = useSelector((state) => state.userAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  if (!isUserAuth || !isSeller || user.sellerOnboarded) router.replace("/");

  const [onboardFields, setOnboardFields] = useState({
    accountNumber: "",
    ifscCode: "",
    accountName: "",
    sellerProfile: "",
    verifyAccountNumer: "",
    formData: new FormData(),
  });

  const {
    accountNumber,
    ifscCode,
    accountName,
    sellerProfile,
    verifyAccountNumer,
    formData,
  } = onboardFields;

  const loadLocalImgUrl = () => {
    if (!sellerProfile) return "";
    return URL.createObjectURL(sellerProfile);
  };

  const fieldOnChangeHelper = (name) => (e) => {
    const value = name === "sellerProfile" ? e.target.files[0] : e.target.value;
    setOnboardFields({ ...onboardFields, [name]: value });
    formData.set(name, value);
  };

  const onClickHelper = () => {
    formFieldsVerification();
  };

  const formFieldsVerification = () => {
    if (!accountNumber || !ifscCode || !accountName)
      return toast.warn("All field are required");
    if (accountNumber !== verifyAccountNumer)
      return toast.error("Account numbers are not matching");
    submitForm();
  };

  const submitForm = () => {
    formData.set("userId", user._id);
    postFormData("/sellerBankRegistration", formData).then((data) => {
      if (data?.err) {
        return toast.warn(adata.err);
      }
      toast.success(data.msg);
      dispatch(authUser(data.user));
      router.replace("/seller/dashboard");
    });
  };

  return (
    <div className="bg-white w-full h-screen flex flex-col relative ">
      <Navbar />
      <main className="flex flex-grow flex-col px-2 max-w-screen-xl mx-auto w-full mb-10 mt-20">
        <div className="w-max mx-auto text-center">
          <h1 className="text-3xl font-semibold">Hello, User name</h1>
          <span className="font-thin">Let's get you started</span>
        </div>
        <section className="mt-10 flex items-center flex-col md:flex-row w-max mx-auto">
          <div className="h-44 w-44 border-dashed border-2 border-[#FFA500] rounded-md mr-5 flex items-center justify-center flex-col">
            {!sellerProfile ? (
              <>
                <IoImageOutline />
                <span className="text-xs mx-auto text-center mt-2">
                  Select your profile image
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
            onChange={fieldOnChangeHelper("sellerProfile")}
          />
        </section>{" "}
        <section className="mt-10 flex flex-col w-full md:w-4/12 mx-auto">
          <div className="">
            <h1 className="text-3xl font-semibold">Enter your bank details</h1>
          </div>
          <div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Enter your account name*
              </span>
              <input
                type="text"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("accountName")}
                value={accountName}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Enter your account number*
              </span>
              <input
                type="text"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("accountNumber")}
                value={accountNumber}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Verify your account number*
              </span>
              <input
                type="password"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("verifyAccountNumer")}
                value={verifyAccountNumer}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Enter your IFSC Code*
              </span>
              <input
                type="text"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                onChange={fieldOnChangeHelper("ifscCode")}
                value={ifscCode}
              />
            </div>
          </div>
        </section>
        <button
          className="bg-[#FFA500] mx-auto text-white rounded-md px-5 py-2 font-semibold text-xl mt-10"
          onClick={onClickHelper}
        >
          Submit
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default SellerOnboard;
