"use client"

import { SiteLocale, SiteThemeMode, homeContent, siteLocales, siteThemeModes } from "../_lib/site-content"
import { DraggableSwitch, type DraggableSwitchOption } from "./draggable-switch"

type SiteControlsProps = {
    content: (typeof homeContent)[SiteLocale]["controls"]
    locale: SiteLocale
    themeMode: SiteThemeMode
    onLocaleChange: (locale: SiteLocale) => void
    onThemeModeChange: (mode: SiteThemeMode) => void
}

function SunIcon() {
    return (
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="2" />
            <path
                d="M12 2.5v2.25M12 19.25v2.25M4.75 4.75l1.6 1.6M17.65 17.65l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.75 19.25l1.6-1.6M17.65 6.35l1.6-1.6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
                d="M20.2 14.7A7.8 7.8 0 0 1 9.3 3.8a8.9 8.9 0 1 0 10.9 10.9Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    )
}

function ThemeIcon({ mode }: { mode: SiteThemeMode }) {
    return mode === "light" ? <SunIcon /> : <MoonIcon />
}

export function SiteControls(p: SiteControlsProps) {
    const localeOptions: [DraggableSwitchOption<SiteLocale>, DraggableSwitchOption<SiteLocale>] = [
        { value: siteLocales[0], label: siteLocales[0].toUpperCase(), content: siteLocales[0].toUpperCase() },
        { value: siteLocales[1], label: siteLocales[1].toUpperCase(), content: siteLocales[1].toUpperCase() },
    ]
    const themeOptions: [DraggableSwitchOption<SiteThemeMode>, DraggableSwitchOption<SiteThemeMode>] = [
        { value: siteThemeModes[0], label: p.content.themeModes.light, content: <ThemeIcon mode={siteThemeModes[0]} /> },
        { value: siteThemeModes[1], label: p.content.themeModes.dark, content: <ThemeIcon mode={siteThemeModes[1]} /> },
    ]

    return (
        <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
            <DraggableSwitch
                ariaLabel={p.content.languageLabel}
                value={p.locale}
                options={localeOptions}
                metrics={{ slotWidth: 44, thumbWidth: 44 }}
                onChange={p.onLocaleChange}
            />
            <DraggableSwitch
                ariaLabel={p.content.themeLabel}
                value={p.themeMode}
                options={themeOptions}
                metrics={{ slotWidth: 36, thumbWidth: 32 }}
                onChange={p.onThemeModeChange}
            />
        </div>
    )
}
