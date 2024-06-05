const axios = require('axios');
const UserData = require('./UserData');

// Dane logowania
const url = UserData.url;
const token = UserData.token;

// Dane sklepu
const id_attributes = '5'; //id szerokości projekcyjnej
const id_attributes_frame = '11'; //id szerokości projekcyjnej ramowej
const id_attributes_pull = '12'; //id szerokości projekcyjnej pull up
const id_dimension = '29'; //id powierzchni roboczej
const id_dimension_frame = '37'; //id powierzchni roboczej dla ramkowych
const id_width = '144'; //id szerokości projekcyjnej
const id_width_frame = '145'; //id szerokości projekcyjnej dla ramkowych

// Funkcja do opóźnienia w wykonywaniu requestów
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Funkcja do sprawdzania poprawności zapisanych wymiarów oraz wyciągania szerokości ekranu
function checkRegex(dimension){
    const regex = /(\d+)\s*x?\s*(\d+)\s*(?:\(\w+\))?/gi;
    const match = regex.exec(dimension);
    let number = 0;
    
    if (match) {
        const numberBeforeX = match[1];
        number = parseInt(numberBeforeX);
    } else {
        console.log("Nie znaleziono dopasowania.");
    }
    return number;
}

//Zwraca grupę szerokości w zależności od szerokości ekranu
function getWidthGroup(width){
    if(width <= 200){
        return 'Do 200';
      }
      if(width > 200 && width <= 240){
        return '200-240';
      }
      else if(width > 240 && width <= 280){
        return '240-280';
      }
      else if(width > 280 && width <= 320){
        return '280-320';
      }
      else if(width > 320 && width <= 360){
        return '320-360';
      }
      else if(width > 360 && width <= 400){
        return '360-400';
      }
      else if(width > 400 && width <= 440){
        return '400-440';
      }
      else if(width > 440 && width <= 480){
        return '440-480';
      }
      else if(width > 480){
        return 'Powyżej 480';
      }else
      return '';
}

// Zamiena grupy szerokości na prawidłową
function changeWidth(product_data){
    let widthGroup = '';
    let dimension = '';
    let width = 0;

    if (product_data.attributes && product_data.attributes[id_width]) {
        dimension = product_data.attributes[id_dimension];
        width = checkRegex(dimension);
        widthGroup = getWidthGroup(width);
        if(widthGroup != '')
            product_data.attributes[id_width] = widthGroup;
    }
    if (product_data.attributes && product_data.attributes[id_width_frame]){
        dimension = product_data.attributes[id_dimension_frame];
        width = checkRegex(dimension);
        widthGroup = getWidthGroup(width);
        if(widthGroup != '')
            product_data.attributes[id_width_frame] = widthGroup;
    }

    return product_data;
}

// Usuwa identyfikatory z atrybutów, ponieważ wywalało błąd składni
function deleteIdAttributes(product_data){
    if(product_data.attributes && product_data.attributes[id_attributes_pull] && product_data.attributes[id_attributes_pull].length === 0)
        delete product_data.attributes[id_attributes_pull];

    if (product_data.attributes && product_data.attributes[id_attributes]) {
        const attributesToMove = product_data.attributes[id_attributes];
        // Przenieś wszystkie atrybuty z klucza do głównego obiektu attributes
        for (const key in attributesToMove) {
            if (attributesToMove.hasOwnProperty(key)) {
                product_data.attributes[key] = attributesToMove[key];
            }
        }

        // Usuń klucz z obiektu attributes
        delete product_data.attributes[id_attributes];
    }
    if(product_data.attributes && product_data.attributes[id_attributes_frame]){
        const attributesToMove = product_data.attributes[id_attributes_frame];
        
        // Przenieś wszystkie atrybuty z klucza do głównego obiektu attributes
        for (const key in attributesToMove) {
            if (attributesToMove.hasOwnProperty(key)) {
                product_data.attributes[key] = attributesToMove[key];
            }
        }

        // Usuń klucz z obiektu attributes
        delete product_data.attributes[id_attributes_frame];
    }

    return product_data;
}

// Dane do geta
const config = {
    headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
    }
};

// Funkcja do pobierania wszystkich stron produktów
async function fetchAllPages() {
    let allData = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
        try {
            const response = await axios.get(url + '/webapi/rest/products', {
                ...config,
                params: { page: currentPage }
            });

            // Sprawdź status odpowiedzi
            if (response.status === 200) {
                const data = response.data;
                totalPages = data.pages; // Aktualizacja całkowitej liczby stron
                console.log(currentPage + '/158');
                allData = allData.concat(data.list); // Dodanie wyników z bieżącej strony do listy wszystkich danych
                currentPage += 1; // Przejście do następnej strony
          
                await delay(1000); // Opóźnienie 1 sekundy
            } else {
                console.log('Błąd pobierania produktów:', response.statusText);
                break;
            }
        } catch (error) {
            console.error('Błąd pobierania produktów:', error.message);
            break; // Jeśli wystąpi błąd, przerwij pętlę
        }
    }

    return allData;
}

// Funkcja do pobierania produktów
async function get_products() {
    const list = await fetchAllPages();
    let products_data = [];
    console.log('Łączna liczba produktów:', list.length);
 
    let counter = 0;
    list.forEach(element => {
        if (element.attributes && element.attributes[id_attributes] && element.attributes[id_attributes][id_width]) {
            products_data.push(element);
        }
        if (element.attributes && element.attributes[id_attributes_frame] && element.attributes[id_attributes_frame][id_width_frame]){
            products_data.push(element);
        }
     });

     return products_data;
}

// Aktualizowanie produktóww
async function update_products(products_data) {
    
    for (let product_data of products_data){
        product_data = deleteIdAttributes(product_data);
        product_data = changeWidth(product_data);
        
        try {
            const response = await axios.put(url + '/webapi/rest/products/' + product_data.product_id, {
                ...product_data,
                options: []
                }, 
                {
                ...config,
            });
    
            // Sprawdź status odpowiedzi
            if (response.status === 200) {
                console.log('Pomyślnie zauktalizowano: ' + product_data.product_id);
    
            } else {
                console.log('Błąd aktualizacji produktu: ' + product_data.product_id, response.statusText);
            }
        } catch (error) {
            console.error('Błąd aktualizacji produktu: ' + product_data.product_id, error.message);
        }

        await delay(1000); // Opóźnienie 1 sekundy
    };
}

// Funkcja do pobierania produktu, trzeba podmienić końcówkę na id poszukiwanego produktu
async function get_product() {
    try {
        const response = await axios.get(url + '/webapi/rest/products/1535', {
            ...config,
        });

        // Sprawdź status odpowiedzi
        if (response.status === 200) {
            const data = response.data;
 

            if (data.attributes && data.attributes[id_attributes] && data.attributes[id_attributes][id_width]) {
                widthGroup = data.attributes[id_attributes][id_width];
                dimension = data.attributes[id_attributes][id_dimension];
            }
            if (data.attributes && data.attributes[id_attributes_frame] && data.attributes[id_attributes_frame][id_width_frame]){
                widthGroup = data.attributes[id_attributes_frame][id_width_frame];
                dimension = data.attributes[id_attributes_frame][id_dimension_frame];
            }
    
            const width = checkRegex(dimension);
            
            console.log(width);

            console.log(getWidthGroup(width));
            return data;

        } else {
            console.log('Błąd pobierania produktu:', response.statusText);
        }
    } catch (error) {
        console.error('Błąd pobierania produktu:', error.message);
    }
}

// Aktualizowanie produktu, trzeba podmienić końcówkę na id poszukiwanego produktu
async function update_product(product_data) {
    console.log(product_data.attributes);
    product_data = deleteIdAttributes(product_data);
    product_data = changeWidth(product_data);
    console.log(product_data.attributes);

    try {
        const response = await axios.put(url + '/webapi/rest/products/1535', {
            ...product_data,
            options: []
            }, 
            {
            ...config,
        });

        // Sprawdź status odpowiedzi
        if (response.status === 200) {
            console.log('Pomyślnie zauktalizowano');

        } else {
            console.log('Błąd aktualizacji produktu:', response.statusText);
        }
    } catch (error) {
        console.error('Błąd aktualizacji produktu:', error.message);
    }
}

// Wywołaj funkcję logowania i pobierania produktów
async function main() {
    //WYBRANY PRODUKT
    //     let product_data = await get_product();
    //     if (product_data) {
    //       await update_product(product_data);
    //   }

    //WSZYSTKIE PRODUKTY
      let products_data = await get_products();
      if (products_data) {
        await update_products(products_data);
    }
}

main();