import { spawnSync } from "node:child_process"
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { createJiti } from "jiti"

const imageSize = {
    width: 1200,
    height: 630,
}

const imageLayout = {
    photoTopPx: 32,
    photoHeightPx: 566,
    iconTitleGapPx: 42,
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, "..")
const publicDir = path.join(repoRoot, "public")
const jiti = createJiti(import.meta.url)
const { siteLocales, siteSocialImageVersion, socialContent } = await jiti.import("../app/_lib/site-content.ts")

const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const appImagePath = path.join(publicDir, "misc", "app-grid.webp")
const appIconPath = path.join(publicDir, "app-icon.png")
const interFontPath = path.join(repoRoot, "app", "fonts", "InterVariable.woff2")
const tempDir = mkdtempSync(path.join(tmpdir(), "28gor-og-"))

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
}

function findFiles(dir, predicate) {
    if (!existsSync(dir)) {
        return []
    }

    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            return findFiles(entryPath, predicate)
        }

        return predicate(entryPath) ? [entryPath] : []
    })
}

function findGloriaFontUrls() {
    const cssFiles = findFiles(path.join(repoRoot, ".next", "static", "chunks"), (file) => file.endsWith(".css"))
    const gloriaCss = cssFiles
        .map((file) => readFileSync(file, "utf8"))
        .find((css) => css.includes("font-family:Gloria Hallelujah"))

    if (!gloriaCss) {
        return []
    }

    const fontFileNames = [...gloriaCss.matchAll(/url\(\.\.\/media\/([^)]+\.woff2)\)/g)].map((match) => match[1])

    return fontFileNames
        .map((fileName) => path.join(repoRoot, ".next", "static", "media", fileName))
        .filter((fontPath) => existsSync(fontPath))
        .map((fontPath) => pathToFileURL(fontPath).href)
}

function fontFaceCss() {
    const gloriaFaces = findGloriaFontUrls()
        .map((fontUrl) => `
            @font-face {
                font-family: "Gloria Hallelujah";
                src: url("${fontUrl}") format("woff2");
                font-display: block;
                font-style: normal;
                font-weight: 400;
            }
        `)
        .join("\n")

    return `
        @font-face {
            font-family: "Inter";
            src: url("${pathToFileURL(interFontPath).href}") format("woff2");
            font-display: block;
            font-weight: 100 900;
        }
        ${gloriaFaces}
    `
}

function titleFontSize(title) {
    if (title.length > 35) {
        return 64
    }

    if (title.length > 29) {
        return 72
    }

    return 86
}

function teaserFontSize(teaser) {
    if (teaser.length > 38) {
        return 42
    }

    if (teaser.length > 30) {
        return 46
    }

    return 52
}

function titleFontFamily(locale) {
    if (locale === "uk") {
        return `"Inter", system-ui, sans-serif`
    }

    return `"Gloria Hallelujah", "Comic Sans MS", cursive`
}

function htmlForLocale(locale) {
    const content = socialContent[locale]
    const titleSize = titleFontSize(content.title)
    const teaserSize = teaserFontSize(content.imageTeaser)

    return `<!doctype html>
<html lang="${locale}">
<head>
    <meta charset="utf-8">
    <style>
        ${fontFaceCss()}

        * {
            box-sizing: border-box;
        }

        html,
        body {
            width: ${imageSize.width}px;
            height: ${imageSize.height}px;
            margin: 0;
            overflow: hidden;
            background: #030201;
        }

        body {
            font-family: "Inter", system-ui, sans-serif;
            color: #ffffff;
        }

        .stage {
            position: relative;
            width: ${imageSize.width}px;
            height: ${imageSize.height}px;
            overflow: hidden;
            background:
                radial-gradient(circle at 12% 18%, rgba(230, 118, 33, 0.16), transparent 33%),
                radial-gradient(circle at 44% 48%, rgba(106, 54, 25, 0.17), transparent 38%),
                linear-gradient(90deg, #0b0502 0%, #020201 56%, #000000 100%);
        }

        .app-icon {
            width: 126px;
            height: 126px;
            border-radius: 28px;
            box-shadow: 0 20px 34px rgba(0, 0, 0, 0.42);
        }

        .left-stack {
            position: absolute;
            top: ${imageLayout.photoTopPx}px;
            left: 68px;
            width: 612px;
            height: ${imageLayout.photoHeightPx}px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .title {
            font-family: ${titleFontFamily(locale)};
            margin: ${imageLayout.iconTitleGapPx}px 0 0;
            font-size: ${titleSize}px;
            line-height: 1.02;
            font-weight: 400;
            letter-spacing: 0;
            color: #fff2df;
            text-wrap: balance;
        }

        .teaser {
            margin: auto 0 0;
            max-width: 580px;
            font-size: ${teaserSize}px;
            line-height: calc(${teaserSize}px + 12px);
            font-weight: 650;
            letter-spacing: 0;
            color: rgba(255, 255, 255, 0.97);
            text-wrap: balance;
        }

        .photo {
            position: absolute;
            top: ${imageLayout.photoTopPx}px;
            left: 720px;
            width: 420px;
            height: ${imageLayout.photoHeightPx}px;
            object-fit: cover;
            object-position: 50% 50%;
            border-radius: 18px;
            box-shadow: 0 28px 70px rgba(0, 0, 0, 0.56);
        }
    </style>
</head>
<body>
    <main class="stage">
        <section class="left-stack">
            <img class="app-icon" src="${pathToFileURL(appIconPath).href}" alt="">
            <h1 class="title">${escapeHtml(content.title)}</h1>
            <p class="teaser">${escapeHtml(content.imageTeaser)}</p>
        </section>
        <img class="photo" src="${pathToFileURL(appImagePath).href}" alt="">
    </main>
</body>
</html>`
}

function chromeScreenshot(htmlPath, outputPath) {
    const result = spawnSync(chromePath, [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        `--window-size=${imageSize.width},${imageSize.height}`,
        "--virtual-time-budget=1200",
        `--screenshot=${outputPath}`,
        pathToFileURL(htmlPath).href,
    ], {
        stdio: "pipe",
    })

    if (result.status !== 0) {
        throw new Error(`Chrome failed for ${path.basename(outputPath)}:\n${result.stderr.toString()}`)
    }
}

try {
    if (!existsSync(chromePath)) {
        throw new Error(`Chrome not found at ${chromePath}. Set CHROME_PATH to another Chromium binary.`)
    }

    mkdirSync(publicDir, { recursive: true })

    for (const locale of siteLocales) {
        const htmlPath = path.join(tempDir, `og-${locale}.html`)
        const outputPath = path.join(publicDir, socialContent[locale].image.replace(/^\//, ""))
        writeFileSync(htmlPath, htmlForLocale(locale))
        chromeScreenshot(htmlPath, outputPath)
        console.log(`Generated ${path.relative(repoRoot, outputPath)}`)
    }

    const polishImage = path.join(publicDir, socialContent.pl.image.replace(/^\//, ""))
    copyFileSync(polishImage, path.join(publicDir, "og-image.png"))
    copyFileSync(polishImage, path.join(publicDir, `og-image-${siteSocialImageVersion}.png`))
} finally {
    rmSync(tempDir, { recursive: true, force: true })
}
