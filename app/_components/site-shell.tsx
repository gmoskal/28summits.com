import Image from "next/image"
import type { MouseEventHandler } from "react"
import { siteConfig } from "../_lib/site-content"
import { SmoothLink } from "./smooth-navigation"

const legalNavLinks = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/support", label: "Support" },
] as const

type BrandMarkProps = {
    compact?: boolean
    onClick?: MouseEventHandler<HTMLAnchorElement>
    showName?: boolean
}

export function BrandMark({ compact = false, onClick, showName = true }: BrandMarkProps) {
    return (
        <SmoothLink
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex w-[99px] flex-col items-center gap-2 text-center"
            onClick={onClick}
        >
            <Image
                src={siteConfig.appIconHeader}
                alt=""
                width={160}
                height={160}
                quality={100}
                priority={!compact}
                sizes="80px"
                className="h-20 w-20 rounded-[15px] shadow-[0_16px_38px_rgba(0,0,0,0.08)]"
            />
            {showName ? (
                <span className="text-[17px] leading-[20px] font-semibold text-[var(--text-primary)]">
                    {siteConfig.name}
                </span>
            ) : null}
        </SmoothLink>
    )
}

export function LegalNav({ className = "" }: { className?: string }) {
    return (
        <nav className={`flex items-center gap-4 ${className}`} aria-label="Legal">
            {legalNavLinks.map((link) => (
                <SmoothLink
                    key={link.href}
                    href={link.href}
                    className="text-[15px] leading-[20px] font-semibold text-[var(--text-muted)]"
                >
                    {link.label}
                </SmoothLink>
            ))}
        </nav>
    )
}
