import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
});
