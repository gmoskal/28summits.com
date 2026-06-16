import type { Metadata, Viewport } from "next"
import { Caveat } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { siteConfig, siteLanguages } from "./_lib/site-content"

const inter = localFont({
    src: "./fonts/InterVariable.woff2",
    variable: "--font-inter",
    display: "swap",
    weight: "100 900",
})

const caveat = Caveat({
    subsets: ["latin", "latin-ext"],
    variable: "--font-caveat",
    display: "swap",
    weight: ["400", "500", "600", "700"],
})

const socialImage = {
    url: siteConfig.socialImage,
    width: 1200,
    height: 630,
    alt: siteConfig.socialImageAlt,
} as const

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    alternates: {
        canonical: siteConfig.siteUrl,
    },
    icons: {
        icon: [
            { url: siteConfig.faviconIcon16, sizes: "16x16", type: "image/png" },
            { url: siteConfig.faviconIcon32, sizes: "32x32", type: "image/png" },
            { url: siteConfig.appIcon, sizes: "1024x1024", type: "image/png" },
        ],
        apple: [{ url: siteConfig.appleTouchIcon, sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
        type: "website",
        url: siteConfig.siteUrl,
        title: siteConfig.socialTitle,
        description: siteConfig.socialDescription,
        siteName: siteConfig.name,
        locale: "pl_PL",
        alternateLocale: siteLanguages
            .filter((language) => language.ogLocale !== "pl_PL")
            .map((language) => language.ogLocale),
        images: [socialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.socialTitle,
        description: siteConfig.socialDescription,
        images: [siteConfig.socialImage],
    },
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    colorScheme: "light dark",
    themeColor: "#ffffff",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
            <body>{children}</body>
        </html>
    )
}
