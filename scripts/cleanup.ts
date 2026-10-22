/* Clean up test data created during verification */
import { db } from '../src/lib/db'

async function main() {
  // Delete test gallery items
  const g = await db.galleryItem.deleteMany({
    where: { title: { contains: 'Test Gallery Item' } },
  })
  console.log(`Deleted ${g.count} test gallery items`)

  // Delete test appointments
  const a = await db.appointment.deleteMany({
    where: { OR: [
      { email: 'test@example.com' },
      { name: 'Test User' },
    ] },
  })
  console.log(`Deleted ${a.count} test appointments`)

  console.log('Cleanup complete')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
