import { homeMarketingContent } from "../_lib/home-marketing-content"
import {
    type SiteLocale,
    absoluteSiteUrl,
    siteConfig,
    siteHomeUrl,
    siteHomeUrlForLocale,
    siteLanguageByLocale,
    siteLanguages,
    siteSocialImageForLocale,
} from "../_lib/site-content"

type HomeStructuredDataProps = {
    locale: SiteLocale
}

const schemaContext = "https://schema.org"
const organizationId = `${siteHomeUrl}#organization`
const websiteId = `${siteHomeUrl}#website`
const applicationId = `${siteHomeUrl}#application`
const appStoreAvailability = `${schemaContext}/InStock`

export const HomeStructuredData = (p: HomeStructuredDataProps) => {
    const content = homeMarketingContent[p.locale]
    const pageUrl = siteHomeUrlForLocale(p.locale)
    const language = siteLanguageByLocale[p.locale].htmlLang
    const graph = {
        "@context": schemaContext,
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: siteConfig.registeredOperatorName,
                alternateName: siteConfig.operatorTradingName,
                url: siteHomeUrl,
                logo: {
                    "@type": "ImageObject",
                    url: absoluteSiteUrl("/app-icon.png"),
                    width: 1024,
                    height: 1024,
                },
                email: siteConfig.contactEmail,
                telephone: siteConfig.contactPhone,
                brand: {
                    "@type": "Brand",
                    name: siteConfig.productName,
                },
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                url: siteHomeUrl,
                name: siteConfig.name,
                inLanguage: siteLanguages.map((siteLanguage) => siteLanguage.htmlLang),
                publisher: { "@id": organizationId },
            },
            {
                "@type": "MobileApplication",
                "@id": applicationId,
                name: siteConfig.productName,
                url: pageUrl,
                installUrl: siteConfig.appStoreUrl,
                sameAs: [siteConfig.appStoreUrl],
                description: content.metadata.description,
                applicationCategory: "TravelApplication",
                operatingSystem: "iOS 17.0 or later",
                inLanguage: language,
                image: siteSocialImageForLocale(p.locale).secureUrl,
                isAccessibleForFree: true,
                author: { "@id": organizationId },
                publisher: { "@id": organizationId },
                offers: {
                    "@type": "Offer",
                    price: 0,
                    priceCurrency: siteConfig.currencyCode,
                    availability: appStoreAvailability,
                    url: siteConfig.appStoreUrl,
                },
            },
            {
                "@type": "FAQPage",
                "@id": `${pageUrl}#faq`,
                url: `${pageUrl}#faq`,
                inLanguage: language,
                isPartOf: { "@id": websiteId },
                mainEntity: content.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                    },
                })),
            },
        ],
    }
    const json = JSON.stringify(graph).replaceAll("<", "\\u003c")

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
