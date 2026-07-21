type StoryPhoneParallaxFrameInput = {
    isEnabled: boolean
    renderedScrollTop: number
    targetScrollTop: number
}

const storyPhoneParallax = {
    maxOffsetYPx: 54,
    response: 0.045,
    settleDistancePx: 0.1,
    strength: 0.085,
} as const

function limitedOffsetY(offsetY: number) {
    return Math.min(Math.max(offsetY, -storyPhoneParallax.maxOffsetYPx), storyPhoneParallax.maxOffsetYPx)
}

export function storyPhoneParallaxFrame(p: StoryPhoneParallaxFrameInput) {
    if (!p.isEnabled) {
        return {
            isSettled: true,
            offsetY: 0,
            renderedScrollTop: p.targetScrollTop,
        }
    }

    const scrollDistance = p.targetScrollTop - p.renderedScrollTop
    if (Math.abs(scrollDistance) <= storyPhoneParallax.settleDistancePx) {
        return {
            isSettled: true,
            offsetY: 0,
            renderedScrollTop: p.targetScrollTop,
        }
    }

    const renderedScrollTop = p.renderedScrollTop + scrollDistance * storyPhoneParallax.response
    const offsetY = limitedOffsetY(
        (p.targetScrollTop - renderedScrollTop) * storyPhoneParallax.strength,
    )

    return {
        isSettled: false,
        offsetY,
        renderedScrollTop,
    }
}
