# zadanie_vizja

Techniczne zadanie – aplikacja do rezerwacji spotkań z rolami (Student/Administrator), autoryzacją JWT, załącznikami, powiadomieniami i UI z podziałem na dashboardy.

## Spis treści
- Opis i funkcje
- Architektura i technologia
- Uruchomienie (lokalnie i Docker)
- Testowe dane logowania
- CI/CD (GitHub Actions)
- Konwencja commitów
- Testy (server i client)
- Struktura repo i kluczowe pliki
- API (zarys)

## Opis i funkcje
- **Logowanie JWT**: endpointy `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`, cookie HTTP-only.
- **Role i routing**: Student i Admin mają osobne dashboardy oraz ścieżki i ochronę tras.
- **Rezerwacje**:
  - Student: tworzenie i listowanie własnych, anulowanie.
  - Admin: lista nieprzydzielonych i przydzielonych, przypisywanie siebie, anulowanie.
- **Załączniki**: upload/download/lista oraz usuwanie (powiązanie z rezerwacją, metoda POST/GET/DELETE).
- **Powiadomienia**: tworzone przy niektórych akcjach (np. anulowanie przypisanej rezerwacji).
- **UX**: globalne toasty (sukces/błąd), globalny Error Boundary, informacja o danych testowych na ekranie logowania.

## Architektura i technologia
- **Frontend**: React + TypeScript, `react-router-dom`, własny provider Toast, ErrorBoundary, komponenty dzielone na mniejsze z custom hookami.
- **Backend**: Spring Boot 3, Spring Security, JWT, Spring Data JPA, H2 (plikowa), testy JUnit5 + Mockito.
- **Komunikacja**: REST JSON, cookie `Set-Cookie` dla tokenu.
- **Budowanie**: Maven (server), npm/yarn (client).
- **Konteneryzacja**: Dockerfile (server) + `docker-compose.yml` (persist H2).

## Uruchomienie
### Wymagania
- Node.js 20+ i npm/yarn (frontend)
- JDK 17 + Maven (backend) lub Docker (alternatywnie)

### Backend lokalnie
```bash
cd server
./mvnw spring-boot:run
# backend na http://localhost:8080
```

### Frontend lokalnie
```bash
cd client
npm ci   # lub: yarn install
npm start   # lub: yarn start
# frontend na http://localhost:3000
```

### Docker (backend)
```bash
# w katalogu głównym repo
docker compose build
docker compose up -d
# backend na http://localhost:8080
# dane H2 trwale w volume: server-data -> /app/data
```
Zmienne środowiskowe można nadpisać w `docker-compose.yml` (np. `SERVER_PORT`, `SPRING_H2_CONSOLE_ENABLED`).

## Testowe dane logowania
- **Student**: `123456` (numer albumu) / `password`
- **Admin**: `admin@uczelnia.pl` / `password`
Informacja z przyciskami „kopiuj" dostępna w `LoginFormInfo`.

## CI/CD (GitHub Actions)
Plik: `.github/workflows/ci.yml`
- **Trigger**: push do gałęzi `main`.
- **Job 1 – server-tests**: Ubuntu, JDK 21, cache maven, `mvn -B -e -DskipITs test` w katalogu `server`.
- **Job 2 – client-tests**: Ubuntu, Node 20, cache npm/yarn, uruchomienie testów `npm test -- --watchAll=false` lub `yarn test --watchAll=false` w katalogu `client`.

Możemy łatwo rozszerzyć o:
- `pull_request` trigger,
- build obrazów, publikację artefaktów, itp.

## Konwencja commitów
Przyjęto prostą konwencję stylu Conventional Commits:
- `feat(scope): opis` – nowa funkcja
- `fix(scope): opis` – poprawka błędu
- `refactor(scope): opis` – refaktor bez zmiany zachowania
- `test(scope): opis` – testy
- `docs(scope): opis` – dokumentacja
- `chore(scope): opis` – housekeeping (konfiguracje, zależności)

Przykład: `feat(reservations): add cancel toast and API error handling`

## Testy
### Backend (JUnit5 + Mockito)
Uruchomienie lokalne:
```bash
cd server
./mvnw test
```
Pokryte komponenty (wybór):
- `ReservationController`, `AuthController`, `AttachmentController`, `NotificationController`
- `ReservationServiceImpl` (logika domenowa), `JwtService`

### Frontend
Uruchomienie lokalne:
```bash
cd client
npm test -- --watchAll=false  # lub: yarn test --watchAll=false
```

## Struktura repo i kluczowe pliki
- `client/`
  - `src/components/Dashboard/...` – widoki Student/Admin/Candidate, rozbite na mniejsze komponenty + hooki
  - `src/components/Toast/{ToastProvider,ToastContainer}.tsx` – system toastów
  - `src/components/ErrorBoundary.tsx` – globalny error boundary
  - `src/App.tsx` – integracja ErrorBoundary i Toastów
- `server/`
  - `src/main/java/com/example/zadanieVizja/controller/*` – kontrolery REST
  - `src/main/java/com/example/zadanieVizja/service/impl/ReservationServiceImpl.java` – logika rezerwacji
  - `src/main/java/com/example/zadanieVizja/security/JwtService.java` – generowanie/parsing JWT
  - `src/test/java/com/example/zadanieVizja/...` – testy JUnit5/Mockito
  - `Dockerfile` – multi-stage build (Maven -> JRE)
  - `.dockerignore` – mniejszy context
- `docker-compose.yml` – uruchomienie backendu z volume H2
- `.github/workflows/ci.yml` – pipeline CI na push do `main`

## API (zarys)
- `POST /api/auth/login` – logowanie; ustawia HTTP-only cookie z JWT
- `DELETE /api/auth/logout` – czyszczenie cookie
- `GET /api/auth/me` – zwraca `username` i `role`
- `GET /api/reservations` – listowanie (wg roli i kontekstu)
- `POST /api/reservations` – tworzenie (student lub kandydat)
- `DELETE /api/reservations/{id}` – anulowanie (właściciel/admin)
- `POST /api/attachments/{reservationId}` – upload pliku
- `GET /api/attachments/{attachmentId}` – download
- `DELETE /api/attachments/{attachmentId}` – usunięcie
- `GET /api/notifications` – lista powiadomień

W razie potrzeby mogę dołączyć pełne kontrakty i przykładowe ładunki JSON.
