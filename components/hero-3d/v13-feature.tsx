"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import type { Group } from "three"
import { V13Model } from "./v13-model"
import { transition } from "@/lib/transition-store"

const FEATURE_SCALE = 0.0132

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3)
}

/** Chrome V13: eases in very gently on mount, then an almost-imperceptible float. */
function FeatureLogo() {
  const ref = useRef<Group>(null)
  const startRef = useRef<number | null>(null)

  useFrame(() => {
    const g = ref.current
    if (!g) return
    // global time → both instances stay in sync; time-based reveal is jump-free
    // even if frames are dropped while the section is hidden/scrolled
    const now = performance.now()
    if (startRef.current === null) startRef.current = now
    const e = easeOutCubic(Math.min(1, (now - startRef.current) / 1600))
    const t = now / 1000
    // big-bang collapse driven by Services scroll (scale the 3D group to a point)
    const c = Math.min(1, transition.collapse)
    const k = 1 - c

    g.scale.setScalar(FEATURE_SCALE * (0.94 + 0.06 * e) * (1 - Math.min(1, c * 1.05)))
    g.position.set(0.4 * k, (Math.sin(t * 0.35) * 0.12 - (1 - e) * 0.4) * k, 0)
    g.rotation.set(0.05, -0.26 + Math.sin(t * 0.22) * 0.035, 0)
  })

  return (
    <group ref={ref} scale={FEATURE_SCALE}>
      <V13Model materialProps={{ roughness: 0.16, envMapIntensity: 1.7 }} />
    </group>
  )
}

/** Static (centre-right) chrome V13 accent for the Services statement. */
export default function V13Feature() {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 9, 7]} intensity={1.8} />
        <directionalLight position={[-7, -3, 4]} intensity={0.9} color="#9fb6e6" />
        <FeatureLogo />
        {/* real studio HDRI → genuine chrome reflections (loads from CDN) */}
        <Environment preset="studio" environmentIntensity={2.2} />
      </Suspense>
    </Canvas>
  )
}
