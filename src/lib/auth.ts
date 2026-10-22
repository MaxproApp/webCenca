import { NextRequest, NextResponse } from 'next/server'

// Auth helper - validates admin token
export async function validateAdmin(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    return false
  }
  const token = auth.slice(7)
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [userId, ts] = decoded.split(':')
    if (!userId || !ts) return false
    // Token expires after 24 hours
    const age = Date.now() - parseInt(ts)
    if (age > 24 * 60 * 60 * 1000) return false
    return true
  } catch {
    return false
  }
}
