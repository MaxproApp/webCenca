import { NextResponse } from 'next/server'

/**
 * Server-side error handler for API route handlers.
 *
 * Maps Prisma errors to the correct HTTP status instead of swallowing every
 * failure as a 500:
 *  - P2025 (record not found on update/delete) → 404, so the frontend can
 *    react (refresh the list, drop the stale item) instead of showing a
 *    generic "internal error".
 *  - everything else → 500 with a short label.
 *
 * Without this, editing/deleting a record whose id no longer exists (e.g. the
 * DB was re-seeded and the browser still shows old items) returns a confusing
 * 500 and the admin cannot tell why.
 */
export function handleRouteError(e: unknown, notFoundLabel: string, serverLabel = 'Error en el servidor') {
  // PrismaClientKnownRequestError carries a `code` like 'P2025'.
  const code = (e as { code?: string })?.code
  if (code === 'P2025') {
    return NextResponse.json(
      { error: `${notFoundLabel} ya no existe; se actualizó la lista.` },
      { status: 404 },
    )
  }
  return NextResponse.json({ error: serverLabel }, { status: 500 })
}
