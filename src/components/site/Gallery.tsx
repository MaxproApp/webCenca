'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ImageIcon, ZoomIn } from 'lucide-react'
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
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            Galería
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Nuestras instalaciones
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <motion.span
              className="h-[3px] bg-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            <span className="h-[3px] w-3 bg-primary/40 rounded-full" />
          </div>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Conozca nuestras modernas instalaciones diseñadas para su comodidad y bienestar.
          </p>
        </motion.div>

        {/* Masonry-ish grid using varying row spans for visual interest */}
        <motion.div
          className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((g, i) => {
            // Make first item bigger
            const big = i === 0
            return (
              <motion.button
                key={g.id}
                onClick={() => setSelected(g)}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.94 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 250, damping: 15 } }}
                className={`group relative overflow-hidden rounded-2xl bg-muted border border-blue-100 transition-shadow hover:shadow-xl hover:shadow-blue-900/10 cursor-pointer ${
                  big ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
                }`}
                aria-label={`Ver ${g.title}`}
              >
                {g.image && g.image.startsWith('/') ? (
                  <img
                    src={g.image}
                    alt={g.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-100 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-primary/40" />
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Zoom hint */}
                <motion.div
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur text-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <ZoomIn className="h-4 w-4" />
                </motion.div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-semibold text-white text-sm">{g.title}</h3>
                  {g.category && (
                    <span className="text-[10px] uppercase tracking-wide text-blue-50/90">{g.category}</span>
                  )}
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-0">
          <DialogTitle className="sr-only">{selected?.title}</DialogTitle>
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  )
}
