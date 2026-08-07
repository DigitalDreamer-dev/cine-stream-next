import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request) {
  try {
    const { mood } = await request.json();

    if (!mood?.trim()) {
      return Response.json(
        { error: "Please describe your mood." },
        { status: 400 },
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
Suggest ONLY ONE movie title for this mood:

"${mood}"

Rules:
- Return ONLY the movie title.
- No explanation.
- No quotes.
`,
    });

    return Response.json({
      movie: response.text.trim(),
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return Response.json(
      { error: "Unable to get movie recommendation." },
      { status: 500 },
    );
  }
}
