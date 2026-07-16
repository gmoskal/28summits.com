# Agent Notes

## Git

Do commitów i pushy używaj zwykłego `git`. Nie wymagaj `gh`, nie twórz pull requestów i nie zakładaj gałęzi tylko na potrzeby PR. Jeżeli użytkownik prosi o commit lub push, po sprawdzeniu zakresu zmian commituj i pushuj bezpośrednio bieżącą gałąź.

## Deploy na domenę

Projekt jest podpięty do Vercel w `.vercel/project.json`.
Produkcja jest aliasowana na `https://28gor.app`.

Przed deployem sprawdź stan repo:

```sh
git status --short
```

Jeżeli zmiany mają trafić na produkcję, uruchom lokalną walidację:

```sh
npm run typecheck
npm run build
```

Wdrożenie produkcyjne:

```sh
npx vercel --prod --yes
```

Deploy jest gotowy dopiero wtedy, gdy Vercel zwróci `readyState: "READY"` i pokaże alias:

```text
Aliased         https://28gor.app
```

Po deployu sprawdź domenę i najważniejsze metadane:

```sh
curl -I https://28gor.app/
curl -sS https://28gor.app/ | rg "og:image|og:url|twitter:image|canonical"
```

Jeżeli deploy dotyczy miniatury Messengera/Facebooka, po publikacji wymuś odświeżenie w Meta Sharing Debugger dla `https://28gor.app/`.
