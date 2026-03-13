/**
 * Navigate to a section inside a SectionStack by its id.
 * Uses Lenis for smooth inertia scrolling if available.
 */
export function navigateToSection(href: string) {
  const stack = document.querySelector("[data-section-stack]") as HTMLElement | null

  if (stack) {
    const totalSections = Number(stack.dataset.sectionCount) || 1
    const containerHeight = stack.offsetHeight
    const scrollableDistance = containerHeight - window.innerHeight
    const containerTop = stack.offsetTop

    const targetId = href.replace("#", "")
    const allSlots = stack.querySelectorAll("[data-stack-index]")
    let targetIndex = -1

    allSlots.forEach((slot) => {
      const section = slot.querySelector(`#${targetId}`)
      if (section) {
        targetIndex = Number((slot as HTMLElement).dataset.stackIndex)
      }
    })

    if (targetIndex >= 0) {
      const scrollTo = containerTop + (targetIndex / (totalSections - 1)) * scrollableDistance

      // Use Lenis if available for smooth inertia scrolling
      const lenis = (window as unknown as Record<string, unknown>).__lenis as {
        scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void
      } | undefined

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

  // Fallback
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}
