'use client'

import { Calendar, Phone, ShieldCheck, Stethoscope, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero({
  heroBadge,
  heroTitle,
  heroSubtitle,
  phone,
  statsExperience,
  statsExperienceLabel,
  statsSpecialists,
  statsSpecialistsLabel,
  statsPatients,
  statsPatientsLabel,
  statsServices,
  statsServicesLabel,
}: any) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-hero">
      {/* Decorative blur shapes */}
      <div className="blur-shape bg-blue-400" style={{ width: 480, height: 480, top: -120, right: -80 }} />
      <div className="blur-shape bg-blue-200" style={{ width: 380, height: 380, bottom: -120, left: -60 }} />
      <div className="blur-shape bg-cyan-200" style={{ width: 280, height: 280, top: '40%', right: '30%' }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 text-white animate-fade-in-up">
            {heroBadge && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 mb-6 border border-white/15">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                <span className="text-xs sm:text-sm font-medium text-blue-50">{heroBadge}</span>
              </div>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight">
              {heroTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-blue-50/90 max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 shadow-lg shadow-blue-900/30">
                <a href="#contacto" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Agende su cita
                </a>
              </Button>
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
            </div>

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {[
                { icon: Award, label: 'Calidad', value: 'Premium' },
                { icon: Stethoscope, label: 'Especialistas', value: 'Certificados' },
                { icon: ShieldCheck, label: 'Seguridad', value: 'Garantizada' },
                { icon: Calendar, label: 'Atención', value: 'Puntual' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/10">
                    <t.icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-wide text-blue-50/70">{t.label}</span>
                    <span className="text-sm font-semibold text-white">{t.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - logo card */}
          <div className="lg:col-span-5 flex justify-center animate-fade-in-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-white/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="/logo-candelaria.jpg"
                    alt="CENCA S.A.S."
                    className="h-40 w-40 rounded-full ring-4 ring-blue-100 shadow-lg object-cover"
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
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: statsExperience, label: statsExperienceLabel },
            { value: statsSpecialists, label: statsSpecialistsLabel },
            { value: statsPatients, label: statsPatientsLabel },
            { value: statsServices, label: statsServicesLabel },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center px-4 py-6 rounded-2xl bg-white/10 backdrop-blur border border-white/15"
            >
              <div className="text-3xl sm:text-4xl font-bold font-serif text-white">{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm uppercase tracking-wide text-blue-50/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

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
