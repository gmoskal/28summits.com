import { NextRequest, NextResponse } from "next/server"
import type { SiteLocale } from "./app/_lib/site-content"
import {
    defaultSiteLocale,
    siteConfig,
    siteLanguageByLocale,
    siteLocaleFromInput,
    socialContentForLocale,
} from "./app/_lib/site-content"

const localeParamNames = ["lang", "locale"] as const
const facebookCrawlerUserAgentParts = [
    "facebookexternalhit",
    "facebookbot",
    "facebookcatalog",
    "facebookplatform",
    "facebot",
    "meta-externalagent",
    "meta-externalfetcher",
] as const
const socialImageSize = {
    width: 1200,
    height: 630,
} as const

function localeFromRequestUrl(url: URL) {
    for (const paramName of localeParamNames) {
        const locale = siteLocaleFromInput(url.searchParams.get(paramName))
        if (locale) {
            return locale
        }
    }

    return null
}

function localeFromRequestPath(url: URL) {
    const [, segment] = url.pathname.split("/")

    return siteLocaleFromInput(segment)
}

function isFacebookCrawler(request: NextRequest) {
    const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? ""

    return facebookCrawlerUserAgentParts.some((part) => userAgent.includes(part))
}

function localeForFacebookCrawler(request: NextRequest) {
    const locale = localeFromRequestUrl(request.nextUrl) ?? localeFromRequestPath(request.nextUrl)
    if (locale) {
        return locale
    }

    return request.nextUrl.pathname === "/" ? defaultSiteLocale : null
}

function canonicalSocialUrl(locale: SiteLocale) {
    return locale === defaultSiteLocale ? siteConfig.siteUrl : `${siteConfig.siteUrl}/${locale}`
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
}

function facebookSocialPreviewResponse(locale: SiteLocale) {
    const content = socialContentForLocale(locale)
    const language = siteLanguageByLocale[content.locale]
    const pageUrl = canonicalSocialUrl(content.locale)
    const imageUrl = `${siteConfig.siteUrl}${content.image.replace(/\.png$/, ".jpg")}`
    const title = escapeHtml(content.title)
    const description = escapeHtml(content.description)
    const imageAlt = escapeHtml(content.imageAlt)

    return new NextResponse(`<!doctype html>
<html lang="${language.htmlLang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${pageUrl}">
<meta property="og:type" content="website">
<meta property="og:url" content="${pageUrl}">
<meta property="og:site_name" content="${escapeHtml(siteConfig.name)}">
<meta property="og:locale" content="${language.ogLocale}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:image:url" content="${imageUrl}">
<meta property="og:image:secure_url" content="${imageUrl}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="${socialImageSize.width}">
<meta property="og:image:height" content="${socialImageSize.height}">
<meta property="og:image:alt" content="${imageAlt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">
<meta name="twitter:image:alt" content="${imageAlt}">
</head>
<body></body>
</html>`, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=0, must-revalidate",
        },
    })
}

export function proxy(request: NextRequest) {
    if (isFacebookCrawler(request)) {
        const locale = localeForFacebookCrawler(request)
        if (locale) {
            return facebookSocialPreviewResponse(locale)
        }
    }

    const locale = localeFromRequestUrl(request.nextUrl)
    if (!locale) {
        return NextResponse.next()
    }

    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`

    return NextResponse.rewrite(url)
}

export const config = {
    matcher: ["/", "/:locale"],
}
