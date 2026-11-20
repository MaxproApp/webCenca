'use client'

import { motion } from 'framer-motion'
import type { GalleryItem } from '@/lib/api-client'

interface Props {
  items: GalleryItem[]
}

/**
 * Horizontal marquee of installation images with watermark (low opacity) effect.
 * Placed below the "Sobre Nosotros" section as a decorative animated strip.
 */
export function InstallationsWatermark({ items }: Props) {
  if (!items || items.length === 0) return null

  // Duplicate items multiple times for seamless infinite scroll
  const loop = [...items, ...items, ...items]

  return (
    <section
      aria-label="Instalaciones"
      className="relative w-full overflow-hidden py-8 bg-gradient-to-b from-white via-blue-50/30 to-white"
    >
      {/* Centered label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <motion.div
          className="px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-serif text-base sm:text-lg font-bold text-primary whitespace-nowrap">
            Nuestras instalaciones
          </p>
        </motion.div>
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-Y-0 right-0 w-32 sm:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 sm:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Sliding images strip */}
      <motion.div
        className="flex gap-4 whitespace-nowrap will-change-transform"
        animate={{ x: ['0%', `-${100 / 3}%`] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {loop.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="relative shrink-0 w-64 sm:w-80 h-40 sm:h-52 rounded-2xl overflow-hidden"
          >
            {item.image && item.image.startsWith('/') ? (
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                style={{ opacity: 0.18 }}
                whileHover={{ opacity: 0.4, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div
                className="w-full h-full bg-gradient-to-br from-primary/15 to-cyan-100"
                style={{ opacity: 0.2 }}
              />
            )}
            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl border border-primary/10 pointer-events-none" />
          </div>
        ))}
      </motion.div>

      {/* Soft top/bottom gradient overlays for depth */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-[5]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-[5]" />
    </section>
  )
}
