"use client"

import { useEffect, useState, useCallback } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", () => setIsClicking(true))
    window.addEventListener("mouseup", () => setIsClicking(false))
    window.addEventListener("mouseleave", () => setIsVisible(false))
    window.addEventListener("mouseenter", () => setIsVisible(true))

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  // Smooth follower animation
  useEffect(() => {
    const animate = () => {
      setFollowerPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.1,
        y: prev.y + (position.y - prev.y) * 0.1,
      }))
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [position])

  // Detect hoverable elements
  useEffect(() => {
    const handleHoverables = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [data-cursor="hover"], input, textarea'
      )
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true))
        el.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    handleHoverables()
    const observer = new MutationObserver(handleHoverables)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  if (typeof window === "undefined") return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[99999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: isClicking ? 6 : 8,
            height: isClicking ? 6 : 8,
            transition: "width 0.2s, height 0.2s",
          }}
        />
      </div>

      {/* Follower circle */}
      <div
        className="fixed pointer-events-none z-[99998]"
        style={{
          left: followerPosition.x,
          top: followerPosition.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <div
          className="rounded-full border border-white/50"
          style={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            transition: "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            backgroundColor: isHovering ? "rgba(139, 92, 246, 0.1)" : "transparent",
          }}
        />
      </div>
    </>
  )
}
