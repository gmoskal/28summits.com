import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const componentSource = await readFile(new URL("./phone-video-preview.tsx", import.meta.url), "utf8")

test("dragging the phone screen moves the actual media viewport", () => {
    assert.match(
        componentSource,
        /event\.currentTarget\.scrollLeft = dragStart\.scrollLeft - pointerDelta/,
        "The drag gesture must change the video viewport scroll position directly",
    )
    assert.match(componentSource, /onScroll=\{handleCarouselScroll\}/)
    assert.doesNotMatch(
        componentSource,
        /transform: `translate3d\(/,
        "The film position must not be represented only by a React transform state",
    )
})

test("snapping and the indicator read the same physical carousel position", () => {
    assert.match(componentSource, /event\.currentTarget\.scrollTo\(/)
    assert.match(
        componentSource,
        /showPageProgress\(pageProgressForScrollPosition\(event\.currentTarget\.scrollLeft, viewportWidth\)\)/,
    )
})

test("the carousel uses only overview, stamp, and game recordings", () => {
    for (const source of [
        "/video/rec1-overview-web-v2.mp4",
        "/video/rec3-peak-web.mp4",
        "/video/rec4-game-web.mp4",
    ]) {
        assert.match(componentSource, new RegExp(source.replace(".", "\\.")))
    }

    for (const excludedRecording of ["rec0-onboarding", "rec2-options", "rec5-funcs", "rec6-con"]) {
        assert.doesNotMatch(componentSource, new RegExp(excludedRecording))
    }
})

test("the carousel changes recordings only through direct interaction", () => {
    assert.doesNotMatch(componentSource, /slideDurationMs/)
    assert.doesNotMatch(componentSource, /showSlide\(\(activeSlideIndex \+ 1\)/)
})

test("the carousel shuffles its recordings once when the page starts", () => {
    assert.match(componentSource, /Math\.random\(\)/)
    assert.match(componentSource, /useEffect\(\(\) => setSlides\(phonePreviewSessionSlides\(\)\), \[\]\)/)
})
