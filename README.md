## Skrypt do pobierania produktów ze sklepu oraz aktualizowania względem grup szerokości projekcyjnej.

Przykład:

Ekran projekcyjny o szerokości projekcyjnej - 400x300

Domyślnie produkty trafiają do grupy w przedziale 200-240.

Skypt zbiera wszystkie produkty z wykorzystaniem API oraz je aktualizuje do odpowiedniej grupy 400x300 --> 360-400

>[!IMPORTANT]
>Kod wymaga dodatkowego pliku **UserData.js** z zawartością:
>UserData = {
>   url: 'Nazwa strony',
>    username: 'Nazwa użytkownika',
>    password: 'hasło',
>    token: 'token'
>}
>
>module.exports = UserData;

Token generuje się po odkomentowaniu funkcji login, więc nie jest koniecznie wpisanie prawidłowego tokenu
