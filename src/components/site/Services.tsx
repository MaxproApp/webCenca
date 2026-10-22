'use client'

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
  type LucideIcon,
} from 'lucide-react'
import type { Service } from '@/lib/api-client'

const ICON_MAP: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
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
}

export function Services({ items }: { items: Service[] }) {
  return (
    <section id="servicios" className="relative py-20 lg:py-28 bg-gradient-soft">
      {/* Soft radial background */}
      <div className="absolute inset-0 bg-gradient-blue-radial pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            Nuestros servicios
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Atención médica especializada
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-12 bg-primary rounded-full" />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ofrecemos una amplia gama de servicios médicos con especialistas certificados, tecnología moderna
            y trato humano excepcional.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((s, i) => {
            const Icon = ICON_MAP[s.icon || 'stethoscope'] || Stethoscope
            return (
              <article
                key={s.id}
                className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1.5 animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Image if present */}
                {s.image && (
                  <div className="absolute inset-0">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-20 transition-opacity group-hover:opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/70" />
                  </div>
                )}
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    <span>Más información</span>
                    <span className="transition-transform">→</span>
                  </div>
                </div>
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </article>
            )
          })}
          {items.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No hay servicios disponibles.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
