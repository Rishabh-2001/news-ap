import React from "react";
import Image from "next/image";
import Save from "./image-components/Save";
import Like from "./image-components/Like";


// save and like
// save in firebase

// HOSTing

const NewsTile = ({ news, isLoggedIn }) => {
  return (
    <div className="border rounded-md shadow-md flex flex-col py-2 px-4 m-2 min-h-[550px]">
      <div className="w-full sm:mx-auto  rounded-md">
        <Image
          src={news?.urlToImage || ""}
          alt="Picture of the news"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={400}
          height={250}
        />
      </div>
      <div className="flex flex-col justify-between flex-[1]">
        <div>
          <div className="flex flex-col justify-between items-center mt-4">
            <h2 className="text-xl font-bold font-serif">{news?.title}</h2>
          </div>
          <div className="flex gap-4  justify-end ">
            <Save news={news} isLoggedIn={isLoggedIn} />
            <Like news={news} isLoggedIn={isLoggedIn} />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">{news?.author}</span>
            <span className="text-xl text-gray-500 mx-1"> &middot; </span>
            <span className="text-xs text-gray-500">{news?.publishedAt}</span>
          </div>
        </div>
        <p className="text-base font-normal leading-relaxed text-gray-700">
          {news?.content}
        </p>
        <div className="flex justify-between items-center mt-4">
          <a href={news?.url} target="_blank" className="text-blue-600">
            Read more
          </a>
          <span className="font-medium">Source: {news?.source?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsTile;
