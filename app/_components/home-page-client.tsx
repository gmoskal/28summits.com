"use client"

import { SiteLocale, homeContent, siteConfig } from "../_lib/site-content"
import { useSitePreferences } from "../_lib/site-preferences"
import { CardStackPreview } from "./card-stack-preview"
import { BrandMark } from "./site-shell"
import { SiteControls } from "./site-controls"
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

function AppleIcon() {
    return (
        <svg aria-hidden="true" className="h-[25px] w-[21px] shrink-0" viewBox="0 0 20 24" fill="currentColor">
            <path d="M16.37 12.73c-.02-2.44 2-3.62 2.09-3.67-1.14-1.67-2.9-1.9-3.52-1.92-1.48-.15-2.92.88-3.67.88-.77 0-1.93-.86-3.18-.84-1.61.03-3.12.96-3.95 2.42-1.71 2.96-.44 7.31 1.2 9.7.82 1.17 1.78 2.47 3.03 2.42 1.22-.05 1.67-.78 3.14-.78 1.46 0 1.88.78 3.16.75 1.32-.02 2.15-1.17 2.93-2.35.95-1.35 1.33-2.68 1.35-2.75-.03-.01-2.55-.98-2.58-3.86ZM13.97 5.57c.66-.83 1.1-1.95.98-3.09-.96.04-2.16.67-2.85 1.48-.61.7-1.16 1.87-1.01 2.96 1.08.08 2.19-.54 2.88-1.35Z" />
        </svg>
    )
}

type AppStoreButtonProps = {
    badge: (typeof homeContent)[SiteLocale]["hero"]["appStoreBadge"]
}

function AppStoreButton({ badge }: AppStoreButtonProps) {
    return (
        <button
            type="button"
            disabled
            aria-label={badge.disabledLabel}
            title={badge.disabledLabel}
            className="inline-flex h-[50px] min-w-[166px] items-center justify-center gap-2 rounded-[15px] border border-[#2c2c2c] bg-[#050505] px-4 text-white opacity-55 shadow-[0_16px_34px_rgba(0,0,0,0.16)]"
        >
            <AppleIcon />
            <span className="flex min-w-0 flex-col items-start leading-none">
                <span className="text-[10px] leading-[12px] font-semibold tracking-normal whitespace-nowrap">
                    {badge.prefix}
                </span>
                <span className="text-[18px] leading-[20px] font-bold tracking-normal whitespace-nowrap">
                    {badge.label}
                </span>
            </span>
        </button>
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
        <main className="page-transition-shell bg-[var(--page-bg)] text-[var(--text-primary)]">
            <section className="relative min-h-screen">
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

                    <div className="grid gap-0 pt-2 pb-8 xl:flex-1 xl:-translate-y-[8vh] xl:grid-cols-[minmax(340px,0.9fr)_minmax(360px,0.86fr)] xl:items-center xl:gap-6 xl:pt-0 xl:pb-0 2xl:-translate-y-[11vh]">
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
                                    className="text-[76px] leading-[0.88] tracking-normal text-[var(--text-primary)] xl:text-[clamp(76px,7vw,116px)]"
                                    style={{
                                        fontFamily: 'Caveat, "Caveat Fallback"',
                                        fontFeatureSettings: "'liga' 0",
                                        fontWeight: 900,
                                    }}
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
                                    <AppStoreButton badge={content.hero.appStoreBadge} />
                                    <HeroLink href={siteConfig.launchUpdatesUrl}>{content.hero.ctas.updates}</HeroLink>
                                </div>
                                <p className="text-[14px] leading-[20px] font-semibold text-[var(--text-muted)] xl:pl-[6px] xl:text-[15px] xl:leading-[21px]">
                                    {content.hero.caption}
                                </p>
                            </div>
                        </article>

                        <div className="relative order-1 flex items-center justify-center xl:order-2">
                            <CardStackPreview locale={locale} />
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
