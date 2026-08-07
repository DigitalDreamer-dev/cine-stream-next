import Hero from "../../components/Hero";
import InfiniteMovieGrid from "../../components/InfiniteMovieGrid";
import EmptyState from "../../components/EmptyState";
import SearchSection from "../../components/SearchSection";
import MoodSearch from "../../components/MoodSearch";
import Navbar from "../../components/Navbar";

import { fetchPopularMovies } from "../../lib/tmdb";

export default async function BrowsePage() {
  const data = await fetchPopularMovies(1);

  const movies = data.results || [];

  return (
    <main>
      <Navbar />

      <Hero />

      <SearchSection />
      <MoodSearch />

      {movies.length === 0 ? (
        <EmptyState />
      ) : (
        <InfiniteMovieGrid initialMovies={movies} />
      )}
    </main>
  );
}
