import type { Metadata } from "next"
import { TestPageClient } from "./test-page-client"

export const metadata: Metadata = {
    title: "Test logo",
    robots: {
        index: false,
        follow: false,
    },
}

export default function TestPage() {
    return <TestPageClient />
}
