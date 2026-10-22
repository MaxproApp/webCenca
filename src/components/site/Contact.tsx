'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { api } from '@/lib/api-client'

export function Contact({ settings, services }: { settings: any; services: any[] }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handle = (k: keyof typeof form) => (e: any) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      toast.error('Por favor complete su nombre y email.')
      return
    }
    setLoading(true)
    try {
      await api.createAppointment(form)
      toast.success('¡Cita solicitada con éxito! Nos pondremos en contacto pronto.')
      setForm({ name: '', email: '', phone: '', service: '', date: '', message: '' })
    } catch (err: any) {
      toast.error(err.message || 'Error al enviar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-gradient-hero text-white relative overflow-hidden">
      <div className="blur-shape bg-blue-400" style={{ width: 360, height: 360, top: -80, right: -40 }} />
      <div className="blur-shape bg-cyan-300" style={{ width: 320, height: 320, bottom: -80, left: -40 }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-blue-50 text-xs font-semibold uppercase tracking-[0.18em]">
            Contacto
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Agende su cita
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-12 bg-white rounded-full" />
            <span className="h-[3px] w-3 bg-white/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-blue-50/90 leading-relaxed">
            Estamos a su disposición. Solicite su cita o contáctenos para cualquier información.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-5 space-y-4">
            {[
              { icon: MapPin, title: 'Dirección', value: settings.contactAddress },
              { icon: Phone, title: 'Teléfono', value: settings.contactPhone },
              { icon: Mail, title: 'Email', value: settings.contactEmail },
              { icon: Clock, title: 'Horario', value: [
                settings.contactHoursWeekday,
                settings.contactHoursSaturday,
                settings.contactHoursSunday,
              ].filter(Boolean).join(' · ') },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <c.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-50/80">{c.title}</div>
                  <div className="mt-1 font-medium text-white">{c.value}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex items-center gap-3 pt-2">
              {settings.socialWhatsapp && (
                <Button asChild variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
                  <a
                    href={`https://wa.me/${settings.socialWhatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              )}
              {settings.socialFacebook && (
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <a href={settings.socialFacebook} target="_blank" rel="noreferrer">Facebook</a>
                </Button>
              )}
              {settings.socialInstagram && (
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <a href={settings.socialInstagram} target="_blank" rel="noreferrer">Instagram</a>
                </Button>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="rounded-3xl bg-white text-foreground p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input id="name" value={form.name} onChange={handle('name')} placeholder="Ej. María Pérez" className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={handle('email')} placeholder="correo@ejemplo.com" className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" value={form.phone} onChange={handle('phone')} placeholder="+57 300 000 0000" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="service">Servicio de interés</Label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={handle('service')}
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">Seleccione un servicio</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="date">Fecha preferida</Label>
                  <Input id="date" type="date" value={form.date} onChange={handle('date')} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea id="message" value={form.message} onChange={handle('message')} rows={4} placeholder="Cuéntenos su motivo de consulta..." className="mt-1.5" />
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? 'Enviando...' : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" /> Solicitar cita
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
