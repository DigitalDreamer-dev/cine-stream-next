import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "1";
    const query = searchParams.get("query");

    const API_KEY = process.env.TMDB_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { error: "TMDB API key is missing" },
        { status: 500 },
      );
    }

    let endpoint;

    if (query && query.trim()) {
      endpoint = `/search/movie?query=${encodeURIComponent(
        query,
      )}&page=${page}`;
    } else {
      endpoint = `/movie/popular?page=${page}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`, {
      next: {
        revalidate: 3600,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("TMDB Error:", data);

      return NextResponse.json(
        {
          error: data.status_message || "TMDB request failed",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Movies API Error:", error);

    return NextResponse.json(
      {
        error: "Unable to fetch movies",
      },
      { status: 500 },
    );
  }
}
