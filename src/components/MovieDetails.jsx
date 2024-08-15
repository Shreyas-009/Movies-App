import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";

const MovieDetails = () => {
  const { info } = useSelector((state) => state.movie);
  // console.log(info);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.6),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-auto md:h-[180vh] px-[5%] md:px-[10%] overflow-x-hidden relative"
    >
      {/* part 1 navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex gap-4 md:gap-7 items-center text-xl md:text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line to-zinc-400 hover:text-secondary"
        ></Link>
        <a href={info.detail.homepage} target="_blank">
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          target="_blank"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          target="_blank"
        >
          imdb
        </a>
      </nav>

      {/* part 2 poster and details */}
      <div className="w-full flex flex-col md:flex-row ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[60vh] md:h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-0 md:ml-[5%] text-white mt-5 md:mt-0">
          <h1 className="font-black text-xl md:text-5xl flex gap-3 items-end">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_title ||
              info.detail.original_name}
            <small className=" text-lg md:text-2xl font-bold text-zinc-300 ">
              ({info.detail.release_date.split("-", 1)})
            </small>
          </h1>

          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-5 items-start md:items-center mt-5 mb-5">
            <span className="hidden md:flex rounded-full text-lg md:text-xl font-semibold bg-yellow-600 h-[4vh] w-[4vh] md:h-[6vh] md:w-[6vh]  justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="hidden md:block font-semibold text-lg md:text-2xl w-auto md:w-[50px] leading-6">
              User Score
            </h1>

            <h1 className="text-lg md:text-base">{info.detail.release_date}</h1>
            <h1 className="text-lg md:text-base">
              {info.detail.genres.map((g) => g.name).join(",")}
            </h1>

            <h1 className="text-lg md:text-base">{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-lg md:text-xl font-bold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-xl md:text-2xl mt-3 mb-1 font-semibold text-zinc-100">
            Overview
          </h1>

          <p className="text-sm md:text-base text-zinc-300">
            {info.detail.overview}
          </p>

          <h1 className="text-xl md:text-2xl mt-3 mb-1 font-semibold text-zinc-100">
            Movie Translations
          </h1>

          <p className="text-sm md:text-base text-zinc-300 mb-10">
            {info.translations.translations
              .map((t) => t.english_name)
              .join(", ")}
          </p>

          <Link
            className="p-3 md:p-5 bg-secondary rounded-lg text-sm md:text-base"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-lg md:text-xl mr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/*part 3 platforms */}
      <div className="w-full md:w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex flex-col md:flex-row gap-3 md:gap-7 text-white">
            <h1>Available on Platform</h1>
            <div className="flex gap-3 md:gap-7">
              {info.watchproviders.flatrate.map((m, i) => (
                <img
                  key={i}
                  title={m.provider_name}
                  className="w-[4vh] h-[4vh] md:w-[5vh] md:h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex flex-col md:flex-row gap-3 md:gap-7 text-white">
            <h1>Available on Rent</h1>
            <div className="flex gap-3 md:gap-7">
              {info.watchproviders.rent.map((m, i) => (
                <img
                  key={i}
                  title={m.provider_name}
                  className="w-[4vh] h-[4vh] md:w-[5vh] md:h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex flex-col md:flex-row gap-3 md:gap-7 text-white">
            <h1>Available on Buy</h1>
            <div className="flex gap-3 md:gap-7">
              {info.watchproviders.buy.map((m, i) => (
                <img
                  key={i}
                  title={m.provider_name}
                  className="w-[4vh] h-[4vh] md:w-[5vh] md:h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/*part 4 Recommendations or similar */}
      <hr className="mt-7 h-[2px] bg-zinc-500 border-none" />
      <h1 className="text-2xl font-bold text-white my-3">Recommendations</h1>
      <div className="mb-10 md:mb-0">
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
