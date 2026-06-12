'use client'

import { useEffect } from 'react'

type LenisLike = {
  scrollTo: (t: number, o?: { immediate?: boolean }) => void
  resize?: () => void
}

/**
 * Forces the viewport to the top when a subpage mounts. Without this, Lenis keeps
 * the (often large) scroll offset from the homepage section the user came from, so
 * the shorter subpage opens scrolled to the bottom.
 */
export function ScrollReset() {
  useEffect(() => {
    const lenis = (window as unknown as Record<string, unknown>).__lenis as LenisLike | undefined
    const reset = () => {
      window.scrollTo(0, 0)
      lenis?.resize?.()
      lenis?.scrollTo(0, { immediate: true })
    }
    reset()
    // Re-apply next frame in case Lenis re-syncs to the stale position.
    const raf = requestAnimationFrame(reset)
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}
