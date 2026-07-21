import assert from "node:assert/strict"
import test from "node:test"
import { createJiti } from "jiti"

const { storyPhoneParallaxFrame } = await createJiti(import.meta.url).import("./home-story-phone.motion.ts")

test("desktop story phone follows scroll with a light delay and lands at zero offset", () => {
    const targetScrollTop = 800
    let frame = storyPhoneParallaxFrame({
        isEnabled: true,
        renderedScrollTop: 0,
        targetScrollTop,
    })

    assert.equal(frame.offsetY, 54)
    assert.ok(frame.renderedScrollTop < targetScrollTop)

    for (let index = 0; index < 300 && !frame.isSettled; index += 1) {
        frame = storyPhoneParallaxFrame({
            isEnabled: true,
            renderedScrollTop: frame.renderedScrollTop,
            targetScrollTop,
        })
    }

    assert.deepEqual(frame, {
        isSettled: true,
        offsetY: 0,
        renderedScrollTop: targetScrollTop,
    })
})

test("story phone parallax stays disabled outside desktop motion", () => {
    assert.deepEqual(
        storyPhoneParallaxFrame({
            isEnabled: false,
            renderedScrollTop: 0,
            targetScrollTop: 800,
        }),
        {
            isSettled: true,
            offsetY: 0,
            renderedScrollTop: 800,
        },
    )
})
