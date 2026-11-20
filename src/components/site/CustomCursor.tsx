'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Check touch device once at module load (client-side only)
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const mountedRef = useRef(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth trailing with spring
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 25 })

  useEffect(() => {
    if (isTouchDevice) return
    mountedRef.current = true

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }

    const onMouseLeave = () => setVisible(false)

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="hover"]')) {
        setHovering(true)
      } else {
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onMouseLeave)
    window.addEventListener('mouseover', onOver)

    return () => {
      mountedRef.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onMouseLeave)
      window.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY])

  if (isTouchDevice) return null

  return (
    <>
      {/* Small dot - follows mouse exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Larger ring - trails behind with spring */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full border-2"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: hovering ? '#22d3ee' : '#3b82f6',
        }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? 'rgba(34, 211, 238, 0.1)' : 'rgba(59, 130, 246, 0)',
        }}
        transition={{
          width: { type: 'spring', stiffness: 300, damping: 20 },
          height: { type: 'spring', stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
        }}
      />

      {/* Glow halo - even larger and softer */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full blur-xl"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 80,
          height: 80,
          background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
        }}
        animate={{
          opacity: visible && hovering ? 0.8 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
