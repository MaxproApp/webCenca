/* Seed initial data into the database */
import { db } from "../src/lib/db";

async function hashPassword(p: string): Promise<string> {
  const { default: bcrypt } = await import("bcryptjs");
  const bcryptModule: any = (bcrypt as any).default ?? bcrypt;
  return bcryptModule.hash(p, 10);
}

async function main() {
  // Default admin user
  const password = await hashPassword("admin123");
  await db.user.upsert({
    where: { email: "admin@candelaria.com" },
    update: {},
    create: {
      email: "admin@candelaria.com",
      name: "Administrador CENCA",
      password,
      role: "admin",
    },
  });

  // Site settings (default content)
  const defaultSettings: { key: string; value: string }[] = [
    { key: "brandName", value: "Centro de Especialistas La Candelaria" },
    { key: "brandShortName", value: "CENCA S.A.S." },
    { key: "heroTitle", value: "Cuidamos su salud con especialidad y calidez" },
    { key: "heroSubtitle", value: "Centro médico integral con especialistas de alta calidad, tecnología avanzada y trato humano. Su bienestar es nuestra prioridad." },
    { key: "heroBadge", value: "Más de 9 años cuidando la salud de nuestra comunidad" },
    { key: "aboutTitle", value: "Sobre Nosotros" },
    { key: "aboutContent", value: "El Centro de Especialistas La Candelaria (CENCA S.A.S.) es una institución comprometida con la atención médica integral de alta calidad. Contamos con un equipo de especialistas dedicados, tecnología médica moderna e instalaciones cómodas para brindar la mejor experiencia de atención a nuestros pacientes. Nuestra misión es promover la salud y el bienestar de la comunidad a través de servicios médicos especializados con calidez humana y ética profesional." },
    { key: "missionTitle", value: "Misión" },
    { key: "missionContent", value: "Brindar servicios de salud integral con calidad, calidez humana y oportunidad, mediante personal especializado y tecnología avanzada, contribuyendo al bienestar de la comunidad." },
    { key: "visionTitle", value: "Visión" },
    { key: "visionContent", value: "Ser el centro de especialistas líder en la región, reconocido por la excelencia en la atención médica, la innovación tecnológica y el compromiso con la comunidad." },
    { key: "statsExperience", value: "9" },
    { key: "statsExperienceLabel", value: "Años de experiencia" },
    { key: "statsSpecialists", value: "7" },
    { key: "statsSpecialistsLabel", value: "Especialidades" },
    { key: "statsPatients", value: "12,000+" },
    { key: "statsPatientsLabel", value: "Pacientes atendidos" },
    { key: "statsServices", value: "10" },
    { key: "statsServicesLabel", value: "Servicios médicos" },
    // Sedes
    { key: "sede1Title", value: "Sede 01" },
    { key: "sede1Address", value: "CALLE 4 No 5 - 34, El Banco Magdalena" },
    { key: "sede1Hours", value: "Lunes a Viernes 8:30 AM - 11:00 AM / 2:00 PM - 4:00 PM" },
    { key: "sede2Title", value: "Sede 02" },
    { key: "sede2Address", value: "CALLE 4 No 4 - 27, El Banco Magdalena" },
    { key: "sede2Hours", value: "Lunes a Viernes 8:30 AM - 11:00 AM / 2:00 PM - 4:00 PM" },
    { key: "contactAddress", value: "CALLE 4 No 5 - 34, El Banco, Magdalena, Colombia" },
    { key: "contactPhone", value: "+57 601 234 5678" },
    { key: "contactMobile", value: "+57 310 123 4567" },
    { key: "contactEmail", value: "contacto@candelaria.com" },
    { key: "contactHoursWeekday", value: "Lunes - Viernes: 8:30 AM - 11:00 AM / 2:00 PM - 4:00 PM" },
    { key: "contactHoursSaturday", value: "Sábados: 8:30 AM - 11:00 AM" },
    { key: "contactHoursSunday", value: "Domingos: Cerrado" },
    { key: "socialFacebook", value: "https://facebook.com/cencacandelaria" },
    { key: "socialInstagram", value: "https://instagram.com/cencacandelaria" },
    { key: "socialTwitter", value: "https://twitter.com/cencacandelaria" },
    { key: "socialWhatsapp", value: "+573101234567" },
    { key: "footerText", value: "© 2026 Centro de Especialistas La Candelaria (CENCA S.A.S.). El Banco, Magdalena. Todos los derechos reservados." },
  ];
  for (const s of defaultSettings) {
    const existing = await db.siteSetting.findUnique({ where: { key: s.key } });
    if (!existing) {
      await db.siteSetting.create({ data: s });
    } else {
      // Update to ensure latest values
      await db.siteSetting.update({ where: { key: s.key }, data: { value: s.value } });
    }
  }

  // Default services - especialidades médicas
  const services = [
    { title: "Medicina Interna", description: "Atención médica integral del adulto, diagnóstico y manejo de enfermedades crónicas y complejas.", icon: "stethoscope", order: 1 },
    { title: "Ortopedia", description: "Tratamiento de lesiones óseas, musculares y articulares, cirugía y rehabilitación del sistema musculoesquelético.", icon: "bone", order: 2 },
    { title: "Ginecología", description: "Atención integral de la salud femenina, control prenatal, prevención y tratamiento ginecológico.", icon: "flower", order: 3 },
    { title: "Pediatría", description: "Cuidado especializado para niños y adolescentes, control de crecimiento, vacunación y desarrollo.", icon: "baby", order: 4 },
    { title: "Nutrición", description: "Acompañamiento nutricional personalizado para una vida saludable y manejo de condiciones específicas.", icon: "pill", order: 5 },
    { title: "Psicología", description: "Atención psicológica y acompañamiento emocional para el bienestar mental de pacientes y familias.", icon: "brain", order: 6 },
    { title: "Cirugía General", description: "Procedimientos quirúrgicos generales con tecnología avanzada y equipo médico especializado.", icon: "syringe", order: 7 },
    { title: "Cardiología", description: "Diagnóstico, tratamiento y seguimiento de enfermedades cardiovasculares con tecnología de avanzada.", icon: "heart-pulse", order: 8 },
    { title: "Cirugía Ortopédica", description: "Cirugía especializada del sistema musculoesquelético: fracturas, artroscopia, reemplazos articulares.", icon: "bone", order: 9 },
    { title: "Cirugía Ginecológica", description: "Procedimientos quirúrgicos ginecológicos minimamente invasivos y convencionales con alta tecnología.", icon: "flower", order: 10 },
    { title: "Radiografía", description: "Estudios radiológicos digitales para diagnóstico preciso de lesiones y enfermedades.", icon: "radiography", order: 11 },
    { title: "Ecografía", description: "Estudios ultrasonográficos para diagnóstico por imagen en tiempo real y monitoreo.", icon: "ultrasound", order: 12 },
    { title: "Electrocardiograma", description: "Exámenes de electrocardiografía para evaluar la actividad y salud del corazón.", icon: "electrocardiogram", order: 13 },
    { title: "Consulta de Cirugía", description: "Evaluación, diagnóstico y planificación quirúrgica con nuestro especialista en cirugía general.", icon: "stethoscope", order: 14 },
    { title: "Cirugía Programada", description: "Procedimientos quirúrgicos programados en nuestro quirófano moderno con tecnología de avanzada.", icon: "syringe", order: 15 },
    { title: "Atención SOAT", description: "Atención integral a víctimas de accidentes de tránsito con cobertura SOAT: cirugías de emergencia, hospitalización y rehabilitación.", icon: "activity", order: 16 },
  ];
  // Replace all services
  await db.service.deleteMany({});
  for (const s of services) {
    await db.service.create({ data: s });
  }

  // Default news items
  const defaultNews = [
    { title: "Inauguración de nuestra nueva sede", excerpt: "Estrenamos modernas instalaciones para brindar mejor servicio a nuestra comunidad.", content: "Nos complace anunciar la inauguración de una nueva sede completamente equipada con tecnología médica de vanguardia, diseñada para ofrecer una atención más cómoda y eficiente a todos nuestros pacientes. Esta nueva ubicación cuenta con consultorios amplios, sala de espera cómoda y área de procedimientos especiales.", category: "Noticia", image: null, date: new Date().toISOString().split('T')[0], author: "CENCA S.A.S.", featured: true, order: 1 },
    { title: "Campaña de prevención cardiovascular", excerpt: "Realizamos una jornada gratuita de tamizaje cardiovascular durante el mes del corazón.", content: "Como parte de nuestro compromiso con la salud de la comunidad, durante todo el mes realizamos tamizajes gratuitos de presión arterial, glucemia y electrocardiograma. Atendimos a más de 200 pacientes con orientación médica profesional y recomendaciones personalizadas.", category: "Evento", image: null, date: new Date().toISOString().split('T')[0], author: "CENCA S.A.S.", featured: false, order: 2 },
    { title: "Tips para una alimentación saludable", excerpt: "Nuestro equipo de nutrición comparte recomendaciones prácticas para mejorar tu dieta diaria.", content: "La alimentación balanceada es la base de una vida saludable. Te compartimos 5 tips clave: 1) Aumenta el consumo de frutas y verduras frescas. 2) Reduce el consumo de azúcares añadidos. 3) Mantente hidratado. 4) Evita alimentos ultraprocesados. 5) Realiza al menos 30 minutos de actividad física al día. Consulta con nuestros especialistas para un plan personalizado.", category: "Blog", image: null, date: new Date().toISOString().split('T')[0], author: "Dra. Nutrición", featured: false, order: 3 },
  ];
  await db.newsItem.deleteMany({});
  for (const n of defaultNews) {
    await db.newsItem.create({ data: n });
  }

  // Gallery items
  const gallery = [
    { title: "Recepción", description: "Recepción principal donde brindamos atención al paciente y orientación sobre nuestros servicios.", image: "/uploads/recepcion.jpg", category: "Instalaciones", order: 1 },
    { title: "Sala de Espera de Consultas", description: "Sala de espera cómoda y amplia para pacientes que asisten a consultas externas.", image: "/uploads/sala-espera-consultas.jpg", category: "Instalaciones", order: 2 },
    { title: "Quirófano", description: "Quirófano moderno equipado con tecnología de avanzada para cirugías generales y de emergencia.", image: "/uploads/quirofano-v2.jpg", category: "Instalaciones", order: 3 },
    { title: "Sala de Rayos X", description: "Equipo de rayos X digital para diagnóstico por imagen de alta precisión.", image: "/uploads/rayos-x.jpg", category: "Instalaciones", order: 4 },
    { title: "Farmacia", description: "Farmacia institucional con medicamentos para pacientes hospitalizados y ambulatorios.", image: "/uploads/farmacia.jpg", category: "Instalaciones", order: 5 },
    { title: "Sala de Preparación de Medicamentos", description: "Área aséptica para la preparación y dosificación de medicamentos intrahospitalarios.", image: "/uploads/sala-preparacion-medicamentos.jpg", category: "Instalaciones", order: 6 },
    { title: "Sala de Recuperación 1", description: "Sala de recuperación equipada para el monitoreo postoperatorio de nuestros pacientes.", image: "/uploads/recuperacion-1.jpg", category: "Instalaciones", order: 7 },
    { title: "Sala de Recuperación 2", description: "Espacio de recuperación con comodidad y atención médica permanente.", image: "/uploads/recuperacion-2.jpg", category: "Instalaciones", order: 8 },
    { title: "Sala de Recuperación 3", description: "Tercera sala de recuperación para el postoperatorio y cuidado del paciente.", image: "/uploads/recuperacion-3.jpg", category: "Instalaciones", order: 9 },
    { title: "Sala de Recuperación", description: "Sala principal de recuperación postoperatoria con monitoreo continuo.", image: "/uploads/sala-recuperacion.jpg", category: "Instalaciones", order: 10 },
  ];
  await db.galleryItem.deleteMany({});
  for (const g of gallery) {
    await db.galleryItem.create({ data: g });
  }

  // Default testimonials
  await db.testimonial.deleteMany({});
  const testimonials = [
    { name: "Laura Martínez", role: "Paciente", content: "Excelente atención, el personal muy amable y profesional. Los médicos explican con claridad el diagnóstico. Recomendado totalmente.", rating: 5, order: 1 },
    { name: "Carlos Pérez", role: "Paciente", content: "Instalaciones limpias y modernas. La atención fue rápida y eficaz. Los especialistas son de primer nivel.", rating: 5, order: 2 },
    { name: "Sofía Gómez", role: "Familiar", content: "Llevo a mi madre desde hace años y siempre nos atienden con cariño. Centro médico confiable.", rating: 5, order: 3 },
  ];
  for (const t of testimonials) {
    await db.testimonial.create({ data: t });
  }

  // Initialize visit counter
  await db.visit.deleteMany({});
  await db.visit.create({ data: { count: 1247 } });

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
