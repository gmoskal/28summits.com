"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { useEffect, useMemo, useState } from "react"
import type { SiteLocale } from "../_lib/site-content"

type CardStackCard = {
    src: string
    labels: Record<SiteLocale, string>
    badgeRotation: number
}

type CardStackCardLayout = CardStackCard & {
    x: number
    y: number
    rotation: number
}

type DepartingCard = {
    index: number
    directionX: number
    directionY: number
}

const cardStackCards = [
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
        src: "/card-stack/taking-picture.jpeg",
        labels: {
            pl: "Kadr z trasy",
            en: "Trail frame",
            cs: "Záběr z trasy",
            sk: "Záber z trasy",
            uk: "Кадр з маршруту",
        },
        badgeRotation: 12,
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

const cardStackAriaLabels: Record<SiteLocale, string> = {
    pl: "Stos zdjęć Ryska z aplikacji 28 gór.",
    en: "A stack of Rysek photos from the 28 gór app.",
    cs: "Stoh fotek Ryska z aplikace 28 gór.",
    sk: "Stoh fotiek Ryska z aplikácie 28 gór.",
    uk: "Стос фото Ryska із застосунку 28 gór.",
}

const appBadge = {
    src: "/app-icon.png",
    size: 44,
    inset: 15,
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

const flick = {
    exitDistance: 980,
    offsetThreshold: 92,
    velocityThreshold: 520,
    resetDelayMs: 560,
} as const

function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min)
}

function createFallbackCardStackLayout(): CardStackCardLayout[] {
    return cardStackCards.map((card, index) => ({ ...card, ...fallbackCardLayout[index] }))
}

function createRandomCardStackLayout(): CardStackCardLayout[] {
    return cardStackCards.map((card, index) => {
        const depthBias = index / (cardStackCards.length - 1)
        return {
            ...card,
            x: randomBetween(-42, 42) * (0.78 + depthBias * 0.24),
            y: randomBetween(-52, 28),
            rotation: randomBetween(-14, 14),
        }
    })
}

function topVisibleCardIndex(dismissedCards: Set<number>) {
    for (let index = 0; index < cardStackCards.length; index += 1) {
        if (!dismissedCards.has(index)) {
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

export function CardStackPreview({ locale }: { locale: SiteLocale }) {
    const prefersReducedMotion = useReducedMotion()
    const [cardLayouts, setCardLayouts] = useState<CardStackCardLayout[]>(createFallbackCardStackLayout)
    const [dismissedCards, setDismissedCards] = useState(() => new Set<number>())
    const [departingCard, setDepartingCard] = useState<DepartingCard | null>(null)
    const [deckResetKey, setDeckResetKey] = useState(0)
    const activeCardIndex = useMemo(() => topVisibleCardIndex(dismissedCards), [dismissedCards])

    useEffect(() => {
        setCardLayouts(createRandomCardStackLayout())
    }, [deckResetKey])

    useEffect(() => {
        if (dismissedCards.size !== cardStackCards.length) {
            return
        }

        const resetTimer = window.setTimeout(() => {
            setDismissedCards(new Set())
            setDeckResetKey((currentKey) => currentKey + 1)
        }, flick.resetDelayMs)

        return () => window.clearTimeout(resetTimer)
    }, [dismissedCards])

    function handleDragEnd(index: number, offset: { x: number; y: number }, velocity: { x: number; y: number }) {
        const shouldDismiss =
            Math.hypot(offset.x, offset.y) > flick.offsetThreshold
            || Math.hypot(velocity.x, velocity.y) > flick.velocityThreshold
        if (!shouldDismiss) {
            return
        }

        setDepartingCard({ index, ...cardDirection(offset, velocity) })
    }

    function handleAnimationComplete(index: number) {
        if (departingCard?.index !== index) {
            return
        }

        setDismissedCards((currentCards) => new Set(currentCards).add(index))
        setDepartingCard(null)
    }

    const frameClassName =
        "relative flex w-full touch-none select-none items-center justify-center overflow-visible px-5 pt-5 pb-2 xl:h-[min(66dvh,640px)] xl:min-h-[500px] xl:px-14 xl:py-16"
    const deckClassName =
        "relative h-[310px] w-full max-w-[320px] touch-none select-none overscroll-contain xl:h-[min(52dvh,500px)] xl:min-h-[390px] xl:w-[min(39vw,430px)] xl:max-w-[430px]"
    const cardClassName =
        "absolute left-1/2 top-1/2 w-[236px] xl:w-[min(30vw,360px)] xl:max-w-[360px]"

    return (
        <div className={frameClassName}>
            <div
                aria-hidden
                className="absolute bottom-[9%] left-1/2 h-24 w-[72%] -translate-x-1/2 rounded-full blur-3xl"
                style={{ backgroundColor: "var(--shadow-ground)" }}
            />
            <div
                key={deckResetKey}
                className={deckClassName}
                role="img"
                aria-label={cardStackAriaLabels[locale]}
            >
                {cardLayouts.map((card, index) => {
                    if (dismissedCards.has(index)) {
                        return null
                    }

                    const isTopCard = index === activeCardIndex
                    const isDeparting = departingCard?.index === index
                    const canDragCard = isTopCard && !isDeparting
                    const stackDepth = Math.max(index - activeCardIndex, 0)
                    const scale = isTopCard ? 1 : Math.max(0.9, 1 - stackDepth * 0.018)
                    const y = card.y
                    const x = isDeparting ? departingCard.directionX * flick.exitDistance : card.x
                    const exitY = isDeparting ? y + departingCard.directionY * flick.exitDistance : y
                    const rotation = isDeparting ? card.rotation + departingCard.directionX * 28 : card.rotation

                    return (
                        <div
                            key={card.src}
                            className={`${cardClassName} -translate-x-1/2 -translate-y-1/2`}
                            style={{ zIndex: cardStackCards.length - index }}
                        >
                            <motion.div
                                className="aspect-[1/1.18] w-full touch-none select-none cursor-grab active:cursor-grabbing"
                                drag={canDragCard}
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.88}
                                initial={
                                    prefersReducedMotion
                                        ? { opacity: 1, x, y, rotate: card.rotation, scale }
                                        : { opacity: 0, x: 0, y: -620, rotate: 0, scale: 1.16 }
                                }
                                animate={{
                                    opacity: isDeparting ? 0 : 1,
                                    x,
                                    y: exitY,
                                    rotate: rotation,
                                    scale,
                                }}
                                transition={{
                                    delay: isDeparting || prefersReducedMotion ? 0 : index * 0.055,
                                    type: prefersReducedMotion ? "tween" : "spring",
                                    duration: prefersReducedMotion ? 0.01 : undefined,
                                    stiffness: isDeparting ? 170 : 360,
                                    damping: isDeparting ? 22 : 32,
                                    mass: 0.82,
                                }}
                                style={{ touchAction: "none" }}
                                whileTap={canDragCard && !prefersReducedMotion ? { scale: scale * 1.035 } : undefined}
                                onDragEnd={(_, info) => handleDragEnd(index, info.offset, info.velocity)}
                                onAnimationComplete={() => handleAnimationComplete(index)}
                            >
                                <div
                                    className="relative flex h-full w-full flex-col rounded-[7px] bg-white p-[10px] pb-[22px] shadow-[0_28px_80px_rgba(31,29,24,0.22)] xl:p-3 xl:pb-[30px]"
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
                                            sizes="(min-width: 1280px) 360px, 236px"
                                            className="pointer-events-none h-full w-full select-none object-cover object-center"
                                            onDragStart={(event) => event.preventDefault()}
                                        />
                                        <Image
                                            src={appBadge.src}
                                            alt=""
                                            width={appBadge.size}
                                            height={appBadge.size}
                                            draggable={false}
                                            className="pointer-events-none absolute select-none rounded-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.22)]"
                                            style={{
                                                right: appBadge.inset,
                                                top: appBadge.inset,
                                                transform: `rotate(${card.badgeRotation}deg)`,
                                            }}
                                            onDragStart={(event) => event.preventDefault()}
                                        />
                                    </div>
                                    <div className="flex min-h-0 flex-1 items-center justify-center px-2 pt-2 xl:pt-3">
                                        <span
                                            className="text-center text-[28px] leading-none font-semibold text-[#171717] xl:text-[34px]"
                                            style={{ fontFamily: "var(--font-caveat)" }}
                                        >
                                            {card.labels[locale]}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
