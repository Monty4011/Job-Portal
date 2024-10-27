import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <>
      <div>
        <Dialog open={open}>
          <DialogContent
            className="sm:max-w-[425px]"
            onInteractOutside={() => setOpen(false)}
          >
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center ">
                  <Label htmlFor="name" className="">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="col-span-3"
                    name="name"
                    value={input.fullname}
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="grid grid-cols-4 items-center ">
                  <Label htmlFor="email" className="">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="grid grid-cols-4 items-center ">
                  <Label htmlFor="number" className="">
                    Phone
                  </Label>
                  <Input
                    id="number"
                    className="col-span-3"
                    name="number"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="grid grid-cols-4 items-center ">
                  <Label htmlFor="bio" className="">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    className="col-span-3"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="grid grid-cols-4 items-center ">
                  <Label htmlFor="skills" className="">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    className="col-span-3"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="grid grid-cols-4 items-center ">
                  <Label htmlFor="file" className="">
                    Resume
                  </Label>
                  <Input
                    id="file"
                    className="col-span-3"
                    name="file"
                    type="file"
                    accept="application/pdf"
                    onChange={changeFileHandler}
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Button className="w-full my-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4">
                    Update
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UpdateProfileDialog;
