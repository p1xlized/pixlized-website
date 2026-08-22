import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

// Detect if we're building for Cloudflare
const isCloudflare = process.env.ASTRO_ADAPTER === "cloudflare"

// Import the appropriate adapter
let adapter
if (isCloudflare) {
  const cloudflare = await import("@astrojs/cloudflare")
  adapter = cloudflare.default({
    mode: "standalone",
    // Enable D1 database support
    platform: {
      d1: "CF_D1_DB",
    },
  })
} else {
  const node = await import("@astrojs/node")
  adapter = node.default({
    mode: "standalone",
    middleware: {
      entrypoint: "./src/middleware.ts",
    },
  })
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: adapter,
  integrations: [react()],
  markdown: {
    shikiConfig: {
      // Choose dual themes for dark and light mode
      themes: {
        light: "vitesse-light", // or 'min-light'
        dark: "vitesse-dark", // or 'nord'
      },
    },
  },
  // Cloudflare-specific settings
  server: {
    // Enable streaming for better performance on Cloudflare
    streaming: true,
  },
})
