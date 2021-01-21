import * as React from "react"
import type { AppProps /*, AppContext */ } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "styled-components"

import { getTheme } from "utils/colors"
import { GlobalStyle } from "Components/style"

function ExtApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="" />
                <meta name="og:title" content="28 summits" />
                <meta name="twitter:card" content="summary_large_image" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:700,400,900" rel="stylesheet" />
            </Head>
            <ThemeProvider theme={getTheme()}>
                <GlobalStyle />
                <main>
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </>
    )
}

export default ExtApp
