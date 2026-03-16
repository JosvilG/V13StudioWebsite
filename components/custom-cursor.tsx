"use client"

import { useEffect, useRef, useState, useCallback } from "react"

type CursorMode = "default" | "interactive" | "text"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const circlePos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>("default")
  const [isMobile, setIsMobile] = useState(true)

  // Detect mobile on mount
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    setIsMobile(isCoarse)
  }, [])

  // Hide default cursor on non-mobile
  useEffect(() => {
    if (isMobile) return
    document.body.style.cursor = "none"
    const style = document.createElement("style")
    style.id = "custom-cursor-hide"
    style.textContent = "*, *::before, *::after { cursor: none !important; }"
    document.head.appendChild(style)
    return () => {
      document.body.style.cursor = ""
      const el = document.getElementById("custom-cursor-hide")
      if (el) el.remove()
    }
  }, [isMobile])

  // Mouse tracking
  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = e.clientX
    mouse.current.y = e.clientY
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }
    setVisible(true)
  }, [])

  // rAF loop for the outer circle lerp
  useEffect(() => {
    if (isMobile) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      circlePos.current.x = lerp(circlePos.current.x, mouse.current.x, 0.12)
      circlePos.current.y = lerp(circlePos.current.y, mouse.current.y, 0.12)
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circlePos.current.x}px, ${circlePos.current.y}px) translate(-50%, -50%)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [isMobile])

  // Global mouse events
  useEffect(() => {
    if (isMobile) return

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [isMobile, onMouseMove])

  // Detect hover targets via event delegation
  useEffect(() => {
    if (isMobile) return

    const interactiveSelector = 'button, a, [role="button"]'
    const textSelector = "h1, h2, h3, p"

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return
      if (target.closest(interactiveSelector)) {
        setMode("interactive")
      } else if (target.closest(textSelector)) {
        setMode("text")
      } else {
        setMode("default")
      }
    }

    document.addEventListener("mouseover", onOver)
    return () => document.removeEventListener("mouseover", onOver)
  }, [isMobile])

  if (isMobile) return null

  const circleSize =
    mode === "interactive" ? 60 : mode === "text" ? 30 : 40
  const circleOpacity =
    mode === "interactive" ? 0.5 : 1

  return (
    <>
      {/* Dot - follows mouse exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        <div
          className="w-full h-full rounded-full bg-primary"
        />
      </div>

      {/* Outer ring - follows with lerp delay */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: circleSize,
          height: circleSize,
          opacity: visible ? circleOpacity : 0,
          transition:
            "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      >
        <div
          className="w-full h-full rounded-full border border-primary"
          style={{
            transform:
              mode === "interactive" ? "scale(1.5)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>
    </>
  )
}
