import assert from "node:assert/strict"
import test from "node:test"
import { createJiti } from "jiti"

const jiti = createJiti(import.meta.url)
const { homeMarketingContent } = await jiti.import("./home-marketing-content.ts")
const {
    defaultSiteLocale,
    localizedSiteLocales,
    siteHomeLanguageAlternates,
    siteHomeUrl,
    siteHomeUrlForLocale,
    siteLocales,
} = await jiti.import("./site-content.ts")
const { homeMetadataForLocale } = await jiti.import("./site-metadata.ts")

test("every site locale has complete, substantive home marketing content", () => {
    assert.deepEqual(Object.keys(homeMarketingContent), siteLocales)

    for (const locale of siteLocales) {
        const content = homeMarketingContent[locale]

        assert.match(content.metadata.title, /28 gór/)
        assert.ok(content.metadata.description.length >= 100)
        assert.ok(content.introduction.length >= 140)
        assert.equal(content.features.length, 3)
        assert.equal(content.faqs.length, 4)
        assert.ok(content.features.every((feature) => feature.title.length > 5 && feature.description.length >= 100))
        assert.ok(content.faqs.every((faq) => faq.question.length > 10 && faq.answer.length >= 80))
        assert.ok(content.downloadLabel.length > 15)
    }
})

test("localized home routes derive from the site locale source", () => {
    assert.equal(localizedSiteLocales.includes(defaultSiteLocale), false)
    assert.equal(localizedSiteLocales.length, siteLocales.length - 1)
    assert.equal(siteHomeUrlForLocale(defaultSiteLocale), siteHomeUrl)

    for (const locale of localizedSiteLocales) {
        assert.equal(siteHomeUrlForLocale(locale), `https://28gor.app/${locale}`)
    }
})

test("home metadata publishes canonical and bidirectional language alternates", () => {
    const expectedAlternateKeys = [...siteLocales, "x-default"]

    assert.deepEqual(Object.keys(siteHomeLanguageAlternates), expectedAlternateKeys)
    assert.equal(siteHomeLanguageAlternates["x-default"], siteHomeUrl)

    for (const locale of siteLocales) {
        const metadata = homeMetadataForLocale(locale)

        assert.equal(metadata.alternates.canonical, siteHomeUrlForLocale(locale))
        assert.deepEqual(metadata.alternates.languages, siteHomeLanguageAlternates)
        assert.equal(metadata.title.absolute, homeMarketingContent[locale].metadata.title)
        assert.equal(metadata.description, homeMarketingContent[locale].metadata.description)
    }
})

test("localized titles and descriptions do not fall back to another language", () => {
    assert.equal(new Set(siteLocales.map((locale) => homeMarketingContent[locale].metadata.title)).size, siteLocales.length)
    assert.equal(new Set(siteLocales.map((locale) => homeMarketingContent[locale].metadata.description)).size, siteLocales.length)
})
