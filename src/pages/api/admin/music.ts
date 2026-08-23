import type { APIRoute } from "astro"
import { db } from "@/db/db"

// POST: Add new track
// PUT: Update existing track
// DELETE: Delete track
// GET: List all tracks

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

// GET: List all tracks
export const GET: APIRoute = async ({ request }) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '') || ''
    if (!validateToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const tracks = db.prepare(`
      SELECT mt.*, a.title as albumTitle
      FROM music_tracks mt
      LEFT JOIN albums a ON mt.albumId = a.id
      ORDER BY mt.albumId, mt.id
    `).all()

    return new Response(JSON.stringify({ tracks }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch tracks' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// POST: Add new track
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
    const { title, genre, duration, bpm, description, file, albumId } = body

    if (!title || !genre || !duration || !file || !albumId) {
      return new Response(JSON.stringify({ error: 'Missing required fields: title, genre, duration, file, albumId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check if album exists
    const album = db.prepare('SELECT id FROM albums WHERE id = ?').get(albumId) as { id: number } | undefined
    if (!album) {
      return new Response(JSON.stringify({ error: 'Album not found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const insertStatement = db.prepare(`
      INSERT INTO music_tracks (title, genre, duration, bpm, description, file, albumId, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `)

    const result = insertStatement.run(
      title,
      genre,
      duration,
      bpm || null,
      description || null,
      file,
      albumId
    )

    const newTrack = db.prepare('SELECT * FROM music_tracks WHERE id = ?').get(result.lastInsertRowid)

    return new Response(JSON.stringify({ track: newTrack, id: result.lastInsertRowid }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add track' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// DELETE: Delete track
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
      return new Response(JSON.stringify({ error: 'Track ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check if track exists
    const track = db.prepare('SELECT id FROM music_tracks WHERE id = ?').get(id) as { id: number } | undefined
    if (!track) {
      return new Response(JSON.stringify({ error: 'Track not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    db.prepare('DELETE FROM music_tracks WHERE id = ?').run(id)

    return new Response(JSON.stringify({ message: 'Track deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete track' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// PUT: Update track
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
    const { id, title, genre, duration, bpm, description, file, albumId } = body

    if (!id) {
      return new Response(JSON.stringify({ error: 'Track ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check if album exists (if provided)
    if (albumId) {
      const album = db.prepare('SELECT id FROM albums WHERE id = ?').get(albumId) as { id: number } | undefined
      if (!album) {
        return new Response(JSON.stringify({ error: 'Album not found' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }

    const updateStatement = db.prepare(`
      UPDATE music_tracks
      SET title = ?, genre = ?, duration = ?, bpm = ?, description = ?, file = ?, albumId = ?
      WHERE id = ?
    `)

    updateStatement.run(
      title || undefined,
      genre || undefined,
      duration || undefined,
      bpm || undefined,
      description || undefined,
      file || undefined,
      albumId || undefined,
      id
    )

    const updatedTrack = db.prepare('SELECT * FROM music_tracks WHERE id = ?').get(id)

    return new Response(JSON.stringify({ track: updatedTrack }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update track' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
