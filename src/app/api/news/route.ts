import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/news - List all news (public)
export async function GET() {
  try {
    const items = await db.newsItem.findMany({
      where: { active: true },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json(items)
  } catch (e: any) {
    console.error('[api/news] GET error:', e?.message, e?.stack)
    return NextResponse.json({ error: 'Error al obtener noticias', detail: e?.message }, { status: 500 })
  }
}

// POST /api/news - Create a news item (admin only)
export async function POST(req: NextRequest) {
  const { validateAdmin } = await import('@/lib/auth')
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { title, excerpt, content, category, image, date, author, featured, order } = body
    if (!title || !content) {
      return NextResponse.json({ error: 'Título y contenido son requeridos' }, { status: 400 })
    }
    const item = await db.newsItem.create({
      data: {
        title,
        excerpt: excerpt || null,
        content,
        category: category || 'Noticia',
        image: image || null,
        date: date || null,
        author: author || null,
        featured: featured ?? false,
        order: order ?? 0,
      },
    })
    return NextResponse.json(item)
  } catch (e) {
    return NextResponse.json({ error: 'Error al crear noticia' }, { status: 500 })
  }
}
