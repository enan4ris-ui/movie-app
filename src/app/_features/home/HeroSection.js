"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoadingMovieList } from "./LoadingMovieList";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection() {
  const [loading, setLoading] = useState(false);
  const [nowPlayingDataList, setNowPlayingDataList] = useState([]);
  const getPopularDataList = async () => {
    setLoading(true);

    const nowPlayingEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;

    const response = await fetch(nowPlayingEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setNowPlayingDataList(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getPopularDataList();
  }, []);

  if (loading) {
    console.log(<LoadingMovieList />);
  }

  return (
    <Carousel className="w-[1440px] max-w">
      <CarouselContent>
        {nowPlayingDataList.slice(0, 5).map((movie, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                {/* <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                  <span className="text-4xl font-semibold">{movie.title}</span>

                  <img src="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"></img>
                </CardContent>{" "} */}
                <CardContent className="p-0">
                  <div className="overlap">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                      className="w-[1440px] h-[600px] object-cover"
                    />{" "}
                    <h2 className="text-4xl font-semibold">{movie.title}</h2>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
