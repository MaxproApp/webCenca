'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/lib/api-client'

const CARD_PALETTES = [
  { gradient: 'from-amber-50 to-orange-100/50', border: 'border-amber-200/60', quote: 'text-amber-200', shadow: 'hover:shadow-amber-200/40' },
  { gradient: 'from-sky-50 to-blue-100/50', border: 'border-sky-200/60', quote: 'text-sky-200', shadow: 'hover:shadow-sky-200/40' },
  { gradient: 'from-emerald-50 to-teal-100/50', border: 'border-emerald-200/60', quote: 'text-emerald-200', shadow: 'hover:shadow-emerald-200/40' },
  { gradient: 'from-rose-50 to-pink-100/50', border: 'border-rose-200/60', quote: 'text-rose-200', shadow: 'hover:shadow-rose-200/40' },
  { gradient: 'from-purple-50 to-fuchsia-100/50', border: 'border-purple-200/60', quote: 'text-purple-200', shadow: 'hover:shadow-purple-200/40' },
  { gradient: 'from-lime-50 to-green-100/50', border: 'border-lime-200/60', quote: 'text-lime-200', shadow: 'hover:shadow-lime-200/40' },
]

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items || items.length === 0) return null

  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-gradient-to-b from-white via-purple-50/30 to-white relative overflow-hidden">
      {/* Colorful animated decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-semibold uppercase tracking-[0.18em] border border-amber-200/50">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> Testimonios
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Lo que dicen nuestros pacientes
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              className="h-[3px] bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            La satisfacción de nuestros pacientes es nuestra mejor recompensa. Conozca sus experiencias.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {items.map((t, i) => {
            const palette = CARD_PALETTES[i % CARD_PALETTES.length]
            return (
              <motion.article
                key={t.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 250, damping: 15 } }}
                className={`relative rounded-3xl bg-gradient-to-b ${palette.gradient} border ${palette.border} p-6 shadow-sm transition-shadow hover:shadow-lg ${palette.shadow}`}
              >
                <motion.div
                  className={`absolute top-6 right-6 ${palette.quote}`}
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  <Quote className="h-10 w-10" />
                </motion.div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.08, type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Star
                        className={`h-4 w-4 ${idx < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                      />
                    </motion.span>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed italic">"{t.content}"</p>
                <div className="mt-6 flex items-center gap-3">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md" />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-base shadow-md">
                      {t.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
