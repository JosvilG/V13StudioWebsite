'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type LenisLike = {
  scrollTo: (t: number, o?: { immediate?: boolean }) => void
  resize?: () => void
}

// Runs before paint on the client; falls back to useEffect during SSR.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Where inside each section's span the back-link should land (0..1 of the span).
const LOCAL_BY_ANCHOR: Record<string, number> = {
  services: 0.1,
  work: 0.1,
  process: 0.46,
  about: 0.85,
}

/**
 * When the homepage loads with a hash (arriving back from a subpage via its
 * `#services` / `#work` / `#about` back-link), scroll to that choreographed
 * section — under a dark cover so the user never sees the page flash at the top
 * and then jump down. The cover is raised before the first paint, the scroll is
 * applied immediately (so Lenis doesn't fight a smooth-scroll), then the cover
 * fades out.
 */
export function HomeHashScroll() {
  const [cover, setCover] = useState<'off' | 'on' | 'fading'>('off')
  const rafRef = useRef(0)

  useIsoLayoutEffect(() => {
    const hash = window.location.hash
    if (!hash || hash.length < 2) return
    const id = hash.slice(1)
    setCover('on')

    let tries = 0

    const compute = (): number | null => {
      const stack = document.querySelector('[data-section-stack]') as HTMLElement | null
      if (!stack) return null
      const scrollable = stack.offsetHeight - window.innerHeight
      if (scrollable < window.innerHeight) return null // not laid out yet

      let slot: HTMLElement | null = null
      stack.querySelectorAll('[data-stack-index]').forEach((s) => {
        if ((s as HTMLElement).querySelector(`#${CSS.escape(id)}`)) slot = s as HTMLElement
      })
      if (!slot) return null

      const spanStart = Number((slot as HTMLElement).dataset.spanStart) || 0
      const span = Number((slot as HTMLElement).dataset.span) || 1
      const totalSpan = Number(stack.dataset.totalSpan) || 1
      if (totalSpan <= 1) return null
      const local = LOCAL_BY_ANCHOR[id] ?? 0.1
      const pos = spanStart + local * span
      return stack.offsetTop + (pos / (totalSpan - 1)) * scrollable
    }

    const reveal = () => {
      setCover('fading')
      window.setTimeout(() => setCover('off'), 360)
    }

    const apply = () => {
      const lenis = (window as unknown as Record<string, unknown>).__lenis as LenisLike | undefined
      const target = compute()
      if (target == null || !lenis) {
        if (tries++ < 120) {
          rafRef.current = requestAnimationFrame(apply)
        } else {
          reveal() // give up gracefully — never leave the cover stuck
        }
        return
      }
      // Lenis persists across navigation and caches the (short) subpage's
      // dimensions — without a resize it clamps a large target back near the top.
      lenis.resize?.()
      lenis.scrollTo(target, { immediate: true })
      history.replaceState(null, '', window.location.pathname + window.location.search)
      // Re-assert in case Next/Lenis restore scroll just after, then reveal.
      window.setTimeout(() => {
        lenis.resize?.()
        lenis.scrollTo(target, { immediate: true })
      }, 80)
      window.setTimeout(() => {
        lenis.resize?.()
        lenis.scrollTo(target, { immediate: true })
        reveal()
      }, 180)
    }

    rafRef.current = requestAnimationFrame(apply)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  if (cover === 'off') return null
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[150] bg-[#04060a] transition-opacity duration-300 ease-out"
      style={{ opacity: cover === 'fading' ? 0 : 1, pointerEvents: cover === 'fading' ? 'none' : 'auto' }}
    />
  )
}
