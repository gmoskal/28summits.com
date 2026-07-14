"use client"

import type { ChangeEvent } from "react"
import { SiteLocale, SiteThemeMode, homeContent, siteLanguageByLocale, siteLanguages, siteThemeModes } from "../_lib/site-content"
import { DraggableSwitch, type DraggableSwitchOption } from "./draggable-switch"

type SiteControlsProps = {
    content: (typeof homeContent)[SiteLocale]["controls"]
    locale: SiteLocale
    themeMode: SiteThemeMode
    onLocaleChange: (locale: SiteLocale) => void
    onThemeModeChange: (mode: SiteThemeMode) => void
}

const EmailIcon = () => (
    <svg aria-hidden="true" className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
)

const InstagramIcon = () => (
    <svg aria-hidden="true" className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
    </svg>
)

const FacebookIcon = () => (
    <svg aria-hidden="true" className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.6 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V13h2.8v8h3.4Z" />
    </svg>
)

const socialLinks = [
    { href: "mailto:rysek@28gor.app", label: "E-mail", Icon: EmailIcon, external: false },
    { href: "https://www.instagram.com/28gor.app", label: "Instagram", Icon: InstagramIcon, external: true },
    {
        href: "https://www.facebook.com/profile.php?id=61591852292572",
        label: "Facebook",
        Icon: FacebookIcon,
        external: true,
    },
] as const

function SunIcon() {
    return (
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="2" />
            <path
                d="M12 2.5v2.25M12 19.25v2.25M4.75 4.75l1.6 1.6M17.65 17.65l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.75 19.25l1.6-1.6M17.65 6.35l1.6-1.6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
                d="M20.2 14.7A7.8 7.8 0 0 1 9.3 3.8a8.9 8.9 0 1 0 10.9 10.9Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    )
}

function ThemeIcon({ mode }: { mode: SiteThemeMode }) {
    return mode === "light" ? <SunIcon /> : <MoonIcon />
}

function LanguageSelect(p: Pick<SiteControlsProps, "content" | "locale" | "onLocaleChange">) {
    function handleLanguageChange(event: ChangeEvent<HTMLSelectElement>) {
        p.onLocaleChange(event.target.value as SiteLocale)
    }

    return (
        <label
            className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full transition-shadow focus-within:shadow-[0_0_0_3px_var(--selection-bg)]"
            style={{
                backgroundColor: "var(--control-bg)",
                color: "var(--text-muted)",
            }}
        >
            <span aria-hidden="true" className="pointer-events-none text-[17px] leading-[17px]">
                {siteLanguageByLocale[p.locale].flag}
            </span>
            <select
                aria-label={p.content.languageLabel}
                value={p.locale}
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full opacity-0"
                onChange={handleLanguageChange}
            >
                {siteLanguages.map((language) => (
                    <option key={language.locale} value={language.locale}>
                        {language.flag} {language.name}
                    </option>
                ))}
            </select>
        </label>
    )
}

const SocialLinks = () => (
    <nav
        aria-label="Contact and social media"
        className="col-span-2 flex h-10 items-center justify-self-end rounded-full bg-[var(--control-bg)] p-1"
    >
        {socialLinks.map((link) => (
            <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--text-muted)] outline-none transition-[color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[var(--border-muted)] hover:text-[var(--text-primary)] focus-visible:bg-[var(--border-muted)] focus-visible:text-[var(--text-primary)] focus-visible:shadow-[0_0_0_3px_var(--selection-bg)] motion-reduce:transform-none"
            >
                <link.Icon />
            </a>
        ))}
    </nav>
)

export function ThemeModeSwitch(p: Pick<SiteControlsProps, "content" | "themeMode" | "onThemeModeChange">) {
    const themeOptions: [DraggableSwitchOption<SiteThemeMode>, DraggableSwitchOption<SiteThemeMode>] = [
        { value: siteThemeModes[0], label: p.content.themeModes.light, content: <ThemeIcon mode={siteThemeModes[0]} /> },
        { value: siteThemeModes[1], label: p.content.themeModes.dark, content: <ThemeIcon mode={siteThemeModes[1]} /> },
    ]

    return (
        <DraggableSwitch
            ariaLabel={p.content.themeLabel}
            value={p.themeMode}
            options={themeOptions}
            metrics={{ slotWidth: 36, thumbWidth: 32 }}
            onChange={p.onThemeModeChange}
        />
    )
}

export const SiteControls = (p: SiteControlsProps) => (
    <div className="flex flex-nowrap items-center justify-end gap-1 sm:gap-2">
        <SocialLinks />
        <LanguageSelect content={p.content} locale={p.locale} onLocaleChange={p.onLocaleChange} />
        <ThemeModeSwitch content={p.content} themeMode={p.themeMode} onThemeModeChange={p.onThemeModeChange} />
    </div>
)
