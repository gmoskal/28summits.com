"use client"

import { animate, useReducedMotion } from "motion/react"
import { useEffect, useId, useLayoutEffect, useRef } from "react"

type GooeyBrandTitleProps = {
    onAnimationComplete?: () => void
    onAnimationStart?: () => void
    replayToken?: number
}

type Glyph = {
    key: string
    path: string
    circleCount?: number
    radius?: number
    transform?: {
        scale: number
        x: number
        y: number
    }
}

const defaultCircleCount = 30
const startPoint = { x: 296, y: 96 } as const
const viewBox = "18 18 540 150"
const animationSpeedScale = 0.8
const appearDuration = 0.28 * animationSpeedScale
const circleStagger = 0.025 * animationSpeedScale
const glyphStagger = 0.16 * animationSpeedScale
const morphDuration = 0.9 * animationSpeedScale
const defaultCircleRadius = 8.2
const digitThickness = 2
const wordThickness = 2.4
const thinnerScale = 0.7
const thicknessBoost = 1.1
const pointCountBoost = 1.1
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

const glyphs = [
    {
        key: "2",
        path: "M35 77 C38 49 65 35 93 45 C118 54 123 78 105 101 C91 119 58 137 42 162 C59 157 86 156 117 160",
        circleCount: 29,
        radius: 7.4 * digitThickness * thinnerScale,
        transform: { scale: 1, x: -12, y: 0 },
    },
    {
        key: "8",
        path: "M180 52 C153 35 121 48 119 77 C117 103 145 114 174 106 C205 98 211 67 186 53 C158 37 128 55 130 83 C132 111 162 116 188 128 C217 142 218 171 194 186 C166 203 126 191 120 164 C115 140 137 121 170 119",
        circleCount: 52,
        radius: 7.4 * digitThickness * thinnerScale,
        transform: { scale: 1, x: 24, y: 0 },
    },
    {
        key: "G",
        path: "M376 61 C362 38 323 40 303 67 C284 92 293 131 322 140 C351 149 381 132 380 104 C365 104 349 107 339 119",
        circleCount: 26,
        radius: 6.1 * wordThickness * thinnerScale,
    },
    {
        key: "ó",
        path: "M437 84 C418 79 397 94 395 116 C393 138 414 149 436 139 C456 130 463 103 447 91 C434 81 413 89 407 108 M435 63 C443 55 448 49 453 42",
        circleCount: 22,
        radius: 5.8 * wordThickness * thinnerScale,
    },
    {
        key: "r",
        path: "M472 88 C474 105 480 126 492 142 C492 120 495 100 506 88 C516 78 530 82 532 96",
        circleCount: 14,
        radius: 5.7 * wordThickness * thinnerScale,
    },
] as const satisfies readonly Glyph[]

function circleCountForGlyph(glyph: Glyph) {
    return Math.round((glyph.circleCount ?? defaultCircleCount) * pointCountBoost)
}

function resetCircle(circle: SVGCircleElement | null) {
    if (!circle) {
        return
    }

    circle.setAttribute("cx", String(startPoint.x))
    circle.setAttribute("cy", String(startPoint.y))
    circle.setAttribute("r", "0")
    circle.setAttribute("opacity", "0")
}

function resetCircles(circleGroups: Array<Array<SVGCircleElement | null>>) {
    circleGroups.forEach((circles) => circles.forEach(resetCircle))
}

function animationDurationMs() {
    const durationSeconds = Math.max(
        ...glyphs.map((glyph, glyphIndex) => {
            const lastCircleIndex = circleCountForGlyph(glyph) - 1
            return appearDuration + glyphIndex * glyphStagger + lastCircleIndex * circleStagger + morphDuration
        }),
    )

    return Math.ceil(durationSeconds * 1000)
}

function pointOnGlyph(path: SVGPathElement, glyph: Glyph, circleIndex: number) {
    const glyphCircleCount = circleCountForGlyph(glyph)
    const step = path.getTotalLength() / glyphCircleCount
    const point = path.getPointAtLength(circleIndex * step)

    if (!glyph.transform) {
        return point
    }

    return {
        x: point.x * glyph.transform.scale + glyph.transform.x,
        y: point.y * glyph.transform.scale + glyph.transform.y,
    }
}

const animationCompleteDelayMs = animationDurationMs()

export function GooeyBrandTitle({ onAnimationComplete, onAnimationStart, replayToken = 0 }: GooeyBrandTitleProps) {
    const prefersReducedMotion = useReducedMotion()
    const reactId = useId()
    const filterId = `gooey-brand-title-${reactId.replaceAll(":", "")}`
    const pathRefs = useRef<Array<SVGPathElement | null>>([])
    const circleRefs = useRef<Array<Array<SVGCircleElement | null>>>([])

    useBrowserLayoutEffect(() => {
        resetCircles(circleRefs.current)
        onAnimationStart?.()

        const animations = glyphs.flatMap((glyph, glyphIndex) => {
            const path = pathRefs.current[glyphIndex]
            const circles = circleRefs.current[glyphIndex] ?? []
            if (!path) {
                return []
            }

            return circles.flatMap((circle, circleIndex) => {
                if (!circle) {
                    return []
                }

                const point = pointOnGlyph(path, glyph, circleIndex)
                const radius = (glyph.radius ?? defaultCircleRadius) * thicknessBoost

                if (prefersReducedMotion) {
                    circle.setAttribute("cx", String(point.x))
                    circle.setAttribute("cy", String(point.y))
                    circle.setAttribute("r", String(radius))
                    circle.setAttribute("opacity", "1")
                    return []
                }

                const morphStart = appearDuration + glyphIndex * glyphStagger + circleIndex * circleStagger
                const totalDuration = morphStart + morphDuration

                return animate(
                    circle,
                    {
                        cx: [startPoint.x, startPoint.x, startPoint.x, point.x],
                        cy: [startPoint.y, startPoint.y, startPoint.y, point.y],
                        opacity: [0, 1, 1, 1],
                        r: [0, radius, radius, radius],
                    },
                    {
                        duration: totalDuration,
                        ease: "easeOut",
                        times: [0, appearDuration / totalDuration, morphStart / totalDuration, 1],
                    },
                )
            })
        })
        const completeTimer = window.setTimeout(onAnimationComplete ?? (() => undefined), prefersReducedMotion ? 0 : animationCompleteDelayMs)

        return () => {
            window.clearTimeout(completeTimer)
            animations.forEach((animation) => animation.stop())
            resetCircles(circleRefs.current)
        }
    }, [onAnimationComplete, onAnimationStart, prefersReducedMotion, replayToken])

    return (
        <span
            aria-hidden="true"
            className="block h-[105px] w-[min(95vw,446px)] text-[var(--gooey-title-color)] xl:h-[163px] xl:w-[min(36vw,510px)]"
        >
            <svg
                aria-hidden="true"
                className="h-full w-full overflow-visible"
                focusable="false"
                viewBox={viewBox}
            >
                <defs>
                    <filter id={filterId} colorInterpolationFilters="sRGB" x="-18%" y="-42%" width="136%" height="184%">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="4.9" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            result="goo"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -12"
                        />
                    </filter>
                </defs>
                <g fill="none" opacity="0" pointerEvents="none" stroke="none">
                    {glyphs.map((glyph, index) => (
                        <path
                            key={glyph.key}
                            ref={(node) => {
                                pathRefs.current[index] = node
                            }}
                            d={glyph.path}
                        />
                    ))}
                </g>
                <g filter={`url(#${filterId})`}>
                    {glyphs.map((glyph, glyphIndex) =>
                        Array.from({ length: circleCountForGlyph(glyph) }, (_, circleIndex) => (
                            <circle
                                key={`${glyph.key}-${circleIndex}`}
                                ref={(node) => {
                                    if (!circleRefs.current[glyphIndex]) {
                                        circleRefs.current[glyphIndex] = []
                                    }
                                    circleRefs.current[glyphIndex][circleIndex] = node
                                }}
                                cx={startPoint.x}
                                cy={startPoint.y}
                                fill="currentColor"
                                opacity="0"
                                r="0"
                            />
                        )),
                    )}
                </g>
            </svg>
        </span>
    )
}
