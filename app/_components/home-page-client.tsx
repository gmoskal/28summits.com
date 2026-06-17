"use client"

import Image from "next/image"
import { type RefObject, useCallback, useEffect, useRef, useState } from "react"
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

type SectionStartOptions = {
    mainRef: RefObject<HTMLElement | null>
    sectionRef: RefObject<HTMLElement | null>
    hasStarted: boolean
    onStart: () => void
}

type SectionReentryOptions = {
    mainRef: RefObject<HTMLElement | null>
    sectionRef: RefObject<HTMLElement | null>
    isEnabled: boolean
    onReentry: () => void
}

const legalAccentStyle = { color: "#666666" }
const legalNavLinkClassName = "text-[15px] leading-[20px] font-semibold transition-[color,filter] hover:brightness-95"
const legalInlineLinkClassName = "underline decoration-transparent underline-offset-4 hover:decoration-current"
const sectionStart = {
    tolerancePx: 3,
    visibleRatioThreshold: 0.5,
} as const

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
        <p className="max-w-[760px] text-center text-[16px] leading-[23px] font-semibold text-[var(--text-secondary)] xl:text-[20px] xl:leading-[29px]">
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
    copyDelayMs: 320,
    actionDelayMs: 860,
} as const

const statsRevealTiming = {
    footerDelayMs: 420,
} as const

const topChromeClassName = "mx-auto flex max-w-[var(--layout-max-width)] items-start gap-4 px-5 pt-6 lg:px-[28px] lg:pt-[34px] xl:px-[32px]"

function isSectionSnapped(mainElement: HTMLElement, sectionElement: HTMLElement) {
    const mainTop = mainElement.getBoundingClientRect().top
    const sectionTop = sectionElement.getBoundingClientRect().top

    return Math.abs(sectionTop - mainTop) <= sectionStart.tolerancePx
}

function sectionVisibleRatio(mainElement: HTMLElement, sectionElement: HTMLElement) {
    const mainRect = mainElement.getBoundingClientRect()
    const sectionRect = sectionElement.getBoundingClientRect()
    const visibleTop = Math.max(mainRect.top, sectionRect.top)
    const visibleBottom = Math.min(mainRect.bottom, sectionRect.bottom)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
    const sectionHeight = Math.min(mainRect.height, sectionRect.height)

    return sectionHeight > 0 ? visibleHeight / sectionHeight : 0
}

function shouldStartSection(mainElement: HTMLElement, sectionElement: HTMLElement) {
    return (
        isSectionSnapped(mainElement, sectionElement)
        || sectionVisibleRatio(mainElement, sectionElement) >= sectionStart.visibleRatioThreshold
    )
}

function useSectionStart(p: SectionStartOptions) {
    useEffect(() => {
        const mainElement = p.mainRef.current
        const sectionElement = p.sectionRef.current
        if (!mainElement || !sectionElement || p.hasStarted) {
            return
        }

        const scrollRoot = mainElement
        const snapSection = sectionElement
        let animationFrame = 0
        let hasTriggered = false

        function checkSectionState() {
            if (hasTriggered || !shouldStartSection(scrollRoot, snapSection)) {
                return
            }

            hasTriggered = true
            p.onStart()
        }

        function scheduleCheck() {
            if (animationFrame !== 0) {
                window.cancelAnimationFrame(animationFrame)
            }

            animationFrame = window.requestAnimationFrame(() => {
                animationFrame = 0
                checkSectionState()
            })
        }

        const observer = new IntersectionObserver(scheduleCheck, {
            root: scrollRoot,
            threshold: [0, 0.5, 0.9, 1],
        })

        observer.observe(snapSection)
        scrollRoot.addEventListener("scroll", scheduleCheck, { passive: true })
        window.addEventListener("resize", scheduleCheck)
        scheduleCheck()

        return () => {
            observer.disconnect()
            scrollRoot.removeEventListener("scroll", scheduleCheck)
            window.removeEventListener("resize", scheduleCheck)
            if (animationFrame !== 0) {
                window.cancelAnimationFrame(animationFrame)
            }
        }
    }, [p.hasStarted, p.mainRef, p.onStart, p.sectionRef])
}

function useSectionReentry(p: SectionReentryOptions) {
    useEffect(() => {
        const mainElement = p.mainRef.current
        const sectionElement = p.sectionRef.current
        if (!mainElement || !sectionElement || !p.isEnabled) {
            return
        }

        const scrollRoot = mainElement
        const snapSection = sectionElement
        let animationFrame = 0
        let hasSeenInitialState = false
        let wasActive = false

        function checkSectionState() {
            const isActive = shouldStartSection(scrollRoot, snapSection)
            if (!hasSeenInitialState) {
                hasSeenInitialState = true
                wasActive = isActive
                return
            }

            if (isActive && !wasActive) {
                p.onReentry()
            }

            wasActive = isActive
        }

        function scheduleCheck() {
            if (animationFrame !== 0) {
                window.cancelAnimationFrame(animationFrame)
            }

            animationFrame = window.requestAnimationFrame(() => {
                animationFrame = 0
                checkSectionState()
            })
        }

        const observer = new IntersectionObserver(scheduleCheck, {
            root: scrollRoot,
            threshold: [0, 0.5, 0.9, 1],
        })

        observer.observe(snapSection)
        scrollRoot.addEventListener("scroll", scheduleCheck, { passive: true })
        window.addEventListener("resize", scheduleCheck)
        scheduleCheck()

        return () => {
            observer.disconnect()
            scrollRoot.removeEventListener("scroll", scheduleCheck)
            window.removeEventListener("resize", scheduleCheck)
            if (animationFrame !== 0) {
                window.cancelAnimationFrame(animationFrame)
            }
        }
    }, [p.isEnabled, p.mainRef, p.onReentry, p.sectionRef])
}

export function HomePageClient() {
    const { locale, themeMode, setLocale, setThemeMode } = useSitePreferences()
    const content = homeContent[locale]
    const mainRef = useRef<HTMLElement | null>(null)
    const storySectionRef = useRef<HTMLElement | null>(null)
    const statsSectionRef = useRef<HTMLElement | null>(null)
    const [storyStarted, setStoryStarted] = useState(false)
    const [storyCopyVisible, setStoryCopyVisible] = useState(false)
    const [storyActionVisible, setStoryActionVisible] = useState(false)
    const [statsStarted, setStatsStarted] = useState(false)
    const [statsFooterVisible, setStatsFooterVisible] = useState(false)
    const [brandAnimationCycle, setBrandAnimationCycle] = useState(0)
    const brandAnimationRunningRef = useRef(false)
    const hasAutoScrolledToStoryRef = useRef(false)

    const handleBrandAnimationStart = useCallback(() => {
        brandAnimationRunningRef.current = true
    }, [])

    const handleBrandAnimationComplete = useCallback(() => {
        brandAnimationRunningRef.current = false
    }, [])

    const replayStoryLogo = useCallback(() => {
        if (brandAnimationRunningRef.current) {
            return
        }

        brandAnimationRunningRef.current = true
        setBrandAnimationCycle((cycle) => cycle + 1)
    }, [])

    const scrollToStorySection = useCallback(() => {
        const mainElement = mainRef.current
        const storySectionElement = storySectionRef.current
        if (!mainElement || !storySectionElement || hasAutoScrolledToStoryRef.current) {
            return
        }

        hasAutoScrolledToStoryRef.current = true
        storySectionElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }, [])

    const startStoryAnimation = useCallback(() => setStoryStarted(true), [])
    const startStatsAnimation = useCallback(() => setStatsStarted(true), [])

    useSectionStart({
        mainRef,
        sectionRef: storySectionRef,
        hasStarted: storyStarted,
        onStart: startStoryAnimation,
    })

    useSectionReentry({
        mainRef,
        sectionRef: storySectionRef,
        isEnabled: storyStarted,
        onReentry: replayStoryLogo,
    })

    useSectionStart({
        mainRef,
        sectionRef: statsSectionRef,
        hasStarted: statsStarted,
        onStart: startStatsAnimation,
    })

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
        if (!statsStarted) {
            return
        }

        const footerTimer = window.setTimeout(() => setStatsFooterVisible(true), statsRevealTiming.footerDelayMs)

        return () => window.clearTimeout(footerTimer)
    }, [statsStarted])

    return (
        <main
            ref={mainRef}
            className="page-transition-shell h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-y-contain bg-[var(--page-bg)] text-[var(--text-primary)]"
        >
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
                    <CardStackPreview locale={locale} onDeckComplete={scrollToStorySection} />
                </div>
            </section>

            <section
                ref={storySectionRef}
                className="relative flex h-[100dvh] snap-start snap-always flex-col items-center overflow-hidden px-5 pt-[18dvh] pb-[2em] text-center lg:px-[28px] xl:px-[32px]"
            >
                <article className="flex w-full max-w-[720px] flex-col items-center">
                    <h1 aria-label={content.hero.headline} className="flex min-h-[105px] items-center justify-center leading-none tracking-normal xl:min-h-[163px]">
                        {storyStarted ? (
                            <button
                                type="button"
                                aria-label={content.hero.replayLogoAnimationLabel}
                                className="inline-flex touch-manipulation cursor-pointer appearance-none items-center justify-center rounded-[24px] border-0 bg-transparent p-0 text-inherit focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)]"
                                onClick={replayStoryLogo}
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
                className="relative flex h-[100dvh] snap-start snap-always flex-col items-center justify-center overflow-hidden px-5 pt-[84px] pb-[2em] text-center lg:px-[28px] xl:px-[32px]"
            >
                <div className="flex w-full max-w-[760px] flex-col items-center justify-center gap-[clamp(1.5rem,4dvh,3rem)]">
                    {statsStarted ? (
                        <CardStackPreview locale={locale} variant="stats" />
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
