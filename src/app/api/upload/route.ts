import { NextRequest, NextResponse } from 'next/server'
import { validateAdmin } from '@/lib/auth'
import { promises as fs } from 'fs'
import path from 'path'

// POST /api/upload - Upload an image (admin only)
// Accepts multipart/form-data with a "file" field. Saves to /public/uploads/
// and returns { url: "/uploads/<unique-name>.<ext>" }.
export async function POST(req: NextRequest) {
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Archivo no recibido' }, { status: 400 })
    }
    if (file.size === 0) {
      return NextResponse.json({ error: 'El archivo está vacío' }, { status: 400 })
    }
    // 10 MB cap
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'El archivo supera los 10 MB' }, { status: 400 })
    }

    // Validate image type by MIME and extension.
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo no permitido: ${file.type || 'desconocido'}. Use JPG, PNG, WebP, GIF o SVG.` },
        { status: 400 },
      )
    }

    const extByMime: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
      'image/svg+xml': 'svg',
    }
    const ext = extByMime[file.type] || 'bin'

    // Unique, ASCII-only filename to avoid filesystem/URL encoding issues.
    const stamp = Date.now()
    const rand = Math.random().toString(36).slice(2, 8)
    const filename = `upload-${stamp}-${rand}.${ext}`

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })
    const filepath = path.join(uploadsDir, filename)

    const bytes = await file.arrayBuffer()
    await fs.writeFile(filepath, Buffer.from(bytes))

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (e) {
    console.error('upload error:', e)
    return NextResponse.json({ error: 'Error al subir imagen' }, { status: 500 })
  }
}
