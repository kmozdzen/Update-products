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
const id_attributes = '5'; //id szerokości projekcyjnej
const id_attributes_frame = '11'; //id szerokości projekcyjnej ramowej
const id_attributes_pull = '12'; //id szerokości projekcyjnej pull up
const id_dimension = '29'; //id powierzchni roboczej
const id_dimension_frame = '37'; //id powierzchni roboczej dla ramkowych
const id_width = '144'; //id szerokości projekcyjnej
const id_width_frame = '145'; //id szerokości projekcyjnej dla ramkowych

const id_ratio = '28';
const id_type = '22';
const id_ratio_frame = '39';
const id_type_frame = '40';

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

function getScreenCategory(){
    const screen = '193' 
    return [screen];
}

function getScreenWidthCategory(width){
    const widthCategoryName = '219' //kategoria dla Szerokość ekranu
    let widthCategory = '';
    
    if(width <= 200){
        widthCategory =  '220';
      }
      if(width > 200 && width <= 240){
        widthCategory = '221';
      }
      else if(width > 240 && width <= 280){
        widthCategory = '222';
      }
      else if(width > 280 && width <= 320){
        widthCategory = '223';
      }
      else if(width > 320 && width <= 360){
        widthCategory = '224';
      }
      else if(width > 360 && width <= 400){
        widthCategory = '225';
      }
      else if(width > 400 && width <= 440){
        widthCategory = '226';
      }
      else if(width > 440 && width <= 480){
        widthCategory = '227';
      }
      else if(width > 480){
        widthCategory = '231';
      }
    
      return [widthCategoryName, widthCategory];
}

function getRatioCategory(ratio){
  const ratioCategoryName = '194' //kategoria dla Format
  let ratioCategory = '';

  if(ratio == '1:1'){
    ratioCategory = '195';
  } 
  else if(ratio == '4:3'){
    ratioCategory = '196';
  }
  else if(ratio == '16:9'){
    ratioCategory = '197';
  }
  else if(ratio == '16:10'){
    ratioCategory = '198';
  }

  return [ratioCategoryName, ratioCategory];
}

function getTypeCategory(type){
  const typeCategoryName = '199' //kategoria dla Typ
  let typeCategory = '';

  if(type == 'elektrycznie rozwijany'){
    typeCategory = '200';
  } 
  else if(type == 'ręcznie rozwijany'){
    typeCategory = '201';
  }
  else if(type == 'elektrycznie rozwijany z napinaczami'){
    typeCategory = '205';
  }
  else if(type == 'ramowy'){
    typeCategory = '279';
  }
  else if(type == 'na trójnogu'){
    typeCategory = '207';
  }
  else if(type == 'na statywie'){
    typeCategory = '204';
  }
  else if(type == 'typu PULL-UP'){
    typeCategory = '206';
  }
  else if(type == 'ramowy przenośny'){
    typeCategory = '204';
  }
  else if(type == 'ekran elektryczny do zabudowy'){
    typeCategory = '208';
  }
  else if(type == 'ekran do zabudowy sufitowej z napinaczami'){
    typeCategory = '203';
  }

  return [typeCategoryName, typeCategory];
}

function getBrandCategory(brand){
  const brandCategoryName = '209' //kategoria dla Marka
  let brandCategory = 'inna kategoria';

  if(brand == '6'){//ADEO
    brandCategory = '210';
  } 
  else if(brand == '22'){//KAUBER
    brandCategory = '212';
  } 
  else if(brand == '24'){//Suprema
    brandCategory = '213';
  } 
  else if(brand == '8'){//AVtek
    brandCategory = '211';
  } 

  return [brandCategoryName, brandCategory];
}

function getPriceCategory(price){
  const priceCategoryName = '264' //kategoria dla Cena
  let priceCategory = '';

  if(price <= 1000){
    priceCategory = '265';
  } 
  else if(price > 1000 && price <= 2000){
    priceCategory = '266';
  } 
  else if(price > 2000 && price <= 4000){
    priceCategory = '267';
  } 
  else if(price > 4000 && price <= 6000){
    priceCategory = '268';
  } 
  else if(price > 6000 && price <= 8000){
    priceCategory = '269';
  } 
  else if(price > 8000 && price <= 10000){
    priceCategory = '270';
  } 
  else if(price >= 10000){
    priceCategory = '271';
  } 

  return [priceCategoryName, priceCategory];
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

  let counter = 0;
  list.forEach(element => {
      if (element.attributes && element.attributes[id_attributes] && element.attributes[id_attributes][id_width]) {
          products_data.push(element);
      }
      if (element.attributes && element.attributes[id_attributes_frame] && element.attributes[id_attributes_frame][id_width_frame]){
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

          if (data.attributes && data.attributes[id_attributes] && data.attributes[id_attributes][id_width]) {
            return data;
          }
          if (data.attributes && data.attributes[id_attributes_frame] && data.attributes[id_attributes_frame][id_width_frame]){
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


async function addd_categories_to_product(product){
  let dimension = '';
  let width = '';
  if(product.attributes && product.attributes[id_attributes] && product.attributes[id_attributes][id_dimension]){
    dimension = product.attributes[id_attributes][id_dimension];
    width = checkRegex(dimension);
  }else if(product.attributes && product.attributes[id_attributes_frame] && product.attributes[id_attributes_frame][id_dimension_frame]){
    dimension = product.attributes[id_attributes_frame][id_dimension_frame];
    width = checkRegex(dimension);
  }

  let widthCategories = [...getScreenCategory(), ...getScreenWidthCategory(width)];

  let ratio = '';
  let ratioCategories = [];
  if(product.attributes && product.attributes[id_attributes] && product.attributes[id_attributes][id_ratio]){
    ratio = product.attributes[id_attributes][id_ratio];
    ratioCategories = getRatioCategory(ratio);
  }else if(product.attributes && product.attributes[id_attributes_frame] && product.attributes[id_attributes_frame][id_ratio_frame]){
    ratio = product.attributes[id_attributes_frame][id_ratio_frame];
    ratioCategories = getRatioCategory(ratio);
  }

  let type = '';
  let typeCategories = [];
  if(product.attributes && product.attributes[id_attributes] && product.attributes[id_attributes][id_type]){
    type = product.attributes[id_attributes][id_type];
    typeCategories = getTypeCategory(type);
  }else if(product.attributes && product.attributes[id_attributes_frame] && product.attributes[id_attributes_frame][id_type_frame]){
    type = product.attributes[id_attributes_frame][id_type_frame];
    typeCategories = getTypeCategory(type);
  }

  const brand = product.producer_id;
  let brandCategories = getBrandCategory(brand);

  const price = product.stock.price;
  let priceCategories = getPriceCategory(parseFloat(price));

  const allCategories = [...widthCategories, ...ratioCategories, ...typeCategories, ...brandCategories, ...priceCategories];

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
    await addd_categories_to_product(product);
    await delay(1000);
  }
}

async function main() {
    //POJEDYNCZY PRODUKT
    //const product = await get_product(id); 
    //await update_products(id);

    //WSZYSTKIE
    const products = await get_products();
    processProducts(products);
  }

main();