import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="border-r-2 border-zinc-400 w-[20%] h-[100%] p-3 overflow-x-auto">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-secondary ri-tv-fill mr-2"></i>
        <span className="">Movies-App</span>
      </h1>
      <nav className="text-zinc-400 flex flex-col gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link
          to="./trending"
          className="hover:text-white hover:bg-secondary rounded p-5 duration-300"
        >
          <i className="ri-fire-fill mr-2"></i>
          Trending
        </Link>
        <Link
          to="./popular"
          className="hover:text-white hover:bg-secondary rounded p-5 duration-300"
        >
          <i className="ri-bard-fill mr-2"></i>
          Popular
        </Link>
        <Link
          to="./movie"
          className="hover:text-white hover:bg-secondary rounded p-5 duration-300"
        >
          <i className="ri-movie-fill mr-2"></i>
          Movies
        </Link>
        <Link
          to="./tv"
          className="hover:text-white hover:bg-secondary rounded p-5 duration-300"
        >
          <i className="ri-tv-2-fill mr-2"></i>
          Tv Show
        </Link>
        <Link
          to="./person"
          className="hover:text-white hover:bg-secondary rounded p-5 duration-300"
        >
          <i className="ri-team-fill mr-2"></i>
          People
        </Link>
      </nav>

      <hr className=" border-none h-[1px] bg-zinc-400" />

      <nav className="hidden text-zinc-400  flex-col gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          Website Information
        </h1>
        <Link className="hover:text-white hover:bg-secondary rounded p-5 duration-300">
          <i className="ri-information-fill mr-2"></i>
          About
        </Link>
        <Link className="hover:text-white hover:bg-secondary rounded p-5 duration-300">
          <i className="ri-phone-fill mr-2"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
