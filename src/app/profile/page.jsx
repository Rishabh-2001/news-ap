"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileCard from "@/components/ProfileCard";
import heart from "../../../public/heart (2).png";
import save from "../../../public/bookmark.png";
import { useSelector, useDispatch } from "react-redux";
import { getAllLiked } from "../../slice/user.slice";
import {toast} from "react-toastify"
import NewsCard from "@/components/NewsCard";


const Profile = () => {
  const dispatch=useDispatch();
  const [view,setView]=useState('saved')
  const user = useSelector((st) => st?.user?.user);
  const {error, isLoading, likedSavedData}  =  useSelector((st) => st?.user?.user?.likedNews)
  if(error)
  {
    toast.error(error);
  }
  const liked=likedSavedData?.data?.liked || []
  const saved= likedSavedData?.data?.saved || []
  // console.log("Liked SAVED DATA", user, liked, saved , likedSavedData);

 
  useEffect(()=>{
    const userLocal=localStorage.getItem('user');
    if(JSON.parse(userLocal)?.uid)
    {
      dispatch(getAllLiked({uid:JSON.parse(userLocal)?.uid}))
    }
  }, [])




 

  return (
    <div className="px-8 py-6">
      <ProfileCard user={user} />

      <div className="px-2 mt-8">
        <div className="w-full flex flex-col justify-between">
          <div className="mx-auto flex justify-between py-4 rounded px-4 bg-gray-100 w-full">
            <div
              className={`flex flex-[1] gap-2 cursor-pointer hover:text-blue-500 hover:underline justify-center ${view==="saved" ? "text-blue-500 underline": ""}`}
              onClick={()=> setView('saved')}
            >
              <Image src={save} alt="saved" width={30} height={30}></Image>
              <span className="text-xl">Saved Articles</span>
            </div>
            <div
              className={`flex gap-2 flex-[1] cursor-pointer hover:text-red-500 hover:underline justify-center ${view==="liked" ? "text-red-500 underline": "" }`}
              onClick={()=> setView('liked')}
            >
              <Image src={heart} alt="liked" width={30} height={30}></Image>
              <span className="text-xl">Liked Articles</span>
            </div>
          </div>

          <div className="mx-8 flex justify-between py-4 rounded px-4 bg-white w-full">
            {view==="saved"? <div className="flex-col gap-2">
                {saved && saved?.length>0 ? saved?.map((saveNews,idx)=>(
                    <NewsCard key={idx} news={saveNews} savee={true}  />
                ))
                  :
                  <span className="text-xl font-bold my-12 text-center ">
                     No Saved Articles
                    </span>}
              </div>
              : 
              <div className="flex-col gap-2">
              {liked && liked?.length>0 ? liked?.map((likedNews,idx)=>(
                  <NewsCard key={idx} news={likedNews} likee={true}  />
              ))
                :
                <span className="text-xl font-bold my-12 text-center ">
                   No Liked Articles
                  </span>}
            </div>
                }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
