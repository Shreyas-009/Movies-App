import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  return (    
      <div className="w-[100%] flex gap-4  overflow-y-hidden mb-5 px-5">
        {data.map((d, i) => (
          <Link to={`${d.media_type}/details/${d.id}`} key={i} className=" min-w-[15%] bg-zinc-900 mb-3">
            <img
              src={`https://image.tmdb.org/t/p/w500${
                d.poster_path || d.backdrop_path
              }`}
              alt={d.title}
              className="w-full object-cover h-[65%]"
            />

            <div className="text-white p-2 h-[35%]">
              <h1 className="text-xl font-semibold line-clamp-1">
                {d.title || d.name || d.original_title || d.original_name}
              </h1>

              <p className="text-xs mt-3 mb-3">
                {d.overview.slice(0, 60)}...
                <Link className="text-zinc-500">more</Link>
              </p>
            </div>
          </Link>
        ))}
      </div>
  );
};

export default HorizontalCards;
