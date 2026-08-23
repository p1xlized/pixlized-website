import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import cloudflare from "@astrojs/cloudflare"

const polyfillMessageChannel = () => ({
  name: "polyfill-message-channel",
  banner: () => `
    if (typeof globalThis.MessageChannel === 'undefined') {
      globalThis.MessageChannel = class MessageChannel {
        constructor() {
          this.port1 = { onmessage: null, postMessage: () => {} };
          this.port2 = { onmessage: null, postMessage: () => {} };
        }
      };
    }
  `,
})

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), polyfillMessageChannel()],
  },
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare", // Uses Cloudflare's image optimization
  }),
  integrations: [react()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    },
  },
})
