"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, signInWithGoogle } from "../slice/user.slice";
import firebaseui from "firebaseui";
// import loader from '../../../public/Spinner-3.gif'
import google from "../../public/logo-google.svg";
// import firebase from 'firebase'
// import { StyledFirebaseAuth } from 'react-firebaseui';
// import auth from  '../../../firebase/firebase.config.js'; // Adjust the path
import { app, auth } from "../../firebase/firebase.config";
// import { Spin } from "antd";
import Image from "next/image";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Register = () => {
  //   const dispatch = useDispatch();
  //   const [registerType, setRegisterType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cnf_password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadRegister = {
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      password: formData?.password,
      cnf_password: formData?.cnf_password,
      userType: formData?.userType,
    };
    if (formData.password !== formData.cnf_password) {
      toast.error("Passwords doesn't match !");
    } else {
      setIsLoading(true);
      const { error, payload } = await dispatch(registerUser(payloadRegister));
      // console.log("b", payload);
      if (error) {
        console.log("Iner", payload);
        toast.error(payload);
        setIsLoading(false);
      } else {
        const user = {
          userToken: payload?.token,
          uid: payload?.profileData?.uid,
          email: payload?.profileData?.email,
        };
        setCookie("user", user?.userToken);
        localStorage.setItem("user", JSON.stringify(user));
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          cnf_password: "",
        });
        toast.success("Successfuly Registered");
        setIsLoading(false);
        router.push("/");
      }
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
      setIsLoading(false);
      const user = {
        userToken: payload?.token,
        uid: payload?.profileData?.uid,
        email: payload?.profileData?.email,
      };
      setCookie("user", user?.userToken);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Success");
      router.push("/");
    }
  }

  return (
    <div className="flex items-center justify-center py-8   ">
      <div className="flex md:flex-row sm:flex-col flex-col   md:w-[60%] sm:w-[90%] w-[90%]  mx-auto justify-between rounded border-2 border-[#673AB7] gap-4 ">
        <div className="flex-col md:w-[90%]  sm:w-full   text-center py-4">
          <h2 className=" md:text-2xl text-xl font-bold mx-auto text-[#673AB7]">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex-col  text-left mt-8">
              <div className="px-8 mb-6">
                <label htmlFor="firstName" className=" labels mb-2">
                  Enter First Name
                </label>
                <br></br>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border w-full py-2 outline-none  p-2"
                />
              </div>
              <div className="px-8 mb-6">
                <label htmlFor="lastName" className=" labels mb-2">
                  Enter Last Name
                </label>
                <br></br>
                <input
                  type="text"
                  id="lastName"
                  onChange={handleChange}
                  name="lastName"
                  value={formData.lastName}
                  className="border w-full py-2 outline-none  p-2"
                />
              </div>
              <div className="px-8 mb-6">
                <label htmlFor="email" className=" labels mb-2">
                  Enter Email
                </label>
                <br></br>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  id="email"
                  onChange={handleChange}
                  className="border w-full py-2 outline-none  p-2"
                />
              </div>
              <div className="px-8 mb-6">
                <label htmlFor="password" className="labels mb-2">
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
                <label htmlFor="cnf_password" className="labelsmb-2">
                  Enter Confirm Password
                </label>
                <br></br>
                <input
                  type="password"
                  name="cnf_password"
                  required
                  value={formData.cnf_password}
                  id="cnf_password"
                  onChange={handleChange}
                  className="border w-full py-2 outline-none p-2"
                />
              </div>
              {isLoading && <Loader />}
              <div className="px-8 mb-6">
                <button
                  disabled={isLoading ? true : false}
                  className={`text-white bg-[#673AB7] w-full py-2 mt-4 rounded-xl ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
        <span className="text-xl my-auto text-gray-500 sm:mx-auto ">OR</span>
        <div className="flex-col md:w-[90%] w-[90%]  text-center py-4 my-auto mx-auto">
          <h2 className=" md:text-2xl text-xl font-bold mx-auto text-[#673AB7] text-center ">
            Register Using:
          </h2>
          <div className="px-8 mx-auto">
            <button
              onClick={handleGoogleLogin}
              className={`text-[#673AB7] bg-[#fff] border border-[#673AB7] w-full py-2 mt-6  rounded-xl cursor-pointer flex justify-center gap-4 items-center  ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              } `}
            >
              {" "}
              <Image src={google} alt="google" width={20} className="" /> Sign
              In with Google
            </button>
          </div>

          {/* show firebase ui for sign up here  */}
          {/* <button onClick={handleGoogleSignIn}>Sign in with Google</button> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
