import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { validateAdmin } from '@/lib/auth'

// GET /api/services - List all services (public)
export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(services)
  } catch (e) {
    return NextResponse.json({ error: 'Error al obtener servicios' }, { status: 500 })
  }
}

// POST /api/services - Create a service (admin only)
export async function POST(req: NextRequest) {
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { title, description, icon, image, order } = body
    if (!title) return NextResponse.json({ error: 'Título requerido' }, { status: 400 })
    const service = await db.service.create({
      data: {
        title,
        description: description || '',
        icon: icon || null,
        image: image || null,
        order: order ?? 0,
      },
    })
    return NextResponse.json(service)
  } catch (e) {
    return NextResponse.json({ error: 'Error al crear servicio' }, { status: 500 })
  }
}
