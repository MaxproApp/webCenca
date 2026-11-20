'use client'

import { useState, useEffect, useCallback } from 'react'
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
import { Marquee } from '@/components/site/Marquee'
import { BackToTop } from '@/components/site/BackToTop'
import { CustomCursor } from '@/components/site/CustomCursor'
import { InstallationsWatermark } from '@/components/site/InstallationsWatermark'
import { SoatSection } from '@/components/site/SoatSection'
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
    // Use allSettled so a single failing endpoint (e.g. a transient SQLite lock
    // in dev) doesn't wipe out settings/gallery/news/testimonials too.
    const results = await Promise.allSettled([
      api.getSettings(),
      api.getServices(),
      api.getGallery(),
      api.getTestimonials(),
      api.getNews(),
    ])
    const [s, sv, g, t, n] = results.map((r) =>
      r.status === 'fulfilled' ? r.value : [],
    ) as [Settings, Service[], GalleryItem[], Testimonial[], NewsItem[]]
    // Settings is an object, not an array — fall back to {} on failure.
    const settingsResult = results[0].status === 'fulfilled' ? (results[0].value as Settings) : {}
    setSettings(settingsResult)
    setServices(sv)
    setGallery(g)
    setTestimonials(t)
    setNews(n)

    // Log only the failures that survived retry, so the page still renders.
    const failed = ['settings', 'services', 'gallery', 'testimonials', 'news'].filter(
      (_, i) => results[i].status === 'rejected',
    )
    if (failed.length) {
      console.warn('Partial data load failure:', failed, results)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Initial data fetch — setState calls inside loadData happen after
    // `await Promise.allSettled`, so they are not synchronous cascading renders.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <CustomCursor />
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
        {/* Marquee de servicios destacados */}
        <Marquee />
        <About
          aboutTitle={settings.aboutTitle}
          aboutContent={settings.aboutContent}
          missionTitle={settings.missionTitle}
          missionContent={settings.missionContent}
          visionTitle={settings.visionTitle}
          visionContent={settings.visionContent}
        />
        {/* Marca de agua animada con las instalaciones */}
        <InstallationsWatermark items={gallery} />
        <Services items={services} />
        <SoatSection settings={settings} />
        {news.length > 0 && <News items={news} />}
        {gallery.length > 0 && <Gallery items={gallery} />}
        {testimonials.length > 0 && <Testimonials items={testimonials} />}
        <Contact settings={settings} services={services} />
      </main>
      <Footer settings={settings} onOpenAdmin={() => setAdminOpen(true)} />

      <FloatingWhatsApp whatsapp={settings.socialWhatsapp || ''} />
      <BackToTop />

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        onChange={loadData}
      />
    </div>
  )
}