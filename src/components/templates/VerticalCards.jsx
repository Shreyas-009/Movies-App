import React from "react";
import { Link } from "react-router-dom";

const VerticalCards = ({ data }) => {
  return (
    <div className="flex flex-wrap w-full gap-12 justify-center py-10">
      {data.map((c, i) => (
        <Link className="w-[25vh]" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original${
              c.poster_path || c.backdrop_path || c.profile_path
            })}`}
            alt=""
          />
          <h1 className="text-2xl text-zinc-400 mt-3 font-semibold">{c.title || c.name || c.original_title || c.original_name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default VerticalCards;
