'use client'

import { convertGeometry } from "@/lib/convert-geometry";
import { createModel } from "@/models/cube";
import { BufferGeometry, Color, Float32BufferAttribute } from "three";

export default function Model() {
    const { positions, color } = convertGeometry(createModel())

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();

    const materialColor = color
        ? new Color(color[0], color[1], color[2])
        : new Color("#cccccc");

    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial color={materialColor} metalness={0.2} roughness={0.6} />
        </mesh>
    );
}
