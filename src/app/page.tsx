'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Header } from '@/components/site/Header'
import { Hero } from '@/components/site/Hero'
import { About } from '@/components/site/About'
import { Services } from '@/components/site/Services'
import { Gallery } from '@/components/site/Gallery'
import { Testimonials } from '@/components/site/Testimonials'
import { Contact } from '@/components/site/Contact'
import { Footer } from '@/components/site/Footer'
import { FloatingWhatsApp } from '@/components/site/FloatingWhatsApp'
import { News } from '@/components/site/News'
import { AdminPanel } from '@/components/admin/AdminPanel'
import { api, type Settings, type Service, type GalleryItem, type Testimonial, type NewsItem } from '@/lib/api-client'

export default function Home() {
  const [settings, setSettings] = useState<Settings>({})
  const [services, setServices] = useState<Service[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [adminOpen, setAdminOpen] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const [s, sv, g, t, n] = await Promise.all([
        api.getSettings(),
        api.getServices(),
        api.getGallery(),
        api.getTestimonials(),
        api.getNews(),
      ])
      setSettings(s)
      setServices(sv)
      setGallery(g)
      setTestimonials(t)
      setNews(n)
    } catch (e) {
      console.error('Failed to load data:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-primary/15 border-t-primary animate-spin" />
          <img
            src="/logo-candelaria.jpg"
            alt="CENCA"
            className="absolute inset-2 h-16 w-16 rounded-full object-cover"
          />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Cargando centro de salud...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        brandName={settings.brandName || 'CENCA S.A.S.'}
        phone={settings.contactPhone || ''}
        whatsapp={settings.socialWhatsapp || ''}
      />
      <main className="flex-1">
        <Hero
          heroBadge={settings.heroBadge}
          heroTitle={settings.heroTitle}
          heroSubtitle={settings.heroSubtitle}
          phone={settings.contactPhone}
          whatsapp={settings.socialWhatsapp}
          statsExperience={settings.statsExperience}
          statsExperienceLabel={settings.statsExperienceLabel}
          statsSpecialists={settings.statsSpecialists}
          statsSpecialistsLabel={settings.statsSpecialistsLabel}
          statsPatients={settings.statsPatients}
          statsPatientsLabel={settings.statsPatientsLabel}
          statsServices={settings.statsServices}
          statsServicesLabel={settings.statsServicesLabel}
        />
        <About
          aboutTitle={settings.aboutTitle}
          aboutContent={settings.aboutContent}
          missionTitle={settings.missionTitle}
          missionContent={settings.missionContent}
          visionTitle={settings.visionTitle}
          visionContent={settings.visionContent}
        />
        <Services items={services} />
        {news.length > 0 && <News items={news} />}
        {gallery.length > 0 && <Gallery items={gallery} />}
        {testimonials.length > 0 && <Testimonials items={testimonials} />}
        <Contact settings={settings} services={services} />
      </main>
      <Footer settings={settings} onOpenAdmin={() => setAdminOpen(true)} />

      <FloatingWhatsApp whatsapp={settings.socialWhatsapp || ''} />

      <AnimatePresence>
        <AdminPanel
          open={adminOpen}
          onClose={() => setAdminOpen(false)}
          onChange={loadData}
        />
      </AnimatePresence>
    </div>
  )
}
