'use client'

import { Clock, UserCircle2 } from 'lucide-react'
import type { Doctor } from '@/lib/api-client'

export function Doctors({ items }: { items: Doctor[] }) {
  return (
    <section id="especialistas" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            Nuestro equipo
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Especialistas a su servicio
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-12 bg-primary rounded-full" />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Contamos con un equipo multidisciplinario de médicos especialistas comprometidos con su salud y bienestar.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((d, i) => (
            <article
              key={d.id}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1.5 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Photo / avatar */}
              <div className="relative h-64 overflow-hidden">
                {d.image ? (
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-cyan-100 flex items-center justify-center">
                    <UserCircle2 className="h-24 w-24 text-primary/40" strokeWidth={1.2} />
                  </div>
                )}
                {/* Specialty badge */}
                <div className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur text-primary text-xs font-semibold shadow-sm">
                  {d.specialty}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground">{d.name}</h3>
                {d.bio && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{d.bio}</p>}
                {d.schedule && (
                  <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-2.5">
                    <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium">{d.schedule}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No hay especialistas disponibles.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
