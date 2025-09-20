# Internetowy Portal Rezerwacji Wizyt

## Opis projektu

Portal umożliwiający rezerwację wizyt interesantów w biurze. System obsługuje różne role użytkowników: studentów, kandydatów na studia, pracowników i administratorów.

## Funkcjonalności

### Dla Studentów
- Logowanie do systemu
- Rezerwacja wizyt z wyborem terminu i tematu
- Monitorowanie swoich przyszłych i przeszłych wizyt
- Przeglądanie profilu

### Dla Kandydatów
- Wypełnianie formularza rezerwacji z danymi identyfikacyjnymi
- Podawanie terminu wizyty, opisu i opcjonalnych załączników
- Potwierdzenie rezerwacji z informacją o wysłaniu emaila

### Dla Pracowników
- Przeglądanie dostępnych rezerwacji
- Przypisywanie wizyt do siebie
- Zarządzanie swoimi wizytami
- Informacje o odwołanych wizytach

### Dla Administratorów
- Pełny dostęp do wszystkich funkcjonalności
- Zarządzanie użytkownikami
- Nadzór nad systemem

## Technologie

- **React 19** - Najnowsza wersja biblioteki React
- **TypeScript** - Typowanie statyczne dla lepszej jakości kodu
- **Vite** - Szybki bundler i serwer deweloperski
- **Tailwind CSS 3.4** - Framework CSS do stylowania
- **Vitest** - Framework testowy
- **Testing Library** - Biblioteka do testowania komponentów React

## Architektura

### Struktura komponentów
```
src/
├── components/
│   ├── Header/           # Komponent nagłówka z nawigacją
│   ├── AuthDemo/         # Komponent demonstracyjny uwierzytelniania
│   └── icons/            # Komponenty ikon SVG
├── hooks/
│   └── useAuth.ts        # Hook do zarządzania uwierzytelnianiem
├── types/
│   └── auth.ts           # Definicje typów TypeScript
└── __tests__/            # Pliki testowe
```

### Wzorce projektowe
- **Custom Hooks** - Logika biznesowa wydzielona do hooków
- **Component Composition** - Komponenty złożone z mniejszych części
- **Type Safety** - Pełne typowanie z TypeScript
- **Separation of Concerns** - Rozdzielenie odpowiedzialności

## Instalacja i uruchomienie

### Wymagania
- Node.js 20.5.0 lub nowszy
- npm 9.8.0 lub nowszy

### Kroki instalacji

1. **Sklonuj repozytorium**
   ```bash
   git clone <repository-url>
   cd zadanie_vizja/client
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Uruchom serwer deweloperski**
   ```bash
   npm run dev
   ```

4. **Otwórz aplikację w przeglądarce**
   ```
   http://localhost:5173
   ```

## Dostępne skrypty

- `npm run dev` - Uruchomienie serwera deweloperskiego
- `npm run build` - Budowanie aplikacji do produkcji
- `npm run preview` - Podgląd zbudowanej aplikacji
- `npm run test` - Uruchomienie testów w trybie watch
- `npm run test:run` - Uruchomienie testów jednorazowo
- `npm run test:ui` - Uruchomienie interfejsu testów Vitest
- `npm run lint` - Sprawdzenie kodu linterem

## Testowanie

### Uruchomienie testów
```bash
npm run test:run
```

### Testy obejmują
- Testy komponentów React
- Testy logiki uwierzytelniania
- Testy responsywności
- Testy integracyjne

## Demo uwierzytelniania

Aplikacja zawiera komponent demonstracyjny do testowania różnych ról użytkowników:

### Dostępne konta testowe
- **Student**: `student@example.com`
- **Pracownik**: `employee@example.com`
- **Administrator**: `admin@example.com`

Hasło dla wszystkich kont: `password`

## Responsywność

Header i cała aplikacja są w pełni responsywne:
- **Mobile First** - Projektowanie zaczynające się od urządzeń mobilnych
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Mobile Menu** - Hamburger menu na urządzeniach mobilnych
- **Adaptive Navigation** - Nawigacja dostosowana do roli użytkownika

## Bezpieczeństwo

- **Type Safety** - TypeScript zapobiega błędom typów
- **Input Validation** - Walidacja danych wejściowych
- **Role-based Access** - Dostęp oparty na rolach użytkowników
- **Secure Authentication** - Bezpieczny system uwierzytelniania

## Rozszerzalność

System został zaprojektowany z myślą o łatwej rozszerzalności:
- **Modularna architektura** - Łatwe dodawanie nowych komponentów
- **Type-safe API** - Bezpieczne interfejsy API
- **Plugin Architecture** - Możliwość dodawania nowych funkcjonalności
- **Adaptable Design** - Łatwa adaptacja do innych systemów

## Kontrybucja

1. Fork repozytorium
2. Utwórz branch dla nowej funkcjonalności (`git checkout -b feature/nowa-funkcjonalnosc`)
3. Commit zmian (`git commit -am 'Dodaj nową funkcjonalność'`)
4. Push do brancha (`git push origin feature/nowa-funkcjonalnosc`)
5. Utwórz Pull Request

## Licencja

Ten projekt jest licencjonowany na licencji MIT - zobacz plik [LICENSE](LICENSE) dla szczegółów.

## Autor

SystemLMS - https://github.com/SystemLMS

## Wsparcie

W przypadku problemów lub pytań, utwórz issue w repozytorium GitHub.