"use client"

/** Shared cinematic backdrop for the Services statement + Capabilities slides. */
export function ServicesBackdrop() {
  return (
    <>
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Drifting smoke + soft light shaft + scan line */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div
          className="absolute right-[18%] top-[8%] h-[620px] w-[760px] rounded-full opacity-45"
          style={{
            background: "radial-gradient(circle, rgba(150,165,195,0.4) 0%, transparent 68%)",
            filter: "blur(70px)",
            animation: "hero-fog-drift-1 24s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[34%] bottom-[10%] h-[480px] w-[560px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(124,159,214,0.34) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "hero-fog-drift-2 30s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[8%] top-[36%] h-[420px] w-[480px] rounded-full opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(170,182,205,0.3) 0%, transparent 72%)",
            filter: "blur(80px)",
            animation: "hero-fog-drift-1 34s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Volumetric smoke (procedural turbulence), drifting, masked to centre */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(60% 60% at 55% 50%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 80%)",
          maskImage:
            "radial-gradient(60% 60% at 55% 50%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 80%)",
          mixBlendMode: "screen",
        }}
      >
        <div
          className="absolute inset-[-30%]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.011 0.018' numOctaves='4' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.62 0 0 0 0 0.76 0 0 0 1.1 -0.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)'/%3E%3C/svg%3E\")",
            backgroundSize: "760px 760px",
            filter: "blur(8px)",
            opacity: 0.28,
            animation: "hero-fog-drift-1 32s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-[-30%]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='s2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015 0.024' numOctaves='5' seed='23' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.5 0 0 0 0 0.58 0 0 0 0 0.72 0 0 0 1 -0.52'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s2)'/%3E%3C/svg%3E\")",
            backgroundSize: "900px 900px",
            filter: "blur(10px)",
            opacity: 0.2,
            animation: "hero-fog-drift-2 44s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Vignette (lighter, for a more translucent feel) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(130% 95% at 30% 45%, transparent 45%, rgba(0,0,0,0.32) 100%)",
        }}
      />
    </>
  )
}
