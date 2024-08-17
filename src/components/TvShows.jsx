import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import axios from "../utils/Axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TvShows = () => {
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);
  document.title = "Movie App | Tv " + category;

  const getTvShows = async (reset = false) => {
    try {
      const { data } = await axios.get(
        `/tv/${category}?page=${reset ? 1 : page}`
      );
      //   setTv(data.results);
      if (data.results.length > 0) {
        setTv((prevState) =>
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
    setTv([]);
    setHasmore(true);
    await getTvShows(true);
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();
  return tv.length > 0 ? (
    <div className="w-full h-screen p-[2%] py-4">
      <div className="w-full  flex items-center justify-between font-bold">
        <h1 className="text-zinc-400 text-xl md:text-3xl lg:text-4xl font-semibold flex gap-2 items-center">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line to-zinc-400 hover:text-secondary "
          ></i>{" "}
          <span>Tv</span>
        </h1>
        <div className="hidden lg:block">
          <TopNav wid={100} lef={0} />
        </div>
        <DropDown
          title="Category"
          category={category}
          options={["on_the_air", "popular", "top_rated", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={tv.length}
        next={() => getTvShows()}
        scrollThreshold={0.9}
        hasMore={hasmore}
        loader={
          <h1 className="text-3xl text-zinc-400 font-semibold">Loading...</h1>
        }
      >
        <VerticalCards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
