import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";

// const skills = ["HTML", "CSS", "JavaScript", "React", "Express"];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  useGetAllAppliedJobs();
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-200 bg-white rounded-2xl my-5 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="text-right"
            >
              <Pen />
            </Button>
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1 className="text-md font-bold">Skills</h1>
          <div className="flex items-center gap-1 mt-1">
            {user?.profile?.skills.length != 0
              ? user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              : "No skills added"}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label className="text-md font-bold">Resume</Label>
          <div>
            {isResume ? (
              <a
                className="text-blue-500 w-full hover:underline cursor-pointer"
                target="blank"
                href={user?.profile?.resume}
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-lg font-bold my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Profile;
