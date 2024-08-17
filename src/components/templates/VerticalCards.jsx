// import React from "react";
// import { Link } from "react-router-dom";
// import noimage from "../../../public/image.png";

// const VerticalCards = ({ data, title }) => {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3  gap-1 md:flex md:flex-wrap w-full md:gap-12 justify-center py-5 md:py-10">
//       {data.map((c, i) => (
//         <Link
//           to={`/${c.media_type || title}/details/${c.id}`}
//           className="md:w-[25vh] relative p-3 md:p-0"
//           key={i}
//         >
//           <img
//             className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] md:h-[40vh] object-cover"
//             src={
//               c.poster_path || c.backdrop_path || c.profile_path
//                 ? `https://image.tmdb.org/t/p/original${
//                     c.poster_path || c.backdrop_path || c.profile_path
//                   })}`
//                 : noimage
//             }
//             alt=""
//           />
//           <h1 className="text-xl line-clamp-1 md:text-2xl text-zinc-400 mt-3 font-semibold">
//             {c.title || c.name || c.original_title || c.original_name}
//           </h1>
//           {c.vote_average && (
//             <div className=" absolute right-[1%] sm:right-[3%] md:right-[-10%] bottom-[85%] sm:bottom-[85%] md:bottom-[30%] rounded-full text-xl font-semibold bg-yellow-600 h-[6vh] w-[6vh] flex justify-center items-center">
//               {(c.vote_average * 10).toFixed()} <sup>%</sup>
//             </div>
//           )}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default VerticalCards;

import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../../public/image.png";

const VerticalCards = ({ data, title }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3  gap-1 md:flex md:flex-wrap w-full md:gap-12 justify-center py-5 md:py-10">
      {data.map((c, i) => {
        const content = (
          <>
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] md:h-[40vh] object-cover"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original${
                      c.poster_path || c.backdrop_path || c.profile_path
                    })`
                  : noimage
              }
              alt=""
            />
            <h1 className="text-xl line-clamp-1 md:text-2xl text-zinc-400 mt-3 font-semibold">
              {c.title || c.name || c.original_title || c.original_name}
            </h1>
            {c.vote_average && (
              <div className="absolute right-[1%] sm:right-[3%] md:right-[-10%] bottom-[85%] sm:bottom-[85%] md:bottom-[30%] rounded-full text-xl font-semibold bg-yellow-600 h-[6vh] w-[6vh] flex justify-center items-center">
                {(c.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
          </>
        );

        if (c.profile_path) {
          return (
            <div className="md:w-[25vh] relative p-3 md:p-0" key={i}>
              {content}
            </div>
          );
        }

        return (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            className="md:w-[25vh] relative p-3 md:p-0"
            key={i}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
};

export default VerticalCards;