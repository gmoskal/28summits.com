"use client"

import { useCallback, useEffect, useState } from "react"
import { SiteLocale, SiteThemeMode, siteLocales, siteThemeModes } from "./site-content"

const sitePreferenceStorageKeys = {
    locale: "28s.www.locale",
    themeMode: "28s.www.theme-mode",
} as const

const defaultLocale: SiteLocale = "en"

function parseSiteLocale(localeInput: string | null | undefined): SiteLocale | null {
    if (!localeInput) {
        return null
    }

    const languageCode = localeInput.toLowerCase().split("-")[0]
    return siteLocales.find((locale) => locale === languageCode) ?? null
}

function parseSiteThemeMode(themeModeInput: string | null | undefined): SiteThemeMode | null {
    return siteThemeModes.find((mode) => mode === themeModeInput) ?? null
}

function browserLocale(): SiteLocale {
    const browserLanguages = typeof navigator === "undefined" ? [] : navigator.languages
    for (const language of browserLanguages) {
        const locale = parseSiteLocale(language)
        if (locale) {
            return locale
        }
    }

    return parseSiteLocale(typeof navigator === "undefined" ? null : navigator.language) ?? defaultLocale
}

function browserTheme(): SiteThemeMode {
    if (typeof window === "undefined") {
        return "light"
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function updateDocumentTheme(theme: SiteThemeMode) {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", theme === "dark" ? "#12130f" : "#f7f3ea")
}

export function useSitePreferences() {
    const [locale, setLocaleState] = useState<SiteLocale>(defaultLocale)
    const [themeMode, setThemeModeState] = useState<SiteThemeMode>("light")
    const [activeTheme, setActiveTheme] = useState<SiteThemeMode>("light")

    useEffect(() => {
        setLocaleState(parseSiteLocale(localStorage.getItem(sitePreferenceStorageKeys.locale)) ?? browserLocale())
        setThemeModeState(
            parseSiteThemeMode(localStorage.getItem(sitePreferenceStorageKeys.themeMode)) ?? browserTheme(),
        )
    }, [])

    useEffect(() => {
        document.documentElement.lang = locale
        localStorage.setItem(sitePreferenceStorageKeys.locale, locale)
    }, [locale])

    useEffect(() => {
        setActiveTheme(themeMode)
        updateDocumentTheme(themeMode)
        localStorage.setItem(sitePreferenceStorageKeys.themeMode, themeMode)
    }, [themeMode])

    const setLocale = useCallback((nextLocale: SiteLocale) => setLocaleState(nextLocale), [])
    const setThemeMode = useCallback((nextThemeMode: SiteThemeMode) => setThemeModeState(nextThemeMode), [])

    return {
        locale,
        themeMode,
        activeTheme,
        setLocale,
        setThemeMode,
    } as const
}
