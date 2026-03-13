"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
}

export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const words = children.split(" ")

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="inline-block transition-transform duration-700 ease-out"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(100%)",
                transitionDelay: `${delay + wordIndex * 50 + charIndex * 30}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}
