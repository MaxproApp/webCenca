'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Sparkles, Award, Users } from 'lucide-react'
import { Particles } from './Particles'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export function About({
  aboutTitle,
  aboutContent,
  missionTitle,
  missionContent,
  visionTitle,
  visionContent,
}: any) {
  return (
    <section id="nosotros" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <Particles count={8} opacity={0.4} />
      {/* Animated colorful decorations */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-64 h-64 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {/* Heading */}
        <motion.div className="text-center max-w-3xl mx-auto" variants={item}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold uppercase tracking-[0.18em] border border-purple-200/50">
            <Sparkles className="h-3.5 w-3.5" /> Conózcanos
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {aboutTitle}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              className="h-[3px] bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">{aboutContent}</p>
        </motion.div>

        {/* Mission / Vision cards - colorful pastels */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Misión - Rose pastel */}
          <motion.article
            variants={item}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="group relative overflow-hidden rounded-3xl border border-rose-200/60 bg-gradient-to-br from-rose-50 via-rose-100/50 to-white p-8 shadow-sm hover:shadow-xl hover:shadow-rose-200/40"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-md"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              >
                <Target className="h-7 w-7" />
              </motion.div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-rose-700">{missionTitle}</h3>
              <p className="mt-3 text-foreground/80 leading-relaxed">{missionContent}</p>
            </div>
          </motion.article>

          {/* Visión - Emerald pastel */}
          <motion.article
            variants={item}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="group relative overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-white p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-200/40"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md"
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              >
                <Eye className="h-7 w-7" />
              </motion.div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-emerald-700">{visionTitle}</h3>
              <p className="mt-3 text-foreground/80 leading-relaxed">{visionContent}</p>
            </div>
          </motion.article>
        </div>

        {/* Values strip - colorful cards */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            {
              icon: Heart,
              title: 'Calidez humana',
              text: 'Tratamos a cada paciente como a un familiar, con empatía y respeto.',
              gradient: 'from-pink-50 to-rose-100/50',
              border: 'border-pink-200/60',
              iconBg: 'bg-pink-100 text-pink-600',
              titleColor: 'text-pink-700',
            },
            {
              icon: Award,
              title: 'Profesionalismo',
              text: 'Equipo médico altamente capacitado y en constante actualización.',
              gradient: 'from-amber-50 to-orange-100/50',
              border: 'border-amber-200/60',
              iconBg: 'bg-amber-100 text-amber-600',
              titleColor: 'text-amber-700',
            },
            {
              icon: Users,
              title: 'Transparencia',
              text: 'Información clara y honesta en cada paso del proceso asistencial.',
              gradient: 'from-sky-50 to-blue-100/50',
              border: 'border-sky-200/60',
              iconBg: 'bg-sky-100 text-sky-600',
              titleColor: 'text-sky-700',
            },
          ].map((v, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4 }}
              className={`flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-br ${v.gradient} border ${v.border}`}
            >
              <motion.div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${v.iconBg}`}
                whileHover={{ rotate: 8, scale: 1.1 }}
              >
                <v.icon className="h-5 w-5" />
              </motion.div>
              <div>
                <h4 className={`font-semibold ${v.titleColor}`}>{v.title}</h4>
                <p className="text-sm text-foreground/70">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
