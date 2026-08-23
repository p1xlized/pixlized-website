import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import node from "@astrojs/node"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
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
})
