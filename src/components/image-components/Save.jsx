import React, { useState } from "react";
import Image from "next/image";
import save from "../../../public/save-instagram.png";
import fillSave from "../../../public/bookmark.png"
import { useRouter } from "next/navigation";
import { AddLikedSaved } from "@/app/slice/user.slice";
import {useDispatch, useSelector} from "react-redux"
import {toast} from  'react-toastify'
const Save = ({ news, isLoggedIn }) => {
  const router = useRouter();
  const [src,setSrc]=useState(save)
  const user=useSelector(store=> (store?.user?.user))
  const dispatch=useDispatch();
  async function handleSave() {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
    const  payload={
      newsData: news,
      uid: user?.profileData?.uid,
      action: "saved"
    }
    
   
      await dispatch(AddLikedSaved(payload))
      .then(res=>{
        // console.log("RES AFTER LIKING ", res);
        toast.success("Added to Saved Articles.")
        setSrc(fillSave)
      })
      .catch(err=>{
       
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
        onClick={handleSave}
      />
    </div>
  );
};

export default Save;
