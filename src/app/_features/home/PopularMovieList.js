"use client";

import { LoadingMovieList } from "./LoadingMovieList";
import { useEffect, useState } from "react";

import { ArrowRight } from "../_icons/ArrowRight";
import { MovieCard } from "@/app/_components/MovieCard";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const PopularMovieList = (F) => {
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopularDataList = async () => {
    try {
      setLoading(true);
      const popularEndpoint = `${BASE_URL}/movie/popular?language=en-US&page=1`;
      const response = await fetch(popularEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setPopularMoviesData(data.results);
      setLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    console.log("page running");
    getPopularDataList();
  }, []);

  if (loading) {
    return <LoadingMovieList />;
  }

  return (
    <div className="  w-[1277px] h-[978px] flex flex-col justify-between">
      <div className="flex justify-between">
        <h3 className="font-semibold inter text-[24px]">Popular</h3>
        <div className="flex items-center text-[14px] text-[#09090B] gap-[8px]">
          See More
          <ArrowRight />
        </div>
      </div>
      <div className=" w-[1277px] h-[910px] overflow-hidden ">
        <div className="grid grid-rows-2 grid-cols-5 gap-[32px] top-[191px] left-[52px]">
          {popularMoviesData.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                title={movie.title}
                imageURL={movie.poster_path}
                rating={movie.vote_average}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
