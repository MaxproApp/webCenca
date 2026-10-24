'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  /** Target value to count to. If string with suffix like "12,000+" we'll extract the number and re-add suffix. */
  value: string | number
  /** Duration in ms (default 1800) */
  duration?: number
  /** Suffix to append after the number (e.g. '+') */
  suffix?: string
  /** Prefix to prepend before the number */
  prefix?: string
  /** Class name */
  className?: string
}

/**
 * Parses a value like "12,000+" or "9" into a numeric target and a suffix.
 */
function parseValue(value: string | number): { target: number; suffix: string; prefix: string } {
  if (typeof value === 'number') return { target: value, suffix: '', prefix: '' }
  const str = String(value).trim()
  // Extract prefix (anything before digits)
  const prefixMatch = str.match(/^([^\d]*)(\d[\d.,]*)/)
  let prefix = ''
  let rest = str
  if (prefixMatch) {
    prefix = prefixMatch[1]
    rest = prefixMatch[2] + str.slice(prefixMatch[0].length)
  }
  // Detect suffix (anything non-digit at end)
  const suffixMatch = rest.match(/([\d.,]+)([^\d]*)$/)
  if (!suffixMatch) return { target: 0, suffix: '', prefix: prefix }
  const numStr = suffixMatch[1].replace(/\./g, '').replace(/,/g, '')
  const target = parseInt(numStr, 10) || 0
  const suffix = suffixMatch[2]
  return { target, suffix, prefix }
}

function formatNumber(n: number, useThousands: boolean): string {
  if (useThousands) {
    return n.toLocaleString('es-CO')
  }
  return String(n)
}

export function AnimatedCounter({ value, duration = 1800, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState('0')
  const { target, suffix, prefix } = parseValue(value)
  const useThousands = target >= 1000

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    let raf = 0
    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // ease-out expo for natural feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.floor(eased * target)
      setDisplay(formatNumber(current, useThousands))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setDisplay(formatNumber(target, useThousands))
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, useThousands])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0.6 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  )
}
