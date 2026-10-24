/* Add the uploaded images to the gallery and add new services */
import { db } from '../src/lib/db'

async function main() {
  // Clear existing gallery items (they were placeholder-only items)
  await db.galleryItem.deleteMany({})
  console.log('Cleared gallery')

  const gallery = [
    {
      title: 'Nuestra sede',
      description: 'Fachada principal del Centro de Especialistas La Candelaria (CENCA S.A.S.).',
      image: '/uploads/sede-fachada.jpg',
      category: 'Exterior',
      order: 1,
    },
    {
      title: 'Sede - Vista lateral',
      description: 'Vista exterior de nuestras instalaciones con acceso cómodo y seguro.',
      image: '/uploads/sede-2.jpg',
      category: 'Exterior',
      order: 2,
    },
    {
      title: 'Entrada principal',
      description: 'Acceso a la sede con rampa para personas con movilidad reducida.',
      image: '/uploads/sede-1.jpg',
      category: 'Exterior',
      order: 3,
    },
    {
      title: 'Quirófano',
      description: 'Nuestro moderno quirófano equipado con tecnología de última generación para cirugías generales y programadas.',
      image: '/uploads/quirofano.jpg',
      category: 'Instalaciones',
      order: 4,
    },
  ]
  for (const g of gallery) {
    await db.galleryItem.create({ data: g })
  }
  console.log(`Created ${gallery.length} gallery items`)

  // Add 2 new services: Consulta de Cirugía and Cirugía Programada
  const newServices = [
    {
      title: 'Consulta de Cirugía',
      description: 'Evaluación, diagnóstico y planificación quirúrgica con nuestro especialista en cirugía general.',
      icon: 'stethoscope',
      order: 11,
    },
    {
      title: 'Cirugía Programada',
      description: 'Procedimientos quirúrgicos programados en nuestro quirófano moderno con tecnología de avanzada.',
      icon: 'syringe',
      order: 12,
    },
  ]
  for (const s of newServices) {
    const existing = await db.service.findFirst({ where: { title: s.title } })
    if (!existing) {
      await db.service.create({ data: s })
      console.log(`Created service: ${s.title}`)
    }
  }

  console.log('Done')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
