"use client";

import React from "react";
import { WatchTrailerIcon } from "../_icons/WatchTrailerIcon";
import { StarIcon } from "@/app/_features/_icons/StarIcon";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { LoadingMovieList } from "./LoadingMovieList";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection() {
  const [loading, setLoading] = useState(false);
  const [heroSectionData, setHeroSectionData] = useState([]);

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState({});
  const [trailerLoading, setTrailerLoading] = useState(false);

  const getHeroSectionData = async () => {
    setLoading(true);
    const heroSectionEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
    const response = await fetch(heroSectionEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setHeroSectionData(data.results);
    setTimeout(() => {
      setLoading(false);
    }, "2000");
  };

  useEffect(() => {
    getHeroSectionData();
  }, []);

  const getMovieVideos = async () => {
    setTrailerLoading(true);
    const heroSectionEndpoint = `${BASE_URL}/movie/${selectedMovieId}/videos?language=en-US`;
    const response = await fetch(heroSectionEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    setMovieTrailer(
      data.results.find((trailer) => {
        if (trailer.name.includes("Official Trailer")) {
          return trailer;
        }
      })
    );
    setTimeout(() => {
      setTrailerLoading(false);
    }, "2000");
  };

  useEffect(() => {
    console.log("id is getting change, call api again");
    if (selectedMovieId !== null) {
      getMovieVideos();
    }
  }, [selectedMovieId]);

  const handleWatchTrailerButton = (id) => {
    setSelectedMovieId(id);
  };

  if (loading)
    return (
      <div>
        <LoadingMovieList />
      </div>
    );

  console.log(movieTrailer, "movieTrailermovieTrailermovieTrailer");

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {heroSectionData.slice(0, 5).map((movie, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent
                    className="relative bg-no-repeat p-0 w-full h-[600px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    }}
                  >
                    <div className="flex flex-col text-left pl-[70px] items-start gap-4 absolute left-35 bottom-40 w-[404px]">
                      <div className="">
                        <span className="text-white font-inter text-base font-normal leading-6">
                          Now Playing:
                        </span>
                        <p className="text-white font-inter text-4xl font-bold leading-[40px] tracking[-0.9px]">
                          {movie.title}
                        </p>
                        <div className="flex flex-col gap-1 items-start">
                          <div className="flex flex-row">
                            <StarIcon />

                            <p className="text-[#FAFAFA] flex flex-row font-inter text-lg font-semibold leading-7">
                              {movie.vote_average} /10
                            </p>
                          </div>
                          <div className="text-[#FAFAFA] pt-[14px] font-inter text-xs font-normal leading-4 w-[302px]">
                            {movie.overview}
                          </div>
                          <Dialog>
                            <form>
                              <DialogTrigger
                                asChild
                                className="flex h-[40px] py-2 px-4 justify-center items-center gap-2 rounded-md bg-[#F4F4F5]"
                              >
                                <button
                                  onClick={() =>
                                    handleWatchTrailerButton(movie.id)
                                  }
                                  style={{ cursor: "pointer" }}
                                  //   className="text-[var(--text-text-secondary-foreground)] font-inter text-sm font-medium leading-5 animate-bounce" //
                                >
                                  <WatchTrailerIcon />
                                  Watch Trailer
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px] flex justify-center">
                                <div>
                                  <iframe
                                    width={997}
                                    height={562}
                                    src={`https://www.youtube.com/embed/${movieTrailer.key}`}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                                <DialogHeader className="display: hidden">
                                  {" "}
                                  {movie.title}
                                </DialogHeader>
                              </DialogContent>
                            </form>
                          </Dialog>
                        </div>
                      </div>
                    </div>{" "}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#FAFAFA]" />
        <CarouselNext className="bg-[#FAFAFA]" />
      </Carousel>
      {/* {selectedMovieId && trailerLoading && <div>trailer loading</div>}
      {selectedMovieId && !trailerLoading && (
        <div>
          <iframe
            width={560}
            height={315}
            src={`https://www.youtube.com/embed/${movieTrailer.key}`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )} */}
    </div>
  );
}
