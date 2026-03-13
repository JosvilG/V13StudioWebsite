"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function MagneticButton({ children, className, onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
  }

  const baseClass = cn(
    "relative inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.2em] font-medium",
    "border border-white/20 bg-transparent text-white",
    "overflow-hidden group",
    "hover:border-primary transition-colors duration-300",
    className
  )

  const content = (
    <>
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-primary">
        {children}
      </span>
      <div className="absolute inset-0 bg-white/5 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
    </>
  )

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClass}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={baseClass}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
