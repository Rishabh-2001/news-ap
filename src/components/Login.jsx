"use client";
import React, { useEffect, useState } from "react";
import google from "../../public/logo-google.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserWithEmailPassword,
  signInWithGoogle,
} from "../app/slice/user.slice";
import { toast } from "react-toastify";

import Loader from "./Loader";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { error, payload } = await dispatch(
      loginUserWithEmailPassword(formData)
    );

    if (error) {
      toast.error(payload);
      setIsLoading(false);
    } else {
      const user = {
        userToken: payload?.token,
        uid: payload?.profileData?.uid,
        email: payload?.profileData?.email,
      };
      setIsLoading(false);
      setCookie("user", user?.userToken);
      localStorage.setItem("user", JSON.stringify(user));
      setFormData({
        email: "",
        password: "",
      });

      toast.success("Login success");
      router.push("/");
    }
  };
  async function handleGoogleLogin() {
    setIsLoading(true);
    const { error, payload } = await dispatch(signInWithGoogle());

    if (error) {
      // console.log("HGot error", error);
      toast.error("Login error:", error);
      setIsLoading(false);
    } else {
      const user = {
        userToken: payload?.token,
        uid: payload?.profileData?.uid,
        email: payload?.profileData?.email,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setCookie("user", user?.userToken);
      setIsLoading(false);
      toast.success("Login Success");
      router.push("/");
    }
  }

  return (
    <>
      <div className="flex md:flex-row flex-col  md:w-[60%] w-[90%]  mx-auto justify-between ">
        <div className="flex-col md:w-[60%] w-[90%] rounded border-2 border-[#673AB7]  text-center py-4">
          <h2 className="md:text-2xl text-xl font-bold my-4 mx-auto text-[#673AB7]">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex-col mt-14 text-left">
              <div className="px-8 mb-6">
                <label htmlFor="email" className=" labels mb-2 capitalize">
                  Enter Email
                </label>
                <br></br>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border w-full py-2 outline-none  p-2"
                />
              </div>
              <div className="px-8 mb-6">
                <label htmlFor="password" className="labelsmb-2">
                  Enter Password
                </label>
                <br></br>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="border w-full py-2 outline-none p-2"
                />
              </div>
              <div className="px-8 mb-6">
                <input
                  type="checkbox"
                  value=""
                  defaultChecked
                  name="remember"
                />
                <label className="ml-4">Remember</label>
                {/* <span className="float-right font-medium text-[#673AB7]">
                Forgot Password ?
              </span> */}
                <br></br>
                {isLoading && <Loader />}
                <button
                  type="submit"
                  className={`text-white bg-[#673AB7] w-full py-2 mt-4  rounded-xl cursor-pointer ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }  `}
                  disabled={isLoading ? true : false}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="px-8">
            <button
              onClick={handleGoogleLogin}
              className={`text-[#673AB7] bg-[#fff] border border-[#673AB7] w-full py-2 mt-16  rounded-xl cursor-pointer flex justify-center gap-4 items-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }  `}
            >
              {" "}
              <Image src={google} alt="google" width={20} className="" /> Sign
              In with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
