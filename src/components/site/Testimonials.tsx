'use client'

import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/lib/api-client'

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items || items.length === 0) return null

  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            Testimonios
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Lo que dicen nuestros pacientes
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-12 bg-primary rounded-full" />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            La satisfacción de nuestros pacientes es nuestra mejor recompensa. Conozca sus experiencias.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <article
              key={t.id}
              className="relative rounded-3xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-blue-900/5 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/15" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${idx < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                  />
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
