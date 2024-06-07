
const axios = require('axios');
const UserData = require('./UserData');

// Dane logowania
const url = UserData.url;
const token = UserData.token;

// Dane do geta
const config = {
  headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
  }
};

// Dane sklepu
const id_attributes = '18'; //id kategorii projektory
const id_attributes_screen = '5'; // id kategorii ekrany

const id_resolution= '86'; //id rozdzielczosci
const id_brightness = '87';
const id_brand = '83';
const id_technology = '85';

// Funkcja do opóźnienia w wykonywaniu requestów
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Funkcja do sprawdzania poprawności zapisanych wymiarów oraz wyciągania szerokości ekranu
function checkBrightnessRegex(brightness){
    const regex = /\b\d+\b/;
    const match = brightness.match(regex);
    return match ? parseInt(match[0], 10) : null;
  }
  

function getProjectorCategory(){
    return ['232'];
}

function getResolutionCategory(resolution){
    const resolutionCategoryName = '237' //kategoria dla Rozdzielczosc
    let resolutionCategory = 'inna kategoria';
  
    if(resolution == '1280x800 (WXGA)'){ //wxga
        resolutionCategory = '238';
    } 
    else if(resolution == '1920x1080 (1080p)'){
        resolutionCategory = '239';
    } 
    else if(resolution == '1920x1200 (WUXGA)'){
        resolutionCategory = '240';
    } 
    else if(resolution == '4096x2160 (4K)'){
        resolutionCategory = '241';
    } 
    else if(resolution == '3840x2160 (UHD)'){
        resolutionCategory = '242';
    } 

    return [resolutionCategoryName, resolutionCategory];
  }

function getBrightnessCategory(brightness){
    const brightnessCategoryName = '252' //kategoria dla Jasność
    let brightnessCategory = '';

    if(brightness <= 2000){
        brightnessCategory = '253';
    } 
    else if(brightness > 2000 && brightness <= 3000){
        brightnessCategory = '254';
    } 
    else if(brightness > 3000 && brightness <= 4000){
        brightnessCategory = '255';
    } 
    else if(brightness > 4000 && brightness <= 5000){
        brightnessCategory = '256';
    } 
    else if(brightness > 5000 && brightness <= 6000){
        brightnessCategory = '257';
    } 
    else if(brightness > 6000 && brightness <= 7000){
        brightnessCategory = '258';
    } 
    else if(brightness > 7000 && brightness <= 8000){
        brightnessCategory = '259';
    }
    else if(brightness >= 8000){
        brightnessCategory = '260';
    } 

    return [brightnessCategoryName, brightnessCategory];
  }

  function getBrandCategory(brand){
    const brandCategoryName = '243' //kategoria dla Marka
    let brandCategory = 'inna kategoria';
  
    if(brand == 'Epson'){
        brandCategory = '244';
    } 
    else if(brand == 'Nec'){
        brandCategory = '245';
    } 
    else if(brand == 'Optoma'){
        brandCategory = '246';
    } 
    else if(brand == 'Panasonic'){
        brandCategory = '247';
    } 
    else if(brand == 'JVC'){
        brandCategory = '248';
    } 

    return [brandCategoryName, brandCategory];
  }

  function getTechnologyCategory(technology){
    const technologyCategoryName = '261' //kategoria dla Technologia
    let technologyCategory = 'inna kategoria';
  
    if(technology == 'LCD'){
        technologyCategory = '262';
    } else if(technology == 'DLP'){
        technologyCategory = '263';
    } 

    return [technologyCategoryName, technologyCategory];
  }
  
  function getPriceCategory(price){
    const priceCategoryName = '272' //kategoria dla Cena
    let priceCategory = '';
  
    if(price <= 5000){
      priceCategory = '273';
    } 
    else if(price > 5000 && price <= 7500){
      priceCategory = '274';
    } 
    else if(price > 7500 && price <= 10000){
      priceCategory = '275';
    } 
    else if(price > 10000 && price <= 12500){
      priceCategory = '276';
    } 
    else if(price > 12500 && price <= 15000){
      priceCategory = '277';
    } 
    else if(price >= 15000){
      priceCategory = '278';
    } 
  
    return [priceCategoryName, priceCategory];
  }

// Usuwa identyfikatory z atrybutów, ponieważ wywalało błąd składni
function deleteIdAttributes(product_data){
    if(product_data.attributes && product_data.attributes[id_attributes_screen] && product_data.attributes[id_attributes_screen].length === 0)
        delete product_data.attributes[id_attributes_screen];
  
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
    return product_data;
  }

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

  list.forEach(element => {
      if (element.attributes && element.attributes[id_attributes]) {
          products_data.push(element);
      }
      return products_data;
   });

   return products_data;
}

// Funkcja do pobierania produktu, trzeba podmienić końcówkę na id poszukiwanego produktu
async function get_product(id) {
  try {
      const response = await axios.get(url + '/webapi/rest/products/' + id, {
          ...config,
      });

      // Sprawdź status odpowiedzi
      if (response.status === 200) {
          const data = response.data;

          if (data.attributes && data.attributes[id_attributes]) {
            return data;
          }
    
          return null;

      } else {
          console.log('Błąd pobierania produktu:', response.statusText);
      }
  } catch (error) {
      console.error('Błąd pobierania produktu:', error.message);
  }
}

// Aktualizowanie produktu, trzeba podmienić końcówkę na id poszukiwanego produktu
async function update_products(product_data) {
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
  }


async function add_categories_to_product(product){
    const projectorCategory = getProjectorCategory();

    const resolution = product.attributes[id_attributes][id_resolution];
    const resolutionCategories = getResolutionCategory(resolution);
  
    const brightness = product.attributes[id_attributes][id_brightness];
    const brightnessCategories = getBrightnessCategory(checkBrightnessRegex(brightness));

    const brand = product.attributes[id_attributes][id_brand];
    const brandCategories = getBrandCategory(brand);

    const technology = product.attributes[id_attributes][id_technology];
    const technologyCategories = getTechnologyCategory(technology);

    const price = product.stock.price;
    const priceCategories = getPriceCategory(parseFloat(price));

    const allCategories = [...projectorCategory, ...resolutionCategories, ...brightnessCategories, ...brandCategories, ...technologyCategories, ...priceCategories];
    product.categories = allCategories;
    product = deleteIdAttributes(product);

    if(!allCategories.includes('')){
        if(product.categories.includes('inna kategoria')){
          filteredCategories = product.categories.filter(item => item !== 'inna kategoria');
          product.categories = filteredCategories;
        }
        await update_products(product);
      }
  }

  async function processProducts(products) {
    for (const product of products) {
      await add_categories_to_product(product);
      await delay(1000);
    }
  }

async function main() {
    //POJEDYNCZY PRODUKT
    const product = await get_product(2250);
    add_categories_to_product(product);

    //WSZYSTKIE
    // const products = await get_products();
    // processProducts(products);
}

main();