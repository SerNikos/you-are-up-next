import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { createExecutionerChatResponse } from "./server/executionerChat.js";
import {
  createContactResponse,
  MAX_CONTACT_REQUEST_LENGTH,
  parseAllowedOrigins,
} from "./server/contact.js";

function executionerChatDevPlugin(mode) {
  return {
    name: "executioner-chat-dev-api",
    configureServer(server) {
      const workingDirectory = globalThis.process.cwd();
      const rootEnv = loadEnv(mode, workingDirectory, "");
      const apiKey = rootEnv.GEMINI_API_KEY;
      const model = rootEnv.GEMINI_MODEL || "gemini-3.6-flash";

      server.middlewares.use(
        "/api/executioner-chat",
        async (request, response) => {
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

          const result = await createExecutionerChatResponse({
            apiKey,
            model,
            body,
          });
          response.statusCode = result.status;
          response.setHeader("Cache-Control", "no-store");
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify(result.body));
        },
      );
    },
  };
}

function contactDevPlugin(mode) {
  return {
    name: "contact-dev-api",
    configureServer(server) {
      const workingDirectory = globalThis.process.cwd();
      const rootEnv = loadEnv(mode, workingDirectory, "");
      const allowedOrigins = parseAllowedOrigins(
        rootEnv.CONTACT_ALLOWED_ORIGINS,
      );
      const emailjsConfig = {
        serviceId: rootEnv.EMAILJS_SERVICE_ID,
        templateId: rootEnv.EMAILJS_TEMPLATE_ID,
        publicKey: rootEnv.EMAILJS_PUBLIC_KEY,
        privateKey: rootEnv.EMAILJS_PRIVATE_KEY,
      };

      server.middlewares.use("/api/contact", async (request, response) => {
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("Allow", "POST, OPTIONS");

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
          if (rawBody.length > MAX_CONTACT_REQUEST_LENGTH) {
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

        const result = await createContactResponse({
          body,
          ipAddress: request.socket?.remoteAddress || "unknown",
          origin: request.headers.origin,
          host: request.headers.host,
          protocol: "http",
          allowedOrigins,
          emailjsConfig,
        });
        response.statusCode = result.status;
        if (result.status === 429) {
          response.setHeader("Retry-After", "60");
        }
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
    contactDevPlugin(mode),
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
