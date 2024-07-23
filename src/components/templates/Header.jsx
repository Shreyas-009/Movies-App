import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.6),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[7%] text-white"
    >
      <h1 className="w-[70%] text-5xl font-black ">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] my-3">
        {data.overview.slice(0, 200)}...
        <Link className="text-blue-400">more</Link>
      </p>
      <p className="flex gap-1">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{data.release_date || "No Information"}
        <i className="text-yellow-500 ri-album-fill ml-5"></i>{data.media_type.toUpperCase()}
      </p>
      <Link className="p-4 rounded bg-secondary mt-5 ">Watch Trailer</Link>
    </div>
  );
};

export default Header;
