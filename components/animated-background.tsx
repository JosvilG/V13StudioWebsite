"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  pulseSpeed: number
  pulseOffset: number
}

/**
 * Full-screen animated particle constellation background.
 * Renders on a fixed canvas behind all content.
 * Adapts colors to the current theme (light/dark).
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const { resolvedTheme } = useTheme()
  const themeRef = useRef(resolvedTheme)

  // Keep theme ref in sync without re-running the animation setup
  useEffect(() => {
    themeRef.current = resolvedTheme
  }, [resolvedTheme])

  const initParticles = useCallback((width: number, height: number) => {
    // ~1 particle per 18000px² → enough density without killing performance
    const count = Math.min(120, Math.floor((width * height) / 18000))
    const particles: Particle[] = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }
    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(window.innerWidth, window.innerHeight)
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouse, { passive: true })

    let time = 0
    const CONNECTION_DIST = 140
    const MOUSE_DIST = 200

    const draw = () => {
      time++
      const w = window.innerWidth
      const h = window.innerHeight
      const isDark = themeRef.current === "dark"
      const particles = particlesRef.current
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, w, h)

      // Color palette
      const baseR = isDark ? 139 : 124
      const baseG = isDark ? 92 : 58
      const baseB = isDark ? 246 : 237
      const cyanR = isDark ? 6 : 6
      const cyanG = isDark ? 182 : 182
      const cyanB = isDark ? 212 : 212

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Subtle mouse repulsion
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < MOUSE_DIST && mDist > 0) {
          const force = (1 - mDist / MOUSE_DIST) * 0.015
          p.vx += (mdx / mDist) * force
          p.vy += (mdy / mDist) * force
        }

        // Damping to prevent runaway velocity
        p.vx *= 0.999
        p.vy *= 0.999

        // Pulsing opacity
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3 + 0.7
        const alpha = p.opacity * pulse * (isDark ? 0.6 : 0.35)

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${alpha})`
        ctx.fill()

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * (isDark ? 0.12 : 0.06)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Mouse connection lines
        if (mDist < MOUSE_DIST) {
          const lineAlpha = (1 - mDist / MOUSE_DIST) * (isDark ? 0.25 : 0.15)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${lineAlpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
