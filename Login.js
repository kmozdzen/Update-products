const axios = require('axios');
const UserData = require('./UserData');

// Dane logowania
const url = UserData.url;
const username = UserData.username;
const password = UserData.password;

// Funkcja do logowania, generuje i ustawia token
async function login() {
    try {
        const response = await axios.post(url + '/webapi/rest/auth', {}, {
        auth: {
            username: username,
            password: password
        }
        });

        // Sprawdź status odpowiedzi
        if (response.status === 200) {
            const token = response.data.access_token;
            console.log(token);
        } else {
            console.log('Błąd logowania:', response.statusText);
        }
    } catch (error) {
        console.error('Błąd logowania:', error.message);
    }
}

login()