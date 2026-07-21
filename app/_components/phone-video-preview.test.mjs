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

test("the carousel uses every supplied recording", () => {
    for (const source of [
        "/video/rec0-onboarding.MP4",
        "/video/rec1-overview.MP4",
        "/video/rec2-options.MP4",
        "/video/rec3-peak.MP4",
        "/video/rec4-game.MP4",
        "/video/rec5-funcs.MP4",
        "/video/rec6-con.MP4",
    ]) {
        assert.match(componentSource, new RegExp(source.replace(".", "\\.")))
    }
})
