'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu as MenuIcon,
  X as XIcon,
  Phone as PhoneIcon,
  MessageCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'

interface HeaderProps {
  brandName: string
  phone: string
  whatsapp: string
}

function waLink(whatsapp: string, text: string) {
  const num = (whatsapp || '').replace(/[^0-9]/g, '')
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`
}

export function Header({ brandName, phone, whatsapp }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#noticias', label: 'Noticias' },
    { href: '#galeria', label: 'Galería' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#sugerencias', label: 'Sugerencias' },
  ]

  const waHref = waLink(whatsapp, 'Hola, quiero agendar una cita en CENCA S.A.S.')

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(15,40,80,0.18)] border-b border-blue-100'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="#inicio" className="flex items-center gap-3 group">
            <img
              src="/logo-candelaria.jpg"
              alt="CENCA S.A.S."
              className="h-12 w-12 rounded-full ring-2 ring-blue-100 shadow-sm object-cover transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-serif text-lg font-bold text-primary">CENCA S.A.S.</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Centro de Especialistas
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-3.5 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors after:content-[''] after:absolute after:left-3 after:bottom-0.5 after:h-[2px] after:bg-primary after:transition-all after:w-0 hover:after:w-[calc(100%-1.5rem)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5"
            >
              <a href={`tel:${phone}`} className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                <span className="text-sm">Llamar</span>
              </a>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700 shadow-sm">
              <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">Agendar cita</span>
              </a>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menú">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b bg-primary text-primary-foreground">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo-candelaria.jpg"
                      alt="CENCA"
                      className="h-10 w-10 rounded-full ring-2 ring-white/30"
                    />
                    <span className="font-serif font-bold">CENCA S.A.S.</span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                      <XIcon className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                  {navLinks.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <Link
                        href={l.href}
                        className="px-4 py-3 rounded-lg text-base font-medium hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {l.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="p-4 border-t bg-muted/30 flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <a href={`tel:${phone}`} className="flex items-center gap-2 justify-center">
                      <PhoneIcon className="h-4 w-4" /> Llamar
                    </a>
                  </Button>
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 justify-center">
                        <MessageCircle className="h-4 w-4" /> Agendar cita
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
