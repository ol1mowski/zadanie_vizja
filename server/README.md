# Backend: Internetowy portal rezerwacji wizyt

Minimalny szkielet backendu w Spring Boot (Java 17).

## Uruchomienie (dev)

1. Wymagania: Java 17, Maven
2. Budowa i start:

```bash
mvn spring-boot:run
```

Aplikacja nasłuchuje na http://localhost:8080

Konsola H2: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:file:./data/zadanievizja`)

## Stos technologiczny
- Spring Boot 3 (Web, Data JPA, Validation, Security)
- H2 (plikowa)

## Struktura pakietów
- `domain` – encje JPA i enumy
- `dto` – rekordy wymiany danych
- `repository` – repozytoria JPA
- `service` – interfejsy serwisów
- `service.impl` – implementacje serwisów
- `controller` – kontrolery REST
- `config` – konfiguracja Security/CORS

## API (w toku)
- `POST /api/reservations/student` – utworzenie rezerwacji (student, WIP)
- `POST /api/reservations/candidate` – utworzenie rezerwacji (kandydat, WIP)
- `GET /api/reservations/student` – lista rezerwacji studenta (WIP)
- `GET /api/reservations/unassigned` – lista nieprzypisanych (WIP)
- `POST /api/reservations/{id}/assign` – przypisanie do pracownika (WIP)
- `DELETE /api/reservations/{id}` – anulowanie rezerwacji (WIP)

Uwierzytelnianie zostanie dodane później (na razie endpointy są otwarte, nagłówek `X-Username` pełni rolę placeholdera).

## Konfiguracja CORS
Dopuszczony frontend: `http://localhost:5173` (Vite). Zmiana w `application.properties` (`app.cors.allowed-origins`).

## Kolejne kroki
- Implementacja logiki `ReservationService` (walidacje, mapowanie DTO, reguły biznesowe)
- Prosta autoryzacja ról (STUDENT/ADMIN) i integracja z frontendem)
- Ewentualny mechanizm załączników (S3/dysk lokalny)
