"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react"
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
    isZoomed: boolean
    locale: SiteLocale
    resetSignal?: number
    variant?: "adventure" | "stats"
    onDeckComplete?: () => void
}

type DepartingCard = {
    index: number
    directionX: number
    directionY: number
}

const adventureCards = [
    {
        src: "/card-stack/walking2.jpeg",
        labels: {
            pl: "Pierwszy krok",
            en: "First step",
            es: "Primer paso",
            de: "Erster Schritt",
            fr: "Premier pas",
            nb: "Første steg",
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
            es: "Un sorbo de agua",
            de: "Wasserpause",
            fr: "Gorgée d'eau",
            nb: "Vannpause",
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
            es: "Foto rápida",
            de: "Schnelles Foto",
            fr: "Photo rapide",
            nb: "Raskt bilde",
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
            es: "Un momento de calma",
            de: "Kurze Ruhe",
            fr: "Moment calme",
            nb: "Et stille øyeblikk",
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
            es: "Un poco más alto",
            de: "Noch höher",
            fr: "Encore plus haut",
            nb: "Enda høyere",
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
            es: "Algo rico",
            de: "Etwas Gutes",
            fr: "Quelque chose de bon",
            nb: "Noe godt",
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
            es: "Rysek se reporta",
            de: "Rysek meldet sich",
            fr: "Rysek donne signe de vie",
            nb: "Rysek sjekker inn",
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
            es: "Por fin en Rysy",
            de: "Endlich auf Rysy",
            fr: "Enfin sur le Rysy",
            nb: "Endelig på Rysy",
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
    es: "Un montón de fotos de Rysek de la app 28 gór.",
    de: "Ein Stapel Rysek-Fotos aus der 28 gór App.",
    fr: "Une pile de photos de Rysek tirées de l'app 28 gór.",
    nb: "En bunke Rysek-bilder fra 28 gór-appen.",
    cs: "Stoh fotek Ryska z aplikace 28 gór.",
    sk: "Stoh fotiek Ryska z aplikácie 28 gór.",
    uk: "Стос фото Ryska із застосунку 28 gór.",
}

const adventureHeadlineLabels: Record<SiteLocale, string> = {
    pl: "Gotowi na 28 przygód?",
    en: "Ready for 28 adventures?",
    es: "¿Listos para 28 aventuras?",
    de: "Bereit für 28 Abenteuer?",
    fr: "Prêts pour 28 aventures ?",
    nb: "Klar for 28 eventyr?",
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
            es: "aquí se trabaja",
            de: "hier wird gearbeitet",
            fr: "ici le travail",
            nb: "jobb her",
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
            es: "aquí la pantalla de sellos",
            de: "hier der Stempelbildschirm",
            fr: "ici l'écran des tampons",
            nb: "stempelskjerm her",
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
            es: "aquí la pantalla de cima",
            de: "hier der Gipfelbildschirm",
            fr: "ici l'écran du sommet",
            nb: "toppskjerm her",
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
            es: "aquí la pantalla del mapa",
            de: "hier der Kartenbildschirm",
            fr: "ici l'écran de carte",
            nb: "kartskjerm her",
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
            es: "aquí los juegos",
            de: "hier die Spiele",
            fr: "ici les jeux",
            nb: "spill her",
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
            es: "aquí los datos",
            de: "hier die Daten",
            fr: "ici les données",
            nb: "data her",
            cs: "tady data",
            sk: "tu dáta",
            uk: "тут дані",
        },
    },
] as const satisfies readonly CardStackCard[]

const statsAriaLabels: Record<SiteLocale, string> = {
    pl: "Stos zdjęć z aplikacji 28 gór.",
    en: "A stack of 28 gór app photos.",
    es: "Un montón de fotos de la app 28 gór.",
    de: "Ein Stapel Fotos aus der 28 gór App.",
    fr: "Une pile de photos de l'app 28 gór.",
    nb: "En bunke bilder fra 28 gór-appen.",
    cs: "Stoh fotek z aplikace 28 gór.",
    sk: "Stoh fotiek z aplikácie 28 gór.",
    uk: "Стос фото із застосунку 28 gór.",
}

const cardPhotoSize = 720
const cardBlobMask = "/misc/blob.svg"
const cardBlobShadow = "drop-shadow(0 6px 10px rgba(0,0,0,0.42)) drop-shadow(0 16px 24px rgba(0,0,0,0.28))"
const cardDepthOverlay = {
    lastOpacity: 0.8,
    secondOpacity: 0.4,
} as const
const cardBlobMaskStyle = {
    maskImage: `url(${cardBlobMask})`,
    maskPosition: "center",
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
    WebkitMaskImage: `url(${cardBlobMask})`,
    WebkitMaskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
} satisfies CSSProperties
const cardCaptionGlowStyle = {
    fontFamily: "var(--font-gloria), 'Gloria Hallelujah', cursive",
    textShadow: "0 2px 8px var(--page-bg), 0 0 18px var(--page-bg)",
} satisfies CSSProperties
const cardCaptionVisibleOpacity = 0.8

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
    unlockPaddingSeconds: 1.1,
    stiffness: 215,
    damping: 28,
    mass: 0.82,
} as const

const deckResizeClassName = "transition-[width,height,max-width,min-height] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"

const deckSizeClassNames = {
    normal: {
        card: "absolute left-1/2 top-1/2 w-[236px] xl:w-[min(30vw,360px)] xl:max-w-[360px]",
        caption: "translate-y-[142px] xl:translate-y-[215px]",
        deck: "relative h-[310px] w-full select-none overscroll-contain xl:h-[min(52dvh,500px)] xl:min-h-[390px]",
        frame: "relative flex w-full max-w-[320px] items-center justify-center overflow-visible xl:w-[min(39vw,430px)] xl:max-w-[430px]",
        imageSizes: "(min-width: 1280px) 360px, 236px",
    },
    zoomed: {
        card: "absolute left-1/2 top-1/2 w-[274px] sm:w-[330px] xl:w-[min(45vw,540px)] xl:max-w-[540px]",
        caption: "translate-y-[164px] sm:translate-y-[194px] xl:translate-y-[308px]",
        deck: "relative h-[360px] w-full select-none overscroll-contain sm:h-[434px] xl:h-[min(78dvh,702px)] xl:min-h-[585px]",
        frame: "relative flex w-[calc(100vw-48px)] max-w-[371px] items-center justify-center overflow-visible sm:w-[calc(100vw-72px)] sm:max-w-[448px] xl:w-[min(72vw,645px)] xl:max-w-[645px]",
        imageSizes: "(min-width: 1280px) 540px, (min-width: 640px) 330px, 274px",
    },
} as const

function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min)
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

function deckEntryUnlockDelayMs(cardDelaySeconds: number, cardCount: number) {
    const lastCardDelaySeconds = cardDelaySeconds + Math.max(0, cardCount - 1) * deckEntry.cardStaggerSeconds

    return Math.round((lastCardDelaySeconds + deckEntry.unlockPaddingSeconds) * 1000)
}

function cardOverlayOpacity(stackDepth: number, maxStackDepth: number) {
    if (stackDepth <= 0) {
        return 0
    }

    if (maxStackDepth <= 1) {
        return cardDepthOverlay.secondOpacity
    }

    const depthProgress = (stackDepth - 1) / (maxStackDepth - 1)
    return cardDepthOverlay.secondOpacity + depthProgress * (cardDepthOverlay.lastOpacity - cardDepthOverlay.secondOpacity)
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
    const hasActiveDragRef = useRef(false)
    const activeCardIndex = useMemo(
        () => topVisibleCardIndex(stackConfig.cards.length, dismissedCards, departingCard?.index ?? null),
        [departingCard, dismissedCards, stackConfig.cards.length],
    )
    const headlineLabel = stackConfig.headlineLabels?.[p.locale]
    const shouldAnimateDeckEntry = shouldPlayDeckEntryAnimation && isDeckEntryActive
    const cardDelaySeconds = headlineLabel && shouldPlayDeckEntryAnimation
        ? deckEntry.cardDelaySeconds
        : 0
    const deckSizeMode = p.isZoomed ? "zoomed" : "normal"
    const deckSizeClassName = deckSizeClassNames[deckSizeMode]
    const captionLabel = activeCardIndex >= 0
        ? stackConfig.cards[activeCardIndex]?.labels[p.locale] ?? ""
        : ""
    const isCaptionVisible = captionLabel !== "" && !isDeckEntryActive

    useEffect(() => {
        setCardLayouts(createRandomCardStackLayout(stackConfig.cards.length))
        setDismissedCards(new Set())
        setDepartingCard(null)
        setDeckResetKey((currentKey) => currentKey + 1)
        setDeckEntryActive(shouldPlayDeckEntryAnimation)
    }, [p.resetSignal, shouldPlayDeckEntryAnimation, stackConfig])

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

    useEffect(() => {
        if (!isDeckEntryActive) {
            return
        }

        if (!shouldPlayDeckEntryAnimation) {
            setDeckEntryActive(false)
            return
        }

        const unlockTimer = window.setTimeout(
            () => setDeckEntryActive(false),
            deckEntryUnlockDelayMs(cardDelaySeconds, stackConfig.cards.length),
        )

        return () => window.clearTimeout(unlockTimer)
    }, [cardDelaySeconds, isDeckEntryActive, shouldPlayDeckEntryAnimation, stackConfig.cards.length])

    function handleDragEnd(index: number, offset: { x: number; y: number }, velocity: { x: number; y: number }) {
        window.setTimeout(() => {
            hasActiveDragRef.current = false
        }, 0)

        const hasStartedCardMovement =
            hasActiveDragRef.current
            || Math.hypot(offset.x, offset.y) > flick.dragStartThreshold
            || Math.hypot(velocity.x, velocity.y) > flick.velocityStartThreshold
        if (!hasStartedCardMovement) {
            return
        }

        setDepartingCard({ index, ...cardDirection(offset, velocity) })
    }

    function handleCardTap(index: number) {
        if (hasActiveDragRef.current || index !== activeCardIndex || departingCard !== null || isDeckEntryActive) {
            return
        }

        setDepartingCard({ index, directionX: 1, directionY: 0 })
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
        ? "relative flex w-full select-none flex-col items-center justify-center gap-[2rem] overflow-visible px-5 pt-1 pb-1 sm:gap-[2.5rem] xl:h-[min(66dvh,640px)] xl:min-h-[500px] xl:gap-8 xl:px-14 xl:py-12"
        : "relative flex w-full select-none items-center justify-center overflow-visible px-5 pt-5 pb-2 xl:h-[min(66dvh,640px)] xl:min-h-[500px] xl:px-14 xl:py-16"
    return (
        <div className={frameClassName}>
            {headlineLabel ? (
                <motion.h2
                    className="pointer-events-none mb-[0.5em] max-w-[22rem] text-center text-[34px] leading-[1.08] font-normal tracking-normal text-[var(--text-primary)] sm:mb-[0.5em] sm:max-w-[38rem] sm:text-[46px] sm:leading-[1.05] lg:text-[58px] xl:max-w-[56rem] xl:text-[64px]"
                    initial={shouldPlayDeckEntryAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        opacity: {
                            delay: prefersReducedMotion ? 0 : deckEntry.headlineDelaySeconds,
                            duration: prefersReducedMotion ? 0.01 : deckEntry.headlineDurationSeconds,
                            ease: "easeOut",
                        },
                        y: {
                            delay: prefersReducedMotion ? 0 : deckEntry.headlineDelaySeconds,
                            duration: prefersReducedMotion ? 0.01 : deckEntry.headlineDurationSeconds,
                            ease: "easeOut",
                        },
                    }}
                    style={{ fontFamily: "var(--font-gloria), 'Gloria Hallelujah', cursive" }}
                >
                    {headlineLabel}
                </motion.h2>
            ) : null}
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-[9%] left-1/2 h-24 w-[72%] -translate-x-1/2 rounded-full blur-3xl xl:hidden"
                style={{ backgroundColor: "var(--shadow-ground)" }}
            />
            <div
                className={`${deckSizeClassName.frame} ${deckResizeClassName}`}
            >
                <div
                    className={`${deckSizeClassName.deck} ${deckResizeClassName}`}
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
                    const isInteractiveCard = isTopCard && !isDeparting
                    const canDragCard = isTopCard && !isDeparting && !isDeckEntryActive
                    const stackDepth = Math.max(index - activeCardIndex, 0)
                    const maxStackDepth = Math.max(stackConfig.cards.length - activeCardIndex - 1, 1)
                    const depthOverlayOpacity = isDeparting || isDeckEntryActive
                        ? 0
                        : cardOverlayOpacity(stackDepth, maxStackDepth)
                    const scale = isTopCard ? 1 : Math.max(0.9, 1 - stackDepth * 0.018)
                    const y = cardTransform.y
                    const x = isDeparting ? departingCard.directionX * flick.exitDistance : cardTransform.x
                    const exitY = isDeparting ? y + departingCard.directionY * flick.exitDistance : y
                    const rotation = isTopCard || isDeparting ? 0 : cardTransform.rotation
                    const animationDelay =
                        dismissedCards.size === 0 && departingCard === null && shouldAnimateDeckEntry
                            ? cardDelaySeconds + (stackConfig.cards.length - 1 - index) * deckEntry.cardStaggerSeconds
                            : 0

                    return (
                        <div
                            key={`${deckResetKey}-${card.src}`}
                            className={`${deckSizeClassName.card} ${deckResizeClassName} -translate-x-1/2 -translate-y-1/2`}
                            style={{
                                pointerEvents: isInteractiveCard ? "auto" : "none",
                                zIndex: stackConfig.cards.length - index,
                            }}
                        >
                            <motion.div
                                className="aspect-[1199/1167] w-full select-none cursor-grab active:cursor-grabbing"
                                drag={isInteractiveCard}
                                dragListener={canDragCard}
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
                                    pointerEvents: isInteractiveCard ? "auto" : "none",
                                    transformStyle: "preserve-3d",
                                    touchAction: isInteractiveCard ? "none" : "auto",
                                    WebkitBackfaceVisibility: "hidden",
                                    WebkitTapHighlightColor: "transparent",
                                    WebkitTouchCallout: "none",
                                    WebkitUserSelect: "none",
                                    filter: cardBlobShadow,
                                    WebkitFilter: cardBlobShadow,
                                    willChange: canDragCard || isDeparting ? "transform, opacity" : "transform",
                                }}
                                onTap={() => handleCardTap(index)}
                                onDragStart={() => {
                                    hasActiveDragRef.current = true
                                }}
                                onDragEnd={(_, info) => handleDragEnd(index, info.offset, info.velocity)}
                                onAnimationComplete={() => handleAnimationComplete(index)}
                            >
                                <div className="relative h-full w-full bg-white" style={cardBlobMaskStyle}>
                                    <div className="absolute inset-[3px] overflow-hidden bg-neutral-100" style={cardBlobMaskStyle}>
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
                                        <motion.div
                                            className="pointer-events-none absolute inset-0 bg-black"
                                            animate={{ opacity: depthOverlayOpacity }}
                                            initial={false}
                                            transition={{
                                                duration: prefersReducedMotion ? 0.01 : 0.22,
                                                ease: "easeOut",
                                            }}
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
                                </div>
                            </motion.div>
                        </div>
                    )
                })}
                    <motion.div
                        className={`pointer-events-none absolute left-1/2 top-1/2 z-30 w-[min(82vw,22rem)] -translate-x-1/2 text-center ${deckSizeClassName.caption}`}
                        animate={{ opacity: isCaptionVisible ? cardCaptionVisibleOpacity : 0 }}
                        initial={false}
                        transition={{
                            duration: prefersReducedMotion ? 0.01 : 0.28,
                            ease: "easeOut",
                        }}
                    >
                        <span
                            className="inline-block text-[20px] leading-[1.05] font-normal text-[var(--text-primary)] xl:text-[26px] xl:font-medium"
                            style={cardCaptionGlowStyle}
                        >
                            {captionLabel}
                        </span>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
