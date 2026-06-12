/**
 * Navigate to a section inside a SectionStack by its id.
 *
 * The stack lays sections out by *span* (each child occupies N viewports of
 * scroll), not by equal index, and several anchors (#work / #process / #about)
 * live inside the SAME combined Work section at different points of its
 * scroll-scrubbed choreography. So we map an anchor to a scroll position using
 * the slot's span start + a local fraction within that span.
 *
 * Uses Lenis for smooth inertia scrolling if available.
 */

// Where inside the Work section's span each sub-anchor should land (0..1 of the
// span). Mirrors the choreography in components/sections/work.tsx (projects ~0.1,
// process ~0.45, nosotros ~0.85). A plain section anchor lands near its start.
const LOCAL_BY_ANCHOR: Record<string, number> = {
  process: 0.46,
  about: 0.86,
}
const DEFAULT_LOCAL = 0.12

export function navigateToSection(href: string) {
  const targetId = href.replace("#", "")
  const stack = document.querySelector("[data-section-stack]") as HTMLElement | null

  if (stack) {
    const totalSpan =
      Number(stack.dataset.totalSpan) || Number(stack.dataset.sectionCount) || 1
    const scrollableDistance = stack.offsetHeight - window.innerHeight
    const containerTop = stack.offsetTop

    // Find the slot (stack child) that contains the anchor.
    let slot: HTMLElement | null = null
    stack.querySelectorAll("[data-stack-index]").forEach((s) => {
      if (s.querySelector(`#${CSS.escape(targetId)}`)) slot = s as HTMLElement
    })

    if (slot && scrollableDistance > 0 && totalSpan > 1) {
      const spanStart = Number((slot as HTMLElement).dataset.spanStart) || 0
      const span = Number((slot as HTMLElement).dataset.span) || 1
      const local = LOCAL_BY_ANCHOR[targetId] ?? DEFAULT_LOCAL
      const pos = spanStart + local * span
      const scrollTo = containerTop + (pos / (totalSpan - 1)) * scrollableDistance

      const lenis = (window as unknown as Record<string, unknown>).__lenis as
        | {
            scrollTo: (
              target: number,
              options?: { duration?: number; easing?: (t: number) => number }
            ) => void
          }
        | undefined

      if (lenis) {
        lenis.scrollTo(scrollTo, {
          duration: 1.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        })
      } else {
        window.scrollTo({ top: scrollTo, behavior: "smooth" })
      }
      return
    }
  }

  // Fallback: mobile flow, or sections outside the stack (e.g. #contact).
  const element = document.querySelector(href)
  if (element) element.scrollIntoView({ behavior: "smooth" })
}
