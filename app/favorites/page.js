"use client";

import Navbar from "../../components/Navbar";
import MovieGrid from "../../components/MovieGrid";
import EmptyState from "../../components/EmptyState";

import { useSelector } from "react-redux";

export default function FavoritesPage() {
  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

  return (
    <main>
      <Navbar />

      <h1 className="favorites-title">❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </main>
  );
}