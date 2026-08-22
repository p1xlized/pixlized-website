import type { APIRoute } from "astro"
import { readdir, readFile, writeFile, unlink, mkdir } from "node:fs/promises"
import { join } from "node:path"

const BLOG_DIR = join(process.cwd(), "src", "content", "blog")

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

const ADMIN_USER = import.meta.env.ADMIN_USER
const ADMIN_PASS = import.meta.env.ADMIN_PASS
const expectedHash = simpleHash(ADMIN_USER + ":" + ADMIN_PASS)

// Helper to verify token
const verifyToken = (token: string | null): boolean => {
  if (!token) return false
  try {
    const decoded = atob(token)
    const [username] = decoded.split(":")
    const inputHash = simpleHash(username + ":" + ADMIN_PASS)
    return inputHash === expectedHash
  } catch {
    return false
  }
}

// Generate a unique ID for blog posts
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Get all blog posts
const getBlogPosts = async () => {
  try {
    const files = await readdir(BLOG_DIR)
    const posts = []

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = join(BLOG_DIR, file)
        const content = await readFile(filePath, "utf-8")
        const [frontmatter, ...rest] = content.split("---")

        if (frontmatter && rest.length > 0) {
          const metadata: Record<string, any> = {}
          const lines = frontmatter.trim().split("\n").slice(1)

          for (const line of lines) {
            const [key, ...valueParts] = line.split(":")
            if (key && valueParts.length > 0) {
              const value = valueParts.join(":").trim()
              // Parse simple values
              if (value.startsWith("[") && value.endsWith("]")) {
                try {
                  metadata[key.trim()] = JSON.parse(value)
                } catch {
                  metadata[key.trim()] = value
                }
              } else if (value.startsWith("\"") && value.endsWith("\"")) {
                metadata[key.trim()] = value.slice(1, -1)
              } else if (value === "true") {
                metadata[key.trim()] = true
              } else if (value === "false") {
                metadata[key.trim()] = false
              } else if (!isNaN(Number(value))) {
                metadata[key.trim()] = Number(value)
              } else {
                metadata[key.trim()] = value
              }
            }
          }

          // Get the content after frontmatter
          const bodyContent = rest.slice(1).join("---").trim()

          posts.push({
            id: file.replace(".md", ""),
            file: file,
            ...metadata,
            body: bodyContent
          })
        }
      }
    }

    return posts.sort((a: any, b: any) =>
      new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime()
    )
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// Save a blog post
const saveBlogPost = async (id: string, data: any) => {
  const filename = `${id}.md`
  const filePath = join(BLOG_DIR, filename)

  // Build frontmatter
  const frontmatterLines = [
    "---",
    `title: "${data.title.replace(/\"/g, '\\\"')}"`,
    `description: "${data.description.replace(/\"/g, '\\\"')}"`,
    `pubDate: ${data.pubDate}`,
    `tags: ${JSON.stringify(data.tags || [])}`,
    "---"
  ]

  const content = [frontmatterLines.join("\n"), "", data.body].join("\n")

  await mkdir(BLOG_DIR, { recursive: true })
  await writeFile(filePath, content, "utf-8")

  return { success: true, id }
}

// Delete a blog post
const deleteBlogPost = async (id: string) => {
  const filePath = join(BLOG_DIR, `${id}.md`)

  try {
    await unlink(filePath)
    return { success: true }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return { success: false, error: "File not found" }
  }
}

export const GET: APIRoute = async ({ request }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const posts = await getBlogPosts()
    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch blog posts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const POST: APIRoute = async ({ request }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const body = await request.json()
    const id = body.id || generateId()

    const result = await saveBlogPost(id, body)

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return new Response(JSON.stringify({ error: "Failed to create blog post" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const PUT: APIRoute = async ({ request }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const result = await saveBlogPost(id, data)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return new Response(JSON.stringify({ error: "Failed to update blog post" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const DELETE: APIRoute = async ({ request }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const result = await deleteBlogPost(id)

    if (result.success) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } else {
      return new Response(JSON.stringify(result), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete blog post" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
