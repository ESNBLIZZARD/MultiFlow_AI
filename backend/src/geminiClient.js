import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateText({
  model = "gemini-2.5-flash",
  prompt,
  maxOutputTokens = 800,
}) {
  try {
    const genModel = client.getGenerativeModel({ model });

    const response = await genModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens },
    });

    // Console log raw response for debugging (can remove later)
    console.log("Gemini raw response:", response);

    // Candidate (first)
    const candidate = response?.response?.candidates?.[0] ?? null;

    // Prefer response.response.text() if available
    let text = "";
    try {
      // some SDK responses expose .response.text as a function
      text = typeof response?.response?.text === "function" ? response.response.text() : "";
    } catch (_) {
      text = "";
    }

    // Fallback: try to extract from candidate.content.parts
    if (!text && candidate?.content?.parts) {
      text = candidate.content.parts.map((p) => (typeof p === "string" ? p : p.text)).filter(Boolean).join("\n");
    }

    // reasoning (thinking) may be candidate.thinking or candidate.metadata.thoughts etc.
    const reasoning = candidate?.thinking ?? candidate?.metadata?.thoughts ?? null;

    return { text: text ?? "", reasoning: reasoning ?? null };
  } catch (err) {
    console.error("Gemini Error:", err);
    return { text: "", reasoning: null };
  }
}
