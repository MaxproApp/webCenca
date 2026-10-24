import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/visits - Get the current visit count
export async function GET() {
  try {
    let visit = await db.visit.findFirst()
    if (!visit) {
      visit = await db.visit.create({ data: { count: 0 } })
    }
    return NextResponse.json({ count: visit.count })
  } catch (e) {
    return NextResponse.json({ count: 0 })
  }
}

// POST /api/visits - Increment the visit count by 1
export async function POST() {
  try {
    let visit = await db.visit.findFirst()
    if (!visit) {
      visit = await db.visit.create({ data: { count: 1 } })
    } else {
      visit = await db.visit.update({
        where: { id: visit.id },
        data: { count: { increment: 1 } },
      })
    }
    return NextResponse.json({ count: visit.count })
  } catch (e) {
    return NextResponse.json({ count: 0 })
  }
}
