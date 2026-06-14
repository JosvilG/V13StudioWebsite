"use client"

import { useEffect, useState } from "react"
import { V13_PATH } from "./v13-path"

/**
 * Neon V13 mark that self-draws each time the menu opens.
 * Reuses the contact draw-in/glow keyframes from globals.css.
 * Keyed on `open` by the parent so the draw replays on every open.
 */
export function MenuV13({ open, className }: { open: boolean; className?: string }) {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduce(mq.matches)
    const on = () => setReduce(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  const draw = open && !reduce

  return (
    <svg
      viewBox="232 348 560 312"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="menu-v13-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cabfff" />
          <stop offset="50%" stopColor="#9268f6" />
          <stop offset="100%" stopColor="#b9a6f5" />
        </linearGradient>
        <filter id="menu-v13-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* soft halo, breathing opacity */}
      <path
        d={V13_PATH}
        fill="none"
        stroke="url(#menu-v13-stroke)"
        strokeWidth={5}
        strokeLinejoin="round"
        filter="url(#menu-v13-glow)"
        style={{
          opacity: reduce ? 0.4 : draw ? undefined : 0.35,
          animation: draw ? "contact-logo-glow 4.5s ease-in-out 3.2s infinite" : undefined,
        }}
      />

      {/* crisp self-drawing outline */}
      <path
        d={V13_PATH}
        pathLength={1}
        fill="none"
        stroke="url(#menu-v13-stroke)"
        strokeWidth={4}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          strokeDasharray: "1 1",
          strokeDashoffset: draw ? 0 : reduce ? 0 : 1,
          animation: draw ? "contact-logo-drawin 3.2s ease-out forwards" : undefined,
        }}
      />
    </svg>
  )
}
