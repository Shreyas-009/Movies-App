import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import axios from "../utils/Axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
  const [category, setCategory] = useState("popular");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);
  document.title = "Movie App | Movie " + category;

  const getMovie = async (reset = false) => {
    try {
      const { data } = await axios.get(
        `/movie/${category}?page=${reset ? 1 : page}`
      );
      //   setMovie(data.results);
      if (data.results.length > 0) {
        setMovie((prevState) =>
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
    setMovie([]);
    setHasmore(true);
    await getMovie(true);
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();
  return movie.length > 0 ? (
    <div className="w-full h-screen p-[2%] py-4 ">
      <div className="w-full  flex items-center justify-between font-bold">
        <h1 className="text-zinc-400 text-xl md:text-3xl lg:text-4xl font-semibold flex gap-2 items-center">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line to-zinc-400 hover:text-secondary"
          ></i>{" "}
          <span>Movie</span>
        </h1>
        <div className="hidden lg:block">
          <TopNav wid={100} lef={0} />
        </div>{" "}
        <DropDown
          title="Category"
          category={category}
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={() => getMovie()}
        scrollThreshold={0.9}
        hasMore={hasmore}
        loader={
          <h1 className="text-3xl text-zinc-400 font-semibold">Loading...</h1>
        }
      >
        <VerticalCards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
