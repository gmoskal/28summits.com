"use client"

import { type CSSProperties, type MouseEvent, type RefObject, useCallback, useEffect, useRef, useState } from "react"
import { SiteLocale, homeContent, siteConfig } from "../_lib/site-content"
import { useSitePreferences } from "../_lib/site-preferences"
import { CardStackPreview } from "./card-stack-preview"
import { GooeyBrandTitle, GooeyScrollArrow } from "./gooey-brand-title"
import { ScribbleAppStoreCta } from "./scribble-app-store-cta"
import { BrandMark } from "./site-shell"
import { SiteControls } from "./site-controls"
import { SmoothLink } from "./smooth-navigation"

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
    onExit: () => void
    onReentry: () => void
}

const legalLinkStyle = { color: "var(--gooey-title-color)" }
const openSansTextStyle = {
    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
    fontWeight: 500,
} satisfies CSSProperties
const legalNavLinkClassName = "text-[16px] leading-[23px] font-medium transition-[color,filter] hover:brightness-95 xl:text-[1.6rem] xl:leading-[2.32rem]"
const legalInlineLinkClassName = "underline decoration-transparent underline-offset-4 hover:decoration-current"
const sectionStart = {
    tolerancePx: 3,
    visibleRatioThreshold: 0.5,
} as const

function LocalizedLegalNav({ labels, className = "" }: LocalizedLegalNavProps) {
    return (
        <nav
            className={`flex items-center gap-4 ${className}`}
            style={{ ...legalLinkStyle, ...openSansTextStyle }}
            aria-label="Legal"
        >
            <SmoothLink className={legalNavLinkClassName} href="/privacy" style={legalLinkStyle}>
                {labels.privacy}
            </SmoothLink>
            <SmoothLink className={legalNavLinkClassName} href="/terms" style={legalLinkStyle}>
                {labels.terms}
            </SmoothLink>
            <SmoothLink className={legalNavLinkClassName} href="/support" style={legalLinkStyle}>
                {labels.support}
            </SmoothLink>
        </nav>
    )
}

function ComplianceNotice({ content }: ComplianceNoticeProps) {
    return (
        <p
            className="max-w-[760px] text-center text-[16px] leading-[23px] font-medium text-[var(--text-secondary)] xl:text-[1.5375rem] xl:leading-[2.2575rem]"
            style={openSansTextStyle}
        >
            {content.summaryParts.map((part, index) => (
                <span key={part}>
                    {index > 0 ? <span aria-hidden> · </span> : null}
                    {part}
                </span>
            ))}
            <span aria-hidden> · </span>
            <span>{content.contactLabel}: </span>
            <a href={`mailto:${siteConfig.contactEmail}`} className={legalInlineLinkClassName} style={legalLinkStyle}>
                {siteConfig.contactEmail}
            </a>
            <span aria-hidden> · </span>
            <SmoothLink href="/terms" className={legalInlineLinkClassName} style={legalLinkStyle}>
                {content.legalPolicies}
            </SmoothLink>
        </p>
    )
}

const storyRevealTiming = {
    copyDelayMs: 320,
    actionDelayMs: 860,
    scrollCueDelayMs: 3000,
} as const

const statsRevealTiming = {
    footerDelayMs: 420,
} as const

const storyScrollCueDismissKeys = new Set(["ArrowDown", "End", "PageDown", " "])
const topChromeClassName = "mx-auto flex max-w-[var(--layout-max-width)] items-start gap-4 px-5 pt-6 lg:px-[28px] lg:pt-[34px] xl:px-[32px]"
const storyAppStoreScribble = {
    height: 125,
    markerStrokeWidth: 71,
    mobileScale: 0.72,
    strokeAxis: "horizontal",
    strokeCount: 6,
    width: 470,
} as const
const defaultCardStackZoomed = true
const homeScrollReset = {
    fallbackDelayMs: 1400,
    targetTop: 0,
    tolerancePx: 2,
} as const

function scrollElementToTop(element: HTMLElement, onComplete: () => void) {
    let animationFrame = 0
    let timeout = 0
    let hasCompleted = false

    function complete() {
        if (hasCompleted) {
            return
        }

        hasCompleted = true
        element.removeEventListener("scrollend", complete)
        if (animationFrame !== 0) {
            window.cancelAnimationFrame(animationFrame)
        }
        if (timeout !== 0) {
            window.clearTimeout(timeout)
        }
        onComplete()
    }

    function checkPosition() {
        if (Math.abs(element.scrollTop - homeScrollReset.targetTop) <= homeScrollReset.tolerancePx) {
            complete()
            return
        }

        animationFrame = window.requestAnimationFrame(checkPosition)
    }

    element.addEventListener("scrollend", complete, { once: true })
    element.scrollTo({
        top: homeScrollReset.targetTop,
        behavior: "smooth",
    })
    animationFrame = window.requestAnimationFrame(checkPosition)
    timeout = window.setTimeout(complete, homeScrollReset.fallbackDelayMs)
}

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

            if (!isActive && wasActive) {
                p.onExit()
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
    }, [p.isEnabled, p.mainRef, p.onExit, p.onReentry, p.sectionRef])
}

export function HomePageClient() {
    const { locale, themeMode, setLocale, setThemeMode } = useSitePreferences()
    const content = homeContent[locale]
    const mainRef = useRef<HTMLElement | null>(null)
    const storySectionRef = useRef<HTMLElement | null>(null)
    const statsSectionRef = useRef<HTMLElement | null>(null)
    const [storyStarted, setStoryStarted] = useState(false)
    const [storyLogoVisible, setStoryLogoVisible] = useState(false)
    const [storyLogoAnimationComplete, setStoryLogoAnimationComplete] = useState(false)
    const [storyCopyVisible, setStoryCopyVisible] = useState(false)
    const [storyActionVisible, setStoryActionVisible] = useState(false)
    const [storyCaptionVisible, setStoryCaptionVisible] = useState(false)
    const [storyScrollCueReady, setStoryScrollCueReady] = useState(false)
    const [storyScrollCueDismissed, setStoryScrollCueDismissed] = useState(false)
    const [statsStarted, setStatsStarted] = useState(false)
    const [statsFooterVisible, setStatsFooterVisible] = useState(false)
    const isCardStackZoomed = defaultCardStackZoomed
    const [isHeroDeckComplete, setHeroDeckComplete] = useState(false)
    const [heroDeckResetSignal, setHeroDeckResetSignal] = useState(0)
    const [brandAnimationCycle, setBrandAnimationCycle] = useState(0)
    const brandAnimationRunningRef = useRef(false)
    const hasAutoScrolledToStoryRef = useRef(false)

    const handleBrandAnimationStart = useCallback(() => {
        brandAnimationRunningRef.current = true
        setStoryLogoAnimationComplete(false)
        setStoryCaptionVisible(false)
    }, [])

    const handleBrandAnimationComplete = useCallback(() => {
        brandAnimationRunningRef.current = false
        setStoryLogoAnimationComplete(true)
    }, [])

    const handleStoryScribbleDrawComplete = useCallback(() => setStoryCaptionVisible(true), [])

    const restartHeroDeck = useCallback(() => {
        setHeroDeckComplete(false)
        setHeroDeckResetSignal((resetSignal) => resetSignal + 1)
    }, [])

    const handleHeroTopReached = useCallback(() => {
        if (!isHeroDeckComplete) {
            restartHeroDeck()
        }
    }, [isHeroDeckComplete, restartHeroDeck])

    const handleBrandMarkClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()

        const mainElement = mainRef.current
        if (!mainElement) {
            handleHeroTopReached()
            return
        }

        scrollElementToTop(mainElement, handleHeroTopReached)
    }, [handleHeroTopReached])

    const restartStoryLogo = useCallback(() => {
        brandAnimationRunningRef.current = true
        setStoryLogoAnimationComplete(false)
        setStoryCaptionVisible(false)
        setBrandAnimationCycle((cycle) => cycle + 1)
    }, [])

    const replayStoryLogo = useCallback(() => {
        if (brandAnimationRunningRef.current) {
            return
        }

        restartStoryLogo()
    }, [restartStoryLogo])

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

    const handleHeroDeckComplete = useCallback(() => {
        setHeroDeckComplete(true)
        scrollToStorySection()
    }, [scrollToStorySection])
    const scrollToStatsSection = useCallback(() => {
        const statsSectionElement = statsSectionRef.current
        if (!statsSectionElement) {
            return
        }

        setStoryScrollCueDismissed(true)
        statsSectionElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }, [])

    const startStoryAnimation = useCallback(() => {
        setStoryLogoAnimationComplete(false)
        setStoryCaptionVisible(false)
        setStoryStarted(true)
        setStoryLogoVisible(true)
    }, [])
    const startStatsAnimation = useCallback(() => {
        setStatsStarted(true)
        setStoryScrollCueDismissed(true)
    }, [])
    const hideStorySectionChrome = useCallback(() => {
        setStoryLogoVisible(false)
        setStoryLogoAnimationComplete(false)
        setStoryCaptionVisible(false)
        setStoryScrollCueDismissed(true)
    }, [])
    const showAndRestartStoryLogo = useCallback(() => {
        setStoryLogoVisible(true)
        restartStoryLogo()
    }, [restartStoryLogo])

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
        onExit: hideStorySectionChrome,
        onReentry: showAndRestartStoryLogo,
    })

    useSectionStart({
        mainRef,
        sectionRef: statsSectionRef,
        hasStarted: statsStarted,
        onStart: startStatsAnimation,
    })

    const storyScribbleActive = storyActionVisible && storyLogoAnimationComplete

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

    useEffect(() => {
        const mainElement = mainRef.current
        if (!mainElement || !storyScribbleActive || storyScrollCueDismissed) {
            return
        }

        const dismissStoryScrollCue = () => setStoryScrollCueDismissed(true)
        const dismissStoryScrollCueByKey = (event: KeyboardEvent) => {
            if (event.target instanceof Element && event.target.closest("[data-story-scroll-cue]")) {
                return
            }

            if (storyScrollCueDismissKeys.has(event.key)) {
                dismissStoryScrollCue()
            }
        }

        mainElement.addEventListener("touchmove", dismissStoryScrollCue, { passive: true })
        mainElement.addEventListener("wheel", dismissStoryScrollCue, { passive: true })
        window.addEventListener("keydown", dismissStoryScrollCueByKey)

        return () => {
            mainElement.removeEventListener("touchmove", dismissStoryScrollCue)
            mainElement.removeEventListener("wheel", dismissStoryScrollCue)
            window.removeEventListener("keydown", dismissStoryScrollCueByKey)
        }
    }, [storyScribbleActive, storyScrollCueDismissed])

    useEffect(() => {
        if (!storyScribbleActive || storyScrollCueDismissed) {
            setStoryScrollCueReady(false)
            return
        }

        const scrollCueTimer = window.setTimeout(() => setStoryScrollCueReady(true), storyRevealTiming.scrollCueDelayMs)

        return () => window.clearTimeout(scrollCueTimer)
    }, [storyScribbleActive, storyScrollCueDismissed])

    const storyScrollCueVisible = storyScribbleActive && storyScrollCueReady && !storyScrollCueDismissed

    return (
        <main
            ref={mainRef}
            className="page-transition-shell h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-y-contain bg-[var(--page-bg)] text-[var(--text-primary)]"
        >
            <div className="sticky top-0 z-30 h-0 overflow-visible">
                <div className={`pointer-events-none justify-start ${topChromeClassName}`}>
                    <div className="pointer-events-auto">
                        <BrandMark compact showName={false} onClick={handleBrandMarkClick} />
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
                    <CardStackPreview
                        isZoomed={isCardStackZoomed}
                        locale={locale}
                        resetSignal={heroDeckResetSignal}
                        resetAfterComplete={false}
                        onDeckComplete={handleHeroDeckComplete}
                    />
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
                                className={`inline-flex touch-manipulation cursor-pointer appearance-none items-center justify-center rounded-[24px] border-0 bg-transparent p-0 text-inherit transition duration-300 ease-out focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)] ${
                                    storyLogoVisible ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-[1px]"
                                }`}
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
                        className={`mt-[clamp(2rem,6dvh,5em)] mb-[clamp(1rem,3dvh,2em)] flex max-w-[620px] flex-col gap-3 text-[16px] leading-[23px] font-medium text-[var(--text-secondary)] transition duration-700 ease-out xl:mt-[5em] xl:mb-[2em] xl:text-[1.5375rem] xl:leading-[2.2575rem] ${
                            storyCopyVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-5 opacity-0 blur-[2px]"
                        }`}
                        style={{ ...openSansTextStyle, fontFeatureSettings: "'ss02' 1, 'liga' 0" }}
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
                        <ScribbleAppStoreCta
                            ariaLabel={content.hero.appStoreBadge.actionLabel}
                            height={storyAppStoreScribble.height}
                            href={siteConfig.launchUpdatesUrl}
                            isActive={storyScribbleActive}
                            markerStrokeWidth={storyAppStoreScribble.markerStrokeWidth}
                            mobileScale={storyAppStoreScribble.mobileScale}
                            strokeAxis={storyAppStoreScribble.strokeAxis}
                            strokeCount={storyAppStoreScribble.strokeCount}
                            width={storyAppStoreScribble.width}
                            onDrawComplete={handleStoryScribbleDrawComplete}
                        />
                        <p
                            className={`mt-[1em] max-w-[320px] text-[16px] leading-[21px] font-medium text-[var(--text-muted)] transition duration-700 ease-out xl:text-[1.29rem] xl:leading-[1.735rem] ${
                                storyCaptionVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-[1px]"
                            }`}
                            style={openSansTextStyle}
                        >
                            {content.hero.caption}
                        </p>
                    </div>
                </article>
                {storyScrollCueVisible ? (
                    <button
                        type="button"
                        aria-label="Scroll to final screen"
                        data-story-scroll-cue
                        className="absolute right-5 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-10 h-[88px] w-[50px] touch-manipulation cursor-pointer rounded-[20px] border-0 bg-transparent p-0 text-[var(--gooey-title-color)] transition duration-500 ease-out focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)] sm:right-8 sm:h-[106px] sm:w-[60px] lg:right-auto lg:left-[calc(50%+300px)] lg:-translate-x-1/2 xl:h-[126px] xl:w-[72px]"
                        onClick={scrollToStatsSection}
                    >
                        <GooeyScrollArrow />
                    </button>
                ) : null}
            </section>

            <section
                ref={statsSectionRef}
                className="relative flex h-[100dvh] snap-start snap-always flex-col items-center justify-center overflow-hidden px-5 pt-[84px] pb-[2em] text-center lg:px-[28px] xl:px-[32px]"
            >
                <div className="flex w-full max-w-[760px] flex-col items-center justify-center gap-[clamp(1.5rem,4dvh,3rem)]">
                    {statsStarted ? (
                        <CardStackPreview
                            isZoomed={isCardStackZoomed}
                            locale={locale}
                            variant="stats"
                        />
                    ) : (
                        <div className="h-[338px] w-full xl:h-[min(66dvh,640px)] xl:min-h-[500px]" aria-hidden />
                    )}
                    <footer
                        aria-hidden={!statsFooterVisible}
                        className={`mt-[2em] flex flex-col items-center gap-3 transition duration-700 ease-out ${
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
