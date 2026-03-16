"use client"

import React, { useRef, useCallback } from "react"

interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export default function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const offsetX = e.clientX - (rect.left + rect.width / 2)
      const offsetY = e.clientY - (rect.top + rect.height / 2)

      el.style.transition = "none"
      el.style.transform = `translate(${offsetX * strength}px, ${offsetY * strength}px)`
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return

    el.style.transition = "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)"
    el.style.transform = "translate(0px, 0px)"
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
