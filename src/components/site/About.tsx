'use client'

import { Target, Eye, Heart } from 'lucide-react'

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            Conózcanos
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {aboutTitle}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-12 bg-primary rounded-full" />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">{aboutContent}</p>
        </div>

        {/* Mission / Vision cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 transition-all hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">{missionTitle}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{missionContent}</p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-cyan-50 to-white p-8 transition-all hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-md">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">{visionTitle}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{visionContent}</p>
            </div>
          </article>
        </div>

        {/* Values strip */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-muted/40 border border-border/60">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
