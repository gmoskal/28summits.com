import type { LegalDocument, LegalSection, LegalTextBlock } from "./site-content"

type LegalSiteConfig = {
    readonly contactEmail: string
    readonly contactPhone: string
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
    const polishOperatorIdentity = `${publicOperatorName}, NIP: ${config.operatorTaxId}, ${config.operatorAddress}`
    const englishOperatorAddress = config.operatorAddress.replace(/, Polska$/, ", Poland")
    const englishOperatorIdentity = `${publicOperatorName}, NIP: ${config.operatorTaxId}, ${englishOperatorAddress}`
    const polishUpdatedDate = "Ostatnia aktualizacja: 16 lipca 2026 r., 21:29 CEST (UTC+02:00, Europe/Warsaw)"
    const englishUpdatedDate = "Last updated: July 16, 2026, 21:29 CEST (UTC+02:00, Europe/Warsaw)"

    const pl: LegalDocuments = {
        privacy: {
            slug: "privacy",
            title: "Polityka prywatności",
            effectiveDate: "Obowiązuje od 16 lipca 2026 r.",
            updatedDate: polishUpdatedDate,
            intro: [
                `Ta polityka opisuje, jak ${publicOperatorName}, operator 28 gór, przetwarza dane osobowe użytkowników aplikacji 28 gór i strony ${config.siteHost}.`,
                "Obejmuje ona konta, postęp górski, treści użytkowników, publiczne profile i rankingi, zakupy w App Store oraz zamówienia fizycznych pinów.",
            ],
            sections: [
                section(
                    "Administrator i kontakt",
                    paragraph(`Administratorem danych osobowych jest ${polishOperatorIdentity}.`),
                    paragraph(`W sprawach prywatności, danych osobowych i obsługi użytkownika napisz na ${config.contactEmail}.`),
                ),
                section(
                    "Zakres przetwarzanych danych",
                    list(
                        "dane konta i kontaktowe: identyfikator Firebase, adres e-mail, dostawca logowania Apple lub Google, nazwa wyświetlana, zdjęcie od dostawcy logowania, ustawienia profilu i status akceptacji dokumentów,",
                        "dane korzystania z aplikacji: zaplanowane i ukończone szczyty, kolekcja pieczątek, daty wejść, oceny, komentarze, preferencje, stan synchronizacji i lokalne zdjęcia szczytowe,",
                        "dane publiczne: nazwa wyświetlana i zaakceptowany avatar, jeżeli ich widoczność jest włączona, oraz ukończone góry, pieczątki, wyniki gier, pozycja w rankingu i czas osiągnięcia wyniku,",
                        "dane weryfikacji wyników i bezpieczeństwa: identyfikator próby i instalacji, wynik, czas, wersja i numer kompilacji aplikacji, skróty integralności, App Attest lub inne sygnały integralności urządzenia oraz status weryfikacji,",
                        "treści użytkownika wysyłane na serwer: nazwa wyświetlana, przetworzony avatar, ocena i komentarz do szczytu oraz treść zgłoszenia; prywatne zdjęcia szczytowe pozostają w pamięci urządzenia,",
                        "zgłoszenia moderacyjne: identyfikator zgłaszającego, zgłoszona treść lub konto, przyczyna, status i wynik rozpatrzenia,",
                        "dane techniczne i powiadomienia: adres IP przetwarzany przy połączeniu z usługą, identyfikator urządzenia w aplikacji, token Firebase Cloud Messaging, status uprawnienia, wersja aplikacji, język, strefa czasowa i lokalne logi diagnostyczne,",
                        "dane zakupów Apple: identyfikator produktu StoreKit, identyfikatory transakcji i transakcji pierwotnej, status uprawnienia, anulowanie, cofnięcie lub zwrot; nie otrzymujemy pełnych danych płatniczych konta App Store,",
                        "dane zamówień pinów: imię i nazwisko, e-mail, numer telefonu, dane odbiorcy, paczkomat lub adres dostawy, kraj, wybrane produkty, cena, dostawa, suma, status realizacji, zdarzenia przesyłki oraz status płatności, zwrotu lub sporu płatniczego przekazany przez Stripe, bank albo dostawcę metody płatności,",
                        "korespondencja z obsługą, reklamacje, odstąpienia od umowy, zgłoszenia nieodebranej lub zwróconej przesyłki oraz dobrowolnie przekazane informacje potrzebne do ich rozpatrzenia, na przykład zdjęcia, potwierdzenie nadania lub inne dowody.",
                    ),
                ),
                section(
                    "Skąd pozyskujemy dane",
                    list(
                        "bezpośrednio od użytkownika podczas logowania, edycji profilu, zapisywania postępu, dodawania oceny lub komentarza, kontaktu z obsługą i składania zamówienia,",
                        "automatycznie z aplikacji, urządzenia i backendu podczas korzystania z danej funkcji, w szczególności przy synchronizacji, powiadomieniach i weryfikacji wyniku,",
                        "od Apple i StoreKit w związku z logowaniem, transakcją, uprawnieniem, cofnięciem lub zwrotem,",
                        "od Google przy logowaniu, od Stripe, banku i dostawcy metody płatności przy płatności, zwrocie lub sporze płatniczym dotyczącym pina oraz od InPost przy dostawie, zwrocie lub nieodebraniu przesyłki,",
                        "od innych użytkowników, gdy zgłaszają komentarz, konto lub inną treść."
                    ),
                ),
                section(
                    "Dane obowiązkowe i opcjonalne",
                    paragraph("Identyfikator uwierzytelnienia i dane sesji są niezbędne do założenia i obsługi konta. Identyfikatory transakcji Apple są niezbędne do potwierdzenia cyfrowego uprawnienia. Dane odbiorcy, e-mail, sposób i miejsce dostawy oraz status płatności są niezbędne do przyjęcia i wykonania zamówienia fizycznego. Bez tych danych odpowiednia usługa, zakup lub dostawa nie mogą zostać wykonane."),
                    paragraph("Nazwa publiczna, avatar, komentarz, dostęp do lokalizacji, aparatu, biblioteki zdjęć i powiadomień są opcjonalne. Odmowa lokalizacji wyłącza funkcje odległości i potwierdzania obecności przy szczycie, odmowa dostępu do zdjęć lub aparatu wyłącza tylko właściwy sposób dodawania zdjęcia, a odmowa powiadomień wyłącza powiadomienia push. Pozostałe funkcje działają niezależnie, o ile nie wymagają tej konkretnej informacji."),
                ),
                section(
                    "Cele i podstawy prawne",
                    list(
                        "utworzenie i obsługa konta, synchronizacja, dziennik górski, gry, rankingi bez ujawniania opcjonalnej tożsamości oraz funkcje zamówione przez użytkownika: wykonanie umowy, art. 6 ust. 1 lit. b RODO,",
                        "publikacja nazwy i avatara w rankingu po odrębnym włączeniu ich widoczności przez użytkownika: wykonanie uruchomionej przez użytkownika funkcji społecznościowej, art. 6 ust. 1 lit. b RODO; widoczność można później wyłączyć w aplikacji lub przez kontakt z operatorem,",
                        "lokalne użycie bieżącej lokalizacji i biblioteki zdjęć do funkcji uruchomionej przez użytkownika: wykonanie umowy, art. 6 ust. 1 lit. b RODO; komunikat iOS o uprawnieniu jest kontrolą systemową, a nie samodzielną podstawą prawną,",
                        "weryfikacja zakupów Apple, płatność, dostawa, odstąpienie, reklamacja, zwrot i kontakt dotyczący zamówienia: wykonanie umowy lub działania przed jej zawarciem, art. 6 ust. 1 lit. b RODO,",
                        "rachunkowość, podatki i obowiązki konsumenckie: obowiązek prawny, art. 6 ust. 1 lit. c RODO,",
                        "bezpieczeństwo kont i płatności, zapobieganie oszustwom, weryfikacja wyników, moderacja, diagnostyka oraz ustalanie i obrona roszczeń: prawnie uzasadniony interes operatora polegający na ochronie usługi, użytkowników i prawidłowości rozliczeń, art. 6 ust. 1 lit. f RODO.",
                    ),
                ),
                section(
                    "Publiczne profile i rankingi",
                    paragraph("Nowe konto ma domyślnie wyłączoną widoczność nazwy i avatara w rankingach. Użytkownik może osobno włączyć publikację każdego z tych elementów w ustawieniach profilu. Publiczny wpis może zawierać zaakceptowaną nazwę lub avatar, ukończone góry lub pieczątki, wynik, pozycję i czas osiągnięcia. Gdy nazwa jest ukryta, wpis otrzymuje etykietę bez nazwy, ale wynik i dane osiągnięcia mogą nadal pozwalać na rozpoznanie osoby w określonych okolicznościach."),
                    paragraph("Zmiana ustawienia nie zmienia pozostałych wyborów użytkownika. Backend odświeża zapisane wpisy rankingowe po zmianie, więc aktualizacja może nie być natychmiastowa. Po usunięciu konta wpisy rankingowe są pozbawiane identyfikatora, nazwy i avatara albo usuwane wraz z wynikami indeksowanymi dla konta. Pozostawiony wynik uznajemy za anonimowy tylko wtedy, gdy nie można już rozsądnie powiązać go z osobą; w przeciwnym razie traktujemy go jak dane pseudonimizowane i nadal stosujemy RODO."),
                ),
                section(
                    "Weryfikacja wyników i moderacja",
                    paragraph("Wyniki są automatycznie sprawdzane z użyciem danych wyniku, czasu, wersji aplikacji, identyfikatora instalacji i sygnałów App Attest. Wynik może zostać odrzucony, oznaczony jako podejrzany albo pominięty w rankingu. Nazwy, avatary i komentarze mogą być automatycznie moderowane przez OpenAI oraz sprawdzane przez operatora."),
                    paragraph(`Zastrzeżenia do moderacji lub wyniku można zgłosić przez dostępną funkcję zgłoszenia albo na ${config.contactEmail}.`),
                ),
                section(
                    "Płatności i zamówienia",
                    paragraph("Odblokowanie pełnego dostępu do gier oraz dobrowolne wsparcie „Nakarm Ryska” są osobnymi zakupami w aplikacji obsługiwanymi przez Apple. Otrzymujemy dane potrzebne do zweryfikowania produktu, transakcji, uprawnienia, anulowania lub zwrotu, ale nie pełne dane płatnicze Apple ID."),
                    paragraph(`Fizyczne metalowe piny są sprzedawane oddzielnie. ${config.paymentProcessorName} obsługuje płatność i przekazuje status transakcji. Dostępne metody mogą obejmować Apple Pay i BLIK, zależnie od urządzenia, banku, kraju i bieżącej konfiguracji. Kod BLIK jest chwilowo przetwarzany w aplikacji i przekazywany bezpośrednio do Stripe w celu autoryzacji. Operator nie utrwala go w backendzie ani logach i nie przechowuje pełnych numerów kart lub innych pełnych danych uwierzytelniających płatność.`),
                ),
                section(
                    "Zapobieganie nadużyciom i spory płatnicze",
                    paragraph("W celu wyjaśnienia podejrzenia nieuprawnionej płatności, podwójnego zwrotu, podmienionego towaru, pustej przesyłki, obejścia ograniczeń konta lub manipulacji wynikiem możemy zestawić identyfikatory konta, instalacji i transakcji, historię zamówienia i płatności, zdarzenia przewoźnika, korespondencję oraz dobrowolnie przekazane dowody. Zakres danych jest ograniczany do informacji adekwatnych do konkretnej sprawy."),
                    paragraph("Sprawa może zostać zweryfikowana ręcznie, a informacje konieczne do jej rozpatrzenia mogą zostać przekazane Apple, Stripe, bankowi, dostawcy metody płatności, przewoźnikowi, doradcy lub właściwemu organowi. Użytkownik może przedstawić wyjaśnienia i zakwestionować wynik zgodnie z regulaminem i prawem."),
                ),
                section(
                    "Lokalizacja, zdjęcia i uprawnienia urządzenia",
                    paragraph("Aplikacja używa dokładnej lokalizacji tylko podczas korzystania z funkcji pobliskich szczytów, odległości lub potwierdzenia obecności przy szczycie. Nie używa lokalizacji w tle ani nie tworzy historii ciągłego śledzenia. Współrzędne bieżącej lokalizacji służą do obliczeń na urządzeniu i nie są wysyłane do backendu; na serwer trafia wybrany szczyt, status i data wejścia."),
                    paragraph("Aplikacja odczytuje datę i GPS z EXIF wybranych zdjęć, aby lokalnie dopasować je do szczytów. Prywatne zdjęcia szczytowe wraz z oryginalnymi metadanymi pozostają na urządzeniu, a zdjęcie zrobione w aplikacji może otrzymać GPS bieżącej lokalizacji w EXIF. Avatar jest przeskalowywany do nowego pliku JPEG bez metadanych i dopiero taki plik jest wysyłany na serwer do moderacji i publikacji."),
                    paragraph("Uprawnienia lokalizacji, aparatu, zdjęć i powiadomień można zmienić w Ustawieniach iOS. Aplikacja rejestruje token powiadomień dopiero po udzieleniu właściwego uprawnienia."),
                ),
                section(
                    "Analityka, reklama i pamięć lokalna",
                    paragraph("Strona 28gor.app używa localStorage do zapamiętania języka, motywu i ustawień interfejsu i nie zawiera własnego narzędzia analitycznego. Webowy klient aplikacji inicjalizuje Firebase Analytics, które może mierzyć użycie strony i dane techniczne przeglądarki. Aplikacja iOS nie wysyła własnych logów wydajności do usługi analitycznej operatora; lokalne logi są domyślnie wyłączone poza diagnostyką."),
                    paragraph("Nie wykorzystujemy danych do reklamy behawioralnej. Aplikacja zawiera SDK Meta do funkcji udostępniania, a dane przetwarzane przez Meta podlegają jej własnym zasadom prywatności."),
                ),
                section(
                    "Odbiorcy danych",
                    list(
                        "Google i Firebase jako dostawcy uwierzytelniania, backendu, bazy danych, przechowywania avatarów, funkcji chmurowych, powiadomień i ochrony integralności,",
                        "Apple jako dostawca logowania, App Store, StoreKit, zakupów w aplikacji, zwrotów i usług urządzenia,",
                        `${config.paymentProcessorName}, banki i dostawcy metod płatności w związku z zakupem fizycznych pinów, zwrotem, reklamacją płatniczą lub chargebackiem,`,
                        "InPost w zakresie wyboru punktu, dostawy, zwrotu i obsługi przesyłki oraz Resend w zakresie wiadomości transakcyjnych,",
                        "OpenAI w zakresie automatycznej moderacji nazwy, avatara i komentarzy oraz Meta w zakresie uruchamianej przez użytkownika funkcji udostępniania,",
                        "doradcy prawni i księgowi, sądy oraz organy publiczne, gdy jest to potrzebne do ochrony praw albo wymagane prawem."
                    ),
                    paragraph("Nie sprzedajemy danych osobowych. W zależności od usługi odbiorca działa jako podmiot przetwarzający na zlecenie operatora albo jako niezależny administrator na podstawie własnych obowiązków. Otrzymuje tylko dane potrzebne do określonego celu."),
                ),
                section(
                    "Przekazywanie danych poza EOG",
                    paragraph("Niektórzy dostawcy mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. Stosujemy wtedy mechanizmy dozwolone przez RODO, w szczególności decyzję stwierdzającą odpowiedni stopień ochrony albo standardowe klauzule umowne wraz z wymaganymi zabezpieczeniami."),
                ),
                section(
                    "Okres przechowywania i usunięcie konta",
                    list(
                        "konto, profil, avatar przechowywany na serwerze, postęp, zdarzenia i dane powiadomień przechowujemy do usunięcia konta albo wcześniejszego usunięcia konkretnej informacji,",
                        "po usunięciu konta publiczne wpisy rankingowe są usuwane albo pozbawiane identyfikatora konta, nazwy i avatara; wynik może pozostać dla spójności rankingu, ale jest uznawany za anonimowy dopiero wtedy, gdy nie można go już rozsądnie powiązać z osobą,",
                        "ocena i komentarz do szczytu mogą pozostać po usunięciu konta z oznaczeniem bez nazwy; zapis traci identyfikator konta, e-mail i nazwę autora, otrzymuje nowy losowy identyfikator techniczny bez dawnego identyfikatora konta, a powiązane zgłoszenia dotyczące starego wpisu są usuwane; treść nadal traktujemy jak dane osobowe, dopóki może pozwalać na rozpoznanie osoby; użytkownik może zażądać także usunięcia konkretnej oceny lub komentarza, z zastrzeżeniem prawnych wyjątków od usunięcia,",
                        "lokalne zdjęcia szczytowe są usuwane z danych aplikacji na urządzeniu, na którym zakończono proces usuwania; nie usuwamy ich oryginałów z systemowej biblioteki Zdjęcia ani kopii pozostawionych na innych urządzeniach,",
                        "rejestr transakcji StoreKit i status uprawnienia mogą pozostać po usunięciu konta tak długo, jak jest to potrzebne do obsługi aktywnego uprawnienia, przywrócenia lub przeniesienia go po zakończonym usunięciu, zwrotu, cofnięcia, ochrony przed nadużyciem albo obrony roszczeń,",
                        "dane zamówień, płatności, dostaw, zwrotów, reklamacji i sporów płatniczych, w tym adekwatne dowody dotyczące przesyłki lub zwrotu, przechowujemy przez okres wynikający z obowiązków podatkowych, rachunkowych i konsumenckich oraz do upływu terminów dochodzenia lub obrony roszczeń,",
                        "logi bezpieczeństwa i diagnostyki przechowujemy do zakończenia analizy incydentu lub przez okres potrzebny do wykrywania nadużyć i obrony roszczeń; lokalne logi znikają wraz z danymi aplikacji,",
                        "kopie zapasowe są nadpisywane zgodnie z cyklem retencji; usunięte dane mogą pozostawać w zabezpieczonych kopiach do ich planowego nadpisania i nie są używane do zwykłej obsługi."
                    ),
                    paragraph("Zweryfikowany użytkownik może rozpocząć usunięcie konta w ustawieniach aplikacji. Samo odinstalowanie aplikacji nie usuwa konta. Okresowo sprawdzamy, czy przechowywane dane są nadal potrzebne, i usuwamy je albo anonimizujemy, gdy ustaje cel oraz nie obowiązuje dalsza podstawa przechowywania."),
                ),
                section(
                    "Prawa i wybory użytkownika",
                    paragraph("Na zasadach określonych w RODO użytkownik może żądać dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia danych i sprzeciwić się przetwarzaniu opartemu na prawnie uzasadnionym interesie. Zgodę można wycofać bez wpływu na zgodność wcześniejszego przetwarzania z prawem."),
                    paragraph(`Aby skorzystać z praw, napisz na ${config.contactEmail}. Możemy poprosić tylko o informacje potrzebne do potwierdzenia tożsamości. Odpowiadamy bez zbędnej zwłoki, co do zasady w ciągu miesiąca; termin może zostać przedłużony o dalsze dwa miesiące w złożonych przypadkach lub przy dużej liczbie żądań, o czym informujemy w pierwszym miesiącu wraz z przyczyną. Użytkownik może też wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.`),
                ),
                section(
                    "Zautomatyzowane sprawdzanie",
                    paragraph("Automatyczne mechanizmy mogą wykrywać zabronione treści, nadużycia lub niewiarygodne wyniki. Nie wykorzystujemy ich do podejmowania decyzji wywołujących skutki prawne lub podobnie istotnie wpływających na użytkownika bez możliwości zakwestionowania wyniku i kontaktu z obsługą."),
                ),
                section(
                    "Dzieci i bezpieczeństwo",
                    paragraph("Osoba, która nie może samodzielnie wyrazić ważnej zgody lub zawrzeć umowy zgodnie z właściwym prawem, powinna korzystać z usługi za zgodą i pod nadzorem rodzica albo opiekuna. Nazwa i avatar nowego konta pozostają domyślnie ukryte w rankingach niezależnie od wieku użytkownika."),
                    paragraph("Stosujemy adekwatne zabezpieczenia organizacyjne i techniczne, w tym uwierzytelnianie, reguły dostępu, weryfikację integralności i ograniczenie zakresu danych, ale żadna transmisja ani metoda przechowywania nie gwarantuje całkowitego bezpieczeństwa."),
                ),
                section(
                    "Zmiany polityki",
                    paragraph(`Polityka może być aktualizowana wraz ze zmianą usługi lub prawa. Aktualna wersja, data, godzina i strefa czasowa ostatniej aktualizacji są publikowane na ${config.siteHost}/privacy. O istotnych zmianach poinformujemy w aplikacji lub innym odpowiednim kanałem.`),
                ),
            ],
        },
        terms: {
            slug: "terms",
            title: "Regulamin",
            effectiveDate: "Obowiązuje od 16 lipca 2026 r.",
            updatedDate: polishUpdatedDate,
            intro: [
                `Regulamin określa zasady korzystania z aplikacji 28 gór i strony ${config.siteHost}, zakupów cyfrowych w App Store oraz zamawiania fizycznych metalowych pinów.`,
                "Regulamin wiąże użytkownika po jego wyraźnym zaakceptowaniu albo w odniesieniu do konkretnej usługi bez konta, gdy został udostępniony przed zamówieniem tej usługi. Samo przeglądanie publicznej strony lub pobranie aplikacji nie zastępuje akceptacji.",
            ],
            sections: [
                section(
                    "Usługodawca i kontakt",
                    paragraph(`Usługodawcą, operatorem 28 gór i sprzedawcą fizycznych pinów jest ${polishOperatorIdentity}.`),
                    paragraph(`Kontakt w sprawach usługi, zakupów, reklamacji i danych osobowych: ${config.contactEmail}, telefon: ${config.contactPhone}.`),
                ),
                section(
                    "Pierwszeństwo wersji polskiej",
                    paragraph("Dokumenty prawne są dostępne po polsku i angielsku. W razie rozbieżności pierwszeństwo ma wersja polska, w zakresie dozwolonym przez bezwzględnie obowiązujące przepisy prawa."),
                ),
                section(
                    "Definicje",
                    list(
                        "aplikacja lub usługa: aplikacja mobilna 28 gór wraz z powiązanymi usługami internetowymi i stroną,",
                        "konto: indywidualne konto użytkownika w 28 gór,",
                        "konsument: konsument w rozumieniu prawa oraz, w zakresie przyznanym przez prawo, osoba fizyczna chroniona jak konsument przy umowie bez zawodowego charakteru dla jej działalności gospodarczej,",
                        "odblokowanie gier: jednorazowy zakup pełnego, wcześniejszego dostępu do wszystkich gier archiwum,",
                        "„Nakarm Ryska”: dobrowolne, niezależne wsparcie operatora kupowane przez Apple In-App Purchase,",
                        "pin: fizyczna metalowa przypinka lub inna wyraźnie oznaczona fizyczna pamiątka oferowana w sklepie,",
                        "treści użytkownika: w szczególności zdjęcia, podpisy, notatki, oceny, komentarze, pseudonim, avatar i publiczny profil."
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
                    "Zawarcie, czas trwania i rozwiązanie umowy",
                    paragraph("Umowa o konto i powiązane usługi elektroniczne zostaje zawarta, gdy użytkownik wyraźnie zaakceptuje regulamin w procesie utworzenia lub aktywacji konta. Jest zawarta na czas nieoznaczony. Samo pobranie aplikacji, przeglądanie publicznej strony lub uruchomienie funkcji nie zastępuje akceptacji. Umowa o jednorazową usługę bez konta zostaje zawarta, gdy użytkownik zamówi ją po udostępnieniu właściwych warunków, i trwa przez czas potrzebny do jej wykonania."),
                    paragraph("Umowa sprzedaży fizycznego produktu zostaje zawarta, gdy operator potwierdzi przyjęcie zamówienia do realizacji na trwałym nośniku. Samo rozpoczęcie płatności lub autoryzacja kwoty nie oznacza jeszcze przyjęcia zamówienia. Zakupy Apple są zawierane i rozliczane zgodnie z procesem App Store."),
                    paragraph("Użytkownik może w każdej chwili wypowiedzieć umowę o konto przez rozpoczęcie usuwania konta w aplikacji albo kontakt z operatorem. Nie ogranicza to praw dotyczących już zawartych zakupów, reklamacji ani obowiązków zachowania dokumentacji. Operator może zakończyć umowę tylko na zasadach opisanych w części o zawieszeniu i zakończeniu dostępu."),
                ),
                section(
                    "Konto i jego usunięcie",
                    paragraph("Użytkownik odpowiada za prawdziwość danych konta, rozsądne zabezpieczenie dostępu oraz działania, które sam wykonał lub świadomie umożliwił. Nie wolno udostępniać konta w sposób umożliwiający podszywanie się lub obchodzenie zabezpieczeń ani tworzyć lub używać dodatkowych kont głównie po to, aby obejść ograniczenie, zawieszenie, limit zakupu lub promocji albo manipulować rankingiem."),
                    paragraph("Przy wiarygodnym sygnale przejęcia konta, nieuprawnionej płatności lub innego nadużycia operator może poprosić o ponowne uwierzytelnienie, unieważnić aktywne sesje albo czasowo wstrzymać ryzykowną czynność na okres niezbędny do wyjaśnienia sprawy. Takie zabezpieczenie musi być proporcjonalne i nie może dowolnie pozbawiać opłaconego uprawnienia ani praw konsumenta."),
                    paragraph("Zweryfikowany użytkownik może rozpocząć trwałe usunięcie konta w ustawieniach aplikacji. Usunięcie obejmuje usunięcie lub anonimizację danych zgodnie z Polityką prywatności; ograniczone kopie zapasowe i dokumentacja wymagana prawem mogą pozostać przez właściwy okres."),
                    paragraph("Usunięcie konta ani odinstalowanie aplikacji nie anuluje zakupu Apple i nie powoduje automatycznego zwrotu. Po zakończeniu usuwania można utworzyć lub zalogować inne uwierzytelnione konto 28 gór i spróbować przywrócić aktywne odblokowanie przy użyciu tego samego Apple ID. Ze względów bezpieczeństwa może być potrzebne techniczne odłączenie uprawnienia od usuniętego konta."),
                ),
                section(
                    "Publiczne profile i rankingi",
                    paragraph("Nazwa i avatar nowego konta są domyślnie ukryte w rankingach. Po osobnym włączeniu właściwego ustawienia publiczny wpis może zawierać nazwę wyświetlaną, zaakceptowany avatar, ukończone góry lub pieczątki, wynik, pozycję w rankingu i czas osiągnięcia. Użytkownik odpowiada za swoją nazwę, avatar i publikowane dane oraz nie może podszywać się pod inną osobę ani naruszać jej praw."),
                    paragraph("Rankingi są funkcją społecznościową, a nie konkursem z nagrodami. Mogą być poprawiane, przeliczane lub odbudowywane po wykryciu błędu. Podejrzane, zmanipulowane albo niemożliwe do zweryfikowania wyniki mogą zostać ukryte lub usunięte."),
                ),
                section(
                    "Uczciwa gra",
                    list(
                        "nie wolno manipulować czasem, wynikiem, lokalizacją, stanem aplikacji ani transmisją danych,",
                        "nie wolno używać botów, automatyzacji, zmodyfikowanego klienta, exploitów ani cudzych transakcji lub kont,",
                        "nie wolno używać wielu kont ani uzgadniać działań z innymi osobami w celu sztucznego podbijania wyników, obchodzenia weryfikacji lub wypierania uczciwych wyników z rankingu,",
                        "nie wolno wielokrotnie przesyłać fałszywych wyników ani obchodzić mechanizmów integralności,",
                        "operator może poprosić o ponowną synchronizację lub weryfikację i unieważnić wynik, którego wiarygodności nie da się potwierdzić."
                    ),
                ),
                section(
                    "Treści użytkownika i moderacja",
                    paragraph("Użytkownik zachowuje prawa do swoich treści. Udziela operatorowi niewyłącznej, nieodpłatnej, obowiązującej przez okres przechowywania treści licencji wyłącznie na hostowanie, zapisywanie, kopiowanie techniczne, kompresowanie, zmianę rozmiaru i formatu, przesyłanie oraz wyświetlanie treści w zakresie potrzebnym do świadczenia, zabezpieczenia i moderowania 28 gór."),
                    paragraph("Licencja nie obejmuje wykorzystania zdjęć ani innych treści w reklamie lub marketingu poza usługą bez osobnej zgody użytkownika."),
                    paragraph("Nie wolno publikować treści bezprawnych, obraźliwych, zagrażających bezpieczeństwu, naruszających prywatność, dobra osobiste, prawa autorskie lub inne prawa osób trzecich. Operator może sprawdzać, ograniczać widoczność lub usuwać takie treści i profile."),
                    paragraph(`Komentarze i inne treści można zgłaszać za pomocą dostępnych funkcji w aplikacji. Punktem kontaktowym dla odbiorców usługi i zgłoszeń dotyczących nielegalnych treści jest także ${config.contactEmail}; kontakt jest obsługiwany po polsku i angielsku. Można tam zgłaszać treści, profile, konta lub wpisy rankingowe.`),
                    paragraph("Zgłoszenie nielegalnej treści powinno wskazywać dokładne miejsce lub identyfikator elementu, wyjaśniać, dlaczego zgłaszający uważa go za nielegalny, oraz zawierać oświadczenie w dobrej wierze, że informacje są dokładne i kompletne. Powinno także zawierać imię lub nazwę i adres e-mail zgłaszającego, chyba że prawo pozwala na pominięcie tych danych."),
                    paragraph("Zgłoszenia należy składać w dobrej wierze. Nie wolno świadomie składać fałszywych zgłoszeń, podszywać się pod osobę pokrzywdzoną ani masowo powielać zgłoszeń w celu nękania użytkownika lub wymuszenia usunięcia zgodnej z prawem treści."),
                    paragraph("Gdy jest to możliwe, operator potwierdza otrzymanie zgłoszenia i rozpatruje je terminowo, starannie, obiektywnie, bez dyskryminacji i bez arbitralności. Operator nie ma ogólnego obowiązku uprzedniego sprawdzania wszystkich treści ani aktywnego poszukiwania naruszeń."),
                    paragraph("Jeżeli operator ograniczy widoczność lub usunie treść, zawiesi usługę albo konto z powodu treści użytkownika, przekazuje zainteresowanemu użytkownikowi uzasadnienie w zakresie wymaganym prawem. Uzasadnienie wskazuje decyzję, jej podstawę prawną lub regulaminową, istotne okoliczności, wykorzystanie automatyzacji oraz dostępny sposób zakwestionowania decyzji, chyba że prawo pozwala odstąpić od zawiadomienia."),
                    paragraph(`Zgłaszający i użytkownik, którego dotyczy decyzja, otrzymują informację o wyniku, uzasadnieniu i dostępnym sposobie zakwestionowania w zakresie wymaganym prawem. Zastrzeżenie można przesłać na ${config.contactEmail}; ponowna ocena nie opiera się wyłącznie na automatyzacji.`),
                ),
                section(
                    "Jednorazowe odblokowanie pełnego dostępu do gier",
                    paragraph("Poszczególne gry mogą początkowo odblokowywać się bezpłatnie wraz z postępem użytkownika. Użytkownik może zamiast tego kupić jednorazowe odblokowanie pełnego, wcześniejszego dostępu do wszystkich gier objętych ofertą."),
                    paragraph("Zakup jest realizowany wyłącznie jako Apple In-App Purchase i obciąża konto App Store po potwierdzeniu. Cena, waluta i dokładny zakres są wyświetlane przed zakupem. Nie jest to subskrypcja, zakup fizyczny ani płatność przez Stripe, Apple Pay lub BLIK."),
                    paragraph("Odblokowanie jest produktem niekonsumpcyjnym. Dostępny w aplikacji mechanizm „Przywróć wcześniejszy zakup” odczytuje bieżące uprawnienie StoreKit i może odtworzyć dostęp na zgodnym urządzeniu przy użyciu tego samego Apple ID oraz uwierzytelnionego konta 28 gór. Po zakończonym usunięciu poprzedniego konta aktywne uprawnienie może zostać przypisane do nowego konta. Mechanizm nie przywraca zakupów wsparcia „Nakarm Ryska”."),
                    paragraph(`Zwroty i rozliczenia zakupu obsługuje Apple zgodnie z zasadami App Store. Pomoc techniczną dotyczącą aktywacji zapewnia operator pod adresem ${config.contactEmail}. Usunięcie konta nie powoduje zwrotu ceny.`),
                    paragraph("Konsument zachowuje ustawowe prawa dotyczące zgodności treści i usług cyfrowych z umową. Jeżeli odblokowanie lub objęta nim usługa są niezgodne z umową, może żądać doprowadzenia do zgodności, a w przypadkach przewidzianych prawem także obniżenia ceny albo rozwiązania umowy."),
                ),
                section(
                    "Dobrowolne wsparcie „Nakarm Ryska”",
                    paragraph("„Nakarm Ryska” jest dobrowolnym wsparciem rozwoju 28 gór, niezależnym od odblokowania gier. Nie odblokowuje funkcji, treści, gier, wyników ani innych uprawnień."),
                    paragraph("Wsparcie może być oferowane w jednym lub kilku wariantach cenowych. Każdy zakup jest konsumpcyjnym Apple In-App Purchase, może zostać dokonany więcej niż raz i nie podlega przywracaniu jako trwałe uprawnienie. Dostępne warianty i ich ceny są wyświetlane przed zakupem."),
                    paragraph("Zakup wsparcia nie jest realizowany przez Stripe, Apple Pay, BLIK ani checkout fizycznych pinów. Rozliczenia i wnioski o zwrot obsługuje Apple zgodnie z zasadami App Store."),
                ),
                section(
                    "Odstąpienie od zakupu cyfrowego",
                    paragraph("Apple obsługuje proces zakupu i rozliczenie w App Store, ale nie ogranicza to bezwzględnie obowiązujących praw konsumenta wobec właściwego podmiotu odpowiedzialnego za umowę."),
                    paragraph("Jeżeli odpłatna treść cyfrowa ma zostać dostarczona od razu, a konsument ma utracić 14-dniowe prawo odstąpienia po rozpoczęciu świadczenia, wyjątek działa tylko po spełnieniu wszystkich wymogów prawa: wyraźnej uprzedniej zgodzie i żądaniu rozpoczęcia świadczenia, uprzedniej informacji oraz przyjęciu do wiadomości utraty prawa, a także przekazaniu potwierdzenia umowy na trwałym nośniku. Jeżeli choć jeden wymóg nie jest spełniony, ustawowe prawo odstąpienia pozostaje. Usunięcie konta lub aplikacji nie jest samo w sobie oświadczeniem o odstąpieniu."),
                    paragraph("Zakres odblokowania obejmuje gry i funkcje dokładnie wskazane przed zakupem. Nie obejmuje przyszłych gier ani funkcji, chyba że oferta wyraźnie je obiecuje. Nie ogranicza to nabytego uprawnienia, obowiązku zgodności treści lub usługi cyfrowej z umową ani wymaganych prawem aktualizacji."),
                ),
                section(
                    "Fizyczne metalowe piny",
                    paragraph("Piny są towarami fizycznymi sprzedawanymi oddzielnie od odblokowania gier i „Nakarm Ryska”. Nie są Apple In-App Purchase i nie nadają cyfrowych uprawnień, chyba że opis produktu jednoznacznie wskazuje dodatkową, zgodną z prawem funkcję."),
                    paragraph(`Sprzedawcą jest ${polishOperatorIdentity}. Przed złożeniem zamówienia użytkownik otrzymuje informacje o produkcie, cenie, kosztach dostawy, łącznej kwocie oraz dostęp do danych sprzedawcy i warunków sprzedaży. Dane sprzedawcy oraz informacje dotyczące zamówienia są również przekazywane lub udostępniane w potwierdzeniu zamówienia.`),
                    paragraph(`${config.paymentProcessorName} obsługuje płatność. Dostępne metody obejmują Apple Pay i BLIK, jeżeli są dostępne dla urządzenia, banku, kraju i bieżącej konfiguracji płatności. Operator nie przechowuje pełnych numerów kart, kodów BLIK ani pełnych danych uwierzytelniających płatność.`),
                    paragraph("Pin może być dostępny w ograniczonej liczbie, wykonywany na zamówienie lub oferowany w przedsprzedaży. Odpowiednie oznaczenie i przewidywany termin realizacji są pokazywane przed zakupem."),
                    paragraph(`Dla produktu wprowadzanego na rynek pod marką 28 gór operatorem odpowiedzialnym za bezpieczeństwo produktu i, o ile oferta nie wskazuje innego producenta, producentem jest ${polishOperatorIdentity}. Internetowa oferta jasno i widocznie pokazuje zdjęcie lub typ i identyfikator produktu, nazwę producenta, jego adres pocztowy i elektroniczny oraz wymagane ostrzeżenia lub informacje bezpieczeństwa w zrozumiałym języku. Produkt, opakowanie lub dokument towarzyszący zawierają ponadto oznaczenia wymagane prawem. Pin ma ostre zakończenie i małe elementy, nie jest zabawką, powinien pozostawać poza zasięgiem dzieci, a uszkodzonego produktu nie należy używać.`),
                ),
                section(
                    "Zamówienie, obowiązek zapłaty i potwierdzenie",
                    paragraph("Bezpośrednio przed złożeniem zamówienia checkout pokazuje istotne cechy produktu, liczbę sztuk, dane odbiorcy, sposób i koszt dostawy, cenę, łączną kwotę do zapłaty, dane sprzedawcy, termin realizacji, właściwe informacje bezpieczeństwa oraz wersję warunków sprzedaży."),
                    paragraph("Końcowa czynność składania zamówienia jest oznaczona w sposób jednoznacznie wskazujący obowiązek zapłaty. Wykonując ją, użytkownik składa zamówienie z obowiązkiem zapłaty i potwierdza zapoznanie się z udostępnionymi warunkami."),
                    paragraph("Po przyjęciu zamówienia operator przesyła na e-mail potwierdzenie na trwałym nośniku. Obejmuje ono dane sprzedawcy i zamówienia, cenę i dostawę, przyjętą wersję regulaminu albo jej treść, informacje o prawie odstąpienia oraz wzór formularza odstąpienia."),
                ),
                section(
                    "Limity, weryfikacja i błędy zamówienia",
                    paragraph("Operator może stosować rozsądne limity ilościowe lub warunki promocji, jeżeli zostaną pokazane przed zakupem. Nie wolno obchodzić ich przez dodatkowe konta, powtarzane zamówienia, podstawione dane odbiorców lub skoordynowane działania. Przy ogłoszeniu obniżki ceny operator podaje także najniższą cenę z 30 dni przed obniżką, gdy wymaga tego prawo."),
                    paragraph("Przed potwierdzeniem przyjęcia zamówienia do realizacji operator może je odrzucić z powodu braku produktu, niedostępnego sposobu dostawy, oczywistego błędu ceny lub opisu, błędu technicznego albo obiektywnych sygnałów nieuprawnionej płatności lub oszustwa. Operator informuje o odmowie i bez zbędnej zwłoki zwalnia autoryzację albo zwraca pobraną kwotę."),
                    paragraph("Po zawarciu umowy operator nie może anulować zamówienia według swobodnego uznania i może działać tylko na podstawie regulaminu lub prawa. Jeżeli ta sama należność zostanie pobrana więcej niż raz, operator po potwierdzeniu duplikatu bez zbędnej zwłoki zwraca nienależnie pobraną kwotę."),
                ),
                section(
                    "Dostawa fizycznych pinów",
                    paragraph("Dostępne kraje dostawy, przewoźnik, koszt i przewidywany czas są pokazywane w checkoutcie. Termin może zależeć od dostępności, produkcji na zamówienie lub przedsprzedaży. Użytkownik powinien podać kompletny i prawidłowy adres oraz sprawdzić go przed zapłatą."),
                    paragraph(`Pytania o niedostarczoną, opóźnioną lub uszkodzoną przesyłkę można kierować na ${config.contactEmail}, podając numer zamówienia.`),
                    paragraph("Ryzyko przypadkowej utraty lub uszkodzenia pina przechodzi na konsumenta dopiero przy jego otrzymaniu, chyba że konsument samodzielnie wybrał przewoźnika, którego operator nie oferował. Postanowienia o adresie lub nieodebraniu przesyłki nie przenoszą na konsumenta ryzyka, za które zgodnie z prawem odpowiada sprzedawca."),
                    paragraph("Nieodebranie przesyłki nie jest samo w sobie oświadczeniem o odstąpieniu od umowy. Jeżeli zwrot przesyłki lub ponowna wysyłka wynika wyłącznie z niepełnych lub błędnych danych podanych przez użytkownika albo z nieodebrania prawidłowo zaadresowanej przesyłki, operator może żądać jedynie rzeczywiście poniesionych i udokumentowanych dodatkowych kosztów przewoźnika, w zakresie dozwolonym prawem. Nie dotyczy to kosztów spowodowanych działaniem operatora lub przewoźnika i nie ogranicza prawa do reklamacji ani odstąpienia."),
                ),
                section(
                    "Odstąpienie od zakupu fizycznego pina",
                    paragraph(`Konsument może odstąpić od umowy zakupu fizycznego pina bez podawania przyczyny w ciągu 14 dni od jego otrzymania. Wystarczy wysłać jednoznaczne oświadczenie na ${config.contactEmail} przed upływem terminu; nie jest potrzebna wcześniejsza zgoda operatora.`),
                    paragraph(`Pin należy odesłać nie później niż 14 dni od złożenia oświadczenia na adres: ${config.operatorAddress}. Bezpośredni koszt odesłania ponosi konsument. Nie jest potrzebna wcześniejsza zgoda operatora ani numer autoryzacji zwrotu.`),
                    paragraph("Konsument może otworzyć opakowanie i obejrzeć pin w zakresie potrzebnym do ustalenia jego charakteru, cech i działania. Odpowiada jedynie za zmniejszenie wartości wynikające z obchodzenia się z towarem w sposób wykraczający poza taki zakres; samo otwarcie opakowania nie wyłącza prawa odstąpienia."),
                    paragraph("Zwrot powinien obejmować pin będący przedmiotem danego zakupu. Odesłanie innego produktu albo pustej przesyłki nie jest zwrotem zakupionego pina. Operator może proporcjonalnie udokumentować masę, stan, otwarcie i zawartość przesyłki, a konsument może przedstawić dowody przeciwne. Oryginalne opakowanie, paragon ani zdjęcia nie są warunkiem skorzystania z prawa odstąpienia."),
                    paragraph("Po skutecznym odstąpieniu zwracamy cenę pina oraz koszt najtańszej oferowanej zwykłej dostawy, nie później niż 14 dni od otrzymania oświadczenia. Nie zwracamy dopłaty za wybrany droższy sposób dostawy. Zwrot następuje tą samą metodą płatności, chyba że konsument wyraźnie zgodzi się na inną bez dodatkowych kosztów. Możemy wstrzymać zwrot do otrzymania pina lub przedstawienia dowodu jego odesłania, zależnie od tego, co nastąpi wcześniej."),
                    paragraph(`Wzór oświadczenia: „Ja, [imię i nazwisko], informuję o odstąpieniu od umowy sprzedaży [produkt], numer zamówienia [numer], data zamówienia lub odbioru [data], adres [adres], data i podpis, jeżeli formularz jest papierowy”. Skorzystanie z wzoru nie jest obowiązkowe. Oświadczenie można wysłać na ${config.contactEmail} albo pod adres operatora.`),
                ),
                section(
                    "Reklamacje fizycznych pinów",
                    paragraph(`Reklamację z powodu niezgodności pina z umową można wysłać na ${config.contactEmail}. Należy podać informacje wystarczające do odnalezienia zakupu, opisać problem i wskazać oczekiwane rozwiązanie. Paragon nie jest jedynym dopuszczalnym dowodem zakupu. Zdjęcia są pomocne, ale nie są obowiązkowe, jeśli problem można ustalić inaczej; operator może poprosić tylko o informacje lub dowody rozsądnie potrzebne do rozpatrzenia konkretnej sprawy.`),
                    paragraph("Operator odpowiada za brak zgodności pina z umową istniejący w chwili dostarczenia i ujawniony w ciągu dwóch lat od dostarczenia, chyba że zadeklarowany dłuższy okres przydatności uzasadnia dłuższą odpowiedzialność. Reklamacja towaru jest rozpatrywana oddzielnie od odstąpienia bez podawania przyczyny i od reklamacji technicznej aplikacji."),
                    paragraph("Konsument może żądać naprawy albo wymiany. Operator może zastosować drugi z tych sposobów tylko wtedy, gdy wybrany sposób jest niemożliwy albo wymagałby nadmiernych kosztów w porównaniu z drugim, na zasadach określonych prawem. Obniżenie ceny albo odstąpienie od umowy przysługuje w przypadkach wskazanych w ustawie, w szczególności gdy operator odmówił lub nie doprowadził towaru do zgodności, brak nadal występuje albo jest na tyle istotny, że uzasadnia natychmiastowy środek. Jeżeli operator twierdzi, że brak jest nieistotny w celu odmowy odstąpienia, ponosi ciężar wykazania tego w zakresie wynikającym z prawa."),
                    paragraph("Konsument udostępnia reklamowany pin operatorowi. Jeżeli zgodnie z prawem towar trzeba odebrać w celu naprawy lub wymiany, operator odbiera go na swój koszt; konsument nie ponosi kosztów doprowadzenia towaru do zgodności z umową."),
                    paragraph("Kwota należna po skutecznym obniżeniu ceny albo odstąpieniu jest zwracana niezwłocznie, nie później niż w terminie wymaganym prawem, przy użyciu takiego samego sposobu zapłaty, chyba że konsument wyraźnie zgodzi się na inny sposób bez dodatkowych kosztów."),
                    paragraph("Operator odpowiada na reklamację konsumenta w terminie 14 dni od jej otrzymania, na papierze albo innym trwałym nośniku. Brak odpowiedzi w terminie wywołuje skutki przewidziane przez bezwzględnie obowiązujące przepisy."),
                ),
                section(
                    "Spory płatnicze i podwójne zwroty",
                    paragraph("Użytkownik zachowuje prawo do zakwestionowania płatności lub skorzystania z procedury banku, dostawcy płatności albo Apple. Powinien podawać prawdziwe informacje i w rozsądnym zakresie współpracować przy wyjaśnianiu, czy płatność, dostawa lub zwrot zostały prawidłowo wykonane."),
                    paragraph("Operator może przekazać podmiotowi rozpatrującemu spór adekwatne dane zamówienia, potwierdzenie płatności i zwrotu, status przesyłki, korespondencję oraz inne dowody dotyczące sprawy. Żaden pojedynczy zapis operatora nie jest z góry uznawany za rozstrzygający, a użytkownik może przedstawić dowody przeciwne."),
                    paragraph("Użytkownik nie powinien żądać drugiego zwrotu za należność, która została już zwrócona. Jeżeli otrzyma zwrot z więcej niż jednego źródła za tę samą płatność, powinien poinformować operatora i zwrócić nienależnie otrzymaną nadwyżkę. Operator może dochodzić wyłącznie należnej kwoty oraz rzeczywiście poniesionej i udokumentowanej szkody na zasadach wynikających z prawa; regulamin nie ustanawia kary ani opłaty za chargeback."),
                ),
                section(
                    "Problemy techniczne i zakupy Apple",
                    paragraph(`Problem z kontem, synchronizacją, rankingiem, grą albo aktywacją odblokowania można zgłosić na ${config.contactEmail}, podając opis, wersję aplikacji i urządzenie. Nie należy przesyłać haseł ani pełnych danych płatniczych.`),
                    paragraph("Rozliczenia, obciążenia i zwroty Apple In-App Purchase prowadzi Apple. Operator pomaga w technicznej weryfikacji produktu i dostępu, ale nie może samodzielnie zwrócić płatności pobranej przez App Store."),
                    paragraph("Jeżeli treść lub usługa cyfrowa jest niezgodna z umową, konsument może żądać doprowadzenia jej do zgodności, a w przypadkach określonych prawem obniżenia ceny albo rozwiązania umowy. Operator odpowiada na reklamację w ciągu 14 dni na papierze albo innym trwałym nośniku i doprowadza usługę do zgodności bez zbędnej zwłoki oraz bez nadmiernych niedogodności."),
                ),
                section(
                    "Nadużycia usługi i kontaktu",
                    paragraph("Nie wolno bez uprawnienia uzyskiwać dostępu do cudzych kont lub niepublicznych danych, używać cudzych danych płatniczych, omijać kontroli dostępu lub limitów zapytań, zakłócać działania usługi, masowo pobierać niepublicznych danych ani prowadzić testów bezpieczeństwa, które mogą naruszyć prawo, prywatność lub dostępność usługi."),
                    paragraph("Nie wolno automatycznie lub masowo wysyłać spamu, świadomie fałszywych zgłoszeń, gróźb ani powtarzanych wiadomości służących nękaniu lub dezorganizacji obsługi. Operator może łączyć powielone sprawy, ograniczać nadmierny automatyczny ruch i kierować kontakt do jednego kanału, ale nie może w ten sposób blokować ustawowej reklamacji, odstąpienia, realizacji praw do danych ani dostępu do sądu lub organu."),
                    paragraph("Środki ochronne są dobierane do wagi, częstotliwości i wiarygodności naruszenia oraz ograniczane do potrzebnego zakresu i czasu. Jeżeli okoliczności na to pozwalają, użytkownik otrzymuje przyczynę działania i możliwość wyjaśnienia lub zakwestionowania sprawy."),
                ),
                section(
                    "Zawieszenie i zakończenie dostępu",
                    paragraph("Operator może ograniczyć, zawiesić lub zakończyć dostęp do konta albo funkcji, gdy jest to proporcjonalnie konieczne z powodu naruszenia prawa lub regulaminu, oszustwa, zagrożenia bezpieczeństwa, podszywania się, powtarzających się nadużyć lub ochrony innych osób. Przy ocenie bierze pod uwagę wagę, częstotliwość, skutki i umyślność zachowania."),
                    paragraph("Przed środkiem dotyczącym naruszenia możliwego do usunięcia lub powtarzającego się operator co do zasady przekazuje ostrzeżenie i rozsądny czas na poprawę. Może działać bez uprzedzenia, gdy wymaga tego pilne zagrożenie bezpieczeństwa, poważne lub bezprawne zachowanie, ochrona innych osób albo obowiązek prawny. Trwałe zakończenie konta jest środkiem ostatecznym, chyba że charakter naruszenia uzasadnia je od razu."),
                    paragraph(`Użytkownik otrzymuje uzasadnienie i informację o sposobie zakwestionowania decyzji w zakresie wymaganym prawem; zastrzeżenie można wysłać na ${config.contactEmail}. Ograniczenie konta nie uchyla zawartych już umów sprzedaży, reklamacji, odstąpień, praw do danych ani innych praw, które muszą pozostać dostępne.`),
                ),
                section(
                    "Odpowiedzialność i rzeczywiste szkody",
                    paragraph("Użytkownik odpowiada na zasadach wynikających z prawa za rzeczywistą szkodę pozostającą w normalnym związku z celowym podaniem fałszywych danych, użyciem nieuprawnionego instrumentu płatniczego albo innym zawinionym naruszeniem prawa lub regulaminu. Regulamin nie ustanawia automatycznej kary umownej ani ryczałtowego odszkodowania."),
                    paragraph("Operator nie odpowiada za skutek spowodowany wyłącznie nieprawidłową informacją podaną przez użytkownika, działaniem użytkownika sprzecznym z wyraźną instrukcją bezpieczeństwa albo zdarzeniem pozostającym poza rozsądną kontrolą operatora, w zakresie, w jakim skutek nie wynikał także z niewykonania obowiązków przez operatora."),
                    paragraph("Żadne postanowienie nie wyłącza ani nie ogranicza odpowiedzialności za szkodę na osobie, działanie umyślne, niewykonanie obowiązków operatora ani praw konsumenta w zakresie, w którym takiego wyłączenia lub ograniczenia nie dopuszcza prawo."),
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
                    paragraph("Usługa może być aktualizowana lub czasowo niedostępna ze względów technicznych, bezpieczeństwa, zgodności z prawem, dostosowania do zmian systemów Apple lub Google, przeciwdziałania nadużyciom albo rozwoju funkcji. Zmiana treści lub usługi cyfrowej wykraczająca poza zachowanie zgodności jest dopuszczalna tylko z ważnej przyczyny wskazanej w tym zdaniu, bez dodatkowych kosztów dla konsumenta i bez naruszenia praw już nabytych."),
                    paragraph("O zmianie negatywnie wpływającej na dostęp do treści lub usługi cyfrowej albo korzystanie z niej operator informuje jasno, z odpowiednim wyprzedzeniem i na trwałym nośniku. Informacja opisuje cechy i termin zmiany oraz prawo do bezpłatnego rozwiązania umowy w przypadkach i terminie wynikających z prawa, chyba że operator zapewni dalszy dostęp do niezmienionej wersji bez dodatkowych kosztów."),
                    paragraph(`Aktualny regulamin jest dostępny na ${config.siteHost}/terms. O pozostałych istotnych zmianach dotyczących użytkowników z kontem poinformujemy z odpowiednim wyprzedzeniem, chyba że natychmiastowa zmiana jest wymagana przez prawo albo pilne zagrożenie bezpieczeństwa.`),
                ),
                section(
                    "Wersja regulaminu i trwały zapis",
                    paragraph("Datę, godzinę, strefę czasową i identyfikator wersji widoczne przy regulaminie wykorzystuje się do rozróżniania jego treści. System zapisuje identyfikator zaakceptowanej wersji wraz z akceptacją dokumentu lub zamówieniem, jeżeli dana czynność jest rejestrowana."),
                    paragraph("Samo odesłanie do zmiennej strony internetowej nie zastępuje przekazania informacji na trwałym nośniku, jeżeli wymaga tego prawo. Dlatego potwierdzenie zamówienia zawiera treść zaakceptowanych warunków albo trwałą kopię pozwalającą je zachować i odtworzyć bez jednostronnej zmiany."),
                ),
                section(
                    "Własność intelektualna",
                    paragraph("Aplikacja, strona, znak 28 gór, Rysek, kod, układ interfejsu, grafiki, pieczątki i treści operatora są chronione prawem. Korzystanie z usługi daje użytkownikowi ograniczone, niewyłączne prawo do osobistego korzystania z niej zgodnie z regulaminem i nie przenosi praw własności intelektualnej. Prawo może zostać zakończone wraz z umową lub z powodu naruszenia regulaminu, lecz nie może zostać dowolnie odebrane z naruszeniem opłaconego uprawnienia lub praw konsumenta."),
                ),
                section(
                    "Prywatność",
                    paragraph(`Zasady przetwarzania danych osobowych określa Polityka prywatności dostępna na ${config.siteHost}/privacy.`),
                ),
                section(
                    "Pozasądowe rozwiązywanie sporów",
                    paragraph("Konsument może skorzystać z bezpłatnej pomocy miejskiego lub powiatowego rzecznika konsumentów, właściwego Wojewódzkiego Inspektoratu Inspekcji Handlowej albo innego uprawnionego podmiotu prowadzącego pozasądowe rozwiązywanie sporów konsumenckich. Informacje o podmiotach i procedurach są dostępne na stronie Urzędu Ochrony Konkurencji i Konsumentów."),
                    paragraph("Po nieuwzględnieniu reklamacji operator przekazuje konsumentowi na papierze albo innym trwałym nośniku informację, czy zgadza się na udział w odpowiednim postępowaniu pozasądowym, czy go odmawia. Skorzystanie z procedury jest dobrowolne i nie pozbawia prawa do sądu."),
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
            updatedDate: englishUpdatedDate,
            intro: [
                `This policy explains how ${publicOperatorName}, the operator of 28 gór, processes personal data of users of the 28 gór app and ${config.siteHost}.`,
                "It covers accounts, mountain progress, user content, public profiles and leaderboards, App Store purchases, and orders for physical pins.",
            ],
            sections: [
                section(
                    "Controller and contact",
                    paragraph(`The data controller is ${englishOperatorIdentity}.`),
                    paragraph(`For privacy, personal data, or user support matters, email ${config.contactEmail}.`),
                ),
                section(
                    "Data we process",
                    list(
                        "account and contact data: Firebase identifier, email address, Apple or Google sign-in provider, display name, provider photo, profile settings, and legal-document acceptance status,",
                        "app-use data: planned and completed mountains, stamp collection, ascent dates, ratings, comments, preferences, sync state, and local summit photos,",
                        "public data: display name and approved avatar when their visibility is enabled, as well as completed mountains, stamps, game scores, leaderboard position, and achievement time,",
                        "score-verification and security data: attempt and installation identifiers, score, time, app version and build, integrity hashes, App Attest or other device-integrity signals, and verification status,",
                        "user content sent to the server: display name, processed avatar, summit rating and comment, and report text; private summit photos remain in device storage,",
                        "moderation reports: reporter ID, reported content or account, reason, status, and outcome,",
                        "technical and notification data: IP address processed when connecting to the service, in-app device identifier, Firebase Cloud Messaging token, permission status, app version, language, time zone, and local diagnostic logs,",
                        "Apple purchase data: StoreKit product ID, transaction and original-transaction identifiers, verification status, entitlement, revocation, or refund; we do not receive full App Store account payment credentials,",
                        "pin-order data: full name, email address, phone number, recipient details, InPost pickup point or delivery address, country, selected products, price, shipping, total, fulfillment status, shipment events, and payment, refund, or payment-dispute status supplied by Stripe, a bank, or a payment-method provider,",
                        "support correspondence, complaints, withdrawal notices, reports of uncollected or returned shipments, and voluntarily supplied information needed to handle them, such as photos, proof of posting, or other evidence."
                    ),
                ),
                section(
                    "Sources and collection methods",
                    list(
                        "directly from the user during sign-in, profile editing, progress recording, rating or comment submission, support contact, and checkout,",
                        "automatically from the app, device, and backend while the relevant feature is used, particularly during sync, notifications, and score verification,",
                        "from Apple and StoreKit in connection with sign-in, a transaction, entitlement, revocation, or refund,",
                        "from Google during sign-in, from Stripe, a bank, or a payment-method provider during a pin payment, refund, or payment dispute, and from InPost during delivery, return, or non-collection,",
                        "from other users when they report a comment, account, or other content."
                    ),
                ),
                section(
                    "Required and optional data",
                    paragraph("Authentication and session identifiers are required to create and operate an account. Apple transaction identifiers are required to verify a digital entitlement. Recipient details, email, delivery method and destination, and payment status are required to accept and fulfill a physical order. Without them, the relevant service, purchase, or delivery cannot be provided."),
                    paragraph("A public name, avatar, comment, and access to location, camera, photo library, and notifications are optional. Refusing location disables distance and summit-presence features, refusing photo or camera access disables only the relevant photo-adding method, and refusing notifications disables push notifications. Other features remain available unless they require that specific information."),
                ),
                section(
                    "Purposes and legal bases",
                    list(
                        "creating and operating accounts, syncing, the mountain journal, games, leaderboards without optional identity disclosure, and user-requested features: performance of a contract, Article 6(1)(b) GDPR,",
                        "publishing a name and avatar on a leaderboard after the user separately enables their visibility: performance of the social feature initiated by the user, Article 6(1)(b) GDPR; visibility can later be disabled in the app or by contacting the operator,",
                        "using current location and the photo library locally for a user-initiated feature: performance of a contract, Article 6(1)(b) GDPR; the iOS permission prompt is a system control, not a separate legal basis,",
                        "verifying Apple purchases and handling payment, delivery, withdrawal, complaints, returns, and order contact: performance of a contract or steps before entering one, Article 6(1)(b) GDPR,",
                        "accounting, tax, and consumer-law duties: legal obligation, Article 6(1)(c) GDPR,",
                        "account and payment security, fraud prevention, score verification, moderation, diagnostics, and establishing or defending legal claims: the operator's legitimate interest in protecting the service, users, and payment integrity, Article 6(1)(f) GDPR."
                    ),
                ),
                section(
                    "Public profiles and leaderboards",
                    paragraph("A new account starts with name and avatar visibility disabled on leaderboards. The user may separately enable publication of either item in profile settings. A public entry may contain an approved name or avatar, completed mountains or stamps, score, position, and achievement time. When the name is hidden, the entry uses a nameless label, but the score and achievement data may still allow a person to be recognized in particular circumstances."),
                    paragraph("Changing one setting does not alter the user's other choices. The backend refreshes stored leaderboard entries after a change, so an update may not be immediate. After account deletion, leaderboard entries are stripped of the identifier, name, and avatar or removed with scores indexed to the account. A retained score is treated as anonymous only when it can no longer reasonably be linked to a person; otherwise it is treated as pseudonymized data and remains subject to the GDPR."),
                ),
                section(
                    "Score verification and moderation",
                    paragraph("Scores are checked automatically using score and time data, app version, installation identifier, and App Attest signals. A score may be rejected, marked suspicious, or omitted from a leaderboard. Names, avatars, and comments may be automatically moderated by OpenAI and reviewed by the operator."),
                    paragraph(`A moderation or score decision can be challenged through an available reporting feature or by emailing ${config.contactEmail}.`),
                ),
                section(
                    "Payments and orders",
                    paragraph("The full game unlock and voluntary “Feed Rysek” support are separate Apple In-App Purchases. We receive the information needed to verify the product, transaction, entitlement, revocation, or refund, but not full Apple ID payment credentials."),
                    paragraph(`Physical metal pins are sold separately. ${config.paymentProcessorName} processes payment and supplies the transaction status. Available methods may include Apple Pay and BLIK, depending on the device, bank, country, and current configuration. A BLIK code is processed briefly in the app and sent directly to Stripe for authorization. The operator does not persist it in the backend or logs and does not store full card numbers or other complete payment-authentication credentials.`),
                ),
                section(
                    "Abuse prevention and payment disputes",
                    paragraph("To investigate a suspected unauthorized payment, duplicate refund, substituted product, empty parcel, circumvention of account restrictions, or score manipulation, we may compare account, installation, and transaction identifiers, order and payment history, carrier events, correspondence, and voluntarily supplied evidence. The data is limited to information proportionate to the specific matter."),
                    paragraph("A matter may be reviewed manually, and information necessary to resolve it may be shared with Apple, Stripe, a bank, payment-method provider, carrier, adviser, or competent authority. The user may provide an explanation and challenge the outcome under the terms and applicable law."),
                ),
                section(
                    "Location, photos, and device permissions",
                    paragraph("The app uses precise location only while the user is using nearby-mountain, distance, or summit-presence features. It does not use background location or create a continuous tracking history. Current coordinates are used for calculations on the device and are not sent to the backend; the server receives the selected summit, status, and ascent date."),
                    paragraph("The app reads date and GPS EXIF data from selected photos to match them to summits locally. Private summit photos remain on the device with their original metadata, and a photo taken in the app may receive current-location GPS in EXIF. An avatar is resized into a new JPEG without metadata, and only that file is sent to the server for moderation and publication."),
                    paragraph("Location, camera, photo, and notification permissions can be changed in iOS Settings. The app registers a notification token only after the relevant permission is granted."),
                ),
                section(
                    "Analytics, advertising, and local storage",
                    paragraph("28gor.app uses localStorage to remember language, theme, and interface settings and does not include its own analytics tool. The app's web client initializes Firebase Analytics, which may measure website use and browser technical data. The iOS app does not send its own performance logs to the operator's analytics service; local logs are disabled by default outside diagnostics."),
                    paragraph("We do not use data for behavioral advertising. The app includes the Meta SDK for sharing features, and data processed by Meta is subject to Meta's own privacy rules."),
                ),
                section(
                    "Recipients",
                    list(
                        "Google and Firebase as providers of authentication, backend services, databases, avatar storage, cloud functions, notifications, and integrity protection,",
                        "Apple as the provider of sign-in, the App Store, StoreKit, In-App Purchases, refunds, and device services,",
                        `${config.paymentProcessorName}, banks, and payment-method providers for physical-pin purchases, refunds, payment complaints, or chargebacks,`,
                        "InPost for pickup-point selection, delivery, returns, and shipment handling, and Resend for transactional messages,",
                        "OpenAI for automated moderation of names, avatars, and comments, and Meta for a sharing feature initiated by the user,",
                        "legal and accounting advisers, courts, and public authorities where needed to protect rights or required by law."
                    ),
                    paragraph("We do not sell personal data. Depending on the service, a recipient acts as a processor on the operator's instructions or as an independent controller under its own obligations. It receives only data needed for the stated purpose."),
                ),
                section(
                    "Transfers outside the EEA",
                    paragraph("Some providers may process data outside the European Economic Area. In that case, we use a GDPR-approved mechanism, particularly an adequacy decision or standard contractual clauses with any required supplementary safeguards."),
                ),
                section(
                    "Retention and account deletion",
                    list(
                        "the account, profile, server-stored avatar, progress, events, and notification data are kept until account deletion or earlier deletion of the specific information,",
                        "after account deletion, public leaderboard entries are removed or stripped of the account identifier, name, and avatar; a score may remain for leaderboard integrity but is treated as anonymous only when it can no longer reasonably be linked to a person,",
                        "a summit rating and comment may remain after account deletion under a nameless label; the record loses the account identifier, email, and author name, receives a new random technical identifier that does not contain the former account identifier, and reports associated with the old entry are removed; the content is still treated as personal data while it may allow a person to be recognized; a user may also request erasure of a specific rating or comment, subject to legal exceptions to erasure,",
                        "local summit photos are removed from app data on the device where deletion is completed; we do not delete originals from the system Photos library or copies left on other devices,",
                        "the StoreKit transaction ledger and entitlement status may remain after account deletion for as long as needed to handle an active entitlement, restore or reassign it after completed deletion, process a refund or revocation, prevent abuse, or defend legal claims,",
                        "order, payment, delivery, refund, complaint, and payment-dispute records, including proportionate shipment or return evidence, are kept for periods arising from tax, accounting, and consumer-law duties and until relevant claim periods expire,",
                        "security and diagnostic logs are kept until an incident analysis is complete or for the period needed to detect abuse and defend claims; local logs disappear with the app data,",
                        "backups are overwritten under the retention cycle; deleted data may remain in secured backups until scheduled overwrite and is not used in ordinary operations."
                    ),
                    paragraph("A verified user can start account deletion in the app settings. Uninstalling the app does not delete the account. We periodically review whether retained data is still needed and erase or anonymize it when its purpose ends and no further retention basis applies."),
                ),
                section(
                    "Your rights and choices",
                    paragraph("Subject to the GDPR, users may request access, rectification, erasure, restriction, and portability, and may object to processing based on legitimate interests. Consent may be withdrawn without affecting the lawfulness of earlier processing."),
                    paragraph(`To exercise a right, email ${config.contactEmail}. We may request only information needed to verify identity. We respond without undue delay and generally within one month; this may be extended by two further months for complex or numerous requests, in which case we explain the extension within the first month. Users may also complain to the President of the Polish Personal Data Protection Office.`),
                ),
                section(
                    "Automated checks",
                    paragraph("Automated mechanisms may flag prohibited content, abuse, or unreliable scores. We do not use them to make decisions that produce legal or similarly significant effects without an opportunity to challenge the outcome and contact support."),
                ),
                section(
                    "Children and security",
                    paragraph("A person who cannot independently give valid consent or enter into a contract under applicable law should use the service with the permission and supervision of a parent or guardian. A new account's name and avatar remain hidden on leaderboards by default regardless of the user's age."),
                    paragraph("We use appropriate organizational and technical safeguards, including authentication, access rules, integrity verification, and data minimization, but no transmission or storage method can guarantee absolute security."),
                ),
                section(
                    "Policy changes",
                    paragraph(`We may update this policy as the service or law changes. The current version and the date, time, and time zone of its last update are published at ${config.siteHost}/privacy. We will communicate material changes in the app or through another appropriate channel.`),
                ),
            ],
        },
        terms: {
            slug: "terms",
            title: "Terms of Service",
            effectiveDate: "Effective date: July 16, 2026",
            updatedDate: englishUpdatedDate,
            intro: [
                `These terms govern the 28 gór app and ${config.siteHost}, digital App Store purchases, and orders for physical metal pins.`,
                "These terms bind a user after express acceptance or, for a particular no-account service, when they were made available before that service was ordered. Merely browsing the public website or downloading the app does not replace acceptance.",
            ],
            sections: [
                section(
                    "Service provider and contact",
                    paragraph(`The provider and operator of 28 gór and the seller of physical pins is ${englishOperatorIdentity}.`),
                    paragraph(`For service, purchase, complaint, and privacy matters, email ${config.contactEmail} or call ${config.contactPhone}.`),
                ),
                section(
                    "Polish version precedence",
                    paragraph("The legal documents are available in Polish and English. If there is any inconsistency, the Polish version prevails to the extent permitted by mandatory applicable law."),
                ),
                section(
                    "Definitions",
                    list(
                        "app or service: the 28 gór mobile app, related online services, and website,",
                        "account: an individual 28 gór user account,",
                        "consumer: a consumer within the meaning of applicable law and, to the extent granted by law, a natural person protected like a consumer when a contract directly related to that person's business lacks a professional character for that person,",
                        "game unlock: a one-time purchase of full early access to all archive games included in the offer,",
                        "“Feed Rysek”: voluntary, independent support for the operator purchased through Apple In-App Purchase,",
                        "pin: a physical metal pin or other clearly identified physical keepsake offered in the shop,",
                        "user content: including photos, captions, notes, ratings, comments, nickname, avatar, and public profile."
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
                    "Contract formation, duration, and termination",
                    paragraph("The contract for an account and related electronic services is formed when the user expressly accepts the terms during account creation or activation. It continues for an indefinite period. Downloading the app, browsing the public website, or starting a feature does not replace acceptance. A contract for a one-off no-account service is formed when the user orders it after the applicable terms have been made available and lasts for the time needed to complete it."),
                    paragraph("A contract for sale of a physical product is formed when the operator confirms acceptance of the order for fulfillment on a durable medium. Starting payment or authorizing an amount does not itself mean that the order has been accepted. Apple purchases are formed and billed through the App Store process."),
                    paragraph("A user may terminate the account contract at any time by starting account deletion in the app or contacting the operator. This does not limit rights relating to completed purchases or complaints, or duties to preserve required records. The operator may terminate the contract only under the suspension and termination section."),
                ),
                section(
                    "Accounts and deletion",
                    paragraph("Users are responsible for accurate account details, reasonable protection of access, and actions they perform or knowingly enable. Accounts must not be shared in a way that enables impersonation or circumvention of safeguards, and additional accounts must not be created or used mainly to evade a restriction, suspension, purchase or promotion limit, or to manipulate a leaderboard."),
                    paragraph("When there is a credible indication of account takeover, an unauthorized payment, or other abuse, the operator may require reauthentication, revoke active sessions, or temporarily hold a risky action for the time needed to investigate. A safeguard must be proportionate and cannot arbitrarily remove a paid entitlement or consumer right."),
                    paragraph("A verified user can start permanent account deletion in the app settings. Data is deleted or anonymized as described in the Privacy Policy; limited backups and legally required records may remain for the relevant period."),
                    paragraph("Deleting an account or uninstalling the app does not cancel an Apple purchase or automatically produce a refund. After deletion is complete, the user may create or sign in to another authenticated 28 gór account and try to restore the active unlock using the same Apple ID. For security, technical detachment of the entitlement from the deleted account may be required."),
                ),
                section(
                    "Public profiles and leaderboards",
                    paragraph("A new account's name and avatar are hidden on leaderboards by default. After the relevant setting is enabled separately, a public entry may contain a display name, approved avatar, completed mountains or stamps, score, leaderboard position, and achievement time. Users are responsible for their name, avatar, and published information and must not impersonate another person or infringe their rights."),
                    paragraph("Leaderboards are a community feature, not a prize competition. They may be corrected, recalculated, or rebuilt after an error. Suspicious, manipulated, or unverifiable results may be hidden or removed."),
                ),
                section(
                    "Fair play",
                    list(
                        "do not manipulate time, score, location, app state, or data transmission,",
                        "do not use bots, automation, a modified client, exploits, or another person's transactions or account,",
                        "do not use multiple accounts or coordinate with others to inflate scores, evade verification, or displace legitimate leaderboard results,",
                        "do not repeatedly submit fabricated results or bypass integrity mechanisms,",
                        "the operator may request resynchronization or verification and invalidate a result that cannot be confirmed."
                    ),
                ),
                section(
                    "User content and moderation",
                    paragraph("Users retain ownership of their content. They grant the operator a non-exclusive, royalty-free license, lasting only while the content is retained, solely to host, store, make technical copies, compress, resize, reformat, transmit, and display that content as needed to provide, secure, and moderate 28 gór."),
                    paragraph("The license does not permit use of photos or other content in advertising or marketing outside the service without separate permission."),
                    paragraph("Users must not publish unlawful, abusive, unsafe, privacy-invasive, infringing, or otherwise rights-violating content. The operator may review, limit the visibility of, or remove such content and profiles."),
                    paragraph(`Comments and other content can be reported using the reporting features available in the app. The contact point for service recipients and notices concerning illegal content is also ${config.contactEmail}; it is available in Polish and English. Content, profiles, accounts, or leaderboard entries may be reported there.`),
                    paragraph("An illegal-content notice should identify the exact location or identifier of the item, explain why the reporting person considers it illegal, and include a good-faith statement that the information is accurate and complete. It should also include the reporting person's name and email address unless applicable law permits those details to be omitted."),
                    paragraph("Reports must be submitted in good faith. Users must not knowingly submit false reports, impersonate an affected person, or mass-duplicate reports to harass a user or force removal of lawful content."),
                    paragraph("Where possible, the operator acknowledges receipt and processes the notice in a timely, diligent, objective, non-discriminatory, and non-arbitrary manner. The operator has no general obligation to approve all content in advance or actively search for violations."),
                    paragraph("If the operator restricts or removes content, or suspends a service or account because of user content, it provides the affected user with a statement of reasons to the extent required by law. The statement identifies the decision, its legal or terms-based ground, relevant circumstances, any use of automation, and the available way to challenge the decision, unless the law permits notice to be withheld."),
                    paragraph(`The reporting person and the user affected by a decision receive information about the outcome, reasons, and available challenge route to the extent required by law. A challenge may be emailed to ${config.contactEmail}; the review is not based solely on automation.`),
                ),
                section(
                    "One-time full game unlock",
                    paragraph("Individual games may initially unlock for free as users make progress. A user may instead buy a one-time unlock for full early access to all games included in the offer."),
                    paragraph("The purchase is made only through Apple In-App Purchase and is charged to the App Store account after confirmation. The price, currency, and exact scope are displayed before purchase. It is not a subscription, physical purchase, or payment through Stripe, Apple Pay, or BLIK."),
                    paragraph("The unlock is a non-consumable product. The in-app “Restore previous purchase” mechanism reads the current StoreKit entitlement and can restore access on a compatible device using the same Apple ID and an authenticated 28 gór account. After the previous account has been deleted, an active entitlement may be assigned to a new account. The mechanism does not restore “Feed Rysek” support purchases."),
                    paragraph(`Apple handles billing and refund requests under App Store rules. The operator provides activation support at ${config.contactEmail}. Account deletion does not refund the purchase.`),
                    paragraph("Consumers retain their statutory rights concerning conformity of digital content and services with the contract. If the unlock or related service does not conform, the consumer may request that it be brought into conformity and, where the legal conditions are met, a price reduction or termination of the contract."),
                ),
                section(
                    "Voluntary “Feed Rysek” support",
                    paragraph("“Feed Rysek” is a voluntary way to support the development of 28 gór and is separate from the game unlock. It does not unlock features, content, games, scores, or any other entitlement."),
                    paragraph("Support may be offered in one or more price options. Each purchase is a consumable Apple In-App Purchase, may be made more than once, and cannot be restored as a permanent entitlement. The currently available options and prices are displayed before purchase."),
                    paragraph("Support purchases are not processed through Stripe, Apple Pay, BLIK, or the physical-pin checkout. Apple handles billing and refund requests in accordance with the applicable App Store rules."),
                ),
                section(
                    "Withdrawal from a digital purchase",
                    paragraph("Apple operates the App Store purchase and billing process, but this does not limit a consumer's mandatory rights against the entity responsible under the applicable contract."),
                    paragraph("If paid digital content is to be supplied immediately and the consumer is to lose the 14-day withdrawal right once performance begins, the exception applies only after every statutory condition is met: the consumer gives express prior consent and requests early performance, receives prior information and acknowledges the loss of the right, and receives contract confirmation on a durable medium. If any condition is absent, the statutory withdrawal right remains. Deleting an account or uninstalling the app is not itself a withdrawal statement."),
                    paragraph("The unlock covers the games and features identified exactly before purchase. It does not cover future games or features unless the offer expressly promises them. This does not limit the acquired entitlement, digital-content or digital-service conformity duties, or updates required by law."),
                ),
                section(
                    "Physical metal pins",
                    paragraph("Pins are physical goods sold separately from the game unlock and “Feed Rysek.” They are not Apple In-App Purchases and do not grant digital entitlements unless the product description clearly identifies an additional lawful feature."),
                    paragraph(`The seller is ${englishOperatorIdentity}. Before placing an order, the user receives information about the product, its price, delivery costs, the total amount, and access to the seller’s identifying details and the applicable sales terms. The seller’s details and information relating to the order are also provided or made available in the order confirmation.`),
                    paragraph(`${config.paymentProcessorName} processes payment. Available methods include Apple Pay and BLIK where supported by the device, bank, country, and current payment configuration. The operator does not store full card numbers, BLIK codes, or complete payment-authentication credentials.`),
                    paragraph("A pin may be limited in quantity, made to order, or sold as a preorder. The relevant label and expected fulfillment time are shown before purchase."),
                    paragraph(`For a product placed on the market under the 28 gór brand, the operator is responsible for product safety and, unless the offer identifies another manufacturer, is the manufacturer: ${englishOperatorIdentity}. The online offer clearly and visibly shows a picture or the type and identifier of the product, the manufacturer's name, postal and electronic addresses, and required warnings or safety information in an easily understood language. The product, packaging, or accompanying document also carries markings required by law. A pin has a sharp point and small parts, is not a toy, must be kept out of reach of children, and must not be used if damaged.`),
                ),
                section(
                    "Order, obligation to pay, and confirmation",
                    paragraph("Immediately before an order is placed, checkout shows the product's main characteristics, quantity, recipient details, delivery method and cost, price, total amount payable, seller details, fulfillment time, relevant safety information, and the applicable version of the sales terms."),
                    paragraph("The final order action is labeled in a way that unambiguously indicates an obligation to pay. By performing it, the user places an order with an obligation to pay and confirms that the provided terms have been reviewed."),
                    paragraph("After accepting the order, the operator emails a confirmation on a durable medium. It includes seller and order details, price and delivery, the accepted version or text of the terms, information about the withdrawal right, and the model withdrawal form."),
                ),
                section(
                    "Order limits, verification, and errors",
                    paragraph("The operator may apply reasonable quantity limits or promotion conditions if they are shown before purchase. Users must not evade them through additional accounts, repeated orders, proxy recipient details, or coordinated action. When announcing a price reduction, the operator also displays the lowest price in the 30 days before the reduction where required by law."),
                    paragraph("Before confirming acceptance of an order for fulfillment, the operator may reject it because the product is unavailable, the delivery method is unsupported, there is an obvious price, description, or technical error, or there are objective indications of unauthorized payment or fraud. The operator informs the user and releases the authorization or refunds any collected amount without undue delay."),
                    paragraph("After a contract has been formed, the operator cannot cancel an order at its unrestricted discretion and may act only under these terms or applicable law. If the same amount is collected more than once, the operator refunds the amount collected without legal basis without undue delay after confirming the duplicate."),
                ),
                section(
                    "Delivery of physical pins",
                    paragraph("Available delivery countries, carrier, cost, and estimated timing are shown at checkout. Timing may depend on stock, made-to-order production, or preorder status. Users must provide a complete and accurate address and review it before payment."),
                    paragraph(`Questions about a missing, delayed, or damaged shipment can be sent to ${config.contactEmail} with the order number.`),
                    paragraph("The risk of accidental loss of or damage to a pin passes to a consumer only on receipt, unless the consumer independently chose a carrier that the operator did not offer. Address and non-collection rules do not transfer to the consumer any risk for which the seller remains responsible under applicable law."),
                    paragraph("Failure to collect a shipment is not itself a withdrawal statement. If a return or redelivery results solely from incomplete or incorrect details supplied by the user or failure to collect a correctly addressed shipment, the operator may seek only the additional carrier costs actually incurred and documented, to the extent permitted by law. This does not cover costs caused by the operator or carrier and does not limit complaint or withdrawal rights."),
                ),
                section(
                    "Withdrawal from a physical-pin purchase",
                    paragraph(`A consumer may withdraw from a physical-pin purchase without giving a reason within 14 days after receipt. It is enough to send an unequivocal statement to ${config.contactEmail} before the deadline; the operator's prior approval is not required.`),
                    paragraph(`The pin must be sent back no later than 14 days after the statement to: ${englishOperatorAddress}. The consumer bears the direct return cost. No prior operator approval or return authorization number is required.`),
                    paragraph("A consumer may open the package and inspect the pin as necessary to establish its nature, characteristics, and functioning. The consumer is responsible only for diminished value caused by handling beyond that scope; opening the package alone does not remove the right of withdrawal."),
                    paragraph("A return should contain the pin covered by the relevant purchase. Sending a different product or an empty parcel is not a return of the purchased pin. The operator may proportionately document the parcel's weight, condition, opening, and contents, and the consumer may present contrary evidence. Original packaging, a receipt, or photos are not a condition for exercising the right of withdrawal."),
                    paragraph("After a valid withdrawal, we refund the pin price and the cost of the least expensive standard delivery offered no later than 14 days after receiving the statement. We do not refund the surcharge for a more expensive delivery method selected by the consumer. We use the original payment method unless the consumer expressly agrees to another method without additional cost. We may withhold reimbursement until we receive the pin or proof that it was sent back, whichever occurs first."),
                    paragraph(`Model statement: “I, [full name], give notice that I withdraw from the contract for sale of [product], order number [number], order or receipt date [date], address [address], date and signature if submitted on paper.” Using the model is optional. The statement may be emailed to ${config.contactEmail} or sent to the operator's address.`),
                ),
                section(
                    "Complaints about physical pins",
                    paragraph(`A complaint that a pin does not conform to the contract can be sent to ${config.contactEmail}. Provide enough information to identify the purchase, describe the problem, and state the desired resolution. A receipt is not the only acceptable proof of purchase. Photos are helpful but optional where the issue can be established otherwise; the operator may request only information or evidence reasonably needed to handle the specific matter.`),
                    paragraph("The operator is liable for a pin's lack of conformity that existed on delivery and becomes apparent within two years after delivery, unless a longer declared useful period justifies longer liability. A goods complaint is handled separately from no-reason withdrawal and from an app technical complaint."),
                    paragraph("A consumer may request repair or replacement. The operator may use the other remedy only when the chosen one is impossible or would impose disproportionate costs compared with the other, under applicable law. A price reduction or withdrawal is available in the statutory cases, particularly where the operator refuses or fails to bring the goods into conformity, non-conformity persists, or it is serious enough to justify an immediate remedy. If the operator argues that non-conformity is minor to resist withdrawal, the operator bears the burden of proving that to the extent provided by law."),
                    paragraph("The consumer makes the complained-about pin available to the operator. Where applicable law requires the goods to be collected for repair or replacement, the operator collects them at its expense; the consumer does not bear the cost of bringing the goods into conformity."),
                    paragraph("An amount due after an effective price reduction or withdrawal is refunded without undue delay and no later than the period required by law, using the same payment method unless the consumer expressly agrees to another method without additional cost."),
                    paragraph("The operator responds to a consumer complaint within 14 days after receipt, on paper or another durable medium. A failure to respond within that period has the effects prescribed by mandatory law."),
                ),
                section(
                    "Payment disputes and duplicate refunds",
                    paragraph("Users retain the right to dispute a payment or use a bank, payment-provider, or Apple procedure. They must provide truthful information and cooperate reasonably in determining whether the payment, delivery, or refund was properly completed."),
                    paragraph("The operator may provide the entity handling the dispute with proportionate order data, payment and refund confirmation, shipment status, correspondence, and other evidence relating to the matter. No single operator record is treated as conclusive in advance, and the user may present contrary evidence."),
                    paragraph("Users should not seek a second refund for an amount already refunded. If a user receives reimbursement from more than one source for the same payment, the user should inform the operator and return the amount received without legal basis. The operator may seek only an amount due and actual documented loss under applicable law; these terms impose no penalty or chargeback fee."),
                ),
                section(
                    "Technical issues and Apple purchases",
                    paragraph(`An account, sync, leaderboard, game, or unlock-activation problem can be reported to ${config.contactEmail} with a description, app version, and device. Do not send passwords or full payment credentials.`),
                    paragraph("Apple handles billing, charges, and refunds for Apple In-App Purchases. The operator can help verify the product and technical access but cannot directly refund a payment collected by the App Store."),
                    paragraph("If digital content or a digital service does not conform to the contract, a consumer may request that it be brought into conformity and, in cases specified by law, a price reduction or termination of the contract. The operator responds to the complaint within 14 days on paper or another durable medium and brings the service into conformity without undue delay and excessive inconvenience."),
                ),
                section(
                    "Service and contact abuse",
                    paragraph("Users must not access another person's account or non-public data without authorization, use another person's payment details, bypass access controls or request limits, disrupt the service, bulk-download non-public data, or conduct security testing that may violate law, privacy, or service availability."),
                    paragraph("Users must not automatically or repeatedly send spam, knowingly false reports, threats, or repeated messages intended to harass or disrupt support. The operator may consolidate duplicate matters, limit excessive automated traffic, and direct contact to one channel, but cannot use these measures to block a statutory complaint, withdrawal, exercise of data rights, or access to a court or authority."),
                    paragraph("Safeguards are selected according to the seriousness, frequency, and credibility of the violation and limited to the necessary scope and duration. Where circumstances allow, the user is given the reason for the action and an opportunity to explain or challenge the matter."),
                ),
                section(
                    "Suspension and termination",
                    paragraph("The operator may restrict, suspend, or end access to an account or feature where proportionately necessary because of a violation of law or these terms, fraud, a security threat, impersonation, repeated abuse, or protection of others. The assessment considers the severity, frequency, effects, and intent of the conduct."),
                    paragraph("Before acting on a remediable or repeated violation, the operator generally gives a warning and reasonable time to correct it. It may act without prior warning where an urgent security threat, serious or unlawful conduct, protection of others, or a legal duty requires this. Permanent account termination is a last resort unless the nature of the violation justifies it immediately."),
                    paragraph(`The user receives reasons and information on how to challenge the decision to the extent required by law; a challenge may be emailed to ${config.contactEmail}. An account restriction does not cancel completed sales contracts, complaints, withdrawals, data rights, or other rights that must remain available.`),
                ),
                section(
                    "Liability and actual loss",
                    paragraph("Under applicable law, a user is responsible for actual loss in a normal causal relationship with deliberately false details, use of an unauthorized payment instrument, or another culpable violation of law or these terms. These terms impose no automatic contractual penalty or lump-sum damages."),
                    paragraph("The operator is not responsible for an outcome caused exclusively by incorrect information supplied by the user, user action contrary to a clear security instruction, or an event outside the operator's reasonable control, to the extent that the outcome did not also result from the operator's failure to perform its obligations."),
                    paragraph("Nothing in these terms excludes or limits liability for personal injury, intentional conduct, the operator's failure to perform its obligations, or consumer rights to the extent such exclusion or limitation is prohibited by law."),
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
                    paragraph("The service may be updated or temporarily unavailable for technical, security, legal-compliance, Apple or Google system-change, abuse-prevention, or feature-development reasons. A change to digital content or a digital service that goes beyond maintaining conformity is permitted only for a valid reason listed in this sentence, without additional cost to the consumer and without affecting acquired rights."),
                    paragraph("If a change negatively affects access to or use of digital content or a digital service, the operator gives clear advance notice on a durable medium. The notice describes the features and timing of the change and the right to terminate without charge in the cases and within the period prescribed by law, unless the operator provides continued access to the unchanged version without additional cost."),
                    paragraph(`The current terms are available at ${config.siteHost}/terms. We will give account holders appropriate advance notice of other material changes unless an immediate change is required by law or an urgent security threat.`),
                ),
                section(
                    "Terms version and durable record",
                    paragraph("The date, time, time zone, and version identifier shown with the terms distinguish their content. The system records the accepted version identifier with a document acceptance or order when that action is recorded."),
                    paragraph("A link to a mutable website does not replace information on a durable medium where the law requires one. The order confirmation therefore includes the accepted terms or a durable copy that the user can retain and reproduce without unilateral alteration."),
                ),
                section(
                    "Intellectual property",
                    paragraph("The app, website, 28 gór name, Rysek, code, interface layout, graphics, stamps, and operator content are legally protected. Use of the service gives users a limited, non-exclusive right to personal use under these terms and does not transfer intellectual-property ownership. The right may end with the contract or because of a terms violation, but it cannot be arbitrarily withdrawn in breach of a paid entitlement or consumer rights."),
                ),
                section(
                    "Privacy",
                    paragraph(`Personal data rules are in the Privacy Policy at ${config.siteHost}/privacy.`),
                ),
                section(
                    "Out-of-court dispute resolution",
                    paragraph("A consumer may seek free assistance from a municipal or district consumer ombudsman, the competent Provincial Inspectorate of Trade Inspection, or another authorized consumer alternative-dispute-resolution entity. Information about entities and procedures is available from the Polish Office of Competition and Consumer Protection."),
                    paragraph("After rejecting a complaint, the operator tells the consumer on paper or another durable medium whether it agrees or refuses to participate in an appropriate out-of-court procedure. Participation is voluntary and does not remove the right to bring a court claim."),
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
