import { Footer } from "./src/app/_features/Footer";
import { Header } from "./src/app/_features/Header";
import { HeroSection } from "./src/app/_features/home/HeroSection";
import { PopularMovieList } from "./src/app/_features/home/PopularMovieList";
import { TopRatedMovieList } from "./src/app/_features/home/TopRatedMovieList";
import { UpcomingMovieList } from "./src/app/_features/home/UpcomingMovieList";
import { Dexter } from "./src/app/_icons/dexter";

export default function Home() {
  return (
    <div class="w-[1440px] h-[4184px] bg-white-500">
      <Header />
      <HeroSection />
      <UpcomingMovieList />
      <PopularMovieList />
      <TopRatedMovieList />
      <Footer />
      <Dexter />
    </div>
  );
}
