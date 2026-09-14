import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { loadEnv } from "vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { createExecutionerChatResponse } from "./server/executionerChat.js";

function executionerChatDevPlugin(mode) {
  return {
    name: "executioner-chat-dev-api",
    configureServer(server) {
      const workingDirectory = globalThis.process.cwd();
      const rootEnv = loadEnv(mode, workingDirectory, "");
      const sourceEnv = loadEnv(
        mode,
        path.resolve(workingDirectory, "src"),
        "",
      );
      const apiKey =
        rootEnv.GEMINI_API_KEY ||
        sourceEnv.GEMINI_API_KEY ||
        sourceEnv.VITE_GEMINI_API_KEY;
      const model =
        rootEnv.GEMINI_MODEL || sourceEnv.GEMINI_MODEL || "gemini-3.6-flash";

      server.middlewares.use("/api/executioner-chat", async (request, response) => {
        if (request.method === "OPTIONS") {
          response.statusCode = 204;
          response.end();
          return;
        }

        if (request.method !== "POST") {
          response.statusCode = 405;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ error: "Method not allowed." }));
          return;
        }

        let rawBody = "";
        for await (const chunk of request) {
          rawBody += chunk;
          if (rawBody.length > 100000) {
            response.statusCode = 413;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ error: "Request is too large." }));
            return;
          }
        }

        let body;
        try {
          body = JSON.parse(rawBody || "{}");
        } catch {
          response.statusCode = 400;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ error: "Invalid request." }));
          return;
        }

        const result = await createExecutionerChatResponse({ apiKey, model, body });
        response.statusCode = result.status;
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(result.body));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    executionerChatDevPlugin(mode),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: fileURLToPath(
        new URL("./prerender.jsx", import.meta.url),
      ),
      additionalPrerenderRoutes: [
        "/",
        "/en",
        "/en/characters",
        "/en/rules",
        "/en/team",
        "/en/contact",
        "/el",
        "/el/characters",
        "/el/rules",
        "/el/team",
        "/el/contact",
      ],
    }),
  ],
}));
