import React from "react";
import Image from "next/image";

const ProfileCard = ({ user }) => {
  return (
    <div>
      <div className="w-[80%] mx-auto flex gap-6 shadow-md py-4 px-4 ">
        <div className="rounded-md ">
          <Image
            src={user?.profileData?.photoURL || user}
            alt="Picture of the profile"
            width={100}
            height={80}
          />
        </div>
        <div className=" pt-4  pl-2">
          <h2 className="text-xl font-bold font-serif mb-2">
            {user?.profileData?.displayName || "Guest"}
          </h2>
          <h2 className="font-medium text-base text-gray-600">
            {user?.profileData?.email}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
