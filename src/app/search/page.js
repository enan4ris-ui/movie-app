import { Header } from "@/app/_features/Header";
import { SearchMovieList } from "@/app/_features/search/SearchMovieList";

export default async function SearchPage({ searchParams }) {
  const { query } = await searchParams;

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <SearchMovieList query={query ?? ""} />
    </div>
  );
}
