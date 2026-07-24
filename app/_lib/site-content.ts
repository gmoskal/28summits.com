import { createLegalDocuments } from "./legal-documents"

const siteIconVersion = "20260617-2"
export const siteSocialImageVersion = "20260709-01"

const operatorTradingName = "Async.Studio"

export const siteConfig = {
    name: "28 gór",
    productName: "28 gór",
    operatorTradingName,
    registeredOperatorName: "Async.Studio Grzegorz Moskal",
    operatorTaxId: "7492012796",
    operatorAddress: "Kolejowa 43, 57-220 Ziębice, Polska",
    physicalReturnsAddress: "",
    contactEmail: "rysek@28gor.app",
    contactPhone: "+48 537 765 122",
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

export function absoluteSiteUrl(pathname: string = "/") {
    return new URL(pathname, siteConfig.siteUrl).toString()
}

export const siteHomeUrl = absoluteSiteUrl("/")

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
    return `/og-image-${siteSocialImageVersion}-${locale}.jpeg`
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
        secureUrl: absoluteSiteUrl(content.image),
        width: 1200,
        height: 630,
        type: "image/jpeg",
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
            body: string
            appStoreBadge: {
                actionLabel: string
            }
            featureLabels: string[]
            mascotBadge: string
        }
        compliance: {
            summaryParts: string[]
            contactLabel: string
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
            body: "28 gór to nowa aplikacja w App Store, która zbiera wejścia, zdjęcia i ślady z trasy w jednym pięknym miejscu. Każdy szczyt dostaje własną, ręcznie rysowaną pieczątkę.",
            appStoreBadge: {
                actionLabel: "Daj znać, gdy 28 gór pojawi się w App Store",
            },
            featureLabels: ["Rysowane pieczątki", "Pamiątki na zamówienie", "Centrum edukacyjne", "Informacje o górach"],
            mascotBadge: "Czerwiec 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór to produkt ${siteConfig.operatorTradingName}`,
                "ręcznie rysowane pieczątki w aplikacji",
                "pamiątki fizyczne na zamówienie",
                `ceny w ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} dla płatności w aplikacji`,
            ],
            contactLabel: "Kontakt",
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
            body: "28 gór is a new App Store app that keeps climbs, photos, and trail traces in one beautifully made place. Every peak gets its own hand-drawn stamp.",
            appStoreBadge: {
                actionLabel: "Tell me when 28 gór is available on the App Store",
            },
            featureLabels: ["Hand-drawn stamps", "Custom keepsakes", "Education center", "Mountain info"],
            mascotBadge: "June 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór is a product by ${siteConfig.operatorTradingName}`,
                "hand-drawn stamps in app",
                "custom physical keepsakes",
                `prices in ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} for in-app payments`,
            ],
            contactLabel: "Contact",
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
            body: "28 gór es una nueva app para App Store que reúne ascensos, fotos y huellas de ruta en un lugar bonito y cuidado. Cada cima tiene su propio sello dibujado a mano.",
            appStoreBadge: {
                actionLabel: "Avísame cuando 28 gór esté disponible en App Store",
            },
            featureLabels: ["Sellos dibujados a mano", "Recuerdos a medida", "Centro educativo", "Información de montaña"],
            mascotBadge: "Junio de 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór es un producto de ${siteConfig.operatorTradingName}`,
                "sellos dibujados a mano en la app",
                "recuerdos físicos a medida",
                `precios en ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} para pagos en la app`,
            ],
            contactLabel: "Contacto",
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
            body: "28 gór ist eine neue App für den App Store, die Aufstiege, Fotos und Spuren deiner Touren an einem schön gestalteten Ort sammelt. Jeder Gipfel bekommt seinen eigenen handgezeichneten Stempel.",
            appStoreBadge: {
                actionLabel: "Benachrichtige mich, wenn 28 gór im App Store verfügbar ist",
            },
            featureLabels: ["Handgezeichnete Stempel", "Andenken nach Maß", "Lernbereich", "Berginformationen"],
            mascotBadge: "Juni 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór ist ein Produkt von ${siteConfig.operatorTradingName}`,
                "handgezeichnete Stempel in der App",
                "physische Andenken nach Maß",
                `Preise in ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} für Zahlungen in der App`,
            ],
            contactLabel: "Kontakt",
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
            body: "28 gór est une nouvelle app pour l'App Store qui rassemble ascensions, photos et traces de parcours dans un espace soigné. Chaque sommet reçoit son propre tampon dessiné à la main.",
            appStoreBadge: {
                actionLabel: "Prévenez-moi quand 28 gór sera disponible sur l'App Store",
            },
            featureLabels: ["Tampons dessinés à la main", "Souvenirs sur mesure", "Centre éducatif", "Infos montagne"],
            mascotBadge: "Juin 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór est un produit de ${siteConfig.operatorTradingName}`,
                "tampons dessinés à la main dans l'app",
                "souvenirs physiques sur mesure",
                `prix en ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} pour les paiements dans l'app`,
            ],
            contactLabel: "Contact",
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
            body: "28 gór er en ny app for App Store som samler turer, bilder og spor fra ruta på ett vakkert sted. Hver topp får sitt eget håndtegnede stempel.",
            appStoreBadge: {
                actionLabel: "Gi meg beskjed når 28 gór er tilgjengelig i App Store",
            },
            featureLabels: ["Håndtegnede stempler", "Skreddersydde minner", "Læringssenter", "Fjellinformasjon"],
            mascotBadge: "Juni 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór er et produkt fra ${siteConfig.operatorTradingName}`,
                "håndtegnede stempler i appen",
                "fysiske minner på bestilling",
                `priser i ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} for betalinger i appen`,
            ],
            contactLabel: "Kontakt",
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
            body: "28 gór je nová aplikace v App Storu, která ukládá výstupy, fotky a stopy z trasy na jednom krásně vytvořeném místě. Každý vrchol dostane vlastní ručně kreslené razítko.",
            appStoreBadge: {
                actionLabel: "Dejte mi vědět, až bude 28 gór v App Storu",
            },
            featureLabels: ["Kreslená razítka", "Památky na objednávku", "Vzdělávací centrum", "Informace o horách"],
            mascotBadge: "Červen 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór je produkt ${siteConfig.operatorTradingName}`,
                "ručně kreslená razítka v aplikaci",
                "fyzické památky na objednávku",
                `ceny v ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} pro platby v aplikaci`,
            ],
            contactLabel: "Kontakt",
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
            body: "28 gór je nová aplikácia v App Store, ktorá ukladá výstupy, fotky a stopy z trasy na jednom krásne vytvorenom mieste. Každý vrchol dostane vlastnú ručne kreslenú pečiatku.",
            appStoreBadge: {
                actionLabel: "Dajte mi vedieť, keď bude 28 gór v App Store",
            },
            featureLabels: ["Kreslené pečiatky", "Pamiatky na objednávku", "Vzdelávacie centrum", "Informácie o horách"],
            mascotBadge: "Jún 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór je produkt ${siteConfig.operatorTradingName}`,
                "ručne kreslené pečiatky v aplikácii",
                "fyzické pamiatky na objednávku",
                `ceny v ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} pre platby v aplikácii`,
            ],
            contactLabel: "Kontakt",
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
            body: "28 gór - це новий застосунок в App Store, що збирає сходження, фото й сліди маршруту в одному красиво зробленому місці. Кожна вершина має власний намальований вручну штамп.",
            appStoreBadge: {
                actionLabel: "Повідомте мене, коли 28 gór буде в App Store",
            },
            featureLabels: ["Мальовані штампи", "Пам’ятки на замовлення", "Освітній центр", "Інформація про гори"],
            mascotBadge: "Червень 2026",
        },
        compliance: {
            summaryParts: [
                `28 gór - продукт ${siteConfig.operatorTradingName}`,
                "намальовані вручну штампи в застосунку",
                "фізичні пам’ятки на замовлення",
                `ціни в ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} для платежів у застосунку`,
            ],
            contactLabel: "Контакт",
        },
    },
} as const

export type LegalTextBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] }

export type LegalSection = {
    heading: string
    body: LegalTextBlock[]
}

export type LegalDocumentVersion = {
    firstPublishedDate: string
    identifier: string
    effectiveDate: string
    updatedDate: string
}

export type LegalDocument = {
    slug: "privacy" | "support" | "terms"
    title: string
    version: LegalDocumentVersion
    intro: string[]
    sections: LegalSection[]
}

const localizedLegalDocuments = createLegalDocuments(siteConfig)

export const legalDocuments = localizedLegalDocuments.pl
export const englishLegalDocuments = localizedLegalDocuments.en
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
        body: "Dokumenty prawne są dostępne po polsku i angielsku. W razie rozbieżności pierwszeństwo ma wersja polska, w zakresie dozwolonym przez bezwzględnie obowiązujące przepisy prawa.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    en: {
        title: "Legal documents",
        body: "The legal documents are available in Polish and English. If there is any inconsistency, the Polish version prevails to the extent permitted by mandatory applicable law.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    es: {
        title: "Documentos legales",
        body: "Los documentos legales están disponibles en polaco e inglés. En caso de discrepancia, prevalece la versión polaca en la medida permitida por las normas imperativas aplicables.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    de: {
        title: "Rechtliche Dokumente",
        body: "Die rechtlichen Dokumente sind auf Polnisch und Englisch verfügbar. Bei Abweichungen hat die polnische Version Vorrang, soweit zwingendes Recht dies zulässt.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    fr: {
        title: "Documents juridiques",
        body: "Les documents juridiques sont disponibles en polonais et en anglais. En cas de divergence, la version polonaise prévaut dans la mesure permise par les règles impératives applicables.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    nb: {
        title: "Juridiske dokumenter",
        body: "De juridiske dokumentene er tilgjengelige på polsk og engelsk. Ved avvik har den polske versjonen forrang i den utstrekning ufravikelig lovgivning tillater det.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    cs: {
        title: "Právní dokumenty",
        body: "Právní dokumenty jsou dostupné v polštině a angličtině. V případě rozporu má přednost polská verze v rozsahu povoleném kogentními právními předpisy.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    sk: {
        title: "Právne dokumenty",
        body: "Právne dokumenty sú dostupné v poľštine a angličtine. V prípade rozporu má prednosť poľská verzia v rozsahu povolenom kogentnými právnymi predpismi.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
    uk: {
        title: "Правові документи",
        body: "Правові документи доступні польською та англійською. У разі розбіжностей польська версія має переважну силу в межах, дозволених імперативними нормами застосовного права.",
        polishLabel: "Polski",
        englishLabel: "English",
    },
}

export const legalDocumentsByLocale = {
    pl: legalDocuments,
    en: englishLegalDocuments,
} satisfies Record<LegalDocumentLocale, Record<LegalDocument["slug"], LegalDocument>>
