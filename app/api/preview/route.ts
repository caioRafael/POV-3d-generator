import { execFile } from "child_process"
import { promisify } from "util"
import path from "path"

const execFileAsync = promisify(execFile)

const OPENSCAD = "/Applications/OpenSCAD.app/Contents/MacOS/OpenSCAD"

export async function POST(request: Request) {
    const {
        nameText,
        textSize,
        textHeight,
        textColor,
        baseHeight,
        baseColor
    } = await request.json()

    const scadFile = path.join(process.cwd(), "openscad", "name.scad")
    const outputFile = path.join(process.cwd(), "openscad", "preview.stl")

    const definitions = {
        name_text: nameText,
        text_size: textSize,
        text_height: textHeight,
        text_color: textColor,
        base_height: baseHeight,
        base_color: baseColor,
    }

    const args = ["-o", outputFile]

    for (const [key, value] of Object.entries(definitions)) {
        const scadValue = typeof value === "string" ? `"${value}"` : value
        args.push("-D", `${key}=${scadValue}`)
    }

    args.push(scadFile)

    await execFileAsync(OPENSCAD, args)

    const stl = await import("fs/promises").then((fs) => fs.readFile(outputFile))

    return new Response(stl, {
        headers: { "Content-Type": "application/stl" },
    })
}
