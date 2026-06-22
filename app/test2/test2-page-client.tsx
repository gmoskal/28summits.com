"use client"

import { useState, type CSSProperties } from "react"
import { useReducedMotion } from "motion/react"
import { ThemeModeSwitch } from "../_components/site-controls"
import { appStoreBadgeContentDesktopWidth, appStoreBadgeContentMobileWidth } from "../_lib/app-store-badge-sizing"
import { scribbleAnimationKeySplines, scribbleAnimationKeyTimes, scribbleAnimationValues } from "../_lib/scribble-animation"
import { createScribbleMarkerSegments, safeScribbleStrokeCount, scribbleStrokeAxes, type ScribbleStrokeAxis } from "../_lib/scribble-marker"
import { homeContent } from "../_lib/site-content"
import { useSitePreferences } from "../_lib/site-preferences"

type ScribbleMarkerProps = {
    reduceMotion: boolean
    strokeAxis: ScribbleStrokeAxis
    strokeCount: number
    strokeWidth: number
}

type ScribbleAppStoreButtonProps = {
    contentMode: ScribbleContentMode
    line1: string
    line2: string
    markerStrokeWidth: number
    onReplay: () => void
    replayToken: number
    scribbleHeight: number
    scribbleWidth: number
    strokeAxis: ScribbleStrokeAxis
    strokeCount: number
}

type ScribbleNumberLimits = {
    defaultValue: number
    max: number
    min: number
    step: number
}

type ScribbleRangeControlProps = {
    label: string
    limits: ScribbleNumberLimits
    onValueChange: (value: number) => void
    suffix: string
    value: number
}

type AppStoreBadgeContentStyle = CSSProperties & {
    "--app-store-badge-desktop-width": string
    "--app-store-badge-mobile-width": string
}

type ScribbleContentMode = (typeof scribbleContentModes)[number]

const scribbleContentModes = ["text", "badge"] as const
const defaultScribbleLines = {
    line1: "download",
    line2: "from AppStore",
} as const
const defaultScribbleContentMode: ScribbleContentMode = "text"
const defaultScribbleStrokeAxis: ScribbleStrokeAxis = "horizontal"
const defaultScribbleStrokeCounts = {
    vertical: 14,
    horizontal: 6,
} as const satisfies Record<ScribbleStrokeAxis, number>
const scribbleStrokeAxisLabels = {
    vertical: "Up/down",
    horizontal: "Left/right",
} as const satisfies Record<ScribbleStrokeAxis, string>
const scribbleCharacterLimit = 20
const scribbleViewBox = "0 0 640 250"
const scribbleButtonMaxWidth = "98vw"
const scribbleInputClassName = "rounded-[14px] border border-[var(--border-muted)] bg-[var(--surface-bg)] px-4 py-3 text-center text-[20px] leading-none text-[var(--text-primary)] shadow-[0_18px_50px_var(--shadow-soft)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--selection-bg)]"
const scribbleFieldClassName = "grid gap-2 text-[13px] leading-none font-semibold text-[var(--text-muted)]"
const scribbleModeSwitchThumbClassName = "absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-[12px] bg-[var(--control-active-bg)] shadow-[0_10px_24px_var(--shadow-soft)] transition-transform"
const scribbleModeSwitchLabelClassName = "relative z-10 flex h-full flex-1 items-center justify-center text-[14px] font-bold leading-none transition-colors"
const scribbleModeSwitchActiveLabelClassName = "text-[var(--control-active-text)]"
const scribbleModeSwitchInactiveLabelClassName = "text-[var(--text-muted)]"
const scribbleMarkerStrokeWidthLimits = {
    min: 32,
    max: 200,
    step: 1,
    defaultValue: 71,
} as const
const scribbleWidthLimits = {
    min: 320,
    max: 820,
    step: 10,
    defaultValue: 350,
} as const
const scribbleHeightLimits = {
    min: 80,
    max: 360,
    step: 5,
    defaultValue: 125,
} as const
const scribbleStrokeCountLimits = {
    min: 1,
    max: 18,
    step: 1,
    defaultValue: defaultScribbleStrokeCounts.horizontal,
} as const
const scribbleMarkerTiming = {
    baseDurationSeconds: 0.62,
    maxDurationSeconds: 1.55,
    minDurationSeconds: 0.82,
    perStrokeDurationSeconds: 0.07,
} as const
const scribblePathLength = 1
const scribbleDashHidden = 1
const scribbleDashVisible = 0
const scribbleStrokeOpacity = 1
const scribbleSegmentAnimationKeySplines = scribbleAnimationKeySplines(1)
const scribbleSegmentAnimationKeyTimes = scribbleAnimationKeyTimes(1)
const scribbleSegmentAnimationValues = scribbleAnimationValues(1)
const appStoreBadgeContentLabel = "Download on the App Store"

function textWithinLimit(text: string) {
    return Array.from(text).slice(0, scribbleCharacterLimit).join("")
}

function getScribbleMarkerDurationSeconds(strokeCount: number) {
    const duration = scribbleMarkerTiming.baseDurationSeconds + safeScribbleStrokeCount(strokeCount) * scribbleMarkerTiming.perStrokeDurationSeconds

    return Math.min(scribbleMarkerTiming.maxDurationSeconds, Math.max(scribbleMarkerTiming.minDurationSeconds, duration))
}

function ScribbleRangeControl(p: ScribbleRangeControlProps) {
    const updateValue = (value: string) => p.onValueChange(Number(value))

    return (
        <label className={scribbleFieldClassName}>
            <span className="flex items-center justify-between">
                <span>{p.label}</span>
                <span className="text-[var(--text-primary)]">
                    {p.value}
                    {p.suffix}
                </span>
            </span>
            <input
                aria-label={p.label}
                className="h-5 w-full cursor-pointer"
                max={p.limits.max}
                min={p.limits.min}
                step={p.limits.step}
                style={{ accentColor: "var(--accent)" }}
                type="range"
                value={p.value}
                onChange={(event) => updateValue(event.currentTarget.value)}
                onInput={(event) => updateValue(event.currentTarget.value)}
            />
        </label>
    )
}

function ScribbleMarker(p: ScribbleMarkerProps) {
    const initialDashOffset = p.reduceMotion ? scribbleDashVisible : scribbleDashHidden
    const markerSegments = createScribbleMarkerSegments(p.strokeAxis, p.strokeCount, p.strokeWidth, getScribbleMarkerDurationSeconds(p.strokeCount))

    return (
        <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible text-[var(--text-primary)]"
            preserveAspectRatio="none"
            viewBox={scribbleViewBox}
        >
            <g fill="none" opacity={scribbleStrokeOpacity} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                {markerSegments.map((segment) => (
                    <path
                        key={segment.path}
                        d={segment.path}
                        pathLength={scribblePathLength}
                        strokeDasharray={scribblePathLength}
                        strokeDashoffset={initialDashOffset}
                        strokeWidth={segment.strokeWidth}
                    >
                        {!p.reduceMotion && (
                            <animate
                                attributeName="stroke-dashoffset"
                                begin={`${segment.delaySeconds}s`}
                                calcMode="spline"
                                dur={`${segment.durationSeconds}s`}
                                fill="freeze"
                                keySplines={scribbleSegmentAnimationKeySplines}
                                keyTimes={scribbleSegmentAnimationKeyTimes}
                                values={scribbleSegmentAnimationValues}
                            />
                        )}
                    </path>
                ))}
            </g>
        </svg>
    )
}

function AppStoreBadgeContent() {
    const badgeStyle: AppStoreBadgeContentStyle = {
        "--app-store-badge-desktop-width": appStoreBadgeContentDesktopWidth,
        "--app-store-badge-mobile-width": appStoreBadgeContentMobileWidth,
    }

    return (
        <svg
            aria-hidden="true"
            className="block w-[var(--app-store-badge-mobile-width)] text-[var(--page-bg)] sm:w-[var(--app-store-badge-desktop-width)]"
            preserveAspectRatio="xMidYMid meet"
            style={badgeStyle}
            viewBox="0 0 135 40"
        >
            <g fill="currentColor">
                <path d="M30.128,19.784c-0.029-3.223,2.639-4.791,2.761-4.864c-1.511-2.203-3.853-2.504-4.676-2.528 c-1.967-0.207-3.875,1.177-4.877,1.177c-1.022,0-2.565-1.157-4.228-1.123c-2.14,0.033-4.142,1.272-5.24,3.196 c-2.266,3.923-0.576,9.688,1.595,12.859c1.086,1.553,2.355,3.287,4.016,3.226c1.625-0.067,2.232-1.036,4.193-1.036 c1.943,0,2.513,1.036,4.207,0.997c1.744-0.028,2.842-1.56,3.89-3.127c1.255-1.78,1.759-3.533,1.779-3.623 C33.507,24.924,30.161,23.647,30.128,19.784z" />
                <path d="M26.928,10.306c0.874-1.093,1.472-2.58,1.306-4.089c-1.265,0.056-2.847,0.875-3.758,1.944 c-0.806,0.942-1.526,2.486-1.34,3.938C24.557,12.205,26.016,11.382,26.928,10.306z" />
                <path d="M53.645,31.504h-2.271l-1.244-3.909h-4.324l-1.185,3.909h-2.211l4.284-13.308h2.646L53.645,31.504z M49.755,25.955L48.63,22.48c-0.119-0.355-0.342-1.191-0.671-2.507h-0.04c-0.131,0.566-0.342,1.402-0.632,2.507l-1.105,3.475 H49.755z" />
                <path d="M64.662,26.588c0,1.632-0.441,2.922-1.323,3.869c-0.79,0.843-1.771,1.264-2.942,1.264 c-1.264,0-2.172-0.454-2.725-1.362h-0.04v5.055h-2.132V25.067c0-1.026-0.027-2.079-0.079-3.159h1.875l0.119,1.521h0.04 c0.711-1.146,1.79-1.718,3.238-1.718c1.132,0,2.077,0.447,2.833,1.342C64.284,23.949,64.662,25.127,64.662,26.588z M62.49,26.666 c0-0.934-0.21-1.704-0.632-2.31c-0.461-0.632-1.08-0.948-1.856-0.948c-0.526,0-1.004,0.176-1.431,0.523 c-0.428,0.35-0.708,0.807-0.839,1.373c-0.066,0.264-0.099,0.48-0.099,0.65v1.6c0,0.698,0.214,1.287,0.642,1.768 s0.984,0.721,1.668,0.721c0.803,0,1.428-0.31,1.875-0.928C62.266,28.496,62.49,27.68,62.49,26.666z" />
                <path d="M75.699,26.588c0,1.632-0.441,2.922-1.324,3.869c-0.789,0.843-1.77,1.264-2.941,1.264 c-1.264,0-2.172-0.454-2.724-1.362H68.67v5.055h-2.132V25.067c0-1.026-0.027-2.079-0.079-3.159h1.875l0.119,1.521h0.04 c0.71-1.146,1.789-1.718,3.238-1.718c1.131,0,2.076,0.447,2.834,1.342C75.32,23.949,75.699,25.127,75.699,26.588z M73.527,26.666 c0-0.934-0.211-1.704-0.633-2.31c-0.461-0.632-1.078-0.948-1.855-0.948c-0.527,0-1.004,0.176-1.432,0.523 c-0.428,0.35-0.707,0.807-0.838,1.373c-0.065,0.264-0.099,0.48-0.099,0.65v1.6c0,0.698,0.214,1.287,0.64,1.768 c0.428,0.48,0.984,0.721,1.67,0.721c0.803,0,1.428-0.31,1.875-0.928C73.303,28.496,73.527,27.68,73.527,26.666z" />
                <path d="M88.039,27.772c0,1.132-0.393,2.053-1.182,2.764c-0.867,0.777-2.074,1.165-3.625,1.165 c-1.432,0-2.58-0.276-3.449-0.829l0.494-1.777c0.936,0.566,1.963,0.85,3.082,0.85c0.803,0,1.428-0.182,1.877-0.544 c0.447-0.362,0.67-0.848,0.67-1.454c0-0.54-0.184-0.995-0.553-1.364c-0.367-0.369-0.98-0.712-1.836-1.029 c-2.33-0.869-3.494-2.142-3.494-3.816c0-1.094,0.408-1.991,1.225-2.689c0.814-0.699,1.9-1.048,3.258-1.048 c1.211,0,2.217,0.211,3.02,0.632l-0.533,1.738c-0.75-0.408-1.598-0.612-2.547-0.612c-0.75,0-1.336,0.185-1.756,0.553 c-0.355,0.329-0.533,0.73-0.533,1.205c0,0.526,0.203,0.961,0.611,1.303c0.355,0.316,1,0.658,1.936,1.027 c1.145,0.461,1.986,1,2.527,1.618C87.77,26.081,88.039,26.852,88.039,27.772z" />
                <path d="M95.088,23.508h-2.35v4.659c0,1.185,0.414,1.777,1.244,1.777c0.381,0,0.697-0.033,0.947-0.099l0.059,1.619 c-0.42,0.157-0.973,0.236-1.658,0.236c-0.842,0-1.5-0.257-1.975-0.77c-0.473-0.514-0.711-1.376-0.711-2.587v-4.837h-1.4v-1.6h1.4 v-1.757l2.094-0.632v2.389h2.35V23.508z" />
                <path d="M105.691,26.627c0,1.475-0.422,2.686-1.264,3.633c-0.883,0.975-2.055,1.461-3.516,1.461 c-1.408,0-2.529-0.467-3.365-1.401s-1.254-2.113-1.254-3.534c0-1.487,0.43-2.705,1.293-3.652 c0.861-0.948,2.023-1.422,3.484-1.422c1.408,0,2.541,0.467,3.396,1.402C105.283,24.021,105.691,25.192,105.691,26.627z M103.479,26.696c0-0.885-0.189-1.644-0.572-2.277c-0.447-0.766-1.086-1.148-1.914-1.148c-0.857,0-1.508,0.383-1.955,1.148 c-0.383,0.634-0.572,1.405-0.572,2.317c0,0.885,0.189,1.644,0.572,2.276c0.461,0.766,1.105,1.148,1.936,1.148 c0.814,0,1.453-0.39,1.914-1.168C103.281,28.347,103.479,27.58,103.479,26.696z" />
                <path d="M112.621,23.783c-0.211-0.039-0.436-0.059-0.672-0.059c-0.75,0-1.33,0.283-1.738,0.85 c-0.355,0.5-0.533,1.132-0.533,1.895v5.035h-2.131l0.02-6.574c0-1.106-0.027-2.113-0.08-3.021h1.857l0.078,1.836h0.059 c0.225-0.631,0.58-1.139,1.066-1.52c0.475-0.343,0.988-0.514,1.541-0.514c0.197,0,0.375,0.014,0.533,0.039V23.783z" />
                <path d="M122.156,26.252c0,0.382-0.025,0.704-0.078,0.967h-6.396c0.025,0.948,0.334,1.673,0.928,2.173 c0.539,0.447,1.236,0.671,2.092,0.671c0.947,0,1.811-0.151,2.588-0.454l0.334,1.48c-0.908,0.396-1.98,0.593-3.217,0.593 c-1.488,0-2.656-0.438-3.506-1.313c-0.848-0.875-1.273-2.05-1.273-3.524c0-1.447,0.395-2.652,1.186-3.613 c0.828-1.026,1.947-1.539,3.355-1.539c1.383,0,2.43,0.513,3.141,1.539C121.873,24.047,122.156,25.055,122.156,26.252z M120.123,25.699c0.014-0.632-0.125-1.178-0.414-1.639c-0.369-0.593-0.936-0.889-1.699-0.889 c-0.697,0-1.264,0.289-1.697,0.869c-0.355,0.461-0.566,1.014-0.631,1.658H120.123z" />
                <path d="M49.05,10.009c0,1.177-0.353,2.063-1.058,2.658c-0.653,0.549-1.581,0.824-2.783,0.824 c-0.596,0-1.106-0.026-1.533-0.078V6.982c0.557-0.09,1.157-0.136,1.805-0.136c1.145,0,2.008,0.249,2.59,0.747 C48.723,8.156,49.05,8.961,49.05,10.009z M47.945,10.038c0-0.763-0.202-1.348-0.606-1.756c-0.404-0.407-0.994-0.611-1.771-0.611 c-0.33,0-0.611,0.022-0.844,0.068v4.889c0.129,0.02,0.365,0.029,0.708,0.029c0.802,0,1.421-0.223,1.857-0.669 S47.945,10.892,47.945,10.038z" />
                <path d="M54.909,11.037c0,0.725-0.207,1.319-0.621,1.785c-0.434,0.479-1.009,0.718-1.727,0.718 c-0.692,0-1.243-0.229-1.654-0.689c-0.41-0.459-0.615-1.038-0.615-1.736c0-0.73,0.211-1.329,0.635-1.794s0.994-0.698,1.712-0.698 c0.692,0,1.248,0.229,1.669,0.688C54.708,9.757,54.909,10.333,54.909,11.037z M53.822,11.071c0-0.435-0.094-0.808-0.281-1.119 c-0.22-0.376-0.533-0.564-0.94-0.564c-0.421,0-0.741,0.188-0.961,0.564c-0.188,0.311-0.281,0.69-0.281,1.138 c0,0.435,0.094,0.808,0.281,1.119c0.227,0.376,0.543,0.564,0.951,0.564c0.4,0,0.714-0.191,0.94-0.574 C53.725,11.882,53.822,11.506,53.822,11.071z" />
                <path d="M62.765,8.719l-1.475,4.714h-0.96l-0.611-2.047c-0.155-0.511-0.281-1.019-0.379-1.523h-0.019 c-0.091,0.518-0.217,1.025-0.379,1.523l-0.649,2.047h-0.971l-1.387-4.714h1.077l0.533,2.241c0.129,0.53,0.235,1.035,0.32,1.513 h0.019c0.078-0.394,0.207-0.896,0.389-1.503l0.669-2.25h0.854l0.641,2.202c0.155,0.537,0.281,1.054,0.378,1.552h0.029 c0.071-0.485,0.178-1.002,0.32-1.552l0.572-2.202H62.765z" />
                <path d="M68.198,13.433H67.15v-2.7c0-0.832-0.316-1.248-0.95-1.248c-0.311,0-0.562,0.114-0.757,0.343 c-0.193,0.229-0.291,0.499-0.291,0.808v2.796h-1.048v-3.366c0-0.414-0.013-0.863-0.038-1.349h0.921l0.049,0.737h0.029 c0.122-0.229,0.304-0.418,0.543-0.569c0.284-0.176,0.602-0.265,0.95-0.265c0.44,0,0.806,0.142,1.097,0.427 c0.362,0.349,0.543,0.87,0.543,1.562V13.433z" />
                <path d="M71.088,13.433h-1.047V6.556h1.047V13.433z" />
                <path d="M77.258,11.037c0,0.725-0.207,1.319-0.621,1.785c-0.434,0.479-1.01,0.718-1.727,0.718 c-0.693,0-1.244-0.229-1.654-0.689c-0.41-0.459-0.615-1.038-0.615-1.736c0-0.73,0.211-1.329,0.635-1.794s0.994-0.698,1.711-0.698 c0.693,0,1.248,0.229,1.67,0.688C77.057,9.757,77.258,10.333,77.258,11.037z M76.17,11.071c0-0.435-0.094-0.808-0.281-1.119 c-0.219-0.376-0.533-0.564-0.939-0.564c-0.422,0-0.742,0.188-0.961,0.564c-0.188,0.311-0.281,0.69-0.281,1.138 c0,0.435,0.094,0.808,0.281,1.119c0.227,0.376,0.543,0.564,0.951,0.564c0.4,0,0.713-0.191,0.939-0.574 C76.074,11.882,76.17,11.506,76.17,11.071z" />
                <path d="M82.33,13.433h-0.941l-0.078-0.543h-0.029c-0.322,0.433-0.781,0.65-1.377,0.65 c-0.445,0-0.805-0.143-1.076-0.427c-0.246-0.258-0.369-0.579-0.369-0.96c0-0.576,0.24-1.015,0.723-1.319 c0.482-0.304,1.16-0.453,2.033-0.446V10.3c0-0.621-0.326-0.931-0.979-0.931c-0.465,0-0.875,0.117-1.229,0.349l-0.213-0.688 c0.438-0.271,0.979-0.407,1.617-0.407c1.232,0,1.85,0.65,1.85,1.95v1.736C82.262,12.78,82.285,13.155,82.33,13.433z M81.242,11.813v-0.727c-1.156-0.02-1.734,0.297-1.734,0.95c0,0.246,0.066,0.43,0.201,0.553c0.135,0.123,0.307,0.184,0.512,0.184 c0.23,0,0.445-0.073,0.641-0.218c0.197-0.146,0.318-0.331,0.363-0.558C81.236,11.946,81.242,11.884,81.242,11.813z" />
                <path d="M88.285,13.433h-0.93l-0.049-0.757h-0.029c-0.297,0.576-0.803,0.864-1.514,0.864 c-0.568,0-1.041-0.223-1.416-0.669s-0.562-1.025-0.562-1.736c0-0.763,0.203-1.381,0.611-1.853c0.395-0.44,0.879-0.66,1.455-0.66 c0.633,0,1.076,0.213,1.328,0.64h0.02V6.556h1.049v5.607C88.248,12.622,88.26,13.045,88.285,13.433z M87.199,11.445v-0.786 c0-0.136-0.01-0.246-0.029-0.33c-0.059-0.252-0.186-0.464-0.379-0.635c-0.195-0.171-0.43-0.257-0.701-0.257 c-0.391,0-0.697,0.155-0.922,0.466c-0.223,0.311-0.336,0.708-0.336,1.193c0,0.466,0.107,0.844,0.322,1.135 c0.227,0.31,0.533,0.465,0.916,0.465c0.344,0,0.619-0.129,0.828-0.388C87.1,12.069,87.199,11.781,87.199,11.445z" />
                <path d="M97.248,11.037c0,0.725-0.207,1.319-0.621,1.785c-0.434,0.479-1.008,0.718-1.727,0.718 c-0.691,0-1.242-0.229-1.654-0.689c-0.41-0.459-0.615-1.038-0.615-1.736c0-0.73,0.211-1.329,0.635-1.794s0.994-0.698,1.713-0.698 c0.691,0,1.248,0.229,1.668,0.688C97.047,9.757,97.248,10.333,97.248,11.037z M96.162,11.071c0-0.435-0.094-0.808-0.281-1.119 c-0.221-0.376-0.533-0.564-0.941-0.564c-0.42,0-0.74,0.188-0.961,0.564c-0.188,0.311-0.281,0.69-0.281,1.138 c0,0.435,0.094,0.808,0.281,1.119c0.227,0.376,0.543,0.564,0.951,0.564c0.4,0,0.715-0.191,0.941-0.574 C96.064,11.882,96.162,11.506,96.162,11.071z" />
                <path d="M102.883,13.433h-1.047v-2.7c0-0.832-0.316-1.248-0.951-1.248c-0.311,0-0.562,0.114-0.756,0.343 s-0.291,0.499-0.291,0.808v2.796h-1.049v-3.366c0-0.414-0.012-0.863-0.037-1.349h0.92l0.049,0.737h0.029 c0.123-0.229,0.305-0.418,0.543-0.569c0.285-0.176,0.602-0.265,0.951-0.265c0.439,0,0.805,0.142,1.096,0.427 c0.363,0.349,0.543,0.87,0.543,1.562V13.433z" />
                <path d="M109.936,9.504h-1.154v2.29c0,0.582,0.205,0.873,0.611,0.873c0.188,0,0.344-0.016,0.467-0.049 l0.027,0.795c-0.207,0.078-0.479,0.117-0.814,0.117c-0.414,0-0.736-0.126-0.969-0.378c-0.234-0.252-0.35-0.676-0.35-1.271V9.504 h-0.689V8.719h0.689V7.855l1.027-0.31v1.173h1.154V9.504z" />
                <path d="M115.484,13.433h-1.049v-2.68c0-0.845-0.316-1.268-0.949-1.268c-0.486,0-0.818,0.245-1,0.735 c-0.031,0.103-0.049,0.229-0.049,0.377v2.835h-1.047V6.556h1.047v2.841h0.02c0.33-0.517,0.803-0.775,1.416-0.775 c0.434,0,0.793,0.142,1.078,0.427c0.355,0.355,0.533,0.883,0.533,1.581V13.433z" />
                <path d="M121.207,10.853c0,0.188-0.014,0.346-0.039,0.475h-3.143c0.014,0.466,0.164,0.821,0.455,1.067 c0.266,0.22,0.609,0.33,1.029,0.33c0.465,0,0.889-0.074,1.271-0.223l0.164,0.728c-0.447,0.194-0.973,0.291-1.582,0.291 c-0.73,0-1.305-0.215-1.721-0.645c-0.418-0.43-0.625-1.007-0.625-1.731c0-0.711,0.193-1.303,0.582-1.775 c0.406-0.504,0.955-0.756,1.648-0.756c0.678,0,1.193,0.252,1.541,0.756C121.068,9.77,121.207,10.265,121.207,10.853z M120.207,10.582c0.008-0.311-0.061-0.579-0.203-0.805c-0.182-0.291-0.459-0.437-0.834-0.437 c-0.342,0-0.621,0.142-0.834,0.427c-0.174,0.227-0.277,0.498-0.311,0.815H120.207z" />
            </g>
        </svg>
    )
}

function ScribbleAppStoreButton(p: ScribbleAppStoreButtonProps) {
    const reduceMotion = Boolean(useReducedMotion())
    const buttonLabel = p.contentMode === "badge" ? appStoreBadgeContentLabel : `${p.line1} ${p.line2}`.trim()
    const scribbleFrameStyle = {
        height: p.scribbleHeight,
        width: `min(${scribbleButtonMaxWidth}, ${p.scribbleWidth}px)`,
    }
    const scribbleLayerStyle = {
        height: p.scribbleHeight,
    }

    return (
        <button
            type="button"
            aria-label={buttonLabel}
            className="relative inline-grid cursor-pointer touch-manipulation place-items-center border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)]"
            style={scribbleFrameStyle}
            onClick={p.onReplay}
        >
            <span className="relative block h-full w-full" style={scribbleLayerStyle}>
                <ScribbleMarker
                    key={`${p.replayToken}-${p.strokeAxis}-${p.strokeCount}`}
                    reduceMotion={reduceMotion}
                    strokeAxis={p.strokeAxis}
                    strokeCount={p.strokeCount}
                    strokeWidth={p.markerStrokeWidth}
                />
                <span
                    aria-hidden="true"
                    className="relative z-10 flex h-full w-full flex-col items-center justify-center px-10 text-center font-black text-[var(--page-bg)]"
                    style={{ ...scribbleLayerStyle, fontFamily: "var(--font-inter), 'Inter', 'SF Pro Text', sans-serif" }}
                >
                    {p.contentMode === "badge" ? (
                        <AppStoreBadgeContent />
                    ) : (
                        <>
                            <span className="max-w-full text-[50px] leading-[0.86] sm:text-[78px] md:text-[96px]" style={{ overflowWrap: "anywhere" }}>
                                {p.line1}
                            </span>
                            <span className="mt-2 max-w-full text-[34px] leading-[0.9] font-extrabold sm:text-[52px] md:text-[64px]" style={{ overflowWrap: "anywhere" }}>
                                {p.line2}
                            </span>
                        </>
                    )}
                </span>
            </span>
        </button>
    )
}

export function Test2PageClient() {
    const { locale, themeMode, setThemeMode } = useSitePreferences()
    const [line1, setLine1] = useState<string>(defaultScribbleLines.line1)
    const [line2, setLine2] = useState<string>(defaultScribbleLines.line2)
    const [contentMode, setContentMode] = useState<ScribbleContentMode>(defaultScribbleContentMode)
    const [markerStrokeWidth, setMarkerStrokeWidth] = useState<number>(scribbleMarkerStrokeWidthLimits.defaultValue)
    const [strokeAxis, setStrokeAxis] = useState<ScribbleStrokeAxis>(defaultScribbleStrokeAxis)
    const [strokeCounts, setStrokeCounts] = useState<Record<ScribbleStrokeAxis, number>>({ ...defaultScribbleStrokeCounts })
    const [scribbleWidth, setScribbleWidth] = useState<number>(scribbleWidthLimits.defaultValue)
    const [scribbleHeight, setScribbleHeight] = useState<number>(scribbleHeightLimits.defaultValue)
    const [replayToken, setReplayToken] = useState(0)
    const controls = homeContent[locale].controls
    const strokeCount = strokeCounts[strokeAxis]
    const replayScribble = () => setReplayToken((token) => token + 1)
    const selectContentMode = (nextContentMode: ScribbleContentMode) => {
        setContentMode(nextContentMode)
        replayScribble()
    }
    const selectStrokeAxis = (nextStrokeAxis: ScribbleStrokeAxis) => {
        setStrokeAxis(nextStrokeAxis)
        replayScribble()
    }
    const updateStrokeCount = (nextStrokeCount: number) => {
        setStrokeCounts((currentStrokeCounts) => ({
            ...currentStrokeCounts,
            [strokeAxis]: nextStrokeCount,
        }))
    }

    return (
        <main className="relative flex min-h-[100dvh] justify-center overflow-auto bg-[var(--page-bg)] px-5 pt-[10vh] pb-10 text-[var(--text-primary)]">
            <div className="absolute top-6 right-5">
                <ThemeModeSwitch content={controls} themeMode={themeMode} onThemeModeChange={setThemeMode} />
            </div>
            <div className="flex w-full flex-col items-center">
                <ScribbleAppStoreButton
                    contentMode={contentMode}
                    line1={line1}
                    line2={line2}
                    markerStrokeWidth={markerStrokeWidth}
                    replayToken={replayToken}
                    scribbleHeight={scribbleHeight}
                    scribbleWidth={scribbleWidth}
                    strokeAxis={strokeAxis}
                    strokeCount={strokeCount}
                    onReplay={replayScribble}
                />

                <button
                    type="button"
                    aria-checked={contentMode === "badge"}
                    className="relative mt-[12vh] flex h-12 w-[min(100%,18rem)] rounded-[16px] bg-[var(--control-bg)] p-1 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--selection-bg)]"
                    role="switch"
                    onClick={() => selectContentMode(contentMode === "text" ? "badge" : "text")}
                >
                    <span
                        aria-hidden="true"
                        className={`${scribbleModeSwitchThumbClassName} ${contentMode === "badge" ? "translate-x-full" : "translate-x-0"}`}
                    />
                    {scribbleContentModes.map((mode) => (
                        <span
                            key={mode}
                            className={`${scribbleModeSwitchLabelClassName} ${contentMode === mode ? scribbleModeSwitchActiveLabelClassName : scribbleModeSwitchInactiveLabelClassName}`}
                        >
                            {mode === "text" ? "Text" : "Image"}
                        </span>
                    ))}
                </button>

                <button
                    type="button"
                    aria-checked={strokeAxis === "horizontal"}
                    className="relative mt-3 flex h-12 w-[min(100%,18rem)] rounded-[16px] bg-[var(--control-bg)] p-1 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--selection-bg)]"
                    role="switch"
                    onClick={() => selectStrokeAxis(strokeAxis === "vertical" ? "horizontal" : "vertical")}
                >
                    <span
                        aria-hidden="true"
                        className={`${scribbleModeSwitchThumbClassName} ${strokeAxis === "horizontal" ? "translate-x-full" : "translate-x-0"}`}
                    />
                    {scribbleStrokeAxes.map((axis) => (
                        <span
                            key={axis}
                            className={`${scribbleModeSwitchLabelClassName} ${strokeAxis === axis ? scribbleModeSwitchActiveLabelClassName : scribbleModeSwitchInactiveLabelClassName}`}
                        >
                            {scribbleStrokeAxisLabels[axis]}
                        </span>
                    ))}
                </button>

                <div className="mt-5 grid w-[min(100%,30rem)] grid-cols-1 gap-4">
                    <ScribbleRangeControl
                        label="Marker thickness"
                        limits={scribbleMarkerStrokeWidthLimits}
                        suffix="px"
                        value={markerStrokeWidth}
                        onValueChange={setMarkerStrokeWidth}
                    />
                    <ScribbleRangeControl
                        label="Stroke count"
                        limits={scribbleStrokeCountLimits}
                        suffix=""
                        value={strokeCount}
                        onValueChange={updateStrokeCount}
                    />
                    <ScribbleRangeControl
                        label="Scribble width"
                        limits={scribbleWidthLimits}
                        suffix="px"
                        value={scribbleWidth}
                        onValueChange={setScribbleWidth}
                    />
                    <ScribbleRangeControl
                        label="Scribble height"
                        limits={scribbleHeightLimits}
                        suffix="px"
                        value={scribbleHeight}
                        onValueChange={setScribbleHeight}
                    />
                </div>

                <div className="mt-5 grid w-[min(100%,30rem)] grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className={scribbleFieldClassName}>
                        <span>Line 1</span>
                        <input
                            aria-label="Line 1"
                            className={scribbleInputClassName}
                            maxLength={scribbleCharacterLimit}
                            spellCheck={false}
                            value={line1}
                            onChange={(event) => setLine1(textWithinLimit(event.currentTarget.value))}
                        />
                    </label>
                    <label className={scribbleFieldClassName}>
                        <span>Line 2</span>
                        <input
                            aria-label="Line 2"
                            className={scribbleInputClassName}
                            maxLength={scribbleCharacterLimit}
                            spellCheck={false}
                            value={line2}
                            onChange={(event) => setLine2(textWithinLimit(event.currentTarget.value))}
                        />
                    </label>
                </div>
            </div>
        </main>
    )
}
