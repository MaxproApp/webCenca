'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/lib/api-client'

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items || items.length === 0) return null

  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Soft animated decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
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
            Testimonios
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Lo que dicen nuestros pacientes
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
          {items.map((t, i) => (
            <motion.article
              key={t.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 250, damping: 15 } }}
              className="relative rounded-3xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <motion.div
                className="absolute top-6 right-6 text-primary/15"
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
                  <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-cyan-600 text-white flex items-center justify-center font-bold text-base shadow-md">
                    {t.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
