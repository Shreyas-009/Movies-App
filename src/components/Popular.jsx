import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import axios from "../utils/Axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);
  document.title = "Movie App | Popular " + category;

  const getpopular = async (reset = false) => {
    try {
      const { data } = await axios.get(
        `${category}/popular?page=${reset ? 1 : page}`
      );
      //   setPopular(data.results);
      if (data.results.length > 0) {
        setPopular((prevState) =>
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
    setPopular([]);
    setHasmore(true);
    await getpopular(true);
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();
  return popular.length > 0 ? (
    <div className="w-full h-screen p-[2%]">
      <div className="w-full  flex items-center justify-between font-bold">
        <h1 className="text-zinc-400 text-4xl font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line to-zinc-400 hover:text-secondary text-4xl"
          ></i>{" "}
          Popular
        </h1>
        <TopNav wid={100} lef={0} />
        <DropDown
          title="Category"
          category={category}
          options={["movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={() => getpopular()}
        scrollThreshold={0.9}
        hasMore={hasmore}
        loader={
          <h1 className="text-3xl text-zinc-400 font-semibold">Loading...</h1>
        }
      >
        <VerticalCards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
