import { Barlow, Gloria_Hallelujah } from "next/font/google"
import localFont from "next/font/local"
import type { ReactNode } from "react"

type SiteDocumentProps = {
    children: ReactNode
    lang: string
}

const inter = localFont({
    src: "../fonts/InterVariable.woff2",
    variable: "--font-inter",
    display: "swap",
    weight: "100 900",
})

const gloriaHallelujah = Gloria_Hallelujah({
    subsets: ["latin", "latin-ext"],
    variable: "--font-gloria",
    display: "swap",
    weight: "400",
})

const barlow = Barlow({
    subsets: ["latin", "latin-ext"],
    variable: "--font-barlow",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
})

const siteFontClassName = `${inter.variable} ${gloriaHallelujah.variable} ${barlow.variable}`

export const SiteDocument = (p: SiteDocumentProps) => (
    <html lang={p.lang} className={siteFontClassName}>
        <body>{p.children}</body>
    </html>
)
