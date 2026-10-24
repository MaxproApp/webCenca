'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Props {
  whatsapp: string
}

export function FloatingWhatsApp({ whatsapp }: Props) {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!whatsapp) return null

  const waHref = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, quiero agendar una cita en CENCA S.A.S.')}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl p-4 border border-blue-100 max-w-[280px] mb-2"
              >
                <div className="flex items-start gap-3">
                  <img src="/logo-candelaria.jpg" alt="CENCA" className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">¿Necesita agendar una cita?</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Escríbanos por WhatsApp y le responderemos a la brevedad.
                    </p>
                  </div>
                  <button
                    onClick={() => setExpanded(false)}
                    className="text-muted-foreground hover:text-foreground p-0.5"
                    aria-label="Cerrar"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> Iniciar conversación
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setExpanded((e) => !e)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              boxShadow: ['0 10px 25px -5px rgba(34,197,94,0.4)', '0 10px 35px -3px rgba(34,197,94,0.6)', '0 10px 25px -5px rgba(34,197,94,0.4)'],
            }}
            transition={{
              scale: { type: 'spring', stiffness: 400, damping: 17 },
              boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
            aria-label="Agendar cita por WhatsApp"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MessageCircle className="h-7 w-7" />
            </motion.div>

            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-green-300 pointer-events-none"
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
