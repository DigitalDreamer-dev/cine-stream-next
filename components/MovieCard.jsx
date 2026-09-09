"use client";

import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavorite } from "../features/favorites/favoritesSlice";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  function handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(toggleFavorite(movie));
  }

  return (
    <div className="movie-card">
      <button
        className="favorite-btn"
        onClick={handleFavorite}
        aria-label="Toggle favorite"
      >
        {isFavorite ? (
          <FaHeart color="red" />
        ) : (
          <FaRegHeart />
        )}
      </button>

      <Link
        href={`/movie/${movie.id}`}
        className="movie-link"
      >
        <img
          src={poster}
          alt={movie.title}
          loading="lazy"
        />

        <div className="movie-info">
          <h3>{movie.title}</h3>

          <p>{movie.release_date?.slice(0, 4)}</p>

          <span>
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </Link>
    </div>
  );
}