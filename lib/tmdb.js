const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = process.env.TMDB_API_KEY;


async function tmdbFetch(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  return response.json();
}


export async function fetchPopularMovies(page = 1) {
  return tmdbFetch(
    `/movie/popular?page=${page}`
  );
}


export async function searchMovies(query, page = 1) {
  return tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );
}


export async function fetchMovieDetails(id) {
  return tmdbFetch(
    `/movie/${id}`
  );
}