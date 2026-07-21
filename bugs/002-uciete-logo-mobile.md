# Bug 002 — Ucięte animowane logo na mobile

> Start pracy: 2026-07-21 23:02
> Koniec pracy: 2026-07-21 23:27
> Status: zweryfikowany
> Zgłoszenie: „animowane logo na mobile jest delikatnie ucięte od dołu, popraw, zrób commit, push i wrzyc na domene” — [zrzut z urządzenia](./assets/002-uciete-logo-mobile/before-device.png)
> Uzupełnienie 1: „na desktop dodaj żeby telefon miał lekko paralaxowego scrolla, niech ląduje w miejscu gdzie jest teraz ale niech wpada tam z lekkim opóźnieniem, kumasz?” — osobna zmiana funkcjonalna realizowana w tej samej dostawie, poza granicą błędu 002.
> Klasyfikacja: klient-lokalny
> Baza analizy: `65a27c0a3bc2e6660604113360a462ae0181511b`

## TL;DR

Ścieżka dolnego łuku cyfry „8” wraz z promieniem kropek i rozmyciem filtra wychodzi poniżej dolnej granicy `brandViewBox`. Komponent polega więc na rysowaniu poza głównym viewportem SVG; zrzut z iOS pokazuje, że ta nadmiarowa część może zostać ucięta. Naprawa powiększy viewport logo o policzony margines filtra, zachowując dotychczasową skalę grafiki przez proporcjonalną korektę rozmiaru elementu.

## Kryteria akceptacji

1. **AC-1:** Animowane logo „28 Gór” jest na mobilnym viewportcie widoczne w całości, również przy dolnej krawędzi glifu „8”.
2. **AC-2:** Poprawiona wersja jest dostępna na produkcyjnej domenie `https://28gor.app`.

## Szczegóły — odpowiedzialny kod

- Fakt, baza `65a27c0a`: `app/_components/gooey-brand-title.tsx:139` ustawia `brandViewBox` na `18 18 540 150`, więc jego dolna granica to `y = 168`.
- Fakt, baza `65a27c0a`: `brandGlyphs` w `app/_components/gooey-brand-title.tsx:228-232` prowadzi dolny łuk cyfry „8” do `y = 203`; końcowy promień kropki jest dodatkowo mnożony przez `thicknessBoost` w `GooeyPathDrawing` (`app/_components/gooey-brand-title.tsx:813-819`).
- Fakt, baza `65a27c0a`: SVG ma klasę `overflow-visible` (`app/_components/gooey-brand-title.tsx:854-864`), ale jego własny viewport nie obejmuje dolnego łuku. Widoczność kompletnego znaku zależy więc od zachowania przeglądarki poza granicą SVG.
- Obserwacja: [zrzut z urządzenia](./assets/002-uciete-logo-mobile/before-device.png) pokazuje spłaszczoną/uciętą dolną krawędź cyfry „8” na mobilnym Safari.

### Wykluczone przyczyny

- Kontener sekcji nie jest przyczyną na mobile: `app/_components/home-page-client.tsx:672-674` używa `overflow-visible`; `lg:overflow-hidden` zaczyna obowiązywać dopiero na desktopie.
- Rodzic logo nie wprowadza maski ani `overflow-hidden`: `app/_components/home-page-client.tsx:682-706` używa zwykłego przycisku i elementu `span` bez przycinania.
- Rejestr `bugs/PATTERNS.md` nie istnieje w repozytorium, więc nie znaleziono wcześniejszego wzorca tego defektu.

## Proponowany test (najpierw czerwony)

- **AC-1 →** `brand logo viewBox contains the complete filtered digit geometry` w `app/_components/gooey-brand-title.test.mjs`. Test odczytuje realny `brandViewBox`, ścieżkę glifu „8”, promień kropek, `thicknessBoost` i odchylenie rozmycia; oczekuje, że dolna granica viewportu obejmuje geometrię oraz margines trzech odchyleń standardowych filtra.
- **AC-2 →** automatyczny test HTTP po deployu (`curl -I https://28gor.app/`) oraz mobilna obserwacja produkcyjnej strony; nie da się wiarygodnie uzyskać czerwonego wyniku deployu przed publikacją bez wdrożenia wadliwej wersji.

Test geometrii jest kontraktem źródłowym, nie pełnym testem renderera Safari. Jest użyty w wąskim wyjątku dla defektu wizualnego SVG: przeglądarka i filtr GPU nie mają stabilnego, pikselowego API dostępnego w procesie testowym. Dowodem niosącym pozostają porównawcze obrazy przed/po; test automatyczny uniemożliwia ponowne zmniejszenie viewportu poniżej rzeczywistego obrysu znaku.

## Rozwiązanie

- Rozszerzyć `brandViewBox` tak, aby obejmował pełną ścieżkę, promień kropek po `thicknessBoost` oraz bezpieczny margines filtra.
- Proporcjonalnie zwiększyć zewnętrzne wymiary `GooeyBrandTitle`, dzięki czemu skala samego rysunku pozostanie praktycznie taka sama, a zmieni się tylko zarezerwowany obszar bezpiecznego renderowania.
- Nie zmieniać ścieżek glifów, tempa animacji, kolorów ani desktopowego zachowania ikony w lewym górnym rogu.
- Dodatkowa funkcja z Uzupełnienia 1: nadać wyłącznie desktopowemu telefonowi krótki, łagodny offset pionowy, który zanika po wejściu sekcji i kończy się dokładnie w obecnej pozycji. Ta zmiana nie jest częścią AC błędu 002.

## Raport z implementacji i testów

Dostarczenie: commit `887f50cf5abfc49f6690578d1c9796137d229f03` na `master` (implementacja `215bc784d5eb485053f009fdfcb1066f4d576990`), oznaczony tagiem `fix/002-uciete-logo-mobile`.

### Zmiany

- `app/_components/gooey-brand-title.tsx`: `brandViewBox` rozszerzony z `18 18 540 150` do `-4 8 564 224`; wymiary `GooeyBrandTitle` zwiększone proporcjonalnie, aby nie zmienić skali samego rysunku.
- `app/_components/gooey-brand-title.test.mjs`: stały kontrakt geometrii filtra SVG, dołączony do domyślnego `npm test`.
- `app/_components/home-story-phone.motion.ts`: jedna, testowalna funkcja klatki desktopowego parallaxu. Offset jest ograniczony do `54 px`, respektuje `prefers-reduced-motion` i zawsze zbiega do `0 px`.
- `app/_components/home-page-client.tsx`: telefon otrzymał osobną warstwę transformacji sterowaną scrollTop przez `requestAnimationFrame`; mobile oraz desktopowa ikona w lewym górnym rogu nie zmieniły zachowania.
- `app/_components/home-story-phone.motion.test.mjs`: potwierdza opóźnienie na desktopie, końcowe `0 px` i wyłączenie efektu poza desktopowym ruchem.

### Czerwony przebieg

Polecenie (repo root): `npm test`

```text
✖ brand logo viewBox contains the complete filtered digit geometry (1.885792ms)
ℹ tests 21
ℹ suites 0
ℹ pass 20
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 125.585958

AssertionError [ERR_ASSERTION]: Brand viewBox bottom 168.0 clips filtered digit geometry ending at 229.1
```

Test pozostał na stałe w domyślnym `npm test` i nie będzie zmieniany po tym czerwonym przebiegu.

### Zielony przebieg

Polecenie (repo root): `npm test`

```text
✔ brand logo viewBox contains the complete filtered digit geometry (1.137041ms)
✔ desktop story phone follows scroll with a light delay and lands at zero offset (1.770625ms)
✔ story phone parallax stays disabled outside desktop motion (0.144541ms)
ℹ tests 23
ℹ suites 0
ℹ pass 23
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 134.841209
```

Polecenie (repo root): `npm run typecheck`

```text
> tsc --noEmit
```

Kod wyjścia: `0`.

Polecenie (repo root): `npm run build`

```text
✓ Compiled successfully in 2.6s
Finished TypeScript in 2.7s
✓ Generating static pages using 9 workers (19/19) in 481ms
```

Kod wyjścia: `0`.

Polecenie zakresu: `git diff --check` — kod wyjścia `0`, bez komunikatów.

- **AC-1: zielony lokalnie** — test geometrii oraz [zrzut po poprawce](./assets/002-uciete-logo-mobile/after-local-mobile.png). Pomiar przy viewportcie `402 × 874`: SVG `top=84`, `bottom=217`; koła znaku `top=97.29`, `bottom=201.05`, czyli dolna część mieści się z zapasem około `15.95 px`.
- **AC-2: zielony na produkcji** — Vercel deployment `dpl_F94PXnGrrximaMfeRZAiMGniAyMd` osiągnął `readyState: READY` i został zaliasowany na `https://28gor.app`. `curl -I` zwrócił `HTTP/2 200`; HTML zawiera canonical, `og:url`, `og:image` oraz `twitter:image` wskazujące `28gor.app`.
- **Dowód produkcyjny:** [mobilny Chromium](./assets/002-uciete-logo-mobile/after-production-mobile.png) i [WebKit 26.0 / Safari 26.0](./assets/002-uciete-logo-mobile/after-production-webkit.png). W WebKit przy viewportcie `402 × 874`: SVG `top=84`, `bottom=217`, koła `top=97.29`, `bottom=201.05`, brak błędów strony — dolna krawędź ma około `15.95 px` zapasu wewnątrz viewportu SVG.
- **Funkcja spoza AC:** przy rzeczywistym desktopowym scrollu pomiar kolejnych klatek wykazał offset `54.00 → 45.17 → 39.35 → … → 0.00 px`. Pozycja spoczynkowa telefonu lokalnie (`x=772.08`, `y=32.70`, `415.81 × 834.59` przy `1440 × 900`) jest identyczna z pozycją na dotychczasowej produkcji.

### Cleanup

- Lokalny proces `npm run dev` zatrzymany sygnałem `SIGINT`; `pgrep -fal "next dev|Google Chrome.*headless"` nie wykazał pozostałego procesu.
- Bezprofilowa instancja headless Chrome zamknięta przez API przeglądarki; ten sam test procesów nie wykazał pozostałości.
- Druga bezprofilowa instancja headless Chrome do weryfikacji produkcji została zamknięta w tym samym przebiegu testowym.
- Izolowany `~/tmp/codex/bug-002-playwright/` (`288M`) z WebKit 26.0 oraz proces WebKit zostały usunięte po weryfikacji. `test ! -e /Users/gmm/tmp/codex/bug-002-playwright` zwrócił sukces, a `pgrep` nie wykazał `MiniBrowser`, `WebKitWebProcess`, headless Chrome ani `next dev`.
- Dowody wizualne są zapisywane bezpośrednio w `bugs/assets/002-uciete-logo-mobile/`, nie w katalogu tymczasowym.
- Obowiązkowy przegląd poprzednich numerów: `~/tmp/codex/bug-001` i `~/tmp/codex/bug-000` nie istnieją; `git worktree list --porcelain` pokazuje wyłącznie bieżący checkout.
- Pozostawiono nietknięte `~/tmp/codex/bug-091-regresja-1` (`4.4G`) i `~/tmp/codex/bug-092` (`1.2G`): nie należą do raportu 002, nie są worktree tego repozytorium i nie ma dowodu, że są zakończone lub nieaktywne.

## Protokół weryfikacji

1. **Czerwone odtworzenie:** w checkoutcie bazy `65a27c0a3bc2e6660604113360a462ae0181511b` skopiować niezmieniony `app/_components/gooey-brand-title.test.mjs`, dopisać go do polecenia testowego i uruchomić `npm test`; oczekiwany błąd: `Brand viewBox bottom 168.0 clips filtered digit geometry ending at 229.1`.
2. **Zielone odtworzenie:** na bieżącym kodzie uruchomić `npm test`, `npm run typecheck`, `npm run build` oraz `git diff --check`; oczekiwane wyniki: `23/23` testy, typecheck/build/diff z kodem `0`. Test geometrii czyta prawdziwe stałe i ścieżkę komponentu, bez atrap; nie emuluje renderera Safari.
3. **Weryfikacja środowiska:** wykonana na `https://28gor.app/`. Deployment `dpl_F94PXnGrrximaMfeRZAiMGniAyMd` ma `READY` i alias `https://28gor.app`; HTTP zwraca `200`. Mobilny Chromium i WebKit 26.0 po przejściu na drugi ekran pokazały pełną cyfrę „8”; w WebKit dolny obrys kończy się `15.95 px` przed dolną granicą SVG. Powtórzenie: otworzyć produkcję w mobilnym Safari/WebKit `402 × 874`, przewinąć `main` o jeden viewport i porównać z [dowodem WebKit](./assets/002-uciete-logo-mobile/after-production-webkit.png).
4. **Inspekcja diffu:** sprawdzić `brandViewBox` i rozmiary `GooeyBrandTitle` w `app/_components/gooey-brand-title.tsx`, funkcję `storyPhoneParallaxFrame` oraz efekt/ref w `home-page-client.tsx`. Ścieżki glifów, timing animowanego logo, teksty, lokalizacje, media telefonu i zachowanie górnej ikony na desktopie nie mogą być zmienione.
5. **Spot-check twierdzeń i AC:** AC-1 potwierdza test `brand logo viewBox contains the complete filtered digit geometry` oraz porównanie [przed](./assets/002-uciete-logo-mobile/before-device.png)/[po na WebKit](./assets/002-uciete-logo-mobile/after-production-webkit.png). AC-2 potwierdzają `curl`, deployment `READY` i produkcyjna obserwacja WebKit. Parallax potwierdzają dwa testy `home-story-phone.motion.test.mjs` oraz końcowa zmienna `--story-phone-parallax-y: 0.00px`.
6. **Kontrola dostarczenia:** po integracji uruchomić `git tag -l 'fix/002-uciete-logo-mobile'` oraz `git merge-base --is-ancestor $(git rev-parse 'fix/002-uciete-logo-mobile^{commit}') master`.
7. **Znane ograniczenie:** końcowy test używa WebKit 26.0 z mobilnym viewportem i dotykiem, nie fizycznego iPhone'a; zachowanie przycinania SVG jest jednak wykonywane przez silnik Safari 26.0, a produkcyjny obraz i pomiary są zapisane w repozytorium.
