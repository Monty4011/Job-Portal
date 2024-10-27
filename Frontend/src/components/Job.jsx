// single job on jobs tab
import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate();
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <>
      <div className="p-5 my-1 rounded-md shadow-xl bg-white border border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {daysAgo(job?.createdAt) == 0
              ? "Today"
              : `${daysAgo(job?.createdAt)} days ago`}{" "}
          </p>
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Avatar className="border border-gray-300">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>

          <div>
            <h1 className="text-lg font-medium">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">India</p>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
          <p className="text-sm text-gray-600">{job?.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge className={"text-[#F83002] font-bold"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"text-blue-700 font-bold"} variant="ghost">
            Positions {job?.position}
          </Badge>
          <Badge className={"text-[#7209B7] font-bold"} variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
        <div className="flex items-center  gap-4 mt-4">
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            variant="outline"
          >
            Details
          </Button>
          <Button className="bg-[#6A38C2] hover:bg-[#7209B7]">
            Save For Later
          </Button>
        </div>
      </div>
    </>
  );
};

export default Job;
