'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  text: string
  /** Speed of typing in ms per character */
  speed?: number
  /** Delay before starting (ms) */
  delay?: number
  className?: string
  /** Show blinking cursor */
  cursor?: boolean
  /** Loop the animation */
  loop?: boolean
  /** Pause between loops in ms */
  loopPause?: number
}

export function TypingText({
  text,
  speed = 35,
  delay = 300,
  className = '',
  cursor = true,
  loop = false,
  loopPause = 2000,
}: Props) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  // Guard: text may be undefined while settings load from the API.
  // Coerce to string so .length / .slice never throw.
  const safeText = typeof text === 'string' ? text : ''

  useEffect(() => {
    // Nothing to type yet — initial state is already empty, just bail out.
    if (!safeText) return

    let timeout: any
    let interval: any
    let charIndex = 0

    const start = () => {
      interval = setInterval(() => {
        if (charIndex < safeText.length) {
          charIndex += 1
          setDisplayed(safeText.slice(0, charIndex))
        } else {
          clearInterval(interval)
          if (loop) {
            timeout = setTimeout(() => {
              charIndex = 0
              setDisplayed('')
              start()
            }, loopPause)
          }
        }
      }, speed)
    }

    timeout = setTimeout(() => {
      setStarted(true)
      start()
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [safeText, speed, delay, loop, loopPause])

  return (
    <span className={className}>
      {/* Render empty when text is undefined so we never show stale typed text */}
      <span>{safeText ? displayed : ''}</span>
      {cursor && (
        <motion.span
          className="inline-block w-[2px] ml-0.5 align-middle"
          style={{ height: '1em', background: 'currentColor' }}
          animate={{ opacity: started ? [1, 0, 1] : 0 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </span>
  )
}