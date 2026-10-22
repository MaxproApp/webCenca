'use client'

import { useState } from 'react'
import { X, ImageIcon } from 'lucide-react'
import type { GalleryItem } from '@/lib/api-client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  if (!items || items.length === 0) return null

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            Galería
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Nuestras instalaciones
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-12 bg-primary rounded-full" />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Conozca nuestras modernas instalaciones diseñadas para su comodidad y bienestar.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setSelected(g)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-muted border border-blue-100 transition-all hover:shadow-xl hover:shadow-blue-900/10 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
              aria-label={`Ver ${g.title}`}
            >
              {g.image && g.image.startsWith('/') ? (
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-100 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-primary/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <h3 className="font-semibold text-white text-sm">{g.title}</h3>
                {g.category && (
                  <span className="text-[10px] uppercase tracking-wide text-blue-50/90">{g.category}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-0">
          <DialogTitle className="sr-only">{selected?.title}</DialogTitle>
          {selected && (
            <div className="relative">
              {selected.image && selected.image.startsWith('/') ? (
                <img src={selected.image} alt={selected.title} className="w-full max-h-[80vh] object-contain" />
              ) : (
                <div className="w-full h-[60vh] bg-gradient-to-br from-primary/20 to-cyan-100 flex items-center justify-center">
                  <ImageIcon className="h-20 w-20 text-primary/40" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="font-serif text-xl font-bold">{selected.title}</h3>
                {selected.description && <p className="mt-1 text-sm text-blue-50/90">{selected.description}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
