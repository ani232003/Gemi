import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generate(prompt, onChunk) {
  const apiKey = import.meta.env.VITE_NOVO_TALK_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Google API key not found. Please set VITE_NOVO_TALK_API_KEY in your .env file."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  try {
    const streamResult = await model.generateContentStream(
      { contents: [{ role: "user", parts: [{ text: prompt }] }] }
    );

    for await (const chunk of streamResult.stream) {
      const chunkText = chunk.text();
      if (onChunk) onChunk(chunkText);
    }
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to get response from Gemini API.");
  }
}