"use client";

import { StarIcon } from "../_icons/StarIcon";
import { LoadingMovieList } from "./LoadingMovieList";
import { useEffect, useState } from "react";
import { MovieCard } from "../../_components/MovieCard";
import { ArrowRight } from "../_icons/ArrowRight";
import { useRouter } from "next/navigation";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const MovieList = ({ type, seeMore }) => {
  const router = useRouter();
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopularDataList = async () => {
    setLoading(true);

    const popularEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
    const response = await fetch(popularEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("data", data);

    setPopularMoviesData(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getPopularDataList();
  }, []);

  // if (loading) {
  //   return <LoadingMovieList />;
  // }

  const handleSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };

  return (
    <div className="flex flex-col justify-between px-[80px] gap-x-8 gap-8">
      <div className="flex justify-between items-center">
        <p className="text-[var(--text-text-foreground)] font-inter text-2xl font-semibold leading-8 tracking-[-0.6px]">
          {type.toUpperCase()}
        </p>
        <div className="flex h-[36px] py-2 px-4 justify-center items-center gap-2 rounded-md border border-[#E4E4E7 bg-white shadow-sm">
          {seeMore && (
            <button
              onClick={handleSeeMoreButton}
              className="flex items-center justify-center text-[14px] text-[#09090B] gap-2 cursor-pointer"
            >
              See More
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="w-[1277px] h-[910px] flex items-start content-start self-stretch flex-wrap gap-x-8 gap-y-8">
        {popularMoviesData.slice(0, 10).map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            imageURL={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};
