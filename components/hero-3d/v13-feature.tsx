"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import type { Group } from "three"
import { V13Model } from "./v13-model"

const FEATURE_SCALE = 0.0132

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3)
}

/** Chrome V13: eases in very gently on mount, then an almost-imperceptible float. */
function FeatureLogo() {
  const ref = useRef<Group>(null)
  const reveal = useRef(0)

  useFrame((_, delta) => {
    const g = ref.current
    if (!g) return
    reveal.current = Math.min(1, reveal.current + delta * 0.4)
    const e = easeOutCubic(reveal.current)
    // global time so two instances (statement + capabilities slides) stay in sync
    // and the crossfade between them only swaps the text, never the V13
    const t = performance.now() / 1000

    g.scale.setScalar(FEATURE_SCALE * (0.94 + 0.06 * e))
    g.position.set(0.4, Math.sin(t * 0.35) * 0.12 - (1 - e) * 0.4, 0)
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
