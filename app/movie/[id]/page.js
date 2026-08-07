import Link from "next/link";
import { fetchMovieDetails } from "../../../lib/tmdb";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const movie = await fetchMovieDetails(id);

    return {
      title: `${movie.title} | JuzzWatch`,
      description:
        movie.overview ||
        `Watch details, rating and information about ${movie.title}.`,
      openGraph: {
        title: `${movie.title} | JuzzWatch`,
        description: movie.overview || `Discover ${movie.title} on JuzzWatch.`,
        images: movie.backdrop_path
          ? [
              {
                url: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              },
            ]
          : [],
      },
    };
  } catch {
    return {
      title: "Movie | JuzzWatch",
      description: "Discover movies on JuzzWatch.",
    };
  }
}

export default async function MovieDetailsPage({ params }) {
  const { id } = await params;

  const movie = await fetchMovieDetails(id);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  return (
    <main className="movie-details-page">
      <div className="movie-details">
        <img src={poster} alt={movie.title} className="movie-details-poster" />

        <div className="movie-details-info">
          <Link href="/browse" className="back-button">
            ← Back to Browse
          </Link>

          <h1>{movie.title}</h1>

          {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}

          <div className="movie-meta">
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>

            <span>{movie.release_date?.slice(0, 4)}</span>

            <span>{movie.runtime ? `${movie.runtime} min` : ""}</span>
          </div>

          <p className="movie-overview">
            {movie.overview || "No description available."}
          </p>

          {movie.genres?.length > 0 && (
            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
