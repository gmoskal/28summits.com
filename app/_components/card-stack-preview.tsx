"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { useEffect, useMemo, useState } from "react"
import type { SiteLocale } from "../_lib/site-content"

type CardStackCard = {
    src: string
    labels: Record<SiteLocale, string>
    badgeRotation?: number
}

type CardStackTransform = {
    x: number
    y: number
    rotation: number
}

type CardStackConfig = {
    cards: readonly CardStackCard[]
    ariaLabels: Record<SiteLocale, string>
    headlineLabels?: Record<SiteLocale, string>
    badge?: {
        src: string
        displaySize: number
        inset: number
        sourceSize: number
    }
    fallbackLayout: readonly CardStackTransform[]
}

type CardStackPreviewProps = {
    locale: SiteLocale
    variant?: "adventure" | "stats"
    onDeckComplete?: () => void
}

type DepartingCard = {
    index: number
    directionX: number
    directionY: number
}

type DeckZoomControlLabel = {
    zoomIn: string
    zoomOut: string
}

const adventureCards = [
    {
        src: "/card-stack/walking2.jpeg",
        labels: {
            pl: "Pierwszy krok",
            en: "First step",
            cs: "První krok",
            sk: "Prvý krok",
            uk: "Перший крок",
        },
        badgeRotation: -9,
    },
    {
        src: "/card-stack/drinking.jpeg",
        labels: {
            pl: "Łyk wody",
            en: "Water break",
            cs: "Doušek vody",
            sk: "Dúšok vody",
            uk: "Ковток води",
        },
        badgeRotation: 8,
    },
    {
        src: "/card-stack/taking-picture.jpeg",
        labels: {
            pl: "Szybkie zdjęcie",
            en: "Quick photo",
            cs: "Rychlá fotka",
            sk: "Rýchla fotka",
            uk: "Швидке фото",
        },
        badgeRotation: 12,
    },
    {
        src: "/card-stack/relaxing.jpeg",
        labels: {
            pl: "Chwila ciszy",
            en: "Quiet moment",
            cs: "Chvíle ticha",
            sk: "Chvíľa ticha",
            uk: "Мить тиші",
        },
        badgeRotation: 5,
    },
    {
        src: "/card-stack/walking.jpeg",
        labels: {
            pl: "Jeszcze wyżej",
            en: "Higher still",
            cs: "Ještě výš",
            sk: "Ešte vyššie",
            uk: "Ще вище",
        },
        badgeRotation: -7,
    },
    {
        src: "/card-stack/eating.jpeg",
        labels: {
            pl: "Coś dobrego",
            en: "Something good",
            cs: "Něco dobrého",
            sk: "Niečo dobré",
            uk: "Щось смачне",
        },
        badgeRotation: -5,
    },
    {
        src: "/card-stack/selfie.jpeg",
        labels: {
            pl: "Rysek melduje",
            en: "Rysek checks in",
            cs: "Rysek hlásí",
            sk: "Rysek hlási",
            uk: "Rysek на зв’язку",
        },
        badgeRotation: -12,
    },
    {
        src: "/card-stack/rysy.jpeg",
        labels: {
            pl: "Wreszcie na Rysach",
            en: "Finally on Rysy",
            cs: "Konečně na Rysách",
            sk: "Konečne na Rysoch",
            uk: "Нарешті на Рисах",
        },
        badgeRotation: 10,
    },
] as const satisfies readonly CardStackCard[]

const adventureAriaLabels: Record<SiteLocale, string> = {
    pl: "Stos zdjęć Ryska z aplikacji 28 gór.",
    en: "A stack of Rysek photos from the 28 gór app.",
    cs: "Stoh fotek Ryska z aplikace 28 gór.",
    sk: "Stoh fotiek Ryska z aplikácie 28 gór.",
    uk: "Стос фото Ryska із застосунку 28 gór.",
}

const adventureHeadlineLabels: Record<SiteLocale, string> = {
    pl: "Gotowi na 28 przygód?",
    en: "Ready for 28 adventures?",
    cs: "Připraveni na 28 dobrodružství?",
    sk: "Pripravení na 28 dobrodružstiev?",
    uk: "Готові до 28 пригод?",
}

const statsCards = [
    {
        src: "/misc/stats.jpeg",
        labels: {
            pl: "tu praca",
            en: "work here",
            cs: "tady práce",
            sk: "tu práca",
            uk: "тут робота",
        },
    },
    {
        src: "/misc/app-grid.webp",
        labels: {
            pl: "tu ekran pieczątek",
            en: "stamp screen here",
            cs: "tady obrazovka razítek",
            sk: "tu obrazovka pečiatok",
            uk: "тут екран печаток",
        },
    },
    {
        src: "/misc/app-peak.webp",
        labels: {
            pl: "tu ekran szczytu",
            en: "peak screen here",
            cs: "tady obrazovka vrcholu",
            sk: "tu obrazovka vrcholu",
            uk: "тут екран вершини",
        },
    },
    {
        src: "/misc/app-map.webp",
        labels: {
            pl: "tu ekran mapy",
            en: "map screen here",
            cs: "tady obrazovka mapy",
            sk: "tu obrazovka mapy",
            uk: "тут екран мапи",
        },
    },
    {
        src: "/misc/app-game.webp",
        labels: {
            pl: "tu gry",
            en: "games here",
            cs: "tady hry",
            sk: "tu hry",
            uk: "тут ігри",
        },
    },
    {
        src: "/misc/stats4.jpeg",
        labels: {
            pl: "tu dane",
            en: "data here",
            cs: "tady data",
            sk: "tu dáta",
            uk: "тут дані",
        },
    },
] as const satisfies readonly CardStackCard[]

const statsAriaLabels: Record<SiteLocale, string> = {
    pl: "Stos zdjęć z aplikacji 28 gór.",
    en: "A stack of 28 gór app photos.",
    cs: "Stoh fotek z aplikace 28 gór.",
    sk: "Stoh fotiek z aplikácie 28 gór.",
    uk: "Стос фото із застосунку 28 gór.",
}

const adventureBadge = {
    src: "/app-icon.png",
    displaySize: 44,
    inset: 15,
    sourceSize: 88,
} as const

const cardPhotoSize = 720

const fallbackCardLayout = [
    { x: -35, y: 18, rotation: -11 },
    { x: 22, y: -12, rotation: 9 },
    { x: -8, y: 24, rotation: -4 },
    { x: 38, y: -28, rotation: 13 },
    { x: -28, y: -34, rotation: -8 },
    { x: 14, y: 12, rotation: 5 },
    { x: -4, y: -42, rotation: -2 },
    { x: 30, y: -20, rotation: 8 },
] as const

const fallbackStatsLayout = [
    { x: -35, y: 18, rotation: -11 },
    { x: 22, y: -12, rotation: 9 },
    { x: -8, y: 24, rotation: -4 },
    { x: 38, y: -28, rotation: 13 },
    { x: -28, y: -34, rotation: -8 },
    { x: 14, y: 12, rotation: 5 },
] as const

const cardStackConfigs = {
    adventure: {
        cards: adventureCards,
        ariaLabels: adventureAriaLabels,
        headlineLabels: adventureHeadlineLabels,
        badge: adventureBadge,
        fallbackLayout: fallbackCardLayout,
    },
    stats: {
        cards: statsCards,
        ariaLabels: statsAriaLabels,
        fallbackLayout: fallbackStatsLayout,
    },
} as const satisfies Record<NonNullable<CardStackPreviewProps["variant"]>, CardStackConfig>

const flick = {
    exitDistance: 980,
    exitDurationSeconds: 0.32,
    dragStartThreshold: 6,
    velocityStartThreshold: 80,
    resetDelayMs: 1000,
} as const

const deckEntry = {
    headlineDelaySeconds: 0.5,
    headlineDurationSeconds: 1,
    cardDelaySeconds: 1.5,
    cardStaggerSeconds: 0.055,
    stiffness: 215,
    damping: 28,
    mass: 0.82,
} as const

const deckZoomControlLabels: Record<SiteLocale, DeckZoomControlLabel> = {
    pl: {
        zoomIn: "Powiększ stos zdjęć",
        zoomOut: "Pomniejsz stos zdjęć",
    },
    en: {
        zoomIn: "Zoom in photo stack",
        zoomOut: "Zoom out photo stack",
    },
    cs: {
        zoomIn: "Přiblížit stoh fotek",
        zoomOut: "Oddálit stoh fotek",
    },
    sk: {
        zoomIn: "Priblížiť stoh fotiek",
        zoomOut: "Oddialiť stoh fotiek",
    },
    uk: {
        zoomIn: "Збільшити стос фото",
        zoomOut: "Зменшити стос фото",
    },
}

const deckSizeClassNames = {
    normal: {
        card: "absolute left-1/2 top-1/2 w-[236px] xl:w-[min(30vw,360px)] xl:max-w-[360px]",
        deck: "relative h-[310px] w-full select-none overscroll-contain xl:h-[min(52dvh,500px)] xl:min-h-[390px]",
        frame: "relative flex w-full max-w-[320px] items-center justify-center overflow-visible xl:w-[min(39vw,430px)] xl:max-w-[430px]",
        imageSizes: "(min-width: 1280px) 360px, 236px",
    },
    zoomed: {
        card: "absolute left-1/2 top-1/2 w-[274px] sm:w-[330px] xl:w-[min(45vw,540px)] xl:max-w-[540px]",
        deck: "relative h-[360px] w-full select-none overscroll-contain sm:h-[434px] xl:h-[min(78dvh,702px)] xl:min-h-[585px]",
        frame: "relative flex w-[calc(100vw-48px)] max-w-[371px] items-center justify-center overflow-visible sm:w-[calc(100vw-72px)] sm:max-w-[448px] xl:w-[min(72vw,645px)] xl:max-w-[645px]",
        imageSizes: "(min-width: 1280px) 540px, (min-width: 640px) 330px, 274px",
    },
} as const

function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min)
}

function MagnifierIcon({ isZoomed }: { isZoomed: boolean }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.35"
        >
            <circle cx="10.5" cy="10.5" r="6.4" />
            <path d="m15.2 15.2 5.1 5.1" />
            <path d="M7.7 10.5h5.6" />
            {isZoomed ? null : <path d="M10.5 7.7v5.6" />}
        </svg>
    )
}

function createFallbackCardStackLayout(config: CardStackConfig): CardStackTransform[] {
    return config.cards.map((_, index) => {
        const transform = config.fallbackLayout[index] ?? fallbackCardLayout[index % fallbackCardLayout.length]
        return { ...transform }
    })
}

function createRandomCardStackLayout(cardCount: number): CardStackTransform[] {
    return Array.from({ length: cardCount }, (_, index) => {
        const depthBias = cardCount > 1 ? index / (cardCount - 1) : 0
        return {
            x: randomBetween(-42, 42) * (0.78 + depthBias * 0.24),
            y: randomBetween(-52, 28),
            rotation: randomBetween(-14, 14),
        }
    })
}

function topVisibleCardIndex(cardCount: number, dismissedCards: Set<number>, departingCardIndex: number | null) {
    for (let index = 0; index < cardCount; index += 1) {
        if (!dismissedCards.has(index) && index !== departingCardIndex) {
            return index
        }
    }

    return -1
}

function cardDirection(offset: { x: number; y: number }, velocity: { x: number; y: number }) {
    const movementMagnitude = Math.hypot(offset.x, offset.y)
    const velocityMagnitude = Math.hypot(velocity.x, velocity.y)
    const directionSource = movementMagnitude > 1 ? offset : velocity
    const directionMagnitude = movementMagnitude > 1 ? movementMagnitude : velocityMagnitude

    if (directionMagnitude <= 0) {
        return { directionX: 1, directionY: 0 }
    }

    return {
        directionX: directionSource.x / directionMagnitude,
        directionY: directionSource.y / directionMagnitude,
    }
}

export function CardStackPreview(p: CardStackPreviewProps) {
    const prefersReducedMotion = useReducedMotion()
    const shouldPlayDeckEntryAnimation = !prefersReducedMotion
    const variant = p.variant ?? "adventure"
    const stackConfig: CardStackConfig = cardStackConfigs[variant]
    const [cardLayouts, setCardLayouts] = useState<CardStackTransform[]>(() => createFallbackCardStackLayout(stackConfig))
    const [dismissedCards, setDismissedCards] = useState(() => new Set<number>())
    const [departingCard, setDepartingCard] = useState<DepartingCard | null>(null)
    const [deckResetKey, setDeckResetKey] = useState(0)
    const [isDeckEntryActive, setDeckEntryActive] = useState(shouldPlayDeckEntryAnimation)
    const [isDeckZoomed, setDeckZoomed] = useState(false)
    const activeCardIndex = useMemo(
        () => topVisibleCardIndex(stackConfig.cards.length, dismissedCards, departingCard?.index ?? null),
        [departingCard, dismissedCards, stackConfig.cards.length],
    )
    const headlineLabel = stackConfig.headlineLabels?.[p.locale]
    const shouldAnimateDeckEntry = shouldPlayDeckEntryAnimation && isDeckEntryActive
    const cardDelaySeconds = headlineLabel && shouldPlayDeckEntryAnimation
        ? deckEntry.cardDelaySeconds
        : 0
    const deckSizeMode = isDeckZoomed ? "zoomed" : "normal"
    const deckSizeClassName = deckSizeClassNames[deckSizeMode]
    const zoomControlLabel = deckZoomControlLabels[p.locale]
    const zoomButtonLabel = isDeckZoomed ? zoomControlLabel.zoomOut : zoomControlLabel.zoomIn
    const isZoomControlVisible = !isDeckEntryActive

    useEffect(() => {
        setCardLayouts(createRandomCardStackLayout(stackConfig.cards.length))
        setDismissedCards(new Set())
        setDepartingCard(null)
        setDeckEntryActive(shouldPlayDeckEntryAnimation)
    }, [shouldPlayDeckEntryAnimation, stackConfig])

    useEffect(() => {
        if (dismissedCards.size !== stackConfig.cards.length) {
            return
        }

        const resetTimer = window.setTimeout(() => {
            setCardLayouts(createRandomCardStackLayout(stackConfig.cards.length))
            setDismissedCards(new Set())
            setDeckResetKey((currentKey) => currentKey + 1)
            setDeckEntryActive(shouldPlayDeckEntryAnimation)
        }, flick.resetDelayMs)

        return () => window.clearTimeout(resetTimer)
    }, [dismissedCards, shouldPlayDeckEntryAnimation, stackConfig.cards.length])

    function handleDragEnd(index: number, offset: { x: number; y: number }, velocity: { x: number; y: number }) {
        const hasStartedCardMovement =
            Math.hypot(offset.x, offset.y) > flick.dragStartThreshold
            || Math.hypot(velocity.x, velocity.y) > flick.velocityStartThreshold
        if (!hasStartedCardMovement) {
            return
        }

        setDepartingCard({ index, ...cardDirection(offset, velocity) })
    }

    function handleAnimationComplete(index: number) {
        if (isDeckEntryActive && index === 0 && departingCard === null) {
            setDeckEntryActive(false)
            return
        }

        if (departingCard?.index !== index) {
            return
        }

        const isCompletingDeck = dismissedCards.size + 1 === stackConfig.cards.length

        setDismissedCards((currentCards) => new Set(currentCards).add(index))
        setDepartingCard(null)

        if (isCompletingDeck) {
            p.onDeckComplete?.()
        }
    }

    const frameClassName = headlineLabel
        ? "relative flex w-full select-none flex-col items-center justify-center gap-[4rem] overflow-visible px-5 pt-1 pb-1 sm:gap-[4.5rem] xl:h-[min(66dvh,640px)] xl:min-h-[500px] xl:gap-8 xl:px-14 xl:py-12"
        : "relative flex w-full select-none items-center justify-center overflow-visible px-5 pt-5 pb-2 xl:h-[min(66dvh,640px)] xl:min-h-[500px] xl:px-14 xl:py-16"
    return (
        <div className={frameClassName}>
            {headlineLabel ? (
                <motion.h2
                    className="pointer-events-none mb-[1em] max-w-[22rem] text-center text-[34px] leading-[1.08] font-normal tracking-normal text-[var(--text-primary)] sm:mb-[1.5em] sm:max-w-[38rem] sm:text-[46px] sm:leading-[1.05] lg:text-[58px] xl:max-w-[56rem] xl:text-[64px]"
                    initial={shouldPlayDeckEntryAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: prefersReducedMotion ? 0 : deckEntry.headlineDelaySeconds,
                        duration: prefersReducedMotion ? 0.01 : deckEntry.headlineDurationSeconds,
                        ease: "easeOut",
                    }}
                    style={{ fontFamily: "var(--font-gloria), 'Gloria Hallelujah', cursive" }}
                >
                    {headlineLabel}
                </motion.h2>
            ) : null}
            <div
                aria-hidden
                className="absolute bottom-[9%] left-1/2 h-24 w-[72%] -translate-x-1/2 rounded-full blur-3xl xl:hidden"
                style={{ backgroundColor: "var(--shadow-ground)" }}
            />
            <div className={deckSizeClassName.frame}>
                <div
                    key={`${variant}-${deckResetKey}-${deckSizeMode}`}
                    className={deckSizeClassName.deck}
                    role="img"
                    aria-label={stackConfig.ariaLabels[p.locale]}
                >
                {stackConfig.cards.map((card, index) => {
                    if (dismissedCards.has(index)) {
                        return null
                    }

                    const cardTransform = cardLayouts[index] ?? stackConfig.fallbackLayout[index] ?? fallbackCardLayout[index % fallbackCardLayout.length]
                    const isTopCard = index === activeCardIndex
                    const isDeparting = departingCard?.index === index
                    const canDragCard = isTopCard && !isDeparting && !isDeckEntryActive
                    const stackDepth = Math.max(index - activeCardIndex, 0)
                    const scale = isTopCard ? 1 : Math.max(0.9, 1 - stackDepth * 0.018)
                    const y = cardTransform.y
                    const x = isDeparting ? departingCard.directionX * flick.exitDistance : cardTransform.x
                    const exitY = isDeparting ? y + departingCard.directionY * flick.exitDistance : y
                    const rotation = isDeparting ? cardTransform.rotation + departingCard.directionX * 28 : cardTransform.rotation
                    const animationDelay =
                        dismissedCards.size === 0 && departingCard === null && shouldAnimateDeckEntry
                            ? cardDelaySeconds + (stackConfig.cards.length - 1 - index) * deckEntry.cardStaggerSeconds
                            : 0

                    return (
                        <div
                            key={card.src}
                            className={`${deckSizeClassName.card} -translate-x-1/2 -translate-y-1/2`}
                            style={{
                                pointerEvents: canDragCard ? "auto" : "none",
                                zIndex: stackConfig.cards.length - index,
                            }}
                        >
                            <motion.div
                                className="aspect-[1/1.18] w-full select-none cursor-grab active:cursor-grabbing"
                                drag={canDragCard}
                                dragMomentum={false}
                                initial={
                                    shouldAnimateDeckEntry
                                        ? { opacity: 0, x: 0, y: -620, rotate: 0, scale: 1.16 }
                                        : { opacity: 1, x, y, rotate: cardTransform.rotation, scale }
                                }
                                animate={{
                                    opacity: isDeparting ? 0 : 1,
                                    x,
                                    y: exitY,
                                    rotate: rotation,
                                    scale,
                                }}
                                transition={{
                                    delay: animationDelay,
                                    type: isDeparting || prefersReducedMotion ? "tween" : "spring",
                                    duration: isDeparting
                                        ? flick.exitDurationSeconds
                                        : prefersReducedMotion
                                            ? 0.01
                                            : undefined,
                                    ease: isDeparting ? "easeOut" : undefined,
                                    stiffness: isDeparting ? 170 : deckEntry.stiffness,
                                    damping: isDeparting ? 22 : deckEntry.damping,
                                    mass: deckEntry.mass,
                                }}
                                style={{
                                    backfaceVisibility: "hidden",
                                    pointerEvents: canDragCard ? "auto" : "none",
                                    transformStyle: "preserve-3d",
                                    touchAction: canDragCard ? "none" : "auto",
                                    WebkitBackfaceVisibility: "hidden",
                                    WebkitTapHighlightColor: "transparent",
                                    WebkitTouchCallout: "none",
                                    WebkitUserSelect: "none",
                                    willChange: canDragCard || isDeparting ? "transform, opacity" : "transform",
                                }}
                                onDragEnd={(_, info) => handleDragEnd(index, info.offset, info.velocity)}
                                onAnimationComplete={() => handleAnimationComplete(index)}
                            >
                                <div
                                    className="relative flex h-full w-full flex-col rounded-[7px] bg-white p-[10px] pb-[22px] shadow-[0_28px_80px_rgba(31,29,24,0.22)] xl:p-3 xl:pb-[30px] xl:shadow-[0_18px_36px_rgba(31,29,24,0.12)]"
                                >
                                    <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[3px] bg-neutral-100">
                                        <Image
                                            src={card.src}
                                            alt=""
                                            width={cardPhotoSize}
                                            height={cardPhotoSize}
                                            priority={index <= 1}
                                            unoptimized
                                            draggable={false}
                                            sizes={deckSizeClassName.imageSizes}
                                            className="pointer-events-none h-full w-full select-none object-cover object-center"
                                            onDragStart={(event) => event.preventDefault()}
                                        />
                                        {stackConfig.badge ? (
                                            <Image
                                                src={stackConfig.badge.src}
                                                alt=""
                                                width={stackConfig.badge.sourceSize}
                                                height={stackConfig.badge.sourceSize}
                                                quality={100}
                                                draggable={false}
                                                className="pointer-events-none absolute select-none rounded-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.22)]"
                                                style={{
                                                    width: stackConfig.badge.displaySize,
                                                    height: stackConfig.badge.displaySize,
                                                    right: stackConfig.badge.inset,
                                                    top: stackConfig.badge.inset,
                                                    transform: `rotate(${card.badgeRotation ?? 0}deg)`,
                                                }}
                                                onDragStart={(event) => event.preventDefault()}
                                            />
                                        ) : null}
                                    </div>
                                    <div className="flex min-h-0 flex-1 items-center justify-center p-[2em]">
                                        <span
                                            className="inline-block -translate-y-[5px] text-center text-[20px] leading-none font-normal text-[#171717] xl:text-[24px]"
                                            style={{ fontFamily: "var(--font-gloria), 'Gloria Hallelujah', cursive" }}
                                        >
                                            {card.labels[p.locale]}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                })}
                </div>
                <motion.button
                    type="button"
                    aria-label={zoomButtonLabel}
                    aria-pressed={isDeckZoomed}
                    title={zoomButtonLabel}
                    className="absolute -bottom-12 right-0 z-40 inline-grid h-11 w-11 touch-manipulation place-items-center rounded-full border border-[rgba(255,255,255,0.42)] bg-[rgba(255,255,255,0.86)] text-[#171717] backdrop-blur-md transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:drop-shadow-[0_0_0_3px_var(--selection-bg)] sm:-right-14 sm:bottom-4 xl:-right-16 xl:h-12 xl:w-12"
                    animate={{
                        opacity: isZoomControlVisible ? 0.5 : 0,
                        x: 0,
                        y: 0,
                    }}
                    initial={false}
                    transition={{
                        type: prefersReducedMotion ? "tween" : "spring",
                        duration: prefersReducedMotion ? 0.01 : undefined,
                        stiffness: 320,
                        damping: 30,
                        mass: 0.82,
                    }}
                    style={{
                        pointerEvents: isZoomControlVisible ? "auto" : "none",
                    }}
                    whileHover={isZoomControlVisible ? { scale: 1.05 } : undefined}
                    whileTap={isZoomControlVisible ? { scale: 0.95 } : undefined}
                    onClick={() => setDeckZoomed((currentValue) => !currentValue)}
                >
                    <MagnifierIcon isZoomed={isDeckZoomed} />
                </motion.button>
            </div>
        </div>
    )
}
