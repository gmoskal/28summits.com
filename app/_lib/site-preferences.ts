"use client"

import { useCallback, useEffect, useState } from "react"
import {
    SiteLocale,
    SiteThemeMode,
    defaultSiteLocale,
    siteLanguageByLocale,
    siteLocaleFromInput,
    siteThemeModes,
} from "./site-content"

const sitePreferenceStorageKeys = {
    legacyLocale: "28gor.www.locale",
    manualLocale: "28gor.www.manual-locale",
    themeMode: "28gor.www.theme-mode",
} as const

const urlLocaleParamName = "lang"
const legacyUrlLocaleParamName = "locale"

type LocalePreference = {
    locale: SiteLocale
    source: "browser" | "manual"
}

function parseSiteThemeMode(themeModeInput: string | null | undefined): SiteThemeMode | null {
    return siteThemeModes.find((mode) => mode === themeModeInput) ?? null
}

function browserLocale(): SiteLocale {
    const browserLanguages = typeof navigator === "undefined" ? [] : navigator.languages
    for (const language of browserLanguages) {
        const locale = siteLocaleFromInput(language)
        if (locale) {
            return locale
        }
    }

    return siteLocaleFromInput(typeof navigator === "undefined" ? null : navigator.language) ?? defaultSiteLocale
}

function browserTheme(): SiteThemeMode {
    if (typeof window === "undefined") {
        return "light"
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function queryPreferences(): { locale: SiteLocale | null; themeMode: SiteThemeMode | null } {
    if (typeof window === "undefined") {
        return { locale: null, themeMode: null }
    }

    const params = new URLSearchParams(window.location.search)
    const [, pathLocaleInput] = window.location.pathname.split("/")

    return {
        locale: siteLocaleFromInput(params.get(legacyUrlLocaleParamName) ?? params.get(urlLocaleParamName))
            ?? siteLocaleFromInput(pathLocaleInput),
        themeMode: parseSiteThemeMode(params.get("theme") ?? params.get("themeMode") ?? params.get("mode")),
    }
}

function urlHasLocaleParam() {
    if (typeof window === "undefined") {
        return false
    }

    const params = new URLSearchParams(window.location.search)
    return params.has(urlLocaleParamName) || params.has(legacyUrlLocaleParamName)
}

function updateUrlLocale(locale: SiteLocale) {
    if (typeof window === "undefined") {
        return
    }

    const url = new URL(window.location.href)
    if (locale === defaultSiteLocale) {
        url.searchParams.delete(urlLocaleParamName)
    } else {
        url.searchParams.set(urlLocaleParamName, locale)
    }
    url.searchParams.delete(legacyUrlLocaleParamName)
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`)
}

function updateDocumentTheme(theme: SiteThemeMode) {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", theme === "dark" ? "#000000" : "#ffffff")
}

export function useSitePreferences() {
    const [localePreference, setLocalePreference] = useState<LocalePreference>({
        locale: defaultSiteLocale,
        source: "browser",
    })
    const [themeMode, setThemeModeState] = useState<SiteThemeMode>("light")
    const [activeTheme, setActiveTheme] = useState<SiteThemeMode>("light")
    const [shouldSyncLocaleUrl, setShouldSyncLocaleUrl] = useState(false)

    useEffect(() => {
        const query = queryPreferences()
        const manualLocale = siteLocaleFromInput(localStorage.getItem(sitePreferenceStorageKeys.manualLocale))
        const nextLocale = manualLocale ?? browserLocale()

        localStorage.removeItem(sitePreferenceStorageKeys.legacyLocale)
        setLocalePreference({
            locale: nextLocale,
            source: manualLocale ? "manual" : "browser",
        })
        setShouldSyncLocaleUrl(Boolean(manualLocale) || Boolean(query.locale) || urlHasLocaleParam())
        setThemeModeState(
            query.themeMode
                ?? parseSiteThemeMode(localStorage.getItem(sitePreferenceStorageKeys.themeMode))
                ?? browserTheme(),
        )
    }, [])

    useEffect(() => {
        const locale = localePreference.locale
        document.documentElement.lang = siteLanguageByLocale[locale].htmlLang
        if (shouldSyncLocaleUrl) {
            updateUrlLocale(locale)
        }

        if (localePreference.source === "manual") {
            localStorage.setItem(sitePreferenceStorageKeys.manualLocale, locale)
        }
    }, [localePreference, shouldSyncLocaleUrl])

    useEffect(() => {
        setActiveTheme(themeMode)
        updateDocumentTheme(themeMode)
        localStorage.setItem(sitePreferenceStorageKeys.themeMode, themeMode)
    }, [themeMode])

    const setLocale = useCallback((nextLocale: SiteLocale) => {
        setShouldSyncLocaleUrl(true)
        setLocalePreference({ locale: nextLocale, source: "manual" })
    }, [])
    const setThemeMode = useCallback((nextThemeMode: SiteThemeMode) => setThemeModeState(nextThemeMode), [])

    return {
        locale: localePreference.locale,
        themeMode,
        activeTheme,
        setLocale,
        setThemeMode,
    } as const
}
