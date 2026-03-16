"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface PreloaderProps {
  onComplete?: () => void
}

type Phase = "hidden" | "fade-in" | "hold" | "pulse" | "exit" | "done"

const SESSION_KEY = "v13-preloader-shown"

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("hidden")
  const [mounted, setMounted] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    if (typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem(SESSION_KEY)
      if (alreadyShown) {
        setPhase("done")
        setShouldShow(false)
      } else {
        setShouldShow(true)
        sessionStorage.setItem(SESSION_KEY, "true")
      }
    }
  }, [])

  const handleComplete = useCallback(() => {
    setPhase("done")
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    if (!shouldShow) return

    // Phase 1: Fade in + scale up (0.5s)
    const fadeInTimer = setTimeout(() => setPhase("fade-in"), 50)

    // Phase 2: Hold visible (0.5s)
    const holdTimer = setTimeout(() => setPhase("hold"), 550)

    // Phase 3: Pulse with glow (0.4s)
    const pulseTimer = setTimeout(() => setPhase("pulse"), 1050)

    // Phase 4: Slide up exit (0.8s)
    const exitTimer = setTimeout(() => setPhase("exit"), 1450)

    // Phase 5: Done (~2.25s total)
    const doneTimer = setTimeout(() => handleComplete(), 2250)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(holdTimer)
      clearTimeout(pulseTimer)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [shouldShow, handleComplete])

  if (phase === "done") return null

  const logoSrc =
    mounted && resolvedTheme === "light" ? "/logo-dark.png" : "/logo-light.png"

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        display: phase === "done" ? "none" : "flex",
        clipPath:
          phase === "exit"
            ? "inset(0 0 100% 0)"
            : "inset(0 0 0 0)",
        transition:
          phase === "exit"
            ? "clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="relative"
          style={{
            opacity: phase === "hidden" ? 0 : 1,
            transform:
              phase === "hidden" ? "scale(0.8)" : "scale(1)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            boxShadow:
              phase === "pulse"
                ? "0 0 40px 10px var(--glow-purple-strong)"
                : "0 0 0px 0px transparent",
            borderRadius: "9999px",
          }}
        >
          <Image
            src={logoSrc}
            alt="V13 Studio"
            width={120}
            height={120}
            priority
            style={{ width: 120, height: "auto" }}
          />
        </div>
        <span
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
          style={{
            opacity: phase === "hidden" ? 0 : 1,
            transition: "opacity 0.5s ease-out 0.1s",
          }}
        >
          STUDIO
        </span>
      </div>

      <style jsx>{`
        @keyframes preloader-pulse {
          0% {
            box-shadow: 0 0 0px 0px transparent;
          }
          50% {
            box-shadow: 0 0 40px 10px var(--glow-purple-strong);
          }
          100% {
            box-shadow: 0 0 0px 0px transparent;
          }
        }
      `}</style>
    </div>
  )
}
