import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/Axios";
import Header from "./templates/Header"
import HorizontalCards from "./templates/HorizontalCards";
import DropDown from "./templates/DropDown";
import Loading from "./Loading";

const Home = () => {
  document.title = "Movies App | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData = await data.results[
        (Math.random() * data.results.length).toFixed()
      ];
      setWallpaper(randomData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    !wallpaper & getHeaderWallpaper();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className=" w-[80%] h-screen overflow-auto overflow-x-hidden">
        <TopNav wid={50} lef={25}/>
        <Header data={wallpaper} />
        <div className=" flex justify-between p-5">
          <h1 className="text-zinc-400 text-3xl font-semibold">Trending</h1>
          <DropDown
            title="Filter"
            category={category}
            func={(e) => setCategory(e.target.value)}
            options={["tv", "movie", "all"]}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <div className=" w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default Home;
