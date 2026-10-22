'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X, LogOut, Settings, Stethoscope, UserCircle2, Images, Star, CalendarCheck, LayoutDashboard } from 'lucide-react'
import { clearAdminToken, getAdminToken } from '@/lib/api-client'
import { AdminLogin } from './AdminLogin'
import { SettingsEditor } from './SettingsEditor'
import { ServicesManager } from './ServicesManager'
import { DoctorsManager } from './DoctorsManager'
import { GalleryManager } from './GalleryManager'
import { TestimonialsManager } from './TestimonialsManager'
import { AppointmentsManager } from './AppointmentsManager'

type TabKey = 'dashboard' | 'settings' | 'services' | 'doctors' | 'gallery' | 'testimonials' | 'appointments'

const TABS: { key: TabKey; label: string; icon: any; description: string }[] = [
  { key: 'dashboard', label: 'Inicio', icon: LayoutDashboard, description: 'Resumen del panel' },
  { key: 'appointments', label: 'Citas', icon: CalendarCheck, description: 'Solicitudes de citas recibidas' },
  { key: 'settings', label: 'Contenido', icon: Settings, description: 'Editar textos, datos y ajustes' },
  { key: 'services', label: 'Servicios', icon: Stethoscope, description: 'Administrar servicios médicos' },
  { key: 'doctors', label: 'Especialistas', icon: UserCircle2, description: 'Administrar equipo médico' },
  { key: 'gallery', label: 'Galería', icon: Images, description: 'Administrar imágenes' },
  { key: 'testimonials', label: 'Testimonios', icon: Star, description: 'Administrar testimonios' },
]

interface Props {
  open: boolean
  onClose: () => void
  onChange: () => void
}

export function AdminPanel({ open, onClose, onChange }: Props) {
  const [authed, setAuthed] = useState<boolean>(() => !!getAdminToken())
  const [tab, setTab] = useState<TabKey>('dashboard')

  const logout = () => {
    clearAdminToken()
    setAuthed(false)
    onClose()
  }

  if (!open) return null

  if (!authed) {
    return (
      <AdminLogin
        onSuccess={() => { setAuthed(true); onChange() }}
        onClose={onClose}
      />
    )
  }

  const activeTab = TABS.find((t) => t.key === tab)!

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-6xl w-full h-[92vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Panel de administración</DialogTitle>
        </DialogHeader>
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="hidden md:flex w-64 shrink-0 flex-col bg-foreground text-background">
            <div className="flex items-center gap-3 p-5 border-b border-white/10">
              <img src="/logo-candelaria.jpg" alt="CENCA" className="h-10 w-10 rounded-full ring-2 ring-white/20 object-cover" />
              <div className="min-w-0">
                <div className="font-serif font-bold text-white truncate">Panel Admin</div>
                <div className="text-xs text-white/70 truncate">CENCA S.A.S.</div>
              </div>
            </div>
            <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    tab === t.key ? 'bg-primary text-primary-foreground shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <t.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t.label}</span>
                </button>
              ))}
            </nav>
            <div className="p-3 border-t border-white/10">
              <Button variant="outline" className="w-full bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white" onClick={logout}>
                <LogOut className="h-4 w-4" /> Cerrar sesión
              </Button>
            </div>
          </aside>

          {/* Mobile tab bar */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 bg-foreground text-white flex items-center justify-around p-1.5 border-t border-white/10 z-10">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-md text-[10px] transition-colors ${
                  tab === t.key ? 'text-primary' : 'text-white/70'
                }`}
              >
                <t.icon className="h-4 w-4" />
                <span className="truncate max-w-[50px]">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Topbar */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <div>
                <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                  <activeTab.icon className="h-5 w-5 text-primary" />
                  {activeTab.label}
                </h2>
                <p className="text-xs text-muted-foreground">{activeTab.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => onChange()}>
                  Recargar vista
                </Button>
                <Button size="sm" variant="ghost" onClick={onClose}>
                  <X className="h-4 w-4" /> Cerrar
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted/20 pb-20 md:pb-6">
              {tab === 'dashboard' && <Dashboard onNavigate={setTab} />}
              {tab === 'appointments' && <AppointmentsManager />}
              {tab === 'settings' && <SettingsEditor />}
              {tab === 'services' && <ServicesManager />}
              {tab === 'doctors' && <DoctorsManager />}
              {tab === 'gallery' && <GalleryManager />}
              {tab === 'testimonials' && <TestimonialsManager />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Dashboard({ onNavigate }: { onNavigate: (k: TabKey) => void }) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-hero text-white p-6 sm:p-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold">Bienvenido al Panel de Administración</h1>
        <p className="mt-2 text-blue-50/90 text-sm sm:text-base">
          Desde aquí podrá gestionar todo el contenido visible de la página web del centro médico:
          textos, servicios, especialistas, galería, testimonios y citas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TABS.filter((t) => t.key !== 'dashboard').map((t) => (
          <button
            key={t.key}
            onClick={() => onNavigate(t.key)}
            className="group text-left p-5 rounded-2xl border border-blue-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <t.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">{t.label}</h3>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <h3 className="font-serif font-bold text-foreground">¿Cómo usar el panel?</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>En <strong>Contenido</strong>, edite todos los textos del sitio (hero, misión, visión, contacto, etc.).</li>
          <li>En <strong>Servicios</strong>, agregue o modifique servicios médicos con su ícono e imagen.</li>
          <li>En <strong>Especialistas</strong>, gestione el equipo médico, sus horarios y fotos.</li>
          <li>En <strong>Galería</strong>, suba fotos de las instalaciones y eventos.</li>
          <li>En <strong>Testimonios</strong>, agregue opiniones de pacientes.</li>
          <li>En <strong>Citas</strong>, revise y gestione las solicitudes de cita enviadas desde la web.</li>
        </ul>
      </div>
    </div>
  )
}
