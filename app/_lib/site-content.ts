const siteIconVersion = "20260617-2"
export const siteSocialImageVersion = "20260619-01"

export const siteConfig = {
    name: "28 gór",
    productName: "28 gór",
    operatorName: "async.studio",
    contactEmail: "rysek@28gor.app",
    siteHost: "28gor.app",
    currencyCode: "PLN",
    paymentProcessorName: "Stripe",
    appStoreUrl: "https://apps.apple.com/app/28-summits/id0000000000",
    appStoreBadgeImage: "/download-on-the-app-store-badge.svg",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.28summits.app",
    launchUpdatesUrl: "mailto:rysek@28gor.app?subject=28%20g%C3%B3r%20launch%20updates",
    siteUrl: "https://28gor.app",
    appIcon: `/app-icon.png?v=${siteIconVersion}`,
    appIconHeader: "/app-icon.png",
    appleTouchIcon: "/apple-touch-icon.png",
    faviconIconIco: `/favicon.ico?v=${siteIconVersion}`,
    faviconIcon16: `/favicon-16x16.png?v=${siteIconVersion}`,
    faviconIcon32: `/favicon-32x32.png?v=${siteIconVersion}`,
    description: "28 gór zbiera plany, wejścia, zdjęcia, ręcznie rysowane pieczątki, edukację i górskie pamiątki w jednej dopracowanej aplikacji.",
} as const

export const siteLanguages = [
    { locale: "pl", flag: "🇵🇱", name: "Polski", htmlLang: "pl", ogLocale: "pl_PL" },
    { locale: "en", flag: "🇬🇧", name: "English", htmlLang: "en", ogLocale: "en_US" },
    { locale: "es", flag: "🇪🇸", name: "Español", htmlLang: "es", ogLocale: "es_ES" },
    { locale: "de", flag: "🇩🇪", name: "Deutsch", htmlLang: "de", ogLocale: "de_DE" },
    { locale: "fr", flag: "🇫🇷", name: "Français", htmlLang: "fr", ogLocale: "fr_FR" },
    { locale: "nb", flag: "🇳🇴", name: "Norsk", htmlLang: "nb", ogLocale: "nb_NO" },
    { locale: "cs", flag: "🇨🇿", name: "Čeština", htmlLang: "cs", ogLocale: "cs_CZ" },
    { locale: "sk", flag: "🇸🇰", name: "Slovenčina", htmlLang: "sk", ogLocale: "sk_SK" },
    { locale: "uk", flag: "🇺🇦", name: "Українська", htmlLang: "uk", ogLocale: "uk_UA" },
] as const

export type SiteLocale = (typeof siteLanguages)[number]["locale"]
export type SiteLanguage = (typeof siteLanguages)[number]

export const siteLocales = siteLanguages.map((language) => language.locale)
export const siteLanguageByLocale = Object.fromEntries(
    siteLanguages.map((language) => [language.locale, language]),
) as Record<SiteLocale, SiteLanguage>

export const defaultSiteLocale: SiteLocale = "pl"

const siteLocaleAliases: Partial<Record<string, SiteLocale>> = {
    no: "nb",
} as const

export type SiteSocialContent = {
    locale: SiteLocale
    title: string
    description: string
    imageTeaser: string
    image: string
    imageAlt: string
}

export function siteLocaleFromInput(localeInput: string | null | undefined): SiteLocale | null {
    if (!localeInput) {
        return null
    }

    const languageCode = localeInput.toLowerCase().split("-")[0]
    const aliasedLocale = siteLocaleAliases[languageCode]

    if (aliasedLocale) {
        return aliasedLocale
    }

    return siteLocales.find((locale) => locale === languageCode) ?? null
}

function socialImagePath(locale: SiteLocale) {
    if (locale === defaultSiteLocale) {
        return "/og-image.png"
    }

    return `/og-image-${siteSocialImageVersion}-${locale}.png`
}

const socialCopyByLocale: Record<SiteLocale, Omit<SiteSocialContent, "locale" | "image">> = {
    pl: {
        title: "Gotowi na 28 przygód?",
        description: "Zbieraj pieczątki z najwyższych gór w Polsce. Kolekcjonuj zdjęcia i pamiątki, odkrywaj gry edukacyjne, a przede wszystkim poznaj Ryska.",
        imageTeaser: "Zbieraj pieczątki. Poznaj Ryska.",
        imageAlt: "Rysek wędruje górskim szlakiem w aplikacji 28 gór.",
    },
    en: {
        title: "Ready for 28 adventures?",
        description: "Collect stamps from Poland's highest mountains. Save photos and keepsakes, discover educational games, and most of all, meet Rysek.",
        imageTeaser: "Collect stamps. Meet Rysek.",
        imageAlt: "Rysek walks along a mountain trail in the 28 gór app.",
    },
    es: {
        title: "¿Todo listo para 28 aventuras?",
        description: "Colecciona sellos de las montañas más altas de Polonia. Guarda fotos y recuerdos, descubre juegos educativos y, sobre todo, conoce a Rysek.",
        imageTeaser: "Colecciona sellos. Conoce a Rysek.",
        imageAlt: "Rysek camina por un sendero de montaña en la app 28 gór.",
    },
    de: {
        title: "Bereit für 28 Abenteuer?",
        description: "Sammle Stempel der höchsten Berge Polens. Bewahre Fotos und Andenken, entdecke Lernspiele und lerne vor allem Rysek kennen.",
        imageTeaser: "Sammle Stempel. Lerne Rysek kennen.",
        imageAlt: "Rysek wandert in der 28 gór App auf einem Bergpfad.",
    },
    fr: {
        title: "Cap sur 28 aventures ?",
        description: "Collectionne les tampons des plus hauts sommets de Pologne. Garde tes photos et souvenirs, découvre des jeux éducatifs et, surtout, rencontre Rysek.",
        imageTeaser: "Collectionne les tampons. Rencontre Rysek.",
        imageAlt: "Rysek marche sur un sentier de montagne dans l'app 28 gór.",
    },
    nb: {
        title: "Klar for 28 eventyr?",
        description: "Samle stempler fra Polens høyeste fjell. Ta vare på bilder og minner, oppdag lærerike spill og, viktigst av alt, bli kjent med Rysek.",
        imageTeaser: "Samle stempler. Bli kjent med Rysek.",
        imageAlt: "Rysek går på en fjellsti i 28 gór-appen.",
    },
    cs: {
        title: "Připraveni na 28 dobrodružství?",
        description: "Sbírej razítka z nejvyšších hor Polska. Uchovávej fotografie a památky, objevuj vzdělávací hry a hlavně poznej Ryska.",
        imageTeaser: "Sbírej razítka. Poznej Ryska.",
        imageAlt: "Rysek jde po horské stezce v aplikaci 28 gór.",
    },
    sk: {
        title: "Pripravení na 28 dobrodružstiev?",
        description: "Zbieraj pečiatky z najvyšších hôr Poľska. Ukladaj fotografie a pamiatky, objavuj vzdelávacie hry a hlavne spoznaj Ryska.",
        imageTeaser: "Zbieraj pečiatky. Spoznaj Ryska.",
        imageAlt: "Rysek kráča po horskom chodníku v aplikácii 28 gór.",
    },
    uk: {
        title: "Готові до 28 пригод?",
        description: "Збирай штампи з найвищих гір Польщі. Зберігай фото й пам'ятки, відкривай освітні ігри, а головне - познайомся з Рисеком.",
        imageTeaser: "Збирай штампи. Познайомся з Рисеком.",
        imageAlt: "Рисек іде гірською стежкою у застосунку 28 gór.",
    },
} as const

export const socialContent = Object.fromEntries(
    siteLocales.map((locale) => [
        locale,
        {
            locale,
            ...socialCopyByLocale[locale],
            image: socialImagePath(locale),
        },
    ]),
) as Record<SiteLocale, SiteSocialContent>

export function socialContentForLocale(localeInput: string | null | undefined): SiteSocialContent {
    return socialContent[siteLocaleFromInput(localeInput) ?? defaultSiteLocale]
}

export function siteSocialImageForLocale(localeInput: string | null | undefined = defaultSiteLocale) {
    const content = socialContentForLocale(localeInput)

    return {
        url: content.image,
        secureUrl: `${siteConfig.siteUrl}${content.image}`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: content.imageAlt,
    } as const
}

export function siteSocialTwitterImageForLocale(localeInput: string | null | undefined = defaultSiteLocale) {
    const content = socialContentForLocale(localeInput)

    return {
        url: content.image,
        alt: content.imageAlt,
    } as const
}

export const siteSocialContent = socialContent[defaultSiteLocale]
export const siteSocialImage = siteSocialImageForLocale(defaultSiteLocale)
export const siteSocialTwitterImage = siteSocialTwitterImageForLocale(defaultSiteLocale)

export const siteThemeModes = ["light", "dark"] as const
export type SiteThemeMode = (typeof siteThemeModes)[number]

export const homeContent: Record<
    SiteLocale,
    {
        controls: {
            languageLabel: string
            themeLabel: string
            themeModes: Record<SiteThemeMode, string>
        }
        nav: {
            privacy: string
            terms: string
            support: string
            back: string
        }
        hero: {
            eyebrow: string
            headline: string
            replayLogoAnimationLabel: string
            body: string[]
            appStoreBadge: {
                actionLabel: string
            }
            caption: string
            featureLabels: string[]
            mascotBadge: string
        }
        compliance: {
            summaryParts: string[]
            contactLabel: string
            legalPolicies: string
        }
    }
> = {
    pl: {
        controls: {
            languageLabel: "Język",
            themeLabel: "Motyw",
            themeModes: {
                light: "Jasny",
                dark: "Ciemny",
            },
        },
        nav: {
            privacy: "Prywatność",
            terms: "Regulamin",
            support: "Kontakt",
            back: "Wróć",
        },
        hero: {
            eyebrow: "Wszystko z gór w jednym miejscu",
            headline: "28 gór",
            replayLogoAnimationLabel: "Odtwórz animację logo 28 gór",
            body: [
                "28 gór to nowa aplikacja w App Store, która zbiera wejścia, zdjęcia i ślady z trasy w jednym pięknym miejscu. Każdy szczyt dostaje własną, ręcznie rysowaną pieczątkę.",
                "Rysek już zabiera ją w góry. W środku czekają małe odkrycia: informacje o szczytach, edukacyjne tropy i pamiątki, które można zamówić po prawdziwej wyprawie.",
            ],
            appStoreBadge: {
                actionLabel: "Daj znać, gdy 28 gór pojawi się w App Store",
            },
            caption: "Kliknij badge App Store, a przygotujemy wiadomość, żeby dać Ci znać przy starcie.",
            featureLabels: ["Rysowane pieczątki", "Pamiątki na zamówienie", "Centrum edukacyjne", "Informacje o górach"],
            mascotBadge: "Czerwiec 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór to produkt ${siteConfig.operatorName}`,
                "ręcznie rysowane pieczątki w aplikacji",
                "pamiątki fizyczne na zamówienie",
                `ceny w ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} dla płatności w aplikacji`,
            ],
            contactLabel: "Kontakt",
            legalPolicies: "Dokumenty i zasady",
        },
    },
    en: {
        controls: {
            languageLabel: "Language",
            themeLabel: "Theme",
            themeModes: {
                light: "Light",
                dark: "Dark",
            },
        },
        nav: {
            privacy: "Privacy",
            terms: "Terms",
            support: "Support",
            back: "Back",
        },
        hero: {
            eyebrow: "Every mountain memory in one place",
            headline: "28 gór",
            replayLogoAnimationLabel: "Replay the 28 gór logo animation",
            body: [
                "28 gór is a new App Store app that keeps climbs, photos, and trail traces in one beautifully made place. Every peak gets its own hand-drawn stamp.",
                "Rysek is already taking it into the mountains. Inside are small discoveries: peak notes, learning moments, and keepsakes you can order after a real trip.",
            ],
            appStoreBadge: {
                actionLabel: "Tell me when 28 gór is available on the App Store",
            },
            caption: "Tap the App Store badge and we will prepare a launch notification message.",
            featureLabels: ["Hand-drawn stamps", "Custom keepsakes", "Education center", "Mountain info"],
            mascotBadge: "June 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór is a product by ${siteConfig.operatorName}`,
                "hand-drawn stamps in app",
                "custom physical keepsakes",
                `prices in ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} for in-app payments`,
            ],
            contactLabel: "Contact",
            legalPolicies: "Legal & Policies",
        },
    },
    es: {
        controls: {
            languageLabel: "Idioma",
            themeLabel: "Tema",
            themeModes: {
                light: "Claro",
                dark: "Oscuro",
            },
        },
        nav: {
            privacy: "Privacidad",
            terms: "Términos",
            support: "Contacto",
            back: "Volver",
        },
        hero: {
            eyebrow: "Todos los recuerdos de montaña en un solo lugar",
            headline: "28 gór",
            replayLogoAnimationLabel: "Reproducir la animación del logotipo de 28 gór",
            body: [
                "28 gór es una nueva app para App Store que reúne ascensos, fotos y huellas de ruta en un lugar bonito y cuidado. Cada cima tiene su propio sello dibujado a mano.",
                "Rysek ya se la lleva a la montaña. Dentro te esperan pequeños descubrimientos: notas sobre cimas, pistas educativas y recuerdos que puedes pedir después de una excursión real.",
            ],
            appStoreBadge: {
                actionLabel: "Avísame cuando 28 gór esté disponible en App Store",
            },
            caption: "Toca el distintivo de App Store y prepararemos un mensaje para avisarte del lanzamiento.",
            featureLabels: ["Sellos dibujados a mano", "Recuerdos a medida", "Centro educativo", "Información de montaña"],
            mascotBadge: "Junio de 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór es un producto de ${siteConfig.operatorName}`,
                "sellos dibujados a mano en la app",
                "recuerdos físicos a medida",
                `precios en ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} para pagos en la app`,
            ],
            contactLabel: "Contacto",
            legalPolicies: "Legal y políticas",
        },
    },
    de: {
        controls: {
            languageLabel: "Sprache",
            themeLabel: "Design",
            themeModes: {
                light: "Hell",
                dark: "Dunkel",
            },
        },
        nav: {
            privacy: "Datenschutz",
            terms: "Bedingungen",
            support: "Kontakt",
            back: "Zurück",
        },
        hero: {
            eyebrow: "Alle Bergmomente an einem Ort",
            headline: "28 gór",
            replayLogoAnimationLabel: "Animation des 28 gór Logos erneut abspielen",
            body: [
                "28 gór ist eine neue App für den App Store, die Aufstiege, Fotos und Spuren deiner Touren an einem schön gestalteten Ort sammelt. Jeder Gipfel bekommt seinen eigenen handgezeichneten Stempel.",
                "Rysek nimmt sie schon mit in die Berge. In der App warten kleine Entdeckungen: Gipfelnotizen, Lernmomente und Andenken, die du nach einer echten Tour bestellen kannst.",
            ],
            appStoreBadge: {
                actionLabel: "Benachrichtige mich, wenn 28 gór im App Store verfügbar ist",
            },
            caption: "Tippe auf das App-Store-Badge und wir bereiten eine Nachricht zum Start vor.",
            featureLabels: ["Handgezeichnete Stempel", "Andenken nach Maß", "Lernbereich", "Berginformationen"],
            mascotBadge: "Juni 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór ist ein Produkt von ${siteConfig.operatorName}`,
                "handgezeichnete Stempel in der App",
                "physische Andenken nach Maß",
                `Preise in ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} für Zahlungen in der App`,
            ],
            contactLabel: "Kontakt",
            legalPolicies: "Rechtliches",
        },
    },
    fr: {
        controls: {
            languageLabel: "Langue",
            themeLabel: "Thème",
            themeModes: {
                light: "Clair",
                dark: "Sombre",
            },
        },
        nav: {
            privacy: "Confidentialité",
            terms: "Conditions",
            support: "Contact",
            back: "Retour",
        },
        hero: {
            eyebrow: "Tous les souvenirs de montagne au même endroit",
            headline: "28 gór",
            replayLogoAnimationLabel: "Rejouer l'animation du logo 28 gór",
            body: [
                "28 gór est une nouvelle app pour l'App Store qui rassemble ascensions, photos et traces de parcours dans un espace soigné. Chaque sommet reçoit son propre tampon dessiné à la main.",
                "Rysek l'emmène déjà en montagne. À l'intérieur, de petites découvertes t'attendent : notes sur les sommets, pistes éducatives et souvenirs à commander après une vraie sortie.",
            ],
            appStoreBadge: {
                actionLabel: "Prévenez-moi quand 28 gór sera disponible sur l'App Store",
            },
            caption: "Touchez le badge App Store et nous préparerons un message pour vous prévenir du lancement.",
            featureLabels: ["Tampons dessinés à la main", "Souvenirs sur mesure", "Centre éducatif", "Infos montagne"],
            mascotBadge: "Juin 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór est un produit de ${siteConfig.operatorName}`,
                "tampons dessinés à la main dans l'app",
                "souvenirs physiques sur mesure",
                `prix en ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} pour les paiements dans l'app`,
            ],
            contactLabel: "Contact",
            legalPolicies: "Mentions légales",
        },
    },
    nb: {
        controls: {
            languageLabel: "Språk",
            themeLabel: "Tema",
            themeModes: {
                light: "Lyst",
                dark: "Mørkt",
            },
        },
        nav: {
            privacy: "Personvern",
            terms: "Vilkår",
            support: "Kontakt",
            back: "Tilbake",
        },
        hero: {
            eyebrow: "Alle fjellminner på ett sted",
            headline: "28 gór",
            replayLogoAnimationLabel: "Spill av 28 gór-logoanimasjonen på nytt",
            body: [
                "28 gór er en ny app for App Store som samler turer, bilder og spor fra ruta på ett vakkert sted. Hver topp får sitt eget håndtegnede stempel.",
                "Rysek tar den allerede med på fjellet. Inne i appen venter små oppdagelser: toppnotater, læringsspor og minner du kan bestille etter en ekte tur.",
            ],
            appStoreBadge: {
                actionLabel: "Gi meg beskjed når 28 gór er tilgjengelig i App Store",
            },
            caption: "Trykk på App Store-merket, så lager vi en melding som varsler deg ved lansering.",
            featureLabels: ["Håndtegnede stempler", "Skreddersydde minner", "Læringssenter", "Fjellinformasjon"],
            mascotBadge: "Juni 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór er et produkt fra ${siteConfig.operatorName}`,
                "håndtegnede stempler i appen",
                "fysiske minner på bestilling",
                `priser i ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} for betalinger i appen`,
            ],
            contactLabel: "Kontakt",
            legalPolicies: "Juridisk",
        },
    },
    cs: {
        controls: {
            languageLabel: "Jazyk",
            themeLabel: "Motiv",
            themeModes: {
                light: "Světlý",
                dark: "Tmavý",
            },
        },
        nav: {
            privacy: "Soukromí",
            terms: "Podmínky",
            support: "Podpora",
            back: "Zpět",
        },
        hero: {
            eyebrow: "Všechno z hor na jednom místě",
            headline: "28 gór",
            replayLogoAnimationLabel: "Přehrát animaci loga 28 gór",
            body: [
                "28 gór je nová aplikace v App Storu, která ukládá výstupy, fotky a stopy z trasy na jednom krásně vytvořeném místě. Každý vrchol dostane vlastní ručně kreslené razítko.",
                "Rysek ji už bere do hor. Uvnitř čekají malá objevení: informace o vrcholech, vzdělávací zastavení a památky, které si můžeš objednat po skutečné cestě.",
            ],
            appStoreBadge: {
                actionLabel: "Dejte mi vědět, až bude 28 gór v App Storu",
            },
            caption: "Klepni na badge App Store a připravíme zprávu s upozorněním na spuštění.",
            featureLabels: ["Kreslená razítka", "Památky na objednávku", "Vzdělávací centrum", "Informace o horách"],
            mascotBadge: "Červen 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór je produkt ${siteConfig.operatorName}`,
                "ručně kreslená razítka v aplikaci",
                "fyzické památky na objednávku",
                `ceny v ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} pro platby v aplikaci`,
            ],
            contactLabel: "Kontakt",
            legalPolicies: "Právní dokumenty",
        },
    },
    sk: {
        controls: {
            languageLabel: "Jazyk",
            themeLabel: "Motív",
            themeModes: {
                light: "Svetlý",
                dark: "Tmavý",
            },
        },
        nav: {
            privacy: "Súkromie",
            terms: "Podmienky",
            support: "Podpora",
            back: "Späť",
        },
        hero: {
            eyebrow: "Všetko z hôr na jednom mieste",
            headline: "28 gór",
            replayLogoAnimationLabel: "Prehrať animáciu loga 28 gór",
            body: [
                "28 gór je nová aplikácia v App Store, ktorá ukladá výstupy, fotky a stopy z trasy na jednom krásne vytvorenom mieste. Každý vrchol dostane vlastnú ručne kreslenú pečiatku.",
                "Rysek ju už berie do hôr. Vo vnútri čakajú malé objavy: informácie o vrcholoch, vzdelávacie zastavenia a pamiatky, ktoré si môžeš objednať po skutočnej trase.",
            ],
            appStoreBadge: {
                actionLabel: "Dajte mi vedieť, keď bude 28 gór v App Store",
            },
            caption: "Ťukni na badge App Store a pripravíme správu s upozornením na spustenie.",
            featureLabels: ["Kreslené pečiatky", "Pamiatky na objednávku", "Vzdelávacie centrum", "Informácie o horách"],
            mascotBadge: "Jún 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór je produkt ${siteConfig.operatorName}`,
                "ručne kreslené pečiatky v aplikácii",
                "fyzické pamiatky na objednávku",
                `ceny v ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} pre platby v aplikácii`,
            ],
            contactLabel: "Kontakt",
            legalPolicies: "Právne dokumenty",
        },
    },
    uk: {
        controls: {
            languageLabel: "Мова",
            themeLabel: "Тема",
            themeModes: {
                light: "Світла",
                dark: "Темна",
            },
        },
        nav: {
            privacy: "Приватність",
            terms: "Умови",
            support: "Підтримка",
            back: "Назад",
        },
        hero: {
            eyebrow: "Усе з гір в одному місці",
            headline: "28 gór",
            replayLogoAnimationLabel: "Повторити анімацію логотипа 28 gór",
            body: [
                "28 gór - це новий застосунок в App Store, що збирає сходження, фото й сліди маршруту в одному красиво зробленому місці. Кожна вершина має власний намальований вручну штамп.",
                "Rysek уже бере його в гори. Усередині чекають маленькі відкриття: нотатки про вершини, освітні моменти й пам’ятки, які можна замовити після справжньої мандрівки.",
            ],
            appStoreBadge: {
                actionLabel: "Повідомте мене, коли 28 gór буде в App Store",
            },
            caption: "Натисни badge App Store, і ми підготуємо повідомлення про запуск.",
            featureLabels: ["Мальовані штампи", "Пам’ятки на замовлення", "Освітній центр", "Інформація про гори"],
            mascotBadge: "Червень 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór - продукт ${siteConfig.operatorName}`,
                "намальовані вручну штампи в застосунку",
                "фізичні пам’ятки на замовлення",
                `ціни в ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} для платежів у застосунку`,
            ],
            contactLabel: "Контакт",
            legalPolicies: "Правові документи",
        },
    },
} as const

export type LegalTextBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] }

export type LegalSection = {
    heading: string
    body: LegalTextBlock[]
}

export type LegalDocument = {
    slug: "privacy" | "support" | "terms"
    title: string
    effectiveDate: string
    intro: string[]
    sections: LegalSection[]
}

export const legalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
    privacy: {
        slug: "privacy",
        title: "Polityka prywatności",
        effectiveDate: "Obowiązuje od 29 maja 2026 r.",
        intro: [
            `Ta polityka opisuje, jak ${siteConfig.operatorName} jako operator produktu 28 gór przetwarza dane osobowe użytkowników strony ${siteConfig.siteHost} oraz planowanej aplikacji mobilnej.`,
            "28 gór ma wystartować w czerwcu 2026 r. Dokument obejmuje stronę zapowiadającą, kontakt z użytkownikami oraz funkcje aplikacji, takie jak konto, dziennik wejść, zdjęcia, preferencje i synchronizacja danych.",
        ],
        sections: [
            {
                heading: "Administrator i kontakt",
                body: [
                    {
                        type: "paragraph",
                        text: `Administratorem danych osobowych jest ${siteConfig.operatorName}, operator produktu 28 gór. Kontakt w sprawach prywatności, danych osobowych i obsługi użytkownika: ${siteConfig.contactEmail}.`,
                    },
                    {
                        type: "paragraph",
                        text: "Jeżeli przed publiczną premierą usługi zostaną opublikowane dodatkowe dane rejestrowe operatora, dokument zostanie zaktualizowany bez przenoszenia danych podmiotów trzecich.",
                    },
                ],
            },
            {
                heading: "Zakres danych",
                body: [
                    {
                        type: "list",
                        items: [
                            "dane kontaktowe, np. adres e-mail podany przy zapisie na informacje o starcie albo przy kontakcie z supportem,",
                            "dane konta, np. identyfikator użytkownika, adres e-mail, nazwa profilu i ustawienia konta, jeżeli konto zostanie utworzone,",
                            "dane związane z korzystaniem z aplikacji, np. zaplanowane szczyty, status wejść, notatki, zdjęcia, podpisy, preferencje i ustawienia,",
                            "dane techniczne, np. adres IP, typ urządzenia, przeglądarka, system operacyjny, logi błędów, identyfikatory diagnostyczne i przybliżony region,",
                            "informacje o statusie zamówienia lub płatności.",
                        ],
                    },
                ],
            },
            {
                heading: "Cele i podstawy przetwarzania",
                body: [
                    {
                        type: "list",
                        items: [
                            "świadczenie usługi, obsługa konta, synchronizacja danych i udostępnianie funkcji aplikacji - art. 6 ust. 1 lit. b RODO,",
                            "obsługa zapytań, zgłoszeń i wiadomości o starcie produktu - art. 6 ust. 1 lit. a albo lit. f RODO, zależnie od charakteru kontaktu,",
                            "zapewnienie bezpieczeństwa, wykrywanie nadużyć, diagnostyka błędów i utrzymanie działania strony oraz aplikacji - art. 6 ust. 1 lit. f RODO,",
                            "wypełnianie obowiązków prawnych, księgowych lub podatkowych, jeżeli będą miały zastosowanie - art. 6 ust. 1 lit. c RODO,",
                            "analityka produktu i poprawa jakości działania, o ile jest prowadzona na podstawie prawnie uzasadnionego interesu albo wymaganej zgody.",
                        ],
                    },
                ],
            },
            {
                heading: "Uprawnienia urządzenia",
                body: [
                    {
                        type: "paragraph",
                        text: "Aplikacja może poprosić o dostęp do funkcji urządzenia tylko wtedy, gdy dana funkcja jest potrzebna. Uprawnienia można zmienić w ustawieniach systemu.",
                    },
                    {
                        type: "list",
                        items: [
                            "lokalizacja może pomagać w pokazywaniu pobliskich szczytów, szacowaniu odległości i kontekstu trasy,",
                            "aparat lub biblioteka zdjęć są używane wtedy, gdy dodajesz zdjęcie do dziennika,",
                            "powiadomienia mogą służyć do przypomnień, które samodzielnie włączysz.",
                        ],
                    },
                ],
            },
            {
                heading: "Cookies i podobne technologie",
                body: [
                    {
                        type: "paragraph",
                        text: "Strona może używać niezbędnych plików cookies, localStorage lub podobnych technologii do zapamiętania języka, motywu, ustawień interfejsu i podstawowego działania strony. Jeżeli zostanie wdrożona analityka albo marketing, będzie używana zgodnie z obowiązującymi przepisami i wymaganiami dotyczącymi zgody.",
                    },
                    {
                        type: "paragraph",
                        text: "Ustawienia cookies można zmienić w przeglądarce. Ograniczenie cookies może wpłynąć na część funkcji strony, np. zapamiętywanie preferencji.",
                    },
                ],
            },
            {
                heading: "Zamówienia fizycznych pamiątek",
                body: [
                    {
                        type: "paragraph",
                        text: "Jeżeli w aplikacji zostaną uruchomione fizyczne pamiątki, do obsługi zamówienia możemy przetwarzać imię i nazwisko, adres e-mail, adres dostawy, szczegóły zamówienia oraz status płatności.",
                    },
                    {
                        type: "paragraph",
                        text: `Płatności w aplikacji mogą być obsługiwane przez ${siteConfig.paymentProcessorName}. ${siteConfig.operatorName} nie przechowuje pełnych numerów kart płatniczych.`,
                    },
                ],
            },
            {
                heading: "Odbiorcy danych",
                body: [
                    {
                        type: "list",
                        items: [
                            "dostawcy hostingu, infrastruktury, bazy danych, autoryzacji i synchronizacji kont,",
                            "narzędzia do obsługi poczty, supportu, diagnostyki błędów, bezpieczeństwa i analityki,",
                            "operatorzy płatności, sklepy z aplikacjami lub dostawcy logistyczni, jeżeli dana funkcja albo zamówienie będzie tego wymagać,",
                            "doradcy prawni, księgowi, organy publiczne lub sądy, gdy wymagają tego przepisy prawa.",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Dane nie są sprzedawane. Dane są przekazywane tylko w zakresie potrzebnym do obsługi usługi, bezpieczeństwa, obowiązków prawnych albo realizacji żądania użytkownika.",
                    },
                ],
            },
            {
                heading: "Przekazywanie danych poza EOG",
                body: [
                    {
                        type: "paragraph",
                        text: "Niektórzy dostawcy technologiczni mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takim przypadku stosowane są mechanizmy przewidziane w RODO, w szczególności standardowe klauzule umowne albo inne prawnie dopuszczalne zabezpieczenia.",
                    },
                ],
            },
            {
                heading: "Okres przechowywania",
                body: [
                    {
                        type: "list",
                        items: [
                            "dane kontaktowe związane z informacją o starcie są przechowywane do czasu wycofania zgody, sprzeciwu albo zakończenia celu komunikacji,",
                            "dane konta i dane aplikacji są przechowywane przez czas korzystania z usługi, a po usunięciu konta przez okres potrzebny do obsługi roszczeń, bezpieczeństwa lub obowiązków prawnych,",
                            "logi techniczne i diagnostyczne są przechowywane przez okres potrzebny do utrzymania bezpieczeństwa i stabilności usługi,",
                            "dane rozliczeniowe są przechowywane przez okres wymagany przepisami prawa, jeżeli płatności zostaną uruchomione.",
                        ],
                    },
                ],
            },
            {
                heading: "Prawa użytkownika",
                body: [
                    {
                        type: "list",
                        items: [
                            "prawo dostępu do danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania,",
                            "prawo do przenoszenia danych, jeżeli ma zastosowanie,",
                            "prawo sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,",
                            "prawo cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność przetwarzania przed cofnięciem,",
                            "prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: `Żądania dotyczące danych można wysyłać na ${siteConfig.contactEmail}. W niektórych przypadkach może być konieczne potwierdzenie tożsamości osoby składającej żądanie.`,
                    },
                ],
            },
            {
                heading: "Automatyzacja i funkcje AI",
                body: [
                    {
                        type: "paragraph",
                        text: "28 gór nie podejmuje decyzji wywołujących wobec użytkownika skutki prawne wyłącznie w sposób zautomatyzowany. Jeżeli zostaną uruchomione funkcje AI, będą przetwarzać dane przekazane przez użytkownika tylko w zakresie potrzebnym do działania konkretnej funkcji, np. podsumowania notatki albo uporządkowania opisu trasy.",
                    },
                ],
            },
            {
                heading: "Dzieci i bezpieczeństwo",
                body: [
                    {
                        type: "paragraph",
                        text: "Usługa nie jest kierowana do dzieci poniżej 13 lat. Osoby niepełnoletnie powinny korzystać z aplikacji za zgodą i pod opieką opiekuna. Administrator stosuje organizacyjne i techniczne środki ochrony danych, jednak żadna metoda transmisji ani przechowywania nie daje pełnej gwarancji bezpieczeństwa.",
                    },
                ],
            },
            {
                heading: "Zmiany polityki",
                body: [
                    {
                        type: "paragraph",
                        text: `Polityka może zostać zaktualizowana wraz z rozwojem produktu, zmianą dostawców albo wymagań prawnych. Aktualna wersja będzie dostępna na stronie ${siteConfig.siteHost}.`,
                    },
                ],
            },
        ],
    },
    terms: {
        slug: "terms",
        title: "Regulamin",
        effectiveDate: "Obowiązuje od 29 maja 2026 r.",
        intro: [
            `Regulamin określa zasady korzystania ze strony ${siteConfig.siteHost} oraz aplikacji 28 gór. Produkt jest rozwijany przez ${siteConfig.operatorName}, a premiera aplikacji jest planowana na czerwiec 2026 r.`,
            "28 gór pomaga planować i dokumentować wejścia na 28 szczytów. Nie zastępuje map, komunikatów GOPR/TOPR, prognoz pogody, oznaczeń w terenie ani rozsądnej oceny warunków.",
        ],
        sections: [
            {
                heading: "Usługodawca i kontakt",
                body: [
                    {
                        type: "paragraph",
                        text: `Usługodawcą i operatorem produktu 28 gór jest ${siteConfig.operatorName}. Kontakt w sprawach regulaminu, działania usługi i obsługi użytkownika: ${siteConfig.contactEmail}.`,
                    },
                    {
                        type: "paragraph",
                        text: "Jeżeli przed publiczną premierą zostaną opublikowane dodatkowe dane rejestrowe usługodawcy, regulamin zostanie zaktualizowany.",
                    },
                ],
            },
            {
                heading: "Definicje",
                body: [
                    {
                        type: "list",
                        items: [
                            `Usługa - strona ${siteConfig.siteHost}, aplikacja 28 gór oraz funkcje udostępniane użytkownikom.`,
                            "Użytkownik - osoba korzystająca ze strony, aplikacji, formularza kontaktowego lub funkcji konta.",
                            "Konto - indywidualny dostęp do funkcji aplikacji, jeżeli konto zostanie utworzone.",
                            "Treści użytkownika - zdjęcia, notatki, opisy, statusy wejść, preferencje i inne dane dodane przez użytkownika.",
                        ],
                    },
                ],
            },
            {
                heading: "Zakres usługi",
                body: [
                    {
                        type: "paragraph",
                        text: "Na etapie zapowiedzi strona może umożliwiać zapoznanie się z produktem oraz kontakt w sprawie premiery. Po uruchomieniu aplikacja może obejmować planowanie 28 szczytów, historię wejść, zapisywanie zdjęć, ręcznie rysowane pieczątki dedykowane szczytom, centrum edukacyjne, synchronizację konta, preferencje i inne funkcje związane z dokumentowaniem tras.",
                    },
                    {
                        type: "paragraph",
                        text: "W aplikacji 28 gór będzie można kupić fizyczne pamiątki wysyłane do klientów. Warunki zakupu będą prezentowane przed płatnością.",
                    },
                ],
            },
            {
                heading: "Wymagania techniczne",
                body: [
                    {
                        type: "paragraph",
                        text: "Do korzystania ze strony potrzebne jest urządzenie z aktualną przeglądarką internetową i dostępem do internetu. Do korzystania z aplikacji potrzebne będzie kompatybilne urządzenie mobilne, system operacyjny wspierany przez aplikację oraz, dla części funkcji, aktywne połączenie z internetem.",
                    },
                ],
            },
            {
                heading: "Konto użytkownika",
                body: [
                    {
                        type: "paragraph",
                        text: "Użytkownik odpowiada za prawdziwość danych podanych przy zakładaniu konta oraz za ochronę danych logowania. W przypadku podejrzenia nieuprawnionego dostępu do konta należy niezwłocznie skontaktować się z supportem.",
                    },
                    {
                        type: "paragraph",
                        text: `Konto można usunąć zgodnie z funkcjami dostępnymi w aplikacji albo przez kontakt z ${siteConfig.contactEmail}. Usunięcie konta może nie obejmować danych, które muszą być przechowywane na podstawie przepisów prawa albo do obrony roszczeń.`,
                    },
                ],
            },
            {
                heading: "Zasady korzystania",
                body: [
                    {
                        type: "list",
                        items: [
                            "nie wolno naruszać prawa, praw innych osób ani dobrych obyczajów,",
                            "nie wolno dodawać treści bezprawnych, obraźliwych, naruszających cudze prawa autorskie lub prywatność,",
                            "nie wolno obchodzić zabezpieczeń, zakłócać działania infrastruktury ani korzystać z usługi w sposób automatyczny bez zgody operatora,",
                            "nie wolno używać usługi w sposób, który może stwarzać zagrożenie dla użytkownika albo innych osób.",
                        ],
                    },
                ],
            },
            {
                heading: "Bezpieczeństwo w górach",
                body: [
                    {
                        type: "paragraph",
                        text: "Użytkownik sam odpowiada za decyzje podejmowane w terenie, dobór trasy, ocenę pogody, przygotowanie sprzętu i reagowanie na lokalne warunki. Dane w aplikacji mogą być niedokładne, niepełne albo nieaktualne, dlatego nie powinny być jedynym źródłem informacji na szlaku.",
                    },
                    {
                        type: "paragraph",
                        text: "Przed wyjściem w góry należy sprawdzić aktualne komunikaty, prognozy, zamknięcia szlaków, ostrzeżenia lawinowe i zalecenia służb. W sytuacji zagrożenia należy kontaktować się z właściwymi służbami ratunkowymi.",
                    },
                ],
            },
            {
                heading: "Treści użytkownika",
                body: [
                    {
                        type: "paragraph",
                        text: "Użytkownik zachowuje prawa do treści dodanych w aplikacji. Dodając treści, udziela operatorowi niewyłącznej licencji technicznej potrzebnej do ich przechowywania, synchronizacji, wyświetlania w aplikacji, tworzenia kopii bezpieczeństwa i obsługi zgłoszeń.",
                    },
                    {
                        type: "paragraph",
                        text: "Operator może usunąć albo ograniczyć dostęp do treści, które naruszają regulamin, przepisy prawa, bezpieczeństwo usługi albo prawa osób trzecich.",
                    },
                ],
            },
            {
                heading: "Fizyczne pamiątki i płatności",
                body: [
                    {
                        type: "paragraph",
                        text: `${siteConfig.paymentProcessorName} może obsługiwać płatności dostępne w aplikacji. Warunki każdej płatności będą pokazane przed jej potwierdzeniem.`,
                    },
                    {
                        type: "paragraph",
                        text: `Ceny fizycznych pamiątek będą widoczne w ${siteConfig.currencyCode} przed płatnością. Koszty wysyłki, podatki i dodatkowe opłaty, jeżeli wystąpią, będą pokazane przed potwierdzeniem płatności.`,
                    },
                    {
                        type: "paragraph",
                        text: `Dane kart płatniczych są obsługiwane przez ${siteConfig.paymentProcessorName} i nie są przechowywane bezpośrednio przez ${siteConfig.operatorName}.`,
                    },
                ],
            },
            {
                heading: "Wysyłka fizycznych pamiątek",
                body: [
                    {
                        type: "paragraph",
                        text: "Fizyczne pamiątki są wysyłane z Polski. Dostępne kraje dostawy, koszty wysyłki oraz szacowany czas dostawy będą pokazane przed płatnością.",
                    },
                    {
                        type: "paragraph",
                        text: "Niektóre pamiątki mogą być limitowane albo dostępne w przedsprzedaży. Jeżeli pamiątka wymaga czasu produkcji przed wysyłką, szacowany czas realizacji będzie pokazany przed zakupem.",
                    },
                ],
            },
            {
                heading: "Zwroty",
                body: [
                    {
                        type: "paragraph",
                        text: `Zwrot fizycznej pamiątki można zgłosić przez kontakt na ${siteConfig.contactEmail}. Pamiątka powinna być nieużywana, nieuszkodzona i zwrócona w pierwotnym stanie, chyba że bezwzględnie obowiązujące przepisy prawa przewidują inaczej.`,
                    },
                    {
                        type: "paragraph",
                        text: "Instrukcja zwrotu zostanie przekazana e-mailowo po weryfikacji zgłoszenia.",
                    },
                ],
            },
            {
                heading: "Refundacje i reklamacje pamiątek",
                body: [
                    {
                        type: "paragraph",
                        text: `Zgłoszenia refundacji lub reklamacji można wysyłać na ${siteConfig.contactEmail}. Jeżeli pamiątka jest wadliwa, uszkodzona, niedostarczona albo istotnie różni się od opisu, zgłoszenie powinno zawierać numer zamówienia oraz opis problemu.`,
                    },
                    {
                        type: "paragraph",
                        text: "Zatwierdzone zwroty środków są przetwarzane na pierwotną metodę płatności. Czas księgowania może zależeć od banku albo dostawcy płatności.",
                    },
                ],
            },
            {
                heading: "Anulowanie zamówień",
                body: [
                    {
                        type: "paragraph",
                        text: "Zamówienie fizycznej pamiątki można anulować przed rozpoczęciem realizacji. Jeżeli zamówienie zostało już wysłane, może być konieczne skorzystanie z procedury zwrotu.",
                    },
                    {
                        type: "paragraph",
                        text: "Dla pamiątek w przedsprzedaży warunki anulowania będą pokazane przed płatnością.",
                    },
                ],
            },
            {
                heading: "QR i NFC w pamiątkach",
                body: [
                    {
                        type: "paragraph",
                        text: "Niektóre fizyczne pamiątki mogą zawierać QR lub NFC, które otwierają informacje o produkcie albo pozwalają powiązać pamiątkę z istniejącym profilem 28 gór. QR ani NFC nie są samodzielnym mechanizmem płatności.",
                    },
                ],
            },
            {
                heading: "Reklamacje i zgłoszenia",
                body: [
                    {
                        type: "paragraph",
                        text: `Zgłoszenia dotyczące działania usługi można wysyłać na ${siteConfig.contactEmail}. Zgłoszenie powinno opisywać problem, urządzenie, wersję aplikacji lub przeglądarki oraz oczekiwany sposób rozwiązania, jeżeli jest istotny.`,
                    },
                    {
                        type: "paragraph",
                        text: "Zwykle odpowiadamy w ciągu 2 dni roboczych, z priorytetem dla spraw dotyczących konta, płatności, dostępu do danych i bezpieczeństwa.",
                    },
                ],
            },
            {
                heading: "Dostępność i zmiany",
                body: [
                    {
                        type: "paragraph",
                        text: "Usługa może być rozwijana, czasowo niedostępna, zmieniana albo wycofywana w części funkcji, szczególnie przed i po premierze. Operator dokłada starań, aby usługa działała stabilnie, ale nie gwarantuje nieprzerwanej dostępności wszystkich funkcji.",
                    },
                    {
                        type: "paragraph",
                        text: `Regulamin może być aktualizowany w razie zmiany produktu, modelu płatności, przepisów prawa lub danych operatora. Aktualna wersja regulaminu będzie dostępna na stronie ${siteConfig.siteHost}.`,
                    },
                ],
            },
            {
                heading: "Własność intelektualna",
                body: [
                    {
                        type: "paragraph",
                        text: "Nazwa 28 gór, wygląd strony i aplikacji, teksty, układ interfejsu, grafiki oraz elementy produktu stanowią własność operatora albo są używane na podstawie odpowiednich uprawnień. Korzystanie z usługi nie przenosi na użytkownika praw własności intelektualnej.",
                    },
                ],
            },
            {
                heading: "Prywatność",
                body: [
                    {
                        type: "paragraph",
                        text: `Zasady przetwarzania danych osobowych opisuje Polityka prywatności dostępna na stronie ${siteConfig.siteHost}/privacy.`,
                    },
                ],
            },
            {
                heading: "Postanowienia końcowe",
                body: [
                    {
                        type: "paragraph",
                        text: "W sprawach nieuregulowanych regulaminem stosuje się właściwe przepisy prawa polskiego, z zastrzeżeniem bezwzględnie obowiązujących praw konsumentów. Żadne postanowienie regulaminu nie ma na celu ograniczenia praw konsumenta wynikających z przepisów prawa.",
                    },
                ],
            },
        ],
    },
    support: {
        slug: "support",
        title: "Kontakt",
        effectiveDate: "Aktualizacja: 29 maja 2026 r.",
        intro: [
            "Potrzebujesz pomocy z kontem, dostępem do danych, zamówieniem fizycznej pamiątki albo problemem technicznym? Napisz krótko, co się stało, na jakim urządzeniu i czego oczekiwałeś.",
        ],
        sections: [
            {
                heading: "Kontakt mailowy",
                body: [
                    {
                        type: "paragraph",
                        text: `Wyślij wiadomość na ${siteConfig.contactEmail}. Jeżeli to pomaga wyjaśnić problem, dołącz zrzut ekranu, wersję aplikacji, model urządzenia, numer zamówienia albo adres strony, na której problem występuje. Zwykle odpowiadamy w ciągu 2 dni roboczych.`,
                    },
                ],
            },
        ],
    },
}

export const englishLegalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
    privacy: {
        slug: "privacy",
        title: "Privacy Policy",
        effectiveDate: "Effective from May 29, 2026",
        intro: [
            `This policy explains how ${siteConfig.operatorName}, as the operator of 28 gór, processes personal data of users of ${siteConfig.siteHost} and the planned mobile app.`,
            "28 gór is planned to launch in June 2026. This document covers the launch website, user contact, and planned app features such as accounts, summit logs, photos, preferences, and data synchronization.",
        ],
        sections: [
            {
                heading: "Controller and contact",
                body: [
                    {
                        type: "paragraph",
                        text: `The data controller is ${siteConfig.operatorName}, operator of 28 gór. For privacy, personal data, and user support matters, contact us at ${siteConfig.contactEmail}.`,
                    },
                    {
                        type: "paragraph",
                        text: "If additional registered operator details are published before the public launch, this document will be updated without carrying over third-party company data.",
                    },
                ],
            },
            {
                heading: "Data we process",
                body: [
                    {
                        type: "list",
                        items: [
                            "contact data, such as an email address provided for launch updates or support contact,",
                            "account data, such as a user identifier, email address, profile name, and account settings if an account is created,",
                            "app usage data, such as planned peaks, summit completion status, notes, photos, captions, preferences, and settings,",
                            "technical data, such as IP address, device type, browser, operating system, error logs, diagnostic identifiers, and approximate region,",
                            "order or payment status information.",
                        ],
                    },
                ],
            },
            {
                heading: "Purposes and legal bases",
                body: [
                    {
                        type: "list",
                        items: [
                            "providing the service, account handling, data synchronization, and app features - Article 6(1)(b) GDPR,",
                            "handling inquiries, support requests, and launch communications - Article 6(1)(a) or 6(1)(f) GDPR, depending on the nature of the contact,",
                            "security, abuse prevention, diagnostics, and maintaining the website and app - Article 6(1)(f) GDPR,",
                            "legal, accounting, or tax obligations where applicable - Article 6(1)(c) GDPR,",
                            "product analytics and quality improvements where based on legitimate interest or required consent.",
                        ],
                    },
                ],
            },
            {
                heading: "Device permissions",
                body: [
                    {
                        type: "paragraph",
                        text: "The app may request access to device features only when a feature needs it. Permissions can be changed in system settings.",
                    },
                    {
                        type: "list",
                        items: [
                            "location may help show nearby peaks, estimate distance, and provide route context,",
                            "camera or photo library access is used when you add a photo to your log,",
                            "notifications may be used for reminders that you choose to enable.",
                        ],
                    },
                ],
            },
            {
                heading: "Cookies and similar technologies",
                body: [
                    {
                        type: "paragraph",
                        text: "The website may use necessary cookies, localStorage, or similar technologies to remember language, theme, interface settings, and basic website behavior. If analytics or marketing tools are added, they will be used in line with applicable consent requirements.",
                    },
                    {
                        type: "paragraph",
                        text: "Cookie settings can be changed in your browser. Restricting cookies may affect some website features, such as remembering preferences.",
                    },
                ],
            },
            {
                heading: "Physical keepsake orders",
                body: [
                    {
                        type: "paragraph",
                        text: "If physical keepsakes are launched in the app, we may process name, email address, delivery address, order details, and payment status to handle the order.",
                    },
                    {
                        type: "paragraph",
                        text: `Payments in the app may be handled by ${siteConfig.paymentProcessorName}. ${siteConfig.operatorName} does not store full payment card numbers.`,
                    },
                ],
            },
            {
                heading: "Recipients of data",
                body: [
                    {
                        type: "list",
                        items: [
                            "providers of hosting, infrastructure, database, authorization, and account synchronization,",
                            "tools for email, support, error diagnostics, security, and analytics,",
                            "payment processors, app stores, or logistics providers where a feature or order requires it,",
                            "legal advisors, accountants, public authorities, or courts where required by law.",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "We do not sell personal data. Data is shared only as needed to operate the service, provide security, meet legal obligations, or handle a user request.",
                    },
                ],
            },
            {
                heading: "Transfers outside the EEA",
                body: [
                    {
                        type: "paragraph",
                        text: "Some technology providers may process data outside the European Economic Area. In those cases, safeguards required by GDPR are used, in particular standard contractual clauses or other lawful mechanisms.",
                    },
                ],
            },
            {
                heading: "Retention",
                body: [
                    {
                        type: "list",
                        items: [
                            "launch contact data is kept until consent is withdrawn, an objection is made, or the communication purpose ends,",
                            "account and app data is kept while you use the service and, after account deletion, for the period needed for claims, security, or legal obligations,",
                            "technical and diagnostic logs are kept for the period needed to maintain security and service stability,",
                            "billing data is kept for the period required by law if payments are launched.",
                        ],
                    },
                ],
            },
            {
                heading: "Your rights",
                body: [
                    {
                        type: "list",
                        items: [
                            "access, rectification, deletion, or restriction of processing,",
                            "data portability where applicable,",
                            "objection to processing based on legitimate interest,",
                            "withdrawal of consent at any time without affecting processing before withdrawal,",
                            "the right to lodge a complaint with the President of the Polish Personal Data Protection Office.",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: `Data requests can be sent to ${siteConfig.contactEmail}. In some cases, we may need to confirm the identity of the person making the request.`,
                    },
                ],
            },
            {
                heading: "Automation and AI features",
                body: [
                    {
                        type: "paragraph",
                        text: "28 gór does not make decisions that produce legal effects for users solely by automated means. If AI features are launched, they will process user-provided data only as needed for a specific feature, for example to summarize a note or organize a route description.",
                    },
                ],
            },
            {
                heading: "Children and security",
                body: [
                    {
                        type: "paragraph",
                        text: "The service is not directed to children under 13. Minors should use the app with a guardian's consent and supervision. The controller uses organizational and technical safeguards, but no transmission or storage method can be guaranteed fully secure.",
                    },
                ],
            },
            {
                heading: "Policy changes",
                body: [
                    {
                        type: "paragraph",
                        text: `This policy may be updated as the product, providers, or legal requirements change. The current version will be available at ${siteConfig.siteHost}.`,
                    },
                ],
            },
        ],
    },
    terms: {
        slug: "terms",
        title: "Terms",
        effectiveDate: "Effective from May 29, 2026",
        intro: [
            `These terms define the rules for using ${siteConfig.siteHost} and the 28 gór app. The product is developed by ${siteConfig.operatorName}, and the app launch is planned for June 2026.`,
            "28 gór helps users plan and document trips across 28 peaks. It does not replace maps, GOPR/TOPR notices, weather forecasts, trail signs, or your own assessment of conditions.",
        ],
        sections: [
            {
                heading: "Service provider and contact",
                body: [
                    {
                        type: "paragraph",
                        text: `${siteConfig.operatorName} is the service provider and operator of 28 gór. For questions about these terms, the service, or user support, contact ${siteConfig.contactEmail}.`,
                    },
                    {
                        type: "paragraph",
                        text: "If additional registered provider details are published before public launch, these terms will be updated.",
                    },
                ],
            },
            {
                heading: "Definitions",
                body: [
                    {
                        type: "list",
                        items: [
                            `Service - ${siteConfig.siteHost}, the 28 gór app, and features made available to users.`,
                            "User - a person using the website, app, contact form, or account features.",
                            "Account - individual access to app features if an account is created.",
                            "User Content - photos, notes, descriptions, summit statuses, preferences, and other data added by the user.",
                        ],
                    },
                ],
            },
            {
                heading: "Scope of the service",
                body: [
                    {
                        type: "paragraph",
                        text: "At the launch-preview stage, the website may provide product information and contact options. After launch, the app may include planning for 28 peaks, trip history, photo storage, hand-drawn stamps dedicated to each peak, an education center, account synchronization, preferences, and other features related to documenting routes.",
                    },
                    {
                        type: "paragraph",
                        text: "The app may allow users to buy physical keepsakes shipped to customers. Purchase terms will be shown before payment.",
                    },
                ],
            },
            {
                heading: "Technical requirements",
                body: [
                    {
                        type: "paragraph",
                        text: "Using the website requires a device with a current web browser and internet access. Using the app will require a compatible mobile device, a supported operating system, and, for some features, an active internet connection.",
                    },
                ],
            },
            {
                heading: "User account",
                body: [
                    {
                        type: "paragraph",
                        text: "The user is responsible for the accuracy of account data and for protecting login details. If you suspect unauthorized access to your account, contact support promptly.",
                    },
                    {
                        type: "paragraph",
                        text: `An account can be deleted using app features or by contacting ${siteConfig.contactEmail}. Account deletion may not cover data that must be retained by law or for claim defense.`,
                    },
                ],
            },
            {
                heading: "Rules of use",
                body: [
                    {
                        type: "list",
                        items: [
                            "do not violate law, third-party rights, or generally accepted standards,",
                            "do not add unlawful, offensive, copyright-infringing, or privacy-infringing content,",
                            "do not bypass security, disrupt infrastructure, or use automation without the operator's consent,",
                            "do not use the service in a way that could endanger you or others.",
                        ],
                    },
                ],
            },
            {
                heading: "Mountain safety",
                body: [
                    {
                        type: "paragraph",
                        text: "The user is responsible for decisions made outdoors, route choice, weather assessment, equipment, and reacting to local conditions. App data may be inaccurate, incomplete, or outdated, and should not be the only source of trail information.",
                    },
                    {
                        type: "paragraph",
                        text: "Before going into the mountains, check current notices, forecasts, trail closures, avalanche warnings, and rescue-service recommendations. In an emergency, contact the appropriate rescue services.",
                    },
                ],
            },
            {
                heading: "User content",
                body: [
                    {
                        type: "paragraph",
                        text: "Users keep rights to the content they add in the app. By adding content, the user grants the operator a non-exclusive technical license needed to store, synchronize, display, back up, and support that content.",
                    },
                    {
                        type: "paragraph",
                        text: "The operator may remove or restrict access to content that violates these terms, law, service security, or third-party rights.",
                    },
                ],
            },
            {
                heading: "Physical keepsakes and payments",
                body: [
                    {
                        type: "paragraph",
                        text: `${siteConfig.paymentProcessorName} may handle payments made available in the app. The terms of each payment will be shown before confirmation.`,
                    },
                    {
                        type: "paragraph",
                        text: `Prices for physical keepsakes will be shown in ${siteConfig.currencyCode} before payment. Shipping costs, taxes, and additional charges, if any, will be shown before payment confirmation.`,
                    },
                    {
                        type: "paragraph",
                        text: `Payment card data is handled by ${siteConfig.paymentProcessorName} and is not stored directly by ${siteConfig.operatorName}.`,
                    },
                ],
            },
            {
                heading: "Shipping",
                body: [
                    {
                        type: "paragraph",
                        text: "Physical keepsakes are shipped from Poland. Available delivery countries, shipping costs, and estimated delivery times will be shown before payment.",
                    },
                    {
                        type: "paragraph",
                        text: "Some keepsakes may be limited or available for preorder. If production time is required before shipping, the estimated fulfillment time will be shown before purchase.",
                    },
                ],
            },
            {
                heading: "Returns",
                body: [
                    {
                        type: "paragraph",
                        text: `Returns of physical keepsakes can be requested by contacting ${siteConfig.contactEmail}. The keepsake should be unused, undamaged, and returned in its original condition unless mandatory law provides otherwise.`,
                    },
                    {
                        type: "paragraph",
                        text: "Return instructions will be sent by email after the request is reviewed.",
                    },
                ],
            },
            {
                heading: "Refunds and complaints",
                body: [
                    {
                        type: "paragraph",
                        text: `Refund or complaint requests can be sent to ${siteConfig.contactEmail}. If a keepsake is defective, damaged, not delivered, or materially different from the description, the request should include the order number and a description of the issue.`,
                    },
                    {
                        type: "paragraph",
                        text: "Approved refunds are processed to the original payment method. Posting time may depend on the bank or payment provider.",
                    },
                ],
            },
            {
                heading: "Order cancellation",
                body: [
                    {
                        type: "paragraph",
                        text: "A physical keepsake order may be cancelled before fulfillment starts. If the order has already shipped, the return process may need to be used.",
                    },
                    {
                        type: "paragraph",
                        text: "For preorder keepsakes, cancellation terms will be shown before payment.",
                    },
                ],
            },
            {
                heading: "QR and NFC in keepsakes",
                body: [
                    {
                        type: "paragraph",
                        text: "Some physical keepsakes may include QR or NFC that opens product information or lets the user associate the keepsake with an existing 28 gór profile. QR and NFC are not a standalone payment mechanism.",
                    },
                ],
            },
            {
                heading: "Reports and support requests",
                body: [
                    {
                        type: "paragraph",
                        text: `Service-related reports can be sent to ${siteConfig.contactEmail}. A report should describe the issue, device, app or browser version, and expected resolution where relevant.`,
                    },
                    {
                        type: "paragraph",
                        text: "We usually reply within 2 business days, prioritizing matters related to accounts, payments, data access, and security.",
                    },
                ],
            },
            {
                heading: "Availability and changes",
                body: [
                    {
                        type: "paragraph",
                        text: "The service may be developed, temporarily unavailable, changed, or partly discontinued, especially before and after launch. The operator aims to keep the service stable but does not guarantee uninterrupted availability of every feature.",
                    },
                    {
                        type: "paragraph",
                        text: `These terms may be updated if the product, payment model, legal requirements, or operator details change. The current version will be available at ${siteConfig.siteHost}.`,
                    },
                ],
            },
            {
                heading: "Intellectual property",
                body: [
                    {
                        type: "paragraph",
                        text: "The 28 gór name, the website and app appearance, text, interface layout, graphics, and product elements are owned by the operator or used under appropriate rights. Using the service does not transfer intellectual property rights to the user.",
                    },
                ],
            },
            {
                heading: "Privacy",
                body: [
                    {
                        type: "paragraph",
                        text: `Personal data processing rules are described in the Privacy Policy available at ${siteConfig.siteHost}/privacy.`,
                    },
                ],
            },
            {
                heading: "Final provisions",
                body: [
                    {
                        type: "paragraph",
                        text: "Matters not covered by these terms are governed by applicable Polish law, subject to mandatory consumer rights. Nothing in these terms is intended to limit consumer rights granted by law.",
                    },
                ],
            },
        ],
    },
    support: {
        slug: "support",
        title: "Support",
        effectiveDate: "Updated: May 29, 2026",
        intro: [
            "Need help with your account, data access, a physical keepsake order, or a technical issue? Briefly describe what happened, what device you used, and what you expected.",
        ],
        sections: [
            {
                heading: "Email support",
                body: [
                    {
                        type: "paragraph",
                        text: `Send a message to ${siteConfig.contactEmail}. If useful, include a screenshot, app version, device model, order number, or the page URL where the issue occurs. We usually reply within 2 business days.`,
                    },
                ],
            },
        ],
    },
}

export const legalDocumentLocales = ["pl", "en"] as const
export type LegalDocumentLocale = (typeof legalDocumentLocales)[number]

export function legalDocumentLocaleForSiteLocale(locale: SiteLocale): LegalDocumentLocale {
    return locale === "pl" ? "pl" : "en"
}

export type LegalLanguageNotice = {
    title: string
    body: string
    polishLabel: string
    englishLabel: string
}

export const legalLanguageNoticeByLocale: Record<SiteLocale, LegalLanguageNotice> = {
    pl: {
        title: "Dokumenty prawne",
        body: "Dokumenty prawne są dostępne po polsku i angielsku. W razie rozbieżności wiążąca jest wersja polska.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    en: {
        title: "Legal documents",
        body: "Legal documents are available in Polish and English. In case of differences, the Polish version is binding.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    es: {
        title: "Documentos legales",
        body: "Los documentos legales están disponibles en polaco e inglés. En caso de discrepancias, prevalece la versión polaca.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    de: {
        title: "Rechtliche Dokumente",
        body: "Rechtliche Dokumente sind auf Polnisch und Englisch verfügbar. Bei Abweichungen ist die polnische Version verbindlich.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    fr: {
        title: "Documents juridiques",
        body: "Les documents juridiques sont disponibles en polonais et en anglais. En cas de divergence, la version polonaise fait foi.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    nb: {
        title: "Juridiske dokumenter",
        body: "Juridiske dokumenter er tilgjengelige på polsk og engelsk. Ved avvik er den polske versjonen bindende.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    cs: {
        title: "Právní dokumenty",
        body: "Právní dokumenty jsou dostupné v polštině a angličtině. V případě rozdílů je závazná polská verze.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    sk: {
        title: "Právne dokumenty",
        body: "Právne dokumenty sú dostupné v poľštine a angličtine. V prípade rozdielov je záväzná poľská verzia.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    uk: {
        title: "Правові документи",
        body: "Правові документи доступні польською та англійською. У разі розбіжностей обов’язковою є польська версія.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
}

export const legalDocumentsByLocale = {
    pl: legalDocuments,
    en: englishLegalDocuments,
} satisfies Record<LegalDocumentLocale, Record<LegalDocument["slug"], LegalDocument>>
