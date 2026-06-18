import { NextRequest, NextResponse } from "next/server"
import { siteLocaleFromInput } from "./app/_lib/site-content"

const localeParamNames = ["lang", "locale"] as const

function localeFromRequestUrl(url: URL) {
    for (const paramName of localeParamNames) {
        const locale = siteLocaleFromInput(url.searchParams.get(paramName))
        if (locale) {
            return locale
        }
    }

    return null
}

export function proxy(request: NextRequest) {
    const locale = localeFromRequestUrl(request.nextUrl)
    if (!locale) {
        return NextResponse.next()
    }

    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`

    return NextResponse.rewrite(url)
}

export const config = {
    matcher: "/",
}
