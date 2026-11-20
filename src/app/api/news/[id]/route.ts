import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { validateAdmin } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

// PUT /api/services/[id] - Update a service (admin only)
export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const { id } = await params
    const body = await req.json()
    const { title, description, icon, image, order, active } = body
    const service = await db.service.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(image !== undefined && { image }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    })
    return NextResponse.json(service)
  } catch (e) {
    return NextResponse.json({ error: 'Error al actualizar servicio' }, { status: 500 })
  }
}

// DELETE /api/services/[id] - Delete a service (admin only)
export async function DELETE(req: NextRequest, { params }: Ctx) {
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const { id } = await params
    await db.service.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Error al eliminar servicio' }, { status: 500 })
  }
}
