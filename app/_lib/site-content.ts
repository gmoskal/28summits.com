const siteIconVersion = "20260617-2"
const siteSocialImageVersion = "20260617-2"

export const siteConfig = {
    name: "28 gór",
    productName: "28 gór",
    operatorName: "async.studio",
    contactEmail: "support@async.studio",
    siteHost: "28gor.app",
    currencyCode: "PLN",
    paymentProcessorName: "Stripe",
    appStoreUrl: "https://apps.apple.com/app/28-summits/id0000000000",
    appStoreBadgeImage: "/download-on-the-app-store-badge.svg",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.28summits.app",
    launchUpdatesUrl: "mailto:support@async.studio?subject=28%20g%C3%B3r%20launch%20updates",
    siteUrl: "https://28gor.app",
    appIcon: `/app-icon.png?v=${siteIconVersion}`,
    appIconHeader: "/app-icon.png",
    appleTouchIcon: "/apple-touch-icon.png",
    faviconIconIco: `/favicon.ico?v=${siteIconVersion}`,
    faviconIcon16: `/favicon-16x16.png?v=${siteIconVersion}`,
    faviconIcon32: `/favicon-32x32.png?v=${siteIconVersion}`,
    description: "28 gór zbiera plany, wejścia, zdjęcia, ręcznie rysowane pieczątki, edukację i górskie pamiątki w jednej dopracowanej aplikacji.",
    socialTitle: "28 gór - wszystko z gór w jednym pięknym miejscu",
    socialDescription: "Zbieraj wejścia, zdjęcia, notatki i pieczątki rysowane dla każdego szczytu. Zamawiaj pamiątki i odkrywaj edukacyjne treści z Ryskiem.",
    socialImage: `/og-image-${siteSocialImageVersion}.png`,
    socialImageAlt: "28 gór - dopracowana aplikacja z ręcznie rysowanymi pieczątkami, zdjęciami, edukacją i pamiątkami z tras.",
} as const

export const siteSocialImage = {
    url: siteConfig.socialImage,
    secureUrl: `${siteConfig.siteUrl}${siteConfig.socialImage}`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: siteConfig.socialImageAlt,
} as const

export const siteSocialTwitterImage = {
    url: siteConfig.socialImage,
    alt: siteConfig.socialImageAlt,
} as const

export const siteLanguages = [
    { locale: "pl", flag: "🇵🇱", name: "Polski", htmlLang: "pl", ogLocale: "pl_PL" },
    { locale: "en", flag: "🇬🇧", name: "English", htmlLang: "en", ogLocale: "en_US" },
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
                `${siteConfig.paymentProcessorName} tylko dla fizycznych pamiątek`,
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
                `${siteConfig.paymentProcessorName} only for physical keepsakes`,
            ],
            contactLabel: "Contact",
            legalPolicies: "Legal & Policies",
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
                `${siteConfig.paymentProcessorName} pouze pro fyzické památky`,
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
                `${siteConfig.paymentProcessorName} iba pre fyzické pamiatky`,
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
                `${siteConfig.paymentProcessorName} лише для фізичних пам’яток`,
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
                            "informacje o statusie zamówienia lub płatności dotyczącej fizycznej pamiątki.",
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
                        text: `${siteConfig.paymentProcessorName} obsługuje płatności wyłącznie za fizyczne pamiątki. ${siteConfig.operatorName} nie przechowuje pełnych numerów kart płatniczych.`,
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
                        text: `${siteConfig.paymentProcessorName} obsługuje wyłącznie płatności za fizyczne pamiątki 28 gór wysyłane do klientów. Inne płatności udostępnione w aplikacji będą opisane przed ich potwierdzeniem.`,
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
                            "physical keepsake order or payment status information.",
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
                        text: `${siteConfig.paymentProcessorName} handles payments only for physical keepsakes. ${siteConfig.operatorName} does not store full payment card numbers.`,
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
                        text: `${siteConfig.paymentProcessorName} handles payments only for physical 28 gór keepsakes shipped to customers. Any other payments made available in the app will be described before confirmation.`,
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

export const czechLegalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
    privacy: {
        slug: "privacy",
        title: "Zásady ochrany soukromí",
        effectiveDate: "Platné od 29. května 2026",
        intro: [
            `Tyto zásady popisují, jak ${siteConfig.operatorName}, provozovatel produktu 28 gór, zpracovává osobní údaje uživatelů webu ${siteConfig.siteHost} a připravované mobilní aplikace.`,
            "28 gór má být spuštěno v červnu 2026. Dokument se týká webu, kontaktu s uživateli a plánovaných funkcí aplikace, jako je účet, deník výstupů, fotky, preference a synchronizace dat.",
        ],
        sections: [
            {
                heading: "Správce a kontakt",
                body: [
                    {
                        type: "paragraph",
                        text: `Správcem osobních údajů je ${siteConfig.operatorName}, provozovatel produktu 28 gór. Ve věcech soukromí, osobních údajů a podpory pište na ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Jaké údaje zpracováváme",
                body: [
                    {
                        type: "list",
                        items: [
                            "kontaktní údaje, například e-mail zadaný pro informace o spuštění nebo podporu,",
                            "údaje účtu, pokud bude účet vytvořen, včetně e-mailu, názvu profilu a nastavení,",
                            "údaje z aplikace, například plánované vrcholy, výstupy, poznámky, fotky, popisky, preference a nastavení,",
                            "technické údaje, například IP adresa, typ zařízení, prohlížeč, operační systém, diagnostické údaje a přibližný region,",
                            "údaje o objednávce nebo platbě týkající se fyzické památky.",
                        ],
                    },
                ],
            },
            {
                heading: "Účely zpracování",
                body: [
                    {
                        type: "list",
                        items: [
                            "poskytování služby, vedení účtu, synchronizace dat a funkce aplikace,",
                            "odpovědi na dotazy, podporu a zprávy o spuštění produktu,",
                            "bezpečnost, diagnostika chyb, prevence zneužití a zlepšování kvality služby,",
                            "splnění právních, účetních nebo daňových povinností, pokud se použijí.",
                        ],
                    },
                ],
            },
            {
                heading: "Oprávnění zařízení a cookies",
                body: [
                    {
                        type: "paragraph",
                        text: "Aplikace může požádat o přístup k poloze, fotoaparátu, knihovně fotek nebo oznámením pouze tehdy, když je to potřeba pro konkrétní funkci. Oprávnění lze změnit v nastavení systému.",
                    },
                    {
                        type: "paragraph",
                        text: "Web může používat nezbytné cookies, localStorage nebo podobné technologie k zapamatování jazyka, motivu a základních nastavení rozhraní.",
                    },
                ],
            },
            {
                heading: "Fyzické památky a platby",
                body: [
                    {
                        type: "paragraph",
                        text: `Pokud budou v aplikaci dostupné fyzické památky, můžeme zpracovávat jméno, e-mail, doručovací adresu, údaje objednávky a stav platby. Platby za fyzické památky zpracovává pouze ${siteConfig.paymentProcessorName}; ${siteConfig.operatorName} neukládá úplná čísla platebních karet.`,
                    },
                ],
            },
            {
                heading: "Příjemci, uchování a práva",
                body: [
                    {
                        type: "paragraph",
                        text: "Údaje můžeme předávat poskytovatelům hostingu, databází, e-mailu, podpory, diagnostiky, plateb a logistiky pouze v rozsahu potřebném pro provoz služby. Údaje neprodáváme.",
                    },
                    {
                        type: "paragraph",
                        text: `Údaje uchováváme po dobu potřebnou pro daný účel nebo zákonné povinnosti. Žádosti o přístup, opravu, výmaz, omezení zpracování, přenositelnost nebo námitku můžete posílat na ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Děti, bezpečnost a změny",
                body: [
                    {
                        type: "paragraph",
                        text: "Služba není určena dětem mladším 13 let. Nezletilí by ji měli používat se souhlasem a dohledem zákonného zástupce. Tyto zásady mohou být aktualizovány podle vývoje produktu nebo právních požadavků.",
                    },
                ],
            },
        ],
    },
    terms: {
        slug: "terms",
        title: "Podmínky služby",
        effectiveDate: "Platné od 29. května 2026",
        intro: [
            `Tyto podmínky upravují používání webu ${siteConfig.siteHost} a aplikace 28 gór. Produkt vyvíjí ${siteConfig.operatorName} a spuštění aplikace je plánováno na červen 2026.`,
            "28 gór pomáhá plánovat a dokumentovat výstupy na 28 vrcholů. Nenahrazuje mapy, hlášení horské služby, předpověď počasí, značení v terénu ani vlastní úsudek.",
        ],
        sections: [
            {
                heading: "Provozovatel a kontakt",
                body: [
                    {
                        type: "paragraph",
                        text: `Provozovatelem služby je ${siteConfig.operatorName}. Ve věcech podmínek, služby nebo podpory pište na ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Rozsah služby",
                body: [
                    {
                        type: "paragraph",
                        text: "Po spuštění může aplikace obsahovat plánování vrcholů, historii výstupů, ukládání fotek, ručně kreslená razítka pro jednotlivé vrcholy, vzdělávací centrum, synchronizaci účtu a další funkce pro dokumentování tras.",
                    },
                    {
                        type: "paragraph",
                        text: "V aplikaci může být možné kupovat fyzické památky zasílané zákazníkům.",
                    },
                ],
            },
            {
                heading: "Účet a obsah uživatele",
                body: [
                    {
                        type: "paragraph",
                        text: "Uživatel odpovídá za správnost údajů účtu a ochranu přihlašovacích údajů. Práva k fotkám, poznámkám a dalšímu vlastnímu obsahu zůstávají uživateli.",
                    },
                    {
                        type: "paragraph",
                        text: "Přidáním obsahu uděluje uživatel provozovateli technickou licenci potřebnou k uložení, synchronizaci, zobrazení, zálohování a podpoře obsahu.",
                    },
                ],
            },
            {
                heading: "Bezpečnost v horách",
                body: [
                    {
                        type: "paragraph",
                        text: "Za rozhodnutí v terénu, volbu trasy, počasí, vybavení a reakci na místní podmínky odpovídá uživatel. Před cestou je nutné ověřit aktuální zprávy, uzávěry tras, varování a doporučení záchranných složek.",
                    },
                ],
            },
            {
                heading: "Fyzické památky a platby",
                body: [
                    {
                        type: "paragraph",
                        text: `${siteConfig.paymentProcessorName} zpracovává pouze platby za fyzické památky 28 gór zasílané zákazníkům. Jiné platby dostupné v aplikaci budou popsány před potvrzením.`,
                    },
                    {
                        type: "paragraph",
                        text: `Ceny fyzických památek budou uvedeny v ${siteConfig.currencyCode} před platbou. Podmínky doručení, vrácení, reklamací a zrušení objednávky budou zobrazeny před nákupem nebo zaslány podporou.`,
                    },
                ],
            },
            {
                heading: "Dostupnost, změny a práva",
                body: [
                    {
                        type: "paragraph",
                        text: "Služba se může vyvíjet, měnit, být dočasně nedostupná nebo být v některých funkcích ukončena. Název 28 gór, vzhled aplikace, texty, grafika a prvky produktu jsou chráněny právy provozovatele nebo oprávněných držitelů.",
                    },
                    {
                        type: "paragraph",
                        text: `Pravidla zpracování osobních údajů popisují Zásady ochrany soukromí dostupné na ${siteConfig.siteHost}/privacy.`,
                    },
                ],
            },
        ],
    },
    support: {
        slug: "support",
        title: "Podpora",
        effectiveDate: "Aktualizováno: 29. května 2026",
        intro: [
            "Potřebujete pomoc s účtem, přístupem k údajům, objednávkou fyzické památky nebo technickým problémem? Stručně popište, co se stalo, na jakém zařízení a co jste očekávali.",
        ],
        sections: [
            {
                heading: "E-mailová podpora",
                body: [
                    {
                        type: "paragraph",
                        text: `Napište na ${siteConfig.contactEmail}. Pokud to pomůže, přiložte snímek obrazovky, verzi aplikace, model zařízení, číslo objednávky nebo adresu stránky, kde problém nastal. Obvykle odpovídáme do 2 pracovních dnů.`,
                    },
                ],
            },
        ],
    },
}

export const slovakLegalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
    privacy: {
        slug: "privacy",
        title: "Zásady ochrany súkromia",
        effectiveDate: "Platné od 29. mája 2026",
        intro: [
            `Tieto zásady opisujú, ako ${siteConfig.operatorName}, prevádzkovateľ produktu 28 gór, spracúva osobné údaje používateľov webu ${siteConfig.siteHost} a pripravovanej mobilnej aplikácie.`,
            "28 gór má byť spustené v júni 2026. Dokument sa týka webu, kontaktu s používateľmi a plánovaných funkcií aplikácie, ako je účet, denník výstupov, fotky, preferencie a synchronizácia údajov.",
        ],
        sections: [
            {
                heading: "Prevádzkovateľ a kontakt",
                body: [
                    {
                        type: "paragraph",
                        text: `Prevádzkovateľom osobných údajov je ${siteConfig.operatorName}, prevádzkovateľ produktu 28 gór. Vo veciach súkromia, osobných údajov a podpory píšte na ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Aké údaje spracúvame",
                body: [
                    {
                        type: "list",
                        items: [
                            "kontaktné údaje, napríklad e-mail zadaný pre informácie o spustení alebo podporu,",
                            "údaje účtu, ak bude účet vytvorený, vrátane e-mailu, názvu profilu a nastavení,",
                            "údaje z aplikácie, napríklad plánované vrcholy, výstupy, poznámky, fotky, popisy, preferencie a nastavenia,",
                            "technické údaje, napríklad IP adresa, typ zariadenia, prehliadač, operačný systém, diagnostické údaje a približný región,",
                            "údaje o objednávke alebo platbe týkajúcej sa fyzickej pamiatky.",
                        ],
                    },
                ],
            },
            {
                heading: "Účely spracúvania",
                body: [
                    {
                        type: "list",
                        items: [
                            "poskytovanie služby, vedenie účtu, synchronizácia údajov a funkcie aplikácie,",
                            "odpovede na otázky, podporu a správy o spustení produktu,",
                            "bezpečnosť, diagnostika chýb, prevencia zneužitia a zlepšovanie kvality služby,",
                            "splnenie právnych, účtovných alebo daňových povinností, ak sa použijú.",
                        ],
                    },
                ],
            },
            {
                heading: "Oprávnenia zariadenia a cookies",
                body: [
                    {
                        type: "paragraph",
                        text: "Aplikácia môže požiadať o prístup k polohe, fotoaparátu, knižnici fotiek alebo oznámeniam iba vtedy, keď je to potrebné pre konkrétnu funkciu. Oprávnenia možno zmeniť v nastaveniach systému.",
                    },
                    {
                        type: "paragraph",
                        text: "Web môže používať nevyhnutné cookies, localStorage alebo podobné technológie na zapamätanie jazyka, motívu a základných nastavení rozhrania.",
                    },
                ],
            },
            {
                heading: "Fyzické pamiatky a platby",
                body: [
                    {
                        type: "paragraph",
                        text: `Ak budú v aplikácii dostupné fyzické pamiatky, môžeme spracúvať meno, e-mail, doručovaciu adresu, údaje objednávky a stav platby. Platby za fyzické pamiatky spracúva iba ${siteConfig.paymentProcessorName}; ${siteConfig.operatorName} neukladá úplné čísla platobných kariet.`,
                    },
                ],
            },
            {
                heading: "Príjemcovia, uchovanie a práva",
                body: [
                    {
                        type: "paragraph",
                        text: "Údaje môžeme poskytovať dodávateľom hostingu, databáz, e-mailu, podpory, diagnostiky, platieb a logistiky iba v rozsahu potrebnom na prevádzku služby. Údaje nepredávame.",
                    },
                    {
                        type: "paragraph",
                        text: `Údaje uchovávame počas obdobia potrebného pre daný účel alebo zákonné povinnosti. Žiadosti o prístup, opravu, vymazanie, obmedzenie spracúvania, prenosnosť alebo námietku môžete posielať na ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Deti, bezpečnosť a zmeny",
                body: [
                    {
                        type: "paragraph",
                        text: "Služba nie je určená deťom mladším ako 13 rokov. Maloletí by ju mali používať so súhlasom a dohľadom zákonného zástupcu. Tieto zásady môžu byť aktualizované podľa vývoja produktu alebo právnych požiadaviek.",
                    },
                ],
            },
        ],
    },
    terms: {
        slug: "terms",
        title: "Podmienky služby",
        effectiveDate: "Platné od 29. mája 2026",
        intro: [
            `Tieto podmienky upravujú používanie webu ${siteConfig.siteHost} a aplikácie 28 gór. Produkt vyvíja ${siteConfig.operatorName} a spustenie aplikácie je plánované na jún 2026.`,
            "28 gór pomáha plánovať a dokumentovať výstupy na 28 vrcholov. Nenahrádza mapy, hlásenia horskej služby, predpoveď počasia, značenie v teréne ani vlastný úsudok.",
        ],
        sections: [
            {
                heading: "Prevádzkovateľ a kontakt",
                body: [
                    {
                        type: "paragraph",
                        text: `Prevádzkovateľom služby je ${siteConfig.operatorName}. Vo veciach podmienok, služby alebo podpory píšte na ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Rozsah služby",
                body: [
                    {
                        type: "paragraph",
                        text: "Po spustení môže aplikácia obsahovať plánovanie vrcholov, históriu výstupov, ukladanie fotiek, ručne kreslené pečiatky pre jednotlivé vrcholy, vzdelávacie centrum, synchronizáciu účtu a ďalšie funkcie na dokumentovanie trás.",
                    },
                    {
                        type: "paragraph",
                        text: "V aplikácii môže byť možné kupovať fyzické pamiatky zasielané zákazníkom.",
                    },
                ],
            },
            {
                heading: "Účet a obsah používateľa",
                body: [
                    {
                        type: "paragraph",
                        text: "Používateľ zodpovedá za správnosť údajov účtu a ochranu prihlasovacích údajov. Práva k fotkám, poznámkam a ďalšiemu vlastnému obsahu zostávajú používateľovi.",
                    },
                    {
                        type: "paragraph",
                        text: "Pridaním obsahu používateľ udeľuje prevádzkovateľovi technickú licenciu potrebnú na uloženie, synchronizáciu, zobrazenie, zálohovanie a podporu obsahu.",
                    },
                ],
            },
            {
                heading: "Bezpečnosť v horách",
                body: [
                    {
                        type: "paragraph",
                        text: "Za rozhodnutia v teréne, voľbu trasy, počasie, vybavenie a reakciu na miestne podmienky zodpovedá používateľ. Pred cestou je potrebné overiť aktuálne správy, uzávery trás, výstrahy a odporúčania záchranných zložiek.",
                    },
                ],
            },
            {
                heading: "Fyzické pamiatky a platby",
                body: [
                    {
                        type: "paragraph",
                        text: `${siteConfig.paymentProcessorName} spracúva iba platby za fyzické pamiatky 28 gór zasielané zákazníkom. Iné platby dostupné v aplikácii budú opísané pred potvrdením.`,
                    },
                    {
                        type: "paragraph",
                        text: `Ceny fyzických pamiatok budú uvedené v ${siteConfig.currencyCode} pred platbou. Podmienky doručenia, vrátenia, reklamácií a zrušenia objednávky budú zobrazené pred nákupom alebo zaslané podporou.`,
                    },
                ],
            },
            {
                heading: "Dostupnosť, zmeny a práva",
                body: [
                    {
                        type: "paragraph",
                        text: "Služba sa môže vyvíjať, meniť, byť dočasne nedostupná alebo byť v niektorých funkciách ukončená. Názov 28 gór, vzhľad aplikácie, texty, grafika a prvky produktu sú chránené právami prevádzkovateľa alebo oprávnených držiteľov.",
                    },
                    {
                        type: "paragraph",
                        text: `Pravidlá spracúvania osobných údajov opisujú Zásady ochrany súkromia dostupné na ${siteConfig.siteHost}/privacy.`,
                    },
                ],
            },
        ],
    },
    support: {
        slug: "support",
        title: "Podpora",
        effectiveDate: "Aktualizované: 29. mája 2026",
        intro: [
            "Potrebujete pomoc s účtom, prístupom k údajom, objednávkou fyzickej pamiatky alebo technickým problémom? Stručne opíšte, čo sa stalo, na akom zariadení a čo ste očakávali.",
        ],
        sections: [
            {
                heading: "E-mailová podpora",
                body: [
                    {
                        type: "paragraph",
                        text: `Napíšte na ${siteConfig.contactEmail}. Ak to pomôže, priložte snímku obrazovky, verziu aplikácie, model zariadenia, číslo objednávky alebo adresu stránky, kde problém nastal. Zvyčajne odpovedáme do 2 pracovných dní.`,
                    },
                ],
            },
        ],
    },
}

export const ukrainianLegalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
    privacy: {
        slug: "privacy",
        title: "Політика приватності",
        effectiveDate: "Чинна з 29 травня 2026 р.",
        intro: [
            `Ця політика пояснює, як ${siteConfig.operatorName}, оператор продукту 28 gór, обробляє персональні дані користувачів сайту ${siteConfig.siteHost} і запланованого мобільного застосунку.`,
            "Запуск 28 gór заплановано на червень 2026 року. Документ охоплює сайт, контакт із користувачами та заплановані функції застосунку: акаунт, журнал сходжень, фото, налаштування та синхронізацію даних.",
        ],
        sections: [
            {
                heading: "Контролер і контакт",
                body: [
                    {
                        type: "paragraph",
                        text: `Контролером персональних даних є ${siteConfig.operatorName}, оператор продукту 28 gór. З питань приватності, персональних даних і підтримки пишіть на ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Які дані ми обробляємо",
                body: [
                    {
                        type: "list",
                        items: [
                            "контактні дані, наприклад e-mail для повідомлень про запуск або звернення до підтримки,",
                            "дані акаунта, якщо акаунт буде створено, зокрема e-mail, назва профілю та налаштування,",
                            "дані застосунку, наприклад заплановані вершини, сходження, нотатки, фото, підписи, вподобання та налаштування,",
                            "технічні дані, наприклад IP-адреса, тип пристрою, браузер, операційна система, діагностичні дані та приблизний регіон,",
                            "дані замовлення або платежу щодо фізичної пам’ятки.",
                        ],
                    },
                ],
            },
            {
                heading: "Мета обробки",
                body: [
                    {
                        type: "list",
                        items: [
                            "надання сервісу, ведення акаунта, синхронізація даних і функції застосунку,",
                            "відповіді на запити, підтримка та повідомлення про запуск продукту,",
                            "безпека, діагностика помилок, запобігання зловживанням і покращення якості сервісу,",
                            "виконання юридичних, бухгалтерських або податкових обов’язків, якщо вони застосовуються.",
                        ],
                    },
                ],
            },
            {
                heading: "Дозволи пристрою та cookies",
                body: [
                    {
                        type: "paragraph",
                        text: "Застосунок може попросити доступ до геолокації, камери, бібліотеки фото або сповіщень лише тоді, коли це потрібно для конкретної функції. Дозволи можна змінити в налаштуваннях системи.",
                    },
                    {
                        type: "paragraph",
                        text: "Сайт може використовувати необхідні cookies, localStorage або подібні технології, щоб запам’ятати мову, тему та базові налаштування інтерфейсу.",
                    },
                ],
            },
            {
                heading: "Фізичні пам’ятки та платежі",
                body: [
                    {
                        type: "paragraph",
                        text: `Якщо в застосунку будуть доступні фізичні пам’ятки, ми можемо обробляти ім’я, e-mail, адресу доставки, дані замовлення та статус платежу. Платежі за фізичні пам’ятки обробляє лише ${siteConfig.paymentProcessorName}; ${siteConfig.operatorName} не зберігає повні номери платіжних карток.`,
                    },
                ],
            },
            {
                heading: "Одержувачі, зберігання та права",
                body: [
                    {
                        type: "paragraph",
                        text: "Ми можемо передавати дані постачальникам хостингу, баз даних, e-mail, підтримки, діагностики, платежів і логістики лише в обсязі, потрібному для роботи сервісу. Ми не продаємо персональні дані.",
                    },
                    {
                        type: "paragraph",
                        text: `Дані зберігаються протягом часу, потрібного для відповідної мети або юридичних обов’язків. Запити на доступ, виправлення, видалення, обмеження обробки, перенесення даних або заперечення можна надсилати на ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Діти, безпека та зміни",
                body: [
                    {
                        type: "paragraph",
                        text: "Сервіс не призначений для дітей молодше 13 років. Неповнолітні мають користуватися ним за згодою та під наглядом опікуна. Ця політика може оновлюватися разом із розвитком продукту або зміною правових вимог.",
                    },
                ],
            },
        ],
    },
    terms: {
        slug: "terms",
        title: "Умови користування",
        effectiveDate: "Чинні з 29 травня 2026 р.",
        intro: [
            `Ці умови визначають правила користування сайтом ${siteConfig.siteHost} і застосунком 28 gór. Продукт розробляє ${siteConfig.operatorName}, запуск застосунку заплановано на червень 2026 року.`,
            "28 gór допомагає планувати та документувати сходження на 28 вершин. Він не замінює карти, повідомлення рятувальних служб, прогноз погоди, маркування на маршруті або власну оцінку умов.",
        ],
        sections: [
            {
                heading: "Оператор і контакт",
                body: [
                    {
                        type: "paragraph",
                        text: `Оператором сервісу є ${siteConfig.operatorName}. З питань умов, роботи сервісу або підтримки пишіть на ${siteConfig.contactEmail}.`,
                    },
                ],
            },
            {
                heading: "Обсяг сервісу",
                body: [
                    {
                        type: "paragraph",
                        text: "Після запуску застосунок може містити планування вершин, історію сходжень, зберігання фото, намальовані вручну штампи для кожної вершини, освітній центр, синхронізацію акаунта та інші функції для документування маршрутів.",
                    },
                    {
                        type: "paragraph",
                        text: "У застосунку може бути можливість купувати фізичні пам’ятки з доставкою клієнтам.",
                    },
                ],
            },
            {
                heading: "Акаунт і контент користувача",
                body: [
                    {
                        type: "paragraph",
                        text: "Користувач відповідає за точність даних акаунта та захист даних для входу. Права на фото, нотатки та інший власний контент залишаються за користувачем.",
                    },
                    {
                        type: "paragraph",
                        text: "Додаючи контент, користувач надає оператору технічну ліцензію, потрібну для зберігання, синхронізації, показу, резервного копіювання та підтримки цього контенту.",
                    },
                ],
            },
            {
                heading: "Безпека в горах",
                body: [
                    {
                        type: "paragraph",
                        text: "За рішення на маршруті, вибір дороги, погоду, спорядження та реакцію на місцеві умови відповідає користувач. Перед виходом у гори потрібно перевірити актуальні повідомлення, закриття маршрутів, попередження та рекомендації рятувальних служб.",
                    },
                ],
            },
            {
                heading: "Фізичні пам’ятки та платежі",
                body: [
                    {
                        type: "paragraph",
                        text: `${siteConfig.paymentProcessorName} обробляє лише платежі за фізичні пам’ятки 28 gór з доставкою клієнтам. Інші платежі, доступні в застосунку, будуть описані перед підтвердженням.`,
                    },
                    {
                        type: "paragraph",
                        text: `Ціни фізичних пам’яток будуть показані в ${siteConfig.currencyCode} перед оплатою. Умови доставки, повернення, рекламацій і скасування замовлення будуть показані перед купівлею або надіслані підтримкою.`,
                    },
                ],
            },
            {
                heading: "Доступність, зміни та права",
                body: [
                    {
                        type: "paragraph",
                        text: "Сервіс може розвиватися, змінюватися, бути тимчасово недоступним або втратити частину функцій. Назва 28 gór, вигляд застосунку, тексти, графіка та елементи продукту захищені правами оператора або правовласників.",
                    },
                    {
                        type: "paragraph",
                        text: `Правила обробки персональних даних описані в Політиці приватності на ${siteConfig.siteHost}/privacy.`,
                    },
                ],
            },
        ],
    },
    support: {
        slug: "support",
        title: "Підтримка",
        effectiveDate: "Оновлено: 29 травня 2026 р.",
        intro: [
            "Потрібна допомога з акаунтом, доступом до даних, замовленням фізичної пам’ятки або технічною проблемою? Коротко опишіть, що сталося, на якому пристрої та чого ви очікували.",
        ],
        sections: [
            {
                heading: "Підтримка e-mail",
                body: [
                    {
                        type: "paragraph",
                        text: `Напишіть на ${siteConfig.contactEmail}. Якщо це допоможе, додайте знімок екрана, версію застосунку, модель пристрою, номер замовлення або адресу сторінки, де виникла проблема. Зазвичай ми відповідаємо протягом 2 робочих днів.`,
                    },
                ],
            },
        ],
    },
}

export const legalDocumentsByLocale = {
    pl: legalDocuments,
    en: englishLegalDocuments,
    cs: czechLegalDocuments,
    sk: slovakLegalDocuments,
    uk: ukrainianLegalDocuments,
} satisfies Record<SiteLocale, Record<LegalDocument["slug"], LegalDocument>>
