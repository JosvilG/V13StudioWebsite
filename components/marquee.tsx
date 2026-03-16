"use client"

interface MarqueeProps {
  items: string[]
  speed?: number
  separator?: string
  className?: string
  reverse?: boolean
}

export function Marquee({
  items,
  speed = 30,
  separator = "\u00b7",
  className = "",
  reverse = false,
}: MarqueeProps) {
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div
      className={`overflow-hidden py-6 border-y border-border ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <div
        className="flex whitespace-nowrap w-max group"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.animationPlayState = "running")
        }
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && (
              <span className="text-primary mx-6">{separator}</span>
            )}
            <span className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {item}
            </span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
