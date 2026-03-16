"use client"

import { useEffect, useState, useRef } from "react"

interface TextScrambleProps {
  text: string
  className?: string
  trigger?: boolean
  speed?: number
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)]
}

export function TextScramble({ text, className, trigger, speed = 40 }: TextScrambleProps) {
  const [display, setDisplay] = useState(text)
  const resolvedRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef(0)

  useEffect(() => {
    if (!trigger) {
      setDisplay(text)
      resolvedRef.current = 0
      return
    }

    resolvedRef.current = 0
    lastTickRef.current = performance.now()

    const animate = (now: number) => {
      const elapsed = now - lastTickRef.current

      // Advance one character per `speed` ms
      if (elapsed >= speed) {
        resolvedRef.current = Math.min(resolvedRef.current + 1, text.length)
        lastTickRef.current = now
      }

      const resolved = resolvedRef.current

      // Build display string
      const result = text
        .split("")
        .map((char, i) => {
          if (i < resolved) return char
          if (char === " ") return " "
          return randomChar()
        })
        .join("")

      setDisplay(result)

      if (resolved < text.length) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        // Ensure final text is exact
        setDisplay(text)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [trigger, text, speed])

  return <span className={className}>{display}</span>
}
