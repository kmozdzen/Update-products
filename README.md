# Skrypt do pracy

## UpdateProductsByWidthGroup.js - Do pobierania ekranów ze sklepu oraz aktualizowania względem grup szerokości projekcyjnej.

Przykład:<br />
Ekran projekcyjny o szerokości projekcyjnej - 400x300<br />
Domyślnie produkty trafiają do grupy w przedziale 200-240.<br />
Skrypt zbiera wszystkie produkty z wykorzystaniem API oraz je aktualizuje do odpowiedniej grupy 400x300 --> 360-400

## UpdateScreenProductsCategories.js - Do pobierania ekranów ze sklepu oraz aktualizowania względem nowych kategorii z menu "Ekrany".

## UpdateProjectorProductCategories.js - Do pobierania projektorów ze sklepu oraz aktualizowania względem nowych kategorii z menu "Projektor".

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
