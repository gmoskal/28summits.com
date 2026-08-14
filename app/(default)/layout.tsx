import type { ReactNode } from "react"
import { SiteDocument } from "../_components/site-document"
import { defaultSiteLocale, siteLanguageByLocale } from "../_lib/site-content"
import { rootMetadata, rootViewport } from "../_lib/root-metadata"
import "../globals.css"

export const metadata = rootMetadata
export const viewport = rootViewport

export default function DefaultRootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <SiteDocument lang={siteLanguageByLocale[defaultSiteLocale].htmlLang}>{children}</SiteDocument>
}
