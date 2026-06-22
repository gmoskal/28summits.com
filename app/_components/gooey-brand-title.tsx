"use client"

import { animate, motion, useReducedMotion } from "motion/react"
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react"

type GooeyBrandTitleProps = {
    onAnimationComplete?: () => void
    onAnimationStart?: () => void
    replayToken?: number
}

type Point = {
    x: number
    y: number
}

type GooeyFilterBounds = {
    height: string
    width: string
    x: string
    y: string
}

type GooeyPathPiece = {
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

type GooeyPathDrawingProps = {
    className: string
    filterBounds: GooeyFilterBounds
    filterIdPrefix: string
    onAnimationComplete?: () => void
    onAnimationStart?: () => void
    pieces: readonly GooeyPathPiece[]
    replayToken?: number
    startPoint: Point
    viewBox: string
}

type GooeyTextLogoProps = {
    animationDurationSeconds?: number
    className: string
    circleCount?: number
    fontFamily: TextLogoFontFamily
    fontSize?: number
    fontWeight: number
    letterSpacing?: number
    replayToken?: number
    text: string
}

type GooeyTextPoint = Point & {
    radius: number
}

type TextLogoBounds = {
    x1: number
    x2: number
    y1: number
    y2: number
}

type TextLogoGlyphMorph = {
    seed: number
}

type TextLogoGlyphRun = {
    dotHoldRatio: number
    dotTravelXRatio: number
    dotTravelYRatio: number
    endRatio: number
    pointDelayRatio: number
    seed: number
    sourceCenterXRatio: number
    sourceCenterYRatio: number
    sourceRadiusScale: number
    sourceSpreadXRatio: number
    sourceSpreadYRatio: number
    startRatio: number
    tiltDegrees: number
    tiltDurationRatio: number
}

type TextLogoGlyphPointMotion = {
    approachPoint: Point
    circle: SVGCircleElement
    driftPoint: Point
    fromPoint: Point
    fromRadius: number
    settlePoint: Point
    startOffsetRatio: number
    targetPoint: GooeyTextPoint
    targetRadius: number
}

type GooeyTextGlyph = {
    bounds: TextLogoBounds
    character: string
    index: number
    key: string
    morph: TextLogoGlyphMorph
    points: readonly GooeyTextPoint[]
}

type TextLogoGlyphSegment = {
    character: string
    index: number
    key: string
    points: GooeyTextPoint[]
    x1: number
    x2: number
}

type GooeyGlyphDrawingProps = {
    animationDurationSeconds?: number
    className: string
    filterBounds: GooeyFilterBounds
    filterIdPrefix: string
    glyphs: readonly GooeyTextGlyph[]
    replayToken?: number
    startPoint: Point
    viewBox: string
}

export type TextLogoFontFamily = "gloria" | "inter-og"

const defaultCircleCount = 30
const brandStartPoint = { x: 296, y: 96 } as const
const brandViewBox = "18 18 540 150"
const textLogoStartPoint = { x: 480, y: 180 } as const
const textLogoViewBox = "0 0 960 360"
const animationSpeedScale = 0.8
const appearDuration = 0.28 * animationSpeedScale
const circleStagger = 0.025 * animationSpeedScale
const pieceStagger = 0.16 * animationSpeedScale
const morphDuration = 0.9 * animationSpeedScale
const defaultCircleRadius = 8.2
const digitThickness = 2
const wordThickness = 2.4
const thinnerScale = 0.7
const thicknessBoost = 1.1
const pointCountBoost = 1.1
const textLogoCanvas = {
    height: 360,
    maxPointsPerGlyph: 1400,
    maxPointRadius: 5.6,
    minPointsPerGlyph: 96,
    minPointRadius: 4.35,
    defaultPointsPerGlyph: 720,
    sampleStep: 2,
    textAlphaThreshold: 48,
    textWidthPadding: 72,
    width: 960,
} as const
const defaultTextLogoAnimationDurationSeconds = 1.4
const defaultTextLogoFontSize = 116
const defaultTextLogoLetterSpacing = 0
const textLogoGlyphMinPointCount = 8
const textLogoGlyphRunSeedStep = 4099
const textLogoGlyphSourceSeedStep = 41
const textLogoGlyphSourceAngle = Math.PI * 2
const textLogoGlyphMinDurationRatio = 0.22
const textLogoGlyphStartRatioMax = 0.38
const textLogoGlyphEndRatioMax = 1
const textLogoGlyphTransitionMinDuration = 0.18
const textLogoGlyphDotHoldRange = {
    max: 0.42,
    min: 0.08,
} as const
const textLogoGlyphFrameTiming = {
    driftTimePadding: 0.015,
    driftTimeRatio: 0.44,
    minDriftTime: 0.035,
    settleStartRatio: 0.58,
} as const
const textLogoGlyphDrift = {
    distanceMinRatio: 0.1,
    distanceRangeRatio: 0.08,
    jitterMinRatio: 0.015,
    jitterRangeRatio: 0.02,
} as const
const textLogoGlyphPointDelay = {
    orderedShare: 0.18,
    randomShare: 0.82,
} as const
const textLogoGlyphSettleRatio = 0.9
const textLogoGlyphTilt = {
    durationMaxRatio: 0.9,
    durationMinRatio: 0.42,
    maxDegrees: 50,
    minDegrees: 12,
} as const
const textLogoFilterBlurDeviation = 3.5
const textLogoFilterMatrix = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9"
const textLogoWeightRange = {
    min: 300,
    max: 900,
} as const
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect
const noop = () => undefined

const brandFilterBounds = {
    x: "-18%",
    y: "-42%",
    width: "136%",
    height: "184%",
} as const satisfies GooeyFilterBounds

const brandGlyphs = [
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
] as const satisfies readonly GooeyPathPiece[]

const scrollArrowStartPoint = { x: 55, y: 18 } as const
const scrollArrowViewBox = "0 0 110 224"
const scrollArrowFilterBounds = {
    x: "-24%",
    y: "-12%",
    width: "148%",
    height: "124%",
} as const satisfies GooeyFilterBounds
const scrollArrowPieces = [
    {
        key: "stem",
        path: "M55 18 C50 31 51 70 51 108 C51 140 53 164 54 184",
        circleCount: 42,
        radius: 6.9,
    },
    {
        key: "left-head",
        path: "M53 181 C45 164 35 146 25 130 C22 130 21 136 24 143 C33 161 44 183 50 205",
        circleCount: 28,
        radius: 7.5,
    },
    {
        key: "right-head",
        path: "M55 181 C63 164 72 146 82 130 C86 130 87 136 84 143 C75 161 64 183 58 205",
        circleCount: 28,
        radius: 7.5,
    },
    {
        key: "point",
        path: "M51 200 C52 210 55 215 58 207 C59 198 57 188 55 181 C53 187 51 194 51 200",
        circleCount: 16,
        radius: 7.1,
    },
] as const satisfies readonly GooeyPathPiece[]
const scrollArrowBounceY = [0, 0, -7, 0, -3, 0, 0]
const scrollArrowBounceTransition = {
    duration: 5,
    ease: "easeInOut" as const,
    repeat: Infinity,
    times: [0, 0.76, 0.8, 0.84, 0.88, 0.92, 1],
}

function circleCountForPiece(piece: GooeyPathPiece) {
    return Math.round((piece.circleCount ?? defaultCircleCount) * pointCountBoost)
}

function resetCircle(circle: SVGCircleElement | null, startPoint: Point) {
    if (!circle) {
        return
    }

    circle.setAttribute("cx", String(startPoint.x))
    circle.setAttribute("cy", String(startPoint.y))
    circle.setAttribute("r", "0")
    circle.setAttribute("opacity", "0")
}

function resetCircles(circleGroups: Array<Array<SVGCircleElement | null>>, startPoint: Point) {
    circleGroups.forEach((circles) => circles.forEach((circle) => resetCircle(circle, startPoint)))
}

function animationDurationMs(pieces: readonly GooeyPathPiece[]) {
    const durationSeconds = Math.max(
        ...pieces.map((piece, pieceIndex) => {
            const lastCircleIndex = circleCountForPiece(piece) - 1
            return appearDuration + pieceIndex * pieceStagger + lastCircleIndex * circleStagger + morphDuration
        }),
    )

    return Math.ceil(durationSeconds * 1000)
}

function pointOnPiece(path: SVGPathElement, piece: GooeyPathPiece, circleIndex: number) {
    const pieceCircleCount = circleCountForPiece(piece)
    const step = path.getTotalLength() / pieceCircleCount
    const point = path.getPointAtLength(circleIndex * step)

    if (!piece.transform) {
        return point
    }

    return {
        x: point.x * piece.transform.scale + piece.transform.x,
        y: point.y * piece.transform.scale + piece.transform.y,
    }
}

function clampNumber(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
}

function seededUnit(seed: number) {
    const value = Math.sin(seed * 12.9898) * 43758.5453

    return value - Math.floor(value)
}

function textLogoPointCountPerGlyph(circleCount?: number) {
    if (circleCount) {
        return Math.max(textLogoCanvas.minPointsPerGlyph, Math.min(textLogoCanvas.maxPointsPerGlyph, circleCount))
    }

    return textLogoCanvas.defaultPointsPerGlyph
}

function textLogoPointRadiusForWeight(fontWeight: number) {
    const weightProgress = (fontWeight - textLogoWeightRange.min) / (textLogoWeightRange.max - textLogoWeightRange.min)

    return textLogoCanvas.minPointRadius
        + clampNumber(weightProgress, 0, 1) * (textLogoCanvas.maxPointRadius - textLogoCanvas.minPointRadius)
}

function textLogoFontFamily(fontFamily: TextLogoFontFamily) {
    const cssVariableName = fontFamily === "gloria" ? "--font-gloria" : "--font-inter"
    const fallbackFamily = fontFamily === "gloria" ? "\"Gloria Hallelujah\", cursive" : "\"Inter\", system-ui, sans-serif"
    const resolvedFamily = window.getComputedStyle(document.documentElement).getPropertyValue(cssVariableName).trim()

    return resolvedFamily ? `${resolvedFamily}, ${fallbackFamily}` : fallbackFamily
}

function fontForTextLogo(fontSize: number, fontFamily: string, fontWeight: number) {
    return `${fontWeight} ${fontSize}px ${fontFamily}`
}

function textLogoBaseline(context: CanvasRenderingContext2D, text: string, height: number) {
    const metrics = context.measureText(text)
    const ascent = metrics.actualBoundingBoxAscent || height * 0.36
    const descent = metrics.actualBoundingBoxDescent || height * 0.16

    return height / 2 + (ascent - descent) / 2
}

function textLogoTextWidth(context: CanvasRenderingContext2D, text: string, letterSpacing: number) {
    const characters = Array.from(text)
    const charactersWidth = characters.reduce((total, character) => total + context.measureText(character).width, 0)
    const spacingWidth = Math.max(0, characters.length - 1) * letterSpacing

    return charactersWidth + spacingWidth
}

function drawTextLogo(context: CanvasRenderingContext2D, text: string, x: number, y: number, letterSpacing: number) {
    let characterX = x

    Array.from(text).forEach((character) => {
        context.fillText(character, characterX, y)
        characterX += context.measureText(character).width + letterSpacing
    })
}

function evenlySpacedPoints(points: GooeyTextPoint[], pointCount: number) {
    if (!points.length) {
        return []
    }

    return Array.from({ length: pointCount }, (_, index) => {
        const pointIndex = Math.round(index * (points.length - 1) / Math.max(pointCount - 1, 1))
        return points[pointIndex]
    })
}

function textLogoPointOrder(point: GooeyTextPoint) {
    const hash = Math.sin(point.x * 12.9898 + point.y * 78.233) * 43758.5453

    return hash - Math.floor(hash)
}

function animationOrderedTextLogoPoints(points: GooeyTextPoint[]) {
    return [...points].sort((leftPoint, rightPoint) => textLogoPointOrder(leftPoint) - textLogoPointOrder(rightPoint))
}

function textLogoCharacterSegments(context: CanvasRenderingContext2D, text: string, textLeft: number, letterSpacing: number) {
    const characters = Array.from(text)
    let characterX = textLeft

    return characters.map<TextLogoGlyphSegment>((character, index) => {
        const characterWidth = context.measureText(character).width
        const segment = {
            character,
            index,
            key: `${index}-${character}`,
            points: [],
            x1: characterX,
            x2: characterX + characterWidth,
        }
        characterX += characterWidth + letterSpacing

        return segment
    })
}

function visibleTextLogoSegments(segments: readonly TextLogoGlyphSegment[]) {
    return segments.filter((segment) => segment.character.trim().length > 0)
}

function textLogoSegmentForX(segments: readonly TextLogoGlyphSegment[], x: number) {
    const segmentAtX = segments.find((segment) => x >= segment.x1 && x < segment.x2)
    if (segmentAtX) {
        return segmentAtX
    }

    return segments.reduce<TextLogoGlyphSegment | null>((nearestSegment, segment) => {
        if (!nearestSegment) {
            return segment
        }

        const segmentCenter = (segment.x1 + segment.x2) / 2
        const nearestCenter = (nearestSegment.x1 + nearestSegment.x2) / 2

        return Math.abs(x - segmentCenter) < Math.abs(x - nearestCenter) ? segment : nearestSegment
    }, null)
}

function textLogoGlyphPointCounts(segments: readonly TextLogoGlyphSegment[], pointCountPerGlyph: number) {
    return segments.map(() => Math.max(textLogoGlyphMinPointCount, pointCountPerGlyph))
}

function textLogoGlyphBounds(segment: TextLogoGlyphSegment, points: readonly GooeyTextPoint[]) {
    const yValues = points.map((point) => point.y)

    return {
        x1: segment.x1,
        x2: Math.max(segment.x1 + 1, segment.x2),
        y1: Math.min(...yValues),
        y2: Math.max(...yValues),
    }
}

function textLogoGlyphMorph(index: number, glyphCount: number) {
    return {
        seed: (index + 1) * 113 + glyphCount * 29,
    } satisfies TextLogoGlyphMorph
}

function textLogoGlyphRun(glyph: GooeyTextGlyph, replayToken?: number) {
    const seed = glyph.morph.seed + (replayToken ?? 0) * textLogoGlyphRunSeedStep
    const dotHoldRatio = textLogoGlyphDotHoldRange.min
        + seededUnit(seed + 11) * (textLogoGlyphDotHoldRange.max - textLogoGlyphDotHoldRange.min)
    const pointDelayRatio = 0.025 + seededUnit(seed + 2) * 0.14
    const startRatio = Math.min(textLogoGlyphStartRatioMax, seededUnit(seed) * textLogoGlyphStartRatioMax)
    const endRatio = clampNumber(
        startRatio + textLogoGlyphMinDurationRatio + pointDelayRatio * 0.45 + seededUnit(seed + 1) * 0.48,
        startRatio + textLogoGlyphMinDurationRatio,
        textLogoGlyphEndRatioMax,
    )
    const tiltDegrees = textLogoGlyphTilt.minDegrees
        + seededUnit(seed + 9) * (textLogoGlyphTilt.maxDegrees - textLogoGlyphTilt.minDegrees)
    const tiltDurationRatio = textLogoGlyphTilt.durationMinRatio
        + seededUnit(seed + 10) * (textLogoGlyphTilt.durationMaxRatio - textLogoGlyphTilt.durationMinRatio)

    return {
        dotHoldRatio,
        dotTravelXRatio: 0.44 + seededUnit(seed + 12) * 0.38,
        dotTravelYRatio: 0.18 + seededUnit(seed + 13) * 0.35,
        endRatio,
        pointDelayRatio,
        seed,
        sourceCenterXRatio: 0.22 + seededUnit(seed + 3) * 0.56,
        sourceCenterYRatio: 0.18 + seededUnit(seed + 4) * 0.64,
        sourceRadiusScale: 1.45 + seededUnit(seed + 5) * 1.05,
        sourceSpreadXRatio: 0.012 + seededUnit(seed + 6) * 0.024,
        sourceSpreadYRatio: 0.012 + seededUnit(seed + 7) * 0.024,
        startRatio,
        tiltDegrees,
        tiltDurationRatio,
    } satisfies TextLogoGlyphRun
}

function textLogoGlyphSourceCenter(glyph: GooeyTextGlyph, run: TextLogoGlyphRun) {
    const width = Math.max(1, glyph.bounds.x2 - glyph.bounds.x1)
    const height = Math.max(1, glyph.bounds.y2 - glyph.bounds.y1)

    return {
        x: glyph.bounds.x1 + width * run.sourceCenterXRatio,
        y: glyph.bounds.y1 + height * run.sourceCenterYRatio,
    }
}

function textLogoGlyphSourcePoint(glyph: GooeyTextGlyph, run: TextLogoGlyphRun, pointIndex: number) {
    const width = Math.max(1, glyph.bounds.x2 - glyph.bounds.x1)
    const height = Math.max(1, glyph.bounds.y2 - glyph.bounds.y1)
    const center = textLogoGlyphSourceCenter(glyph, run)
    const seed = run.seed + pointIndex * textLogoGlyphSourceSeedStep
    const angle = seededUnit(seed) * textLogoGlyphSourceAngle
    const distance = Math.sqrt(seededUnit(seed + 1))
    const x = center.x + Math.cos(angle) * distance * width * run.sourceSpreadXRatio
    const y = center.y + Math.sin(angle) * distance * height * run.sourceSpreadYRatio

    return {
        x: clampNumber(x, glyph.bounds.x1, glyph.bounds.x2),
        y: clampNumber(y, glyph.bounds.y1, glyph.bounds.y2),
    }
}

function textLogoEaseInOut(progress: number) {
    const boundedProgress = clampNumber(progress, 0, 1)

    return boundedProgress < 0.5
        ? 4 * boundedProgress * boundedProgress * boundedProgress
        : 1 - Math.pow(-2 * boundedProgress + 2, 3) / 2
}

function textLogoEaseOut(progress: number) {
    return 1 - Math.pow(1 - clampNumber(progress, 0, 1), 3)
}

function interpolateNumber(start: number, end: number, progress: number) {
    return start + (end - start) * progress
}

function interpolatePoint(startPoint: Point, endPoint: Point, progress: number) {
    return {
        x: interpolateNumber(startPoint.x, endPoint.x, progress),
        y: interpolateNumber(startPoint.y, endPoint.y, progress),
    }
}

function textLogoGlyphApproachPoint(run: TextLogoGlyphRun, startPoint: Point, targetPoint: Point) {
    return {
        x: startPoint.x + (targetPoint.x - startPoint.x) * run.dotTravelXRatio,
        y: startPoint.y + (targetPoint.y - startPoint.y) * run.dotTravelYRatio,
    }
}

function textLogoGlyphDriftPoint(
    glyph: GooeyTextGlyph,
    run: TextLogoGlyphRun,
    startPoint: Point,
    targetPoint: Point,
    pointIndex: number,
) {
    const width = Math.max(1, glyph.bounds.x2 - glyph.bounds.x1)
    const height = Math.max(1, glyph.bounds.y2 - glyph.bounds.y1)
    const seed = run.seed + pointIndex * textLogoGlyphSourceSeedStep
    const angle = seededUnit(seed + 14) * textLogoGlyphSourceAngle
    const distanceRatio = textLogoGlyphDrift.distanceMinRatio
        + seededUnit(seed + 15) * textLogoGlyphDrift.distanceRangeRatio
    const jitterRatio = textLogoGlyphDrift.jitterMinRatio
        + seededUnit(seed + 16) * textLogoGlyphDrift.jitterRangeRatio
    const travelPoint = interpolatePoint(startPoint, targetPoint, distanceRatio)

    return {
        x: clampNumber(travelPoint.x + Math.cos(angle) * width * jitterRatio, glyph.bounds.x1, glyph.bounds.x2),
        y: clampNumber(travelPoint.y + Math.sin(angle) * height * jitterRatio, glyph.bounds.y1, glyph.bounds.y2),
    }
}

function textLogoGlyphSettlePoint(startPoint: Point, targetPoint: Point) {
    return interpolatePoint(startPoint, targetPoint, textLogoGlyphSettleRatio)
}

function textLogoGlyphFrameTimes(run: TextLogoGlyphRun) {
    const driftTime = clampNumber(
        run.dotHoldRatio * textLogoGlyphFrameTiming.driftTimeRatio,
        textLogoGlyphFrameTiming.minDriftTime,
        Math.max(textLogoGlyphFrameTiming.minDriftTime, run.dotHoldRatio - textLogoGlyphFrameTiming.driftTimePadding),
    )
    const settleStartTime = run.dotHoldRatio + (1 - run.dotHoldRatio) * textLogoGlyphFrameTiming.settleStartRatio

    return {
        driftTime,
        morphStartTime: run.dotHoldRatio,
        settleStartTime,
    }
}

function textLogoGlyphPointStartOffsetRatio(run: TextLogoGlyphRun, pointIndex: number, pointCount: number) {
    if (pointCount <= 1) {
        return 0
    }

    const orderedProgress = pointIndex / (pointCount - 1)
    const randomProgress = seededUnit(run.seed + pointIndex * textLogoGlyphSourceSeedStep + 17)

    return run.pointDelayRatio
        * (randomProgress * textLogoGlyphPointDelay.randomShare + orderedProgress * textLogoGlyphPointDelay.orderedShare)
}

function textLogoGlyphLocalProgress(progress: number, startOffsetRatio: number) {
    if (startOffsetRatio >= 1) {
        return 1
    }

    return clampNumber((progress - startOffsetRatio) / (1 - startOffsetRatio), 0, 1)
}

function textLogoGlyphPointFrame(run: TextLogoGlyphRun, motion: TextLogoGlyphPointMotion, progress: number) {
    const times = textLogoGlyphFrameTimes(run)

    if (progress <= times.driftTime) {
        const segmentProgress = textLogoEaseOut(progress / times.driftTime)
        const point = interpolatePoint(motion.fromPoint, motion.driftPoint, segmentProgress)

        return {
            ...point,
            radius: interpolateNumber(motion.fromRadius, motion.fromRadius * 0.94, segmentProgress),
        }
    }

    if (progress <= times.morphStartTime) {
        const segmentProgress = textLogoEaseInOut(
            (progress - times.driftTime) / (times.morphStartTime - times.driftTime),
        )
        const point = interpolatePoint(motion.driftPoint, motion.approachPoint, segmentProgress)

        return {
            ...point,
            radius: interpolateNumber(motion.fromRadius * 0.94, motion.fromRadius * 0.82, segmentProgress),
        }
    }

    if (progress <= times.settleStartTime) {
        const segmentProgress = textLogoEaseInOut(
            (progress - times.morphStartTime) / (times.settleStartTime - times.morphStartTime),
        )
        const point = interpolatePoint(motion.approachPoint, motion.settlePoint, segmentProgress)

        return {
            ...point,
            radius: interpolateNumber(motion.fromRadius * 0.82, motion.targetRadius * 1.08, segmentProgress),
        }
    }

    const segmentProgress = textLogoEaseOut((progress - times.settleStartTime) / (1 - times.settleStartTime))
    const point = interpolatePoint(motion.settlePoint, motion.targetPoint, segmentProgress)

    return {
        ...point,
        radius: interpolateNumber(motion.targetRadius * 1.08, motion.targetRadius, segmentProgress),
    }
}

function textLogoGlyphAnimationTransition(run: TextLogoGlyphRun, animationDurationSeconds?: number) {
    const totalDuration = Math.max(0.35, animationDurationSeconds ?? defaultTextLogoAnimationDurationSeconds)
    const delay = totalDuration * run.startRatio
    const endTime = totalDuration * run.endRatio
    const duration = Math.max(textLogoGlyphTransitionMinDuration, endTime - delay)

    return {
        delay,
        duration,
        ease: "linear" as const,
    }
}

function textLogoGlyphTiltTransition(run: TextLogoGlyphRun, animationDurationSeconds?: number) {
    const totalDuration = Math.max(0.35, animationDurationSeconds ?? defaultTextLogoAnimationDurationSeconds)
    const delay = totalDuration * run.startRatio
    const duration = Math.max(
        textLogoGlyphTransitionMinDuration,
        totalDuration * (run.endRatio - run.startRatio) * run.dotHoldRatio * run.tiltDurationRatio,
    )

    return {
        delay,
        duration,
        ease: "linear" as const,
    }
}

function textLogoGlyphs(
    text: string,
    circleCount: number | undefined,
    fontFamily: TextLogoFontFamily,
    fontSize: number,
    fontWeight: number,
    letterSpacing: number,
) {
    const canvas = document.createElement("canvas")
    canvas.width = textLogoCanvas.width
    canvas.height = textLogoCanvas.height

    const context = canvas.getContext("2d")
    if (!context) {
        return []
    }

    const displayText = text.trim() || " "
    const resolvedFontFamily = textLogoFontFamily(fontFamily)
    context.font = fontForTextLogo(fontSize, resolvedFontFamily, fontWeight)
    const textWidth = textLogoTextWidth(context, displayText, letterSpacing)
    const textLeft = textLogoCanvas.width / 2 - textWidth / 2
    const glyphSegments = visibleTextLogoSegments(textLogoCharacterSegments(context, displayText, textLeft, letterSpacing))
    const pointRadius = textLogoPointRadiusForWeight(fontWeight)
    context.clearRect(0, 0, textLogoCanvas.width, textLogoCanvas.height)
    context.fillStyle = "#000"
    context.font = fontForTextLogo(fontSize, resolvedFontFamily, fontWeight)
    context.textAlign = "left"
    context.textBaseline = "alphabetic"
    drawTextLogo(context, displayText, textLeft, textLogoBaseline(context, displayText, textLogoCanvas.height), letterSpacing)

    const pixelData = context.getImageData(0, 0, textLogoCanvas.width, textLogoCanvas.height).data

    for (let y = 0; y < textLogoCanvas.height; y += textLogoCanvas.sampleStep) {
        for (let x = 0; x < textLogoCanvas.width; x += textLogoCanvas.sampleStep) {
            const alphaIndex = (y * textLogoCanvas.width + x) * 4 + 3
            if (pixelData[alphaIndex] > textLogoCanvas.textAlphaThreshold) {
                const segment = textLogoSegmentForX(glyphSegments, x)
                segment?.points.push({ x, y, radius: pointRadius })
            }
        }
    }

    const visibleGlyphSegments = glyphSegments.filter((segment) => segment.points.length > 0)
    const pointCounts = textLogoGlyphPointCounts(visibleGlyphSegments, textLogoPointCountPerGlyph(circleCount))

    return visibleGlyphSegments.map<GooeyTextGlyph>((segment, glyphIndex) => {
        segment.points.sort((leftPoint, rightPoint) => leftPoint.x - rightPoint.x || leftPoint.y - rightPoint.y)
        const points = animationOrderedTextLogoPoints(evenlySpacedPoints(segment.points, pointCounts[glyphIndex]))

        return {
            bounds: textLogoGlyphBounds(segment, points),
            character: segment.character,
            index: segment.index,
            key: segment.key,
            morph: textLogoGlyphMorph(glyphIndex, visibleGlyphSegments.length),
            points,
        }
    })
}

function pointFromCircle(circle: SVGCircleElement, fallbackPoint: Point) {
    const x = Number(circle.getAttribute("cx"))
    const y = Number(circle.getAttribute("cy"))

    return {
        x: Number.isFinite(x) ? x : fallbackPoint.x,
        y: Number.isFinite(y) ? y : fallbackPoint.y,
    }
}

function pointsAreClose(leftPoint: Point, rightPoint: Point) {
    return Math.abs(leftPoint.x - rightPoint.x) < 0.01 && Math.abs(leftPoint.y - rightPoint.y) < 0.01
}

function GooeyPathDrawing(p: GooeyPathDrawingProps) {
    const prefersReducedMotion = useReducedMotion()
    const reactId = useId()
    const filterId = `${p.filterIdPrefix}-${reactId.replaceAll(":", "")}`
    const pathRefs = useRef<Array<SVGPathElement | null>>([])
    const circleRefs = useRef<Array<Array<SVGCircleElement | null>>>([])
    const animationCompleteDelayMs = useMemo(() => animationDurationMs(p.pieces), [p.pieces])

    useBrowserLayoutEffect(() => {
        resetCircles(circleRefs.current, p.startPoint)
        p.onAnimationStart?.()

        const animations = p.pieces.flatMap((piece, pieceIndex) => {
            const path = pathRefs.current[pieceIndex]
            const circles = circleRefs.current[pieceIndex] ?? []
            if (!path) {
                return []
            }

            return circles.flatMap((circle, circleIndex) => {
                if (!circle) {
                    return []
                }

                const point = pointOnPiece(path, piece, circleIndex)
                const radius = (piece.radius ?? defaultCircleRadius) * thicknessBoost

                if (prefersReducedMotion) {
                    circle.setAttribute("cx", String(point.x))
                    circle.setAttribute("cy", String(point.y))
                    circle.setAttribute("r", String(radius))
                    circle.setAttribute("opacity", "1")
                    return []
                }

                const morphStart = appearDuration + pieceIndex * pieceStagger + circleIndex * circleStagger
                const totalDuration = morphStart + morphDuration

                return animate(
                    circle,
                    {
                        cx: [p.startPoint.x, p.startPoint.x, p.startPoint.x, point.x],
                        cy: [p.startPoint.y, p.startPoint.y, p.startPoint.y, point.y],
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
        const completeTimer = window.setTimeout(p.onAnimationComplete ?? noop, prefersReducedMotion ? 0 : animationCompleteDelayMs)

        return () => {
            window.clearTimeout(completeTimer)
            animations.forEach((animation) => animation.stop())
            resetCircles(circleRefs.current, p.startPoint)
        }
    }, [animationCompleteDelayMs, p.onAnimationComplete, p.onAnimationStart, p.pieces, prefersReducedMotion, p.replayToken, p.startPoint])

    return (
        <span
            aria-hidden="true"
            className={p.className}
        >
            <svg
                aria-hidden="true"
                className="h-full w-full overflow-visible"
                focusable="false"
                viewBox={p.viewBox}
            >
                <defs>
                    <filter
                        id={filterId}
                        colorInterpolationFilters="sRGB"
                        x={p.filterBounds.x}
                        y={p.filterBounds.y}
                        width={p.filterBounds.width}
                        height={p.filterBounds.height}
                    >
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
                    {p.pieces.map((piece, index) => (
                        <path
                            key={piece.key}
                            ref={(node) => {
                                pathRefs.current[index] = node
                            }}
                            d={piece.path}
                        />
                    ))}
                </g>
                <g filter={`url(#${filterId})`}>
                    {p.pieces.map((piece, pieceIndex) =>
                        Array.from({ length: circleCountForPiece(piece) }, (_, circleIndex) => (
                            <circle
                                key={`${piece.key}-${circleIndex}`}
                                ref={(node) => {
                                    if (!circleRefs.current[pieceIndex]) {
                                        circleRefs.current[pieceIndex] = []
                                    }
                                    circleRefs.current[pieceIndex][circleIndex] = node
                                }}
                                cx={p.startPoint.x}
                                cy={p.startPoint.y}
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

function GooeyGlyphDrawing(p: GooeyGlyphDrawingProps) {
    const prefersReducedMotion = useReducedMotion()
    const reactId = useId()
    const filterId = `${p.filterIdPrefix}-${reactId.replaceAll(":", "")}`
    const circleRefs = useRef<Array<Array<SVGCircleElement | null>>>([])
    const groupRefs = useRef<Array<SVGGElement | null>>([])
    const replayTokenRef = useRef<number | undefined>(undefined)
    const hasAnimatedRef = useRef(false)
    const glyphsRef = useRef<readonly GooeyTextGlyph[] | undefined>(undefined)

    useBrowserLayoutEffect(() => {
        const replayRequested = replayTokenRef.current !== undefined && replayTokenRef.current !== p.replayToken
        const glyphsChanged = glyphsRef.current !== undefined && glyphsRef.current !== p.glyphs
        const isFirstAnimation = !hasAnimatedRef.current
        replayTokenRef.current = p.replayToken
        glyphsRef.current = p.glyphs

        const animations = p.glyphs.flatMap((glyph, glyphIndex) => {
            const circles = circleRefs.current[glyphIndex] ?? []
            const group = groupRefs.current[glyphIndex]
            const run = textLogoGlyphRun(glyph, p.replayToken)
            const sourceCenter = textLogoGlyphSourceCenter(glyph, run)
            const tiltAnimations = group && !prefersReducedMotion
                ? [
                    animate(0, 1, {
                        ...textLogoGlyphTiltTransition(run, p.animationDurationSeconds),
                        onUpdate: (progress) => {
                            const degrees = run.tiltDegrees * Math.sin(progress * Math.PI)
                            group.setAttribute("transform", `rotate(${degrees} ${sourceCenter.x} ${sourceCenter.y})`)
                        },
                        onComplete: () => {
                            group.removeAttribute("transform")
                        },
                    }),
                ]
                : []

            if (group && prefersReducedMotion) {
                group.removeAttribute("transform")
            }

            const pointMotions = glyph.points.flatMap<TextLogoGlyphPointMotion>((point, pointIndex) => {
                const circle = circles[pointIndex]
                if (!circle) {
                    return []
                }

                const targetRadius = point.radius * thicknessBoost
                const sourcePoint = textLogoGlyphSourcePoint(glyph, run, pointIndex)
                const sourceRadius = targetRadius * run.sourceRadiusScale
                const currentPoint = pointFromCircle(circle, p.startPoint)
                const currentRadius = Number(circle.getAttribute("r"))
                const shouldUseGlyphSource = isFirstAnimation || replayRequested || glyphsChanged || pointsAreClose(currentPoint, p.startPoint)
                const fromPoint = shouldUseGlyphSource ? sourcePoint : currentPoint
                const fromRadius = shouldUseGlyphSource || !Number.isFinite(currentRadius) ? sourceRadius : currentRadius
                const driftPoint = shouldUseGlyphSource
                    ? textLogoGlyphDriftPoint(glyph, run, fromPoint, point, pointIndex)
                    : fromPoint
                const approachPoint = textLogoGlyphApproachPoint(run, fromPoint, point)
                const settlePoint = textLogoGlyphSettlePoint(fromPoint, point)

                if (shouldUseGlyphSource) {
                    circle.setAttribute("cx", String(fromPoint.x))
                    circle.setAttribute("cy", String(fromPoint.y))
                    circle.setAttribute("r", String(sourceRadius))
                }

                if (prefersReducedMotion) {
                    circle.setAttribute("cx", String(point.x))
                    circle.setAttribute("cy", String(point.y))
                    circle.setAttribute("r", String(targetRadius))
                    return []
                }

                return [{
                    approachPoint,
                    circle,
                    driftPoint,
                    fromPoint,
                    fromRadius,
                    settlePoint,
                    startOffsetRatio: shouldUseGlyphSource
                        ? textLogoGlyphPointStartOffsetRatio(run, pointIndex, glyph.points.length)
                        : 0,
                    targetPoint: point,
                    targetRadius,
                }]
            })

            const circleAnimations = pointMotions.length > 0
                ? [
                    animate(0, 1, {
                        ...textLogoGlyphAnimationTransition(run, p.animationDurationSeconds),
                        onUpdate: (progress) => {
                            pointMotions.forEach((motion) => {
                                const localProgress = textLogoGlyphLocalProgress(progress, motion.startOffsetRatio)
                                const frame = textLogoGlyphPointFrame(run, motion, localProgress)

                                motion.circle.setAttribute("cx", String(frame.x))
                                motion.circle.setAttribute("cy", String(frame.y))
                                motion.circle.setAttribute("r", String(frame.radius))
                            })
                        },
                        onComplete: () => {
                            pointMotions.forEach((motion) => {
                                motion.circle.setAttribute("cx", String(motion.targetPoint.x))
                                motion.circle.setAttribute("cy", String(motion.targetPoint.y))
                                motion.circle.setAttribute("r", String(motion.targetRadius))
                            })
                        },
                    }),
                ]
                : []

            return [...tiltAnimations, ...circleAnimations]
        })

        hasAnimatedRef.current = p.glyphs.length > 0

        return () => {
            animations.forEach((animation) => animation.stop())
            groupRefs.current.forEach((group) => group?.removeAttribute("transform"))
        }
    }, [p.animationDurationSeconds, p.glyphs, p.replayToken, p.startPoint, prefersReducedMotion])

    return (
        <span aria-hidden="true" className={p.className}>
            <svg
                aria-hidden="true"
                className="h-full w-full overflow-visible"
                focusable="false"
                viewBox={p.viewBox}
            >
                <defs>
                    <filter
                        id={filterId}
                        colorInterpolationFilters="sRGB"
                        x={p.filterBounds.x}
                        y={p.filterBounds.y}
                        width={p.filterBounds.width}
                        height={p.filterBounds.height}
                    >
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={textLogoFilterBlurDeviation} />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            result="goo"
                            values={textLogoFilterMatrix}
                        />
                    </filter>
                </defs>
                <g filter={`url(#${filterId})`}>
                    {p.glyphs.map((glyph, glyphIndex) => (
                        <g
                            key={glyph.index}
                            ref={(node) => {
                                groupRefs.current[glyphIndex] = node
                            }}
                            data-text-glyph={glyph.character}
                        >
                            {glyph.points.map((point, pointIndex) => (
                                <circle
                                    key={pointIndex}
                                    ref={(node) => {
                                        if (!circleRefs.current[glyphIndex]) {
                                            circleRefs.current[glyphIndex] = []
                                        }
                                        circleRefs.current[glyphIndex][pointIndex] = node
                                    }}
                                    cx={p.startPoint.x}
                                    cy={p.startPoint.y}
                                    fill="currentColor"
                                    r={point.radius * thicknessBoost}
                                />
                            ))}
                        </g>
                    ))}
                </g>
            </svg>
        </span>
    )
}

export const GooeyBrandTitle = (p: GooeyBrandTitleProps) => (
    <GooeyPathDrawing
        className="block h-[89px] w-[min(81vw,379px)] text-[var(--gooey-title-color)] xl:h-[163px] xl:w-[min(36vw,510px)]"
        filterBounds={brandFilterBounds}
        filterIdPrefix="gooey-brand-title"
        pieces={brandGlyphs}
        startPoint={brandStartPoint}
        viewBox={brandViewBox}
        onAnimationComplete={p.onAnimationComplete}
        onAnimationStart={p.onAnimationStart}
        replayToken={p.replayToken}
    />
)

export function GooeyScrollArrow() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <motion.span
            aria-hidden="true"
            className="block h-full w-full"
            animate={prefersReducedMotion ? { y: 0 } : { y: scrollArrowBounceY }}
            transition={prefersReducedMotion ? { duration: 0 } : scrollArrowBounceTransition}
        >
            <GooeyPathDrawing
                className="block h-full w-full text-[var(--gooey-title-color)]"
                filterBounds={scrollArrowFilterBounds}
                filterIdPrefix="gooey-scroll-arrow"
                pieces={scrollArrowPieces}
                startPoint={scrollArrowStartPoint}
                viewBox={scrollArrowViewBox}
            />
        </motion.span>
    )
}

export function GooeyTextLogo(p: GooeyTextLogoProps) {
    const [glyphs, setGlyphs] = useState<readonly GooeyTextGlyph[]>([])
    const displayText = p.text.trim() || " "
    const fontSize = p.fontSize ?? defaultTextLogoFontSize
    const letterSpacing = p.letterSpacing ?? defaultTextLogoLetterSpacing

    useBrowserLayoutEffect(() => {
        let isActive = true

        async function setTextGlyphs() {
            await document.fonts?.ready
            if (isActive) {
                setGlyphs(textLogoGlyphs(displayText, p.circleCount, p.fontFamily, fontSize, p.fontWeight, letterSpacing))
            }
        }

        setTextGlyphs()

        return () => {
            isActive = false
        }
    }, [displayText, p.circleCount, p.fontFamily, fontSize, p.fontWeight, letterSpacing])

    return (
        <GooeyGlyphDrawing
            animationDurationSeconds={p.animationDurationSeconds ?? defaultTextLogoAnimationDurationSeconds}
            className={p.className}
            filterBounds={brandFilterBounds}
            filterIdPrefix="gooey-text-logo"
            glyphs={glyphs}
            replayToken={p.replayToken}
            startPoint={textLogoStartPoint}
            viewBox={textLogoViewBox}
        />
    )
}
