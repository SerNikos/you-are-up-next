import { createExecutionerChatResponse } from "../server/executionerChat.js";

export default async function handler(request, response) {
  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const result = await createExecutionerChatResponse({
      apiKey: globalThis.process.env.GEMINI_API_KEY,
      model: globalThis.process.env.GEMINI_MODEL || "gemini-2.5-flash",
      body: request.body,
    });

    response.setHeader("Cache-Control", "no-store");
    response.status(result.status).json(result.body);
  } catch (error) {
    console.error("Executioner chat handler failed", error);
    response.status(500).json({ error: "The Executioner's line is unavailable." });
  }
}