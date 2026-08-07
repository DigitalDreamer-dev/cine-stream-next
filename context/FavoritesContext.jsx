"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load favorites from browser
  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");

      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }

    setHydrated(true);
  }, []);

  // Save favorites to browser
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites, hydrated]);

  function toggleFavorite(movie) {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((item) => item.id === movie.id);

      if (exists) {
        return currentFavorites.filter((item) => item.id !== movie.id);
      }

      return [...currentFavorites, movie];
    });
  }

  function isFavorite(id) {
    return favorites.some((movie) => movie.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
