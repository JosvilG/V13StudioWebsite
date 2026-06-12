"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"
import type { Group, InstancedMesh } from "three"
import { V13Model } from "./v13-model"

/** Scroll progress 0..1 across the first viewport. */
function scrollProgress() {
  if (typeof window === "undefined") return 0
  return Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
}

const PARTICLE_COUNT = 240
const SPREAD_X = 34
const SPREAD_Y = 22

/** Soft radial sprite so each particle reads as a smoke puff, not a hard square. */
function makeSmokeSprite() {
  const size = 128
  const c = document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")!
  const r = size / 2
  const g = ctx.createRadialGradient(r, r, 0, r, r, r)
  // tight core with a quick falloff = small puff, minimal outer glow halo
  g.addColorStop(0, "rgba(255,255,255,0.5)")
  g.addColorStop(0.12, "rgba(255,255,255,0.22)")
  g.addColorStop(0.32, "rgba(255,255,255,0.04)")
  g.addColorStop(0.5, "rgba(255,255,255,0)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true
  return tex
}

/**
 * Drifting smoke field that streams toward the camera as the user scrolls.
 * Uses instanced camera-facing quads (not gl points) so each puff is a soft
 * textured sprite at any size — no driver point-size limits / square clamping.
 * The camera never rotates and only looks down -Z, so XY-aligned planes always
 * face it (no per-instance billboarding needed).
 */
function Particles() {
  const ref = useRef<InstancedMesh>(null)
  const scroll = useRef(0)
  const sprite = useMemo(makeSmokeSprite, [])
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const data = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * SPREAD_X,
      y: (Math.random() - 0.5) * SPREAD_Y,
      z: -42 + Math.random() * 60,
      s: 0.4 + Math.random() * 1.0,
    }))
  }, [])

  useFrame((_, delta) => {
    const mesh = ref.current
    if (!mesh) return
    scroll.current += (scrollProgress() - scroll.current) * Math.min(1, delta * 6)
    const p = scroll.current
    const dz = (0.6 + p * 11) * delta
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const d = data[i]
      d.z += dz
      if (d.z > 13) {
        d.z = -42
        d.x = (Math.random() - 0.5) * SPREAD_X
        d.y = (Math.random() - 0.5) * SPREAD_Y
      }
      dummy.position.set(d.x, d.y, d.z)
      dummy.scale.setScalar(d.s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PARTICLE_COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={sprite}
        color="#b9c4da"
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.NormalBlending}
        toneMapped={false}
      />
    </instancedMesh>
  )
}

const BASE_SCALE = 0.016

function SpinningLogo() {
  const ref = useRef<Group>(null)
  const scroll = useRef(0)

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return

    // scroll progress 0..1 across the first viewport, smoothed
    scroll.current += (scrollProgress() - scroll.current) * Math.min(1, delta * 6)
    const p = scroll.current
    const t = state.clock.elapsedTime

    // idle oscillation + a touch of scroll-driven rotation (stays readable as it approaches)
    g.rotation.y = Math.sin(t * 0.5) * 0.26 + p * 0.85
    g.rotation.x = Math.sin(t * 0.35) * 0.07 + p * 0.05
    // fly toward the camera (z 0 -> past camera at 18) so it rushes in and the camera passes through it
    g.position.z = p * 20
    g.position.y = p * 1.0
    g.scale.setScalar(BASE_SCALE)
  })

  // SVG is 500 units wide; scale down to a handful of world units
  return (
    <group ref={ref} scale={BASE_SCALE}>
      <V13Model />
    </group>
  )
}

/**
 * Smooth equirectangular gradient environment (no network HDRs). A flat chrome
 * face reflects this as a clean tonal gradient instead of discrete light shapes,
 * so the polished faces never break up into "diamond" reflection patches.
 */
function makeEnvTexture() {
  const c = document.createElement("canvas")
  c.width = 1024
  c.height = 512
  const ctx = c.getContext("2d")!
  // smooth, monotonic top->bottom gradient (NO hard horizon band, or a mirror
  // face would reflect that band as a visible line)
  // high-contrast but smooth/monotonic: bright sky -> dark ground gives a true
  // chrome look (bright highlights + dark reflections) without any hard band
  const g = ctx.createLinearGradient(0, 0, 0, 512)
  g.addColorStop(0, "#fbfdff")
  g.addColorStop(0.28, "#cdd6e8")
  g.addColorStop(0.5, "#7e8aa0")
  g.addColorStop(0.72, "#363c49")
  g.addColorStop(1, "#0c0f14")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 1024, 512)
  // soft overhead key light (very diffuse so it never reads as an edge)
  const rg = ctx.createRadialGradient(512, 70, 0, 512, 70, 380)
  rg.addColorStop(0, "rgba(255,255,255,0.95)")
  rg.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = rg
  ctx.fillRect(0, 0, 1024, 512)
  const tex = new THREE.CanvasTexture(c)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function StudioEnv() {
  const envMap = useMemo(makeEnvTexture, [])
  return <Environment map={envMap} />
}

export default function LogoCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 8, 6]} intensity={2.2} />
        <directionalLight position={[-6, -2, 4]} intensity={1.1} color="#b4a2ea" />
        <Particles />
        <SpinningLogo />
        <StudioEnv />
      </Suspense>
    </Canvas>
  )
}
