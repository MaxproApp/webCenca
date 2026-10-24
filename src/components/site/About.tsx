'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'

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
    <section id="nosotros" className="relative py-20 lg:py-28 bg-white">
      {/* Soft animated decorative blob */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            Conózcanos
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {aboutTitle}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              className="h-[3px] w-12 bg-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">{aboutContent}</p>
        </motion.div>

        {/* Mission / Vision cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.article
            variants={item}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              >
                <Target className="h-7 w-7" />
              </motion.div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">{missionTitle}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{missionContent}</p>
            </div>
          </motion.article>

          <motion.article
            variants={item}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-cyan-50 to-white p-8 shadow-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-md"
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              >
                <Eye className="h-7 w-7" />
              </motion.div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">{visionTitle}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{visionContent}</p>
            </div>
          </motion.article>
        </div>

        {/* Values strip */}
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
            },
            {
              icon: Target,
              title: 'Profesionalismo',
              text: 'Equipo médico altamente capacitado y en constante actualización.',
            },
            {
              icon: Eye,
              title: 'Transparencia',
              text: 'Información clara y honesta en cada paso del proceso asistencial.',
            },
          ].map((v, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-muted/40 border border-border/60"
            >
              <motion.div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                whileHover={{ rotate: 8, scale: 1.1 }}
              >
                <v.icon className="h-5 w-5" />
              </motion.div>
              <div>
                <h4 className="font-semibold text-foreground">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
