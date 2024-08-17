import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {

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
      className="w-full h-[30vh] sm:h-[40vh] md:h-[80vh] lg:h-[70vh] xl:h-[50vh] flex flex-col justify-center  items-start p-[7%] text-white"
    >
      <h1 className="w-[70%] text-xl md:text-3xl lg:text-5xl font-black ">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[90%] md:w-[70%] text-smmd:text-base lg:text-lg my-1 md:my-3">
        {window.innerWidth < 768
          ? data.overview.slice(0, 100)
          : data.overview.slice(0, 160)}
        ...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="flex text-sm font-semibold md:text-base lg:text-lg gap-1">
        <i className="text-yellow-500 ri-megaphone-fill"></i>
        {data.release_date || "No Information"}
        <i className="text-yellow-500 ri-album-fill ml-5"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="p-2 md:p-3 lg:p-4  text-xs md:text-base lg:text-lg rounded bg-secondary mt-2 md:mt-5 "
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
