import { Header } from "./_features/Header";
import { HeroSection } from "./_features/home/HeroSection";
import { PopularMovieList } from "./_features/home/PopularMovieList";
import { TopRatedMovieList } from "./_features/home/TopRatedMovieList";
import { UpcomingMovieList } from "./_features/home/UpcomingMovieList";

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-[4184px] w-full max-w-[1440px] flex-col items-center bg-white">
      <Header />
      <HeroSection title={"Dexter"} rating={"6.7"} />
      <UpcomingMovieList />
      <PopularMovieList />
      <TopRatedMovieList />
    </div>
  );
}
