import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <Navbar />
      <div className="  items-center flex justify-center px-5 lg:px-0 ">
        <div className="max-w-screen-lg bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg) `,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Sign up
                </h1>
                <p className="text-[12px] text-gray-500 my-1">
                  Hey enter your details to create your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <form onSubmit={submitHandler}>
                  <div className="mx-auto max-w-xs flex flex-col gap-4">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name"
                      name="fullname"
                      value={input.fullname}
                      onChange={changeEventHandler}
                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={input.email}
                      onChange={changeEventHandler}
                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your phone"
                      name="phoneNumber"
                      value={input.phoneNumber}
                      onChange={changeEventHandler}
                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={input.password}
                      onChange={changeEventHandler}
                    />
                    <div className="flex flex-col gap-2">
                      <RadioGroup className="flex items-center gap-4 ">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            name="role"
                            value="student"
                            checked={input.role == "student"}
                            onChange={changeEventHandler}
                            className="cursor-pointer"
                          />
                          <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            name="role"
                            value="recruiter"
                            checked={input.role == "recruiter"}
                            onChange={changeEventHandler}
                            className="cursor-pointer"
                          />
                          <Label htmlFor="r2">Recruiter</Label>
                        </div>
                      </RadioGroup>

                      <div className="flex items-center gap-2">
                        <Label>Profile</Label>
                        <Input
                          accept="image/*"
                          type="file"
                          onChange={changeFileHandler}
                          className="cursor-pointer "
                        />
                      </div>
                    </div>

                    {loading ? (
                      <button
                        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </button>
                    ) : (
                      <button
                        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          strokeLinecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">SignUp</span>
                      </button>
                    )}

                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Already have an account?{" "}
                      <Link to="/login">
                        <span className="text-blue-900 font-semibold">
                          Login
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
