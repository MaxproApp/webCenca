import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/doctors - List all doctors (public)
export async function GET() {
  try {
    const doctors = await db.doctor.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(doctors)
  } catch (e) {
    return NextResponse.json({ error: 'Error al obtener especialistas' }, { status: 500 })
  }
}

// POST /api/doctors - Create a doctor (admin only)
export async function POST(req: NextRequest) {
  const { validateAdmin } = await import('@/lib/auth')
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { name, specialty, bio, image, schedule, order } = body
    if (!name) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
    const doctor = await db.doctor.create({
      data: {
        name,
        specialty: specialty || '',
        bio: bio || null,
        image: image || null,
        schedule: schedule || null,
        order: order ?? 0,
      },
    })
    return NextResponse.json(doctor)
  } catch (e) {
    return NextResponse.json({ error: 'Error al crear especialista' }, { status: 500 })
  }
}
