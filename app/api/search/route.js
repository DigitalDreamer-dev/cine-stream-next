import dns from "node:dns";
import { NextResponse } from "next/server";

dns.setDefaultResultOrder("ipv4first");

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query");
    const page = searchParams.get("page") || "1";

    if (!query?.trim()) {
      return NextResponse.json({
        results: [],
      });
    }

    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      console.error("TMDB_API_KEY is missing from .env.local");

      return NextResponse.json(
        {
          error: "TMDB API key is not configured",
        },
        {
          status: 500,
        }
      );
    }

    const url =
      `${BASE_URL}/search/movie` +
      `?api_key=${apiKey}` +
      `&query=${encodeURIComponent(query)}` +
      `&page=${page}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.text();

      console.error("TMDB STATUS:", response.status);
      console.error("TMDB RESPONSE:", errorData);

      return NextResponse.json(
        {
          error: "Failed to fetch movies from TMDB",
          status: response.status,
          details: errorData,
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB FETCH ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to TMDB",
        details: error.message,
        code: error.code || "UNKNOWN_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}