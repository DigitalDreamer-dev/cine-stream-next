"use client";

import { useState } from "react";

export default function MoodSearch() {
  const [mood, setMood] = useState("");
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!mood.trim()) return;

    setLoading(true);
    setMovie("");
    setError("");

    try {
      const response = await fetch("/api/mood", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          mood,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMovie(data.movie);
    } catch (error) {
      console.error(error);

      setError("Unable to get recommendation. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mood-search-container">
      <h2>✨ AI Mood Matcher</h2>

      <p>Describe your mood and let Gemini recommend a movie.</p>

      <div className="mood-search">
        <input
          type="text"
          placeholder="Describe your mood..."
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />

        <button onClick={handleClick} disabled={loading}>
          {loading ? "Thinking..." : "✨ Find Movie"}
        </button>
      </div>

      {error && <p className="mood-error">{error}</p>}

      {movie && !error && (
        <div className="mood-result">
          <span>🎬 Recommended for you</span>

          <h3>{movie}</h3>
        </div>
      )}
    </section>
  );
}
