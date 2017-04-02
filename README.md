# Szablon projektu aplikacji AngularJS

Poniższa struktura sprawdza się w budowie aplikacji tworzonych w oparciu o framework AngularJS w wersji 1, osadzanych na istniejących już stronach, jak również w pozostałych zastosowaniach.
Narzucane jest wyłącznie korzystanie z frameworka AngularJS w wersji 1 oraz korzystanie z narzędzi grunt oraz npm. 
Głównym zadaniem struktury jest przyspieszenie prac programistów nad aplikacją, zwiększenie wydajności oraz zabezpieczenie kodu aplikacji w trybie produkcyjnym. Wszystkie ścieżki, nazwy plików wynikowych, nazwy katalogów są łatwo konfigurowalne w pliku Gruntfile.js

# Kilka słów o strukturze
- Kod źródłowy aplikacji znajduje się w folderze src
- Wymagany jest plik module.js w folderze src. Powinniśmy w nim zainicjalizować moduł AngularJS, określić zależności itp.
- Podfoldery w katalogu źródłowym src możemy ustalić według własnych upodobań
- Wszystkie pliki szablonów mają domyślnie rozszerzenie .html
- Pliki JS są łączone w jeden plik build/app.dev.js
- Pliki HTML są cachowane do pliku build/templates.js
- Plik build/app.dev.js jest przetwarzany przez ngAnnotate, w celu umożliwienia minimalizacji kodu. Plikiem wynikowym jest domyślnie build/app.dev.js-annotate.js
- Pliki build/app.dev.js-annotate.js oraz build/templates.js są minimalizowane i tworzony jest plik wynikowy build/app.js
- Wszystkie biblioteki podajemy w pliku Gruntfile.js, plikiem wynikowym jest build/vendor.js
- Testy jednostkowe znajdują się w folderze "spec"

# Komendy

Instalacja projektu

`npm install`

Generuje pliki dla trybu developerskiego i je testuje

`grunt`

Generuje pliki dla trybu produkcyjnego i je testuje

`grunt dist`

Nasłuchuje na zmiany w plikach. Jeżeli którykolkiek plik z kodem źródłowym zmieni się, to na nowo generuje pliki dla trybu developerskiego

`grunt watch`

# Wdrażanie aplikacji

W trybie developerskim aby uruchomić aplikację, załączamy pliki 

- build/vendor.js
- build/app.dev.js
- build/templates.js

W trybie produkcyjnym 

- build/vendor.js 
- build/app.js
