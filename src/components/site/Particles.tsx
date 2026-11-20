'use client'

import { motion } from 'framer-motion'
import { Heart, Plus, Sparkles, Star, type LucideIcon } from 'lucide-react'

interface Particle {
  id: number
  Icon: LucideIcon
  x: number // percentage
  y: number // percentage
  size: number
  color: string
  duration: number
  delay: number
  rotateDir: 1 | -1
}

const ICONS: LucideIcon[] = [Heart, Plus, Sparkles, Star]
const COLORS = [
  'text-rose-300',
  'text-amber-300',
  'text-emerald-300',
  'text-sky-300',
  'text-purple-300',
  'text-pink-300',
  'text-cyan-300',
  'text-orange-300',
]

interface Props {
  /** Number of particles */
  count?: number
  /** Optional className for the container */
  className?: string
  /** Background opacity reduction (0-1) */
  opacity?: number
}

function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function Particles({ count = 12, className = '', opacity = 0.6 }: Props) {
  const particles: Particle[] = Array.from({ length: count }, (_, i) => {
    const r1 = seededRandom(i + 1)
    const r2 = seededRandom(i + 100)
    const r3 = seededRandom(i + 200)
    const r4 = seededRandom(i + 300)
    return {
      id: i,
      Icon: ICONS[Math.floor(r1 * ICONS.length)],
      x: r2 * 100,
      y: r3 * 100,
      size: 14 + r4 * 18, // 14-32px
      color: COLORS[Math.floor(r1 * COLORS.length)],
      duration: 8 + r2 * 12, // 8-20s
      delay: r3 * 5,
      rotateDir: r4 > 0.5 ? 1 : -1,
    }
  })

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.color}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.rotateDir * 15, 0],
            rotate: [0, p.rotateDir * 180, p.rotateDir * 360],
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <p.Icon style={{ width: p.size, height: p.size }} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  )
}
