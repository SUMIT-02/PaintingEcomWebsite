import { getData, postData } from "@/ApiAuthHelper";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateFilters = () => {
  const [allfilters, setAllfilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    getData("/getAllFilters").then((data) => {
      if (data?.err) {
        return toast.warn(data.err);
      }
      setSelectedFilter(data[0]?.type);
      setAllfilters(data);
    });
  }, []);

  const [filterValue, setFilterValue] = useState("");

  const addFilterHelper = () => {
    if (!filterValue) return toast.warn("Filter Category cannot be empty");
    const apiData = { type: selectedFilter, categoryName: filterValue };
    postData("/addFilter", apiData).then((data) => {
      if (data?.err) {
        return toast.error(data.err);
      }
      setFilterValue("");
      return toast.success(data.msg);
    });
  };

  return (
    <div className="h-full w-full">
      <main className="flex flex-grow flex-col px-2 max-w-screen-xl mx-auto w-full mb-10 mt-20 justify-center">
        <section className="mt-10 flex flex-col w-full items-center ">
          <div className="">
            <h1 className="text-3xl font-semibold">Update Filters Options</h1>
          </div>
          <div className="w-full md:w-4/12">
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold mt-10">
                Select Filter*
              </span>
              <select
                className="focus:outline-none border-2 p-3 px-5 rounded-lg font-semibold mt-2"
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {allfilters.map((filter) => (
                  <option value={filter.type} className="font-semibold">
                    {filter.type}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="border-2 rounded-md focus:outline-none p-2 text-base mt-2"
                placeholder="Add Filter Option"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
          </div>
        </section>
        <button
          className="bg-[#FFA500] mx-auto text-white rounded-md px-5 py-2 font-semibold text-xl mt-10 focus:border-2 focus:border-[#FFA500] focus:bg-white focus:text-[#FFA500]"
          onClick={addFilterHelper}
        >
          Update
        </button>
      </main>
    </div>
  );
};

export default UpdateFilters;
