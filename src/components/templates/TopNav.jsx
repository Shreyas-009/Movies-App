import React, { useState } from "react";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="w-full h-[10vh] relative flex justify-start items-center ml-[15%]">
      <i className="ri-search-line text-3xl text-zinc-400"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        name=""
        id=""
        className="w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent text-zinc-200"
        placeholder="Search anything"
      />

      {query.length > 0 && <i onClick={()=>setQuery('')} className="ri-close-fill text-3xl text-zinc-400"></i>}

      <div className="absolute w-[50%]  max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto rounded">
        {/* <Link className="font-semibold w-full p-10 flex items-center border-2 border-zinc-100 hover:text-black text-zinc-600 hover:bg-zinc-300 duration-300 ">
          <img src="" alt="" />
          <span>Hello</span>
        </Link> */}
      </div>
    </div>
  );
};

export default TopNav;
