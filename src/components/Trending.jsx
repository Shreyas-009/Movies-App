import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import axios from "../utils/Axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);
  document.title = "Movie App | Trending " + category;

  const getTrending = async (reset = false) => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${reset ? 1 : page}`
      );
      //   setTrending(data.results);
      if (data.results.length > 0) {
        setTrending((prevState) =>
          reset ? data.results : [...prevState, ...data.results]
        );
        setPage((prevPage) => (reset ? 2 : prevPage + 1));
      } else {
        setHasmore(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refreshHandler = async () => {
    setPage(1);
    setTrending([]);
    setHasmore(true);
    await getTrending(true);
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  const navigate = useNavigate();
  return trending.length > 0 ? (
    <div className="w-full h-screen p-[2%] py-4">
      <div className="w-full  flex items-center justify-between font-bold">
        <h1 className="text-zinc-400 text-xl md:text-3xl lg:text-4xl font-semibold flex gap-2 items-center">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line to-zinc-400 hover:text-secondary "
          ></i>{" "}
          <span>Trending</span>
        </h1>
        <div className="hidden lg:block">
          <TopNav wid={100} lef={0} />
        </div>
        <div className="w-[60%] md:w-[40%] flex gap-3">
          <DropDown
            title="Category"
            category={category}
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <DropDown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={() => getTrending()}
        scrollThreshold={0.9}
        hasMore={hasmore}
        loader={
          <h1 className="text-3xl text-zinc-400 font-semibold">Loading...</h1>
        }
      >
        <VerticalCards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
