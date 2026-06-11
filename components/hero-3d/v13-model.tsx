"use client"

import { useMemo } from "react"
import { useLoader, type ThreeElements } from "@react-three/fiber"
// SVGLoader ships with three's example modules
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - no bundled types for the jsm example loaders
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import * as THREE from "three"

/**
 * Loads the (cleanly vectorized) V13 logo SVG and extrudes its Bézier outline
 * into a crisp 3D mesh with a polished chrome material. The SVG is a real curve
 * trace (not a bitmap staircase), so curves stay smooth and diagonals stay
 * straight with no per-segment faceting. viewBox is 0 0 1024 1024.
 */
export function V13Model(props: ThreeElements["mesh"]) {
  const data = useLoader(SVGLoader, "/logo-3d.svg") as { paths: unknown[] }

  const geometry = useMemo(() => {
    const shapes: THREE.Shape[] = []
    for (const path of data.paths) {
      const pathShapes = SVGLoader.createShapes(path as never) as THREE.Shape[]
      shapes.push(...pathShapes)
    }

    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 78,
      bevelEnabled: true,
      bevelThickness: 12,
      bevelSize: 6,
      bevelSegments: 4,
      curveSegments: 16,
    })
    geo.center()
    // keep ExtrudeGeometry's own normals: flat caps stay uniform, the high-res
    // Bézier walls read smooth
    return geo
  }, [data])

  return (
    // SVG space is Y-down; flip Y so the logo is upright in three's Y-up space
    <mesh geometry={geometry} scale={[1, -1, 1]} {...props}>
      <meshStandardMaterial
        color="#dfe3ea"
        metalness={1}
        roughness={0.16}
        envMapIntensity={1.4}
      />
    </mesh>
  )
}
