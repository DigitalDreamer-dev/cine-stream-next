import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json({
      results: [],
    });
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "Failed to fetch movies",
      },
      {
        status: response.status,
      },
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
