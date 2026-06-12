'use client'

import { useEffect } from 'react'

type LenisLike = { scrollTo: (t: number, o?: { immediate?: boolean }) => void }

// Where inside each section's span the back-link should land (0..1 of the span).
// Mirrors the choreography: services statement, work projects, about "nosotros".
const LOCAL_BY_ANCHOR: Record<string, number> = {
  services: 0.1,
  work: 0.1,
  process: 0.46,
  about: 0.88,
}

/**
 * When the homepage loads with a hash (arriving back from a subpage via its
 * `#services` / `#work` / `#about` back-link), scroll to that choreographed
 * section. Waits until BOTH the SectionStack is laid out AND Lenis exists, then
 * scrolls immediately (so Lenis doesn't fight a native smooth-scroll), retrying a
 * couple of times to defeat any late scroll restoration.
 */
export function HomeHashScroll() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash.length < 2) return
    const id = hash.slice(1)

    let raf = 0
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

    const apply = () => {
      const lenis = (window as unknown as Record<string, unknown>).__lenis as LenisLike | undefined
      const target = compute()
      if (target == null || !lenis) {
        if (tries++ < 90) raf = requestAnimationFrame(apply)
        return
      }
      lenis.scrollTo(target, { immediate: true })
      history.replaceState(null, '', window.location.pathname + window.location.search)
      // Re-assert a couple of times in case Next/Lenis restore scroll just after.
      setTimeout(() => lenis.scrollTo(target, { immediate: true }), 120)
      setTimeout(() => lenis.scrollTo(target, { immediate: true }), 400)
    }

    raf = requestAnimationFrame(apply)
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}
