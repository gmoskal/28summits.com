import type { Metadata } from "next"
import {
    SiteLocale,
    siteConfig,
    siteLanguageByLocale,
    siteLanguages,
    siteSocialImageForLocale,
    siteSocialTwitterImageForLocale,
    socialContentForLocale,
} from "./site-content"

export function homeMetadataForLocale(locale: SiteLocale, pageUrl: string): Metadata {
    const socialContent = socialContentForLocale(locale)
    const socialImage = siteSocialImageForLocale(socialContent.locale)
    const socialTwitterImage = siteSocialTwitterImageForLocale(socialContent.locale)

    return {
        title: siteConfig.name,
        description: socialContent.description,
        alternates: {
            canonical: pageUrl,
        },
        icons: {
            other: [{ rel: "image_src", url: socialImage.secureUrl }],
        },
        openGraph: {
            type: "website",
            url: pageUrl,
            title: socialContent.title,
            description: socialContent.description,
            siteName: siteConfig.name,
            locale: siteLanguageByLocale[socialContent.locale].ogLocale,
            alternateLocale: siteLanguages
                .filter((language) => language.locale !== socialContent.locale)
                .map((language) => language.ogLocale),
            images: [socialImage],
        },
        twitter: {
            card: "summary_large_image",
            title: socialContent.title,
            description: socialContent.description,
            images: [socialTwitterImage],
        },
    }
}
