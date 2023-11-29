import React from "react";
import Save from "./image-components/Save";
import Like from "./image-components/Like";
import Image from "next/image";

const NewsCard = ({ news, isLoggedIn , savee, likee}) => {
  return (
    <div className="border rounded-md shadow-md flex flex-col lg:flex-row md:flex-row sm:flex-col gap-4 py-3 px-6 my-4">
      <div className="w-[30%] lg:w-[30%] md:w-[30%] sm:w-full sm:mx-auto  rounded-md">
        <Image
          src={news?.urlToImage || ""}
          alt="Picture of the news"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={700}
          height={400}
        />
      </div>
      <div className="flex flex-col justify-between flex-[1]">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-serif">{news?.title}</h2>
          { !savee && !likee  && <div className="flex gap-4">
              <Save news={news} isLoggedIn={isLoggedIn} />
              <Like news={news} isLoggedIn={isLoggedIn} />
            </div>}
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">{news?.author}</span>
            <span className="text-xl text-gray-500 mx-1"> &middot; </span>
            <span className="text-xs text-gray-500">{news?.publishedAt}</span>
          </div>
        </div>
        <p className="text-base font-normal leading-relaxed text-gray-700">
          {news?.content}
        </p>
        <div className="flex justify-between items-center">
          <a href={news?.url} target="_blank">
            Read more
          </a>
          <span>Source: {news?.source?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
