"use client";

import { ArrowDown } from "@/app/_icons/ArrowDown";
import { StarIcon } from "@/app/_icons/StarIcon";
import { LoadingMovieList } from "@/app/_features/home/LoadingMovieList";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function GenreMovieList({ genreId, genreName }) {
  const [genres, setGenres] = useState([]);
  const [selectedIds, setSelectedIds] = useState(
    genreId === "all" ? [] : String(genreId).split(",").filter(Boolean)
  );
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const selectedGenreKey = selectedIds.join(",");

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setGenres(data.genres ?? []);
    };

    getGenres();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedGenreKey]);

  useEffect(() => {
    const getMoviesByGenre = async () => {
      setLoading(true);
      const genreQuery =
        selectedGenreKey === ""
          ? ""
          : `&with_genres=${encodeURIComponent(selectedGenreKey)}`;
      const response = await fetch(
        `${BASE_URL}/discover/movie?language=en-US&page=${page}${genreQuery}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setMovies(data.results ?? []);
      setTotalResults(data.total_results ?? 0);
      setTotalPages(Math.min(data.total_pages ?? 1, 500));
      setLoading(false);
    };

    getMoviesByGenre();
  }, [selectedGenreKey, page]);

  const namesFromSelectedIds = genres
    .filter((genre) => selectedIds.includes(String(genre.id)))
    .map((genre) => genre.name)
    .join(", ");
  const selectedGenreNames =
    namesFromSelectedIds || (genreName && genreName !== "Genre" ? genreName : "All");

  const visiblePages = [1, page, Math.min(page + 1, totalPages), totalPages]
    .filter((value, index, pages) => value >= 1 && pages.indexOf(value) === index)
    .sort((a, b) => a - b);

  const handleGenreClick = (genre) => {
    const genreIdText = String(genre.id);
    const isActive = selectedIds.includes(genreIdText);
    const nextGenreIds = isActive
      ? selectedIds.filter((id) => id !== genreIdText)
      : [...selectedIds, genreIdText];
    const nextGenreNames = genres
      .filter((item) => nextGenreIds.includes(String(item.id)))
      .map((item) => item.name)
      .join(", ");

    setSelectedIds(nextGenreIds);

    const nextPath =
      nextGenreIds.length === 0
        ? "/genres/all?name=All"
        : `/genres/${nextGenreIds.join(",")}?name=${encodeURIComponent(
            nextGenreNames
          )}`;

    window.history.pushState(null, "", nextPath);
  };

  return (
    <main className="mx-auto flex min-h-[1421px] w-full max-w-[1440px] gap-10 px-20 py-14">
      <aside className="w-[387px] shrink-0 pr-8">
        <h1 className="text-[32px] font-semibold leading-10 text-[#09090B]">
          Search filter
        </h1>
        <div className="mt-10 flex h-[352px] w-[387px] flex-none flex-col items-start gap-5 p-0">
          <div>
            <h2 className="text-[24px] font-semibold leading-8 text-[#09090B]">
              Genres
            </h2>
            <p className="mt-1 text-sm text-[#71717A]">
              See lists of movies by genre
            </p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-3">
            {genres.map((genre) => {
                const isActive = selectedIds.includes(String(genre.id));

                return (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre)}
                    style={{
                      backgroundColor: isActive ? "#09090B" : "#FFFFFF",
                      borderColor: isActive ? "#09090B" : "#E4E4E7",
                      color: isActive ? "#FFFFFF" : "#09090B",
                    }}
                    className="genre-chip flex h-5 cursor-pointer items-center gap-2 rounded-full border px-3 text-[11px] font-semibold leading-4 hover:bg-[#F4F4F5]"
                  >
                    {genre.name}
                    {isActive ? (
                      <X className="h-3 w-3 text-white" strokeWidth={2} />
                    ) : (
                      <ArrowDown className="h-3 w-3 -rotate-90" />
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </aside>

      <section className="min-h-[1260px] flex-1 border-l border-[#E4E4E7] pl-8">
        <p className="text-[20px] font-semibold leading-7 text-[#09090B]">
          {totalResults.toLocaleString()} titles in &quot;{selectedGenreNames}
          &quot;
        </p>

        {loading ? (
          <LoadingMovieList />
        ) : (
          <div className="mt-8 grid grid-cols-4 gap-x-10 gap-y-8">
            {movies.map((movie) => (
              <article
                key={movie.id}
                className="h-[310px] w-[145px] overflow-hidden rounded-lg bg-[#F4F4F5]"
              >
                <div
                  className="h-[218px] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`,
                  }}
                />
                <div className="p-2">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4" />
                    <span className="pl-1 text-xs font-medium">
                      {Number(movie.vote_average).toFixed(1)}
                    </span>
                    <span className="text-xs text-[#71717A]">/10</span>
                  </div>
                  <p className="mt-1 text-sm leading-5 text-[#09090B]">
                    {movie.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center justify-end gap-2 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage((currentPage) => currentPage - 1)}
            className="rounded-md px-3 py-2 disabled:opacity-40"
          >
            Previous
          </button>
          {visiblePages.map((pageNumber, index) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`h-9 min-w-9 rounded-md border px-3 ${
                pageNumber === page
                  ? "border-[#E4E4E7] bg-white"
                  : "border-transparent"
              }`}
            >
              {index > 0 && pageNumber - visiblePages[index - 1] > 1
                ? `... ${pageNumber}`
                : pageNumber}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((currentPage) => currentPage + 1)}
            className="rounded-md px-3 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
