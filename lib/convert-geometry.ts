import { geom3, poly3 } from "@jscad/modeling/src/geometries";

function createFace(polygon: poly3.Poly3) {
    const triangles = [];

    const vertices = polygon.vertices;

    for (let i = 1; i < vertices.length - 1; i++) {

        triangles.push(
            vertices[0],
            vertices[i],
            vertices[i + 1]
        )

    }

    return triangles;
}

export function convertGeometry(geometry: geom3.Geom3) {
    const polygons = geom3.toPolygons(geometry);

    const positions: number[] = []

    polygons.forEach((polygon) => {
        const triangleVertices = createFace(polygon);

        triangleVertices.forEach((vertex) => {
            positions.push(vertex[0], vertex[1], vertex[2]);
        });
    });

    return { positions, color: geometry.color };
}
