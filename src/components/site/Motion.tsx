'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

// Common animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

// Wrapper that fades + slides up on scroll-into-view
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  once?: boolean
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Item to be used inside a Stagger container
export function StaggerItem({
  children,
  className,
  variants = fadeInUp,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}

// Container that staggers its children when scrolled into view
export function StaggerContainer({
  children,
  className,
  variants = containerStagger,
  amount = 0.15,
  once = true,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
  amount?: number
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export { motion }
