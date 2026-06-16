"use client"

import { startTransition, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react"
import { useRouter } from "next/navigation"

const previousPathStorageKey = "28gor.previousPath"

type NavigateOptions = {
    replace?: boolean
}

type SmoothLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
}

type SmoothBackButtonProps = {
    fallbackHref?: string
    className?: string
    children?: ReactNode
}

function currentLocalPath() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

function localPathForHref(href: string) {
    const url = new URL(href, window.location.href)

    return `${url.pathname}${url.search}${url.hash}`
}

function shouldUseNativeNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return true
    }

    const target = event.currentTarget.target
    if (target && target !== "_self") {
        return true
    }

    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
        return true
    }

    try {
        return new URL(href, window.location.href).origin !== window.location.origin
    } catch {
        return true
    }
}

function recordPreviousPath() {
    try {
        window.sessionStorage.setItem(previousPathStorageKey, currentLocalPath())
    } catch {
        // Session storage can be unavailable in restrictive browser modes.
    }
}

function storedPreviousPath() {
    try {
        return window.sessionStorage.getItem(previousPathStorageKey)
    } catch {
        return null
    }
}

function backTargetPath(fallbackHref: string) {
    const previousPath = storedPreviousPath()
    if (previousPath && previousPath !== currentLocalPath()) {
        return previousPath
    }

    return fallbackHref
}

function runRouteTransition(callback: () => void) {
    startTransition(callback)
}

function useSmoothNavigation() {
    const router = useRouter()

    return (href: string, options: NavigateOptions = {}) => {
        const targetPath = localPathForHref(href)
        if (targetPath === currentLocalPath()) {
            return
        }

        recordPreviousPath()
        runRouteTransition(() => {
            if (options.replace) {
                router.replace(targetPath)
                return
            }

            router.push(targetPath)
        })
    }
}

export function SmoothLink({ href, onClick, ...props }: SmoothLinkProps) {
    const navigate = useSmoothNavigation()

    return (
        <a
            {...props}
            href={href}
            onClick={(event) => {
                onClick?.(event)
                if (event.defaultPrevented || shouldUseNativeNavigation(event, href)) {
                    return
                }

                event.preventDefault()
                navigate(href)
            }}
        />
    )
}

export function SmoothBackButton({ fallbackHref = "/", className = "", children = "Wróć" }: SmoothBackButtonProps) {
    const navigate = useSmoothNavigation()

    return (
        <button
            type="button"
            aria-label={typeof children === "string" ? children : "Wróć"}
            className={`inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full text-[19px] leading-none font-semibold backdrop-blur transition-[background-color,color,box-shadow] ${className}`}
            style={{
                backgroundColor: "var(--button-secondary-bg)",
                boxShadow: "inset 0 0 0 1px var(--border-muted)",
                color: "var(--button-secondary-text)",
            }}
            onClick={() => {
                navigate(backTargetPath(fallbackHref), { replace: true })
            }}
        >
            <span aria-hidden>←</span>
        </button>
    )
}
