'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Megaphone, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { api } from '@/lib/api-client'

const TYPE_OPTIONS = [
  { value: 'Sugerencia', label: 'Sugerencia' },
  { value: 'Reclamo', label: 'Reclamo' },
  { value: 'Felicitación', label: 'Felicitación' },
  { value: 'Consulta', label: 'Consulta' },
]

export function Contact({ settings, services }: { settings: any; services: any[] }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    type: 'Sugerencia',
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
    if (!form.message) {
      toast.error('Por favor escriba su mensaje.')
      return
    }
    setLoading(true)
    try {
      // Re-use the appointments endpoint with the type captured in the message
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.type,
        date: form.date || null,
        message: `${form.type}${form.service ? ` · ${form.service}` : ''}: ${form.message}`,
      }
      await api.createAppointment(payload)
      toast.success('¡Mensaje enviado! Gracias por comunicarse con nosotros.')
      setForm({ name: '', email: '', phone: '', service: '', type: 'Sugerencia', date: '', message: '' })
    } catch (err: any) {
      toast.error(err.message || 'Error al enviar el mensaje')
    } finally {
      setLoading(false)
    }
  }

  const waHref = settings.socialWhatsapp
    ? `https://wa.me/${settings.socialWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, quiero agendar una cita en CENCA S.A.S.')}`
    : '#'

  return (
    <section id="sugerencias" className="py-20 lg:py-28 bg-gradient-hero text-white relative overflow-hidden">
      <div className="blur-shape bg-blue-400" style={{ width: 360, height: 360, top: -80, right: -40 }} />
      <div className="blur-shape bg-cyan-300" style={{ width: 320, height: 320, bottom: -80, left: -40 }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-blue-50 text-xs font-semibold uppercase tracking-[0.18em]">
            Sugerencias y Reclamos
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Su opinión nos importa
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-12 bg-white rounded-full" />
            <span className="h-[3px] w-3 bg-white/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-blue-50/90 leading-relaxed">
            Escríbanos sus sugerencias, reclamos o felicitaciones. Para agendar una cita, use
            nuestro canal directo por WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact info + WhatsApp */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp CTA - prominent */}
            <div className="rounded-2xl bg-green-500/15 backdrop-blur border border-green-300/40 p-5 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-500">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wide text-green-100">Agendar cita</div>
                <div className="mt-1 font-bold text-white">Por WhatsApp</div>
                <div className="text-xs text-green-50/80 mt-0.5">Respuesta rápida y directa</div>
              </div>
              <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Enviar
                </a>
              </Button>
            </div>

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
              {settings.socialTwitter && (
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <a href={settings.socialTwitter} target="_blank" rel="noreferrer">Twitter</a>
                </Button>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="rounded-3xl bg-white text-foreground p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Buzón de Sugerencias</h3>
                  <p className="text-xs text-muted-foreground">Sugerencias, reclamos, felicitaciones o consultas</p>
                </div>
              </div>

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
                  <Label htmlFor="type">Tipo de mensaje</Label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={handle('type')}
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {TYPE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="service">Servicio relacionado (opcional)</Label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={handle('service')}
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">Ninguno en particular</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea id="message" value={form.message} onChange={handle('message')} rows={4} placeholder="Escriba su sugerencia, reclamo o comentario..." className="mt-1.5" required />
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? 'Enviando...' : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" /> Enviar mensaje
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
