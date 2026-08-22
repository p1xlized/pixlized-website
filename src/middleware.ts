import { defineMiddleware } from "astro:middleware"

const ADMIN_SEED = import.meta.env.ADMIN_SEED || ""

// Hide admin behind /<random-seed>/admin/
export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url)

  // Check if this is an admin route
  if (url.pathname.startsWith("/admin") || url.pathname === "/admin") {
    // Extract the seed from the path if it exists
    // Expected format: /<seed>/admin/...
    const pathParts = url.pathname.split("/")

    // Check if the path is /<seed>/admin
    if (
      pathParts.length >= 3 &&
      pathParts[1] === ADMIN_SEED &&
      pathParts[2] === "admin"
    ) {
      // Valid seed, allow access
      return next()
    }

    // Check if it's directly /admin without seed
    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
      // Redirect to the seeded admin URL
      const newUrl = `/${ADMIN_SEED}/admin${url.pathname === "/admin" ? "" : url.pathname.substring(5)}`
      return Response.redirect(new URL(newUrl, context.request.url), 302)
    }
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
