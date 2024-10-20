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
  ![8](https://github.com/user-attachments/assets/478a95e8-bf13-4604-b8ec-1a90eea3dfd3)<br />

  - usuwanie niepotrzebnych atrybutów produktów,<br />
  - usuwanie dublujących się kategorii z menu głównego oraz pobocznego,<br />
  - aktualizacja menu, wyświetlanie się kategorii w postaci kolumn, gdy dana kategoria nie mieści się w kolumnie tworzona jest nowa obok i tam wskakują niemieszczące się kategorie,<br />
    ![image](https://github.com/kmozdzen/Update-products/assets/91953879/d5c3886a-2016-4ef8-9f7f-bdaef5674405)<br />
  - kalkulator obliczający odległość projektora od ekranu, wybór dostępnych projektorów, lub stworzenie własnego i dobieranie odpowiednich parametrów za pomocą pasków<br />
  ![7](https://github.com/user-attachments/assets/40603f64-9b28-45e3-96e3-ecc70a3f3fa8)<br />
  ![6](https://github.com/user-attachments/assets/44413954-c5ea-42ba-a707-7938f069370d)<br />

  - menu kafelkowe.<br />
    ![image](https://github.com/kmozdzen/Update-products/assets/91953879/8deb36a1-a1a3-43b7-9e5f-d915ed9520c1)

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
