'use client'

import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Model from "./model"

export function Viewer() {
    return (
        <Canvas camera={{ position: [100, 100, 100], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[100, 100, 100]} intensity={2} />

            <Suspense fallback={null}>
                <Model />
            </Suspense>

            <OrbitControls />

            <Environment preset="studio" />
        </Canvas>
    )
}