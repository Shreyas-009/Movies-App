import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="absolute w-screen h-screen text-white flex items-center  justify-center top-0 left-0 z-50 bg-[rgba(0,0,0,.8)]">
      <Link
        onClick={() => navigate(-1)}
        className="ri-close-line absolute z-50 top-10 right-14 text-3xl to-zinc-400 hover:text-secondary"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          height={600}
          width={1200}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  )
};

export default Trailer;
