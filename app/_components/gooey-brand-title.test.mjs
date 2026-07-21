import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const componentSource = await readFile(new URL("./gooey-brand-title.tsx", import.meta.url), "utf8")

function numericConstant(name) {
    const match = componentSource.match(new RegExp(`const ${name} = ([\\d.]+)`))
    assert.ok(match, `Missing numeric constant: ${name}`)

    return Number(match[1])
}

test("brand logo viewBox contains the complete filtered digit geometry", () => {
    const viewBoxMatch = componentSource.match(/const brandViewBox = "([^"]+)"/)
    const digitEightMatch = componentSource.match(/key: "8",\s+path: "([^"]+)"/)
    const blurMatch = componentSource.match(/<feGaussianBlur[^>]+stdDeviation="([\d.]+)"/)

    assert.ok(viewBoxMatch, "Missing brand viewBox")
    assert.ok(digitEightMatch, "Missing digit 8 path")
    assert.ok(blurMatch, "Missing gooey blur filter")

    const [, viewBoxY, , viewBoxHeight] = viewBoxMatch[1].split(/\s+/).map(Number)
    const pathCoordinates = [...digitEightMatch[1].matchAll(/-?[\d.]+/g)].map(([value]) => Number(value))
    const pathYCoordinates = pathCoordinates.filter((_, index) => index % 2 === 1)
    const digitPathBottom = Math.max(...pathYCoordinates)
    const digitRadius = 7.4 * numericConstant("digitThickness") * numericConstant("thinnerScale")
    const filteredDigitBottom = digitPathBottom
        + digitRadius * numericConstant("thicknessBoost")
        + Number(blurMatch[1]) * 3
    const viewBoxBottom = viewBoxY + viewBoxHeight

    assert.ok(
        viewBoxBottom >= filteredDigitBottom,
        `Brand viewBox bottom ${viewBoxBottom.toFixed(1)} clips filtered digit geometry ending at ${filteredDigitBottom.toFixed(1)}`,
    )
})
