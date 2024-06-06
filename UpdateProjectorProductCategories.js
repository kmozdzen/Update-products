
const axios = require('axios');
const UserData = require('./UserData');

const product = {
    "product_id": "2088",
    "producer_id": "19",
    "group_id": null,
    "tax_id": "1",
    "add_date": "2021-05-31 15:28:05",
    "edit_date": "2024-05-23 16:19:23",
    "other_price": "0.00",
    "pkwiu": "",
    "unit_id": "1",
    "in_loyalty": "0",
    "loyalty_score": null,
    "loyalty_price": null,
    "bestseller": "0",
    "newproduct": "0",
    "dimension_w": "0.0000",
    "dimension_h": "0.0000",
    "dimension_l": "0.0000",
    "vol_weight": "0.0000",
    "currency_id": null,
    "gauge_id": null,
    "unit_price_calculation": "0",
    "type": "0",
    "category_id": 96,
    "categories": [
        96,
        94
    ],
    "collections": [],
    "promo_price": null,
    "code": "Epson_EB-L260F",
    "ean": "",
    "stock": {
        "stock_id": "12213",
        "extended": "0",
        "price": "5150.00",
        "price_type": "1",
        "price_buying": "0.00",
        "stock": "1",
        "package": "0",
        "warn_level": null,
        "sold": "1",
        "weight": "4.1",
        "weight_type": "1",
        "active": "1",
        "default": "1",
        "product_id": "2088",
        "availability_id": null,
        "delivery_id": "2",
        "gfx_id": null,
        "code": "Epson_EB-L260F",
        "ean": "",
        "comp_weight": "4.1",
        "comp_price": "5150.00",
        "comp_promo_price": "5150.00",
        "price_wholesale": "5150.00",
        "comp_price_wholesale": "5150.00",
        "comp_promo_price_wholesale": "5150.00",
        "price_special": "5150.00",
        "comp_price_special": "5150.00",
        "comp_promo_price_special": "5150.00",
        "price_type_wholesale": "0",
        "price_type_special": "0",
        "calculation_unit_id": null,
        "calculation_unit_ratio": "0",
        "historical_lowest_price": "6900.00",
        "wholesale_historical_lowest_price": "5150.00",
        "special_historical_lowest_price": "5150.00"
    },
    "translations": {
        "pl_PL": {
            "translation_id": "2089",
            "product_id": "2088",
            "name": "Epson EB-L260F",
            "short_description": "<p><strong>Bezprzewodowy,</strong> projektor<strong> laserowy</strong>, 4600Ansi, kontrast 2 500 000:1, Full HD, 5 lat gwarancji</p>",
            "description": "<p><span style=\"color:#007cc3;font-family:verdana, geneva, sans-serif;font-size:10pt;\"><strong><span style=\"color:#000000;\">Projektor</span> Epson EB-L200F</strong></span></p>\n<ul>\n<li><span style=\"font-family:verdana, geneva, sans-serif;\"><span style=\"font-size:13.3333px;\">wszechstronny projektor laserowy,</span></span></li>\n<li><span style=\"font-family:verdana, geneva, sans-serif;\"><span style=\"font-size:13.3333px;\">bezprzewodowa transmisja sygnału - wbudowana funkcja bezprzewodowej sieci LAN oraz Screen Mirroring,</span></span></li>\n<li><span style=\"font-family:verdana, geneva, sans-serif;\"><span style=\"font-size:13.3333px;\">możliwość pracy w różnych położeniach daje dużą elastyczność instalacji i wiele możliwości wykorzystania urządzenia,</span></span></li>\n<li><span style=\"font-family:verdana, geneva, sans-serif;font-size:10pt;\">długa bezobsługowa praca: do 30.000h w trybie eco (do 20.000h w trybie std),</span></li>\n<li><span style=\"font-family:verdana, geneva, sans-serif;font-size:10pt;\">jasność 4600 lumenów,</span></li>\n<li><span style=\"font-family:verdana, geneva, sans-serif;font-size:10pt;\">bardzo wysoki kontrast 2 500 000:1,</span></li>\n<li><span style=\"font-family:verdana, geneva, sans-serif;font-size:10pt;\">minimalistyczny i estetyczny design,</span></li>\n<li><span style=\"font-family:verdana, geneva, sans-serif;font-size:10pt;\">5 lat gwarancji!</span></li>\n</ul>\n<p> </p>",
            "active": "1",
            "lang_id": "1",
            "isdefault": "0",
            "seo_title": "",
            "seo_description": "",
            "seo_keywords": "",
            "order": "4",
            "main_page": "0",
            "main_page_order": "0",
            "booster": "",
            "seo_url": "epson-eb-L200F",
            "permalink": "https://www.ekrany.pl/epson-eb-L200F"
        }
    },
    "options": [],
    "attributes": {
        "18": {
            "83": "Epson",
            "84": "EB-L260F",
            "85": "LCD",
            "110": "16:9",
            "86": "1920x1080 (1080p)",
            "87": "400 ANSI lm",
            "88": "2500000:1",
            "115": "0",
            "116": "",
            "111": "Nie",
            "112": "",
            "89": "1",
            "90": "1.6x",
            "91": "31'' - 310''",
            "92": "",
            "93": "pion +/- 30°, poziom +/- 30°",
            "94": "2 x HDMI (HDCP 2.2)",
            "95": "2x VGA,  Wejście sygnału kompozytowego",
            "96": "",
            "97": "",
            "98": "Stereofoniczne wejście audio mini-jack (2x), Wejście audio typu cinch, wejście mikrofonu",
            "99": "Stereofoniczne wyjście audio mini-jack",
            "101": "Złącze USB 2.0 typu A, Złącze USB 2.0 typu B, RS-232C",
            "100": "Tak",
            "114": "Tak, 16W",
            "103": "Połączenie ze smartfonem: Ad-hoc/Infrastruktura",
            "109": "Bezprzewodowa sieć LAN IEEE 802.11a/b/g/n/ac (WiFi 5), Interfejs Ethernet (100 Base-TX / 10 Base-T), Wi-Fi Direct",
            "113": "20.000 h (std), 30.000h (eco)",
            "102": " Praca: 37 dB (A)- w trybie czuwania: 27 dB (A)",
            "104": "Urządzenie podstawowe, Kabel zasilający, Skrócona instrukcja uruchomienia, Pilot z bateriami, Zestaw instrukcji obsługi,",
            "107": "4,2kg",
            "108": "325‎ x 299 x 90 mm (Szerokość x Głębokość x Wysokość)",
            "105": "60 miesiące/miesięcy Klient zanosi do serwisu, ",
            "106": "60 miesiące lub 12.000 h"
        }
    },
    "related": [
        1650,
        1651,
        1882,
        1883,
        1224,
        630,
        624,
        1225,
        1226
    ],
    "main_image": {
        "gfx_id": "6662",
        "name": "projektor_epson_eb-l200f.jpg",
        "unic_name": "6662",
        "order": "1",
        "hidden": "0",
        "translations": {
            "pl_PL": {
                "translation_id": "5322",
                "gfx_id": "6662",
                "name": "projektor_epson_eb-l200f.jpg",
                "lang_id": "1"
            }
        },
        "extension": "jpg"
    },
    "is_product_of_day": false,
    "feeds_excludes": [],
    "tags": [
        4,
        6,
        42,
        43
    ]
}
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
const id_resolution= '86'; //id rozdzielczosci
const id_brightness = '87';

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

  list.forEach(element => {
      if (element.attributes && element.attributes[id_attributes]) {
          products_data.push(element);
      }
      return products_data;
   });

   return products_data;
}

// Funkcja do pobierania produktu, trzeba podmienić końcówkę na id poszukiwanego produktu
async function get_product() {
  try {
      const response = await axios.get(url + '/webapi/rest/products/1237', {
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

async function add_categories_to_product(product){
    const projectorCategory = getProjectorCategory();
    console.log(projectorCategory);

    const resolution = product.attributes[id_attributes][id_resolution];
    console.log(resolution);
    const resolutionCategories = getResolutionCategory(resolution);
    console.log(resolutionCategories);
  
    const brightness = product.attributes[id_attributes][id_brightness];
    console.log(brightness);
    const brightnessCategories = getBrightnessCategory(checkBrightnessRegex(brightness));
    console.log(brightnessCategories);

    const allCategories = [...projectorCategory, ...resolutionCategories, ...brightnessCategories];
    product.categories = allCategories;

    if(!allCategories.includes('')){
        if(product.categories.includes('inna kategoria')){
          filteredCategories = product.categories.filter(item => item !== 'inna kategoria');
          product.categories = filteredCategories;
        }
        console.log(product.categories);
      }
  }


async function main() {
    add_categories_to_product(product);
    //await get_products();
}

main();