"use client"

import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur'
  delay?: number
  duration?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold })

  const animations = {
    'fade-up': {
      hidden: 'opacity-0 translate-y-20',
      visible: 'opacity-100 translate-y-0'
    },
    'fade-down': {
      hidden: 'opacity-0 -translate-y-20',
      visible: 'opacity-100 translate-y-0'
    },
    'fade-left': {
      hidden: 'opacity-0 translate-x-20',
      visible: 'opacity-100 translate-x-0'
    },
    'fade-right': {
      hidden: 'opacity-0 -translate-x-20',
      visible: 'opacity-100 translate-x-0'
    },
    'scale': {
      hidden: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100'
    },
    'blur': {
      hidden: 'opacity-0 blur-sm',
      visible: 'opacity-100 blur-0'
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all will-change-transform',
        isVisible ? animations[animation].visible : animations[animation].hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  threshold = 0.1
}: StaggerContainerProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold })

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                'transition-all will-change-transform',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{
                transitionDuration: '0.6s',
                transitionDelay: isVisible ? `${index * staggerDelay}s` : '0s',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
