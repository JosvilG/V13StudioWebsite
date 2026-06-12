/** Desktop + WebGL + motion-allowed gate for the heavier 3D scenes. */
export function can3D(): boolean {
  if (typeof window === "undefined") return false
  if (window.innerWidth < 1024) return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  try {
    const canvas = document.createElement("canvas")
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))
  } catch {
    return false
  }
}
