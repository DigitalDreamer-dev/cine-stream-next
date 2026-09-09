"use client";

import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";

import { store } from "../store/store";
import { setFavorites } from "../features/favorites/favoritesSlice";

function ThemeManager() {
  const mode = useSelector(
    (state) => state.theme.mode
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      mode
    );
  }, [mode]);

  return null;
}

export default function Providers({ children }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");

      if (saved) {
        const parsedFavorites = JSON.parse(saved);

        if (Array.isArray(parsedFavorites)) {
          store.dispatch(
            setFavorites(parsedFavorites)
          );
        }
      }
    } catch (error) {
      console.error(
        "Failed to load favorites:",
        error
      );
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const unsubscribe = store.subscribe(() => {
      try {
        const favorites =
          store.getState().favorites.favorites;

        localStorage.setItem(
          "favorites",
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.error(
          "Failed to save favorites:",
          error
        );
      }
    });

    return unsubscribe;
  }, [hydrated]);

  return (
    <Provider store={store}>
      <ThemeManager />
      {children}
    </Provider>
  );
}