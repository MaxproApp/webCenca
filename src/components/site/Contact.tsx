'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Megaphone, Calendar, Facebook, Instagram, Twitter, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { api } from '@/lib/api-client'
import { Particles } from './Particles'

const TYPE_OPTIONS = [
  { value: 'Sugerencia', label: 'Sugerencia' },
  { value: 'Reclamo', label: 'Reclamo' },
  { value: 'Felicitación', label: 'Felicitación' },
  { value: 'Consulta', label: 'Consulta' },
]

const TYPE_COLORS: Record<string, { bg: string; ring: string; text: string }> = {
  Sugerencia: { bg: 'bg-sky-100', ring: 'ring-sky-300', text: 'text-sky-700' },
  Reclamo: { bg: 'bg-rose-100', ring: 'ring-rose-300', text: 'text-rose-700' },
  'Felicitación': { bg: 'bg-amber-100', ring: 'ring-amber-300', text: 'text-amber-700' },
  Consulta: { bg: 'bg-emerald-100', ring: 'ring-emerald-300', text: 'text-emerald-700' },
}

// Animated input wrapper with focus glow
function AnimatedField({
  id,
  label,
  children,
  required,
}: {
  id: string
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </Label>
      <motion.div
        className="relative mt-1.5"
        animate={{
          scale: focused ? 1.01 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Glow effect on focus */}
        <motion.div
          className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/30 via-blue-400/30 to-cyan-400/30 blur-sm pointer-events-none"
          animate={{
            opacity: focused ? 0.7 : 0,
            scale: focused ? 1.02 : 0.98,
          }}
          transition={{ duration: 0.2 }}
        />
        <div
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="relative"
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}

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
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handle = (k: keyof typeof form) => (e: any) => {
    setForm({ ...form, [k]: e.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: false })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}
    if (!form.name) newErrors.name = true
    if (!form.email) newErrors.email = true
    if (!form.message) newErrors.message = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Por favor complete los campos obligatorios.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.type,
        date: form.date || null,
        message: `${form.type}${form.service ? ` · ${form.service}` : ''}: ${form.message}`,
      }
      await api.createAppointment(payload)
      setSuccess(true)
      toast.success('¡Mensaje enviado! Gracias por comunicarse con nosotros.')
      setForm({ name: '', email: '', phone: '', service: '', type: 'Sugerencia', date: '', message: '' })
      // Auto-hide success after 4 seconds
      setTimeout(() => setSuccess(false), 4000)
    } catch (err: any) {
      toast.error(err.message || 'Error al enviar el mensaje')
    } finally {
      setLoading(false)
    }
  }

  const waHref = settings.socialWhatsapp
    ? `https://wa.me/${settings.socialWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, quiero agendar una cita en CENCA S.A.S.')}`
    : '#'

  const currentTypeColor = TYPE_COLORS[form.type] || TYPE_COLORS.Sugerencia

  return (
    <section id="sugerencias" className="py-20 lg:py-28 bg-gradient-hero text-white relative overflow-hidden">
      <Particles count={8} opacity={0.4} />
      <motion.div
        className="blur-shape bg-blue-400"
        style={{ width: 360, height: 360, top: -80, right: -40 }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blur-shape bg-cyan-300"
        style={{ width: 320, height: 320, bottom: -80, left: -40 }}
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-blue-50 text-xs font-semibold uppercase tracking-[0.18em]">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Sugerencias y Reclamos
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Su opinión nos importa
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              className="h-[3px] bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="h-[3px] w-3 bg-white/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-blue-50/90 leading-relaxed">
            Escríbanos sus sugerencias, reclamos o felicitaciones. Para agendar una cita, use
            nuestro canal directo por WhatsApp.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            className="lg:col-span-5 space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="rounded-2xl bg-green-500/15 backdrop-blur border border-green-300/40 p-5 flex items-center gap-4"
            >
              <motion.div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-500"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Calendar className="h-7 w-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wide text-green-100">Agendar cita</div>
                <div className="mt-1 font-bold text-white">Por WhatsApp</div>
                <div className="text-xs text-green-50/80 mt-0.5">Respuesta rápida y directa</div>
              </div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                  <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> Enviar
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {(settings.sede1Address || settings.sede2Address) && (
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-blue-50/80">Nuestras sedes</div>
                    <div className="font-bold text-white text-sm">El Banco, Magdalena</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {settings.sede1Address && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">{settings.sede1Title || 'Sede 01'}</div>
                      <div className="text-sm font-medium text-white mt-0.5">{settings.sede1Address}</div>
                      {settings.sede1Hours && <div className="text-xs text-blue-50/70 mt-0.5 flex items-center gap-1"><Clock className="h-3 w-3" /> {settings.sede1Hours}</div>}
                    </div>
                  )}
                  {settings.sede2Address && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">{settings.sede2Title || 'Sede 02'}</div>
                      <div className="text-sm font-medium text-white mt-0.5">{settings.sede2Address}</div>
                      {settings.sede2Hours && <div className="text-xs text-blue-50/70 mt-0.5 flex items-center gap-1"><Clock className="h-3 w-3" /> {settings.sede2Hours}</div>}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {[
              { icon: Phone, title: 'Teléfono', value: settings.contactPhone },
              { icon: Mail, title: 'Email', value: settings.contactEmail },
              { icon: Clock, title: 'Horario', value: [
                settings.contactHoursWeekday,
                settings.contactHoursSaturday,
                settings.contactHoursSunday,
              ].filter(Boolean).join(' · ') },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                whileHover={{ x: 4, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/15"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <c.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-50/80">{c.title}</div>
                  <div className="mt-1 font-medium text-white">{c.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Redes sociales con íconos */}
            <div className="flex items-center gap-3 pt-2">
              {settings.socialFacebook && (
                <motion.a
                  href={settings.socialFacebook}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -3, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40 transition-shadow"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
              )}
              {settings.socialInstagram && (
                <motion.a
                  href={settings.socialInstagram}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 text-white shadow-md hover:shadow-lg hover:shadow-pink-500/40 transition-shadow"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
              )}
              {settings.socialTwitter && (
                <motion.a
                  href={settings.socialTwitter}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -3, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-md hover:shadow-lg hover:shadow-sky-500/40 transition-shadow"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
              )}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={submit} className="relative rounded-3xl bg-white text-foreground p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Animated gradient border on success */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-3xl border-4 border-green-400 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                >
                  <Megaphone className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Buzón de Sugerencias</h3>
                  <p className="text-xs text-muted-foreground">Sugerencias, reclamos, felicitaciones o consultas</p>
                </div>
              </div>

              {/* Success overlay */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-4"
                    >
                      <motion.div
                        initial={{ scale: 0, pathLength: 0 }}
                        animate={{ scale: 1, pathLength: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        <CheckCircle2 className="h-14 w-14 text-green-500" />
                      </motion.div>
                    </motion.div>
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="font-serif text-xl font-bold text-foreground"
                    >
                      ¡Mensaje enviado!
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 }}
                      className="text-sm text-muted-foreground mt-1"
                    >
                      Gracias por comunicarse con nosotros.
                    </motion.p>
                    {/* Confetti-like sparkles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          x: [-60 + i * 24, -80 + i * 24],
                          y: [-30, -80],
                          scale: [0, 1.2, 0],
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 1.5, delay: 0.4 + i * 0.05, repeat: 1 }}
                      >
                        <Sparkles className="h-4 w-4 text-amber-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatedField id="name" label="Nombre completo" required>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handle('name')}
                    placeholder="Ej. María Pérez"
                    className={`transition-colors ${errors.name ? 'border-rose-400 bg-rose-50' : ''}`}
                    required
                  />
                  {errors.name && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-rose-500"
                    >
                      <AlertCircle className="h-3 w-3" /> Campo obligatorio
                    </motion.div>
                  )}
                </AnimatedField>

                <AnimatedField id="email" label="Email" required>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handle('email')}
                    placeholder="correo@ejemplo.com"
                    className={`transition-colors ${errors.email ? 'border-rose-400 bg-rose-50' : ''}`}
                    required
                  />
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-rose-500"
                    >
                      <AlertCircle className="h-3 w-3" /> Campo obligatorio
                    </motion.div>
                  )}
                </AnimatedField>

                <AnimatedField id="phone" label="Teléfono">
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={handle('phone')}
                    placeholder="+57 300 000 0000"
                  />
                </AnimatedField>

                <div>
                  <Label htmlFor="type">Tipo de mensaje</Label>
                  <div className="relative mt-1.5">
                    <select
                      id="type"
                      value={form.type}
                      onChange={handle('type')}
                      className={`w-full h-10 rounded-md border border-input bg-background px-3 text-sm transition-all ${currentTypeColor.bg} ${currentTypeColor.text} focus:ring-2 ${currentTypeColor.ring} focus:border-transparent`}
                    >
                      {TYPE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value} className="bg-white text-foreground">{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="service">Servicio relacionado (opcional)</Label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={handle('service')}
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-transparent"
                  >
                    <option value="">Ninguno en particular</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="flex items-center gap-1">
                    Mensaje <span className="text-rose-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={handle('message')}
                    rows={4}
                    placeholder="Escriba su sugerencia, reclamo o comentario..."
                    className={`mt-1.5 transition-colors focus:ring-2 focus:ring-primary/30 focus:border-transparent ${errors.message ? 'border-rose-400 bg-rose-50' : ''}`}
                    required
                  />
                  {errors.message && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-1 flex items-center gap-1 text-xs text-rose-500"
                    >
                      <AlertCircle className="h-3 w-3" /> Campo obligatorio
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto"
                >
                  <Button type="submit" disabled={loading} className="w-full sm:w-auto relative overflow-hidden">
                    {loading ? (
                      <motion.span
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Enviando...
                      </motion.span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" /> Enviar mensaje
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
