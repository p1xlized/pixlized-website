import type { APIRoute } from "astro"
import { db } from "@/db/db"

// POST: Add new album
// PUT: Update existing album
// DELETE: Delete album
// GET: List all albums

const ADMIN_USER = import.meta.env.ADMIN_USER
const ADMIN_PASS = import.meta.env.ADMIN_PASS

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
    const [username] = decoded.split(':')
    const inputHash = simpleHash(username + ":" + ADMIN_PASS)
    return inputHash === expectedHash
  } catch {
    return false
  }
}

// GET: List all albums
export const GET: APIRoute = async ({ request }) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '') || ''
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const albums = db.prepare(`
      SELECT a.*,
             COUNT(mt.id) as trackCount
      FROM albums a
      LEFT JOIN music_tracks mt ON a.id = mt.albumId
      GROUP BY a.id
      ORDER BY a.createdAt DESC
    `).all()

    return new Response(JSON.stringify({ albums }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch albums' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// POST: Add new album
export const POST: APIRoute = async ({ request }) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '') || ''
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const body = await request.json()
    const { title, description, cover } = body

    if (!title) {
      return new Response(JSON.stringify({ error: 'Album title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const insertStatement = db.prepare(`
      INSERT INTO albums (title, description, cover, createdAt)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `)

    const result = insertStatement.run(
      title,
      description || null,
      cover || null
    )

    const newAlbum = db.prepare('SELECT * FROM albums WHERE id = ?').get(result.lastInsertRowid)

    return new Response(JSON.stringify({ album: newAlbum, id: result.lastInsertRowid }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create album' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// DELETE: Delete album (sets albumId to NULL for tracks, doesn't delete tracks)
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '') || ''
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const { url } = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const id = parseInt(searchParams.get('id') || '0')

    if (!id) {
      return new Response(JSON.stringify({ error: 'Album ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check if album exists
    const album = db.prepare('SELECT id FROM albums WHERE id = ?').get(id) as { id: number } | undefined
    if (!album) {
      return new Response(JSON.stringify({ error: 'Album not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Delete the album
    db.prepare('DELETE FROM albums WHERE id = ?').run(id)

    // Set albumId to NULL for all tracks that were in this album
    db.prepare('UPDATE music_tracks SET albumId = 1 WHERE albumId = ?').run(id)

    return new Response(JSON.stringify({
      message: 'Album deleted successfully. Tracks have been reassigned to default album (ID: 1).'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete album' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// PUT: Update album
export const PUT: APIRoute = async ({ request }) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '') || ''
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const body = await request.json()
    const { id, title, description, cover } = body

    if (!id) {
      return new Response(JSON.stringify({ error: 'Album ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check if album exists
    const album = db.prepare('SELECT id FROM albums WHERE id = ?').get(id) as { id: number } | undefined
    if (!album) {
      return new Response(JSON.stringify({ error: 'Album not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const updateStatement = db.prepare(`
      UPDATE albums
      SET title = ?, description = ?, cover = ?
      WHERE id = ?
    `)

    updateStatement.run(
      title || undefined,
      description || undefined,
      cover || undefined,
      id
    )

    const updatedAlbum = db.prepare('SELECT * FROM albums WHERE id = ?').get(id)

    return new Response(JSON.stringify({ album: updatedAlbum }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update album' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
