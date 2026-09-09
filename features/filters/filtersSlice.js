import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "All",
  minRating: 0,
  year: "All",
};

const filtersSlice = createSlice({
  name: "filters",

  initialState,

  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setMinRating: (state, action) => {
      state.minRating = Number(action.payload);
    },

    setYear: (state, action) => {
      state.year = action.payload;
    },

    resetFilters: (state) => {
      state.category = "All";
      state.minRating = 0;
      state.year = "All";
    },
  },
});

export const {
  setCategory,
  setMinRating,
  setYear,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;