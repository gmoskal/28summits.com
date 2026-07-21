import {
    type CSSProperties,
    type PointerEvent as ReactPointerEvent,
    type UIEvent as ReactUIEvent,
    useEffect,
    useRef,
    useState,
} from "react"

type PhoneVideoPreviewProps = {
    className?: string
    isPlaying: boolean
}

const phonePreviewAssets = {
    frame: "/iphone-17-pro-deep-blue.svg",
} as const
const phonePreviewSlides = [
    { src: "/video/rec1-overview-web-v2.mp4" },
    { src: "/video/rec2-options-web.mp4" },
    { src: "/video/rec3-peak-web.mp4" },
    { src: "/video/rec4-game-web.mp4" },
    { src: "/video/rec5-funcs-web.mp4" },
    { src: "/video/rec6-con-web.mp4" },
] as const
const phoneCarouselTiming = {
    snapMs: 300,
} as const
const phoneCarouselSwipeThreshold = 0.18
const phoneCarouselIndicator = {
    dotSizePx: 7,
    gapPx: 6,
    hitAreaHeightPx: 23,
    pillWidthPx: 20,
} as const
const phonePreviewFrame = {
    height: 2822,
    width: 1406,
} as const
export const phonePreviewAspectRatio = phonePreviewFrame.width / phonePreviewFrame.height
const phoneFrameStyle = {
    aspectRatio: phonePreviewAspectRatio,
} satisfies CSSProperties
const phoneScreenStyle = {
    borderRadius: "12.5% / 5.75%",
} satisfies CSSProperties

function carouselPageProgress(value: number) {
    return Math.min(Math.max(value, 0), phonePreviewSlides.length - 1)
}

function pageProgressForScrollPosition(scrollLeft: number, viewportWidth: number) {
    return carouselPageProgress(scrollLeft / Math.max(viewportWidth, 1))
}

function carouselIndicatorActivation(index: number, pageProgress: number) {
    return Math.min(Math.max(1 - Math.abs(pageProgress - index), 0), 1)
}

function carouselIndicatorWidth(activation: number) {
    return phoneCarouselIndicator.dotSizePx
        + (phoneCarouselIndicator.pillWidthPx - phoneCarouselIndicator.dotSizePx) * activation
}

export function PhoneVideoPreview(p: PhoneVideoPreviewProps) {
    const carouselViewportRef = useRef<HTMLDivElement | null>(null)
    const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    const activeSlideIndexRef = useRef(0)
    const [isDragging, setIsDragging] = useState(false)
    const [renderedPageProgress, setRenderedPageProgress] = useState(0)
    const dragStartRef = useRef<{
        pageProgress: number
        pointerX: number
        scrollLeft: number
    } | null>(null)
    const renderedPageProgressRef = useRef(0)

    function registerVideo(index: number, videoElement: HTMLVideoElement | null) {
        videoRefs.current[index] = videoElement
    }

    function showPageProgress(pageProgress: number) {
        const nextPageProgress = carouselPageProgress(pageProgress)
        renderedPageProgressRef.current = nextPageProgress
        setRenderedPageProgress(nextPageProgress)
    }

    function selectSlide(index: number) {
        activeSlideIndexRef.current = index
        setActiveSlideIndex(index)
    }

    function showSlide(index: number) {
        const nextSlideIndex = Math.round(carouselPageProgress(index))
        const carouselViewport = carouselViewportRef.current
        selectSlide(nextSlideIndex)

        if (!carouselViewport) {
            showPageProgress(nextSlideIndex)
            return
        }

        carouselViewport.scrollTo({
            behavior: "smooth",
            left: carouselViewport.clientWidth * nextSlideIndex,
        })
    }

    function handleDragStart(event: ReactPointerEvent<HTMLDivElement>) {
        event.currentTarget.setPointerCapture(event.pointerId)
        dragStartRef.current = {
            pageProgress: renderedPageProgressRef.current,
            pointerX: event.clientX,
            scrollLeft: event.currentTarget.scrollLeft,
        }
        setIsDragging(true)

        if (p.isPlaying) {
            videoRefs.current.forEach((videoElement) => {
                if (videoElement) {
                    void videoElement.play().catch(() => undefined)
                }
            })
        }
    }

    function handleDragMove(event: ReactPointerEvent<HTMLDivElement>) {
        const dragStart = dragStartRef.current
        if (!dragStart) {
            return
        }

        const pointerDelta = event.clientX - dragStart.pointerX
        event.currentTarget.scrollLeft = dragStart.scrollLeft - pointerDelta
    }

    function handleDragEnd(event: ReactPointerEvent<HTMLDivElement>) {
        const dragStart = dragStartRef.current
        if (!dragStart) {
            return
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }

        dragStartRef.current = null
        setIsDragging(false)
        const pageDelta = renderedPageProgressRef.current - dragStart.pageProgress
        const targetIndex = Math.abs(pageDelta) >= phoneCarouselSwipeThreshold
            ? Math.round(dragStart.pageProgress) + Math.sign(pageDelta)
            : Math.round(dragStart.pageProgress)
        const nextSlideIndex = Math.round(carouselPageProgress(targetIndex))
        const viewportWidth = Math.max(event.currentTarget.clientWidth, 1)
        selectSlide(nextSlideIndex)
        event.currentTarget.scrollTo({
            behavior: "smooth",
            left: viewportWidth * nextSlideIndex,
        })
    }

    function handleDragCancel(event: ReactPointerEvent<HTMLDivElement>) {
        dragStartRef.current = null
        setIsDragging(false)
        event.currentTarget.scrollTo({
            behavior: "smooth",
            left: event.currentTarget.clientWidth * activeSlideIndex,
        })
    }

    function handleCarouselScroll(event: ReactUIEvent<HTMLDivElement>) {
        const viewportWidth = Math.max(event.currentTarget.clientWidth, 1)
        showPageProgress(pageProgressForScrollPosition(event.currentTarget.scrollLeft, viewportWidth))
    }

    useEffect(() => {
        const carouselViewport = carouselViewportRef.current
        if (!carouselViewport) {
            return
        }

        const resizeObserver = new ResizeObserver(() => {
            if (dragStartRef.current) {
                return
            }

            const selectedSlideIndex = activeSlideIndexRef.current
            carouselViewport.scrollLeft = carouselViewport.clientWidth * selectedSlideIndex
            showPageProgress(selectedSlideIndex)
        })

        resizeObserver.observe(carouselViewport)
        return () => resizeObserver.disconnect()
    }, [])

    useEffect(() => {
        if (!p.isPlaying) {
            videoRefs.current.forEach((videoElement) => videoElement?.pause())
            return
        }

        const activeVideo = videoRefs.current[activeSlideIndex]
        if (!activeVideo) {
            return
        }

        const playActiveSlide = () => {
            activeVideo.currentTime = 0
            void activeVideo.play().catch(() => undefined)
        }

        if (activeVideo.readyState >= HTMLMediaElement.HAVE_METADATA) {
            playActiveSlide()
        } else {
            activeVideo.addEventListener("loadedmetadata", playActiveSlide, { once: true })
        }

        const previousVideoPauseTimer = window.setTimeout(() => {
            videoRefs.current.forEach((videoElement, index) => {
                if (index !== activeSlideIndex) {
                    videoElement?.pause()
                }
            })
        }, phoneCarouselTiming.snapMs)

        return () => {
            activeVideo.removeEventListener("loadedmetadata", playActiveSlide)
            window.clearTimeout(previousVideoPauseTimer)
        }
    }, [activeSlideIndex, p.isPlaying])

    return (
        <div
            className={`relative overflow-visible ${p.className ?? ""}`}
            style={phoneFrameStyle}
        >
            <img
                alt=""
                className="pointer-events-none absolute inset-0 z-30 h-full w-full select-none"
                draggable={false}
                src={phonePreviewAssets.frame}
            />
            <div
                ref={carouselViewportRef}
                className="pointer-events-auto absolute top-[3.54%] left-[7.11%] z-20 h-[92.91%] w-[85.78%] touch-pan-y cursor-grab overflow-hidden bg-black active:cursor-grabbing"
                style={{ ...phoneScreenStyle, WebkitUserSelect: "none" }}
                onPointerCancel={handleDragCancel}
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onScroll={handleCarouselScroll}
            >
                <div className="flex h-full">
                    {phonePreviewSlides.map((slide, index) => (
                        <video
                            key={slide.src}
                            ref={(videoElement) => registerVideo(index, videoElement)}
                            className="pointer-events-none h-full min-w-full flex-none object-cover"
                            loop
                            muted
                            playsInline
                            preload="metadata"
                        >
                            <source src={slide.src} type="video/mp4" />
                        </video>
                    ))}
                </div>
            </div>
            <div
                className="pointer-events-auto absolute -bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center"
                style={{ gap: phoneCarouselIndicator.gapPx }}
            >
                {phonePreviewSlides.map((slide, index) => (
                    <button
                        key={slide.src}
                        type="button"
                        aria-label={`${index + 1}/${phonePreviewSlides.length}`}
                        aria-pressed={index === activeSlideIndex}
                        className="relative touch-manipulation cursor-pointer rounded-full border-0 bg-transparent p-0 transition-[width] ease-out focus-visible:outline-none focus-visible:drop-shadow-[0_0_3px_white]"
                        style={{
                            height: phoneCarouselIndicator.hitAreaHeightPx,
                            transitionDuration: isDragging ? "0ms" : `${phoneCarouselTiming.snapMs}ms`,
                            width: carouselIndicatorWidth(carouselIndicatorActivation(index, renderedPageProgress)),
                        }}
                        onClick={() => showSlide(index)}
                    >
                        <span
                            aria-hidden="true"
                            className="absolute top-1/2 left-0 w-full -translate-y-1/2 rounded-full bg-white/20"
                            style={{ height: phoneCarouselIndicator.dotSizePx }}
                        />
                        <span
                            aria-hidden="true"
                            className="absolute top-1/2 left-0 w-full -translate-y-1/2 rounded-full bg-white"
                            style={{
                                height: phoneCarouselIndicator.dotSizePx,
                                opacity: carouselIndicatorActivation(index, renderedPageProgress),
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
