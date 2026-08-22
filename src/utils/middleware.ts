import { defineMiddleware } from "astro:middleware"

const ADMIN_SEED = import.meta.env.ADMIN_SEED || ""

// Hide admin login behind /secret/<ADMIN_SEED>/admin/
export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url)

  // Check if this is the admin login route
  const pathParts = url.pathname.split("/")

  // Check if the path is /secret/<seed>/admin (login page)
  if (
    pathParts.length >= 4 &&
    pathParts[1] === "secret" &&
    pathParts[2] === ADMIN_SEED &&
    pathParts[3] === "admin"
  ) {
    // Valid seed, allow access to login page
    return next()
  }

  // Check if it's directly /admin (without subpath) - redirect to login
  if (url.pathname === "/admin") {
    const newUrl = `/secret/${ADMIN_SEED}/admin`
    return Response.redirect(new URL(newUrl, context.request.url), 302)
  }

  // Allow all other /admin/* routes to pass through (dashboard, albums, etc.)
  // They will handle their own auth checks
  if (url.pathname.startsWith("/admin/")) {
    return next()
  }

  // Add Cloudflare caching headers for static assets
  const response = await next()

  // Cache static assets aggressively (1 year)
  if (url.pathname.startsWith("/assets/") ||
      url.pathname.startsWith("/images/") ||
      url.pathname.startsWith("/fonts/") ||
      url.pathname.startsWith("/_astro/")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  // Cache API responses for 1 hour
  if (url.pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "public, max-age=3600")
  }

  // Don't cache HTML pages (they might have dynamic content)
  if (url.pathname.endsWith(".html") || url.pathname === "/") {
    response.headers.set("Cache-Control", "no-cache")
  }

  return response
})
