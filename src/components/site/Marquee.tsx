'use client'

import { motion } from 'framer-motion'
import { Heart, Activity, Stethoscope, Pill, Syringe, Brain, Baby, Eye, Bone } from 'lucide-react'

interface MarqueeItem {
  icon: any
  text: string
  color: string
}

const DEFAULT_ITEMS: MarqueeItem[] = [
  { icon: Heart, text: 'Atención cardiovascular', color: 'text-rose-500' },
  { icon: Activity, text: 'Electrocardiograma', color: 'text-emerald-500' },
  { icon: Stethoscope, text: 'Consulta de Cirugía', color: 'text-blue-500' },
  { icon: Baby, text: 'Pediatría', color: 'text-sky-500' },
  { icon: Brain, text: 'Psicología', color: 'text-purple-500' },
  { icon: Bone, text: 'Ortopedia', color: 'text-amber-500' },
  { icon: Eye, text: 'Cirugía Ortopédica', color: 'text-cyan-500' },
  { icon: Pill, text: 'Nutrición', color: 'text-orange-500' },
  { icon: Syringe, text: 'Cirugía Programada', color: 'text-fuchsia-500' },
]

interface Props {
  items?: MarqueeItem[]
  speed?: number
}

export function Marquee({ items = DEFAULT_ITEMS, speed = 30 }: Props) {
  // Duplicate items for seamless loop
  const loop = [...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden py-3 bg-gradient-to-r from-primary via-blue-600 to-primary">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', `-${100 / 3}%`] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-white text-sm sm:text-base font-medium shrink-0"
          >
            <motion.span
              className={item.color}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
            >
              <item.icon className="h-4 w-4" />
            </motion.span>
            <span>{item.text}</span>
            <span className="ml-8 text-white/30">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
