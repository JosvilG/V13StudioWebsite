"use client"

import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxProps {
  children: ReactNode
  speed?: number // negative = slower, positive = faster
  className?: string
  direction?: 'vertical' | 'horizontal'
}

export function Parallax({ 
  children, 
  speed = 0.5, 
  className,
  direction = 'vertical'
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const windowCenter = window.innerHeight / 2
      const offset = (centerY - windowCenter) * speed
      setTransform(offset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        transform: direction === 'vertical' 
          ? `translateY(${transform}px)` 
          : `translateX(${transform}px)`
      }}
    >
      {children}
    </div>
  )
}

interface ParallaxLayerProps {
  children: ReactNode
  depth?: number // 0 = static, 1 = moves with scroll, 2+ = moves faster
  className?: string
}

export function ParallaxLayer({ children, depth = 1, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        transform: `translateY(${scrollY * (depth - 1) * 0.1}px)`
      }}
    >
      {children}
    </div>
  )
}

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  backgroundSpeed?: number
  contentSpeed?: number
}

export function ParallaxSection({ 
  children, 
  className,
  backgroundSpeed = -0.3,
  contentSpeed = 0.1
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionProgress = 1 - (rect.top / windowHeight)
      setProgress(Math.max(0, Math.min(1, sectionProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {children}
    </div>
  )
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasRevealedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Find if we're inside a SectionStack slot
    const stackSlot = el.closest("[data-stack-index]") as HTMLElement | null

    if (stackSlot) {
      // Inside SectionStack: check parent slot opacity instead of IntersectionObserver
      // because all slots overlap in the same viewport position
      let rafId: number

      const check = () => {
        const opacity = parseFloat(stackSlot.style.opacity || "0")

        if (opacity > 0.5 && !hasRevealedRef.current) {
          // Section is becoming active — trigger staggered reveal
          hasRevealedRef.current = true
          setTimeout(() => setIsVisible(true), delay)
        } else if (opacity < 0.05 && hasRevealedRef.current) {
          // Section faded out — reset so it animates again next time
          hasRevealedRef.current = false
          setIsVisible(false)
        }

        rafId = requestAnimationFrame(check)
      }

      rafId = requestAnimationFrame(check)
      return () => cancelAnimationFrame(rafId)
    } else {
      // Outside SectionStack: normal IntersectionObserver
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.2 }
      )

      observer.observe(el)
      return () => observer.disconnect()
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        isVisible ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 translate-y-8 duration-0',
        className
      )}
    >
      {children}
    </div>
  )
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  amplitude?: number
  frequency?: number
}

export function FloatingElement({ 
  children, 
  className,
  amplitude = 20,
  frequency = 0.5
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const oscillation = Math.sin(scrollY * frequency * 0.01) * amplitude
      setOffset(oscillation)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [amplitude, frequency])

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  )
}
