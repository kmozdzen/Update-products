# Skrypty do pracy

## UpdateProductsByWidthGroup.js - Do pobierania ekranów ze sklepu oraz aktualizowania względem grup szerokości projekcyjnej.

Przykład:<br />
Ekran projekcyjny o szerokości projekcyjnej - 400x300<br />
Domyślnie produkty trafiają do grupy w przedziale 200-240.<br />
Skrypt zbiera wszystkie produkty z wykorzystaniem API oraz je aktualizuje do odpowiedniej grupy 400x300 --> 360-400

## UpdateScreenProductCategories.js - Do pobierania ekranów ze sklepu oraz aktualizowania względem nowych kategorii z menu "Ekrany".

## UpdateProjectorProductCategories.js - Do pobierania projektorów ze sklepu oraz aktualizowania względem nowych kategorii z menu "Projektor".

## Scripts.js - Skrpty do funkcjonalności na stronie:<br />
  - kalkulator obliczania przekątnej wykorzystując szerokość i proprcję i na odwrót, a także wyszukiwanie ekranu na podstawie otrzymanych wyników oraz typu ekranu,<br />
  - usuwanie niepotrzebnych atrybutów produktów,<br />
  - usuwanie dublujących się kategorii z menu głównego oraz pobocznego,<br />
  - aktualizacja menu, wyświetlanie się kategorii w postaci kolumn, gdy dana kategoria nie mieści się w kolumnie tworzona jest nowa obok i tam wskakują niemieszczące się kategorie,
  - kalkulator obliczający odległość projektora od ekranu.

>[!IMPORTANT]
>Kod wymaga dodatkowego pliku **UserData.js** z zawartością:<br />
>UserData =<br />
>{<br />
>    &nbsp; &nbsp; &nbsp; url: 'Nazwa strony',<br />
>    &nbsp; &nbsp; &nbsp; username: 'Nazwa użytkownika',<br />
>    &nbsp; &nbsp; &nbsp; password: 'Hasło',<br />
>    &nbsp; &nbsp; &nbsp; token: 'Token'<br />
>}<br />
>
>module.exports = UserData;

Token generuje się po odpaleniu Login.js, kopiujemy token z wyniku i podmieniamy za wygasły token.
