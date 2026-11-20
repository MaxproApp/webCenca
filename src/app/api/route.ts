import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/settings - Get all settings (public)
export async function GET() {
  try {
    const items = await db.siteSetting.findMany()
    const obj: Record<string, string> = {}
    for (const it of items) obj[it.key] = it.value
    return NextResponse.json(obj)
  } catch (e) {
    return NextResponse.json({ error: 'Error al obtener ajustes' }, { status: 500 })
  }
}

// POST /api/settings - Update settings (admin only)
export async function POST(req: NextRequest) {
  const { validateAdmin } = await import('@/lib/auth')
  if (!(await validateAdmin(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const body = (await req.json()) as Record<string, string>
    for (const [key, value] of Object.entries(body)) {
      const existing = await db.siteSetting.findUnique({ where: { key } })
      if (existing) {
        await db.siteSetting.update({ where: { key }, data: { value: String(value) } })
      } else {
        await db.siteSetting.create({ data: { key, value: String(value) } })
      }
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Error al guardar ajustes' }, { status: 500 })
  }
}
