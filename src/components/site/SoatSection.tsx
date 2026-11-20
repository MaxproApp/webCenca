'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  HeartPulse,
  Activity,
  Stethoscope,
  FileText,
  Phone,
  ArrowRight,
  Siren,
  Car,
  Building,
  UserCheck,
} from 'lucide-react'

interface Props {
  settings: any
}

const COVERAGE_ITEMS = [
  {
    icon: HeartPulse,
    title: 'Cirugías de emergencia',
    text: 'Procedimientos quirúrgicos urgentes por accidentes de tránsito.',
    gradient: 'from-rose-100 to-pink-100/60',
    border: 'border-rose-200/60',
    iconBg: 'bg-gradient-to-br from-rose-400 to-pink-500',
    titleColor: 'text-rose-700',
  },
  {
    icon: Activity,
    title: 'Imágenes diagnósticas',
    text: 'Radiografías, ecografías y estudios necesarios para diagnóstico.',
    gradient: 'from-sky-100 to-blue-100/60',
    border: 'border-sky-200/60',
    iconBg: 'bg-gradient-to-br from-sky-400 to-blue-500',
    titleColor: 'text-sky-700',
  },
  {
    icon: Stethoscope,
    title: 'Hospitalización',
    text: 'Hospitalización necesaria según la gravedad del paciente.',
    gradient: 'from-purple-100 to-fuchsia-100/60',
    border: 'border-purple-200/60',
    iconBg: 'bg-gradient-to-br from-purple-400 to-fuchsia-500',
    titleColor: 'text-purple-700',
  },
]

const STEPS = [
  {
    icon: Car,
    title: 'Reporte del accidente',
    text: 'Comunique el accidente de tránsito a las autoridades y a la aseguradora.',
  },
  {
    icon: Building,
    title: 'Acuda a nuestra sede',
    text: 'Diríjase a nuestras instalaciones para recibir atención inmediata.',
  },
  {
    icon: FileText,
    title: 'Presente documentos',
    text: 'Documento de identidad, SOAT del vehículo y reporte del accidente.',
  },
  {
    icon: UserCheck,
    title: 'Reciba atención',
    text: 'Nuestro equipo médico le brindará la atención quirúrgica necesaria.',
  },
]

export function SoatSection({ settings }: Props) {
  const emergencyPhone = settings.soatEmergencyPhone || settings.contactPhone || ''
  const emergencyWhatsapp = settings.socialWhatsapp || ''
  const waHref = emergencyWhatsapp
    ? `https://wa.me/${emergencyWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, necesito atención SOAT por accidente de tránsito')}`
    : '#'

  return (
    <section id="soat" className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden">
      {/* Decorative animated blobs */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-red-200/30 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-semibold uppercase tracking-[0.18em] border border-amber-200/50">
            <Shield className="h-3.5 w-3.5" /> Atención SOAT
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Atención a pacientes SOAT
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              className="h-[3px] bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Brindamos atención médica integral a víctimas de accidentes de tránsito con cobertura SOAT.
            Nuestro equipo está preparado para atender emergencias y realizar cirugías de urgencia con la calidad
            y el profesionalismo que usted merece.
          </p>
        </motion.div>

        {/* Emergency banner */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 p-6 sm:p-8 shadow-xl"
        >
          {/* Animated stripe background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 20px, transparent 20px, transparent 40px)',
            }}
            animate={{ x: [0, -28.28] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex flex-col sm:flex-row items-center gap-5 sm:gap-8 justify-between">
            <div className="flex items-center gap-4 text-white text-center sm:text-left">
              <motion.div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur border border-white/30"
                animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Siren className="h-7 w-7" />
              </motion.div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-rose-100">Emergencias SOAT 24/7</div>
                <div className="font-serif text-xl sm:text-2xl font-bold">Atención inmediata</div>
                <p className="text-sm text-rose-50/90 mt-1">Comuníquese ahora mismo con nosotros</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              {emergencyPhone && (
                <motion.a
                  href={`tel:${emergencyPhone}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-rose-600 font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Phone className="h-5 w-5" />
                  <span className="text-sm sm:text-base">Llamar: {emergencyPhone}</span>
                </motion.a>
              )}
              <motion.a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="text-sm sm:text-base">WhatsApp</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Coverage grid */}
        <div className="mt-16">
          <motion.h3
            className="text-center font-serif text-2xl sm:text-3xl font-bold text-foreground mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ¿Qué cubre la atención SOAT?
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {COVERAGE_ITEMS.map((c, i) => (
              <motion.article
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 250, damping: 15 } }}
                className={`group relative overflow-hidden rounded-3xl border ${c.border} bg-gradient-to-br ${c.gradient} p-6 shadow-sm transition-shadow hover:shadow-xl`}
              >
                <div className="relative">
                  <motion.div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.iconBg} text-white shadow-md`}
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  >
                    <c.icon className="h-7 w-7" />
                  </motion.div>
                  <h4 className={`mt-5 font-serif text-xl font-bold ${c.titleColor}`}>{c.title}</h4>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{c.text}</p>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Steps timeline */}
        <div className="mt-16">
          <motion.h3
            className="text-center font-serif text-2xl sm:text-3xl font-bold text-foreground mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pasos a seguir
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="relative p-5 rounded-2xl bg-white border border-amber-200/50 shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-sm shadow-md">
                  {i + 1}
                </div>
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 mb-3 mt-2"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                >
                  <s.icon className="h-5 w-5" />
                </motion.div>
                <h4 className="font-serif font-bold text-foreground">{s.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
