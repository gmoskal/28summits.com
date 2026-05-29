import type { Metadata } from "next"
import { LegalDocument, siteConfig } from "../_lib/site-content"
import { BrandMark } from "./site-shell"
import { SmoothBackButton, SmoothLink } from "./smooth-navigation"

export function buildLegalMetadata(document: LegalDocument): Metadata {
    const description = document.intro.join(" ")
    const url = `${siteConfig.siteUrl}/${document.slug}`

    return {
        title: document.title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title: `${document.title} | ${siteConfig.name}`,
            description,
            siteName: siteConfig.name,
        },
    }
}

export function LegalPage({ document }: { document: LegalDocument }) {
    return (
        <main className="page-transition-shell min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
            <div className="mx-auto grid min-h-screen w-full max-w-[var(--layout-max-width)] grid-cols-1 px-8 py-8 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-16 lg:px-[42px] lg:py-[42px]">
                <aside className="lg:pt-1">
                    <div className="sticky top-[42px] grid w-full grid-cols-[1fr_auto_1fr] items-start lg:flex lg:w-auto lg:flex-col lg:items-start lg:gap-5">
                        <SmoothBackButton className="justify-self-start lg:order-2" />
                        <div className="justify-self-center lg:order-1">
                            <BrandMark compact />
                        </div>
                        <span aria-hidden className="lg:hidden" />
                    </div>
                </aside>

                <div className="mt-9 lg:mt-0">
                    <LegalBody document={document} />
                </div>
            </div>
        </main>
    )
}

function LegalBody({ document }: { document: LegalDocument }) {
    return (
        <article className="mx-auto max-w-[720px] pb-16 lg:mx-0">
            <h1
                className="text-center text-[30px] leading-[36px] font-semibold text-[var(--text-primary)] lg:text-left lg:text-[42px] lg:leading-[50px]"
                style={{ fontFeatureSettings: "'liga' 0" }}
            >
                {document.title}
            </h1>
            <p
                className="mt-4 text-center text-[15px] leading-[22px] text-[var(--text-muted)] lg:text-left lg:text-[17px] lg:leading-[25px]"
            >
                {document.effectiveDate}
            </p>

            <div className="mt-8 flex flex-col gap-4">
                {document.intro.map((paragraph) => (
                    <p
                        key={paragraph}
                        className="text-[17px] leading-[25px] font-semibold text-[var(--text-primary)]"
                    >
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
                                    <ul
                                        key={`${section.heading}-${index}`}
                                        className="flex list-disc flex-col gap-2 pl-5"
                                    >
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
                <SmoothLink href="/privacy">Polityka prywatności</SmoothLink>
                <SmoothLink href="/terms">Regulamin</SmoothLink>
                <SmoothLink href="/support">Kontakt</SmoothLink>
            </footer>
        </article>
    )
}
