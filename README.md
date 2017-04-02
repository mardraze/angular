# Struktura projektu dla frameworka AngularJS 1

# Kilka słów o strukturze
- Kod źródłowy aplikacji znajduje się w folderze "src"
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

