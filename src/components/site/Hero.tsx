'use client'

import { motion } from 'framer-motion'
import { Phone, ShieldCheck, Stethoscope, Award, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedCounter } from './AnimatedCounter'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export function Hero({
  heroBadge,
  heroTitle,
  heroSubtitle,
  phone,
  whatsapp,
  statsExperience,
  statsExperienceLabel,
  statsSpecialists,
  statsSpecialistsLabel,
  statsPatients,
  statsPatientsLabel,
  statsServices,
  statsServicesLabel,
}: any) {
  const waHref = `https://wa.me/${(whatsapp || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, quiero agendar una cita en CENCA S.A.S.')}`
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-hero">
      {/* Animated decorative blur shapes */}
      <motion.div
        className="blur-shape bg-blue-400"
        style={{ width: 480, height: 480, top: -120, right: -80 }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blur-shape bg-blue-200"
        style={{ width: 380, height: 380, bottom: -120, left: -60 }}
        animate={{ x: [0, -25, 0], y: [0, -15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blur-shape bg-cyan-200"
        style={{ width: 280, height: 280, top: '40%', right: '30%' }}
        animate={{ y: [0, 30, 0], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 text-white">
            {heroBadge && (
              <motion.div
                variants={item}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 mb-6 border border-white/15"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                </motion.span>
                <span className="text-xs sm:text-sm font-medium text-blue-50">{heroBadge}</span>
              </motion.div>
            )}
            <motion.h1
              variants={item}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight"
            >
              {heroTitle}
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 text-base sm:text-lg lg:text-xl text-blue-50/90 max-w-2xl leading-relaxed"
            >
              {heroSubtitle}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-900/30">
                  <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Agende su cita
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                >
                  <a href={`tel:${phone}`} className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Llámenos
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={item}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
            >
              {[
                { icon: Award, label: 'Calidad', value: 'Premium' },
                { icon: Stethoscope, label: 'Especialidades', value: 'Médicas' },
                { icon: ShieldCheck, label: 'Seguridad', value: 'Garantizada' },
                { icon: MessageCircle, label: 'Citas', value: 'Por WhatsApp' },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center gap-2.5"
                >
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/10"
                    whileHover={{ rotate: 8, scale: 1.1 }}
                  >
                    <t.icon className="h-5 w-5 text-cyan-300" />
                  </motion.div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-wide text-blue-50/70">{t.label}</span>
                    <span className="text-sm font-semibold text-white">{t.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - logo card */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-white/20 to-transparent rounded-3xl blur-2xl"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
                <div className="flex flex-col items-center text-center">
                  <motion.img
                    src="/logo-candelaria.jpg"
                    alt="CENCA S.A.S."
                    className="h-40 w-40 rounded-full ring-4 ring-blue-100 shadow-lg object-cover"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <h2 className="mt-6 font-serif text-2xl font-bold text-primary">CENCA S.A.S.</h2>
                  <p className="mt-1 text-sm text-muted-foreground uppercase tracking-[0.18em]">
                    Centro de Especialistas
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">La Candelaria</p>
                  <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <p className="mt-4 text-xs text-muted-foreground italic">
                    "Su salud es nuestra prioridad"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {[
            { value: statsExperience, label: statsExperienceLabel },
            { value: statsSpecialists, label: statsSpecialistsLabel },
            { value: statsPatients, label: statsPatientsLabel },
            { value: statsServices, label: statsServicesLabel },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
              className="text-center px-4 py-6 rounded-2xl bg-white/10 backdrop-blur border border-white/15"
            >
              <motion.div
                className="text-3xl sm:text-4xl font-bold font-serif text-white tabular-nums"
                whileInView={{ scale: [0.8, 1.1, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <AnimatedCounter value={s.value} />
              </motion.div>
              <div className="mt-1 text-xs sm:text-sm uppercase tracking-wide text-blue-50/80">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Wave divider */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 80"
          className="block w-full h-[40px] sm:h-[60px]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M0 40 Q 360 80 720 40 T 1440 40 V80 H0 Z"
          />
        </svg>
      </div>
    </section>
  )
}
