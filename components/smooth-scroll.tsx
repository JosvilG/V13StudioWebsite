"use client"

import { useEffect, useRef, createContext, useContext, type ReactNode } from "react"
import Lenis from "lenis"

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    lenisRef.current = lenis

    // Expose globally so navigateToSection can use it
    ;(window as unknown as Record<string, unknown>).__lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      delete (window as unknown as Record<string, unknown>).__lenis
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
