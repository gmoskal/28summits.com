import type { MetadataRoute } from "next"
import { siteConfig } from "./_lib/site-content"

const searchableCrawlerUserAgents = ["*", "OAI-SearchBot", "ChatGPT-User", "GPTBot"] as const

export default function robots(): MetadataRoute.Robots {
    return {
        rules: searchableCrawlerUserAgents.map((userAgent) => ({
            userAgent,
            allow: "/",
        })),
        sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    }
}
