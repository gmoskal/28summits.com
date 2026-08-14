import type { MetadataRoute } from "next"
import { siteConfig, siteHomeUrlForLocale, siteLocales } from "./_lib/site-content"

const homeLastModified = new Date("2026-08-13")
const legalLastModified = new Date("2026-07-24")
const legalPaths = ["/privacy", "/support", "/terms"] as const

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...siteLocales.map((locale) => ({
            url: siteHomeUrlForLocale(locale),
            lastModified: homeLastModified,
            changeFrequency: "weekly" as const,
            priority: 1,
        })),
        ...legalPaths.map((path) => ({
            url: `${siteConfig.siteUrl}${path}`,
            lastModified: legalLastModified,
            changeFrequency: "yearly" as const,
            priority: 0.2,
        })),
    ]
}
