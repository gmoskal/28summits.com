import { hexToHpluv, hsluvToRgb } from "hsluv"

export const colors = {
    bgColor: "#f2eff2",
    primaryWhite: "#f2f2f2",
    primaryBlack: "#000",
    primaryHover: "#343078",
    brandColor: "#dda608"
}

export const sizes = {
    mobileM: "375px",
    tablet: "768px",
    laptopL: "1440px",
    desktop: "2560px"
}

type Colors = typeof colors

export const media = (d: keyof typeof sizes) => `@media (max-width: ${sizes[d]})`

type ColorParam = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100
type ColorFn = (v: keyof Colors, p: ColorParam) => string

const rgbToHex = (cs: [number, number, number]) => {
    const [r, g, b] = cs.map(c => Math.round(c * 255))
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const withLightness = (t: Colors): ColorFn => (v, l) => {
    const [h, s] = hexToHpluv(`${t[v]}`)
    return rgbToHex(hsluvToRgb([h, s, l]))
}

const withSaturation = (t: Colors): ColorFn => (v, s) => {
    const [h, _, l] = hexToHpluv(`${t[v]}`)
    return rgbToHex(hsluvToRgb([h, s, l]))
}

export const getTheme = () => ({
    ...colors,
    withLightness: withLightness(colors),
    withSaturation: withSaturation(colors)
})

declare module "styled-components" {
    export interface DefaultTheme extends ReturnType<typeof getTheme> {}
}
