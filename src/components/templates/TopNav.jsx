import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/Axios";

const TopNav = ({wid ,lef}) => {
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
    <div className=" h-[10vh] relative flex justify-center items-center">
      <i className="ri-search-line text-3xl text-zinc-400"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        className={`w-[${wid}%]  mx-10 p-5 text-xl outline-none border-none bg-transparent text-zinc-200`}
        placeholder="Search anything"
      />

      {/* {query.length > 1 && ( */}
        <i
          onClick={() => setQuery("")}
          className={`${query.length > 0 ? "initial" : "invisible"} ri-close-fill text-3xl text-zinc-400`}
        ></i>
      {/* )} */}

      <div className={`absolute w-[${wid}%]  max-h-[50vh] bg-zinc-200 top-[90%] left-[${lef}%]  overflow-auto rounded`}>
        {searches.map((s, i) => (
          <Link
            key={i}
            className="font-semibold w-full p-10 flex items-center border-2 border-zinc-100 hover:text-black text-zinc-600 hover:bg-zinc-300 duration-300 "
          >
            <img
              className="h-[10vh] w-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.poster_path
                  ? `https://image.tmdb.org/t/p/w500${
                      s.backdrop_path || s.poster_path
                    }`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIvDZdFJUGi9HcQDsZFo_hLp6c0xhlZmEUzQ&s"
              }
              alt=""
            />
            <span>
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
