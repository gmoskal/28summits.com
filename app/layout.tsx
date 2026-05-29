import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { siteConfig } from "./_lib/site-content"

const inter = localFont({
    src: "./fonts/InterVariable.woff2",
    variable: "--font-inter",
    display: "swap",
    weight: "100 900",
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
        icon: "/moments-icon-figma.png",
        apple: "/moments-icon-figma.png",
    },
    openGraph: {
        type: "website",
        url: siteConfig.siteUrl,
        title: siteConfig.socialTitle,
        description: siteConfig.socialDescription,
        siteName: siteConfig.name,
        locale: "pl_PL",
        alternateLocale: ["en_US"],
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
    themeColor: "#f7f3ea",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={inter.variable}>
            <body>{children}</body>
        </html>
    )
}
