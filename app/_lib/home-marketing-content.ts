import type { SiteLocale } from "./site-content"

type HomeMarketingFeature = {
    title: string
    description: string
}

export type HomeMarketingFaq = {
    question: string
    answer: string
}

export type HomeMarketingContent = {
    metadata: {
        title: string
        description: string
    }
    eyebrow: string
    heading: string
    introduction: string
    features: readonly HomeMarketingFeature[]
    faqHeading: string
    faqs: readonly HomeMarketingFaq[]
    downloadLabel: string
}

export const homeMarketingContent = {
    pl: {
        metadata: {
            title: "28 gór – aplikacja do zdobywania polskich szczytów",
            description: "Planuj wejścia na 28 gór w Polsce, sprawdzaj szlaki i pogodę, potwierdzaj szczyty lokalizacją oraz zbieraj pieczątki, zdjęcia i historię wypraw.",
        },
        eyebrow: "Twoja górska kolekcja",
        heading: "Zaplanuj, zdobądź i zapamiętaj 28 gór",
        introduction: "28 gór to niezależna aplikacja turystyczna na iPhone’a. Pomaga wybrać kolejny szczyt, przygotować wejście i zachować całą wyprawę — od trasy i pogody po własne zdjęcia oraz ręcznie rysowaną pieczątkę.",
        features: [
            {
                title: "Przygotuj wejście",
                description: "Poznaj 28 gór polskich pasm. Porównaj szlaki, długość podejścia i przewyższenie, sprawdź pogodę, ostrzeżenia IMGW oraz pobliskie schroniska.",
            },
            {
                title: "Zbieraj wspomnienia",
                description: "Potwierdź obecność na szczycie lokalizacją, odblokuj ręcznie rysowaną pieczątkę, dodaj zdjęcia i ocenę, a historię wypraw oglądaj na mapie i osi czasu.",
            },
            {
                title: "Wracaj po więcej",
                description: "Odnajduj wcześniejsze wejścia dzięki położeniu zapisanemu w zdjęciach, odkrywaj gry i wyzwania oraz porównuj wyniki w rankingach.",
            },
        ],
        faqHeading: "Najczęstsze pytania o 28 gór",
        faqs: [
            {
                question: "Co to jest aplikacja 28 gór?",
                answer: "28 gór to niezależna aplikacja turystyczna, która łączy planowanie wejść, informacje o polskich górach, zdjęcia, dziennik wypraw, gry i kolekcję cyfrowych pieczątek.",
            },
            {
                question: "Jak zdobywa się pieczątkę?",
                answer: "Po dotarciu na szczyt aplikacja może potwierdzić obecność przy użyciu bieżącej lokalizacji. Wtedy odblokowuje unikalną, ręcznie rysowaną pieczątkę tej góry.",
            },
            {
                question: "Czy można dodać wcześniejsze wejścia?",
                answer: "Tak. Po wybraniu starszych zdjęć aplikacja może na urządzeniu odczytać zapisaną datę i położenie, aby pomóc dopasować je do odwiedzonych szczytów.",
            },
            {
                question: "Na jakich urządzeniach działa 28 gór?",
                answer: "Oficjalna wersja jest obecnie dostępna w App Store na iPhone’y z systemem iOS 17 lub nowszym.",
            },
        ],
        downloadLabel: "Pobierz 28 gór bezpłatnie z App Store",
    },
    en: {
        metadata: {
            title: "28 gór – an app for hiking Poland’s mountains",
            description: "Plan climbs across 28 mountains in Poland, compare trails and weather, verify summits by location, and collect stamps, photos, and trip memories.",
        },
        eyebrow: "Your mountain collection",
        heading: "Plan, climb, and remember 28 mountains",
        introduction: "28 gór is an independent hiking app for iPhone. It helps you choose the next summit, prepare your climb, and keep the whole trip together — from trails and weather to your photos and a hand-drawn stamp.",
        features: [
            {
                title: "Prepare your climb",
                description: "Explore 28 mountains across Poland’s ranges. Compare trails, approach distance, and elevation gain, then check the weather, active warnings, and nearby mountain huts.",
            },
            {
                title: "Collect memories",
                description: "Verify your summit visit by location, unlock a hand-drawn stamp, add photos and a rating, and revisit your hiking history on a map and timeline.",
            },
            {
                title: "Keep exploring",
                description: "Find earlier climbs from locations saved in your photos, discover games and challenges, and compare results on leaderboards.",
            },
        ],
        faqHeading: "Common questions about 28 gór",
        faqs: [
            {
                question: "What is the 28 gór app?",
                answer: "28 gór is an independent hiking app that brings together climb planning, information about Polish mountains, photos, a trip journal, games, and a collection of digital stamps.",
            },
            {
                question: "How do I collect a stamp?",
                answer: "When you reach a summit, the app can verify your visit using your current location. It then unlocks that mountain’s unique, hand-drawn stamp.",
            },
            {
                question: "Can I add earlier climbs?",
                answer: "Yes. After you select older photos, the app can read their saved date and location on your device to help match them with summits you visited.",
            },
            {
                question: "Which devices support 28 gór?",
                answer: "The official version is currently available on the App Store for iPhone with iOS 17 or later.",
            },
        ],
        downloadLabel: "Download 28 gór for free on the App Store",
    },
    es: {
        metadata: {
            title: "28 gór – una app para recorrer las montañas de Polonia",
            description: "Planifica ascensos a 28 montañas de Polonia, compara rutas y el tiempo, verifica cimas por ubicación y colecciona sellos, fotos y recuerdos.",
        },
        eyebrow: "Tu colección de montañas",
        heading: "Planifica, sube y recuerda 28 montañas",
        introduction: "28 gór es una app de senderismo independiente para iPhone. Te ayuda a elegir la próxima cima, preparar el ascenso y guardar toda la excursión: desde las rutas y el tiempo hasta tus fotos y un sello dibujado a mano.",
        features: [
            {
                title: "Prepara el ascenso",
                description: "Descubre 28 montañas de las sierras polacas. Compara rutas, distancia y desnivel, y consulta el tiempo, los avisos activos y los refugios cercanos.",
            },
            {
                title: "Colecciona recuerdos",
                description: "Verifica tu llegada a la cima mediante la ubicación, desbloquea un sello dibujado a mano, añade fotos y una valoración, y repasa tus excursiones en el mapa y la cronología.",
            },
            {
                title: "Sigue explorando",
                description: "Encuentra ascensos anteriores gracias a la ubicación guardada en tus fotos, descubre juegos y retos, y compara resultados en las clasificaciones.",
            },
        ],
        faqHeading: "Preguntas frecuentes sobre 28 gór",
        faqs: [
            {
                question: "¿Qué es la app 28 gór?",
                answer: "28 gór es una app de senderismo independiente que reúne la planificación de ascensos, información sobre montañas polacas, fotos, un diario de excursiones, juegos y una colección de sellos digitales.",
            },
            {
                question: "¿Cómo consigo un sello?",
                answer: "Al llegar a una cima, la app puede verificar tu visita mediante tu ubicación actual. Después desbloquea el sello único y dibujado a mano de esa montaña.",
            },
            {
                question: "¿Puedo añadir ascensos anteriores?",
                answer: "Sí. Tras seleccionar fotos antiguas, la app puede leer en el dispositivo la fecha y la ubicación guardadas para ayudarte a relacionarlas con las cimas visitadas.",
            },
            {
                question: "¿En qué dispositivos funciona 28 gór?",
                answer: "La versión oficial está disponible actualmente en App Store para iPhone con iOS 17 o posterior.",
            },
        ],
        downloadLabel: "Descarga gratis 28 gór en App Store",
    },
    de: {
        metadata: {
            title: "28 gór – die App für Polens Berge",
            description: "Plane Touren auf 28 Berge in Polen, vergleiche Wege und Wetter, bestätige Gipfel per Standort und sammle Stempel, Fotos und Erinnerungen.",
        },
        eyebrow: "Deine Bergsammlung",
        heading: "28 Berge planen, besteigen und in Erinnerung behalten",
        introduction: "28 gór ist eine unabhängige Wander-App für das iPhone. Sie hilft dir, den nächsten Gipfel auszuwählen, den Aufstieg vorzubereiten und die ganze Tour festzuhalten — von Wegen und Wetter bis zu deinen Fotos und einem handgezeichneten Stempel.",
        features: [
            {
                title: "Bereite den Aufstieg vor",
                description: "Entdecke 28 Berge in Polens Gebirgszügen. Vergleiche Wege, Zustiegslänge und Höhenmeter und prüfe Wetter, aktuelle Warnungen und nahe Berghütten.",
            },
            {
                title: "Sammle Erinnerungen",
                description: "Bestätige deinen Gipfelbesuch per Standort, schalte einen handgezeichneten Stempel frei, füge Fotos und eine Bewertung hinzu und sieh deine Touren auf Karte und Zeitleiste wieder an.",
            },
            {
                title: "Entdecke immer weiter",
                description: "Finde frühere Aufstiege über den in Fotos gespeicherten Standort, entdecke Spiele und Herausforderungen und vergleiche Ergebnisse in Ranglisten.",
            },
        ],
        faqHeading: "Häufige Fragen zu 28 gór",
        faqs: [
            {
                question: "Was ist die App 28 gór?",
                answer: "28 gór ist eine unabhängige Wander-App, die Tourenplanung, Informationen über polnische Berge, Fotos, ein Tourentagebuch, Spiele und eine Sammlung digitaler Stempel verbindet.",
            },
            {
                question: "Wie sammle ich einen Stempel?",
                answer: "Wenn du einen Gipfel erreichst, kann die App deinen Besuch über den aktuellen Standort bestätigen. Danach wird der einzigartige, handgezeichnete Stempel dieses Berges freigeschaltet.",
            },
            {
                question: "Kann ich frühere Touren hinzufügen?",
                answer: "Ja. Nach Auswahl älterer Fotos kann die App deren gespeichertes Datum und den Standort auf deinem Gerät lesen und sie so besuchten Gipfeln zuordnen.",
            },
            {
                question: "Welche Geräte unterstützen 28 gór?",
                answer: "Die offizielle Version ist derzeit im App Store für iPhones mit iOS 17 oder neuer erhältlich.",
            },
        ],
        downloadLabel: "28 gór kostenlos im App Store laden",
    },
    fr: {
        metadata: {
            title: "28 gór – l’app pour parcourir les montagnes de Pologne",
            description: "Planifie des ascensions sur 28 montagnes de Pologne, compare sentiers et météo, valide les sommets par localisation et collectionne tampons, photos et souvenirs.",
        },
        eyebrow: "Ta collection de montagnes",
        heading: "Planifie, gravis et garde en mémoire 28 montagnes",
        introduction: "28 gór est une app de randonnée indépendante pour iPhone. Elle t’aide à choisir le prochain sommet, préparer l’ascension et conserver toute la sortie — des sentiers et de la météo jusqu’à tes photos et un tampon dessiné à la main.",
        features: [
            {
                title: "Prépare l’ascension",
                description: "Découvre 28 montagnes des massifs polonais. Compare les sentiers, la distance d’approche et le dénivelé, puis consulte la météo, les alertes actives et les refuges proches.",
            },
            {
                title: "Collectionne les souvenirs",
                description: "Valide ton passage au sommet par localisation, débloque un tampon dessiné à la main, ajoute des photos et une note, puis retrouve tes sorties sur la carte et la chronologie.",
            },
            {
                title: "Continue d’explorer",
                description: "Retrouve d’anciennes ascensions grâce à la position enregistrée dans tes photos, découvre des jeux et des défis, et compare tes résultats dans les classements.",
            },
        ],
        faqHeading: "Questions fréquentes sur 28 gór",
        faqs: [
            {
                question: "Qu’est-ce que l’app 28 gór ?",
                answer: "28 gór est une app de randonnée indépendante qui réunit la préparation des ascensions, des informations sur les montagnes polonaises, les photos, un journal de sorties, des jeux et une collection de tampons numériques.",
            },
            {
                question: "Comment obtenir un tampon ?",
                answer: "Une fois au sommet, l’app peut valider ton passage grâce à ta position actuelle. Elle débloque ensuite le tampon unique et dessiné à la main de cette montagne.",
            },
            {
                question: "Puis-je ajouter d’anciennes ascensions ?",
                answer: "Oui. Après sélection d’anciennes photos, l’app peut lire sur l’appareil leur date et leur position enregistrées afin de les associer aux sommets visités.",
            },
            {
                question: "Quels appareils sont compatibles avec 28 gór ?",
                answer: "La version officielle est actuellement disponible sur l’App Store pour les iPhone équipés d’iOS 17 ou d’une version ultérieure.",
            },
        ],
        downloadLabel: "Télécharger gratuitement 28 gór sur l’App Store",
    },
    nb: {
        metadata: {
            title: "28 gór – appen for fotturer i Polens fjell",
            description: "Planlegg turer til 28 fjell i Polen, sammenlign ruter og vær, bekreft topper med posisjon og samle stempler, bilder og turminner.",
        },
        eyebrow: "Fjellsamlingen din",
        heading: "Planlegg, bestig og husk 28 fjell",
        introduction: "28 gór er en uavhengig turapp for iPhone. Den hjelper deg med å velge neste topp, forberede turen og samle hele opplevelsen på ett sted — fra ruter og vær til bildene dine og et håndtegnet stempel.",
        features: [
            {
                title: "Forbered turen",
                description: "Oppdag 28 fjell i Polens fjellområder. Sammenlign ruter, distanse og høydemeter, og sjekk været, aktive varsler og nærliggende fjellhytter.",
            },
            {
                title: "Samle minner",
                description: "Bekreft toppbesøket med posisjon, lås opp et håndtegnet stempel, legg til bilder og vurdering, og se turhistorikken på kart og tidslinje.",
            },
            {
                title: "Fortsett å utforske",
                description: "Finn tidligere turer via posisjonen som er lagret i bildene dine, oppdag spill og utfordringer, og sammenlign resultater på resultatlistene.",
            },
        ],
        faqHeading: "Vanlige spørsmål om 28 gór",
        faqs: [
            {
                question: "Hva er 28 gór-appen?",
                answer: "28 gór er en uavhengig turapp som samler turplanlegging, informasjon om polske fjell, bilder, en turdagbok, spill og en samling digitale stempler.",
            },
            {
                question: "Hvordan samler jeg et stempel?",
                answer: "Når du når toppen, kan appen bekrefte besøket med den nåværende posisjonen din. Deretter låses fjellets unike, håndtegnede stempel opp.",
            },
            {
                question: "Kan jeg legge til tidligere turer?",
                answer: "Ja. Når du velger eldre bilder, kan appen lese lagret dato og posisjon på enheten for å hjelpe deg med å knytte dem til topper du har besøkt.",
            },
            {
                question: "Hvilke enheter støtter 28 gór?",
                answer: "Den offisielle versjonen er nå tilgjengelig i App Store for iPhone med iOS 17 eller nyere.",
            },
        ],
        downloadLabel: "Last ned 28 gór gratis fra App Store",
    },
    cs: {
        metadata: {
            title: "28 gór – aplikace pro výlety do polských hor",
            description: "Plánuj výstupy na 28 hor v Polsku, porovnávej trasy a počasí, potvrzuj vrcholy polohou a sbírej razítka, fotky i vzpomínky.",
        },
        eyebrow: "Tvoje horská sbírka",
        heading: "Naplánuj, zdolej a uchovej si 28 hor",
        introduction: "28 gór je nezávislá turistická aplikace pro iPhone. Pomůže ti vybrat další vrchol, připravit výstup a uchovat celý výlet — od tras a počasí až po vlastní fotky a ručně kreslené razítko.",
        features: [
            {
                title: "Připrav výstup",
                description: "Poznej 28 hor v polských pohořích. Porovnej trasy, délku výstupu a převýšení a zkontroluj počasí, aktuální výstrahy i blízké horské chaty.",
            },
            {
                title: "Sbírej vzpomínky",
                description: "Potvrď návštěvu vrcholu pomocí polohy, odemkni ručně kreslené razítko, přidej fotky a hodnocení a prohlížej historii výletů na mapě a časové ose.",
            },
            {
                title: "Objevuj dál",
                description: "Najdi starší výstupy podle polohy uložené ve fotkách, objevuj hry a výzvy a porovnávej výsledky v žebříčcích.",
            },
        ],
        faqHeading: "Časté otázky o 28 gór",
        faqs: [
            {
                question: "Co je aplikace 28 gór?",
                answer: "28 gór je nezávislá turistická aplikace, která spojuje plánování výstupů, informace o polských horách, fotky, cestovní deník, hry a sbírku digitálních razítek.",
            },
            {
                question: "Jak získám razítko?",
                answer: "Po dosažení vrcholu může aplikace potvrdit tvoji návštěvu pomocí aktuální polohy. Potom odemkne jedinečné, ručně kreslené razítko dané hory.",
            },
            {
                question: "Mohu přidat starší výstupy?",
                answer: "Ano. Po výběru starších fotek může aplikace v zařízení přečíst uložené datum a polohu a pomoci je přiřadit k navštíveným vrcholům.",
            },
            {
                question: "Na kterých zařízeních 28 gór funguje?",
                answer: "Oficiální verze je nyní dostupná v App Store pro iPhone se systémem iOS 17 nebo novějším.",
            },
        ],
        downloadLabel: "Stáhnout 28 gór zdarma z App Store",
    },
    sk: {
        metadata: {
            title: "28 gór – aplikácia na výlety do poľských hôr",
            description: "Plánuj výstupy na 28 hôr v Poľsku, porovnávaj trasy a počasie, potvrdzuj vrcholy polohou a zbieraj pečiatky, fotky aj spomienky.",
        },
        eyebrow: "Tvoja horská zbierka",
        heading: "Naplánuj, zdolaj a uchovaj si 28 hôr",
        introduction: "28 gór je nezávislá turistická aplikácia pre iPhone. Pomôže ti vybrať ďalší vrchol, pripraviť výstup a uchovať celý výlet — od trás a počasia až po vlastné fotky a ručne kreslenú pečiatku.",
        features: [
            {
                title: "Priprav výstup",
                description: "Spoznaj 28 hôr v poľských pohoriach. Porovnaj trasy, dĺžku výstupu a prevýšenie a skontroluj počasie, aktuálne výstrahy aj blízke horské chaty.",
            },
            {
                title: "Zbieraj spomienky",
                description: "Potvrď návštevu vrcholu pomocou polohy, odomkni ručne kreslenú pečiatku, pridaj fotky a hodnotenie a prezeraj si históriu výletov na mape a časovej osi.",
            },
            {
                title: "Objavuj ďalej",
                description: "Nájdi staršie výstupy podľa polohy uloženej vo fotkách, objavuj hry a výzvy a porovnávaj výsledky v rebríčkoch.",
            },
        ],
        faqHeading: "Časté otázky o 28 gór",
        faqs: [
            {
                question: "Čo je aplikácia 28 gór?",
                answer: "28 gór je nezávislá turistická aplikácia, ktorá spája plánovanie výstupov, informácie o poľských horách, fotky, cestovný denník, hry a zbierku digitálnych pečiatok.",
            },
            {
                question: "Ako získam pečiatku?",
                answer: "Po dosiahnutí vrcholu môže aplikácia potvrdiť tvoju návštevu pomocou aktuálnej polohy. Potom odomkne jedinečnú, ručne kreslenú pečiatku danej hory.",
            },
            {
                question: "Môžem pridať staršie výstupy?",
                answer: "Áno. Po výbere starších fotiek môže aplikácia v zariadení prečítať uložený dátum a polohu a pomôcť ich priradiť k navštíveným vrcholom.",
            },
            {
                question: "Na ktorých zariadeniach 28 gór funguje?",
                answer: "Oficiálna verzia je teraz dostupná v App Store pre iPhone so systémom iOS 17 alebo novším.",
            },
        ],
        downloadLabel: "Stiahnuť 28 gór zadarmo z App Store",
    },
    uk: {
        metadata: {
            title: "28 gór — застосунок для походів польськими горами",
            description: "Плануй сходження на 28 гір у Польщі, порівнюй маршрути й погоду, підтверджуй вершини за геолокацією та збирай штампи, фото і спогади.",
        },
        eyebrow: "Твоя колекція гір",
        heading: "Плануй, підкорюй і зберігай у пам’яті 28 гір",
        introduction: "28 gór — це незалежний туристичний застосунок для iPhone. Він допомагає вибрати наступну вершину, підготувати сходження й зберегти всю мандрівку — від маршрутів і погоди до власних фото та намальованого вручну штампа.",
        features: [
            {
                title: "Підготуй сходження",
                description: "Відкрий 28 гір у польських гірських масивах. Порівняй маршрути, довжину підйому й набір висоти, перевір погоду, чинні попередження та найближчі гірські притулки.",
            },
            {
                title: "Збирай спогади",
                description: "Підтвердь відвідання вершини за геолокацією, відкрий намальований вручну штамп, додай фото й оцінку та переглядай історію мандрівок на мапі й часовій шкалі.",
            },
            {
                title: "Продовжуй відкривати",
                description: "Знаходь попередні сходження за геолокацією, збереженою у фото, відкривай ігри та виклики й порівнюй результати в рейтингах.",
            },
        ],
        faqHeading: "Поширені запитання про 28 gór",
        faqs: [
            {
                question: "Що таке застосунок 28 gór?",
                answer: "28 gór — це незалежний туристичний застосунок, що поєднує планування сходжень, інформацію про польські гори, фото, щоденник мандрівок, ігри та колекцію цифрових штампів.",
            },
            {
                question: "Як отримати штамп?",
                answer: "Коли ти досягнеш вершини, застосунок може підтвердити відвідання за поточною геолокацією. Після цього відкриється унікальний, намальований вручну штамп цієї гори.",
            },
            {
                question: "Чи можна додати попередні сходження?",
                answer: "Так. Після вибору старіших фото застосунок може прочитати на пристрої збережені дату й геолокацію та допомогти зіставити їх із відвіданими вершинами.",
            },
            {
                question: "На яких пристроях працює 28 gór?",
                answer: "Офіційна версія зараз доступна в App Store для iPhone з iOS 17 або новішою версією.",
            },
        ],
        downloadLabel: "Завантажити 28 gór безкоштовно з App Store",
    },
} as const satisfies Record<SiteLocale, HomeMarketingContent>
