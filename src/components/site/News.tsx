'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, Calendar, User, ArrowRight, X, Clock, Tag } from 'lucide-react'
import type { NewsItem } from '@/lib/api-client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'

const CATEGORY_COLORS: Record<string, string> = {
  Noticia: 'bg-blue-100 text-blue-700 border-blue-200',
  Blog: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Evento: 'bg-amber-100 text-amber-700 border-amber-200',
}
const CATEGORY_DEFAULT = 'bg-primary/10 text-primary border-primary/20'

export function News({ items }: { items: NewsItem[] }) {
  const [selected, setSelected] = useState<NewsItem | null>(null)

  if (!items || items.length === 0) return null

  // Featured + regular
  const featured = items.find((i) => i.featured) || items[0]
  const rest = items.filter((i) => i.id !== featured.id).slice(0, 6)

  return (
    <section id="noticias" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Soft decoration */}
      <motion.div
        className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
            <Newspaper className="h-3.5 w-3.5" /> Noticias y Novedades
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Manténgase al día
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
            Noticias, blog y eventos de nuestro centro. Conozca nuestras novedades, campañas de salud
            y consejos de nuestros especialistas.
          </p>
        </motion.div>

        {/* Featured + Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured card */}
          <motion.article
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            onClick={() => setSelected(featured)}
            className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm hover:shadow-xl hover:shadow-blue-900/10 cursor-pointer"
          >
            {featured.image ? (
              <div className="relative h-64 overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[featured.category] || CATEGORY_DEFAULT} bg-white/90 backdrop-blur`}>
                    <Tag className="h-3 w-3" /> {featured.category}
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative h-48 bg-gradient-to-br from-primary/15 via-cyan-100 to-primary/5 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Newspaper className="h-16 w-16 text-primary/30" />
                </motion.div>
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[featured.category] || CATEGORY_DEFAULT} bg-white/90 backdrop-blur`}>
                    <Tag className="h-3 w-3" /> {featured.category}
                  </span>
                </div>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                {featured.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {formatDate(featured.date)}
                  </span>
                )}
                {featured.author && (
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" /> {featured.author}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p className="mt-2 text-muted-foreground leading-relaxed line-clamp-2">{featured.excerpt}</p>
              )}
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                <span>Leer más</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </motion.article>

          {/* Rest of the news */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {rest.map((n) => (
              <motion.article
                key={n.id}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 250, damping: 15 } }}
                onClick={() => setSelected(n)}
                className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm hover:shadow-lg cursor-pointer p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${CATEGORY_COLORS[n.category] || CATEGORY_DEFAULT} mb-2`}>
                      {n.category}
                    </span>
                    <h4 className="font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{n.title}</h4>
                    {n.excerpt && (
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{n.excerpt}</p>
                    )}
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                      {n.date && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {formatDate(n.date)}
                        </span>
                      )}
                    </div>
                  </div>
                  {n.image && (
                    <img src={n.image} alt={n.title} className="h-14 w-14 rounded-lg object-cover shrink-0" />
                  )}
                </div>
              </motion.article>
            ))}
            {rest.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
                No hay más noticias por ahora.
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modal/lightbox for full article */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto p-0">
          <DialogTitle className="sr-only">{selected?.title}</DialogTitle>
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {selected.image && (
                  <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
                    <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  {!selected.image && (
                    <div className="flex items-center justify-center h-32 mb-6 rounded-2xl bg-gradient-to-br from-primary/15 to-cyan-100">
                      <Newspaper className="h-12 w-12 text-primary/30" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[selected.category] || CATEGORY_DEFAULT}`}>
                      <Tag className="h-3 w-3" /> {selected.category}
                    </span>
                    {selected.date && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {formatDate(selected.date)}
                      </span>
                    )}
                    {selected.author && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" /> {selected.author}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">{selected.title}</h2>
                  {selected.excerpt && (
                    <p className="text-base text-muted-foreground italic mb-4 leading-relaxed">{selected.excerpt}</p>
                  )}
                  <div className="prose prose-blue max-w-none text-foreground/90 whitespace-pre-line text-base leading-relaxed">
                    {selected.content}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function formatDate(d: string): string {
  try {
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return d
  }
}
