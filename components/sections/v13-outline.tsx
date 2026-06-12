"use client"

import { useEffect, useRef, useState } from "react"
import { V13_PATH } from "./v13-path"

export function V13Outline() {
  const ref = useRef<SVGSVGElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="232 348 560 312"
      className="h-auto w-[min(78vw,760px)]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="v13-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cabfff" />
          <stop offset="50%" stopColor="#9268f6" />
          <stop offset="100%" stopColor="#b9a6f5" />
        </linearGradient>
        {/* shaped glow — blur stays inside the SVG (no square CSS-filter layer) */}
        <filter id="v13-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* soft shaped halo behind the line, breathing opacity */}
      <path
        d={V13_PATH}
        fill="none"
        stroke="url(#v13-stroke)"
        strokeWidth={5}
        strokeLinejoin="round"
        filter="url(#v13-glow)"
        style={{
          opacity: inView ? undefined : 0,
          animation: inView ? "contact-logo-glow 4.5s ease-in-out 3.2s infinite" : undefined,
        }}
      />

      {/* self-drawing crisp outline */}
      <path
        d={V13_PATH}
        pathLength={1}
        fill="none"
        stroke="url(#v13-stroke)"
        strokeWidth={4}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          strokeDasharray: "1 1",
          strokeDashoffset: inView ? 0 : 1,
          animation: inView ? "contact-logo-drawin 3.2s ease-out forwards" : undefined,
        }}
      />
    </svg>
  )
}
