'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

type LenisLike = {
  scrollTo: (t: number, o?: { immediate?: boolean; force?: boolean }) => void
  resize?: () => void
}

// Runs before paint on the client; falls back to useEffect during SSR.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Forces the viewport to the top when a subpage mounts. Lenis persists across
 * navigation and keeps the (often huge) scroll target from the homepage section
 * the user came from; without this it clamps to the shorter subpage's height and
 * opens scrolled to the bottom. We reset before paint and re-assert for a few
 * frames so Lenis can't win the race — short enough not to fight the user.
 */
export function ScrollReset() {
  const rafRef = useRef(0)

  useIsoLayoutEffect(() => {
    const lenis = (window as unknown as Record<string, unknown>).__lenis as LenisLike | undefined
    let frame = 0

    const reset = () => {
      window.scrollTo(0, 0)
      lenis?.resize?.()
      lenis?.scrollTo(0, { immediate: true, force: true })
      if (frame++ < 6) rafRef.current = requestAnimationFrame(reset)
    }

    reset()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return null
}
