/* Add SOAT settings and service to the existing data without resetting */
import { db } from '../src/lib/db'

async function main() {
  // Add SOAT-related settings (only if they don't exist yet)
  const soatSettings = [
    { key: 'soatEmergencyPhone', value: '+57 310 123 4567' },
    { key: 'soatTitle', value: 'Atención a pacientes SOAT' },
    { key: 'soatSubtitle', value: 'Brindamos atención médica integral a víctimas de accidentes de tránsito con cobertura SOAT. Nuestro equipo está preparado para atender emergencias y realizar cirugías de urgencia con la calidad y el profesionalismo que usted merece.' },
  ]
  for (const s of soatSettings) {
    const existing = await db.siteSetting.findUnique({ where: { key: s.key } })
    if (!existing) {
      await db.siteSetting.create({ data: s })
      console.log(`Added setting: ${s.key}`)
    }
  }

  // Add SOAT service if it doesn't exist
  const existingService = await db.service.findFirst({ where: { title: 'Atención SOAT' } })
  if (!existingService) {
    await db.service.create({
      data: {
        title: 'Atención SOAT',
        description: 'Atención integral a víctimas de accidentes de tránsito con cobertura SOAT: cirugías de emergencia, hospitalización y rehabilitación.',
        icon: 'activity',
        order: 16,
      },
    })
    console.log('Added service: Atención SOAT')
  }

  console.log('Done')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
