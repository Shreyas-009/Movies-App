import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const MovieDetails = () => {
  const { info } = useSelector((state) => state.movie);
  console.log(info);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, []);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.6),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen px-[10%]"
    >
      {/* part 1 navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex gap-7 items-center text-xl">
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
      <div className="w-fill flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.bainfo.detailkdrop_path
          })}`}
          alt=""
        />
      </div>

      {/*part 3 platforms */}
      <div className="w-[80%] bg-red-200">
        <div className="mt-5">
          {info.watchproviders &&
            info.watchproviders.flatrate &&
            info.watchproviders.flatrate.map((m) => (
              <img
                className="w-[5vh] h=[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                alt=""
              />
            ))}
          {/* {info.watchproviders &&
            info.watchproviders.rent &&
            info.watchproviders.rent.map((m) => (
              <img
                className="w-[5vh] h=[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                alt=""
              />
            ))} */}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
