'use client'

import { useEffect, useLayoutEffect } from 'react'

type LenisLike = {
  scrollTo: (t: number, o?: { immediate?: boolean; force?: boolean }) => void
  resize?: () => void
  stop?: () => void
  start?: () => void
}

// Runs before paint on the client; falls back to useEffect during SSR.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Forces the viewport to the top when a subpage mounts. Lenis persists across
 * navigation and keeps the (often huge) scroll target from the homepage section
 * the user came from; if the browser resets window.scrollY a beat later than Lenis
 * re-syncs, Lenis clamps that stale target to the shorter subpage and opens it
 * scrolled to the bottom. We stop Lenis, hard-reset to the top, then restart it
 * from 0 — taking Lenis out of the race entirely.
 */
export function ScrollReset() {
  useIsoLayoutEffect(() => {
    const lenis = (window as unknown as Record<string, unknown>).__lenis as LenisLike | undefined

    const hardTop = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      lenis?.resize?.()
      lenis?.scrollTo(0, { immediate: true, force: true })
    }

    lenis?.stop?.()
    hardTop()

    // Restart Lenis on the next frame, once it's settled at the top.
    const raf = requestAnimationFrame(() => {
      hardTop()
      lenis?.start?.()
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis?.start?.() // never leave Lenis stopped if we unmount mid-reset
    }
  }, [])

  return null
}
