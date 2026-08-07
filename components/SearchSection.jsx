"use client";

import { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`,
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();

        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <section>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search any movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <Loader />}

      {!loading && query && movies.length === 0 && <EmptyState />}

      {movies.length > 0 && <MovieGrid movies={movies} />}
    </section>
  );
}
