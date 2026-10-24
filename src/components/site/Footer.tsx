'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Shield, Heart, MessageCircle } from 'lucide-react'

export function Footer({ settings, onOpenAdmin }: { settings: any; onOpenAdmin?: () => void }) {
  return (
    <footer className="bg-foreground text-background pt-16 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/logo-candelaria.jpg"
                alt="CENCA"
                className="h-12 w-12 rounded-full ring-2 ring-white/20 object-cover"
              />
              <div>
                <div className="font-serif text-lg font-bold text-white">CENCA S.A.S.</div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/70">Centro de Especialistas</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-md">
              Centro de Especialistas La Candelaria (CENCA S.A.S.). Atención médica integral con calidad,
              calidez humana y tecnología de avanzada.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {settings.socialWhatsapp && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href={`https://wa.me/${settings.socialWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, quiero agendar una cita en CENCA S.A.S.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 items-center gap-1.5 px-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </motion.a>
              )}
              {[
                { icon: Facebook, url: settings.socialFacebook },
                { icon: Instagram, url: settings.socialInstagram },
                { icon: Twitter, url: settings.socialTwitter },
              ].map((s, i) =>
                s.url ? (
                  <motion.a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
                  >
                    <s.icon className="h-4 w-4" />
                  </motion.a>
                ) : null
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="font-serif font-bold text-white mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { href: '#nosotros', label: 'Nosotros' },
                { href: '#servicios', label: 'Servicios' },
                { href: '#galeria', label: 'Galería' },
                { href: '#testimonios', label: 'Testimonios' },
                { href: '#sugerencias', label: 'Sugerencias' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-serif font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {settings.contactAddress && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{settings.contactAddress}</span>
                </li>
              )}
              {settings.contactPhone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href={`tel:${settings.contactPhone}`} className="hover:text-primary transition-colors">{settings.contactPhone}</a>
                </li>
              )}
              {settings.contactEmail && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-primary transition-colors">{settings.contactEmail}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60">{settings.footerText}</p>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" /> Datos protegidos
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3 fill-red-400 text-red-400" /> Hecho con cariño
            </span>
            <button
              onClick={onOpenAdmin}
              className="px-2 py-1 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Acceso administrativo"
              title="Acceso administrativo"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
