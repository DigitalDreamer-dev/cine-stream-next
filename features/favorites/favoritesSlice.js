import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;

      const exists = state.favorites.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== movie.id
        );
      } else {
        state.favorites.push(movie);
      }
    },

    addFavorite: (state, action) => {
      const movie = action.payload;

      const exists = state.favorites.some(
        (item) => item.id === movie.id
      );

      if (!exists) {
        state.favorites.push(movie);
      }
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },

    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },

    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  setFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;