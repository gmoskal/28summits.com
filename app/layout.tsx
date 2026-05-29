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

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    icons: {
        icon: "/moments-icon-figma.png",
        apple: "/moments-icon-figma.png",
    },
    openGraph: {
        type: "website",
        url: siteConfig.siteUrl,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [{ url: "/mascot-hiker.jpg", width: 1023, height: 1537, alt: siteConfig.name }],
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
