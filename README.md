# Astro + React + TypeScript + shadcn/ui

This is a template for a new Astro project with React, TypeScript, and shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them in an `.astro` file:

```astro
---
import { Button } from "@/components/ui/button"
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro App</title>
  </head>
  <body>
    <div class="grid h-screen place-items-center content-center">
      <Button>Button</Button>
    </div>
  </body>
</html>
```

```
# 1. Install Cloudflare dependencies
pnpm add -g wrangler
pnpm add @astrojs/cloudflare

# 2. Configure environment
cp .env.example .env
# Edit .env with your values

# 3. Set Cloudflare secrets
wrangler secret put ADMIN_SEED
wrangler secret put ADMIN_USER
wrangler secret put ADMIN_PASS
wrangler secret put FORMSPREE_ENDPOINT

# 4. Build and deploy
pnpm run build:cloudflare
pnpm run deploy:cloudflare

```
