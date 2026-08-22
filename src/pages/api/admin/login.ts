import type { APIRoute } from "astro"

// Simple admin login endpoint
// In production, use proper authentication with hashed passwords
const ADMIN_USER = import.meta.env.ADMIN_USER
const ADMIN_PASS = import.meta.env.ADMIN_PASS

// Simple hash function for basic security
const simpleHash = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash.toString(16)
}

const expectedHash = simpleHash(ADMIN_USER + ":" + ADMIN_PASS)

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Check credentials
    const inputHash = simpleHash(username + ":" + password)

    if (inputHash !== expectedHash) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Generate a simple token (in production, use JWT)
    const token = btoa(
      username + ":" + Date.now() + ":" + Math.random().toString(36)
    )

    return new Response(JSON.stringify({ token, username }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  })
}
