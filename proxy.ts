import { NextRequest, NextResponse } from "next/server"
import { defaultSiteLocale, siteLocaleFromInput } from "./app/_lib/site-content"

const localeParamNames = ["lang", "locale"] as const
const facebookCrawlerUserAgentParts = ["facebookexternalhit", "facebot", "facebookcatalog"] as const

function localeFromRequestUrl(url: URL) {
    for (const paramName of localeParamNames) {
        const locale = siteLocaleFromInput(url.searchParams.get(paramName))
        if (locale) {
            return locale
        }
    }

    return null
}

function isFacebookCrawler(request: NextRequest) {
    const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? ""

    return facebookCrawlerUserAgentParts.some((part) => userAgent.includes(part))
}

function canonicalLocaleUrl(request: NextRequest, locale: string) {
    const url = request.nextUrl.clone()
    url.pathname = locale === defaultSiteLocale ? "/" : `/${locale}`
    localeParamNames.forEach((paramName) => url.searchParams.delete(paramName))

    return url
}

export function proxy(request: NextRequest) {
    const locale = localeFromRequestUrl(request.nextUrl)
    if (!locale) {
        return NextResponse.next()
    }

    if (isFacebookCrawler(request)) {
        return NextResponse.redirect(canonicalLocaleUrl(request, locale), 308)
    }

    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`

    return NextResponse.rewrite(url)
}

export const config = {
    matcher: "/",
}
