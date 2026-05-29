"use client"

import { motion, useReducedMotion } from "motion/react"
import { useRef, useState } from "react"
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react"

const switchSpring = { type: "spring" as const, stiffness: 520, damping: 34, mass: 0.72 }
const dragCommitThreshold = 6
const switchOptionCount = 2
const trackPaddingPx = 4
const thumbHeightPx = 32

export type DraggableSwitchOption<T extends string> = {
    value: T
    label: string
    content: ReactNode
}

type DraggableSwitchMetrics = {
    slotWidth: number
    thumbWidth: number
}

type DraggableSwitchProps<T extends string> = {
    ariaLabel: string
    value: T
    options: readonly [DraggableSwitchOption<T>, DraggableSwitchOption<T>]
    metrics: DraggableSwitchMetrics
    onChange: (value: T) => void
}

type DragState = {
    pointerId: number
    startX: number
    startIndex: 0 | 1
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

export function DraggableSwitch<T extends string>(p: DraggableSwitchProps<T>) {
    const rootRef = useRef<HTMLDivElement>(null)
    const dragStateRef = useRef<DragState | null>(null)
    const [dragX, setDragX] = useState<number | null>(null)
    const reducedMotion = useReducedMotion()
    const selectedIndex = p.options.findIndex((option) => option.value === p.value) === 1 ? 1 : 0
    const travel = p.metrics.slotWidth
    const currentX = dragX ?? selectedIndex * travel
    const visualIndex = dragX === null ? selectedIndex : dragX >= travel / 2 ? 1 : 0

    function commitIndex(index: 0 | 1) {
        const nextValue = p.options[index].value
        if (nextValue !== p.value) {
            p.onChange(nextValue)
        }
    }

    function indexFromClientX(clientX: number): 0 | 1 {
        const bounds = rootRef.current?.getBoundingClientRect()
        if (!bounds) {
            return selectedIndex
        }

        return clientX - bounds.left >= bounds.width / 2 ? 1 : 0
    }

    function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
        if (event.button !== 0) {
            return
        }

        event.currentTarget.focus()
        event.currentTarget.setPointerCapture(event.pointerId)
        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startIndex: selectedIndex,
        }
        setDragX(selectedIndex * travel)
    }

    function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
        const dragState = dragStateRef.current
        if (!dragState || dragState.pointerId !== event.pointerId) {
            return
        }

        const delta = event.clientX - dragState.startX
        setDragX(clamp(dragState.startIndex * travel + delta, 0, travel))
    }

    function finishPointer(event: ReactPointerEvent<HTMLDivElement>, cancelled = false) {
        const dragState = dragStateRef.current
        if (!dragState || dragState.pointerId !== event.pointerId) {
            return
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }

        const delta = event.clientX - dragState.startX
        const draggedPosition = clamp(dragState.startIndex * travel + delta, 0, travel)
        const nextIndex = cancelled
            ? dragState.startIndex
            : Math.abs(delta) <= dragCommitThreshold
              ? indexFromClientX(event.clientX)
              : draggedPosition >= travel / 2
                ? 1
                : 0

        dragStateRef.current = null
        setDragX(null)
        commitIndex(nextIndex)
    }

    function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
        if (event.key === "ArrowLeft" || event.key === "Home") {
            event.preventDefault()
            commitIndex(0)
            return
        }

        if (event.key === "ArrowRight" || event.key === "End") {
            event.preventDefault()
            commitIndex(1)
            return
        }

        if (event.key === " " || event.key === "Enter") {
            event.preventDefault()
            commitIndex(selectedIndex === 0 ? 1 : 0)
        }
    }

    return (
        <div
            ref={rootRef}
            role="switch"
            aria-checked={selectedIndex === 1}
            aria-label={`${p.ariaLabel}: ${p.options[selectedIndex].label}`}
            tabIndex={0}
            className="relative grid h-10 cursor-grab select-none rounded-full p-1 outline-none transition-[box-shadow,background-color] active:cursor-grabbing focus-visible:shadow-[0_0_0_3px_var(--selection-bg)]"
            style={{
                width: p.metrics.slotWidth * switchOptionCount + trackPaddingPx * 2,
                gridTemplateColumns: `repeat(${switchOptionCount}, ${p.metrics.slotWidth}px)`,
                backgroundColor: "var(--control-bg)",
                touchAction: "pan-y",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={(event) => finishPointer(event)}
            onPointerCancel={(event) => finishPointer(event, true)}
            onKeyDown={handleKeyDown}
        >
            <motion.span
                aria-hidden
                className="absolute top-1 rounded-full shadow-[0_8px_18px_var(--shadow-soft)]"
                animate={{ x: currentX }}
                initial={false}
                transition={reducedMotion || dragX !== null ? { duration: 0 } : switchSpring}
                style={{
                    left: trackPaddingPx + (p.metrics.slotWidth - p.metrics.thumbWidth) / 2,
                    width: p.metrics.thumbWidth,
                    height: thumbHeightPx,
                    backgroundColor: "var(--control-active-bg)",
                }}
            />
            {p.options.map((option, index) => (
                <span
                    key={option.value}
                    aria-hidden
                    className="relative z-10 grid h-8 place-items-center text-[13px] leading-4 font-bold transition-colors"
                    style={{
                        color: visualIndex === index ? "var(--control-active-text)" : "var(--text-muted)",
                    }}
                >
                    {option.content}
                </span>
            ))}
        </div>
    )
}
