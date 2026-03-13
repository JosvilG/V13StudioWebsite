"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ScrollReveal({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getInitialTransform = () => {
    switch (direction) {
      case "up": return "translateY(60px)"
      case "down": return "translateY(-60px)"
      case "left": return "translateX(60px)"
      case "right": return "translateX(-60px)"
    }
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-1000 ease-out", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0)" : getInitialTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
