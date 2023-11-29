"use client";
import NewsCard from "@/components/NewsCard";
import List from "@/components/image-components/List";
import Tile from "@/components/image-components/Tile";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "./slice/news.slice";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import NewsTile from "@/components/NewsTile";
import { useRouter } from "next/navigation";
import { listenToAuthState } from "./slice/user.slice";
// import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

export default function Home() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const user = useSelector((st) => st?.user?.user);

  useEffect(() => {
    dispatch(listenToAuthState());
  }, []);

  useEffect(() => {
    dispatch(listenToAuthState());
  }, []);

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);
  const query = useSelector((store) => store?.news?.news?.search);
  const { isLoading, error, newsData } = useSelector((st) => st?.news?.news);
  const [view, setView] = useState("TILE");
  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    if (newsData && newsData?.articles && newsData.articles?.length > 0) {
      if (isLoggedIn) {
        setData(newsData?.articles);
      } else {
        setData(newsData?.articles?.slice(0, 6));
      }
    }
  }, [newsData]);

  useEffect(() => {
    dispatch(getAllNews({ page, category, query }))
      .then((res) => {})
      .catch((err) => {
        // console.log("ER in dis", err);
        toast.error(err);
      });
  }, [page, category, query]);

  function handleLoginBtn() {
    router.push("/auth/login");
  }

  return (
    <>
      <div className="px-4 py-2 bg-[#673AB7] w-full">
        <ul className="flex justify-around items-center text-[#fff]">
          <li
            className={`cursor-pointer hover:text-black border-l-4 ${
              category === "" ? "border-b" : ""
            } border-white pl-2 text-center`}
            onClick={() => setCategory("")}
          >
            All
          </li>
          <li
            className={`cursor-pointer hover:text-black border-l-4 ${
              category === "entertainment" ? "border-b" : ""
            } border-white pl-2 text-center`}
            onClick={() => setCategory("entertainment")}
          >
            Entertainment
          </li>
          <li
            className={`cursor-pointer hover:text-black border-l-4 ${
              category === "sports" ? "border-b" : ""
            } border-white pl-2 text-center`}
            onClick={() => setCategory("sports")}
          >
            Sports
          </li>
          <li
            className={`cursor-pointer hover:text-black border-l-4 ${
              category === "health" ? "border-b" : ""
            } border-white pl-2 text-center`}
            onClick={() => setCategory("health")}
          >
            HealthCare
          </li>
          <li
            className={`cursor-pointer hover:text-black border-l-4 ${
              category === "business" ? "border-b" : ""
            } border-white pl-2 text-center`}
            onClick={() => setCategory("business")}
          >
            Buisness
          </li>
          <li
            className={`cursor-pointer hover:text-black border-l-4 ${
              category === "technology" ? "border-b" : ""
            } border-white pl-2 text-center`}
            onClick={() => setCategory("technology")}
          >
            Technology
          </li>
        </ul>
      </div>
      <main className="px-8 py-4 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-lg  ">Recent Headlines:</h2>
          <div className="flex gap-6">
            <Tile view={view} setView={setView} />
            <List view={view} setView={setView} />
          </div>
        </div>

        {!isLoading ? (
          view === "LIST" ? (
            <div className="flex-col gap-2">
              {data && data?.length > 0 ? (
                data?.map((news, idx) => (
                  <NewsCard key={idx} news={news} isLoggedIn={isLoggedIn} />
                ))
              ) : (
                <div>
                  <span className="mx-auto mt-12 text-center font-medium text-xl">
                    No New Headlines
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-0 flex-wrap justify-evenly items-stretch">
              {data && data?.length > 0 ? (
                data?.map((news, idx) => (
                  <div
                    key={idx}
                    className="lg:w-[25%] w-[25%] md:w-[40%] sm:w-[50%]"
                  >
                    <NewsTile key={idx} news={news} isLoggedIn={isLoggedIn} />
                  </div>
                ))
              ) : (
                <div>
                  <span className="mx-auto mt-12 text-center font-medium text-xl">
                    No New Headlines
                  </span>
                </div>
              )}
            </div>
          )
        ) : (
          <div className="flex flex-col gap-6 pt-12">
            <Loader />
            <h2 className="text-2xl mt-4 font-bold mx-auto">
              Getting News ...{" "}
            </h2>
          </div>
        )}

        {isLoggedIn ? (
          <button
            className="mx-auto flex justify-center mt-4 px-4 py-1 text-md text-white bg-[#673AB7] cursor-pointer rounded-2xl "
            onClick={() => setPage((prev) => prev + 1)}
          >
            Show More
          </button>
        ) : (
          <button
            className="mx-auto flex justify-center mt-4 px-4 py-1 text-md text-white bg-[#673AB7] cursor-pointer rounded-2xl"
            onClick={handleLoginBtn}
          >
            Please Log in to View More
          </button>
        )}
      </main>
    </>
  );
}
