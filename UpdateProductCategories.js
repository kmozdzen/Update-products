const axios = require('axios');
const UserData = require('./UserData');


// Dane logowania
const url = UserData.url;
const token = UserData.token;

let product = {
    "product_id": "1188",
    "producer_id": "6",
    "group_id": "37",
    "tax_id": "1",
    "add_date": "2016-09-16 12:50:49",
    "edit_date": "2024-06-05 15:47:30",
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
    "gauge_id": "3",
    "unit_price_calculation": "0",
    "type": "0",
    "category_id": 170,
    "categories": [
        170,
        231
    ],
    "collections": [],
    "promo_price": null,
    "code": "ADEOIN197x150_20160916125049",
    "ean": "",
    "stock": {
        "stock_id": "10539",
        "extended": "0",
        "price": "6680.79",
        "price_type": "1",
        "price_buying": "0.00",
        "stock": "10",
        "package": "0",
        "warn_level": "1",
        "sold": "0",
        "weight": "16",
        "weight_type": "1",
        "active": "1",
        "default": "1",
        "product_id": "1188",
        "availability_id": "6",
        "delivery_id": "6",
        "gfx_id": null,
        "code": "ADEOIN197x150_20160916125049",
        "ean": "",
        "comp_weight": "16",
        "comp_price": "6680.79",
        "comp_promo_price": "6680.79",
        "price_wholesale": "6680.79",
        "comp_price_wholesale": "6680.79",
        "comp_promo_price_wholesale": "6680.79",
        "price_special": "6680.79",
        "comp_price_special": "6680.79",
        "comp_promo_price_special": "6680.79",
        "price_type_wholesale": "0",
        "price_type_special": "0",
        "calculation_unit_id": null,
        "calculation_unit_ratio": "0",
        "historical_lowest_price": "6680.79",
        "wholesale_historical_lowest_price": "6680.79",
        "special_historical_lowest_price": "6680.79"
    },
    "translations": {
        "pl_PL": {
            "translation_id": "1189",
            "product_id": "1188",
            "name": "Ekran Adeo INCEEL TENSIO CLASSIC 217 (16:10)",
            "short_description": "<p>Wysokiej jakości ekrany projekcyjne rozwijane elektrycznie przeznaczone do zabudowy sufitowej,<br />z systemem napinaczy Tensio Classic, skierowane do najbardziej wymagających użytkowników.<br />System bocznych napinaczy zapewnia idealną gładkość powierzchni projekcyjnej.<br /><br /></p>\r\n<p> </p>",
            "description": "<p style=\"font-size: 12px; font-family: Tahoma, Verdana, Arial, Helvetica;\"><strong>Adeo INCEEL TENSIO CLASSIC</strong></p>\r\n<p style=\"font-size: 12px; font-family: Tahoma, Verdana, Arial, Helvetica;\"><strong><font size=\"3\">Charakterystyka:</font></strong></p>\r\n<p style=\"font-size: 12px; font-family: Tahoma, Verdana, Arial, Helvetica;\" align=\"justify\">Linia wysokiej jakości ekranów projekcyjnych przeznaczona do zabudowy sufitowej, dedykowana dla wszystkich typów klientów- do profesjonalnych instalacji AV, dla sektora publicznego i edukacyjnego, wyposażenia sal konferencyjnych oraz do użytku w kinie domowym. Ekrany z napinaczami świadczą o wysiłku jaki Adeo Screen wkłada w rozwój nowych, innowacyjnych produktów. Nowa strategia marketingowa firmy przewiduje rozszerzanie asortymentu o nowe modele - produkty klasy premium, dostosowane do oczekiwań rynku, ze szczególnym uwzględnieniem najbardziej wymagających użytkowników. Najczęstszym problemem, jaki muszą uwzględniać producenci ekranów jest aspekt płaskości powierzchni projekcyjnej. Jednym z najważniejszych czynników, wpływających na jakość ekranów projekcyjnych są fałdy i zmarszczenia. Ekrany z napinaczami rozwiązują ten problem za pomocą innowacyjnych i oryginalnych systemów, opracowanych i opatentowanych przez pracowników działu badań i rozwoju Adeo Screen. Firma Adeo Screen opracowała własny projekt najwyższej jakości ekranu przeznaczonego do instalacji wszędzie tam, gdzie klient oczekuje całkowitego ukrycia ekranu w suficie. Pracownicy działu badań i rozwoju Adeo Screen położyli szczególny nacisk na wygodę montażu, szczególnie możliwość elastycznego dopasowania kasety ekranu do płaszczyzny istniejącego sufitu właściwego i podwieszanego oraz łatwego demontażu ekranu w razie potrzeby.</p>\r\n<p style=\"font-size: 12px; font-family: Tahoma, Verdana, Arial, Helvetica;\" align=\"justify\">Ekrany Inceel Tensio Classic dostępne są w formatach 4:3, 16:9 (16:10) lub innych nie przekraczjących 1:1 (na zamówienie) oraz mogą być wyposażone w różne materiały projekcyjne, w zależności od przeznaczenia - VisionWhite (standard), VisionWhitePro (nie przepuszczająca światła), ReferenceGrey (zwiększająca kontrast), VisionAcoustik (przepuszczająca dźwięk). Ekrany Tensio Classic Incell wyposażone są w klasyczny system napinaczy- elastyczna linka napina boczne krawędzie ekranu, co pozwala uzyskać idealnie gładką powierzchnię projekcyjną. Kasety wykonane są w całości z aluminium.</p>\r\n<p style=\"font-size: 12px; font-family: Tahoma, Verdana, Arial, Helvetica;\"><font size=\"3\"><strong>Możliwość personalizacji z PSS (Personal Screen System):</strong></font></p>\r\n<ul style=\"font-size: 12px; font-family: Tahoma, Verdana, Arial, Helvetica;\">\r\n<li><strong>Wymiar powierzchni projekcyjnej:</strong> szerokość i wysokość</li>\r\n<li><strong>Rodzaj napędu</strong>: standardowy elektryczny lub z wbudowanym sterowaniem radiowym</li>\r\n<li><strong>Kaseta:</strong> dostępny tylko z kasetą</li>\r\n<li><strong>Kolor kasety:</strong> dostępny tylko biały</li>\r\n<li><strong>Powierzchnie projekcyjne:</strong> VisionWhite, VisionWhitePro, VisionAcoustik, ReferenceWhite i ReferenceGrey, standardowo z czarnymi ramkami</li>\r\n<li><strong>Wysokość czarnego topu:</strong> od 5 do 45 cm</li>\r\n<li><strong>Strona wysuwu ekranu: </strong>przednia lub tylna</li>\r\n<li><strong>Strona montażu silnika:</strong> tylko prawa</li>\r\n</ul>\r\n<p><strong><span style=\"color: #666666; font-size: 10.6667px; font-family: Tahoma, Arial, sans-serif;\"> </span><span style=\"font-size: 10.6667px; font-family: Tahoma, Arial, sans-serif;\"><span style=\"font-size: 10.6667px;\">* Ekran wykonywany na zamówienie.</span></span></strong></p>",
            "active": "0",
            "lang_id": "1",
            "isdefault": "0",
            "seo_title": "",
            "seo_description": "",
            "seo_keywords": "",
            "order": "0",
            "main_page": "0",
            "main_page_order": "0",
            "booster": "",
            "seo_url": "",
            "permalink": "https://www.ekrany.pl/pl/p/Ekran-Adeo-INCEEL-TENSIO-CLASSIC-217-1610/1188"
        }
    },
    "options": [
        10540,
        10541,
        10542,
        10543,
        10544,
        10545,
        10546,
        10547,
        10548,
        10549,
        10550,
        10551,
        10556,
        10557,
        10558,
        10559
    ],
    "attributes": {
        "5": {
            "144": "Do 200",
            "21": "ADEO INCELL TENSIO CLASSIC 217 (16:10)",
            "22": "ekran do zabudowy sufitowej z napinaczami",
            "28": "16:10",
            "27": "",
            "29": "165x103",
            "26": "aluminiowa",
            "25": "możliwość personalizacji",
            "24": "36 miesięcy (w tym 24 miesiące na powierzchnie projekcyjne), gwarancja na silniki 60 miesięcy",
            "23": "28"
        }
    },
    "related": [],
    "main_image": {
        "gfx_id": "2702",
        "name": "ekran_tensio_incell_lg.jpg",
        "unic_name": "6841a4e150ec95df1ef0ceb56f477013",
        "order": "1",
        "hidden": "0",
        "translations": {
            "pl_PL": {
                "translation_id": "1464",
                "gfx_id": "2702",
                "name": "ekran_tensio_incell_lg.jpg",
                "lang_id": "1"
            }
        },
        "extension": "jpg"
    },
    "is_product_of_day": false,
    "feeds_excludes": [],
    "tags": []
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

async function main() {
    const width = 300;
    let widthCategories = [...getScreenCategory(), ...getScreenWidthCategory(width)];
    console.log(widthCategories);
}

main();