'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Eye, TrendingUp } from 'lucide-react'
import { api } from '@/lib/api-client'

interface Props {
  className?: string
  variant?: 'dark' | 'light'
}

export function VisitCounter({ className = '', variant = 'dark' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)
  const [display, setDisplay] = useState(0)
  const [incremented, setIncremented] = useState(false)
  const [loading, setLoading] = useState(true)

  // On mount: increment visit
  useEffect(() => {
    let mounted = true
    api.incrementVisit()
      .then((res) => {
        if (mounted) {
          setCount(res.count)
          setIncremented(true)
          setLoading(false)
        }
      })
      .catch(() => {
        if (mounted) {
          // Fallback: just get count without incrementing
          api.getVisits()
            .then((r) => { if (mounted) { setCount(r.count); setLoading(false) } })
            .catch(() => setLoading(false))
        }
      })
    return () => { mounted = false }
  }, [])

  // Animate the counter when in view
  useEffect(() => {
    if (!inView || !count) return
    let start: number | null = null
    let raf = 0
    const duration = 1500
    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.floor(eased * count)
      setDisplay(current)
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setDisplay(count)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, count])

  const textColor = variant === 'dark' ? 'text-white/60' : 'text-muted-foreground'
  const valueColor = variant === 'dark' ? 'text-white' : 'text-foreground'

  return (
    <motion.div
      ref={ref}
      className={`inline-flex items-center gap-2 text-xs ${textColor} ${className}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.span
        animate={{ scale: [1, 1.15, 1], color: ['#67e8f9', '#22d3ee', '#67e8f9'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Eye className="h-3.5 w-3.5" />
      </motion.span>
      <span className="flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        <span>Visitas:</span>
      </span>
      <span className={`font-mono font-bold tabular-nums ${valueColor}`}>
        {loading ? '...' : display.toLocaleString('es-CO')}
      </span>
      {incremented && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300"
        >
          +1 (usted)
        </motion.span>
      )}
    </motion.div>
  )
}
