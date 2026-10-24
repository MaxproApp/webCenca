/* Replace gallery items with the 4 real images */
import { db } from '../src/lib/db'

async function main() {
  // Clear existing gallery items
  await db.galleryItem.deleteMany({})
  console.log('Cleared gallery')

  const gallery = [
    {
      title: 'Nuestra sede',
      description: 'Fachada principal del Centro de Especialistas La Candelaria (CENCA S.A.S.) en El Banco, Magdalena. Aquí encontrará nuestros servicios: Cirugía General, Radiología, Electrocardiograma, Ginecología, Pediatría y más.',
      image: '/uploads/sede-fachada.jpg',
      category: 'Exterior',
      order: 1,
    },
    {
      title: 'Sede - Vista lateral',
      description: 'Vista exterior lateral de nuestras instalaciones. Edificio de dos plantas con accesos cómodos y señalización institucional.',
      image: '/uploads/sede-2.jpg',
      category: 'Exterior',
      order: 2,
    },
    {
      title: 'Entrada principal',
      description: 'Acceso a la sede principal con rampa para personas con movilidad reducida y barredor de seguridad. Atención accesible para toda la comunidad.',
      image: '/uploads/sede-1.jpg',
      category: 'Exterior',
      order: 3,
    },
    {
      title: 'Quirófano',
      description: 'Nuestro moderno quirófano totalmente equipado con tecnología de última generación: bisturí, monitor de signos vitales, desfibrilador, máquina de anestesia y mobiliario quirúrgico de alta calidad para procedimientos seguros.',
      image: '/uploads/quirofano.jpg',
      category: 'Instalaciones',
      order: 4,
    },
  ]
  for (const g of gallery) {
    await db.galleryItem.create({ data: g })
  }
  console.log(`Created ${gallery.length} gallery items with real images`)
  console.log('Done')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
