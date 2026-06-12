'use client'

import { useEffect } from 'react'
import { navigateToSection } from '@/lib/navigate-stack'

/**
 * When the homepage loads with a hash (e.g. arriving back from /work via the
 * `#work` back-link), scroll to that choreographed section once the SectionStack
 * has been laid out — then strip the hash so a refresh starts clean.
 */
export function HomeHashScroll() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash.length < 2) return

    let tries = 0
    let raf = 0
    const tryScroll = () => {
      const stack = document.querySelector('[data-section-stack]') as HTMLElement | null
      if (stack && stack.offsetHeight > window.innerHeight) {
        navigateToSection(hash)
        history.replaceState(null, '', window.location.pathname + window.location.search)
        return
      }
      if (tries++ < 60) raf = requestAnimationFrame(tryScroll)
    }
    raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}
