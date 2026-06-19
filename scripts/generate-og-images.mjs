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
    photoLeftPx: 660,
    photoWidthPx: 540,
    appIconLeftPx: 64,
    appIconTopPx: 116,
    appIconSizePx: 180,
    teaserLeftPx: 64,
    teaserTopPx: 320,
    teaserWidthPx: 520,
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, "..")
const publicDir = path.join(repoRoot, "public")
const jiti = createJiti(import.meta.url)
const { siteLocales, siteSocialImageVersion, socialContent } = await jiti.import("../app/_lib/site-content.ts")

const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const jpegQuality = "92"
const appImagePath = path.join(publicDir, "card-stack", "walking2.jpeg")
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

function teaserFontSize(teaser) {
    if (teaser.length > 38) {
        return 48
    }

    if (teaser.length > 30) {
        return 54
    }

    return 58
}

function htmlForLocale(locale) {
    const content = socialContent[locale]
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
            background: #030201;
        }

        .app-icon {
            position: absolute;
            top: ${imageLayout.appIconTopPx}px;
            left: ${imageLayout.appIconLeftPx}px;
            width: ${imageLayout.appIconSizePx}px;
            height: ${imageLayout.appIconSizePx}px;
            border-radius: 39px;
            box-shadow: 0 20px 34px rgba(0, 0, 0, 0.42);
        }

        .teaser {
            position: absolute;
            top: ${imageLayout.teaserTopPx}px;
            left: ${imageLayout.teaserLeftPx}px;
            width: ${imageLayout.teaserWidthPx}px;
            font-size: ${teaserSize}px;
            line-height: calc(${teaserSize}px + 10px);
            font-weight: 760;
            letter-spacing: 0;
            color: #ffffff;
            text-wrap: balance;
        }

        .photo {
            position: absolute;
            top: 0;
            left: ${imageLayout.photoLeftPx}px;
            width: ${imageLayout.photoWidthPx}px;
            height: ${imageSize.height}px;
            object-fit: cover;
            object-position: 52% 50%;
        }
    </style>
</head>
<body>
    <main class="stage">
        <img class="app-icon" src="${pathToFileURL(appIconPath).href}" alt="">
        <p class="teaser">${escapeHtml(content.imageTeaser)}</p>
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

function convertPngToJpeg(inputPath, outputPath) {
    const result = spawnSync("sips", [
        "-s",
        "format",
        "jpeg",
        "-s",
        "formatOptions",
        jpegQuality,
        inputPath,
        "--out",
        outputPath,
    ], {
        stdio: "pipe",
    })

    if (result.status !== 0) {
        throw new Error(`JPEG conversion failed for ${path.basename(outputPath)}:\n${result.stderr.toString()}`)
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
        const pngPath = path.join(tempDir, `og-${locale}.png`)
        writeFileSync(htmlPath, htmlForLocale(locale))
        chromeScreenshot(htmlPath, pngPath)
        convertPngToJpeg(pngPath, outputPath)
        console.log(`Generated ${path.relative(repoRoot, outputPath)}`)
    }

    const polishImage = path.join(publicDir, socialContent.pl.image.replace(/^\//, ""))
    const defaultImage = path.join(publicDir, "og-image.jpeg")
    const versionedPolishImage = path.join(publicDir, `og-image-${siteSocialImageVersion}.jpeg`)

    if (polishImage !== defaultImage) {
        copyFileSync(polishImage, defaultImage)
    }

    if (polishImage !== versionedPolishImage) {
        copyFileSync(polishImage, versionedPolishImage)
    }
} finally {
    rmSync(tempDir, { recursive: true, force: true })
}
