import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateText({
  model = "gemini-2.5-flash",
  prompt,
  maxOutputTokens = 2000,   // ⬅ INCREASED TO PREVENT CUT-OFF
  thinkingEnabled = false,
}) {
  try {
    const genModel = client.getGenerativeModel({ model });

    // Enhanced prompt for better reasoning
    const finalPrompt = thinkingEnabled
      ? `Think step-by-step and then answer clearly.\n\n${prompt}`
      : prompt;

    const response = await genModel.generateContent({
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      generationConfig: {
        maxOutputTokens,
        temperature: 0.6,
      },
    });

    // ---- SAFE EXTRACTION OF TEXT ----
    let text = "";

    // New API structure: text exists inside candidates[].content.parts[].text
    const candidates = response?.response?.candidates || [];

    for (const c of candidates) {
      const parts = c?.content?.parts || [];
      for (const p of parts) {
        if (p.text) text += p.text;
      }
    }

    // FINAL FALLBACK (rare)
    if (!text) {
      text = response?.response?.text?.() || "";
    }

    // Ensures clean output
    text = (text || "").trim();

    // Optional reasoning (Gemini sometimes hides it)
    const reasoning =
      response?.response?.candidates?.[0]?.groundingMetadata?.confidenceScores ||
      null;

    return { text, reasoning };
  } catch (err) {
    console.error("Gemini Error:", err);
    return { text: "", reasoning: "" };
  }
}
