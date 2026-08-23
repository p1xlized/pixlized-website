import type { APIRoute } from "astro"
import {
  getAlbums,
  getMusicTracks,
  query,
  queryOne,
  insert,
  execute,
} from "@/db/db"
import type { D1Database } from "@cloudflare/workers-types"

// POST: Add new album
// PUT: Update existing album
// DELETE: Delete album
// GET: List all albums

const ADMIN_USER = import.meta.env.ADMIN_USER
const ADMIN_PASS = import.meta.env.ADMIN_PASS

// Security: Both ADMIN_USER and ADMIN_PASS must be set
if (!ADMIN_USER || !ADMIN_PASS) {
  throw new Error(
    "ADMIN_USER and ADMIN_PASS environment variables are required for security"
  )
}

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

function validateToken(token: string): boolean {
  try {
    const decoded = atob(token)
    const [username] = decoded.split(":")
    const inputHash = simpleHash(username + ":" + ADMIN_PASS)
    return inputHash === expectedHash
  } catch {
    return false
  }
}

// GET: List all albums
export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const token =
      request.headers.get("Authorization")?.replace("Bearer ", "") || ""
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const d1 = locals.runtime.env.CF_D1_DB as D1Database
    const albums = await getAlbums(d1)
    const tracks = await getMusicTracks(d1)

    // Enrich albums with track counts
    const enrichedAlbums = albums.map((album) => {
      const albumTracks = tracks.filter((t) => t.albumId === album.id)
      return {
        ...album,
        trackCount: albumTracks.length,
      }
    })

    return new Response(JSON.stringify({ albums: enrichedAlbums }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch albums" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// POST: Add new album
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const token =
      request.headers.get("Authorization")?.replace("Bearer ", "") || ""
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const d1 = locals.runtime.env.CF_D1_DB as D1Database
    const body = await request.json()
    const { title, description, cover } = body

    if (!title) {
      return new Response(
        JSON.stringify({ error: "Album title is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const result = await insert(
      d1,
      `
      INSERT INTO albums (title, description, cover, createdAt)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `,
      [title, description || null, cover || null]
    )

    const newAlbum = await queryOne(d1, "SELECT * FROM albums WHERE id = ?", [
      result.lastInsertRowid,
    ])

    return new Response(
      JSON.stringify({ album: newAlbum, id: result.lastInsertRowid }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create album" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// DELETE: Delete album (sets albumId to NULL for tracks, doesn't delete tracks)
export const DELETE: APIRoute = async ({ request, locals }) => {
  try {
    const token =
      request.headers.get("Authorization")?.replace("Bearer ", "") || ""
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const d1 = locals.runtime.env.CF_D1_DB as D1Database
    const { url } = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const id = parseInt(searchParams.get("id") || "0")

    if (!id) {
      return new Response(JSON.stringify({ error: "Album ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Check if album exists
    const album = (await queryOne(d1, "SELECT id FROM albums WHERE id = ?", [
      id,
    ])) as { id: number } | undefined
    if (!album) {
      return new Response(JSON.stringify({ error: "Album not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Delete the album
    await execute(d1, "DELETE FROM albums WHERE id = ?", [id])

    // Set albumId to NULL for all tracks that were in this album
    await execute(d1, "UPDATE music_tracks SET albumId = 1 WHERE albumId = ?", [
      id,
    ])

    return new Response(
      JSON.stringify({
        message:
          "Album deleted successfully. Tracks have been reassigned to default album (ID: 1).",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete album" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// PUT: Update album
export const PUT: APIRoute = async ({ request, locals }) => {
  try {
    const token =
      request.headers.get("Authorization")?.replace("Bearer ", "") || ""
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const d1 = locals.runtime.env.CF_D1_DB as D1Database
    const body = await request.json()
    const { id, title, description, cover } = body

    if (!id) {
      return new Response(JSON.stringify({ error: "Album ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Check if album exists
    const album = (await queryOne(d1, "SELECT id FROM albums WHERE id = ?", [
      id,
    ])) as { id: number } | undefined
    if (!album) {
      return new Response(JSON.stringify({ error: "Album not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    await execute(
      d1,
      `
      UPDATE albums
      SET title = ?, description = ?, cover = ?
      WHERE id = ?
    `,
      [title || undefined, description || undefined, cover || undefined, id]
    )

    const updatedAlbum = await queryOne(
      d1,
      "SELECT * FROM albums WHERE id = ?",
      [id]
    )

    return new Response(JSON.stringify({ album: updatedAlbum }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update album" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
