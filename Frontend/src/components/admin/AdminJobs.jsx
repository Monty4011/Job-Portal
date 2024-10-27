import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useGetAllAdminJobs();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex justify-between items-center ">
          <Input
            className="w-fit "
            placeholder="Filter by company, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Job
          </Button>
        </div>
        <AdminJobTable />
      </div>
    </>
  );
};

export default AdminJobs;
