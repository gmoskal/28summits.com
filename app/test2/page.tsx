import type { Metadata } from "next"
import { Test2PageClient } from "./test2-page-client"

export const metadata: Metadata = {
    title: "Test scribble",
    robots: {
        index: false,
        follow: false,
    },
}

export default function Test2Page() {
    return <Test2PageClient />
}
