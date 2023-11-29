import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import menuIcon from "../../public/menu-outline.svg";
import closeIcon from "../../public/close-outline.svg";
import LogoMain from "./LogoMain";
// import bgImg from '../../public/newspaper_2965879.png'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  listenToAuthState,
  setUser,
  signInWithGoogle,
  signOutUser,
} from "../app/slice/user.slice";
import { deleteCookie, getCookie } from "cookies-next";
import { setSearch } from "@/app/slice/news.slice";
import heart from "../../public/heart (2).png";
import saved from "../../public/bookmark.png";
import userdp from "../../public/user.png";
import { useRouter } from "next/navigation";
import logout from "../../public/logout.png";
const Navbar = () => {
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const user = useSelector((st) => st?.user?.user);

  useEffect(() => {
    dispatch(listenToAuthState());
  }, []);

  console.log("USER", user);

  const handleSearch = () => {
    dispatch(setSearch(q));
  };

  if (q === "") {
    handleSearch();
  }

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  function handleLogOut() {
    dispatch(signOutUser());
    localStorage.clear();
    deleteCookie("user");
    router.push("/");
  }

  function toggleIcon(e) {
    const navlinksEl = document.querySelector(".navlinks");
    if (e.target.alt === "menu") {
      e.target.src = closeIcon;
      e.target.alt = "close";
      navlinksEl.classList.toggle("top-[10%]");
    } else {
      e.target.src = menuIcon;
      e.target.alt = "menu";
      navlinksEl.classList.toggle("top-[10%]");
    }
  }
  function handleRoute() {
    router.push("/profile");
  }

  return (
    <>
      <div
        id="navbar"
        className=" py-4  flex justify-between px-6 items-center bg-white  top-[0%] z-10 border-b-2 sticky"
      >
        <LogoMain />{" "}
        <div className="navlinks md:static absolute md:min-h-fit min-h-[50vh]  left-0 top-[-100%] md:w-auto w-full bg-white flex items-center px-5 transition-all duration-200 ease-in gap-2">
          <input
            className="border rounded-xl px-4 py-1 "
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search any Topic..."
          ></input>
          <button
            className="border  md:px-4 px-2 md:py-1 py-1  rounded-full bg-[#673AB7]  text-white cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <ul className="flex justify-around items-center font-sans font-semibold gap-[1vw]  ">
          {!isLoggedIn ? (
            <div className="flex gap-2">
              <li className="border md:px-6 px-3 md:py-2.5 py-1.5 rounded-full bg-[#673AB7] text-white cursor-pointer">
                <Link href="/auth/login">Login</Link>
              </li>
              <li className="border  md:px-6 px-3 md:py-2.5 py-1.5  rounded-full bg-[#673AB7] text-white cursor-pointer">
                <Link href="/auth/register">Register</Link>
              </li>
            </div>
          ) : (
            <div className="flex gap-6">
              <div
                className="flex gap-2 cursor-pointer hover:text-blue-500 hover:underline"
                onClick={handleRoute}
              >
                <Image src={saved} alt="saved" width={20} height={20}></Image>
                <span>Saved Articles</span>
              </div>

              <div
                className="flex gap-2 cursor-pointer hover:text-red-500 hover:underline"
                onClick={handleRoute}
              >
                <Image src={heart} alt="liked" width={20} height={20}></Image>
                <span>Liked Articles</span>
              </div>

              <div
                className="flex gap-2 cursor-pointer hover:text-green-500 hover:underline"
                onClick={handleRoute}
              >
                <span>{user?.profileData?.displayName || "Guest"}</span>
                <Image
                  src={user?.profileData?.photoURL || userdp}
                  alt="user"
                  width={25}
                  height={25}
                  className="rounded-full "
                ></Image>
              </div>
              <div
                className="flex gap-2 cursor-pointer hover:text-green-500 hover:underline"
                onClick={handleLogOut}
              >
                <Image src={logout} alt="user" width={25} height={25}></Image>
                <span>Log Out</span>
              </div>
            </div>
          )}
          <Image
            src={menuIcon}
            alt="menu"
            width={20}
            className="md:hidden"
            onClick={toggleIcon}
          ></Image>
          {/* <Image src={closeIcon} alt='close' width={20}  className='md:hidden' onClick={toggleIcon}></Image> */}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
