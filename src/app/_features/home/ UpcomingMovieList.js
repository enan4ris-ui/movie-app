// import * as React from "react";
"use client";
import { MovieCard } from "@/app/_components/MovieCard";
import { ArrowRight } from "@/app/_features/_icons/ArrowRight";
import { useState, useEffect } from "react";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCu";

export const UpcomingMovieList = () => {
  const [movieData, setMovieData] = useState([]);

  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const upcomingMovieEndpoint = `${BASE_URL}/movie/upcoming?language=en-US&page=1`;
    const response = await fetch(upcomingMovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    const data = await response.json();

    setMovieData(data.results);
    setLoading(false);
  };

  useEffect(() => {
    console.log("page running once");
    getData();
  }, []);

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div className="flex flex-col gap-8 pt-[52px]">
      <div className="w-[1277px] h-[36px] flex justify-between items-center">
        <p className="font-semibold text-2xl leading-[32px] tracking[-0.6px] text-[#09090B]">
          Upcoming
        </p>
        <button className="flex items-center justify-center gap-2 px-16px">
          <p className="text-sm font-medium text-[#09090B]">See more</p>
          <ArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-8 px-[32px]">
        {movieData?.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              title={movie.title}
              imageUrl={movie.backdrop_path}
              rating={movie.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
};
