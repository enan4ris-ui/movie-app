"use client";

import MoonIcon from "../_icons/MoonIcon";
import FilmIcon from "../_icons/FilmIcon";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "../_icons/ArrowDown";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const Header = () => {
  const [genres, setGenres] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const handleThemeToggle = () => {
    const nextIsDark = !isDark;

    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

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
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    setShowSearchResults(true);
    setSearchLoading(true);
    const timeoutId = setTimeout(async () => {
      const response = await fetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(
          trimmedValue
        )}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setSearchResults(data.results?.slice(0, 5) ?? []);
      setShowSearchResults(true);
      setSearchLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const handleSearchSubmit = () => {
    const trimmedValue = searchValue.trim();

    if (trimmedValue) {
      router.push(`/search?query=${encodeURIComponent(trimmedValue)}`);
      setShowSearchResults(false);
    }
  };

  return (
    <div className="mx-auto flex h-[59px] w-full max-w-[1440px] flex-row justify-around p-4">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="flex cursor-pointer flex-row items-center gap-2"
      >
        {" "}
        <FilmIcon />{" "}
        <p className="text-indigo-700 font-inter text-[16px] italic font-bold leading-5 tracking-[0.32px]">
          Movie Z
        </p>
      </button>

      <div className="relative flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="border border-[#E4E4E7] text-[14px] font-semibold"
              variant="outline"
            >
              <ArrowDown />
              Genre
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[577px] bg-white border-gray-200 p-5"
            align="start"
          >
            <p className="font-sans font-semibold text-[24px]">Genres</p>
            <p className="text-sm text-[#71717A] mt-1">
              See lists of movies by genre
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() =>
                    router.push(
                      `/genres/${genre.id}?name=${encodeURIComponent(
                        genre.name
                      )}`
                    )
                  }
                  className="flex h-8 items-center gap-2 rounded-full border border-[#E4E4E7] px-3 text-xs font-semibold text-[#09090B] hover:bg-[#F4F4F5]"
                >
                  {genre.name}
                  <ArrowDown className="-rotate-90" />
                </button>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative">
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onFocus={() => setShowSearchResults(searchResults.length > 0)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            className="flex h-9 w-[379px] items-center gap-2.5 rounded-lg border border-[#E4E4E7] bg-white px-3 text-sm outline-none focus:border-[#A1A1AA]"
            placeholder="Search"
          />
          {showSearchResults && searchValue.trim() && (
            <div className="absolute left-0 top-11 z-50 w-[577px] rounded-lg border border-[#E4E4E7] bg-white p-4 shadow-lg">
              {searchLoading ? (
                <div className="flex h-20 items-center justify-center text-sm text-[#71717A]">
                  Searching...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="flex h-20 items-center justify-center text-sm text-[#71717A]">
                  No results found.
                </div>
              ) : (
                <>
              <div className="flex flex-col gap-3">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-4 border-b border-[#E4E4E7] pb-3 last:border-b-0"
                  >
                    <div
                      className="h-[100px] w-[67px] shrink-0 rounded bg-[#F4F4F5] bg-cover bg-center"
                      style={{
                        backgroundImage: movie.poster_path
                          ? `url('https://image.tmdb.org/t/p/w200${movie.poster_path}')`
                          : undefined,
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#09090B]">
                        {movie.title}
                      </p>
                      <p className="mt-1 text-xs text-[#71717A]">
                        {movie.release_date?.slice(0, 4) || "Unknown"}
                      </p>
                    </div>
                    <button
                      onClick={handleSearchSubmit}
                      className="cursor-pointer text-xs font-medium text-[#09090B] hover:underline"
                    >
                      See more -&gt;
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSearchSubmit}
                className="mt-3 cursor-pointer text-sm font-medium text-[#09090B] hover:underline"
              >
                See all results for &quot;{searchValue.trim()}&quot;
              </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleThemeToggle}
        className="cursor-pointer rounded-lg"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <MoonIcon />
      </button>
    </div>
  );
};

export default Header;
