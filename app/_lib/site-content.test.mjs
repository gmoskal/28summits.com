import assert from "node:assert/strict"
import test from "node:test"
import { createJiti } from "jiti"

const {
    englishLegalDocuments,
    legalDocuments,
    legalLanguageNoticeByLocale,
    siteConfig,
    siteLocales,
} = await createJiti(import.meta.url).import("./site-content.ts")

function documentText(document) {
    return [...document.intro, ...document.sections
        .flatMap((section) => section.body)
        .flatMap((block) => (block.type === "paragraph" ? [block.text] : block.items))]
        .join(" ")
}

function sectionText(document, heading) {
    const section = document.sections.find((candidate) => candidate.heading === heading)
    assert.ok(section, `Missing legal section: ${heading}`)

    return section.body
        .flatMap((block) => (block.type === "paragraph" ? [block.text] : block.items))
        .join(" ")
}

test("public profile is explicitly covered by the Polish privacy policy", () => {
    const polishPrivacy = documentText(legalDocuments.privacy)

    assert.match(polishPrivacy, /nazwa profilu|nazwa wyświetlana/i)
    assert.match(polishPrivacy, /avatar|zdjęcie profilowe/i)
    assert.match(polishPrivacy, /publiczn/i)
    assert.match(polishPrivacy, /ranking/i)
})

test("public profile is explicitly covered by the English privacy policy", () => {
    const englishPrivacy = documentText(englishLegalDocuments.privacy)

    assert.match(englishPrivacy, /profile name|display name/i)
    assert.match(englishPrivacy, /avatar|profile photo|profile picture/i)
    assert.match(englishPrivacy, /public/i)
    assert.match(englishPrivacy, /ranking|leaderboard/i)
})

test("Polish and English legal documents use the release effective date and aligned sections", () => {
    assert.equal(legalDocuments.privacy.effectiveDate, "Obowiązuje od 16 lipca 2026 r.")
    assert.equal(legalDocuments.terms.effectiveDate, "Obowiązuje od 16 lipca 2026 r.")
    assert.equal(legalDocuments.privacy.updatedDate, "Ostatnia aktualizacja: 20 lipca 2026 r., 18:00 CEST (UTC+02:00, Europe/Warsaw)")
    assert.equal(legalDocuments.terms.updatedDate, "Ostatnia aktualizacja: 20 lipca 2026 r., 18:00 CEST (UTC+02:00, Europe/Warsaw)")
    assert.equal(englishLegalDocuments.privacy.effectiveDate, "Effective date: July 16, 2026")
    assert.equal(englishLegalDocuments.terms.effectiveDate, "Effective date: July 16, 2026")
    assert.equal(englishLegalDocuments.privacy.updatedDate, "Last updated: July 20, 2026, 18:00 CEST (UTC+02:00, Europe/Warsaw)")
    assert.equal(englishLegalDocuments.terms.updatedDate, "Last updated: July 20, 2026, 18:00 CEST (UTC+02:00, Europe/Warsaw)")
    assert.equal(legalDocuments.privacy.sections.length, englishLegalDocuments.privacy.sections.length)
    assert.equal(legalDocuments.terms.sections.length, englishLegalDocuments.terms.sections.length)

    for (const document of [
        legalDocuments.privacy,
        legalDocuments.terms,
        englishLegalDocuments.privacy,
        englishLegalDocuments.terms,
    ]) {
        assert.doesNotMatch(documentText(document), /planowanej aplikacji|premier|pre-launch|planned (?:app|launch)|before public launch/i)
    }
})

test("public legal identity uses verified business fields", () => {
    assert.equal(siteConfig.operatorTradingName, "Async.Studio")
    assert.equal(siteConfig.operatorTaxId, "7492012796")
    assert.equal(siteConfig.operatorAddress, "Kolejowa 43, 57-220 Ziębice, Polska")
    assert.equal(siteConfig.registeredOperatorName, "Async.Studio Grzegorz Moskal")
    assert.equal(siteConfig.contactPhone, "+48 537 765 122")

    const allDocuments = [
        legalDocuments.privacy,
        legalDocuments.terms,
        englishLegalDocuments.privacy,
        englishLegalDocuments.terms,
    ]
    for (const document of allDocuments) {
        const text = documentText(document)
        assert.match(text, /Async\.Studio/)
        assert.match(text, /Grzegorz Moskal/)
        assert.match(text, /NIP: 7492012796/)
        assert.doesNotMatch(text, /TODO|undefined|null/)
    }

    for (const document of [legalDocuments.privacy, legalDocuments.terms]) {
        assert.match(documentText(document), /Kolejowa 43, 57-220 Ziębice, Polska/)
    }

    for (const document of [englishLegalDocuments.privacy, englishLegalDocuments.terms]) {
        const text = documentText(document)
        assert.match(text, /Kolejowa 43, 57-220 Ziębice, Poland/)
        assert.doesNotMatch(text, /Polska/)
    }

    for (const terms of [legalDocuments.terms, englishLegalDocuments.terms]) {
        assert.match(documentText(terms), /\+48 537 765 122/)
    }
})

test("terms keep the three payment models separate in both languages", () => {
    const polishUnlock = sectionText(legalDocuments.terms, "Jednorazowe odblokowanie pełnego dostępu do gier")
    const polishSupport = sectionText(legalDocuments.terms, "Dobrowolne wsparcie „Nakarm Ryska”")
    const polishPins = sectionText(legalDocuments.terms, "Fizyczne metalowe piny")
    const englishUnlock = sectionText(englishLegalDocuments.terms, "One-time full game unlock")
    const englishSupport = sectionText(englishLegalDocuments.terms, "Voluntary “Feed Rysek” support")
    const englishPins = sectionText(englishLegalDocuments.terms, "Physical metal pins")

    for (const unlock of [polishUnlock, englishUnlock]) {
        assert.match(unlock, /Apple In-App Purchase/)
        assert.match(unlock, /non-consumable|niekonsumpcyjn/i)
        assert.match(unlock, /restore|przywróć|odtworzyć/i)
        assert.match(unlock, /same Apple ID|tego samego Apple ID/i)
        assert.match(unlock, /authenticated 28 gór account|uwierzytelnionego konta 28 gór/i)
        assert.match(unlock, /new account|nowego konta/i)
        assert.match(unlock, /not a subscription|nie jest to subskrypcja/i)
    }

    for (const support of [polishSupport, englishSupport]) {
        assert.match(support, /Apple In-App Purchase/)
        assert.match(support, /consumable|konsumpcyjn/i)
        assert.match(support, /more than once|więcej niż raz/i)
        assert.match(support, /does not unlock|nie odblokowuje/i)
        assert.match(support, /cannot be restored|nie podlega przywracaniu/i)
        assert.match(support, /one or more price options|jednym lub kilku wariantach cenowych/i)
    }

    for (const pins of [polishPins, englishPins]) {
        assert.match(pins, /Stripe/)
        assert.match(pins, /Apple Pay/)
        assert.match(pins, /BLIK/)
        assert.match(pins, /physical|fizyczn/i)
        assert.match(pins, /price|cen/i)
        assert.match(pins, /delivery|shipping|dostaw/i)
        assert.match(pins, /total|łączn/i)
        assert.match(pins, /not Apple In-App Purchases|Nie są Apple In-App Purchase/i)
    }

    assert.match(polishPins, /Przed złożeniem zamówienia użytkownik otrzymuje informacje o produkcie, cenie, kosztach dostawy, łącznej kwocie oraz dostęp do danych sprzedawcy i warunków sprzedaży/)
    assert.match(polishPins, /Dane sprzedawcy oraz informacje dotyczące zamówienia są również przekazywane lub udostępniane w potwierdzeniu zamówienia/)
    assert.match(englishPins, /Before placing an order, the user receives information about the product, its price, delivery costs, the total amount, and access to the seller’s identifying details and the applicable sales terms/)
    assert.match(englishPins, /The seller’s details and information relating to the order are also provided or made available in the order confirmation/)

    const termsText = `${documentText(legalDocuments.terms)} ${documentText(englishLegalDocuments.terms)}`
    assert.doesNotMatch(termsText, /four (?:support products|support options|price options)|cztery (?:warianty|opcje|produkty wsparcia)/i)
    assert.doesNotMatch(termsText, /checkout and the order confirmation show|Checkout i potwierdzenie zamówienia pokazują/i)
    assert.doesNotMatch(termsText, /checkout (?:shows|displays) (?:the )?(?:complete|full) seller(?:’s|'s)? (?:address|details)|checkout pokazuje pełne dane sprzedawcy/i)

    const alignedSectionPairs = [
        ["Treści użytkownika i moderacja", "User content and moderation"],
        ["Jednorazowe odblokowanie pełnego dostępu do gier", "One-time full game unlock"],
        ["Dobrowolne wsparcie „Nakarm Ryska”", "Voluntary “Feed Rysek” support"],
        ["Fizyczne metalowe piny", "Physical metal pins"],
    ]
    assert.deepEqual(
        alignedSectionPairs.map(([polishHeading]) => legalDocuments.terms.sections.findIndex(({ heading }) => heading === polishHeading)),
        alignedSectionPairs.map(([, englishHeading]) => englishLegalDocuments.terms.sections.findIndex(({ heading }) => heading === englishHeading)),
    )
    assert.deepEqual(
        legalDocuments.terms.sections.map(({ body }) => body.length),
        englishLegalDocuments.terms.sections.map(({ body }) => body.length),
    )
})

test("terms describe available reporting channels without claiming dedicated actions", () => {
    const polishModeration = sectionText(legalDocuments.terms, "Treści użytkownika i moderacja")
    const englishModeration = sectionText(englishLegalDocuments.terms, "User content and moderation")

    assert.match(polishModeration, /Komentarze i inne treści można zgłaszać za pomocą dostępnych funkcji w aplikacji/)
    assert.match(polishModeration, /Punktem kontaktowym.*rysek@28gor\.app/)
    assert.match(polishModeration, /dokładne miejsce lub identyfikator/)
    assert.match(polishModeration, /dokładne i kompletne/)
    assert.match(englishModeration, /Comments and other content can be reported using the reporting features available in the app/)
    assert.match(englishModeration, /contact point.*rysek@28gor\.app/)
    assert.match(englishModeration, /exact location or identifier/)
    assert.match(englishModeration, /accurate and complete/)

    for (const moderation of [polishModeration, englishModeration]) {
        assert.doesNotMatch(moderation, /dedicated report|osobn(?:a|ą|ej) funkcj(?:a|ę|i) zgłoszenia|blocking users|blokowanie użytkowników/i)
    }
})

test("physical withdrawal and complaint sections include the required consumer safeguards", () => {
    const polishWithdrawal = sectionText(legalDocuments.terms, "Odstąpienie od zakupu fizycznego pina")
    const englishWithdrawal = sectionText(englishLegalDocuments.terms, "Withdrawal from a physical-pin purchase")
    const polishComplaint = sectionText(legalDocuments.terms, "Reklamacje fizycznych pinów")
    const englishComplaint = sectionText(englishLegalDocuments.terms, "Complaints about physical pins")

    for (const withdrawal of [polishWithdrawal, englishWithdrawal]) {
        assert.match(withdrawal, /14/)
        assert.match(withdrawal, /open|otworzyć/i)
        assert.match(withdrawal, /diminished value|zmniejszenie wartości/i)
        assert.match(withdrawal, /least expensive standard delivery|najtańszej oferowanej zwykłej dostawy/i)
        assert.match(withdrawal, /original payment method|tą samą metodą płatności/i)
        assert.match(withdrawal, /proof|dowodu/i)
        assert.match(withdrawal, /prior approval is not required|nie jest potrzebna wcześniejsza zgoda/i)
    }

    for (const complaint of [polishComplaint, englishComplaint]) {
        assert.match(complaint, /repair|napraw/i)
        assert.match(complaint, /replacement|wymian/i)
        assert.match(complaint, /price reduction|obniżeni[ae] ceny/i)
        assert.match(complaint, /withdrawal|odstąpienia/i)
        assert.match(complaint, /Photos are helpful but optional|Zdjęcia są pomocne, ale nie są obowiązkowe/i)
        assert.match(complaint, /two years|dwóch lat/i)
        assert.match(complaint, /disproportionate costs|nadmiernych kosztów/i)
        assert.match(complaint, /burden of proving|ciężar wykazania/i)
    }
})

test("terms address hostile-customer abuse without removing mandatory consumer rights", () => {
    const polishDelivery = sectionText(legalDocuments.terms, "Dostawa fizycznych pinów")
    const englishDelivery = sectionText(englishLegalDocuments.terms, "Delivery of physical pins")
    const polishWithdrawal = sectionText(legalDocuments.terms, "Odstąpienie od zakupu fizycznego pina")
    const englishWithdrawal = sectionText(englishLegalDocuments.terms, "Withdrawal from a physical-pin purchase")
    const polishDisputes = sectionText(legalDocuments.terms, "Spory płatnicze i podwójne zwroty")
    const englishDisputes = sectionText(englishLegalDocuments.terms, "Payment disputes and duplicate refunds")
    const polishAbuse = sectionText(legalDocuments.terms, "Nadużycia usługi i kontaktu")
    const englishAbuse = sectionText(englishLegalDocuments.terms, "Service and contact abuse")

    for (const delivery of [polishDelivery, englishDelivery]) {
        assert.match(delivery, /risk.*receipt|Ryzyko.*otrzymaniu/i)
        assert.match(delivery, /actually incurred and documented|rzeczywiście poniesionych i udokumentowanych/i)
        assert.match(delivery, /does not limit complaint or withdrawal rights|nie ogranicza prawa do reklamacji ani odstąpienia/i)
    }

    for (const withdrawal of [polishWithdrawal, englishWithdrawal]) {
        assert.match(withdrawal, /empty parcel|pustej przesyłki/i)
        assert.match(withdrawal, /contrary evidence|dowody przeciwne/i)
        assert.match(withdrawal, /Original packaging.*not a condition|Oryginalne opakowanie.*nie są warunkiem/i)
    }

    for (const disputes of [polishDisputes, englishDisputes]) {
        assert.match(disputes, /right to dispute|prawo do zakwestionowania/i)
        assert.match(disputes, /more than one source|więcej niż jednego źródła/i)
        assert.match(disputes, /actual documented loss|rzeczywiście poniesionej i udokumentowanej szkody/i)
        assert.match(disputes, /no penalty or chargeback fee|nie ustanawia kary ani opłaty za chargeback/i)
    }

    for (const abuse of [polishAbuse, englishAbuse]) {
        assert.match(abuse, /false reports|fałszywych zgłoszeń/i)
        assert.match(abuse, /statutory complaint|ustawowej reklamacji/i)
        assert.match(abuse, /necessary scope and duration|potrzebnego zakresu i czasu/i)
    }
})

test("privacy policies cover transaction, order, ranking, verification, and moderation data", () => {
    for (const privacy of [documentText(legalDocuments.privacy), documentText(englishLegalDocuments.privacy)]) {
        assert.match(privacy, /StoreKit/)
        assert.match(privacy, /Stripe/)
        assert.match(privacy, /transaction|transakcj/i)
        assert.match(privacy, /delivery address|adres dostawy/i)
        assert.match(privacy, /payment status|status płatności/i)
        assert.match(privacy, /score verification|weryfikacji wyników/i)
        assert.match(privacy, /moderation reports|zgłoszenia moderacyjne/i)
        assert.match(privacy, /chargeback|sporu płatniczego/i)
        assert.match(privacy, /empty parcel|pustej przesyłki/i)
        assert.match(privacy, /carrier events|zdarzenia przewoźnika/i)
        assert.match(privacy, /challenge the outcome|zakwestionować wynik/i)
        assert.match(privacy, /completed mountains|ukończone góry/i)
        assert.match(privacy, /leaderboard position|pozycja w rankingu/i)
        assert.match(privacy, /does? not store full|nie (?:przechowujemy|przechowuje) pełnych/i)
    }
})

test("privacy policies match the audited location, photo, deletion, and provider flows", () => {
    const polishPrivacy = documentText(legalDocuments.privacy)
    const englishPrivacy = documentText(englishLegalDocuments.privacy)

    for (const privacy of [polishPrivacy, englishPrivacy]) {
        assert.match(privacy, /precise location|dokładnej lokalizacji/i)
        assert.match(privacy, /background location|lokalizacji w tle/i)
        assert.match(privacy, /not sent to the backend|nie są wysyłane do backendu/i)
        assert.match(privacy, /EXIF/)
        assert.match(privacy, /original metadata|oryginalnymi metadanymi/i)
        assert.match(privacy, /avatar.*JPEG.*without metadata|Avatar.*JPEG bez metadanych/i)
        assert.match(privacy, /StoreKit transaction ledger|rejestr transakcji StoreKit/i)
        assert.match(privacy, /random technical identifier.*does not contain the former account identifier|losowy identyfikator techniczny bez dawnego identyfikatora konta/i)
        assert.match(privacy, /pseudonymized|pseudonimizowane/i)
        assert.match(privacy, /within one month|w ciągu miesiąca/i)
        assert.match(privacy, /requires a separate choice|wymaga osobnego wyboru/i)
        assert.match(privacy, /Neither option is selected by default|Żadna opcja nie jest domyślnie zaznaczona/i)
        assert.match(privacy, /Shown on leaderboards as|W rankingach jako/i)
        assert.match(privacy, /Firebase/)
        assert.match(privacy, /InPost/)
        assert.match(privacy, /Resend/)
        assert.match(privacy, /OpenAI/)
        assert.match(privacy, /Meta/)
    }

    assert.deepEqual(
        legalDocuments.privacy.sections.map(({ body }) => body.length),
        englishLegalDocuments.privacy.sections.map(({ body }) => body.length),
    )
})

test("privacy policies fully disclose the planned iOS analytics and crash reporting", () => {
    const polishAnalytics = sectionText(legalDocuments.privacy, "Analityka, diagnostyka, reklama i pamięć lokalna")
    const englishAnalytics = sectionText(englishLegalDocuments.privacy, "Analytics, diagnostics, advertising, and local storage")
    const polishRetention = sectionText(legalDocuments.privacy, "Okres przechowywania i usunięcie konta")
    const englishRetention = sectionText(englishLegalDocuments.privacy, "Retention and account deletion")

    for (const analytics of [polishAnalytics, englishAnalytics]) {
        assert.match(analytics, /Google Analytics for Firebase/)
        assert.match(analytics, /Crashlytics/)
        assert.match(analytics, /BigQuery/)
        assert.match(analytics, /app instance identifier|identyfikator instancji aplikacji/i)
        assert.match(analytics, /screens and interface elements|ekrany i elementy interfejsu/i)
        assert.match(analytics, /testerAccount/)
        assert.match(analytics, /email.*Firebase Auth UID|e-mail.*UID Firebase Auth/i)
        assert.match(analytics, /precise GPS coordinates|dokładnych współrzędnych GPS/i)
        assert.match(analytics, /IDFA/)
        assert.match(analytics, /ad personalization|personalizacj[ai] reklam/i)
        assert.match(analytics, /collected automatically|zbierane automatycznie/i)
        assert.match(analytics, /legitimate interest|prawnie uzasadnionym interesie/i)
        assert.match(analytics, /right to object|prawo sprzeciwu/i)
    }

    for (const retention of [polishRetention, englishRetention]) {
        assert.match(retention, /14 months|14 miesięcy/i)
        assert.match(retention, /24 months|24 miesiące/i)
        assert.match(retention, /90 days|90 dni/i)
    }

    assert.match(polishAnalytics, /statystyk produktu.*nie wykorzystujemy ich do reklam/i)
    assert.match(englishAnalytics, /product statistics.*do not use (?:it|them) for advertising/i)
})

test("terms describe analytics as automatic legitimate-interest processing", () => {
    const polishAnalytics = sectionText(legalDocuments.terms, "Analityka i diagnostyka")
    const englishAnalytics = sectionText(englishLegalDocuments.terms, "Analytics and diagnostics")

    for (const analytics of [polishAnalytics, englishAnalytics]) {
        assert.match(analytics, /Google Analytics for Firebase/)
        assert.match(analytics, /Crashlytics/)
        assert.match(analytics, /Privacy Policy|Polityk[ai] prywatności/i)
        assert.match(analytics, /collected automatically|zbierane automatycznie/i)
        assert.match(analytics, /legitimate interest|prawnie uzasadnionym interesie/i)
        assert.match(analytics, /right to object|prawo sprzeciwu/i)
        assert.match(analytics, /behavioral advertising|reklam behawioralnych/i)
    }

    assert.match(polishAnalytics, /statystyk produktu.*nie służą reklamom/i)
    assert.match(englishAnalytics, /product statistics.*not for advertising/i)
})

test("terms cover contract formation, payment, safety, digital conformity, durable records, and ADR", () => {
    const polishTerms = documentText(legalDocuments.terms)
    const englishTerms = documentText(englishLegalDocuments.terms)

    for (const terms of [polishTerms, englishTerms]) {
        assert.match(terms, /durable medium|trwałym nośniku/i)
        assert.match(terms, /obligation to pay|obowiązk(?:iem|u) zapłaty/i)
        assert.match(terms, /not a toy|nie jest zabawką/i)
        assert.match(terms, /sharp point|ostre zakończenie/i)
        assert.match(terms, /digital content (?:or|and) services|treści i usług cyfrowych/i)
        assert.match(terms, /14 days|14 dni/i)
        assert.match(terms, /model (?:withdrawal )?(?:statement|form)|Wzór oświadczenia/i)
        assert.match(terms, /out-of-court|Pozasądowe/i)
        assert.match(terms, /records? the accepted version identifier|zapisuje identyfikator zaakceptowanej wersji/i)
        assert.match(terms, /express prior consent|wyraźnej uprzedniej zgodzie/i)
        assert.match(terms, /postal and electronic addresses|adres pocztowy i elektroniczny/i)
        assert.match(terms, /last resort|środkiem ostatecznym/i)
    }
})

test("user-facing legal copy does not use en or em dashes", () => {
    for (const document of [
        legalDocuments.privacy,
        legalDocuments.terms,
        englishLegalDocuments.privacy,
        englishLegalDocuments.terms,
    ]) {
        assert.doesNotMatch(documentText(document), /[\u2013\u2014]/)
    }
})

test("every locale's legal-language notice includes the mandatory-law qualification", () => {
    const expectedPolishNotice = "Dokumenty prawne są dostępne po polsku i angielsku. W razie rozbieżności pierwszeństwo ma wersja polska, w zakresie dozwolonym przez bezwzględnie obowiązujące przepisy prawa."
    const expectedEnglishNotice = "The legal documents are available in Polish and English. If there is any inconsistency, the Polish version prevails to the extent permitted by mandatory applicable law."

    assert.equal(legalLanguageNoticeByLocale.pl.body, expectedPolishNotice)
    assert.equal(legalLanguageNoticeByLocale.en.body, expectedEnglishNotice)
    for (const locale of siteLocales) {
        assert.match(legalLanguageNoticeByLocale[locale].body, /pol|polsk|polon|poľ|поль/i)
        assert.ok(legalLanguageNoticeByLocale[locale].body.length > 100)
    }
})
