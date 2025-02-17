// job details button
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.position}
              </Badge>
              <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-[#7209B7] font-bold"} variant="ghost">
                {singleJob?.salary}
              </Badge>
            </div>
          </div>

          <div>
            {isInitiallyApplied ? (
              <Button className="rounded-lg bg-gray-500 cursor-not-allowed">
                Already Applied
              </Button>
            ) : (
              <Button
                onClick={applyJobHandler}
                className="bg-[#7209B7] hover:bg-[#5F32AD]"
              >
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="border-b-2 border-b-gray-300 font-medium pb-4">
          {singleJob?.description}
        </h1>
        <div className="mt-4">
          <h1 className="font-bold my-1">
            Role :{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location :{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description :{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience :{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary :{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.salary}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Positions :{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.position}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants :{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date :{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
