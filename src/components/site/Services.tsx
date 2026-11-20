'use client'

import { motion } from 'framer-motion'
import {
  Stethoscope,
  HeartPulse,
  Baby,
  Flower,
  Bone,
  Hand,
  Eye,
  Smile,
  Activity,
  Brain,
  Syringe,
  Pill,
  ScanLine,
  Waves,
  Activity as Activity2,
  type LucideIcon,
} from 'lucide-react'
import type { Service } from '@/lib/api-client'

const ICON_MAP: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  'stethoscope-2': Stethoscope,
  'heart-pulse': HeartPulse,
  'heart_pulse': HeartPulse,
  heart: HeartPulse,
  baby: Baby,
  flower: Flower,
  bone: Bone,
  hand: Hand,
  eye: Eye,
  smile: Smile,
  activity: Activity,
  brain: Brain,
  syringe: Syringe,
  pill: Pill,
  radiography: ScanLine,
  radiografia: ScanLine,
  ultrasound: Waves,
  ecografia: Waves,
  electrocardiogram: Activity2,
  electrocardiograma: Activity2,
}

// Pastel color palette - rotated across service cards
const PASTEL_PALETTE = [
  {
    name: 'rose',
    bg: 'bg-rose-50',
    bgGradient: 'from-rose-100/80 via-rose-50 to-white',
    iconBg: 'bg-rose-500',
    iconText: 'text-white',
    accent: 'text-rose-600',
    border: 'border-rose-200/60',
    hoverShadow: 'hover:shadow-rose-200/60',
    corner: 'bg-rose-200/30',
  },
  {
    name: 'amber',
    bg: 'bg-amber-50',
    bgGradient: 'from-amber-100/80 via-amber-50 to-white',
    iconBg: 'bg-amber-500',
    iconText: 'text-white',
    accent: 'text-amber-600',
    border: 'border-amber-200/60',
    hoverShadow: 'hover:shadow-amber-200/60',
    corner: 'bg-amber-200/30',
  },
  {
    name: 'emerald',
    bg: 'bg-emerald-50',
    bgGradient: 'from-emerald-100/80 via-emerald-50 to-white',
    iconBg: 'bg-emerald-500',
    iconText: 'text-white',
    accent: 'text-emerald-600',
    border: 'border-emerald-200/60',
    hoverShadow: 'hover:shadow-emerald-200/60',
    corner: 'bg-emerald-200/30',
  },
  {
    name: 'sky',
    bg: 'bg-sky-50',
    bgGradient: 'from-sky-100/80 via-sky-50 to-white',
    iconBg: 'bg-sky-500',
    iconText: 'text-white',
    accent: 'text-sky-600',
    border: 'border-sky-200/60',
    hoverShadow: 'hover:shadow-sky-200/60',
    corner: 'bg-sky-200/30',
  },
  {
    name: 'purple',
    bg: 'bg-purple-50',
    bgGradient: 'from-purple-100/80 via-purple-50 to-white',
    iconBg: 'bg-purple-500',
    iconText: 'text-white',
    accent: 'text-purple-600',
    border: 'border-purple-200/60',
    hoverShadow: 'hover:shadow-purple-200/60',
    corner: 'bg-purple-200/30',
  },
  {
    name: 'orange',
    bg: 'bg-orange-50',
    bgGradient: 'from-orange-100/80 via-orange-50 to-white',
    iconBg: 'bg-orange-500',
    iconText: 'text-white',
    accent: 'text-orange-600',
    border: 'border-orange-200/60',
    hoverShadow: 'hover:shadow-orange-200/60',
    corner: 'bg-orange-200/30',
  },
  {
    name: 'teal',
    bg: 'bg-teal-50',
    bgGradient: 'from-teal-100/80 via-teal-50 to-white',
    iconBg: 'bg-teal-500',
    iconText: 'text-white',
    accent: 'text-teal-600',
    border: 'border-teal-200/60',
    hoverShadow: 'hover:shadow-teal-200/60',
    corner: 'bg-teal-200/30',
  },
  {
    name: 'fuchsia',
    bg: 'bg-fuchsia-50',
    bgGradient: 'from-fuchsia-100/80 via-fuchsia-50 to-white',
    iconBg: 'bg-fuchsia-500',
    iconText: 'text-white',
    accent: 'text-fuchsia-600',
    border: 'border-fuchsia-200/60',
    hoverShadow: 'hover:shadow-fuchsia-200/60',
    corner: 'bg-fuchsia-200/30',
  },
  {
    name: 'indigo',
    bg: 'bg-indigo-50',
    bgGradient: 'from-indigo-100/80 via-indigo-50 to-white',
    iconBg: 'bg-indigo-500',
    iconText: 'text-white',
    accent: 'text-indigo-600',
    border: 'border-indigo-200/60',
    hoverShadow: 'hover:shadow-indigo-200/60',
    corner: 'bg-indigo-200/30',
  },
  {
    name: 'lime',
    bg: 'bg-lime-50',
    bgGradient: 'from-lime-100/80 via-lime-50 to-white',
    iconBg: 'bg-lime-500',
    iconText: 'text-white',
    accent: 'text-lime-600',
    border: 'border-lime-200/60',
    hoverShadow: 'hover:shadow-lime-200/60',
    corner: 'bg-lime-200/30',
  },
  {
    name: 'cyan',
    bg: 'bg-cyan-50',
    bgGradient: 'from-cyan-100/80 via-cyan-50 to-white',
    iconBg: 'bg-cyan-500',
    iconText: 'text-white',
    accent: 'text-cyan-600',
    border: 'border-cyan-200/60',
    hoverShadow: 'hover:shadow-cyan-200/60',
    corner: 'bg-cyan-200/30',
  },
  {
    name: 'pink',
    bg: 'bg-pink-50',
    bgGradient: 'from-pink-100/80 via-pink-50 to-white',
    iconBg: 'bg-pink-500',
    iconText: 'text-white',
    accent: 'text-pink-600',
    border: 'border-pink-200/60',
    hoverShadow: 'hover:shadow-pink-200/60',
    corner: 'bg-pink-200/30',
  },
]

export function Services({ items }: { items: Service[] }) {
  return (
    <section id="servicios" className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Floating decorations - colorful */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold uppercase tracking-[0.18em] border border-blue-200/50">
            Nuestros servicios
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Atención médica especializada
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              className="h-[3px] bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ofrecemos una amplia gama de especialidades médicas y servicios complementarios
            con especialistas certificados, tecnología moderna y trato humano excepcional.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((s, i) => {
            const Icon = ICON_MAP[s.icon || 'stethoscope'] || Stethoscope
            const palette = PASTEL_PALETTE[i % PASTEL_PALETTE.length]
            return (
              <motion.article
                key={s.id}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 250, damping: 15 } }}
                className={`group relative overflow-hidden rounded-3xl border ${palette.border} bg-gradient-to-br ${palette.bgGradient} p-6 shadow-sm transition-shadow hover:shadow-xl ${palette.hoverShadow}`}
              >
                {/* Image if present */}
                {s.image && (
                  <div className="absolute inset-0">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-20 transition-opacity group-hover:opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/70" />
                  </div>
                )}
                <div className="relative">
                  <motion.div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${palette.iconBg} ${palette.iconText} shadow-md`}
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  >
                    <Icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className={`mt-5 font-serif text-xl font-bold ${palette.accent}`}>{s.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.description}</p>
                  <div className={`mt-4 inline-flex items-center gap-1 text-xs font-medium ${palette.accent} group-hover:gap-2 transition-all`}>
                    <span>Más información</span>
                    <motion.span
                      className="transition-transform"
                      whileHover={{ x: 4 }}
                    >→</motion.span>
                  </div>
                </div>
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 ${palette.corner} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity`} />
              </motion.article>
            )
          })}
          {items.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No hay servicios disponibles.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
