import type { Metadata } from "next"
import { LegalDocument, siteConfig } from "../_lib/site-content"
import { LegalPageClient } from "./legal-page-client"

export function buildLegalMetadata(document: LegalDocument): Metadata {
    const description = document.intro.join(" ")
    const url = `${siteConfig.siteUrl}/${document.slug}`
    const image = {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: siteConfig.socialImageAlt,
    } as const

    return {
        title: document.title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title: `${document.title} | ${siteConfig.name}`,
            description,
            siteName: siteConfig.name,
            locale: "pl_PL",
            alternateLocale: ["en_US"],
            images: [image],
        },
        twitter: {
            card: "summary_large_image",
            title: `${document.title} | ${siteConfig.name}`,
            description,
            images: [siteConfig.socialImage],
        },
    }
}

export function LegalPage({ slug }: { slug: LegalDocument["slug"] }) {
    return <LegalPageClient slug={slug} />
}
