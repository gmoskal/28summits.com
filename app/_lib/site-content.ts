export const siteConfig = {
    name: "28s",
    productName: "28 Summits",
    operatorName: "async.studio",
    contactEmail: "support@async.studio",
    siteHost: "28summits.com",
    currencyCode: "PLN",
    paymentProcessorName: "Stripe",
    appStoreUrl: "https://apps.apple.com/app/28-summits/id0000000000",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.28summits.app",
    launchUpdatesUrl: "mailto:support@async.studio?subject=28s%20launch%20updates",
    siteUrl: "https://28summits.com",
    description: "28s is a mountain companion for planning and remembering Poland's Crown of Mountains.",
} as const

export const siteLocales = ["pl", "en"] as const
export type SiteLocale = (typeof siteLocales)[number]

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
        }
        hero: {
            eyebrow: string
            headline: string
            body: string
            ctas: {
                updates: string
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
        },
        hero: {
            eyebrow: "Premiera w czerwcu 2026",
            headline: "28s",
            body: "Aplikacja dla osób, które chcą przejść Koronę Gór Polski bez chaosu w notatkach: planuj szczyty, zapisuj wejścia, dodawaj zdjęcia i wracaj do tras, które naprawdę zrobiłeś.",
            ctas: {
                updates: "Daj znać o starcie",
            },
            caption: "Startujemy na iOS. Android dołączy po premierze.",
            featureLabels: ["Plan szczytów", "Dziennik wejść", "Zdjęcia z tras"],
            mascotBadge: "Czerwiec 2026",
        },
        compliance: {
            summaryParts: [
                `28s to produkt ${siteConfig.operatorName}`,
                "fizyczne piny kolekcjonerskie w aplikacji",
                `ceny w ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} tylko dla fizycznych produktów`,
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
        },
        hero: {
            eyebrow: "Coming June 2026",
            headline: "28s",
            body: "A mountain companion for the Crown of Polish Mountains: plan your peaks, record real completions, attach photos, and keep the routes you actually walked in one tidy place.",
            ctas: {
                updates: "Get launch updates",
            },
            caption: "Launching first on iOS. Android follows after release.",
            featureLabels: ["Peak plan", "Summit log", "Route photos"],
            mascotBadge: "June 2026",
        },
        compliance: {
            summaryParts: [
                `28s is a product by ${siteConfig.operatorName}`,
                "physical collectible pins in app",
                `prices in ${siteConfig.currencyCode}`,
                `${siteConfig.paymentProcessorName} only for physical products`,
            ],
            contactLabel: "Contact",
            legalPolicies: "Legal & Policies",
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
            `Ta polityka opisuje, jak ${siteConfig.operatorName} jako operator produktu 28s / 28 Summits przetwarza dane osobowe użytkowników strony ${siteConfig.siteHost} oraz planowanej aplikacji mobilnej.`,
            "28s ma wystartować w czerwcu 2026 r. Dokument obejmuje stronę zapowiadającą, kontakt z użytkownikami oraz funkcje aplikacji, takie jak konto, dziennik wejść, zdjęcia, preferencje i synchronizacja danych.",
        ],
        sections: [
            {
                heading: "Administrator i kontakt",
                body: [
                    {
                        type: "paragraph",
                        text: `Administratorem danych osobowych jest ${siteConfig.operatorName}, operator produktu 28s / 28 Summits. Kontakt w sprawach prywatności, danych osobowych i obsługi użytkownika: ${siteConfig.contactEmail}.`,
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
                            "informacje o statusie płatności albo zamówienia produktu fizycznego, jeżeli w przyszłości zostaną uruchomione piny kolekcjonerskie lub powiązany merch.",
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
                heading: "Zamówienia produktów fizycznych",
                body: [
                    {
                        type: "paragraph",
                        text: `Jeżeli w aplikacji zostaną uruchomione fizyczne piny kolekcjonerskie lub powiązany merch, do obsługi zamówienia możemy przetwarzać imię i nazwisko, adres e-mail, adres dostawy, szczegóły zamówienia oraz status płatności.`,
                    },
                    {
                        type: "paragraph",
                        text: `Płatności za fizyczne produkty obsługuje ${siteConfig.paymentProcessorName}. ${siteConfig.operatorName} nie przechowuje pełnych numerów kart płatniczych.`,
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
                        text: "28s nie podejmuje decyzji wywołujących wobec użytkownika skutki prawne wyłącznie w sposób zautomatyzowany. Jeżeli zostaną uruchomione funkcje AI, będą przetwarzać dane przekazane przez użytkownika tylko w zakresie potrzebnym do działania konkretnej funkcji, np. podsumowania notatki albo uporządkowania opisu trasy.",
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
            `Regulamin określa zasady korzystania ze strony ${siteConfig.siteHost} oraz aplikacji 28s / 28 Summits. Produkt jest rozwijany przez ${siteConfig.operatorName}, a premiera aplikacji jest planowana na czerwiec 2026 r.`,
            "28s ma pomagać w planowaniu i dokumentowaniu Korony Gór Polski. Nie zastępuje map, komunikatów GOPR/TOPR, prognoz pogody, oznaczeń w terenie ani rozsądnej oceny warunków.",
        ],
        sections: [
            {
                heading: "Usługodawca i kontakt",
                body: [
                    {
                        type: "paragraph",
                        text: `Usługodawcą i operatorem produktu 28s / 28 Summits jest ${siteConfig.operatorName}. Kontakt w sprawach regulaminu, działania usługi i obsługi użytkownika: ${siteConfig.contactEmail}.`,
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
                            `Usługa - strona ${siteConfig.siteHost}, aplikacja 28s / 28 Summits oraz funkcje udostępniane użytkownikom.`,
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
                        text: "Na etapie zapowiedzi strona może umożliwiać zapoznanie się z produktem oraz kontakt w sprawie premiery. Po uruchomieniu aplikacja może obejmować planowanie szczytów, dziennik wejść, zapisywanie zdjęć, synchronizację konta, preferencje i inne funkcje związane z Koroną Gór Polski.",
                    },
                    {
                        type: "paragraph",
                        text: "W aplikacji 28s będzie można kupić limitowane piny kolekcjonerskie oraz powiązany merch jako fizyczne produkty wysyłane do klientów. Warunki zakupu będą prezentowane przed płatnością.",
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
                heading: "Fizyczne produkty i płatności",
                body: [
                    {
                        type: "paragraph",
                        text: `${siteConfig.paymentProcessorName} obsługuje wyłącznie płatności za fizyczne produkty 28s wysyłane do klientów. 28s nie używa ${siteConfig.paymentProcessorName} do sprzedaży cyfrowych funkcji aplikacji, subskrypcji, kredytów, dostępu premium, odblokowań funkcji ani treści cyfrowych.`,
                    },
                    {
                        type: "paragraph",
                        text: `Ceny produktów fizycznych będą widoczne w ${siteConfig.currencyCode} przed płatnością. Koszty wysyłki, podatki i dodatkowe opłaty, jeżeli wystąpią, będą pokazane przed potwierdzeniem płatności.`,
                    },
                    {
                        type: "paragraph",
                        text: `Dane kart płatniczych są obsługiwane przez ${siteConfig.paymentProcessorName} i nie są przechowywane bezpośrednio przez ${siteConfig.operatorName}.`,
                    },
                ],
            },
            {
                heading: "Wysyłka produktów fizycznych",
                body: [
                    {
                        type: "paragraph",
                        text: "Produkty fizyczne są wysyłane z Polski. Dostępne kraje dostawy, koszty wysyłki oraz szacowany czas dostawy będą pokazane przed płatnością.",
                    },
                    {
                        type: "paragraph",
                        text: "Niektóre produkty mogą być limitowane albo dostępne w przedsprzedaży. Jeżeli produkt wymaga czasu produkcji przed wysyłką, szacowany czas realizacji będzie pokazany przed zakupem.",
                    },
                ],
            },
            {
                heading: "Zwroty",
                body: [
                    {
                        type: "paragraph",
                        text: `Zwrot produktu fizycznego można zgłosić przez kontakt na ${siteConfig.contactEmail}. Produkt powinien być nieużywany, nieuszkodzony i zwrócony w pierwotnym stanie, chyba że bezwzględnie obowiązujące przepisy prawa przewidują inaczej.`,
                    },
                    {
                        type: "paragraph",
                        text: "Instrukcja zwrotu zostanie przekazana e-mailowo po weryfikacji zgłoszenia.",
                    },
                ],
            },
            {
                heading: "Refundacje i reklamacje produktów",
                body: [
                    {
                        type: "paragraph",
                        text: `Zgłoszenia refundacji lub reklamacji można wysyłać na ${siteConfig.contactEmail}. Jeżeli produkt jest wadliwy, uszkodzony, niedostarczony albo istotnie różni się od opisu, zgłoszenie powinno zawierać numer zamówienia oraz opis problemu.`,
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
                        text: "Zamówienie produktu fizycznego można anulować przed rozpoczęciem realizacji. Jeżeli zamówienie zostało już wysłane, może być konieczne skorzystanie z procedury zwrotu.",
                    },
                    {
                        type: "paragraph",
                        text: "Dla produktów w przedsprzedaży warunki anulowania będą pokazane przed płatnością.",
                    },
                ],
            },
            {
                heading: "QR i NFC w pinach",
                body: [
                    {
                        type: "paragraph",
                        text: "Niektóre edycje pinów mogą zawierać QR lub NFC, które otwierają informacje o fizycznym produkcie albo pozwalają powiązać pin z istniejącym profilem 28s. QR ani NFC nie służą do płatnego odblokowywania cyfrowych funkcji aplikacji.",
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
                        text: "Nazwa 28s, 28 Summits, wygląd strony i aplikacji, teksty, układ interfejsu, grafiki oraz elementy produktu stanowią własność operatora albo są używane na podstawie odpowiednich uprawnień. Korzystanie z usługi nie przenosi na użytkownika praw własności intelektualnej.",
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
            "Potrzebujesz pomocy z kontem, dostępem do danych, zamówieniem fizycznego produktu albo problemem technicznym? Napisz krótko, co się stało, na jakim urządzeniu i czego oczekiwałeś.",
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
