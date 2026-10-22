import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/appointments - List all appointments (admin only)
export async function GET(req: NextRequest) {
  const { validateAdmin } = await import('@/lib/auth')
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const items = await db.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json({ error: 'Error al obtener citas' }, { status: 500 })
  }
}

// POST /api/appointments - Create an appointment (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, date, message } = body
    if (!name || !email) {
      return NextResponse.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
    }
    const item = await db.appointment.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || null,
        date: date || null,
        message: message || null,
      },
    })
    return NextResponse.json(item)
  } catch (e) {
    return NextResponse.json({ error: 'Error al crear cita' }, { status: 500 })
  }
}
