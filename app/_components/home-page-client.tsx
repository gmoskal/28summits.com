"use client"

import { type CSSProperties, type MouseEvent, type RefObject, useCallback, useEffect, useRef, useState } from "react"
import { SiteLocale, homeContent, siteConfig } from "../_lib/site-content"
import { useSitePreferences } from "../_lib/site-preferences"
import { CardStackPreview } from "./card-stack-preview"
import { GooeyBrandTitle, GooeyScrollArrow } from "./gooey-brand-title"
import { PhoneVideoPreview, phonePreviewAspectRatio } from "./phone-video-preview"
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
            className="max-w-[760px] text-center text-[13px] leading-[20px] font-light text-[var(--text-secondary)] lg:text-[16px] lg:leading-[24px] xl:text-[20px] xl:leading-[30px]"
            style={{ ...openSansTextStyle, fontWeight: 300 }}
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
    contentDelayMs: 1000,
    scrollCueDelayMs: 30_000,
} as const
const storyLayoutMotionTiming = {
    delayMs: 500,
    durationMs: 2050,
} as const
const storyPhoneRevealTiming = {
    delayMs: 1300,
    durationMs: 1400,
} as const
const storyPhoneVideoStartDelayMs = storyPhoneRevealTiming.delayMs + storyPhoneRevealTiming.durationMs / 2
const storyIntroSettleDelayMs = Math.max(
    storyLayoutMotionTiming.delayMs + storyLayoutMotionTiming.durationMs,
    storyPhoneRevealTiming.delayMs + storyPhoneRevealTiming.durationMs,
)
const storyLayoutMotionClassName = "ease-[cubic-bezier(0.4,0,0.2,1)]"
const storyLayoutMotionStyle = {
    transitionDelay: `${storyLayoutMotionTiming.delayMs}ms`,
    transitionDuration: `${storyLayoutMotionTiming.durationMs}ms`,
} satisfies CSSProperties
const storyPhoneFadeStyle = {
    transitionDelay: `${storyPhoneRevealTiming.delayMs}ms`,
    transitionDuration: `${storyPhoneRevealTiming.durationMs}ms`,
} satisfies CSSProperties
const storyResponsiveMotionStyle = {
    transitionDelay: "0ms",
    transitionDuration: "150ms",
} satisfies CSSProperties
const storyPhoneLayout = {
    baseMaxHeightPx: 642,
    baseViewportHeightDvh: 72,
    scale: 1.3,
} as const
const storyPhoneHeight = {
    maxPx: storyPhoneLayout.baseMaxHeightPx * storyPhoneLayout.scale,
    viewportDvh: storyPhoneLayout.baseViewportHeightDvh * storyPhoneLayout.scale,
} as const
const storyPhoneHalfWidth = {
    maxPx: storyPhoneHeight.maxPx * phonePreviewAspectRatio / 2,
    viewportDvh: storyPhoneHeight.viewportDvh * phonePreviewAspectRatio / 2,
} as const
const storyColumnBalanceBasePx = 240
const storyMobilePhoneGutterPx = 20
const storyColumnLayoutStyle: CSSProperties & Record<
    "--story-column-offset" | "--story-phone-height" | "--story-phone-mobile-height" | "--story-phone-mobile-width",
    string
> = {
    "--story-column-offset": `calc(${storyColumnBalanceBasePx}px - min(${storyPhoneHalfWidth.viewportDvh}dvh, ${storyPhoneHalfWidth.maxPx}px))`,
    "--story-phone-height": `min(${storyPhoneHeight.viewportDvh}dvh, ${storyPhoneHeight.maxPx}px)`,
    "--story-phone-mobile-height": `calc((100vw - ${storyMobilePhoneGutterPx * 2}px) / ${phonePreviewAspectRatio})`,
    "--story-phone-mobile-width": `calc(100vw - ${storyMobilePhoneGutterPx * 2}px)`,
}

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
const storyAppStoreScale = 0.6
const storyAppStoreScaledFrameStyle = {
    height: storyAppStoreScribble.height * storyAppStoreScale,
    width: storyAppStoreScribble.width * storyAppStoreScale,
} satisfies CSSProperties
const storyAppStoreTransformStyle = {
    transform: `scale(${storyAppStoreScale})`,
    transformOrigin: "top left",
} satisfies CSSProperties
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
    const [storyLayoutShifted, setStoryLayoutShifted] = useState(false)
    const [storyIntroSettled, setStoryIntroSettled] = useState(false)
    const [storyContentRevealReady, setStoryContentRevealReady] = useState(false)
    const [storyContentVisible, setStoryContentVisible] = useState(false)
    const [storyPhoneVideoPlaying, setStoryPhoneVideoPlaying] = useState(false)
    const [storyScrollCueReady, setStoryScrollCueReady] = useState(false)
    const [storyScrollCueDismissed, setStoryScrollCueDismissed] = useState(false)
    const [statsStarted, setStatsStarted] = useState(false)
    const [statsFooterVisible, setStatsFooterVisible] = useState(false)
    const isCardStackZoomed = defaultCardStackZoomed
    const [brandAnimationCycle, setBrandAnimationCycle] = useState(0)
    const brandAnimationRunningRef = useRef(false)
    const hasAutoScrolledToStoryRef = useRef(false)

    const handleBrandAnimationStart = useCallback(() => {
        brandAnimationRunningRef.current = true
        setStoryLayoutShifted(true)
    }, [])

    const handleBrandAnimationComplete = useCallback(() => {
        brandAnimationRunningRef.current = false
    }, [])
    const handleBrandAnimationMidpoint = useCallback(() => setStoryContentRevealReady(true), [])

    const handleBrandMarkClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()

        const mainElement = mainRef.current
        if (!mainElement) {
            return
        }

        scrollElementToTop(mainElement, () => undefined)
    }, [])

    const restartStoryLogo = useCallback(() => {
        brandAnimationRunningRef.current = true
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
        setStoryStarted(true)
        setStoryLogoVisible(true)
    }, [])
    const startStatsAnimation = useCallback(() => {
        setStatsStarted(true)
        setStoryScrollCueDismissed(true)
    }, [])
    const hideStorySectionChrome = useCallback(() => {
        setStoryLogoVisible(false)
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

    const storyScribbleActive = storyContentVisible

    useEffect(() => {
        if (!storyContentRevealReady) {
            return
        }

        const contentTimer = window.setTimeout(() => setStoryContentVisible(true), storyRevealTiming.contentDelayMs)

        return () => window.clearTimeout(contentTimer)
    }, [storyContentRevealReady])

    useEffect(() => {
        if (!storyLayoutShifted) {
            return
        }

        const videoTimer = window.setTimeout(
            () => setStoryPhoneVideoPlaying(true),
            storyPhoneVideoStartDelayMs,
        )

        return () => window.clearTimeout(videoTimer)
    }, [storyLayoutShifted])

    useEffect(() => {
        if (!storyLayoutShifted) {
            return
        }

        const settleTimer = window.setTimeout(() => setStoryIntroSettled(true), storyIntroSettleDelayMs)

        return () => window.clearTimeout(settleTimer)
    }, [storyLayoutShifted])

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
                        onDeckComplete={handleHeroDeckComplete}
                    />
                </div>
            </section>

            <section
                ref={storySectionRef}
                className="relative flex min-h-[100dvh] snap-start flex-col items-center overflow-visible px-5 pt-[84px] pb-16 text-center transition-[padding] duration-300 ease-out lg:h-[100dvh] lg:min-h-0 lg:snap-always lg:overflow-hidden lg:px-[28px] lg:pt-[2em] lg:pb-[2em] xl:px-[32px]"
                style={storyColumnLayoutStyle}
            >
                <div className="relative flex w-full flex-none flex-col items-center justify-start lg:min-h-0 lg:flex-1 lg:justify-center">
                    <article
                        className={`relative z-10 flex w-full max-w-[720px] flex-col items-center transition-[translate] will-change-[translate] ${storyLayoutMotionClassName} ${
                            storyLayoutShifted
                                ? "lg:translate-x-[calc(var(--story-column-offset)-275px)]"
                                : "lg:translate-x-0"
                        }`}
                        style={storyIntroSettled ? storyResponsiveMotionStyle : storyLayoutMotionStyle}
                    >
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
                                    <span
                                        className={`block transition-[scale] will-change-[scale] ${storyLayoutMotionClassName} ${
                                            storyLayoutShifted ? "lg:scale-[0.64]" : "lg:scale-100"
                                        }`}
                                        style={storyIntroSettled ? storyResponsiveMotionStyle : storyLayoutMotionStyle}
                                    >
                                        <GooeyBrandTitle
                                            onAnimationComplete={handleBrandAnimationComplete}
                                            onAnimationMidpoint={handleBrandAnimationMidpoint}
                                            onAnimationStart={handleBrandAnimationStart}
                                            replayToken={brandAnimationCycle}
                                        />
                                    </span>
                                </button>
                            ) : null}
                        </h1>

                        <div
                            className={`story-copy mt-12 mb-6 flex w-full max-w-[450px] flex-col gap-3 px-6 text-[16px] leading-[1.6rem] text-[var(--text-secondary)] transition-[margin,font-size,line-height,opacity,translate,filter] duration-300 ease-out lg:mt-[20px] lg:mb-[clamp(1rem,3dvh,2em)] lg:px-0 lg:leading-[24px] xl:mb-[2em] xl:text-[20px] xl:leading-[30px] ${
                                storyContentVisible
                                    ? "translate-y-0 opacity-100 blur-0"
                                    : "translate-y-5 opacity-0 blur-[2px]"
                            }`}
                        >
                            <p>{content.hero.body}</p>
                        </div>

                        <div
                            className={`flex flex-col items-center pt-[clamp(1rem,3dvh,2em)] transition-[padding,opacity,translate,filter] duration-300 ease-out xl:pt-[2em] ${
                                storyContentVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-5 opacity-0 blur-[2px]"
                            }`}
                        >
                            <div className="relative overflow-visible" style={storyAppStoreScaledFrameStyle}>
                                <div className="absolute top-0 left-0 w-max" style={storyAppStoreTransformStyle}>
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
                                    />
                                </div>
                            </div>
                        </div>
                    </article>
                    <div
                        aria-hidden={!storyLayoutShifted}
                        className={`pointer-events-none flex w-full shrink-0 items-center justify-center transition-[max-height,margin,opacity] ease-in-out will-change-[max-height,opacity] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[calc(50%+var(--story-column-offset))] lg:ml-5 lg:w-auto lg:justify-start lg:transition-opacity ${
                            storyLayoutShifted
                                ? "mt-16 max-h-[calc(var(--story-phone-mobile-height)+2rem)] opacity-100 lg:mt-0 lg:max-h-full"
                                : "mt-0 max-h-0 opacity-0 lg:max-h-full"
                        }`}
                        style={storyIntroSettled ? storyResponsiveMotionStyle : storyPhoneFadeStyle}
                    >
                        <PhoneVideoPreview
                            className="h-auto w-[var(--story-phone-mobile-width)] shrink-0 transition-[height,width] duration-150 ease-out drop-shadow-[0_42px_70px_rgba(0,0,0,0.26)] lg:h-[var(--story-phone-height)] lg:max-h-full lg:w-auto"
                            isPlaying={storyPhoneVideoPlaying}
                        />
                    </div>
                </div>
                {storyScrollCueVisible ? (
                    <button
                        type="button"
                        aria-label="Scroll to final screen"
                        data-story-scroll-cue
                        className="absolute right-[30px] bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-10 h-[88px] w-[50px] origin-bottom-right scale-[0.7] touch-manipulation cursor-pointer rounded-[20px] border-0 bg-transparent p-0 text-[var(--gooey-title-color)] transition duration-500 ease-out focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)] sm:h-[106px] sm:w-[60px] xl:h-[126px] xl:w-[72px]"
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
