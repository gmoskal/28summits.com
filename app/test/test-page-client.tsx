"use client"

import { type KeyboardEvent, useState } from "react"
import { homeContent } from "../_lib/site-content"
import { useSitePreferences } from "../_lib/site-preferences"
import { GooeyTextLogo, type TextLogoFontFamily } from "../_components/gooey-brand-title"
import { ThemeModeSwitch } from "../_components/site-controls"

const defaultTestLogoText = "24 z 28 Gór"
const testLogoCharacterLimit = 10
const testLogoCircleLimits = {
    min: 160,
    max: 1400,
    step: 20,
    defaultValue: 720,
} as const
const testLogoDurationLimits = {
    min: 0.35,
    max: 4,
    step: 0.05,
    defaultValue: 1.2,
} as const
const testLogoFontWeightLimits = {
    min: 300,
    max: 900,
    step: 10,
    defaultValue: 400,
} as const
const testLogoFontSizeLimits = {
    min: 10,
    max: 300,
    step: 1,
    defaultValue: 116,
} as const
const testLogoLetterSpacingLimits = {
    min: -10,
    max: 80,
    step: 1,
    defaultValue: 0,
} as const
const testLogoFontOptions = [
    { value: "gloria", label: "Gloria" },
    { value: "inter-og", label: "Inter OG" },
] as const satisfies readonly { value: TextLogoFontFamily; label: string }[]
const testLogoFontWeightByFamily = {
    gloria: 400,
    "inter-og": 760,
} as const satisfies Record<TextLogoFontFamily, number>

function textWithinLimit(text: string) {
    return Array.from(text).slice(0, testLogoCharacterLimit).join("")
}

export function TestPageClient() {
    const { locale, themeMode, setThemeMode } = useSitePreferences()
    const [logoText, setLogoText] = useState(defaultTestLogoText)
    const [textDraft, setTextDraft] = useState(defaultTestLogoText)
    const [circleCount, setCircleCount] = useState<number>(testLogoCircleLimits.defaultValue)
    const [animationDurationSeconds, setAnimationDurationSeconds] = useState<number>(testLogoDurationLimits.defaultValue)
    const [fontFamily, setFontFamily] = useState<TextLogoFontFamily>("gloria")
    const [fontWeight, setFontWeight] = useState<number>(testLogoFontWeightLimits.defaultValue)
    const [fontSize, setFontSize] = useState<number>(testLogoFontSizeLimits.defaultValue)
    const [letterSpacing, setLetterSpacing] = useState<number>(testLogoLetterSpacingLimits.defaultValue)
    const [replayToken, setReplayToken] = useState(0)
    const controls = homeContent[locale].controls
    const logoCharacterCount = Math.max(1, Array.from(logoText).length)
    const logoWidth = Math.max(180, fontSize * Math.max(2.6, logoCharacterCount * 0.72) + Math.max(0, letterSpacing) * Math.max(0, logoCharacterCount - 1))
    const logoHeight = Math.max(34, fontSize * 1.32)

    const replayLogo = () => setReplayToken((token) => token + 1)
    const commitTextDraft = () => {
        setLogoText(textDraft.trim() || defaultTestLogoText)
        replayLogo()
    }
    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            commitTextDraft()
        }
    }
    const handleFontFamilyChange = (nextFontFamily: TextLogoFontFamily) => {
        setFontFamily(nextFontFamily)
        setFontWeight(testLogoFontWeightByFamily[nextFontFamily])
    }

    return (
        <main className="relative flex min-h-[100dvh] justify-center overflow-auto bg-[var(--page-bg)] px-5 pt-[10vh] pb-10 text-[var(--text-primary)]">
            <div className="absolute top-6 right-5">
                <ThemeModeSwitch content={controls} themeMode={themeMode} onThemeModeChange={setThemeMode} />
            </div>
            <div className="flex w-full flex-col items-center">
                <button
                    type="button"
                    aria-label={logoText}
                    className="inline-grid max-w-[95vw] cursor-pointer touch-manipulation place-items-center rounded-[24px] bg-transparent p-0 text-[var(--gooey-title-color)] focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)]"
                    style={{ height: `${logoHeight}px`, width: `${logoWidth}px` }}
                    onClick={replayLogo}
                >
                    <GooeyTextLogo
                        animationDurationSeconds={animationDurationSeconds}
                        className="block h-full w-full"
                        circleCount={circleCount}
                        fontFamily={fontFamily}
                        fontSize={fontSize}
                        fontWeight={fontWeight}
                        letterSpacing={letterSpacing}
                        replayToken={replayToken}
                        text={logoText}
                    />
                </button>

                <input
                    aria-label="Logo text"
                    className="mt-[15vh] w-[min(100%,18rem)] rounded-[14px] border border-[var(--border-muted)] bg-[var(--surface-bg)] px-4 py-3 text-center text-[20px] leading-none text-[var(--text-primary)] shadow-[0_18px_50px_var(--shadow-soft)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--selection-bg)]"
                    maxLength={testLogoCharacterLimit}
                    spellCheck={false}
                    style={{ fontFamily: "var(--font-gloria), 'Gloria Hallelujah', cursive" }}
                    value={textDraft}
                    onChange={(event) => setTextDraft(textWithinLimit(event.target.value))}
                    onKeyDown={handleInputKeyDown}
                />
                <div className="mt-5 flex w-[min(100%,18rem)] flex-col gap-4">
                    <label className="grid gap-2 text-[13px] leading-none font-semibold text-[var(--text-muted)]">
                        <span>Font</span>
                        <select
                            aria-label="Font"
                            className="h-11 rounded-[14px] border border-[var(--border-muted)] bg-[var(--surface-bg)] px-4 text-[15px] font-semibold text-[var(--text-primary)] outline-none transition-[border-color,box-shadow] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--selection-bg)]"
                            value={fontFamily}
                            onChange={(event) => handleFontFamilyChange(event.target.value as TextLogoFontFamily)}
                        >
                            {testLogoFontOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="grid gap-2 text-[13px] leading-none font-semibold text-[var(--text-muted)]">
                        <span className="flex items-center justify-between">
                            <span>Circles / letter</span>
                            <span className="text-[var(--text-primary)]">{circleCount}</span>
                        </span>
                        <input
                            aria-label="Circle count per letter"
                            className="h-5 w-full cursor-pointer"
                            max={testLogoCircleLimits.max}
                            min={testLogoCircleLimits.min}
                            step={testLogoCircleLimits.step}
                            style={{ accentColor: "var(--accent)" }}
                            type="range"
                            value={circleCount}
                            onChange={(event) => setCircleCount(Number(event.target.value))}
                            onInput={(event) => setCircleCount(Number(event.currentTarget.value))}
                        />
                    </label>
                    <label className="grid gap-2 text-[13px] leading-none font-semibold text-[var(--text-muted)]">
                        <span className="flex items-center justify-between">
                            <span>Weight</span>
                            <span className="text-[var(--text-primary)]">{fontWeight}</span>
                        </span>
                        <input
                            aria-label="Font weight"
                            className="h-5 w-full cursor-pointer"
                            max={testLogoFontWeightLimits.max}
                            min={testLogoFontWeightLimits.min}
                            step={testLogoFontWeightLimits.step}
                            style={{ accentColor: "var(--accent)" }}
                            type="range"
                            value={fontWeight}
                            onChange={(event) => setFontWeight(Number(event.target.value))}
                            onInput={(event) => setFontWeight(Number(event.currentTarget.value))}
                        />
                    </label>
                    <label className="grid gap-2 text-[13px] leading-none font-semibold text-[var(--text-muted)]">
                        <span className="flex items-center justify-between">
                            <span>Size</span>
                            <span className="text-[var(--text-primary)]">{fontSize}px</span>
                        </span>
                        <input
                            aria-label="Font size"
                            className="h-5 w-full cursor-pointer"
                            max={testLogoFontSizeLimits.max}
                            min={testLogoFontSizeLimits.min}
                            step={testLogoFontSizeLimits.step}
                            style={{ accentColor: "var(--accent)" }}
                            type="range"
                            value={fontSize}
                            onChange={(event) => setFontSize(Number(event.target.value))}
                            onInput={(event) => setFontSize(Number(event.currentTarget.value))}
                        />
                    </label>
                    <label className="grid gap-2 text-[13px] leading-none font-semibold text-[var(--text-muted)]">
                        <span className="flex items-center justify-between">
                            <span>Letter spacing</span>
                            <span className="text-[var(--text-primary)]">{letterSpacing}px</span>
                        </span>
                        <input
                            aria-label="Letter spacing"
                            className="h-5 w-full cursor-pointer"
                            max={testLogoLetterSpacingLimits.max}
                            min={testLogoLetterSpacingLimits.min}
                            step={testLogoLetterSpacingLimits.step}
                            style={{ accentColor: "var(--accent)" }}
                            type="range"
                            value={letterSpacing}
                            onChange={(event) => setLetterSpacing(Number(event.target.value))}
                            onInput={(event) => setLetterSpacing(Number(event.currentTarget.value))}
                        />
                    </label>
                    <label className="grid gap-2 text-[13px] leading-none font-semibold text-[var(--text-muted)]">
                        <span className="flex items-center justify-between">
                            <span>Duration</span>
                            <span className="text-[var(--text-primary)]">{animationDurationSeconds.toFixed(2)}s</span>
                        </span>
                        <input
                            aria-label="Animation duration"
                            className="h-5 w-full cursor-pointer"
                            max={testLogoDurationLimits.max}
                            min={testLogoDurationLimits.min}
                            step={testLogoDurationLimits.step}
                            style={{ accentColor: "var(--accent)" }}
                            type="range"
                            value={animationDurationSeconds}
                            onChange={(event) => setAnimationDurationSeconds(Number(event.target.value))}
                            onInput={(event) => setAnimationDurationSeconds(Number(event.currentTarget.value))}
                        />
                    </label>
                </div>
            </div>
        </main>
    )
}
