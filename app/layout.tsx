import type { Metadata, Viewport } from "next"
import { Gloria_Hallelujah } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import {
    siteConfig,
    siteHomeUrl,
    siteLanguages,
    siteSocialContent,
    siteSocialImage,
    siteSocialTwitterImage,
} from "./_lib/site-content"

const inter = localFont({
    src: "./fonts/InterVariable.woff2",
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

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    alternates: {
        canonical: siteHomeUrl,
    },
    icons: {
        shortcut: [{ url: siteConfig.faviconIconIco, type: "image/x-icon" }],
        icon: [
            { url: siteConfig.faviconIcon16, sizes: "16x16", type: "image/png" },
            { url: siteConfig.faviconIcon32, sizes: "32x32", type: "image/png" },
            { url: siteConfig.appIcon, sizes: "1024x1024", type: "image/png" },
        ],
        apple: [{ url: siteConfig.appleTouchIcon, sizes: "180x180", type: "image/png" }],
        other: [{ rel: "image_src", url: siteSocialImage.secureUrl }],
    },
    openGraph: {
        type: "website",
        url: siteHomeUrl,
        title: siteSocialContent.title,
        description: siteSocialContent.description,
        siteName: siteConfig.name,
        locale: "pl_PL",
        alternateLocale: siteLanguages
            .filter((language) => language.ogLocale !== "pl_PL")
            .map((language) => language.ogLocale),
        images: [siteSocialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: siteSocialContent.title,
        description: siteSocialContent.description,
        images: [siteSocialTwitterImage],
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
        <html lang="pl" className={`${inter.variable} ${gloriaHallelujah.variable}`}>
            <body>{children}</body>
        </html>
    )
}
