import type { APIRoute } from "astro"
import { getProjects, query, queryOne, insert, execute } from "@/db/db"
import type { D1Database } from "@cloudflare/workers-types"

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

// Security: Both ADMIN_USER and ADMIN_PASS must be set
if (!ADMIN_USER || !ADMIN_PASS) {
  throw new Error(
    "ADMIN_USER and ADMIN_PASS environment variables are required for security"
  )
}

const expectedHash = simpleHash(ADMIN_USER + ":" + ADMIN_PASS)

// Helper to verify token
const verifyToken = (token: string | null): boolean => {
  if (!token) return false
  try {
    const decoded = atob(token)
    const [username, ,] = decoded.split(":")
    const inputHash = simpleHash(username + ":" + ADMIN_PASS)
    return inputHash === expectedHash
  } catch {
    return false
  }
}

export const GET: APIRoute = async ({ request, locals }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const d1 = locals.runtime.env.CF_D1_DB as D1Database
    const projects = await getProjects(d1)
    return new Response(JSON.stringify({ projects }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const POST: APIRoute = async ({ request, locals }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const d1 = locals.runtime.env.CF_D1_DB as D1Database
    const body = await request.json()

    // Parse comma-separated arrays
    const parseArray = (value: string | undefined): string => {
      if (!value) return "[]"
      return JSON.stringify(
        value
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      )
    }

    // Parse JSON arrays
    const parseJson = (value: string | undefined): string => {
      if (!value) return "[]"
      try {
        return JSON.stringify(JSON.parse(value))
      } catch {
        return "[]"
      }
    }

    const result = await insert(
      d1,
      `
      INSERT INTO projects (
        title, tech, role, date, releasedAt, tag, description, cover,
        imgs, githubUrl, projectUrl, isVideo, videoUrl, features, stack, awards, metrics,
        isFeatured, isPersonal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        body.title,
        body.tech || "",
        body.role || "",
        body.date || "",
        body.releasedAt || new Date().toISOString().split("T")[0],
        body.tag || "",
        body.description || "",
        body.cover || "",
        parseArray(body.imgs),
        body.githubUrl || "",
        body.projectUrl || "",
        body.isVideo || 0,
        body.videoUrl || "",
        parseArray(body.features),
        parseArray(body.stack),
        parseJson(body.awards),
        parseJson(body.metrics),
        body.isFeatured || 0,
        body.isPersonal || 0,
      ]
    )

    return new Response(
      JSON.stringify({
        success: true,
        id: result.lastInsertRowid,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    console.error("Error creating project:", error)
    return new Response(JSON.stringify({ error: "Failed to create project" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const PUT: APIRoute = async ({ request, locals }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const d1 = locals.runtime.env.CF_D1_DB as D1Database
    const body = await request.json()
    const { id, ...data } = body

    // Parse comma-separated arrays
    const parseArray = (value: string | undefined): string => {
      if (!value) return "[]"
      return JSON.stringify(
        value
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      )
    }

    // Parse JSON arrays
    const parseJson = (value: string | undefined): string => {
      if (!value) return "[]"
      try {
        return JSON.stringify(JSON.parse(value))
      } catch {
        return "[]"
      }
    }

    await execute(
      d1,
      `
      UPDATE projects SET
        title = ?,
        tech = ?,
        role = ?,
        date = ?,
        releasedAt = ?,
        tag = ?,
        description = ?,
        cover = ?,
        imgs = ?,
        githubUrl = ?,
        projectUrl = ?,
        isVideo = ?,
        videoUrl = ?,
        features = ?,
        stack = ?,
        awards = ?,
        metrics = ?,
        isFeatured = ?,
        isPersonal = ?
      WHERE id = ?
    `,
      [
        data.title,
        data.tech || "",
        data.role || "",
        data.date || "",
        data.releasedAt || new Date().toISOString().split("T")[0],
        data.tag || "",
        data.description || "",
        data.cover || "",
        parseArray(data.imgs),
        data.githubUrl || "",
        data.projectUrl || "",
        data.isVideo || 0,
        data.videoUrl || "",
        parseArray(data.features),
        parseArray(data.stack),
        parseJson(data.awards),
        parseJson(data.metrics),
        data.isFeatured || 0,
        data.isPersonal || 0,
        id,
      ]
    )

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return new Response(JSON.stringify({ error: "Failed to update project" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const DELETE: APIRoute = async ({ request, locals }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const d1 = locals.runtime.env.CF_D1_DB as D1Database
    const body = await request.json()
    const { id } = body

    await execute(d1, "DELETE FROM projects WHERE id = ?", [id])

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete project" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
