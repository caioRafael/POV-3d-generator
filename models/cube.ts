// models/cube.ts

import { colorize } from "@jscad/modeling/src/colors"
import { cuboid } from "@jscad/modeling/src/primitives"

export function createModel() {
    return colorize([1, 0, 0], cuboid({
        size: [20, 20, 20],
    }))
}