"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

interface ThemeLogoProps {
  size?: number
  className?: string
  /** If true, renders at very low opacity for background decoration */
  ghost?: boolean
}

/**
 * Renders the V13 logo, switching between dark and light variants
 * based on the current theme.
 *
 * - Dark theme → light logo (/logo-light.png)
 * - Light theme → dark logo (/logo-dark.png)
 */
export function ThemeLogo({ size = 40, className = "", ghost = false }: ThemeLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mount, render a transparent placeholder to avoid layout shift
  if (!mounted) {
    return <div style={{ width: size, height: size }} className={className} />
  }

  const src = resolvedTheme === "dark" ? "/logo-light.png" : "/logo-dark.png"

  return (
    <Image
      src={src}
      alt="V13 Studio"
      width={size}
      height={size}
      className={`${className} ${ghost ? "opacity-[0.04]" : ""}`}
      style={{ objectFit: "contain" }}
      priority
    />
  )
}
