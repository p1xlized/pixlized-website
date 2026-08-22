import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { db } from '../db/db'

// Static pages
const staticPages = [
  { url: '', lastmod: new Date(), changefreq: 'weekly', priority: 1.0 },
  { url: '/projects', lastmod: new Date(), changefreq: 'weekly', priority: 0.9 },
  { url: '/blog', lastmod: new Date(), changefreq: 'weekly', priority: 0.9 },
  { url: '/music', lastmod: new Date(), changefreq: 'weekly', priority: 0.8 },
]

export const GET: APIRoute = async () => {
  // Get all blog posts
  const blogPosts = await getCollection('blog')
  const blogUrls = blogPosts.map(post => ({
    url: `/blog/${post.id}`,
    lastmod: new Date(post.data.pubDate),
    changefreq: 'monthly' as const,
    priority: 0.7
  }))

  // Get all projects from database
  const projects = db.prepare('SELECT id, releasedAt FROM projects').all() as any[]
  const projectUrls = projects.map(project => ({
    url: `/projects/${project.id}`,
    lastmod: new Date(project.releasedAt),
    changefreq: 'monthly' as const,
    priority: 0.8
  }))

  // Combine all URLs
  const allUrls = [...staticPages, ...blogUrls, ...projectUrls]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${allUrls.map(({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>https://pixlized.net${url}</loc>
    <lastmod>${lastmod.toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
