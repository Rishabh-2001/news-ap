import React, { useState } from "react";
import Image from "next/image";
import tile from "../../../public/love.png";
import fillTile from "../../../public/heart (2).png"
import { useRouter } from "next/navigation";
import {useDispatch, useSelector} from "react-redux"
import { AddLikedSaved } from "@/app/slice/user.slice";
import {toast} from 'react-toastify'

const Like = ({ news, isLoggedIn }) => {
  const router = useRouter();
  const dispatch=useDispatch();
  const user=useSelector(store=> (store?.user?.user))
  const [src,setSrc]=useState(tile);

  

  async function handleLike() {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }

    const  payload={
      newsData: news,
      uid: user?.profileData?.uid,
      action: "liked"
    }
    
    console.log("GEtting like for ", payload );
      await dispatch(AddLikedSaved(payload))
      .then(res=>{
        console.log("RES AFTER LIKING ", res);
        toast.success("Added to Liked Articles.")
        setSrc(fillTile)
      })
      .catch(err=>{
        console.log("ERR after liking ", err);
         toast.error("Error Occured")
      })

  }
  return (
    <div>
      <Image
        src={src}
        width={25}
        alt="card"
        className="cursor-pointer"
        onClick={handleLike}
      />
    </div>
  );
};

export default Like;
