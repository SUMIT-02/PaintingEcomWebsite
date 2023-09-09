import React from "react";

const SellerDetails = () => {
  return (
    <div className="h-full w-full">
      <main className="flex flex-grow flex-col px-2 max-w-screen-xl mx-auto w-full mb-10 mt-20 justify-center">
        <section className="flex items-center flex-col md:flex-row justify-center">
          <div className="h-52 w-44 border-dashed border-2 border-[#FFA500] rounded-md"></div>
        </section>{" "}
        <section className="mt-10 flex flex-col w-full items-center ">
          <div className="">
            <h1 className="text-3xl font-semibold">Your Profile</h1>
          </div>
          <div className="w-full md:w-4/12 flex flex-col items-center mt-10">
            <div className="flex w-max items-center">
              <span className="text-lg font-semibold mr-5">Name: </span>
              <span type="text" className="text-base">
                Your name comes here
              </span>
            </div>
            <div className="flex w-max items-center ">
              <span className="text-lg font-semibold mr-5">Email: </span>
              <span type="text" className="text-base">
                Your email comes here
              </span>
            </div>
            <div className="flex w-max items-center ">
              <span className="text-lg font-semibold mr-5">
                Total Listed Paintings:{" "}
              </span>
              <span type="text" className="text-base">
                100000
              </span>
            </div>
            <div className="flex w-max items-center ">
              <span className="text-lg font-semibold mr-5">
                Earnings Till Date:{" "}
              </span>
              <span type="text" className="text-base">
                10000K
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerDetails;
