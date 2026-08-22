# Cloudflare Deployment Guide for Pixlized Website

This guide will help you deploy your Astro application to Cloudflare using Wrangler.

## Prerequisites

1. **Cloudflare Account** - Sign up at [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. **Wrangler CLI** - Install the Cloudflare Wrangler CLI
3. **Node.js** - Version 18 or higher

## Installation

First, install the required dependencies:

```bash
# Install Wrangler CLI globally
pnpm add -g wrangler

# Install Cloudflare adapter for Astro
pnpm add @astrojs/cloudflare
```

## Configuration

### 1. Update Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- `ADMIN_SEED` - Your secret seed for admin access
- `ADMIN_USER` - Admin username
- `ADMIN_PASS` - Admin password
- `FORMSPREE_ENDPOINT` - Your Formspree form endpoint

### 2. Configure Wrangler

Edit `wrangler.toml` with your Cloudflare settings:

```toml
name = "pixlized-website"
main = "./dist/server/entry.mjs"
compatibility_date = "2024-01-01"

[env.production]
name = "pixlized-website"
routes = ["https://your-domain.com/*"]
```

### 3. Set Up Cloudflare Secrets

Deploy your secrets to Cloudflare:

```bash
# Set secrets for production
wrangler secret put ADMIN_SEED
wrangler secret put ADMIN_USER
wrangler secret put ADMIN_PASS
wrangler secret put FORMSPREE_ENDPOINT
```

## Building for Cloudflare

### Development Build

```bash
# Build with Cloudflare adapter
pnpm run build:cloudflare

# Or manually
ASTRO_ADAPTER=cloudflare astro build
```

### Preview Locally

```bash
pnpm run preview:cloudflare
```

## Deployment

### Deploy to Production

```bash
# Build and deploy
pnpm run build:cloudflare
pnpm run deploy:cloudflare
```

### Deploy to Development

```bash
pnpm run build:cloudflare
pnpm run deploy:cloudflare:dev
```

## Database Options

### Option 1: Cloudflare D1 (Recommended)

1. Create a D1 database in Cloudflare dashboard
2. Uncomment the D1 binding in `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "pixlized-db"
database_id = "your-d1-id"
```

3. Update `src/db/db.ts` to use D1:

```typescript
import { Database } from "@cloudflare/workers-types/experimental"

export const db = new Database(DB)
```

### Option 2: SQLite in Memory (Current)

The current setup uses SQLite in memory, which works but data won't persist between deployments. For production, use D1.

## Caching Strategy

The application includes caching headers configured in `src/middleware.ts`:

- **Static Assets** (`/assets/`, `/images/`, `/fonts/`, `/_astro/`): Cached for 1 year with `immutable`
- **API Responses** (`/api/*`): Cached for 1 hour
- **HTML Pages**: Not cached (may contain dynamic content)

You can also configure caching in `wrangler.toml`:

```toml
[cache]
[cache.assets]
pattern = "/(assets|images|fonts|_astro)/.*"
cache_control = "public, max-age=31536000, immutable"

[cache.api]
pattern = "/api/.*"
cache_control = "public, max-age=3600"
```

## Admin Access

The admin area is protected and hidden behind a secret path:

- **URL Format**: `/<ADMIN_SEED>/admin`
- **Example**: If `ADMIN_SEED="my-secret"`, access admin at `/my-secret/admin`

The middleware will automatically redirect `/admin` to `/<ADMIN_SEED>/admin`.

## Monitoring

### View Logs

```bash
# Tail logs in real-time
pnpm run tail:cloudflare

# Or with wrangler directly
wrangler tail --format json
```

### View Metrics

Check your Cloudflare dashboard for:
- Request counts
- Error rates
- Response times
- Cache hit ratios

## Troubleshooting

### Common Issues

1. **Build fails with adapter errors**
   - Make sure you've installed `@astrojs/cloudflare`
   - Run `pnpm install` to ensure all dependencies are up to date

2. **Environment variables not working**
   - Set secrets using `wrangler secret put`
   - Don't commit `.env` to git

3. **Database not persisting**
   - SQLite in memory doesn't persist
   - Use Cloudflare D1 for persistent storage

4. **Caching issues**
   - Clear cache with `wrangler kv key delete --prefix cache`
   - Or wait for cache to expire

### Debug Mode

Run with debug logging:

```bash
DEBUG=* pnpm run build:cloudflare
```

## Performance Optimization

The application includes several optimizations for Cloudflare:

1. **Memoization**: Database queries are memoized to avoid repeated execution
2. **Static Assets**: All static files are cached aggressively
3. **Streaming**: Enabled in `astro.config.mjs` for better performance
4. **React Components**: Toolkit uses React with `client:load` for hydration

## Project Structure

```
.
├── src/
│   ├── components/
│   │   └── index/
│   │       ├── HeroSection.astro      # Memoized queries
│   │       ├── ShowcaseSection.astro  # Memoized queries + React
│   │       ├── ContactSection.astro   # Memoized Formspree endpoint
│   │       └── ToolkitGrid.tsx        # React component
│   ├── middleware.ts                  # Admin protection + caching headers
│   ├── db/
│   │   └── db.ts                      # Database setup
│   └── utils/
│       └── memoize.ts                # Memoization utilities
├── wrangler.toml                     # Cloudflare configuration
├── astro.config.mjs                  # Astro configuration
└── package.json                      # Scripts for Cloudflare
```

## Additional Resources

- [Astro Cloudflare Adapter Docs](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Cloudflare KV](https://developers.cloudflare.com/kv/)
