import type { Metadata } from "next"
import { HomePageClient } from "./_components/home-page-client"
import {
    SiteLocale,
    defaultSiteLocale,
    siteConfig,
    siteLanguageByLocale,
    siteLanguages,
    siteSocialImageForLocale,
    siteSocialTwitterImageForLocale,
    socialContentForLocale,
} from "./_lib/site-content"

type HomePageMetadataProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

function firstSearchParam(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
}

function socialPageUrl(locale: SiteLocale) {
    if (locale === defaultSiteLocale) {
        return siteConfig.siteUrl
    }

    return `${siteConfig.siteUrl}/?lang=${locale}`
}

export async function generateMetadata(p: HomePageMetadataProps): Promise<Metadata> {
    const searchParams = await p.searchParams
    const localeParam = firstSearchParam(searchParams.lang ?? searchParams.locale)
    const socialContent = socialContentForLocale(localeParam)
    const socialImage = siteSocialImageForLocale(socialContent.locale)
    const socialTwitterImage = siteSocialTwitterImageForLocale(socialContent.locale)
    const pageUrl = socialPageUrl(socialContent.locale)

    return {
        title: siteConfig.name,
        description: socialContent.description,
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

export default function HomePage() {
    return <HomePageClient />
}
