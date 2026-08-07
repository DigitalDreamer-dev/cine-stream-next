"use client";

import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

export default function InfiniteMovieGrid({ initialMovies = [] }) {
  const [movies, setMovies] = useState(initialMovies);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

  useEffect(() => {
    const lastMovie = observerRef.current;

    if (!lastMovie) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreMovies();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(lastMovie);

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore, movies]);

  async function loadMoreMovies() {
    if (loading || !hasMore) return;

    const nextPage = page + 1;

    setLoading(true);

    try {
      const response = await fetch(`/api/movies?page=${nextPage}`);

      if (!response.ok) {
        throw new Error("Failed to load movies");
      }

      const data = await response.json();

      const newMovies = data.results || [];

      if (newMovies.length === 0) {
        setHasMore(false);

        return;
      }

      setMovies((previousMovies) => {
        const combined = [...previousMovies, ...newMovies];

        // Remove duplicate movies
        return combined.filter(
          (movie, index, self) =>
            index === self.findIndex((item) => item.id === movie.id),
        );
      });

      setPage(nextPage);

      // TMDB normally allows up to 500 pages
      if (nextPage >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Infinite scroll error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Intersection Observer Target */}

      <div ref={observerRef} className="infinite-scroll-trigger" />

      {loading && (
        <div className="infinite-loader">
          <div className="spinner"></div>

          <p>Loading more movies...</p>
        </div>
      )}

      {!hasMore && <p className="end-message">🎬 You've reached the end.</p>}
    </>
  );
}
