"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TextScrambleProps {
  text: string
  className?: string
  delay?: number
}

export function TextScramble({ text, className, delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const chars = "!<>-_\\/[]{}=+*^?#_abcdefghijklmnopqrstuvwxyz"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " "
              if (index < iteration) return text[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        )

        if (iteration >= text.length) {
          clearInterval(interval)
        }

        iteration += 1 / 3
      }, 30)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, text, delay])

  return (
    <span ref={ref} className={cn("font-mono", className)}>
      {displayText || text.split("").map(() => " ").join("")}
    </span>
  )
}
