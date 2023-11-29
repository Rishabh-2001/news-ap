import React from "react";
import google from "../../public/logo-google.svg";
import instagram from "../../public/logo-instagram.svg";
import reddit from "../../public/logo-reddit.svg";
import linkedin from "../../public/icons8-linkedin.svg";
import LogoMain from "./LogoMain";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className=" md:flex flex flex-wrap justify-around px-4 py-8 gap-4  mt-12 bg-white border-t">
        <div className="flex flex-col md:w-[30%] w-[80%] mx-auto   ">
          <LogoMain />

          <p className="text-[#444] mt-4 mb-8">
            After the logo, let’s add another SVG for a hamburger icon.
          </p>
          <span> &copy; Globl Inc. 2023</span>
        </div>
        <div className="md:w-[15%] w-[40%] mx-auto">
          <h2 className="font-bold  text-xl text-[#673AB7]">Company</h2>
          <ul className="text-style-none text-[#444] mt-4">
            <li className="mb-4">sub heading 1</li>
            <li className="mb-4">sub heading 2</li>
            <li className="mb-4">sub heading 3</li>
            <li className="mb-4">sub heading 4</li>
          </ul>
        </div>

        <div className="md:w-[20%] w-[40%] mx-auto flex flex-col gap-4">
          <h2 className="font-bold  text-xl text-[#673AB7]">Connect Me</h2>
          <div className="flex gap-4">
            <Image
              src={linkedin}
              alt="logo"
              width={30}
              className="mr-2 cursor-pointer"
            ></Image>
            <Image
              src={google}
              alt="logo"
              width={30}
              className="mr-2 cursor-pointer"
            ></Image>
            <Image
              src={reddit}
              alt="logo"
              width={30}
              className="mr-2 cursor-pointer"
            ></Image>
            <Image
              src={instagram}
              alt="logo"
              width={30}
              className="mr-2 cursor-pointer"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
