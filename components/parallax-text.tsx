"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ParallaxTextProps {
  children: string
  className?: string
  speed?: number
}

export function ParallaxText({ children, className, speed = 0.5 }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const elementTop = rect.top + scrollY
      const viewportHeight = window.innerHeight
      
      // Calculate how far through the viewport the element is
      const progress = (scrollY + viewportHeight - elementTop) / (viewportHeight + rect.height)
      setOffset((progress - 0.5) * 200 * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div 
        className="whitespace-nowrap flex"
        style={{ transform: `translateX(${offset}px)` }}
      >
        <span className="text-[20vw] font-bold text-white/5 uppercase tracking-tighter">
          {children}&nbsp;
        </span>
        <span className="text-[20vw] font-bold text-white/5 uppercase tracking-tighter">
          {children}&nbsp;
        </span>
      </div>
    </div>
  )
}
