'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Bidirectional scroll reveal: fades + slides its children in when they enter the
 * viewport and back out when they leave — in BOTH scroll directions (unlike the
 * one-shot ScrollReveal). Used to make subpage blocks appear as you scroll.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '0px 0px -12% 0px' },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
