import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import axios from "../utils/Axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);
  document.title = "Movie App | People ";

  const getPeople = async (reset = false) => {
    try {
      const { data } = await axios.get(`/person/popular?page=${reset ? 1 : page}`);
      //   setPeople(data.results);
      if (data.results.length > 0) {
        setPeople((prevState) =>
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
    setPeople([]);
    setHasmore(true);
    await getPeople(true);
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  const navigate = useNavigate();
  return people.length > 0 ? (
    <div className="w-full h-screen p-[2%]">
      <div className="w-full  flex items-center gap-36 font-bold">
        <h1 className="text-zinc-400 text-4xl font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line to-zinc-400 hover:text-secondary text-4xl"
          ></i>{" "}
          People
        </h1>
        <TopNav wid={100} lef={0} />
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={() => getPeople()}
        scrollThreshold={0.9}
        hasMore={hasmore}
        loader={
          <h1 className="text-3xl text-zinc-400 font-semibold">Loading...</h1>
        }
      >
        <VerticalCards data={people} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
