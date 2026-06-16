"use client"

import { SiteLocale, homeContent, siteConfig } from "../_lib/site-content"
import { useSitePreferences } from "../_lib/site-preferences"
import { BrandMark } from "./site-shell"
import { SiteControls } from "./site-controls"
import { MascotPreview } from "./mascot-preview"
import { SmoothLink } from "./smooth-navigation"

function HeroLink({
    href,
    children,
    variant = "primary",
    className = "",
}: {
    href: string
    children: React.ReactNode
    variant?: "primary" | "secondary"
    className?: string
}) {
    const colors = variant === "primary" ? "" : "backdrop-blur"
    const linkStyle =
        variant === "primary"
            ? {
                  backgroundColor: "var(--button-primary-bg)",
                  boxShadow: "0 16px 34px var(--shadow-button)",
                  color: "var(--button-primary-text)",
              }
            : {
                  backgroundColor: "var(--button-secondary-bg)",
                  boxShadow: "inset 0 0 0 1px var(--border-muted)",
                  color: "var(--button-secondary-text)",
              }

    return (
        <a
            href={href}
            className={`inline-flex h-[50px] items-center justify-center rounded-[15px] px-6 text-[16px] leading-[20px] font-semibold transition-[background-color,color,box-shadow] ${colors} ${className}`}
            style={linkStyle}
        >
            {children}
        </a>
    )
}

function FeatureLabels({ labels }: { labels: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
                <span
                    key={label}
                    className="rounded-full px-3 py-1.5 text-[13px] leading-[18px] font-semibold backdrop-blur"
                    style={{
                        backgroundColor: "var(--chip-bg)",
                        border: "1px solid var(--border-muted)",
                        color: "var(--text-muted)",
                    }}
                >
                    {label}
                </span>
            ))}
        </div>
    )
}

type LocalizedLegalNavProps = {
    labels: (typeof homeContent)[SiteLocale]["nav"]
    className?: string
}

type ComplianceNoticeProps = {
    content: (typeof homeContent)[SiteLocale]["compliance"]
}

function LocalizedLegalNav({ labels, className = "" }: LocalizedLegalNavProps) {
    return (
        <nav className={`flex items-center gap-4 ${className}`} aria-label="Legal">
            <SmoothLink className="text-[15px] leading-[20px] font-semibold text-[var(--text-muted)]" href="/privacy">
                {labels.privacy}
            </SmoothLink>
            <SmoothLink className="text-[15px] leading-[20px] font-semibold text-[var(--text-muted)]" href="/terms">
                {labels.terms}
            </SmoothLink>
            <SmoothLink className="text-[15px] leading-[20px] font-semibold text-[var(--text-muted)]" href="/support">
                {labels.support}
            </SmoothLink>
        </nav>
    )
}

function ComplianceNotice({ content }: ComplianceNoticeProps) {
    return (
        <p className="max-w-[760px] text-center text-[12px] leading-[18px] font-semibold text-[var(--text-muted)] xl:text-left">
            {content.summaryParts.map((part, index) => (
                <span key={part}>
                    {index > 0 ? <span aria-hidden> · </span> : null}
                    {part}
                </span>
            ))}
            <span aria-hidden> · </span>
            <span>{content.contactLabel}: </span>
            <a href={`mailto:${siteConfig.contactEmail}`} className="underline decoration-transparent underline-offset-4 hover:decoration-current">
                {siteConfig.contactEmail}
            </a>
            <span aria-hidden> · </span>
            <SmoothLink href="/terms" className="underline decoration-transparent underline-offset-4 hover:decoration-current">
                {content.legalPolicies}
            </SmoothLink>
        </p>
    )
}

export function HomePageClient() {
    const { locale, themeMode, setLocale, setThemeMode } = useSitePreferences()
    const content = homeContent[locale]

    return (
        <main className="page-transition-shell overflow-clip bg-[var(--page-bg)] text-[var(--text-primary)]">
            <section className="relative min-h-screen">
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[var(--border-muted)]" />

                <div className="relative mx-auto flex min-h-screen max-w-[var(--layout-max-width)] flex-col px-5 pt-6 pb-8 lg:px-[28px] lg:py-[34px] xl:px-[32px]">
                    <header className="z-10 flex items-start justify-between gap-4">
                        <BrandMark compact showName={false} />
                        <SiteControls
                            content={content.controls}
                            locale={locale}
                            themeMode={themeMode}
                            onLocaleChange={setLocale}
                            onThemeModeChange={setThemeMode}
                        />
                    </header>

                    <div className="grid gap-0 pt-2 pb-8 xl:flex-1 xl:grid-cols-[minmax(340px,0.9fr)_minmax(360px,0.86fr)] xl:items-center xl:gap-6 xl:pt-0 xl:pb-0">
                        <article className="order-2 mx-auto flex w-full max-w-[618px] flex-col items-center gap-3 text-center xl:order-1 xl:mx-0 xl:items-start xl:gap-[38px] xl:text-left">
                            <div className="flex flex-col items-center gap-3 xl:items-start xl:gap-[20px]">
                                <span
                                    className="w-fit rounded-full px-4 py-2 text-[13px] leading-[18px] font-bold tracking-normal shadow-[0_12px_28px_var(--shadow-soft)] backdrop-blur xl:text-[14px]"
                                    style={{
                                        backgroundColor: "var(--chip-bg)",
                                        border: "1px solid var(--border-muted)",
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    {content.hero.eyebrow}
                                </span>
                                <h1
                                    className="text-[76px] leading-[0.88] font-semibold tracking-normal text-[var(--text-primary)] xl:text-[clamp(76px,7vw,116px)]"
                                    style={{ fontFeatureSettings: "'liga' 0" }}
                                >
                                    {content.hero.headline}
                                </h1>
                                <p
                                    className="max-w-[350px] text-[15px] leading-[21px] font-semibold text-[var(--text-secondary)] xl:max-w-[588px] xl:text-[20px] xl:leading-[28px]"
                                    style={{ fontFeatureSettings: "'ss02' 1, 'liga' 0" }}
                                >
                                    {content.hero.body}
                                </p>
                                <FeatureLabels labels={content.hero.featureLabels} />
                            </div>

                            <div className="flex w-full flex-col items-center gap-3 xl:items-start">
                                <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
                                    <HeroLink href={siteConfig.launchUpdatesUrl}>{content.hero.ctas.updates}</HeroLink>
                                </div>
                                <p className="text-[14px] leading-[20px] font-semibold text-[var(--text-muted)] xl:pl-[6px] xl:text-[15px] xl:leading-[21px]">
                                    {content.hero.caption}
                                </p>
                            </div>
                        </article>

                        <div className="relative order-1 flex items-center justify-center xl:order-2">
                            <div className="hidden w-full xl:block">
                                <MascotPreview variant="desktop" />
                            </div>
                            <div className="w-full xl:hidden">
                                <MascotPreview variant="mobile" />
                            </div>
                        </div>
                    </div>

                    <footer className="z-10 mt-auto flex flex-col items-center gap-3 xl:mt-0 xl:items-start">
                        <LocalizedLegalNav labels={content.nav} />
                        <ComplianceNotice content={content.compliance} />
                    </footer>
                </div>
            </section>
        </main>
    )
}
