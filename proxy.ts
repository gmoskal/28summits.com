import { NextRequest, NextResponse } from "next/server"
import { defaultSiteLocale, siteLocaleFromInput } from "./app/_lib/site-content"

const localeParamNames = ["lang", "locale"] as const

function pathLocale(pathname: string) {
    const [, localeInput] = pathname.split("/")

    return siteLocaleFromInput(localeInput)
}

function queryLocale(url: URL) {
    for (const paramName of localeParamNames) {
        const locale = siteLocaleFromInput(url.searchParams.get(paramName))
        if (locale) {
            return locale
        }
    }

    return null
}

function stripLocaleParams(url: URL) {
    for (const paramName of localeParamNames) {
        url.searchParams.delete(paramName)
    }
}

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone()
    const currentPathLocale = pathLocale(url.pathname)
    const requestedLocale = queryLocale(url)
    const shouldCanonicalizePath =
        url.pathname === `/${defaultSiteLocale}`
        || (currentPathLocale !== null && url.pathname.endsWith("/"))

    if (!requestedLocale && !shouldCanonicalizePath) {
        return NextResponse.next()
    }

    const nextLocale = requestedLocale ?? currentPathLocale ?? defaultSiteLocale
    url.pathname = nextLocale === defaultSiteLocale ? "/" : `/${nextLocale}`
    stripLocaleParams(url)

    return NextResponse.redirect(url, 308)
}

export const config = {
    matcher: ["/", "/:locale(pl|en|es|de|fr|nb|cs|sk|uk)"],
}
