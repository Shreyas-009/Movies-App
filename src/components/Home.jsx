import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/Axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import DropDown from "./templates/DropDown";
import Loading from "./Loading";

const Home = () => {
  document.title = "Movies App | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [category1, setCategory1] = useState("all");
  const [category2, setCategory2] = useState("tv");
  const [menuOpen, setMenuOpen] = useState(false);

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
      const { data } = await axios.get(`/trending/${category1}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/${category2}/popular`);
      setPopular(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
    getTrending();
  }, [category1]);

  useEffect(() => {
    getPopular();
  }, [category2]);

  return wallpaper && trending && popular ? (
    <>
      <div className="flex w-full">
        {/* SideNav */}
        <div
          className={`fixed lg:relative z-40 bg-primary lg:bg-transparent h-screen w-[60%] sm:w-[40%] md:w-[30%] lg:w-[20%] transform transition-transform duration-700 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <SideNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>

        {/* Main Content */}
        <div className="w-full relative lg:w-[80%] md:h-screen overflow-auto overflow-x-hidden ml-auto ">
          {/* Hamburger Menu for Mobile View */}
          <div
            className={`absolute lg:hidden ${
              menuOpen
                ? "top-4 left-4 sm:left-10 md:left-10"
                : "top-3 left-4 sm:left-10 md:left-10 md:top-5"
            } z-50 transform transition-all duration-700 ease-in-out ${
              menuOpen ? "translate-x-[180px]" : "translate-x-0"
            }`}
          >
            {!menuOpen && (
              <i
                className="ri-menu-3-line text-white text-xl"
                onClick={() => setMenuOpen(true)}
              ></i>
            )}
          </div>

          <TopNav wid={50} lef={25} />
          <Header data={wallpaper} />

          <div className="px-5">
            {/* First Row */}
            <div className="flex justify-between items-center py-5">
              <h1 className="text-zinc-400 text-xl md:text-3xl font-semibold">
                Trending
              </h1>
              <DropDown
                title="Filter"
                category={category1}
                func={(e) => setCategory1(e.target.value)}
                options={["tv", "movie", "all"]}
              />
            </div>
            <HorizontalCards data={trending} />

            {/* Second Row */}
            <div className="flex md:hidden justify-between items-center py-5">
              <h1 className="text-zinc-400 text-xl md:text-3xl font-semibold">
                Popular
              </h1>
              <DropDown
                title="Filter"
                category={category2}
                func={(e) => setCategory2(e.target.value)}
                options={["movie", "tv"]}
              />
            </div>
            <div className="md:hidden">
              <HorizontalCards data={popular} mediaType={category2} />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default Home;
