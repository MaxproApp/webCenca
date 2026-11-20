'use client'

import { motion } from 'framer-motion'

interface Props {
  /** Color of the wave (matches the next section background) */
  color?: string
  /** Flip the wave upside down */
  flip?: boolean
  /** Animation speed in seconds */
  speed?: number
  /** Height in pixels */
  height?: number
}

/**
 * Animated SVG wave divider - the wave path morphs continuously
 * to create a flowing, dynamic transition between sections.
 */
export function WaveDivider({
  color = '#ffffff',
  flip = false,
  speed = 8,
  height = 60,
}: Props) {
  return (
    <div
      className="relative w-full overflow-hidden leading-none"
      style={{ height: `${height}px`, transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`wg-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.95" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        {/* Layer 1 - back wave, slower */}
        <motion.path
          fill={color}
          fillOpacity={0.4}
          animate={{
            d: [
              'M0 60 Q 240 100 480 60 T 960 60 T 1440 60 V120 H0 Z',
              'M0 60 Q 240 30 480 60 T 960 60 T 1440 60 V120 H0 Z',
              'M0 60 Q 240 100 480 60 T 960 60 T 1440 60 V120 H0 Z',
            ],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Layer 2 - front wave, faster */}
        <motion.path
          fill={`url(#wg-${color.replace('#', '')})`}
          animate={{
            d: [
              'M0 70 Q 360 30 720 70 T 1440 70 V120 H0 Z',
              'M0 70 Q 360 110 720 70 T 1440 70 V120 H0 Z',
              'M0 70 Q 360 30 720 70 T 1440 70 V120 H0 Z',
            ],
          }}
          transition={{
            duration: speed * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  )
}
