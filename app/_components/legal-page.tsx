import type { Metadata } from "next"
import {
    LegalDocument,
    siteConfig,
    siteLanguages,
    siteSocialImage,
    siteSocialTwitterImage,
} from "../_lib/site-content"
import { LegalPageClient } from "./legal-page-client"

export function buildLegalMetadata(document: LegalDocument): Metadata {
    const description = document.intro.join(" ")
    const url = `${siteConfig.siteUrl}/${document.slug}`

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
            alternateLocale: siteLanguages
                .filter((language) => language.ogLocale !== "pl_PL")
                .map((language) => language.ogLocale),
            images: [siteSocialImage],
        },
        twitter: {
            card: "summary_large_image",
            title: `${document.title} | ${siteConfig.name}`,
            description,
            images: [siteSocialTwitterImage],
        },
    }
}

export function LegalPage({ slug }: { slug: LegalDocument["slug"] }) {
    return <LegalPageClient slug={slug} />
}
