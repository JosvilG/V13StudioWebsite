/**
 * Static cinematic backdrops for the detail subpages, echoing the atmosphere of
 * the homepage section each page expands. Rendered as an absolute layer behind
 * the page content (the page <main> must be `relative`). No scroll choreography
 * — these are decorative only.
 */

/**
 * Work atmosphere — copied faithfully from the homepage Work section: the central
 * white light glow + procedural drifting smoke (the "clouds"), the blueprint grid
 * and the ghost V13 wordmark. Static (always on) rather than scroll-driven.
 */
export function WorkBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04060a]">
      {/* blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(90,130,190,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90,130,190,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(120% 90% at 50% 50%, #000 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 50%, #000 30%, transparent 85%)",
        }}
      />

      {/* ── central light glow + procedural smoke (the clouds) ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.9 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 54% at 50% 47%, rgba(224,235,255,0.82) 0%, rgba(186,205,242,0.4) 30%, rgba(130,152,196,0.12) 58%, transparent 84%)",
            filter: "blur(58px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(20% 22% at 50% 47%, rgba(235,243,255,0.7) 0%, rgba(200,218,250,0.28) 45%, transparent 72%)",
            filter: "blur(34px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(60% 64% at 50% 47%, #000 0%, #000 34%, rgba(0,0,0,0.55) 64%, transparent 86%)",
            maskImage:
              "radial-gradient(60% 64% at 50% 47%, #000 0%, #000 34%, rgba(0,0,0,0.55) 64%, transparent 86%)",
            mixBlendMode: "screen",
          }}
        >
          <div
            className="absolute inset-[-18%]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='760'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0042 0.0065' numOctaves='6' seed='9'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.7 0 0 0 0 0.75 0 0 0 0 0.86 0 0 0 1.25 -0.58'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)'/%3E%3C/svg%3E\")",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "blur(4px)",
              opacity: 0.6,
              animation: "hero-fog-drift-1 95s ease-in-out infinite",
            }}
          />
          <div
            className="absolute inset-[-18%]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='760'%3E%3Cfilter id='s2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0072 0.011' numOctaves='6' seed='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.62 0 0 0 0 0.68 0 0 0 0 0.82 0 0 0 1.2 -0.62'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s2)'/%3E%3C/svg%3E\")",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "blur(7px)",
              opacity: 0.38,
              animation: "hero-fog-drift-2 130s ease-in-out infinite reverse",
            }}
          />
        </div>
      </div>

      {/* ghost V13 wordmark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-light.png"
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 w-[42vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07]"
        style={{ filter: "blur(0.5px)" }}
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
