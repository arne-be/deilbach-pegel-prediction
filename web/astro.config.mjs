import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  // CloudFront only maps "/" to index.html, so subpages are built as foo.html, not foo/index.html.
  build: { format: "file" },
  integrations: [react()],
  vite: {
    // `pnpm dev` talks to the local API (`uv run uvicorn pegel.api.app:app`).
    server: {
      proxy: { "/api": "http://localhost:8000" },
      // src/lib/config.ts imports config/pegel.json from the repo root.
      fs: { allow: [".", "../config"] },
    },
  },
});
