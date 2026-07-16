import type { LegalDocument, LegalSection, LegalTextBlock } from "./site-content"

type LegalSiteConfig = {
    readonly contactEmail: string
    readonly operatorAddress: string
    readonly operatorTaxId: string
    readonly operatorTradingName: string
    readonly paymentProcessorName: string
    readonly registeredOperatorName: string
    readonly siteHost: string
}

type LegalDocuments = Record<LegalDocument["slug"], LegalDocument>

const paragraph = (text: string): LegalTextBlock => ({ type: "paragraph", text })
const list = (...items: string[]): LegalTextBlock => ({ type: "list", items })
const section = (heading: string, ...body: LegalTextBlock[]): LegalSection => ({ heading, body })

export function createLegalDocuments(config: LegalSiteConfig): {
    en: LegalDocuments
    pl: LegalDocuments
} {
    const publicOperatorName = config.registeredOperatorName.trim() || config.operatorTradingName
    const operatorIdentity = `${publicOperatorName}, NIP ${config.operatorTaxId}, ${config.operatorAddress}`

    const pl: LegalDocuments = {
        privacy: {
            slug: "privacy",
            title: "Polityka prywatności",
            effectiveDate: "Obowiązuje od 16 lipca 2026 r.",
            intro: [
                `Ta polityka opisuje, jak ${publicOperatorName}, operator 28 gór, przetwarza dane osobowe użytkowników aplikacji 28 gór i strony ${config.siteHost}.`,
                "Obejmuje ona konta, postęp górski, treści użytkowników, publiczne profile i rankingi, zakupy w App Store oraz zamówienia fizycznych pinów.",
            ],
            sections: [
                section(
                    "Administrator i kontakt",
                    paragraph(`Administratorem danych osobowych jest ${operatorIdentity}.`),
                    paragraph(`W sprawach prywatności, danych osobowych i obsługi użytkownika napisz na ${config.contactEmail}.`),
                ),
                section(
                    "Zakres przetwarzanych danych",
                    list(
                        "dane konta i kontaktowe: identyfikator użytkownika, adres e-mail, dostawca logowania, nazwa profilu (nazwa wyświetlana), avatar, ustawienia i zgody profilu,",
                        "dane korzystania z aplikacji: zaplanowane i ukończone szczyty, kolekcja pieczątek, daty wejść, zdjęcia, podpisy, notatki, oceny, preferencje i stan synchronizacji,",
                        "dane publiczne: nazwa wyświetlana, zaakceptowany avatar, ukończone góry, pieczątki, wyniki gier, pozycja w rankingu i czas osiągnięcia wyniku, stosownie do ustawień użytkownika,",
                        "dane służące weryfikacji wyników i uczciwej gry, w tym identyfikatory próby, wynik, czas, sygnały integralności urządzenia i informacje o podejrzanej lub niemożliwej do zweryfikowania aktywności,",
                        "treści użytkownika: zdjęcia, podpisy, notatki, oceny, komentarze, pseudonim, avatar i elementy publicznego profilu,",
                        "zgłoszenia moderacyjne: identyfikator zgłaszającego, zgłoszona treść lub konto, przyczyna, status i wynik rozpatrzenia,",
                        "dane techniczne i bezpieczeństwa: adres IP, typ urządzenia, system, wersja aplikacji lub przeglądarki, identyfikatory instalacji i diagnostyczne, logi błędów oraz przybliżony region,",
                        "dane zakupów Apple: identyfikator produktu StoreKit, identyfikatory transakcji i transakcji pierwotnej, status weryfikacji, uprawnienia, anulowanie lub zwrot; nie otrzymujemy pełnych danych płatniczych konta App Store,",
                        "dane zamówień pinów: imię i nazwisko, e-mail, adres dostawy, kraj, wybrane produkty, cena, dostawa, suma, status realizacji oraz status płatności przekazany przez Stripe,",
                        "korespondencja z obsługą, reklamacje, odstąpienia od umowy i informacje potrzebne do ich rozpatrzenia.",
                    ),
                ),
                section(
                    "Cele i podstawy prawne",
                    list(
                        "utworzenie i obsługa konta, synchronizacja, dziennik górski, rankingi, zakupione funkcje i realizacja zamówień — wykonanie umowy, art. 6 ust. 1 lit. b RODO,",
                        "obsługa płatności, dostawy, odstąpień, reklamacji i kontaktu z użytkownikiem — wykonanie umowy lub działania przed jej zawarciem, art. 6 ust. 1 lit. b RODO,",
                        "rachunkowość, podatki i obowiązki konsumenckie — obowiązek prawny, art. 6 ust. 1 lit. c RODO,",
                        "bezpieczeństwo, zapobieganie nadużyciom, weryfikacja wyników, moderacja, diagnostyka i dochodzenie roszczeń — prawnie uzasadniony interes administratora i społeczności, art. 6 ust. 1 lit. f RODO,",
                        "publikacja opcjonalnej nazwy i avatara oraz funkcje wymagające uprawnień urządzenia — zgodnie z wyborem i ustawieniami użytkownika; gdy prawo wymaga zgody, art. 6 ust. 1 lit. a RODO.",
                    ),
                ),
                section(
                    "Publiczne profile i rankingi",
                    paragraph("W rankingu mogą być widoczne: nazwa wyświetlana, zaakceptowany avatar, ukończone góry lub pieczątki, wynik, pozycja i czas osiągnięcia. Techniczny identyfikator konta nie jest pokazywany jako element publicznego profilu."),
                    paragraph("Użytkownik może zmieniać ustawienia publikacji nazwy i avatara. Po ich wyłączeniu odpowiednie wpisy są anonimizowane lub aktualizowane w zakresie technicznie możliwym; zmiana może wymagać krótkiego czasu na przeliczenie zapisanych rankingów."),
                ),
                section(
                    "Weryfikacja wyników i moderacja",
                    paragraph("Wyniki, nazwy, avatary i inne treści mogą być sprawdzane automatycznie oraz przez upoważnione osoby w celu ochrony społeczności, praw osób trzecich i uczciwej rywalizacji. Podejrzane, zmanipulowane albo niemożliwe do zweryfikowania wyniki mogą zostać pominięte, usunięte lub ponownie przeliczone."),
                    paragraph(`Zastrzeżenia do moderacji lub wyniku można zgłosić przez dostępną funkcję zgłoszenia albo na ${config.contactEmail}.`),
                ),
                section(
                    "Płatności i zamówienia",
                    paragraph("Odblokowanie pełnego dostępu do gier oraz dobrowolne wsparcie „Nakarm Ryska” są osobnymi zakupami w aplikacji obsługiwanymi przez Apple. Otrzymujemy dane potrzebne do zweryfikowania produktu, transakcji, uprawnienia, anulowania lub zwrotu, ale nie pełne dane płatnicze Apple ID."),
                    paragraph(`Fizyczne metalowe piny są sprzedawane oddzielnie. ${config.paymentProcessorName} obsługuje płatność i przekazuje status transakcji. Dostępne metody mogą obejmować Apple Pay i BLIK, zależnie od urządzenia, banku, kraju i bieżącej konfiguracji. Nie przechowujemy pełnych numerów kart, kodów BLIK ani innych pełnych danych uwierzytelniających płatność.`),
                ),
                section(
                    "Uprawnienia urządzenia",
                    paragraph("Aplikacja prosi o dostęp do funkcji urządzenia tylko wtedy, gdy jest on potrzebny. Uprawnienia można później zmienić w ustawieniach systemu."),
                    list(
                        "lokalizacja pomaga pokazywać pobliskie szczyty, obliczać odległość lub potwierdzać kontekst wejścia,",
                        "aparat i biblioteka zdjęć służą do dodawania zdjęć oraz avatara,",
                        "powiadomienia służą do komunikatów i przypomnień włączonych przez użytkownika."
                    ),
                ),
                section(
                    "Cookies i pamięć lokalna strony",
                    paragraph("Strona używa niezbędnej pamięci przeglądarki, takiej jak localStorage, aby zapamiętać język, motyw i ustawienia interfejsu. Analityka lub technologie niewymagane do działania strony będą używane tylko na podstawie właściwej podstawy prawnej, w tym zgody, jeżeli jest wymagana."),
                ),
                section(
                    "Odbiorcy danych",
                    list(
                        "dostawcy hostingu, baz danych, uwierzytelniania, przechowywania plików, powiadomień, diagnostyki i bezpieczeństwa,",
                        "Apple w związku z App Store, StoreKit, zakupami w aplikacji i zwrotami,",
                        `${config.paymentProcessorName}, banki i dostawcy metod płatności w związku z zakupem fizycznych pinów,`,
                        "przewoźnicy i podmioty realizujące produkcję lub wysyłkę zamówień,",
                        "dostawcy narzędzi moderacyjnych oraz doradcy prawni, księgowi, sądy i organy publiczne, gdy wymaga tego prawo."
                    ),
                    paragraph("Nie sprzedajemy danych osobowych. Odbiorcy otrzymują wyłącznie dane potrzebne do wykonania ich zadań."),
                ),
                section(
                    "Przekazywanie danych poza EOG",
                    paragraph("Niektórzy dostawcy mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. Stosujemy wtedy mechanizmy dozwolone przez RODO, w szczególności decyzję stwierdzającą odpowiedni stopień ochrony albo standardowe klauzule umowne wraz z wymaganymi zabezpieczeniami."),
                ),
                section(
                    "Okres przechowywania i usunięcie konta",
                    list(
                        "dane konta i treści prywatne przechowujemy do usunięcia konta lub do chwili, gdy nie są już potrzebne do świadczenia usługi,",
                        "publiczne wpisy rankingowe i recenzje po usunięciu konta usuwamy albo anonimizujemy, jeżeli ich zachowanie jest potrzebne dla spójności usługi,",
                        "dane zamówień, płatności, zwrotów i reklamacji przechowujemy przez okres wymagany przez przepisy podatkowe, rachunkowe, konsumenckie i przedawnienie roszczeń,",
                        "logi bezpieczeństwa i diagnostyki przechowujemy przez okres proporcjonalny do celu,",
                        "kopie zapasowe są nadpisywane zgodnie z cyklem retencji; usunięte dane mogą pozostawać w zabezpieczonych kopiach do ich planowego nadpisania i nie są używane do zwykłej obsługi."
                    ),
                    paragraph("Zweryfikowany użytkownik może rozpocząć usunięcie konta w ustawieniach aplikacji. Samo odinstalowanie aplikacji nie usuwa konta."),
                ),
                section(
                    "Prawa użytkownika",
                    paragraph("Na zasadach określonych w RODO użytkownik może żądać dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia danych i sprzeciwić się przetwarzaniu opartemu na prawnie uzasadnionym interesie. Zgodę można wycofać bez wpływu na zgodność wcześniejszego przetwarzania z prawem."),
                    paragraph(`Aby skorzystać z praw, napisz na ${config.contactEmail}. Możemy poprosić o informacje potrzebne do potwierdzenia tożsamości. Użytkownik może też wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.`),
                ),
                section(
                    "Zautomatyzowane sprawdzanie",
                    paragraph("Automatyczne mechanizmy mogą wykrywać zabronione treści, nadużycia lub niewiarygodne wyniki. Nie wykorzystujemy ich do podejmowania decyzji wywołujących skutki prawne lub podobnie istotnie wpływających na użytkownika bez możliwości zakwestionowania wyniku i kontaktu z obsługą."),
                ),
                section(
                    "Dzieci i bezpieczeństwo",
                    paragraph("Osoba, która nie może samodzielnie wyrazić ważnej zgody lub zawrzeć umowy zgodnie z właściwym prawem, powinna korzystać z usługi za zgodą i pod nadzorem rodzica albo opiekuna. Stosujemy adekwatne zabezpieczenia organizacyjne i techniczne, ale żadna transmisja ani metoda przechowywania nie gwarantuje całkowitego bezpieczeństwa."),
                ),
                section(
                    "Zmiany polityki",
                    paragraph(`Polityka może być aktualizowana wraz ze zmianą usługi lub prawa. Aktualna wersja i data jej obowiązywania są publikowane na ${config.siteHost}/privacy. O istotnych zmianach poinformujemy w aplikacji lub innym odpowiednim kanałem.`),
                ),
            ],
        },
        terms: {
            slug: "terms",
            title: "Regulamin",
            effectiveDate: "Obowiązuje od 16 lipca 2026 r.",
            intro: [
                `Regulamin określa zasady korzystania z aplikacji 28 gór i strony ${config.siteHost}, zakupów cyfrowych w App Store oraz zamawiania fizycznych metalowych pinów.`,
                "Korzystając z usługi, użytkownik zobowiązuje się przestrzegać regulaminu oraz bezwzględnie obowiązujących przepisów prawa.",
            ],
            sections: [
                section(
                    "Usługodawca i kontakt",
                    paragraph(`Usługodawcą, operatorem 28 gór i sprzedawcą fizycznych pinów jest ${operatorIdentity}.`),
                    paragraph(`Kontakt w sprawach usługi, zakupów, reklamacji i danych osobowych: ${config.contactEmail}.`),
                ),
                section(
                    "Pierwszeństwo wersji polskiej",
                    paragraph("Dokumenty prawne są dostępne po polsku i angielsku. W razie rozbieżności pierwszeństwo ma wersja polska, w zakresie dozwolonym przez bezwzględnie obowiązujące przepisy prawa."),
                ),
                section(
                    "Definicje",
                    list(
                        "aplikacja lub usługa — aplikacja mobilna 28 gór wraz z powiązanymi usługami internetowymi i stroną,",
                        "konto — indywidualne konto użytkownika w 28 gór,",
                        "odblokowanie gier — jednorazowy zakup pełnego, wcześniejszego dostępu do wszystkich gier archiwum,",
                        "„Nakarm Ryska” — dobrowolne, niezależne wsparcie operatora kupowane przez Apple In-App Purchase,",
                        "pin — fizyczna metalowa przypinka lub inna wyraźnie oznaczona fizyczna pamiątka oferowana w sklepie,",
                        "treści użytkownika — w szczególności zdjęcia, podpisy, notatki, oceny, komentarze, pseudonim, avatar i publiczny profil."
                    ),
                ),
                section(
                    "Zakres usługi",
                    paragraph("28 gór pozwala planować i dokumentować wejścia, zbierać cyfrowe pieczątki, zapisywać zdjęcia i notatki, korzystać z treści edukacyjnych i gier, publikować wybrane dane profilu w rankingach oraz zamawiać fizyczne piny."),
                    paragraph("Część gier może zostać odblokowana bezpłatnie po osiągnięciu wskazanego postępu. Zakup odblokowania gier daje pełny wcześniejszy dostęp na zasadach opisanych poniżej."),
                ),
                section(
                    "Wymagania techniczne",
                    paragraph("Do działania niektórych funkcji potrzebne są zgodne urządzenie, aktualny system, połączenie z internetem, konto 28 gór albo Apple ID. Użytkownik odpowiada za aktualizacje urządzenia i koszty transmisji danych."),
                ),
                section(
                    "Konto i jego usunięcie",
                    paragraph("Użytkownik odpowiada za prawdziwość danych konta, bezpieczeństwo dostępu oraz działania wykonane na swoim koncie. Nie wolno udostępniać konta w sposób umożliwiający podszywanie się lub obchodzenie zabezpieczeń."),
                    paragraph("Zweryfikowany użytkownik może rozpocząć trwałe usunięcie konta w ustawieniach aplikacji. Usunięcie obejmuje usunięcie lub anonimizację danych zgodnie z Polityką prywatności; ograniczone kopie zapasowe i dokumentacja wymagana prawem mogą pozostać przez właściwy okres."),
                    paragraph("Usunięcie konta ani odinstalowanie aplikacji nie anuluje zakupu Apple i nie powoduje automatycznego zwrotu. Usunięcie konta może uniemożliwić późniejsze odtworzenie odblokowania przypisanego do tego konta."),
                ),
                section(
                    "Publiczne profile i rankingi",
                    paragraph("Zależnie od ustawień publiczny wpis może zawierać nazwę wyświetlaną, zaakceptowany avatar, ukończone góry lub pieczątki, wynik, pozycję w rankingu i czas osiągnięcia. Użytkownik odpowiada za swoją nazwę, avatar i publikowane dane oraz nie może podszywać się pod inną osobę ani naruszać jej praw."),
                    paragraph("Rankingi są funkcją społecznościową, a nie konkursem z nagrodami. Mogą być poprawiane, przeliczane lub odbudowywane po wykryciu błędu. Podejrzane, zmanipulowane albo niemożliwe do zweryfikowania wyniki mogą zostać ukryte lub usunięte."),
                ),
                section(
                    "Uczciwa gra",
                    list(
                        "nie wolno manipulować czasem, wynikiem, lokalizacją, stanem aplikacji ani transmisją danych,",
                        "nie wolno używać botów, automatyzacji, zmodyfikowanego klienta, exploitów ani cudzych transakcji lub kont,",
                        "nie wolno wielokrotnie przesyłać fałszywych wyników ani obchodzić mechanizmów integralności,",
                        "operator może poprosić o ponowną synchronizację lub weryfikację i unieważnić wynik, którego wiarygodności nie da się potwierdzić."
                    ),
                ),
                section(
                    "Treści użytkownika i moderacja",
                    paragraph("Użytkownik zachowuje prawa do swoich treści. Udziela operatorowi niewyłącznej, nieodpłatnej, obowiązującej przez okres przechowywania treści licencji wyłącznie na hostowanie, zapisywanie, kopiowanie techniczne, kompresowanie, zmianę rozmiaru i formatu, przesyłanie oraz wyświetlanie treści w zakresie potrzebnym do świadczenia, zabezpieczenia i moderowania 28 gór."),
                    paragraph("Licencja nie obejmuje wykorzystania zdjęć ani innych treści w reklamie lub marketingu poza usługą bez osobnej zgody użytkownika."),
                    paragraph("Nie wolno publikować treści bezprawnych, obraźliwych, zagrażających bezpieczeństwu, naruszających prywatność, dobra osobiste, prawa autorskie lub inne prawa osób trzecich. Operator może sprawdzać, ograniczać widoczność lub usuwać takie treści i profile."),
                    paragraph(`Treść, komentarz, profil lub wpis rankingowy można zgłosić przez dostępną funkcję zgłoszenia albo na ${config.contactEmail}, podając wystarczające informacje do jego odnalezienia. Zgłoszenie zostanie ocenione z uwzględnieniem kontekstu i praw użytkownika.`),
                ),
                section(
                    "Jednorazowe odblokowanie pełnego dostępu do gier",
                    paragraph("Poszczególne gry mogą początkowo odblokowywać się bezpłatnie wraz z postępem użytkownika. Użytkownik może zamiast tego kupić jednorazowe odblokowanie pełnego, wcześniejszego dostępu do wszystkich gier objętych ofertą."),
                    paragraph("Zakup jest realizowany wyłącznie jako Apple In-App Purchase i obciąża konto App Store po potwierdzeniu. Cena, waluta i dokładny zakres są wyświetlane przed zakupem. Nie jest to subskrypcja, zakup fizyczny ani płatność przez Stripe, Apple Pay lub BLIK."),
                    paragraph("Odblokowanie jest produktem niekonsumpcyjnym. Dostępny w aplikacji mechanizm „Przywróć wcześniejszy zakup” odczytuje bieżące uprawnienie StoreKit i może odtworzyć dostęp na zgodnym urządzeniu przy użyciu tego samego Apple ID oraz tego samego konta 28 gór. Nie przywraca zakupów wsparcia „Nakarm Ryska”."),
                    paragraph(`Zwroty i rozliczenia zakupu obsługuje Apple zgodnie z zasadami App Store. Pomoc techniczną dotyczącą aktywacji zapewnia operator pod adresem ${config.contactEmail}. Usunięcie konta nie powoduje zwrotu ceny.`),
                ),
                section(
                    "Dobrowolne wsparcie „Nakarm Ryska”",
                    paragraph("„Nakarm Ryska” jest dobrowolnym wsparciem rozwoju 28 gór, niezależnym od odblokowania gier. Nie odblokowuje funkcji, treści, gry, wyniku ani innego uprawnienia."),
                    paragraph("Każdy wariant wsparcia jest osobnym konsumpcyjnym Apple In-App Purchase. Może zostać kupiony więcej niż raz, obciąża konto App Store po potwierdzeniu i nie podlega przywracaniu jako trwałe uprawnienie. Cena i wariant są pokazane przed zakupem."),
                    paragraph("Zakup wsparcia nie jest realizowany przez Stripe, Apple Pay, BLIK ani checkout fizycznych pinów. Rozliczenia i wnioski o zwrot obsługuje Apple zgodnie z zasadami App Store."),
                ),
                section(
                    "Fizyczne metalowe piny",
                    paragraph("Piny są towarami fizycznymi sprzedawanymi oddzielnie od odblokowania gier i „Nakarm Ryska”. Nie są Apple In-App Purchase i nie nadają cyfrowych uprawnień, chyba że opis produktu jednoznacznie wskazuje dodatkową, zgodną z prawem funkcję."),
                    paragraph(`Sprzedawcą jest ${operatorIdentity}. Checkout i potwierdzenie zamówienia pokazują produkt, cenę, koszt dostawy, łączną kwotę, dane sprzedawcy i adres dostawy przed potwierdzeniem.`),
                    paragraph(`${config.paymentProcessorName} obsługuje płatność. Dostępne metody obejmują Apple Pay i BLIK, jeżeli są dostępne dla urządzenia, banku, kraju i bieżącej konfiguracji płatności. Operator nie przechowuje pełnych numerów kart, kodów BLIK ani pełnych danych uwierzytelniających płatność.`),
                    paragraph("Pin może być dostępny w ograniczonej liczbie, wykonywany na zamówienie lub oferowany w przedsprzedaży. Odpowiednie oznaczenie i przewidywany termin realizacji są pokazywane przed zakupem."),
                ),
                section(
                    "Dostawa fizycznych pinów",
                    paragraph("Dostępne kraje dostawy, przewoźnik, koszt i przewidywany czas są pokazywane w checkoutcie. Termin może zależeć od dostępności, produkcji na zamówienie lub przedsprzedaży. Użytkownik powinien podać kompletny i prawidłowy adres oraz sprawdzić go przed zapłatą."),
                    paragraph(`Pytania o niedostarczoną, opóźnioną lub uszkodzoną przesyłkę można kierować na ${config.contactEmail}, podając numer zamówienia.`),
                ),
                section(
                    "Odstąpienie od zakupu fizycznego pina",
                    paragraph(`Konsument może odstąpić od umowy zakupu fizycznego pina bez podawania przyczyny w ciągu 14 dni od jego otrzymania. Wystarczy wysłać jednoznaczne oświadczenie na ${config.contactEmail} przed upływem terminu; nie jest potrzebna wcześniejsza zgoda operatora.`),
                    paragraph("Pin należy odesłać nie później niż 14 dni od złożenia oświadczenia. Aktualny adres zwrotu przekażemy po otrzymaniu oświadczenia — jest to informacja organizacyjna, a nie zgoda na odstąpienie. Koszt przesyłki zwrotnej ponosi konsument tylko wtedy, gdy został o tym prawidłowo poinformowany przed zakupem."),
                    paragraph("Konsument może otworzyć opakowanie i obejrzeć pin w zakresie potrzebnym do ustalenia jego charakteru, cech i działania. Odpowiada jedynie za zmniejszenie wartości wynikające z obchodzenia się z towarem w sposób wykraczający poza taki zakres; samo otwarcie opakowania nie wyłącza prawa odstąpienia."),
                    paragraph("Zwracamy cenę pina oraz koszt najtańszej oferowanej zwykłej dostawy, co do zasady tą samą metodą płatności, w terminie wymaganym prawem. Możemy wstrzymać zwrot do otrzymania pina lub przedstawienia dowodu jego odesłania — zależnie od tego, co nastąpi wcześniej."),
                ),
                section(
                    "Reklamacje fizycznych pinów",
                    paragraph(`Reklamację z powodu niezgodności pina z umową można wysłać na ${config.contactEmail}. Należy podać numer zamówienia, opisać problem i wskazać oczekiwane rozwiązanie. Zdjęcia są pomocne, ale nie są obowiązkowe, jeśli problem można ustalić inaczej.`),
                    paragraph("Na zasadach wynikających z prawa konsument może żądać naprawy lub wymiany, a w przewidzianych prawem przypadkach obniżenia ceny albo odstąpienia od umowy. Reklamacja towaru jest rozpatrywana oddzielnie od odstąpienia bez podawania przyczyny i od reklamacji technicznej aplikacji."),
                ),
                section(
                    "Problemy techniczne i zakupy Apple",
                    paragraph(`Problem z kontem, synchronizacją, rankingiem, grą albo aktywacją odblokowania można zgłosić na ${config.contactEmail}, podając opis, wersję aplikacji i urządzenie. Nie należy przesyłać haseł ani pełnych danych płatniczych.`),
                    paragraph("Rozliczenia, obciążenia i zwroty Apple In-App Purchase prowadzi Apple. Operator pomaga w technicznej weryfikacji produktu i dostępu, ale nie może samodzielnie zwrócić płatności pobranej przez App Store."),
                ),
                section(
                    "Zawieszenie i zakończenie dostępu",
                    paragraph("Operator może ograniczyć, zawiesić lub zakończyć dostęp do konta albo funkcji, gdy jest to proporcjonalnie konieczne z powodu naruszenia prawa lub regulaminu, oszustwa, zagrożenia bezpieczeństwa, podszywania się, powtarzających się nadużyć lub ochrony innych osób. Jeżeli okoliczności na to pozwalają, użytkownik otrzyma informację o przyczynie i możliwości wyjaśnienia sprawy."),
                ),
                section(
                    "Bezpieczeństwo w górach",
                    paragraph("28 gór jest narzędziem informacyjnym i dziennikiem, a nie profesjonalną usługą ratowniczą, nawigacją gwarantującą bezpieczną trasę ani zamiennikiem aktualnych komunikatów służb. Informacje o trasie, odległości, pogodzie i lokalizacji mogą być niedokładne, niepełne lub nieaktualne."),
                    paragraph("Użytkownik sam ocenia warunki, umiejętności, wyposażenie i ryzyko, sprawdza oficjalne komunikaty oraz stosuje się do zamknięć szlaków i poleceń służb. W nagłym przypadku należy kontaktować się z właściwymi służbami ratunkowymi."),
                ),
                section(
                    "Relacja z Apple",
                    paragraph("Umowa jest zawierana między użytkownikiem a operatorem, a nie z Apple. Operator, nie Apple, odpowiada za aplikację, jej treść, utrzymanie i wsparcie w zakresie wymaganym prawem. Apple nie odpowiada za fizyczne piny ani ich płatności i dostawę."),
                    paragraph("Korzystanie z aplikacji podlega również zasadom App Store i właściwej standardowej umowie licencyjnej Apple. Apple i jej podmioty zależne są osobami trzecimi uprawnionymi do egzekwowania odpowiednich postanowień dotyczących licencji aplikacji."),
                ),
                section(
                    "Dostępność i zmiany usługi",
                    paragraph("Usługa może być aktualizowana, czasowo niedostępna lub zmieniana z przyczyn technicznych, bezpieczeństwa albo rozwoju produktu. Nie gwarantujemy nieprzerwanego działania każdej funkcji, ale zmiany nie naruszają praw już nabytych ani bezwzględnie obowiązujących praw konsumenta."),
                    paragraph(`Aktualny regulamin jest dostępny na ${config.siteHost}/terms. O istotnych zmianach dotyczących użytkowników z kontem poinformujemy z odpowiednim wyprzedzeniem, chyba że natychmiastowa zmiana jest wymagana przez prawo lub bezpieczeństwo.`),
                ),
                section(
                    "Własność intelektualna",
                    paragraph("Aplikacja, strona, znak 28 gór, Rysek, kod, układ interfejsu, grafiki, pieczątki i treści operatora są chronione prawem. Korzystanie z usługi daje użytkownikowi ograniczone, odwołalne, niewyłączne prawo do osobistego korzystania z niej zgodnie z regulaminem; nie przenosi praw własności intelektualnej."),
                ),
                section(
                    "Prywatność",
                    paragraph(`Zasady przetwarzania danych osobowych określa Polityka prywatności dostępna na ${config.siteHost}/privacy.`),
                ),
                section(
                    "Postanowienia końcowe",
                    paragraph("W sprawach nieuregulowanych stosuje się prawo polskie, z poszanowaniem bezwzględnie obowiązujących praw konsumenta wynikających z prawa właściwego dla jego miejsca zamieszkania. Regulamin nie wyłącza ani nie ogranicza uprawnień, których nie można wyłączyć umową."),
                    paragraph("Jeżeli pojedyncze postanowienie okaże się nieważne lub niewykonalne, pozostałe postanowienia zachowują moc w zakresie dozwolonym prawem."),
                ),
            ],
        },
        support: {
            slug: "support",
            title: "Pomoc",
            effectiveDate: "Aktualizacja: 16 lipca 2026 r.",
            intro: ["Pomagamy w sprawach konta, danych, zakupów Apple, zamówień fizycznych pinów i działania aplikacji."],
            sections: [
                section(
                    "Pomoc e-mail",
                    paragraph(`Napisz na ${config.contactEmail}. Opisz problem i, jeżeli to przydatne, podaj wersję aplikacji, model urządzenia albo numer zamówienia. Nie przesyłaj hasła, kodu BLIK ani pełnych danych płatniczych.`),
                ),
            ],
        },
    }

    const en: LegalDocuments = {
        privacy: {
            slug: "privacy",
            title: "Privacy Policy",
            effectiveDate: "Effective date: July 16, 2026",
            intro: [
                `This policy explains how ${publicOperatorName}, the operator of 28 gór, processes personal data of users of the 28 gór app and ${config.siteHost}.`,
                "It covers accounts, mountain progress, user content, public profiles and leaderboards, App Store purchases, and orders for physical pins.",
            ],
            sections: [
                section(
                    "Controller and contact",
                    paragraph(`The data controller is ${operatorIdentity}.`),
                    paragraph(`For privacy, personal data, or user support matters, email ${config.contactEmail}.`),
                ),
                section(
                    "Data we process",
                    list(
                        "account and contact data: user ID, email address, sign-in provider, display name, avatar, settings, and profile permissions,",
                        "app-use data: planned and completed mountains, stamp collection, ascent dates, photos, captions, notes, ratings, preferences, and sync state,",
                        "public data: display name, approved avatar, completed mountains, stamps, game scores, leaderboard position, and achievement time, according to the user's settings,",
                        "score-verification and fair-play data, including attempt identifiers, score, time, device-integrity signals, and information about suspicious or unverifiable activity,",
                        "user content: photos, captions, notes, ratings, comments, nickname, avatar, and public-profile elements,",
                        "moderation reports: reporter ID, reported content or account, reason, status, and outcome,",
                        "technical and security data: IP address, device type, operating system, app or browser version, installation and diagnostic identifiers, error logs, and approximate region,",
                        "Apple purchase data: StoreKit product ID, transaction and original-transaction identifiers, verification status, entitlement, revocation, or refund; we do not receive full App Store account payment credentials,",
                        "pin-order data: name, email address, delivery address, country, selected products, price, shipping, total, fulfillment status, and payment status supplied by Stripe,",
                        "support correspondence, complaints, withdrawal notices, and information needed to handle them."
                    ),
                ),
                section(
                    "Purposes and legal bases",
                    list(
                        "creating and operating accounts, syncing, the mountain journal, leaderboards, purchased functionality, and order fulfillment — performance of a contract, Article 6(1)(b) GDPR,",
                        "handling payments, delivery, withdrawals, complaints, and user contact — performance of a contract or steps before entering one, Article 6(1)(b) GDPR,",
                        "accounting, tax, and consumer-law duties — legal obligation, Article 6(1)(c) GDPR,",
                        "security, fraud prevention, score verification, moderation, diagnostics, and legal claims — the legitimate interests of the controller and community, Article 6(1)(f) GDPR,",
                        "publishing an optional name and avatar and using device permissions — according to the user's choices and settings; where consent is required, Article 6(1)(a) GDPR."
                    ),
                ),
                section(
                    "Public profiles and leaderboards",
                    paragraph("A leaderboard entry may show a display name, approved avatar, completed mountains or stamps, score, position, and achievement time. The technical account ID is not displayed as part of the public profile."),
                    paragraph("Users can change whether their name and avatar are published. When publication is turned off, relevant entries are anonymized or updated where technically possible; recalculating stored leaderboards may take a short time."),
                ),
                section(
                    "Score verification and moderation",
                    paragraph("Scores, names, avatars, and other content may be checked automatically and by authorized personnel to protect the community, third-party rights, and fair play. Suspicious, manipulated, or unverifiable scores may be omitted, removed, or recalculated."),
                    paragraph(`A moderation or score decision can be challenged through an available reporting feature or by emailing ${config.contactEmail}.`),
                ),
                section(
                    "Payments and orders",
                    paragraph("The full game unlock and voluntary “Feed Rysek” support are separate Apple In-App Purchases. We receive the information needed to verify the product, transaction, entitlement, revocation, or refund, but not full Apple ID payment credentials."),
                    paragraph(`Physical metal pins are sold separately. ${config.paymentProcessorName} processes payment and supplies the transaction status. Available methods may include Apple Pay and BLIK, depending on the device, bank, country, and current configuration. We do not store full card numbers, BLIK codes, or other complete payment-authentication credentials.`),
                ),
                section(
                    "Device permissions",
                    paragraph("The app requests access to a device feature only when needed. Permissions can later be changed in system settings."),
                    list(
                        "location helps show nearby mountains, calculate distance, or confirm ascent context,",
                        "the camera and photo library are used to add photos and an avatar,",
                        "notifications deliver messages and reminders enabled by the user."
                    ),
                ),
                section(
                    "Website cookies and local storage",
                    paragraph("The website uses necessary browser storage, such as localStorage, to remember language, theme, and interface preferences. Analytics or non-essential technology will be used only with an appropriate legal basis, including consent where required."),
                ),
                section(
                    "Recipients",
                    list(
                        "hosting, database, authentication, file-storage, notification, diagnostics, and security providers,",
                        "Apple in connection with the App Store, StoreKit, In-App Purchases, and refunds,",
                        `${config.paymentProcessorName}, banks, and payment-method providers for physical-pin purchases,`,
                        "carriers and businesses producing or dispatching orders,",
                        "moderation-tool providers and legal advisers, accountants, courts, and public authorities where required by law."
                    ),
                    paragraph("We do not sell personal data. Recipients receive only the data required for their tasks."),
                ),
                section(
                    "Transfers outside the EEA",
                    paragraph("Some providers may process data outside the European Economic Area. In that case, we use a GDPR-approved mechanism, particularly an adequacy decision or standard contractual clauses with any required supplementary safeguards."),
                ),
                section(
                    "Retention and account deletion",
                    list(
                        "account data and private content are kept until the account is deleted or the data is no longer needed to provide the service,",
                        "public leaderboard entries and reviews are deleted or anonymized after account deletion where retaining them is needed for service integrity,",
                        "order, payment, refund, and complaint records are kept for periods required by tax, accounting, consumer law, and limitation rules,",
                        "security and diagnostic logs are kept for a period proportionate to their purpose,",
                        "backups are overwritten under the retention cycle; deleted data may remain in secured backups until scheduled overwrite and is not used in ordinary operations."
                    ),
                    paragraph("A verified user can start account deletion in the app settings. Uninstalling the app does not delete the account."),
                ),
                section(
                    "Your rights",
                    paragraph("Subject to the GDPR, users may request access, rectification, erasure, restriction, and portability, and may object to processing based on legitimate interests. Consent may be withdrawn without affecting the lawfulness of earlier processing."),
                    paragraph(`To exercise a right, email ${config.contactEmail}. We may request information needed to verify identity. Users may also complain to the President of the Polish Personal Data Protection Office.`),
                ),
                section(
                    "Automated checks",
                    paragraph("Automated mechanisms may flag prohibited content, abuse, or unreliable scores. We do not use them to make decisions that produce legal or similarly significant effects without an opportunity to challenge the outcome and contact support."),
                ),
                section(
                    "Children and security",
                    paragraph("A person who cannot independently give valid consent or enter into a contract under applicable law should use the service with the permission and supervision of a parent or guardian. We use appropriate organizational and technical safeguards, but no transmission or storage method can guarantee absolute security."),
                ),
                section(
                    "Policy changes",
                    paragraph(`We may update this policy as the service or law changes. The current version and its effective date are published at ${config.siteHost}/privacy. We will communicate material changes in the app or through another appropriate channel.`),
                ),
            ],
        },
        terms: {
            slug: "terms",
            title: "Terms of Service",
            effectiveDate: "Effective date: July 16, 2026",
            intro: [
                `These terms govern the 28 gór app and ${config.siteHost}, digital App Store purchases, and orders for physical metal pins.`,
                "By using the service, users agree to follow these terms and all mandatory applicable laws.",
            ],
            sections: [
                section(
                    "Service provider and contact",
                    paragraph(`The provider and operator of 28 gór and the seller of physical pins is ${operatorIdentity}.`),
                    paragraph(`For service, purchase, complaint, and privacy matters, email ${config.contactEmail}.`),
                ),
                section(
                    "Polish version precedence",
                    paragraph("The legal documents are available in Polish and English. If there is any inconsistency, the Polish version prevails to the extent permitted by mandatory applicable law."),
                ),
                section(
                    "Definitions",
                    list(
                        "app or service — the 28 gór mobile app, related online services, and website,",
                        "account — an individual 28 gór user account,",
                        "game unlock — a one-time purchase of full early access to all archive games included in the offer,",
                        "“Feed Rysek” — voluntary, independent support for the operator purchased through Apple In-App Purchase,",
                        "pin — a physical metal pin or other clearly identified physical keepsake offered in the shop,",
                        "user content — including photos, captions, notes, ratings, comments, nickname, avatar, and public profile."
                    ),
                ),
                section(
                    "Scope of the service",
                    paragraph("28 gór lets users plan and record ascents, collect digital stamps, save photos and notes, use educational content and games, publish selected profile information on leaderboards, and order physical pins."),
                    paragraph("Some games may unlock for free when a stated progress threshold is reached. The game unlock provides full early access under the rules below."),
                ),
                section(
                    "Technical requirements",
                    paragraph("Some features require a compatible device, current operating system, internet connection, 28 gór account, or Apple ID. Users are responsible for device updates and data-transmission charges."),
                ),
                section(
                    "Accounts and deletion",
                    paragraph("Users are responsible for accurate account details, access security, and activity performed through their account. Accounts must not be shared in a way that enables impersonation or circumvention of safeguards."),
                    paragraph("A verified user can start permanent account deletion in the app settings. Data is deleted or anonymized as described in the Privacy Policy; limited backups and legally required records may remain for the relevant period."),
                    paragraph("Deleting an account or uninstalling the app does not cancel an Apple purchase or automatically produce a refund. Account deletion may prevent later restoration of an unlock assigned to that account."),
                ),
                section(
                    "Public profiles and leaderboards",
                    paragraph("Depending on settings, a public entry may contain a display name, approved avatar, completed mountains or stamps, score, leaderboard position, and achievement time. Users are responsible for their name, avatar, and published information and must not impersonate another person or infringe their rights."),
                    paragraph("Leaderboards are a community feature, not a prize competition. They may be corrected, recalculated, or rebuilt after an error. Suspicious, manipulated, or unverifiable results may be hidden or removed."),
                ),
                section(
                    "Fair play",
                    list(
                        "do not manipulate time, score, location, app state, or data transmission,",
                        "do not use bots, automation, a modified client, exploits, or another person's transactions or account,",
                        "do not repeatedly submit fabricated results or bypass integrity mechanisms,",
                        "the operator may request resynchronization or verification and invalidate a result that cannot be confirmed."
                    ),
                ),
                section(
                    "User content and moderation",
                    paragraph("Users retain ownership of their content. They grant the operator a non-exclusive, royalty-free license, lasting only while the content is retained, solely to host, store, make technical copies, compress, resize, reformat, transmit, and display that content as needed to provide, secure, and moderate 28 gór."),
                    paragraph("The license does not permit use of photos or other content in advertising or marketing outside the service without separate permission."),
                    paragraph("Users must not publish unlawful, abusive, unsafe, privacy-invasive, infringing, or otherwise rights-violating content. The operator may review, limit the visibility of, or remove such content and profiles."),
                    paragraph(`Content, a comment, profile, or leaderboard entry can be reported through an available reporting feature or by emailing ${config.contactEmail} with enough information to locate it. Reports are assessed in context and with regard to user rights.`),
                ),
                section(
                    "One-time full game unlock",
                    paragraph("Individual games may initially unlock for free as users make progress. A user may instead buy a one-time unlock for full early access to all games included in the offer."),
                    paragraph("The purchase is made only through Apple In-App Purchase and is charged to the App Store account after confirmation. The price, currency, and exact scope are displayed before purchase. It is not a subscription, physical purchase, or payment through Stripe, Apple Pay, or BLIK."),
                    paragraph("The unlock is a non-consumable product. The in-app “Restore previous purchase” mechanism reads the current StoreKit entitlement and can restore access on a compatible device using the same Apple ID and the same 28 gór account. It does not restore “Feed Rysek” support purchases."),
                    paragraph(`Apple handles billing and refund requests under App Store rules. The operator provides activation support at ${config.contactEmail}. Account deletion does not refund the purchase.`),
                ),
                section(
                    "Voluntary “Feed Rysek” support",
                    paragraph("“Feed Rysek” is voluntary support for developing 28 gór and is independent of the game unlock. It does not unlock functionality, content, a game, score, or any other entitlement."),
                    paragraph("Each support option is a separate consumable Apple In-App Purchase. It can be bought more than once, is charged to the App Store account after confirmation, and is not restorable as a lasting entitlement. The price and option are displayed before purchase."),
                    paragraph("Support is not purchased through Stripe, Apple Pay, BLIK, or the physical-pin checkout. Apple handles billing and refund requests under App Store rules."),
                ),
                section(
                    "Physical metal pins",
                    paragraph("Pins are physical goods sold separately from the game unlock and “Feed Rysek.” They are not Apple In-App Purchases and do not grant digital entitlements unless the product description clearly identifies an additional lawful feature."),
                    paragraph(`The seller is ${operatorIdentity}. Before confirmation, checkout and the order confirmation show the product, price, shipping cost, total, seller details, and delivery address.`),
                    paragraph(`${config.paymentProcessorName} processes payment. Available methods include Apple Pay and BLIK where supported by the device, bank, country, and current payment configuration. The operator does not store full card numbers, BLIK codes, or complete payment-authentication credentials.`),
                    paragraph("A pin may be limited in quantity, made to order, or sold as a preorder. The relevant label and expected fulfillment time are shown before purchase."),
                ),
                section(
                    "Delivery of physical pins",
                    paragraph("Available delivery countries, carrier, cost, and estimated timing are shown at checkout. Timing may depend on stock, made-to-order production, or preorder status. Users must provide a complete and accurate address and review it before payment."),
                    paragraph(`Questions about a missing, delayed, or damaged shipment can be sent to ${config.contactEmail} with the order number.`),
                ),
                section(
                    "Withdrawal from a physical-pin purchase",
                    paragraph(`A consumer may withdraw from a physical-pin purchase without giving a reason within 14 days after receipt. It is enough to send an unequivocal statement to ${config.contactEmail} before the deadline; the operator's prior approval is not required.`),
                    paragraph("The pin must be returned no later than 14 days after the statement. We will provide the current returns address after receiving the statement — this is logistical information, not approval of the withdrawal. The consumer bears direct return cost only if properly informed before purchase."),
                    paragraph("A consumer may open the package and inspect the pin as necessary to establish its nature, characteristics, and functioning. The consumer is responsible only for diminished value caused by handling beyond that scope; opening the package alone does not remove the right of withdrawal."),
                    paragraph("We refund the pin price and the cost of the least expensive standard delivery offered, generally using the original payment method, within the period required by law. We may withhold reimbursement until we receive the pin or proof that it was sent back, whichever occurs first."),
                ),
                section(
                    "Complaints about physical pins",
                    paragraph(`A complaint that a pin does not conform to the contract can be sent to ${config.contactEmail}. Include the order number, describe the problem, and state the desired resolution. Photos are helpful but optional where the issue can be established otherwise.`),
                    paragraph("Under applicable law, a consumer may request repair or replacement and, where the legal conditions are met, a price reduction or withdrawal from the contract. A goods complaint is handled separately from no-reason withdrawal and from an app technical complaint."),
                ),
                section(
                    "Technical issues and Apple purchases",
                    paragraph(`An account, sync, leaderboard, game, or unlock-activation problem can be reported to ${config.contactEmail} with a description, app version, and device. Do not send passwords or full payment credentials.`),
                    paragraph("Apple handles billing, charges, and refunds for Apple In-App Purchases. The operator can help verify the product and technical access but cannot directly refund a payment collected by the App Store."),
                ),
                section(
                    "Suspension and termination",
                    paragraph("The operator may restrict, suspend, or end access to an account or feature where proportionately necessary because of a violation of law or these terms, fraud, a security threat, impersonation, repeated abuse, or protection of others. Where circumstances allow, the user will be told the reason and how to explain or challenge the matter."),
                ),
                section(
                    "Mountain safety",
                    paragraph("28 gór is an information tool and journal, not a professional rescue service, guaranteed safe-route navigation, or a replacement for current official warnings. Route, distance, weather, and location information may be inaccurate, incomplete, or outdated."),
                    paragraph("Users must assess conditions, skills, equipment, and risk, check official notices, and follow trail closures and instructions from authorities. In an emergency, contact the appropriate rescue services."),
                ),
                section(
                    "Relationship with Apple",
                    paragraph("The agreement is between the user and the operator, not Apple. The operator, not Apple, is responsible for the app, its content, maintenance, and support to the extent required by law. Apple is not responsible for physical pins or their payment and delivery."),
                    paragraph("Use of the app is also subject to App Store rules and the applicable Apple standard end-user license agreement. Apple and its subsidiaries are third-party beneficiaries entitled to enforce the relevant app-license terms."),
                ),
                section(
                    "Availability and changes",
                    paragraph("The service may be updated, temporarily unavailable, or changed for technical, security, or product-development reasons. We do not guarantee uninterrupted operation of every feature, but changes do not affect acquired rights or mandatory consumer rights."),
                    paragraph(`The current terms are available at ${config.siteHost}/terms. We will give account holders appropriate advance notice of material changes unless an immediate change is required by law or security.`),
                ),
                section(
                    "Intellectual property",
                    paragraph("The app, website, 28 gór name, Rysek, code, interface layout, graphics, stamps, and operator content are legally protected. Use of the service gives users a limited, revocable, non-exclusive right to personal use under these terms and does not transfer intellectual-property ownership."),
                ),
                section(
                    "Privacy",
                    paragraph(`Personal data rules are in the Privacy Policy at ${config.siteHost}/privacy.`),
                ),
                section(
                    "Final provisions",
                    paragraph("Polish law applies to matters not covered by these terms, while preserving mandatory consumer rights under the law of the consumer's country of residence. These terms do not exclude or limit rights that cannot be waived by contract."),
                    paragraph("If an individual provision is invalid or unenforceable, the remaining provisions continue to apply to the extent permitted by law."),
                ),
            ],
        },
        support: {
            slug: "support",
            title: "Support",
            effectiveDate: "Updated: July 16, 2026",
            intro: ["We help with accounts, data, Apple purchases, physical-pin orders, and app operation."],
            sections: [
                section(
                    "Email support",
                    paragraph(`Email ${config.contactEmail}. Describe the issue and, where useful, include the app version, device model, or order number. Do not send a password, BLIK code, or full payment credentials.`),
                ),
            ],
        },
    }

    return { en, pl }
}
