# Bug 001 — przeciąganie karuzeli nie przesuwa filmu

> Start pracy: 2026-07-19 17:20
> Koniec pracy: 2026-07-19 17:32
> Status: zablokowany: poprawka lokalna niecommitowana na życzenie użytkownika
> Zgłoszenie: „ale film się nie draguje, tylko indykator na dole się draguje a ma się dragowac jak zdjęcie normalnie, 
> dodalem tez 2 filmy zeby nie było na tym samym,”
> Klasyfikacja: klient-lokalny
> Baza analizy: commit `1c21892f3a72`; numery linii poprawki według bloba `79cf12c29cbc5efe0f425116d3e65dd5c867dd22`

## TL;DR

Poprzedni komponent wyliczał gest jako stan React `renderedPageProgress`, a następnie osobno renderował z niego szerokości wskaźnika i transformację całej taśmy. Zgłoszone rozjechanie tych dwóch efektów nie odtworzyło się w lokalnym Chrome na wersji transformacyjnej, więc nie ma dowodu, że źródłem było samo gubienie `pointermove`; kod miał jednak dwa osobne skutki renderowania jednego gestu. Poprawka usuwa tę możliwość: gest ustawia fizyczne `scrollLeft` viewportu filmów, a wskaźnik odczytuje progres z tego samego `scrollLeft`. Dane serwerowe nie uczestniczą w tym przepływie.

## Kryteria akceptacji

1. **AC-1:** Przeciągnięcie bezpośrednio po ekranie telefonu przesuwa widoczny film razem z gestem, tak jak przeciąganie zdjęcia w karuzeli.
2. **AC-2:** Po puszczeniu gestu karuzela zatrzaskuje się na właściwym slajdzie, a wskaźnik odzwierciedla tę samą pozycję.
3. **AC-3:** Trzy slajdy odtwarzają trzy pliki: `public/rec1.MP4`, `public/rec2.MP4` i `public/rec3.MP4`.

## Szczegóły — odpowiedzialny kod

- `app/_components/phone-video-preview.tsx:18-22`, `phonePreviewSlides`: trzy lokalne źródła filmów są jedyną konfiguracją slajdów.
- `app/_components/phone-video-preview.tsx:120-128`, `handleDragMove`: różnica położenia wskaźnika ustawia bezpośrednio `event.currentTarget.scrollLeft`; nie istnieje już pośrednia transformacja taśmy zależna od stanu React.
- `app/_components/phone-video-preview.tsx:130-153`, `handleDragEnd`: próg gestu wybiera slajd, a viewport zatrzaskuje się przez `scrollTo`.
- `app/_components/phone-video-preview.tsx:164-167`, `handleCarouselScroll`: stan wskaźnika jest pochodną fizycznego przesunięcia viewportu.
- `app/_components/phone-video-preview.tsx:238-252`: trzy elementy `<video>` tworzą jedną poziomą taśmę, każdy o szerokości viewportu.

Rejestr `bugs/PATTERNS.md` nie istnieje w tym repozytorium, więc nie znaleziono wcześniejszej klasy wzorca.

### Wykluczone przyczyny

- Brak nowych plików: `ls -lh public/rec*.MP4` potwierdził obecność `rec1.MP4`, `rec2.MP4` i `rec3.MP4`; DOM po buildzie zawierał dokładnie te trzy źródła.
- Brak hydracji React: kliknięcie drugiego wskaźnika zmieniło aktywny slajd i pozycję karuzeli.
- Brak zdarzeń dotykowych: pomiar CDP zarejestrował `pointerdown`, kolejne `pointermove` i `pointerup` typu `touch` nad ekranem telefonu.
- Sam wskaźnik nie steruje filmem: po poprawce wskaźnik wyłącznie odczytuje `scrollLeft` w `handleCarouselScroll`.

## Proponowany test (najpierw czerwony)

- **AC-1 →** `dragging the phone screen moves the actual media viewport` w `app/_components/phone-video-preview.test.mjs` oraz gest dotykowy w lokalnej przeglądarce.
- **AC-2 →** `snapping and the indicator read the same physical carousel position` oraz pomiar po puszczeniu gestu.
- **AC-3 →** `the carousel uses all three supplied recordings` oraz inspekcja źródeł w DOM.

Automatyczny test jest testem kontraktu źródłowego, ponieważ Node bez silnika layoutu nie potrafi wiarygodnie zasymulować pointer capture, `scrollLeft` i animacji. Dowodem zachowania jest dodatkowo rzeczywisty pomiar przeglądarkowy.

Pierwszy czerwony przebieg, przed zmianą implementacji:

```text
$ npm test
✖ dragging the phone screen moves the actual media viewport (6.810541ms)
  AssertionError [ERR_ASSERTION]: The drag gesture must change the video viewport scroll position directly
✖ snapping and the indicator read the same physical carousel position (22.2815ms)
✔ the carousel uses all three supplied recordings (0.168208ms)
ℹ tests 16
ℹ suites 0
ℹ pass 14
ℹ fail 2
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

## Rozwiązanie

- Zastąpić transformację taśmy rzeczywistym poziomym przewijaniem viewportu.
- W `handleDragMove` przesuwać `scrollLeft` dokładnie o różnicę pozycji palca lub myszy.
- Wyliczać wskaźnik wyłącznie z `scrollLeft / clientWidth` podczas `scroll`.
- Po zwolnieniu gestu zatrzaskiwać viewport do wybranego slajdu; kliknięcie wskaźnika i automatyczna zmiana używają tej samej drogi.
- Przy zmianie szerokości utrzymać fizyczną pozycję aktywnego slajdu przez `ResizeObserver`.

Nie zmieniają się czasy automatycznej karuzeli, próg gestu, wygląd wskaźnika, ramka telefonu ani logika odtwarzania wideo.

## Raport z implementacji i testów

- Zmieniono `PhoneVideoPreview`: fizyczny viewport z `scrollLeft`, wspólne źródło progresu, snap po geście i korekta po resize.
- Dodano `app/_components/phone-video-preview.test.mjs` do standardowego `npm test` i zaktualizowano skrypt testowy w `package.json`.
- **Dostarczenie:** oczekuje — zmiany pozostają niecommitowane w bieżącym checkout, zgodnie z prośbą o pracę wyłącznie lokalną i bez deployu.

Zielony przebieg:

```text
$ npm test
✔ dragging the phone screen moves the actual media viewport (1.030833ms)
✔ snapping and the indicator read the same physical carousel position (0.271208ms)
✔ the carousel uses all three supplied recordings (0.169083ms)
ℹ tests 16
ℹ suites 0
ℹ pass 16
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 156.50225
```

```text
$ npm run typecheck
> tsc --noEmit
exit 0
```

```text
$ npm run build
✓ Compiled successfully in 11.1s
✓ Generating static pages using 9 workers (19/19) in 431ms
exit 0
```

Pomiar dotykowy na świeżym buildzie, viewport telefonu `103.515625 px`:

```text
start:  scrollLeft=0
drag:   scrollLeft=40; x pierwszego filmu 198.234375 -> 158.234375; wskaźniki 15px, 12px, 7px
release: scrollLeft=104; aktywny wskaźnik 2/3
sources: /rec1.MP4, /rec2.MP4, /rec3.MP4
```

Pomiar myszką:

```text
drag: scrollLeft=35; x pierwszego filmu=163.234375
release: scrollLeft=104; aktywny wskaźnik 2/3
```

- **AC-1:** zielony — test kontraktu i pomiar dotykowy/myszką pokazują przesunięcie filmu 1:1 z gestem.
- **AC-2:** zielony — po puszczeniu viewport zatrzasnął się na drugim slajdzie, a drugi wskaźnik otrzymał `aria-pressed=true`.
- **AC-3:** zielony — test oraz DOM potwierdzają trzy różne źródła.

### Pozostałe kroki dostarczenia

1. Commit bieżących zmian dopiero po wyraźnej prośbie użytkownika.
2. Deploy celowo pominięty.

## Protokół weryfikacji

1. **Czerwony:** stan sprzed poprawki nie jest dostępny jako commit, ponieważ cały komponent powstawał w niecommitowanym checkout. Zachowany czerwony output pochodzi z finalnego, niezmienionego testu uruchomionego przed zmianą implementacji.
2. **Zielony:** w katalogu repo uruchomić `npm test`, `npm run typecheck` i `npm run build`; oczekiwane 16/16 testów oraz exit 0 dla typecheck i build.
3. **Środowisko:** otworzyć `http://127.0.0.1:3000`, przejść do drugiej sekcji, przeciągnąć poziomo bezpośrednio po ekranie telefonu. Film ma podążać za palcem/myszką, wskaźnik ma zmieniać długości równocześnie, a po puszczeniu oba mają wskazać ten sam slajd. Zweryfikowano lokalnie dla dotyku emulowanego i myszy; deployu nie wykonano.
4. **Inspekcja diffu:** sprawdzić `handleDragMove`, `handleCarouselScroll`, `handleDragEnd` oraz taśmę filmów w `app/_components/phone-video-preview.tsx`. Nie powinno być transformacji zależnej od `renderedPageProgress`; czasy, ramka i źródła filmów nie powinny się zmienić.
5. **Spot-check:** AC-1 potwierdza zmiana `scrollLeft` i x pierwszego `<video>` w trakcie gestu; AC-2 potwierdza `scrollLeft` równy szerokości viewportu i `aria-pressed` po puszczeniu; AC-3 potwierdza lista trzech `<source>`.
6. **Ograniczenia:** dokładny wcześniejszy mismatch „wskaźnik się rusza, film nie” nie odtworzył się w lokalnym Chrome na transformacyjnej wersji komponentu. Nie ma też commitu bazowego zawierającego ten niecommitowany komponent, więc formalny retroaktywny red w osobnym worktree nie jest możliwy.
