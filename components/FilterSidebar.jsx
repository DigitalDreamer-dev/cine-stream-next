"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setMinRating,
  setYear,
  resetFilters,
} from "../features/filters/filtersSlice";

const genres = [
  { id: "All", name: "All Genres" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

const ratings = [
  { value: 0, label: "Any Rating" },
  { value: 5, label: "5+" },
  { value: 6, label: "6+" },
  { value: 7, label: "7+" },
  { value: 8, label: "8+" },
];

const years = [
  { value: "All", label: "All Years" },
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
];

export default function FilterSidebar() {
  const dispatch = useDispatch();

  const { category, minRating, year } = useSelector(
    (state) => state.filters
  );

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h2>🎬 Filters</h2>

        <button onClick={() => dispatch(resetFilters())}>
          Reset
        </button>
      </div>

      {/* Genre */}
      <div className="filter-group">
        <h3>Genre</h3>

        <select
          value={category}
          onChange={(e) =>
            dispatch(setCategory(e.target.value))
          }
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="filter-group">
        <h3>Minimum Rating</h3>

        <select
          value={minRating}
          onChange={(e) =>
            dispatch(setMinRating(e.target.value))
          }
        >
          {ratings.map((rating) => (
            <option key={rating.value} value={rating.value}>
              {rating.label}
            </option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div className="filter-group">
        <h3>Release Year</h3>

        <select
          value={year}
          onChange={(e) =>
            dispatch(setYear(e.target.value))
          }
        >
          {years.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}