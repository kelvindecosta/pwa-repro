// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";
import AstroPWA from "@vite-pwa/astro";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel({
    imageService: true,
    isr: true,
    edgeMiddleware: true,
  }),
  build: {
    format: "file",
  },
  integrations: [
    AstroPWA({
      mode: import.meta.env.DEV ? "development" : "production",
      strategies: "generateSW",
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      pwaAssets: {
        config: true,
        overrideManifestIcons: true,
      },
      manifest: {
        name: "PWA Repro",
        short_name: "PWA Repro",
        description: "This is a bug reproduction for Astro PWA",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
      workbox: {
        navigateFallback: "/404",
        globPatterns: ["**/*.{html,js,css,ico,png,svg,webp,woff,woff2}"],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        type: "module",
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
    sitemap(),
  ],
  trailingSlash: "never",
});
