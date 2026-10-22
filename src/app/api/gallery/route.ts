import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/gallery - List all gallery items (public)
export async function GET() {
  try {
    const items = await db.galleryItem.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json({ error: 'Error al obtener galería' }, { status: 500 })
  }
}

// POST /api/gallery - Create a gallery item (admin only)
export async function POST(req: NextRequest) {
  const { validateAdmin } = await import('@/lib/auth')
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { title, description, image, category, order } = body
    if (!title) return NextResponse.json({ error: 'Título requerido' }, { status: 400 })
    if (!image) return NextResponse.json({ error: 'Imagen requerida' }, { status: 400 })
    const item = await db.galleryItem.create({
      data: {
        title,
        description: description || null,
        image,
        category: category || null,
        order: order ?? 0,
      },
    })
    return NextResponse.json(item)
  } catch (e) {
    return NextResponse.json({ error: 'Error al crear item' }, { status: 500 })
  }
}
