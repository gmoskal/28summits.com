"use client"

import Image from "next/image"
import { hover } from "motion"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { useEffect, useRef } from "react"

type MascotPreviewProps = {
    variant: "desktop" | "mobile"
}

const mascotImage = {
    src: "/mascot-hiker.jpg",
    alt: "White 28 gór mountain mascot with trekking poles and a Rysy badge.",
    width: 1023,
    height: 1537,
} as const

const tiltSpring = { stiffness: 190, damping: 24, mass: 0.72, restDelta: 0.001 }
const scaleSpring = { stiffness: 220, damping: 28, mass: 0.8 }

export function MascotPreview({ variant }: MascotPreviewProps) {
    const frameRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()
    const isDesktop = variant === "desktop"

    const offsetX = useMotionValue(0)
    const offsetY = useMotionValue(0)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)
    const liftZ = useMotionValue(0)
    const hoverScale = useMotionValue(0)

    const x = useSpring(offsetX, tiltSpring)
    const y = useSpring(offsetY, tiltSpring)
    const z = useSpring(liftZ, tiltSpring)
    const rx = useSpring(rotateX, tiltSpring)
    const ry = useSpring(rotateY, tiltSpring)
    const scaleAmount = useSpring(hoverScale, scaleSpring)
    const scale = useTransform(scaleAmount, (value) => 1 + value)
    const transform = useMotionTemplate`translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotate(-1.5deg) scale(${scale})`

    useEffect(() => {
        const frame = frameRef.current
        if (!frame || !isDesktop || prefersReducedMotion) {
            return
        }

        return hover(frame, () => {
            hoverScale.set(0.014)
            return () => {
                offsetX.set(0)
                offsetY.set(0)
                rotateX.set(0)
                rotateY.set(0)
                liftZ.set(0)
                hoverScale.set(0)
            }
        })
    }, [hoverScale, isDesktop, liftZ, offsetX, offsetY, prefersReducedMotion, rotateX, rotateY])

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDesktop || prefersReducedMotion) {
            return
        }

        const bounds = event.currentTarget.getBoundingClientRect()
        const xRatio = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
        const yRatio = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
        const edgeBias = Math.max(Math.abs(xRatio), Math.abs(yRatio))

        offsetX.set(xRatio * 8)
        offsetY.set(yRatio * 10)
        rotateX.set(yRatio * -5)
        rotateY.set(xRatio * 7)
        liftZ.set(Math.max(0, 18 - edgeBias * 3))
    }

    const frameClassName = isDesktop
        ? "relative flex h-[min(66dvh,640px)] min-h-[500px] w-full items-center justify-center overflow-visible px-14 py-16"
        : "relative flex w-full items-center justify-center overflow-visible px-8 pt-5 pb-1"

    const imageClassName = isDesktop
        ? "relative aspect-[1023/1537] h-[min(56dvh,560px)] max-h-[560px] overflow-hidden rounded-[38px]"
        : "relative aspect-[1023/1537] overflow-hidden rounded-[28px]"
    const shellClassName = isDesktop ? "relative overflow-visible rounded-[38px]" : "relative overflow-visible rounded-[28px]"
    const imageStyle = {
        backgroundColor: "var(--mascot-bg)",
        border: "1px solid var(--border-muted)",
        width: isDesktop ? undefined : "clamp(190px, 28vw, 260px)",
    }
    const shellStyle = {
        boxShadow: isDesktop ? "0 36px 92px var(--shadow-mascot)" : "0 24px 66px var(--shadow-mascot)",
    }
    const motionClassName = isDesktop
        ? "relative flex items-center justify-center p-8 will-change-transform"
        : "relative flex items-center justify-center p-4 will-change-transform"

    return (
        <div ref={frameRef} className={frameClassName} onPointerMove={handlePointerMove}>
            <motion.div
                style={{ transform, transformStyle: "preserve-3d" }}
                className={motionClassName}
            >
                <div
                    aria-hidden
                    className="absolute inset-x-3 bottom-2 h-24 rounded-full blur-3xl"
                    style={{ backgroundColor: "var(--shadow-ground)" }}
                />
                <div className={shellClassName} style={shellStyle}>
                    <div className={imageClassName} style={imageStyle}>
                        <Image
                            src={mascotImage.src}
                            alt={mascotImage.alt}
                            width={mascotImage.width}
                            height={mascotImage.height}
                            priority
                            sizes={isDesktop ? "430px" : "260px"}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
