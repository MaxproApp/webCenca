import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { validateAdmin } = await import('@/lib/auth')
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const { id } = await params
    const body = await req.json()
    const { name, specialty, bio, image, schedule, order, active } = body
    const doctor = await db.doctor.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(specialty !== undefined && { specialty }),
        ...(bio !== undefined && { bio }),
        ...(image !== undefined && { image }),
        ...(schedule !== undefined && { schedule }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    })
    return NextResponse.json(doctor)
  } catch (e) {
    return NextResponse.json({ error: 'Error al actualizar especialista' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const { validateAdmin } = await import('@/lib/auth')
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const { id } = await params
    await db.doctor.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Error al eliminar especialista' }, { status: 500 })
  }
}
