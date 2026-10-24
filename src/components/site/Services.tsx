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

export function Services({ items }: { items: Service[] }) {
  return (
    <section id="servicios" className="relative py-20 lg:py-28 bg-gradient-soft">
      {/* Soft radial background */}
      <div className="absolute inset-0 bg-gradient-blue-radial pointer-events-none" />

      {/* Floating decorations */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            Nuestros servicios
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Atención médica especializada
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              className="h-[3px] bg-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
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
            return (
              <motion.article
                key={s.id}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 250, damping: 15 } }}
                className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-900/10"
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
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md"
                    whileHover={{ rotate: 10, scale: 1.12 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  >
                    <Icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    <span>Más información</span>
                    <motion.span
                      className="transition-transform"
                      whileHover={{ x: 4 }}
                    >→</motion.span>
                  </div>
                </div>
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
