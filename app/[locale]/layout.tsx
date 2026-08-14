import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import { SiteDocument } from "../_components/site-document"
import { defaultSiteLocale, siteLanguageByLocale, siteLocaleFromInput } from "../_lib/site-content"
import { rootMetadata, rootViewport } from "../_lib/root-metadata"
import "../globals.css"

type LocalizedRootLayoutProps = {
    children: ReactNode
    params: Promise<{
        locale: string
    }>
}

export const metadata = rootMetadata
export const viewport = rootViewport

export default async function LocalizedRootLayout(p: LocalizedRootLayoutProps) {
    const locale = siteLocaleFromInput((await p.params).locale)
    if (!locale || locale === defaultSiteLocale) {
        notFound()
    }

    return <SiteDocument lang={siteLanguageByLocale[locale].htmlLang}>{p.children}</SiteDocument>
}
