/* Replace gallery with the 10 new installation photos */
import { db } from '../src/lib/db'

const NEW_GALLERY = [
  {
    title: 'Recepción',
    description: 'Recepción principal donde brindamos atención al paciente y orientación sobre nuestros servicios.',
    image: '/uploads/recepcion.jpg',
    category: 'Instalaciones',
    order: 1,
  },
  {
    title: 'Sala de Espera de Consultas',
    description: 'Sala de espera cómoda y amplia para pacientes que asisten a consultas externas.',
    image: '/uploads/sala-espera-consultas.jpg',
    category: 'Instalaciones',
    order: 2,
  },
  {
    title: 'Quirófano',
    description: 'Quirófano moderno equipado con tecnología de avanzada para cirugías generales y de emergencia.',
    image: '/uploads/quirofano-v2.jpg',
    category: 'Instalaciones',
    order: 3,
  },
  {
    title: 'Sala de Rayos X',
    description: 'Equipo de rayos X digital para diagnóstico por imagen de alta precisión.',
    image: '/uploads/rayos-x.jpg',
    category: 'Instalaciones',
    order: 4,
  },
  {
    title: 'Farmacia',
    description: 'Farmacia institucional con medicamentos para pacientes hospitalizados y ambulatorios.',
    image: '/uploads/farmacia.jpg',
    category: 'Instalaciones',
    order: 5,
  },
  {
    title: 'Sala de Preparación de Medicamentos',
    description: 'Área aséptica para la preparación y dosificación de medicamentos intrahospitalarios.',
    image: '/uploads/sala-preparacion-medicamentos.jpg',
    category: 'Instalaciones',
    order: 6,
  },
  {
    title: 'Sala de Recuperación 1',
    description: 'Sala de recuperación equipada para el monitoreo postoperatorio de nuestros pacientes.',
    image: '/uploads/recuperacion-1.jpg',
    category: 'Instalaciones',
    order: 7,
  },
  {
    title: 'Sala de Recuperación 2',
    description: 'Espacio de recuperación con comodidad y atención médica permanente.',
    image: '/uploads/recuperacion-2.jpg',
    category: 'Instalaciones',
    order: 8,
  },
  {
    title: 'Sala de Recuperación 3',
    description: 'Tercera sala de recuperación para el postoperatorio y cuidado del paciente.',
    image: '/uploads/recuperacion-3.jpg',
    category: 'Instalaciones',
    order: 9,
  },
  {
    title: 'Sala de Recuperación',
    description: 'Sala principal de recuperación postoperatoria con monitoreo continuo.',
    image: '/uploads/sala-recuperacion.jpg',
    category: 'Instalaciones',
    order: 10,
  },
]

async function main() {
  // Wipe old gallery (was 4 sede/quirófano images)
  const deleted = await db.galleryItem.deleteMany({})
  console.log(`Deleted ${deleted.count} old gallery items`)

  // Insert the 10 new photos
  for (const g of NEW_GALLERY) {
    await db.galleryItem.create({ data: g })
  }
  console.log(`Inserted ${NEW_GALLERY.length} new gallery items`)

  const all = await db.galleryItem.findMany({ orderBy: { order: 'asc' } })
  console.log('Total gallery items:', all.length)
  for (const g of all) {
    console.log(`  - [${g.order}] ${g.title} -> ${g.image}`)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
