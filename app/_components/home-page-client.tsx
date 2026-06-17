"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { SiteLocale, homeContent, siteConfig } from "../_lib/site-content"
import { useSitePreferences } from "../_lib/site-preferences"
import { CardStackPreview } from "./card-stack-preview"
import { GooeyBrandTitle } from "./gooey-brand-title"
import { BrandMark } from "./site-shell"
import { SiteControls } from "./site-controls"
import { SmoothLink } from "./smooth-navigation"

type AppStoreButtonProps = {
    badge: (typeof homeContent)[SiteLocale]["hero"]["appStoreBadge"]
}

function AppStoreButton({ badge }: AppStoreButtonProps) {
    return (
        <a
            href={siteConfig.launchUpdatesUrl}
            aria-label={badge.actionLabel}
            title={badge.actionLabel}
            className="inline-flex h-[54px] w-[182px] items-center justify-center transition-[filter,transform] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)]"
        >
            <Image
                src={siteConfig.appStoreBadgeImage}
                alt=""
                width={135}
                height={40}
                unoptimized
                draggable={false}
                className="h-full w-full select-none"
                style={{ filter: "var(--app-store-badge-filter)" }}
            />
        </a>
    )
}

type LocalizedLegalNavProps = {
    labels: (typeof homeContent)[SiteLocale]["nav"]
    className?: string
}

type ComplianceNoticeProps = {
    content: (typeof homeContent)[SiteLocale]["compliance"]
}

const legalAccentStyle = { color: "var(--accent)" }
const legalNavLinkClassName = "text-[15px] leading-[20px] font-semibold transition-[color,filter] hover:brightness-95"
const legalInlineLinkClassName = "underline decoration-transparent underline-offset-4 hover:decoration-current"

function LocalizedLegalNav({ labels, className = "" }: LocalizedLegalNavProps) {
    return (
        <nav className={`flex items-center gap-4 ${className}`} style={legalAccentStyle} aria-label="Legal">
            <SmoothLink className={legalNavLinkClassName} href="/privacy">
                {labels.privacy}
            </SmoothLink>
            <SmoothLink className={legalNavLinkClassName} href="/terms">
                {labels.terms}
            </SmoothLink>
            <SmoothLink className={legalNavLinkClassName} href="/support">
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
            <a href={`mailto:${siteConfig.contactEmail}`} className={legalInlineLinkClassName} style={legalAccentStyle}>
                {siteConfig.contactEmail}
            </a>
            <span aria-hidden> · </span>
            <SmoothLink href="/terms" className={legalInlineLinkClassName} style={legalAccentStyle}>
                {content.legalPolicies}
            </SmoothLink>
        </p>
    )
}

const storyRevealTiming = {
    copyDelayMs: 2200,
    actionDelayMs: 2620,
} as const

const topChromeClassName = "mx-auto flex max-w-[var(--layout-max-width)] items-start gap-4 px-5 pt-6 lg:px-[28px] lg:pt-[34px] xl:px-[32px]"

export function HomePageClient() {
    const { locale, themeMode, setLocale, setThemeMode } = useSitePreferences()
    const content = homeContent[locale]
    const storySectionRef = useRef<HTMLElement | null>(null)
    const statsSectionRef = useRef<HTMLElement | null>(null)
    const [storyStarted, setStoryStarted] = useState(false)
    const [storyCopyVisible, setStoryCopyVisible] = useState(false)
    const [storyActionVisible, setStoryActionVisible] = useState(false)
    const [statsStarted, setStatsStarted] = useState(false)
    const [statsFooterVisible, setStatsFooterVisible] = useState(false)
    const [brandAnimationCycle, setBrandAnimationCycle] = useState(0)
    const brandAnimationRunningRef = useRef(false)

    const handleBrandAnimationStart = useCallback(() => {
        brandAnimationRunningRef.current = true
    }, [])

    const handleBrandAnimationComplete = useCallback(() => {
        brandAnimationRunningRef.current = false
    }, [])

    const handleStoryLogoClick = useCallback(() => {
        if (brandAnimationRunningRef.current) {
            return
        }

        brandAnimationRunningRef.current = true
        setBrandAnimationCycle((cycle) => cycle + 1)
    }, [])

    const handleStatsStackEntryComplete = useCallback(() => {
        setStatsFooterVisible(true)
    }, [])

    useEffect(() => {
        const storySection = storySectionRef.current
        if (!storySection || storyStarted) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) {
                    return
                }

                setStoryStarted(true)
                observer.disconnect()
            },
            { threshold: 0.12 },
        )

        observer.observe(storySection)

        return () => observer.disconnect()
    }, [storyStarted])

    useEffect(() => {
        if (!storyStarted) {
            return
        }

        const copyTimer = window.setTimeout(() => setStoryCopyVisible(true), storyRevealTiming.copyDelayMs)
        const actionTimer = window.setTimeout(() => setStoryActionVisible(true), storyRevealTiming.actionDelayMs)

        return () => {
            window.clearTimeout(copyTimer)
            window.clearTimeout(actionTimer)
        }
    }, [storyStarted])

    useEffect(() => {
        const statsSection = statsSectionRef.current
        if (!statsSection || statsStarted) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) {
                    return
                }

                setStatsStarted(true)
                observer.disconnect()
            },
            { threshold: 0.18 },
        )

        observer.observe(statsSection)

        return () => observer.disconnect()
    }, [statsStarted])

    return (
        <main className="page-transition-shell h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-y-contain bg-[var(--page-bg)] text-[var(--text-primary)]">
            <div className="sticky top-0 z-30 h-0 overflow-visible">
                <div className={`pointer-events-none justify-start ${topChromeClassName}`}>
                    <div className="pointer-events-auto">
                        <BrandMark compact showName={false} />
                    </div>
                </div>
            </div>

            <section className="relative flex h-[100dvh] snap-start snap-always items-center justify-center overflow-hidden px-0 pt-[84px] pb-8 lg:pt-[120px]">
                <div className={`pointer-events-none absolute inset-x-0 top-0 z-20 justify-end ${topChromeClassName}`}>
                    <div className="pointer-events-auto">
                        <SiteControls
                            content={content.controls}
                            locale={locale}
                            themeMode={themeMode}
                            onLocaleChange={setLocale}
                            onThemeModeChange={setThemeMode}
                        />
                    </div>
                </div>
                <div className="relative flex h-full w-full items-center justify-center">
                    <CardStackPreview locale={locale} />
                </div>
            </section>

            <section
                ref={storySectionRef}
                className="relative flex min-h-[100dvh] snap-start snap-always flex-col items-center px-5 pt-[18dvh] pb-[2em] text-center lg:px-[28px] xl:px-[32px]"
            >
                <article className="flex w-full max-w-[720px] flex-col items-center">
                    <h1 aria-label={content.hero.headline} className="flex min-h-[105px] items-center justify-center leading-none tracking-normal xl:min-h-[163px]">
                        {storyStarted ? (
                            <button
                                type="button"
                                aria-label={content.hero.replayLogoAnimationLabel}
                                className="inline-flex touch-manipulation cursor-pointer appearance-none items-center justify-center rounded-[24px] border-0 bg-transparent p-0 text-inherit focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)]"
                                onClick={handleStoryLogoClick}
                            >
                                <GooeyBrandTitle
                                    onAnimationComplete={handleBrandAnimationComplete}
                                    onAnimationStart={handleBrandAnimationStart}
                                    replayToken={brandAnimationCycle}
                                />
                            </button>
                        ) : null}
                    </h1>

                    <div
                        className={`mt-[clamp(2rem,6dvh,5em)] mb-[clamp(1rem,3dvh,2em)] flex max-w-[620px] flex-col gap-3 text-[16px] leading-[23px] font-semibold text-[var(--text-secondary)] transition duration-700 ease-out xl:mt-[5em] xl:mb-[2em] xl:text-[20px] xl:leading-[29px] ${
                            storyCopyVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-5 opacity-0 blur-[2px]"
                        }`}
                        style={{ fontFeatureSettings: "'ss02' 1, 'liga' 0" }}
                    >
                        {content.hero.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>

                    <div
                        className={`flex flex-col items-center pt-[clamp(1rem,3dvh,2em)] transition duration-700 ease-out xl:pt-[2em] ${
                            storyActionVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-5 opacity-0 blur-[2px]"
                        }`}
                    >
                        <AppStoreButton badge={content.hero.appStoreBadge} />
                        <p className="mt-[1em] max-w-[320px] text-[12px] leading-[17px] font-semibold text-[var(--text-muted)] xl:text-[13px] xl:leading-[18px]">
                            {content.hero.caption}
                        </p>
                    </div>
                </article>
            </section>

            <section
                ref={statsSectionRef}
                className="relative flex min-h-[100dvh] snap-start snap-always flex-col items-center justify-center px-5 pt-[96px] pb-[2em] text-center lg:px-[28px] xl:px-[32px]"
            >
                <div className="flex w-full max-w-[760px] flex-col items-center justify-center gap-[clamp(3rem,7dvh,4rem)]">
                    {statsStarted ? (
                        <CardStackPreview
                            locale={locale}
                            variant="stats"
                            onInitialEntryComplete={handleStatsStackEntryComplete}
                        />
                    ) : (
                        <div className="h-[338px] w-full xl:h-[min(66dvh,640px)] xl:min-h-[500px]" aria-hidden />
                    )}
                    <footer
                        aria-hidden={!statsFooterVisible}
                        className={`flex flex-col items-center gap-3 transition duration-700 ease-out ${
                            statsFooterVisible ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-5 opacity-0 blur-[2px]"
                        }`}
                    >
                        <LocalizedLegalNav labels={content.nav} />
                        <ComplianceNotice content={content.compliance} />
                    </footer>
                </div>
            </section>
        </main>
    )
}
