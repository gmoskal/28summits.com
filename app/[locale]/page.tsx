import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HomePageClient } from "../_components/home-page-client"
import { homeMetadataForLocale } from "../_lib/site-metadata"
import { defaultSiteLocale, siteConfig, siteLocaleFromInput, siteLocales } from "../_lib/site-content"

type LocalizedHomePageProps = {
    params: Promise<{
        locale: string
    }>
}

export const dynamicParams = false

export function generateStaticParams() {
    return siteLocales.map((locale) => ({ locale }))
}

function localePageUrl(locale: string) {
    if (locale === defaultSiteLocale) {
        return siteConfig.siteUrl
    }

    return `${siteConfig.siteUrl}/${locale}`
}

export async function generateMetadata(p: LocalizedHomePageProps): Promise<Metadata> {
    const params = await p.params
    const locale = siteLocaleFromInput(params.locale)

    if (!locale) {
        notFound()
    }

    return homeMetadataForLocale(locale, localePageUrl(locale))
}

export default async function LocalizedHomePage(p: LocalizedHomePageProps) {
    const params = await p.params
    if (!siteLocaleFromInput(params.locale)) {
        notFound()
    }

    return <HomePageClient />
}
