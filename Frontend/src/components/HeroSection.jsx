import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-5">
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-semibold">
            No. 1 Job Hunt Website
          </span>

          <h1 className="text-5xl font-bold">
            Search, Apply & <br /> Get your{" "}
            <span className="text-[#6A38C2]">Dream Jobs</span>
          </h1>

          <p>
            Your Dream Job is Just a Click Away - Explore Personalized Job
            Matches, Apply Effortlessly, and Succeed in Your Career
          </p>

          <div className="flex items-center w-[40%] shadow-lg border border-gray-200 p-3 rounded-full gap-4 mx-auto">
            <input
              type="text"
              placeholder="Find your dream jobs"
              className="outline-none border-none w-full"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className="rounded-full bg-[#6A38C2]"
              onClick={searchJobHandler}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
