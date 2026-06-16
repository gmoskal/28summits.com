"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { useEffect, useMemo, useState } from "react"

type CardStackCard = {
    src: string
    label: string
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
        src: "/card-stack/walking2.png",
        label: "Pierwszy krok",
    },
    {
        src: "/card-stack/drinking.png",
        label: "Łyk wody",
    },
    {
        src: "/card-stack/eating.png",
        label: "Coś dobrego",
    },
    {
        src: "/card-stack/taking-picture.png",
        label: "Kadr z trasy",
    },
    {
        src: "/card-stack/selfie.png",
        label: "Rysek melduje",
    },
    {
        src: "/card-stack/relaxing.png",
        label: "Chwila ciszy",
    },
    {
        src: "/card-stack/walking.png",
        label: "Jeszcze wyżej",
    },
    {
        src: "/card-stack/rysy.png",
        label: "Na Rysach",
    },
] as const satisfies readonly CardStackCard[]

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
    for (let index = cardStackCards.length - 1; index >= 0; index -= 1) {
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

export function CardStackPreview() {
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
        "relative flex w-full items-center justify-center overflow-visible px-5 pt-5 pb-2 xl:h-[min(66dvh,640px)] xl:min-h-[500px] xl:px-14 xl:py-16"
    const deckClassName =
        "relative h-[310px] w-full max-w-[320px] xl:h-[min(52dvh,500px)] xl:min-h-[390px] xl:w-[min(39vw,430px)] xl:max-w-[430px]"
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
                aria-label="Stos zdjęć Ryska z aplikacji 28 gór."
            >
                {cardLayouts.map((card, index) => {
                    if (dismissedCards.has(index)) {
                        return null
                    }

                    const isTopCard = index === activeCardIndex
                    const isDeparting = departingCard?.index === index
                    const scale = isTopCard ? 1 : 0.91 + index * 0.012
                    const y = card.y
                    const x = isDeparting ? departingCard.directionX * flick.exitDistance : card.x
                    const exitY = isDeparting ? y + departingCard.directionY * flick.exitDistance : y
                    const rotation = isDeparting ? card.rotation + departingCard.directionX * 28 : card.rotation

                    return (
                        <div
                            key={card.src}
                            className={`${cardClassName} -translate-x-1/2 -translate-y-1/2`}
                            style={{ zIndex: index + 1 }}
                        >
                            <motion.div
                                className="aspect-[1/1.18] w-full"
                                drag={isTopCard && !isDeparting && !prefersReducedMotion ? true : false}
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
                                whileTap={isTopCard && !prefersReducedMotion ? { scale: scale * 1.035 } : undefined}
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
                                            width={1535}
                                            height={1024}
                                            priority={index >= cardStackCards.length - 2}
                                            quality={100}
                                            unoptimized
                                            draggable={false}
                                            sizes="(min-width: 1280px) 360px, 236px"
                                            className="pointer-events-none h-full w-full select-none object-cover object-center"
                                            onDragStart={(event) => event.preventDefault()}
                                        />
                                    </div>
                                    <div className="flex min-h-0 flex-1 items-center justify-center px-2 pt-2 xl:pt-3">
                                        <span
                                            className="text-center text-[28px] leading-none font-semibold text-[#171717] xl:text-[34px]"
                                            style={{ fontFamily: "var(--font-caveat)" }}
                                        >
                                            {card.label}
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
