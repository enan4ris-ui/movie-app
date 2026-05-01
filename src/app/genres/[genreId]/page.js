import { Header } from "@/app/_features/Header";
import { GenreMovieList } from "@/app/_features/genre/GenreMovieList";

export default async function GenrePage({ params, searchParams }) {
  const { genreId } = await params;
  const { name } = await searchParams;

  return (
    <div className="relative min-h-[1760px] w-full bg-white">
      <Header />
      <GenreMovieList genreId={genreId} genreName={name ?? "Genre"} />
    </div>
  );
}
