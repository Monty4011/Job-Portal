// on home page
import React, { useEffect, useState } from "react";
import LatestJobCards from "./LatestJobCards";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const LatestJobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setSelectedValue("");
    dispatch(setSearchedQuery(selectedValue));
  }, [searchedQuery]);

  return (
    <>
      <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-4xl font-bold">
          {" "}
          <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
        </h1>

        <div className="grid grid-cols-3 gap-4 my-5">
          {allJobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <LatestJobCards key={job._id} job={job} />)
          )}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
