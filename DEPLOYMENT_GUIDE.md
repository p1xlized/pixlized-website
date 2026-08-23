# Cloudflare Deployment Guide for Pixlized Website

## Overview

This guide will help you deploy your Pixlized website to Cloudflare Pages with D1 database support.

## Prerequisites

1. **Cloudflare Account** - Sign up at [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. **Domain** - `pixlized.net` (already configured in wrangler.toml)
3. **Node.js** - v18 or later
4. **pnpm** - Recommended package manager

---

## Step 1: Install Required Dependencies

```bash
# Install Cloudflare adapter and wrangler
pnpm add @astrojs/cloudflare@5 wrangler@3 -D

# Or with npm
npm install @astrojs/cloudflare@5 wrangler@3 --save-dev
```

**Note:** We use `@astrojs/cloudflare@5` because it supports Astro 6.x. The latest version requires Astro 7+.

---

## Step 2: Create D1 Database in Cloudflare

1. Go to Cloudflare Dashboard: [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Select your account
3. Navigate to **Workers & Pages** > **D1**
4. Click **Create database**
5. Enter database name: `pixlized-db`
6. Click **Create**
7. Copy the **Database ID** (you'll need it for wrangler.toml)

---

## Step 3: Configure D1 Database

### Update `wrangler.toml`

Replace `YOUR_D1_DATABASE_ID` with your actual D1 database ID:

```toml
[[d1_databases]]
binding = "CF_D1_DB"
database_name = "pixlized-db"
database_id = "YOUR_D1_DATABASE_ID"
```

### Update `astro.config.mjs`

The configuration is already set up to use D1 in Cloudflare mode:

```javascript
if (isCloudflare) {
  const cloudflare = await import("@astrojs/cloudflare")
  adapter = cloudflare.default({
    mode: "standalone",
    platform: {
      d1: "CF_D1_DB"
    }
  })
}
```

---

## Step 4: Seed the Database

### Local Development

The database is automatically seeded when you run locally. The `src/db/db.ts` file:
- Uses local SQLite (`local.db`) in development
- Uses Cloudflare D1 (`CF_D1_DB`) in production

### Production Seeding

After deploying, you need to seed the D1 database. Run:

```bash
# Build for Cloudflare
ASTRO_ADAPTER=cloudflare npm run build

# Deploy to Cloudflare
npm run deploy:cloudflare

# Seed the D1 database (run this once after first deployment)
wrangler d1 execute pixlized-db --file=./scripts/seed-d1.sql
```

**Note:** You'll need to create a seed script. See Step 6.

---

## Step 5: Configure Environment Variables

### In Cloudflare Dashboard

1. Go to **Workers & Pages** > **Your Project** > **Settings** > **Environment Variables**
2. Add the following variables:

```
ADMIN_SEED=pixlized-secret-2026
ADMIN_USER=your-admin-username
ADMIN_PASS=your-admin-password
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

### Or via Wrangler CLI

```bash
# Set secrets
wrangler secret put ADMIN_SEED
wrangler secret put ADMIN_USER
wrangler secret put ADMIN_PASS
wrangler secret put FORMSPREE_ENDPOINT
```

---

## Step 6: Create Database Seed Script

Create a file `scripts/seed-d1.sql` with your initial data:

```sql
-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  tech TEXT NOT NULL,
  role TEXT NOT NULL,
  date TEXT NOT NULL,
  releasedAt TEXT NOT NULL,
  tag TEXT NOT NULL,
  description TEXT NOT NULL,
  cover TEXT NOT NULL,
  imgs TEXT,
  githubUrl TEXT NOT NULL,
  projectUrl TEXT,
  isVideo INTEGER DEFAULT 0,
  videoUrl TEXT,
  features TEXT,
  metrics TEXT,
  awards TEXT,
  isFeatured INTEGER DEFAULT 0,
  isPersonal INTEGER DEFAULT 1,
  stack TEXT NOT NULL
);

-- Albums table
CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  cover TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Music tracks table
CREATE TABLE IF NOT EXISTS music_tracks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  duration TEXT NOT NULL,
  bpm TEXT,
  description TEXT,
  file TEXT NOT NULL,
  albumId INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (albumId) REFERENCES albums(id)
);

-- Insert your initial data here
-- Example:
INSERT INTO projects (title, tech, role, date, releasedAt, tag, description, cover, imgs, githubUrl, projectUrl, isVideo, videoUrl, features, metrics, awards, isFeatured, isPersonal, stack)
VALUES ('GYMBUD', 'FLUTTER / SUPABASE / OPENAI', 'Developer | AI Integration', 'NOV_2024', '2024-11-15', 'MOBILE', 'AI fitness MVP...', '/assets/projects/gymbud.jpg', '[\"/assets/projects/gymbud.jpg\",\"/assets/projects/gymbud2.gif\"]', 'https://github.com/...', NULL, 0, NULL, '[\"Gamified Progression\",\"Real-Time advice\"]', '[{\"label\":\"HACKATHON_SPEED\",\"value\":100}]', '[{\"title\":\"3RD_PLACE_OVERALL\",\"organization\":\"HACKATHON_2024\"}]', 1, 1, '[\"Flutter\",\"Supabase\",\"OpenAI\"]');
```

---

## Step 7: Update Routes

The `wrangler.toml` is already configured with both domains:

```toml
[env.production]
routes = ["https://pixlized.net/*", "https://www.pixlized.net/*"]
```

---

## Step 8: Deploy

### Build for Cloudflare

```bash
ASTRO_ADAPTER=cloudflare npm run build
```

### Deploy to Production

```bash
npm run deploy:cloudflare
```

### Deploy to Development

```bash
npm run deploy:cloudflare:dev
```

---

## Step 9: Verify Deployment

1. Visit [https://pixlized.net](https://pixlized.net)
2. Check that all pages load correctly
3. Test the admin panel at `/pixlized-secret-2026/admin`
4. Verify database operations (projects, blog, music)

---

## Step 10: Set Up Monitoring

### Cloudflare Analytics

1. Go to **Workers & Pages** > **Your Project** > **Analytics**
2. Monitor requests, errors, and performance

### Logging

View logs in real-time:

```bash
npm run tail:cloudflare
```

---

## Troubleshooting

### Database Connection Issues

If you get database errors:
1. Verify the D1 binding name matches in `wrangler.toml` and `astro.config.mjs`
2. Check that the database ID is correct
3. Ensure the database is in the same Cloudflare account

### Build Errors

If you get build errors:
1. Make sure all dependencies are installed: `npm install`
2. Check Node.js version (v18+ required)
3. Try cleaning the build: `rm -rf dist node_modules && npm install && npm run build`

### Environment Variables Not Working

1. Verify variables are set in Cloudflare dashboard
2. Check that variable names match exactly (case-sensitive)
3. Restart the worker after changing variables

---

## Configuration Summary

### Files Modified

1. **`src/db/db.ts`** - Uses D1 in production, SQLite locally
2. **`wrangler.toml`** - D1 database configuration
3. **`astro.config.mjs`** - Cloudflare adapter with D1 support
4. **`src/pages/sitemap.xml.ts`** - Works with both local and D1 databases

### Database Tables

- `projects` - Your portfolio projects
- `albums` - Music albums
- `music_tracks` - Individual music tracks

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `ASTRO_ADAPTER=cloudflare npm run build` | Build for Cloudflare |
| `npm run deploy:cloudflare` | Deploy to production |
| `npm run deploy:cloudflare:dev` | Deploy to development |
| `npm run tail:cloudflare` | View logs |
| `wrangler d1 execute pixlized-db --command="SELECT * FROM projects"` | Query D1 database |
| `wrangler d1 backup create pixlized-db` | Backup D1 database |
| `wrangler d1 backup restore pixlized-db --from-file=backup.sql` | Restore D1 database |

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Create D1 database
3. ✅ Update wrangler.toml with D1 ID
4. ✅ Seed the database
5. ✅ Set environment variables
6. ✅ Deploy to Cloudflare
7. ✅ Verify everything works

---

## Additional Resources

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Astro Cloudflare Adapter](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

---

## Support

If you encounter issues:
1. Check the Cloudflare status page
2. Review the logs with `npm run tail:cloudflare`
3. Consult the documentation links above
4. Ensure all file changes are committed and pushed

---

**Last Updated:** August 2026
**Version:** 1.0.0
