import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateText({
  model = "gemini-2.0-flash",
  prompt,
  maxOutputTokens = 800,
}) {
  try {
    const genModel = client.getGenerativeModel({ model });

    // Modern Gemini response format
    const response = await genModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens },
    });

    const text = response?.response?.text?.() ?? "";
    const reasoning = response?.response?.candidates?.[0]?.thinking ?? null;

    return {
      text,
      reasoning, 
      raw: response, 
    };
  } catch (err) {
    console.error("Gemini Error:", err);
    return {
      text: null,
      reasoning: null,
      raw: null,
    };
  }
}
