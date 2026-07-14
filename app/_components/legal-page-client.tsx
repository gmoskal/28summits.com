"use client"

import { useEffect } from "react"
import type { LegalDocument, LegalDocumentLocale, LegalLanguageNotice } from "../_lib/site-content"
import {
    homeContent,
    legalDocumentLocaleForSiteLocale,
    legalDocumentsByLocale,
    legalLanguageNoticeByLocale,
    siteConfig,
} from "../_lib/site-content"
import { useSitePreferences } from "../_lib/site-preferences"
import { BrandMark } from "./site-shell"
import { SiteControls } from "./site-controls"
import { SmoothBackButton, SmoothLink } from "./smooth-navigation"

export function LegalPageClient({ slug }: { slug: LegalDocument["slug"] }) {
    const { locale, themeMode, setLocale, setThemeMode } = useSitePreferences()
    const legalDocumentLocale = legalDocumentLocaleForSiteLocale(locale)
    const legalDocument = legalDocumentsByLocale[legalDocumentLocale][slug]
    const legalLanguageNotice = legalDocumentLocale === locale ? null : legalLanguageNoticeByLocale[locale]
    const content = homeContent[locale]
    const backLabel = content.nav.back

    useEffect(() => {
        const pageTitle = `${legalDocument.title} | ${siteConfig.name}`
        window.document.title = pageTitle
        const titleTimer = window.setTimeout(() => {
            window.document.title = pageTitle
        }, 50)

        return () => window.clearTimeout(titleTimer)
    }, [legalDocument.title])

    return (
        <main className="page-transition-shell min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
            <div className="mx-auto grid min-h-screen w-full max-w-[var(--layout-max-width)] grid-cols-1 px-8 py-8 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-16 lg:px-[42px] lg:py-[42px]">
                <aside className="lg:pt-1">
                    <div className="sticky top-[42px] flex flex-col items-center gap-5 lg:items-start">
                        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-start lg:flex lg:w-auto lg:flex-col lg:items-start lg:gap-5">
                            <SmoothBackButton className="justify-self-start lg:order-2">{backLabel}</SmoothBackButton>
                            <div className="justify-self-center lg:order-1">
                                <BrandMark compact />
                            </div>
                            <span aria-hidden className="lg:hidden" />
                        </div>
                        <SiteControls
                            content={content.controls}
                            locale={locale}
                            themeMode={themeMode}
                            onLocaleChange={setLocale}
                            onThemeModeChange={setThemeMode}
                        />
                    </div>
                </aside>

                <div className="mt-9 lg:mt-0">
                    <LegalBody
                        document={legalDocument}
                        labels={content.nav}
                        languageNotice={legalLanguageNotice}
                        onLegalLocaleChange={setLocale}
                    />
                </div>
            </div>
        </main>
    )
}

function LegalBody({
    document,
    labels,
    languageNotice,
    onLegalLocaleChange,
}: {
    document: LegalDocument
    labels: (typeof homeContent)[keyof typeof homeContent]["nav"]
    languageNotice: LegalLanguageNotice | null
    onLegalLocaleChange: (locale: LegalDocumentLocale) => void
}) {
    return (
        <article className="mx-auto max-w-[720px] pb-16 lg:mx-0">
            <h1
                className="text-center text-[30px] leading-[36px] font-semibold text-[var(--text-primary)] lg:text-left lg:text-[42px] lg:leading-[50px]"
                style={{ fontFeatureSettings: "'liga' 0" }}
            >
                {document.title}
            </h1>
            <p className="mt-4 text-center text-[15px] leading-[22px] text-[var(--text-muted)] lg:text-left lg:text-[17px] lg:leading-[25px]">
                {document.effectiveDate}
            </p>

            {languageNotice ? (
                <aside className="mt-7 border-l-2 border-[#e67621] py-1 pl-5 text-left">
                    <h2 className="text-[17px] leading-[24px] font-semibold text-[var(--text-primary)]">
                        {languageNotice.title}
                    </h2>
                    <p className="mt-2 text-[16px] leading-[24px] font-normal text-[var(--text-secondary)]">
                        {languageNotice.body}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <button
                            type="button"
                            className="cursor-pointer text-[15px] leading-[22px] font-semibold underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] hover:decoration-current"
                            style={{ color: "#e67621" }}
                            onClick={() => onLegalLocaleChange("pl")}
                        >
                            {languageNotice.polishLabel}
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer text-[15px] leading-[22px] font-semibold underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] hover:decoration-current"
                            style={{ color: "#e67621" }}
                            onClick={() => onLegalLocaleChange("en")}
                        >
                            {languageNotice.englishLabel}
                        </button>
                    </div>
                </aside>
            ) : null}

            <div className="mt-8 flex flex-col gap-4">
                {document.intro.map((paragraph) => (
                    <p key={paragraph} className="text-[17px] leading-[25px] font-semibold text-[var(--text-primary)]">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="mt-10 flex flex-col gap-10">
                {document.sections.map((section) => (
                    <section key={section.heading} className="flex flex-col gap-3">
                        <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--text-primary)]">
                            {section.heading}
                        </h2>
                        <div className="flex flex-col gap-3 text-[17px] leading-[25px] font-normal text-[var(--text-secondary)]">
                            {section.body.map((block, index) =>
                                block.type === "paragraph" ? (
                                    <p key={`${section.heading}-${index}`}>{block.text}</p>
                                ) : (
                                    <ul key={`${section.heading}-${index}`} className="flex list-disc flex-col gap-2 pl-5">
                                        {block.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                ),
                            )}
                        </div>
                    </section>
                ))}
            </div>

            <footer className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-[17px] leading-[25px] font-medium text-[var(--text-muted)]">
                <SmoothLink href="/privacy">{labels.privacy}</SmoothLink>
                <SmoothLink href="/terms">{labels.terms}</SmoothLink>
                <SmoothLink href="/support">{labels.support}</SmoothLink>
            </footer>
        </article>
    )
}
