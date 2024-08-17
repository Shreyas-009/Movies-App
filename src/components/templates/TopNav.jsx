import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/Axios";
import noimage from '../../../public/image.png'

const TopNav = ({ wid, lef }) => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const d = await axios.get(`search/multi?query=${query}`);
      setSearches(d.data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className=" h-[7vh]  md:h-[70px] lg:h-[10vh] relative flex justify-center items-center">
      <i className="ri-search-line text-xl sm:text2xl md:text-2xl lg:text-3xl text-zinc-400"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        className={`w-[50%] md:w-[${wid}%] mx-4 md:mx-10 md:p-5 text-sm md:text-xl outline-none border-none bg-transparent text-zinc-200`}
        placeholder="Search anything"
      />

      {/* {query.length > 1 && ( */}
      <i
        onClick={() => setQuery("")}
        className={`${
          query.length > 0 ? "initial" : "invisible"
        } ri-close-fill text-xl md:text-3xl text-zinc-400`}
      ></i>
      {/* )} */}

      <div
        className={`absolute w-[60%] sm:w-[70%]  md:w-[60%] lg:w-[${wid}%]  max-h-[30vh] sm:max-h-[50vh] md:max-h-[50vh] lg:max-h-[50vh] bg-zinc-700 top-[90%] left-[${lef}%]  overflow-auto z-20 rounded-lg`}
      >
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="font-semibold w-full p-3 md:p-10 flex items-center border-2 border-zinc-800 hover:text-black text-zinc-600 hover:bg-zinc-800 duration-300 "
          >
            <img
              className="h-[8vh] w-[8vh] sm:h-[10vh] sm:w-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.poster_path
                  ? `https://image.tmdb.org/t/p/w500${
                      s.backdrop_path || s.poster_path
                    }`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIvDZdFJUGi9HcQDsZFo_hLp6c0xhlZmEUzQ&s"
              }
              alt=""
            />
            <span className="text-sm md:text-lg text-zinc-200">
              {s.title ||
                s.name ||
                s.original_name ||
                s.original_title ||
                s.profile_path}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
