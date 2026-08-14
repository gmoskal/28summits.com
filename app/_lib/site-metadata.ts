import type { Metadata } from "next"
import { homeMarketingContent } from "./home-marketing-content"
import {
    SiteLocale,
    siteConfig,
    siteHomeLanguageAlternates,
    siteHomeUrlForLocale,
    siteLanguageByLocale,
    siteLanguages,
    siteSocialImageForLocale,
    siteSocialTwitterImageForLocale,
    socialContentForLocale,
} from "./site-content"

export function homeMetadataForLocale(locale: SiteLocale): Metadata {
    const marketingContent = homeMarketingContent[locale]
    const socialContent = socialContentForLocale(locale)
    const socialImage = siteSocialImageForLocale(socialContent.locale)
    const socialTwitterImage = siteSocialTwitterImageForLocale(socialContent.locale)
    const pageUrl = siteHomeUrlForLocale(locale)

    return {
        title: {
            absolute: marketingContent.metadata.title,
        },
        description: marketingContent.metadata.description,
        alternates: {
            canonical: pageUrl,
            languages: siteHomeLanguageAlternates,
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
