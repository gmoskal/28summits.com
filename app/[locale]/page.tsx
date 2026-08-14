import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HomePageClient } from "../_components/home-page-client"
import { HomeStructuredData } from "../_components/home-structured-data"
import { homeMetadataForLocale } from "../_lib/site-metadata"
import { localizedSiteLocales, siteLocaleFromInput } from "../_lib/site-content"

type LocalizedHomePageProps = {
    params: Promise<{
        locale: string
    }>
}

export const dynamicParams = false

export function generateStaticParams() {
    return localizedSiteLocales.map((locale) => ({ locale }))
}

export async function generateMetadata(p: LocalizedHomePageProps): Promise<Metadata> {
    const params = await p.params
    const locale = siteLocaleFromInput(params.locale)

    if (!locale) {
        notFound()
    }

    return homeMetadataForLocale(locale)
}

export default async function LocalizedHomePage(p: LocalizedHomePageProps) {
    const params = await p.params
    const locale = siteLocaleFromInput(params.locale)
    if (!locale) {
        notFound()
    }

    return (
        <>
            <HomeStructuredData locale={locale} />
            <HomePageClient initialLocale={locale} />
        </>
    )
}
