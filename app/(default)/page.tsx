import { HomePageClient } from "../_components/home-page-client"
import { HomeStructuredData } from "../_components/home-structured-data"
import { defaultSiteLocale } from "../_lib/site-content"
import { homeMetadataForLocale } from "../_lib/site-metadata"

export const metadata = homeMetadataForLocale(defaultSiteLocale)

export default function HomePage() {
    return (
        <>
            <HomeStructuredData locale={defaultSiteLocale} />
            <HomePageClient initialLocale={defaultSiteLocale} />
        </>
    )
}
