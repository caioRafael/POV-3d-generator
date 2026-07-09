'use client'

import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/Addons.js";
import { usePreview } from "./preview-context";

export default function Model() {
    const { version } = usePreview();
    const geometry = useLoader(STLLoader, `/openscad/preview.stl?v=${version}`);

    geometry.computeVertexNormals();
    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial color="#cccccc" metalness={0.2} roughness={0.6} />
        </mesh>
    )
}