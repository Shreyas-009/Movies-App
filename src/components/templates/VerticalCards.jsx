import React from "react";
import { Link } from "react-router-dom";

const VerticalCards = ({ data , title }) => {
  console.log(title);
  return (
    <div className="flex flex-wrap w-full gap-12 justify-center py-10">
      {data.map((c, i) => (
        <Link to={`/${data.media_type || title}/details/${c.id}`} className="w-[25vh] relative" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original${
              c.poster_path || c.backdrop_path || c.profile_path
            })}`}
            alt=""
          />
          <h1 className="text-2xl text-zinc-400 mt-3 font-semibold">
            {c.title || c.name || c.original_title || c.original_name}
          </h1>
          {c.vote_average && (
            <div className=" absolute right-[-10%] bottom-[30%] rounded-full text-xl font-semibold bg-yellow-600 h-[6vh] w-[6vh] flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default VerticalCards;
