"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height
      
      // Calculate progress from 0 to 1 as element scrolls through viewport
      const start = windowHeight
      const end = -elementHeight
      const current = elementTop
      const progressValue = 1 - (current - end) / (start - end)
      
      setProgress(Math.max(0, Math.min(1, progressValue)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { ref, isVisible, progress }
}

export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.innerHeight - rect.top
      setOffset(scrolled * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, offset }
}

export function useStickyProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const elementHeight = element.offsetHeight
      const windowHeight = window.innerHeight
      const scrollableDistance = elementHeight - windowHeight
      
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrolled = -rect.top
        setProgress(Math.min(1, scrolled / scrollableDistance))
      } else if (rect.top > 0) {
        setProgress(0)
      } else {
        setProgress(1)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { ref, progress }
}
