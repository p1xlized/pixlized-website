import type { APIRoute } from "astro"
import { writeFile, mkdir } from "node:fs/promises"
import { join, extname } from "node:path"

// Allowed file types and their MIME types
const ALLOWED_TYPES: Record<string, string[]> = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"],
}

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

// Generate a unique filename
const generateFilename = (originalName: string) => {
  const ext = extname(originalName).toLowerCase()
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${random}${ext}`
}

// Verify admin token
const verifyToken = (token: string | null): boolean => {
  if (!token) return false
  const ADMIN_USER = import.meta.env.ADMIN_USER
  const ADMIN_PASS = import.meta.env.ADMIN_PASS

  if (!ADMIN_USER || !ADMIN_PASS) return false

  try {
    const decoded = atob(token)
    const [username] = decoded.split(":")
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
    const inputHash = simpleHash(username + ":" + ADMIN_PASS)
    return inputHash === expectedHash
  } catch {
    return false
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
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const fileType = formData.get("type") as string | null // 'image' or 'audio'
    const uploadDir = formData.get("dir") as string | null // e.g., 'projects', 'music', 'blog'

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!fileType || !["image", "audio"].includes(fileType)) {
      return new Response(JSON.stringify({ error: "Invalid file type. Use 'image' or 'audio'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Validate file type
    if (!ALLOWED_TYPES[fileType].includes(file.type)) {
      return new Response(JSON.stringify({
        error: `Invalid file type. Allowed types: ${ALLOWED_TYPES[fileType].join(", ")}`
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({ error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Determine upload directory
    const baseDir = "public/assets"
    const targetDir = uploadDir ? join(baseDir, uploadDir) : join(baseDir, fileType + "s")

    // Create directory if it doesn't exist
    await mkdir(targetDir, { recursive: true })

    // Generate unique filename and save
    const filename = generateFilename(file.name)
    const filePath = join(targetDir, filename)
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    await writeFile(filePath, fileBuffer)

    // Return the public URL
    const publicUrl = `/assets/${uploadDir ? uploadDir + "/" : ""}${fileType}s/${filename}`

    return new Response(JSON.stringify({
      success: true,
      filename,
      url: publicUrl,
      path: filePath,
      size: file.size,
      type: file.type
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Upload error:", error)
    return new Response(JSON.stringify({ error: "Failed to upload file" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
