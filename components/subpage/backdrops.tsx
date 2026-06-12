/**
 * Static cinematic backdrops for the detail subpages, echoing the atmosphere of
 * the homepage section each page expands. Rendered as an absolute layer behind
 * the page content (the page <main> must be `relative`). No scroll choreography
 * — these are decorative only.
 */

/** Work atmosphere: dark base + blueprint grid + drifting fog (from the Work section). */
export function WorkBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* blueprint grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(90,130,190,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90,130,190,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(120% 90% at 50% 30%, #000 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 30%, #000 30%, transparent 85%)",
        }}
      />
      {/* fog blobs */}
      <div
        className="absolute right-[16%] top-[6%] h-[560px] w-[680px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(130,152,196,0.34) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "hero-fog-drift-1 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-[6%] top-[42%] h-[460px] w-[520px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(146,104,246,0.22) 0%, transparent 72%)",
          filter: "blur(90px)",
          animation: "hero-fog-drift-2 40s ease-in-out infinite reverse",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(130% 95% at 50% 30%, transparent 50%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  )
}

/** About atmosphere: a static poster frame of the studio video + dark overlay. */
export function AboutBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/background.mp4#t=3"
        muted
        playsInline
        preload="metadata"
        aria-hidden
        tabIndex={-1}
        style={{ filter: "grayscale(0.35) brightness(0.42) contrast(1.05)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,6,10,0.88) 0%, rgba(4,6,10,0.76) 40%, rgba(4,6,10,0.93) 100%)",
        }}
      />
    </div>
  )
}
