import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../../public/image.png";

const HorizontalCards = ({ data, mediaType }) => {
  return (
    <div className="w-[100%] md:h-fit flex gap-4 overflow-y-hidden md:mb-5">
      {data.length > 1 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type || mediaType}/details/${d.id}`}
            key={i}
            className=" min-w-[35%] sm:min-w-[20%] md:min-w-[15%] bg-zinc-900 mb-3 h-[25vh]   md:h-[45vh] landscape:h-[70vh] landscape:min-w-[20%]"
          >
            <img
              src={
                d.poster_path || d.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${
                      d.poster_path || d.backdrop_path
                    }`
                  : noimage
              }
              alt={d.title}
              className="w-full object-cover h-[90%] md:h-[70%]"
            />

            <div className=" text-white px-1 md:p-2 h-[10%] md:h-[30%] overflow-y-auto">
              <h1 className="text-sm font-semibold line-clamp-1">
                {d.title || d.name || d.original_title || d.original_name}
              </h1>

              <p className="hidden md:block text-xs mt-3 mb-3">
                {d.overview.slice(0, 60)}...
                <span className="text-zinc-500">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white from-black h-[45vh] w-full flex items-center justify-center bg-[rgba(0,0,0,.1)]">
          Nuthing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
