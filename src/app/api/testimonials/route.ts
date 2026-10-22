import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/testimonials - List all testimonials (public)
export async function GET() {
  try {
    const items = await db.testimonial.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json({ error: 'Error al obtener testimonios' }, { status: 500 })
  }
}

// POST /api/testimonials - Create a testimonial (admin only)
export async function POST(req: NextRequest) {
  const { validateAdmin } = await import('@/lib/auth')
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { name, role, content, rating, image, order } = body
    if (!name || !content) return NextResponse.json({ error: 'Nombre y contenido requeridos' }, { status: 400 })
    const item = await db.testimonial.create({
      data: {
        name,
        role: role || null,
        content,
        rating: rating ?? 5,
        image: image || null,
        order: order ?? 0,
      },
    })
    return NextResponse.json(item)
  } catch (e) {
    return NextResponse.json({ error: 'Error al crear testimonio' }, { status: 500 })
  }
}
