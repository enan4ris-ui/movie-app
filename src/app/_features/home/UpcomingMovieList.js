// import * as React from "react";
import { MovieCard } from "./MovieCard";
export default function UpcomingMovieList() {
  return (
    <div className="h-screen w-screen gap-3 flex flex-wrap">
      <div className="flex overflow-y-auto gap-8 pl-[81px] pr-[81px]">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
      <div className="flex overflow-y-auto gap-8 pl-[81px] pr-[81px]">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
