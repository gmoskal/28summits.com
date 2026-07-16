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

    assert.match(polishPrivacy, /nazwa profilu/i)
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
    assert.equal(englishLegalDocuments.privacy.effectiveDate, "Effective date: July 16, 2026")
    assert.equal(englishLegalDocuments.terms.effectiveDate, "Effective date: July 16, 2026")
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

    for (const document of [
        legalDocuments.privacy,
        legalDocuments.terms,
        englishLegalDocuments.privacy,
        englishLegalDocuments.terms,
    ]) {
        const text = documentText(document)
        assert.match(text, /Async\.Studio/)
        assert.match(text, /Grzegorz Moskal/)
        assert.match(text, /NIP 7492012796/)
        assert.match(text, /Kolejowa 43, 57-220 Ziębice, Polska/)
        assert.doesNotMatch(text, /TODO|undefined|null/)
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
        assert.match(unlock, /same Apple ID|tego samego Apple ID/i)
        assert.match(unlock, /same 28 gór account|tego samego konta 28 gór/i)
        assert.match(unlock, /not a subscription|nie jest to subskrypcja/i)
    }

    for (const support of [polishSupport, englishSupport]) {
        assert.match(support, /Apple In-App Purchase/)
        assert.match(support, /consumable|konsumpcyjn/i)
        assert.match(support, /more than once|więcej niż raz/i)
        assert.match(support, /does not unlock|nie odblokowuje/i)
        assert.match(support, /not restorable|nie podlega przywracaniu/i)
    }

    for (const pins of [polishPins, englishPins]) {
        assert.match(pins, /Stripe/)
        assert.match(pins, /Apple Pay/)
        assert.match(pins, /BLIK/)
        assert.match(pins, /physical|fizyczn/i)
        assert.match(pins, /price|cen/i)
        assert.match(pins, /shipping|dostaw/i)
        assert.match(pins, /total|łączn/i)
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
        assert.match(complaint, /price reduction|obniżenia ceny/i)
        assert.match(complaint, /withdrawal|odstąpienia/i)
        assert.match(complaint, /Photos are helpful but optional|Zdjęcia są pomocne, ale nie są obowiązkowe/i)
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
        assert.match(privacy, /completed mountains|ukończone góry/i)
        assert.match(privacy, /leaderboard position|pozycja w rankingu/i)
        assert.match(privacy, /do not store full|nie przechowujemy pełnych/i)
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
