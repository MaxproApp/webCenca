/* Clean up test data */
import { db } from '../src/lib/db'

async function main() {
  const a = await db.appointment.deleteMany({
    where: { OR: [
      { email: 'maria@test.com' },
      { name: 'María Test' },
    ] },
  })
  console.log(`Deleted ${a.count} test appointments`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
