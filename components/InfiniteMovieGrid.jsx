"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

export default function InfiniteMovieGrid({ initialMovies = [] }) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

  const { category, minRating, year } = useSelector(
    (state) => state.filters
  );

  // Optimized filtering
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesGenre =
        category === "All" ||
        movie.genre_ids?.includes(Number(category));

      const matchesRating =
        movie.vote_average >= Number(minRating);

      const movieYear = movie.release_date?.slice(0, 4);

      const matchesYear =
        year === "All" || movieYear === year;

      return matchesGenre && matchesRating && matchesYear;
    });
  }, [movies, category, minRating, year]);

  // Optimized infinite-scroll function
  const loadMoreMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/movies?page=${nextPage}`
      );

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
        const combined = [
          ...previousMovies,
          ...newMovies,
        ];

        return combined.filter(
          (movie, index, self) =>
            index ===
            self.findIndex(
              (item) => item.id === movie.id
            )
        );
      });

      setPage(nextPage);

      if (nextPage >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(
        "Infinite scroll error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  // Intersection Observer
  useEffect(() => {
    const lastMovie = observerRef.current;

    if (!lastMovie) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMovies();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(lastMovie);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreMovies]);

  return (
    <>
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="no-filter-results">
          😕 No movies match your filters.
        </p>
      )}

      <div
        ref={observerRef}
        className="infinite-scroll-trigger"
      />

      {loading && (
        <div className="infinite-loader">
          <div className="spinner"></div>
          <p>Loading more movies...</p>
        </div>
      )}

      {!hasMore && (
        <p className="end-message">
          🎬 You've reached the end.
        </p>
      )}
    </>
  );
}