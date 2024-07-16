 //SKRYPT DO OBLICZANIA ODLEGLOSCI OD EKRANU
 document.addEventListener('DOMContentLoaded', function() {
 
    const select_producer = document.querySelector('#projector-distance-select-producer'); // wybor producenta
    const select_model = document.querySelector('#projector-distance-select-model'); // wybor modelu
    const projector_view = document.querySelector('.projector-view'); // widok projektora z danymi
    const projector_name = document.querySelector('#projector-content-name'); // nazwa projektora
    const projector_resolution = document.querySelector('#projector-content-resolution'); // rozdzielczosc ekranu
    const projector_image = document.querySelector('.projector-image'); // obrazek projektora przy danych
    const calculate_projector = document.querySelector('.calculate-projector'); // kontener z paskami wyboru szerokości i odległości oraz wizualizacja graficzna
    const create_projector_button = document.getElementById('create-projector-button'); // przycisk udostępniający dane do stworzenia projektora 
    const create_projector_content = document.querySelector('.create-projector-content'); // dane do stworzenia projektora
    const create_projector_submit = document.getElementById('create-projector-submit'); // przycisk do tworzenia wlasnego projektora
    const your_projector_select_ratio = document.getElementById('your-projector-select-ratio'); // wybór proporcji dla wlasnego projektora
    const a_projector_ratio = document.querySelector("#projector-ratio"); // proporcje projektora
    const a_projector_throw_min = document.querySelector("#projector-throw-min"); // minimalny rzut projektora
    const a_projector_throw_max = document.querySelector("#projector-throw-max"); // maksymalny rzut projektora
    const width_slider = document.getElementById('width-range'); // przesuwalny pasek wyboru szerokości ekranu 
    const width_tooltip = document.getElementById('width-tooltip'); // wyswietlana wartosc przy pasku szerokosci
    const screen_width_input = document.getElementById("calculate-projector-size-input-id"); // pole do wpisywania szerokosci
    const throw_slider = document.getElementById('throw-range'); // przesuwalny pasek wyboru odleglosci projektora od ekranu
    const throw_tooltip = document.getElementById('throw-tooltip'); // wyswietlana wartosc przy pasku odleglosci
    const screen_throw_input = document.getElementById("calculate-projector-throw-input-id"); // pole do wpisywania odleglosci
    const projector_screen_img = document.getElementById('projector-screen-img'); // obrazek ekranu
    const img_height = document.getElementById('img-height'); // wartosc wysokosci przy obrazku ekranu
    const img_width = document.getElementById('img-width'); // wartosc szerokosci przy obrazku ekranu
    const line_value = document.getElementById('line-value'); // wartosc pod linia
    const projector_icon = document.querySelector('.projector-icon'); // ikonka projektora przy wizualizacji
    const minValueInput = document.getElementById('create-projector-min-value');
    const maxValueInput = document.getElementById('create-projector-max-value');
    const proportionResult = document.getElementById('create-projector-result');

    // dane dla istniejacych projektorow
   const options = {
      "Epson": {
        "EB-L520U": {
          image: 'https://www.ekrany.pl/userdata/public/gfx/6974/EB-L52U.jpg',
          resolution: '1920x1200 (WUXGA)',
          ratio: '16:9',
          lens_min: '2.92',
          lens_max: '4.73'
        }
      },
      "Optoma": {
        "UHD35X": {
          image: 'https://www.ekrany.pl/userdata/public/gfx/4491/glw.jpg',
          resolution: '3840x2160 (UHD)',
          ratio: '16:9',
          lens_min: '1.50',
          lens_max: '1.66'
        }
      }
    };
    
    // pokazywanie i chowanie się kontentu dla tworzenia własnego projektora
    create_projector_button.addEventListener('click', () => {
      if(create_projector_content.style.display == 'none')
        create_projector_content.style.display = 'block';
      else
        create_projector_content.style.display = 'none';
    });
  
    // zbiera minimalny i maksymalny rzut i zapisuje je w 1 zdaniu:  Min: 1,09 Max: 1,77 --> 1,09 - 1,77
    function updateProportion() {
      const minValue = parseFloat(minValueInput.value).toFixed(2).replace('.', ',');
      const maxValue = parseFloat(maxValueInput.value).toFixed(2).replace('.', ',');
      proportionResult.textContent = `${minValue} - ${maxValue}`;
    }
    
    // tworzenie wlasnego projektora
    create_projector_submit.addEventListener('click', () => {
      // pokazanie sie projektora, danych oraz paskow 
      projector_view.style.display = "flex";
      calculate_projector.style.display = "flex";
      projector_resolution.style.display = "none"; // ukrycie rozdzelczosci
      projector_name.style.display = "none"; // ukrycie nazwy projektora
      
      // wyzerowanie selectow gotowych projektorow
      select_model.value = "wybierz";
      select_producer.value = "wybierz";
      
      // ustawienie podstawowego zdjecia projektora 
      projector_image.src = "https://sklep5534602.homesklep.pl/upload/default-projector.png";
      
      // wyzerowanie paskow
      const minValue = parseFloat(minValueInput.value);
      const maxValue = parseFloat(maxValueInput.value);
      
      a_projector_ratio.textContent = your_projector_select_ratio.value;
      a_projector_throw_min.textContent = minValue;
      a_projector_throw_max.textContent = maxValue;
      
      screen_width_input.value = '0';
      screen_throw_input.value = '0';
      
      updateRange(throw_slider, throw_tooltip, 0);
      updateRange(width_slider, width_tooltip, 0);
      
      width_slider.value = 0;
      throw_slider.value = 0;
    });
  
    minValueInput.addEventListener('input', updateProportion);
    maxValueInput.addEventListener('input', updateProportion);
    
    select_producer.addEventListener("change", () => {
      const producer = select_producer.value;
      select_model.disabled = !producer;
      projector_view.style.display = "none";
      select_model.innerHTML = "";
      select_model.innerHTML = '<option value="wybierz">Wybierz...</option>';
      
      if(select_producer.value == 'wybierz'){
        projector_view.style.display = "none";
        calculate_projector.style.display =  "none";
      }

      if(select_model.value == 'wybierz'){
        projector_view.style.display = "none";
        calculate_projector.style.display =  "none";
      }

      if (producer && options[producer]) {
        Object.keys(options[producer]).forEach(model => {
          addOption(model);
        });
      }
    });
    
    select_model.addEventListener("change", () => {
      if(select_model.value != 'wybierz'){
        getProjectorInfo();
        projector_view.style.display = "flex";
        calculate_projector.style.display = "flex";
      }
      else{
        projector_view.style.display = "none";
        calculate_projector.style.display =  "none";
      }
    });
  
    const addOption = (model) => {
      const option = document.createElement("option");
      option.textContent = model;
      option.value = model;
      select_model.appendChild(option);
    }
    
    const getProjectorInfo = () => {
      const producer = select_producer.value;
      const model = select_model.value;
      
      if (producer && model && options[producer][model]) {
        const projector = options[producer][model];
        projector_image.src = projector.image;
        projector_name.textContent = `${producer} ${model}`;
        projector_resolution.textContent = `Rozdzielczość: ${projector.resolution}`;
        a_projector_ratio.textContent = projector.ratio;
        a_projector_throw_min.textContent = projector.lens_min;
        a_projector_throw_max.textContent = projector.lens_max;
      }
    }
    
  //SZEROKOŚĆ I RZUT
    const baseScreenWidth = 100;
    
    const changeScreenImgSize = () => {
      const newValue = String(baseScreenWidth +  (parseInt(width_tooltip.textContent) / 4));
      projector_screen_img.style.width = newValue + 'px';
    }
    
    const getRatioWidth = (ratio) => {
      let pattern = /(\d+):(\d+)/;
      
      if (ratio && typeof ratio === "string") {
        let matches = ratio.match(pattern);
  
        if (matches) {
            let number1 = matches[1];
            return parseInt(number1);
  
        } else {
            console.log("Nie znaleziono dopasowania");
            return 0;
        }
      }
    }
    
    const getRatioHeight = (ratio) => {
      let pattern = /(\d+):(\d+)/;
      
      if (ratio && typeof ratio === "string") {
        let matches = ratio.match(pattern);
  
        if (matches) {
            let number2 = matches[2];
            return parseInt(number2);
        } else {
            console.log("Nie znaleziono dopasowania");
            return 0;
        }
      }
    }
    
    const update_img_values = () => {
      img_width.innerHTML = width_tooltip.textContent;
  
      const ratioHeight = getRatioHeight(a_projector_ratio.textContent);
      const ratioWidth = getRatioWidth(a_projector_ratio.textContent);
  
      console.log('wysokosc: ' + ratioHeight);
      console.log('szerokosc: ' + ratioWidth);
      const width = parseInt(width_tooltip.textContent);
      const imgHeightValue = parseInt(width * ratioHeight / ratioWidth); 
      img_height.innerHTML = imgHeightValue;
      changeScreenImgSize();
    }
    
     const get_min_throw_info = () => {
      const producer = select_producer.value;
      const model = select_model.value;
      
   if (producer && model && options[producer] && options[producer][model] && producer !== "wybierz" && model !== "wybierz") {
      const projector = options[producer][model];
      return projector.lens_min;
    }
  
       return "";
    }
     
    const get_max_throw_info = () => {
      const producer = select_producer.value;
      const model = select_model.value;
      
   if (producer && model && options[producer] && options[producer][model] && producer !== "wybierz" && model !== "wybierz") {
      const projector = options[producer][model];
      return projector.lens_max;
    }
  
       return "";
    }
    
  const updateRange = (slider, tooltip, value) => {
    const min = slider.min;
    const max = slider.max;
    const percentage = ((value - min) / (max - min)) * 100;
    tooltip.textContent = value;
    tooltip.style.left = `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
    
     if(tooltip.id == "throw-tooltip"){
        const min_throw = a_projector_throw_min.textContent;
        let min_throw_int = 0;
        if(min_throw != "")
          min_throw_int = parseFloat(min_throw);
  
        const max_throw = a_projector_throw_max.textContent
        let max_throw_int = 0;
        if(max_throw != "")
          max_throw_int = parseFloat(max_throw);
      
      const max_lens_int = Math.floor((parseInt(value) / min_throw_int) * max_throw_int);
      tooltip.textContent = tooltip.textContent + " - " + max_lens_int;
      line_value.innerHTML = value;

      projector_icon_new_value = (50 - (value/20)) + '%'; 
      projector_icon.style.marginLeft = projector_icon_new_value;
      update_img_values();
    }
  };
  
  const updateWidthTooltip = (slider, tooltip, input) => {
    const value = slider.value;
    updateRange(slider, tooltip, value);
  
    const throw_value = Math.floor(Math.min(1000, parseInt(value) * parseFloat(a_projector_throw_min.textContent)));
    updateRange(throw_slider, throw_tooltip, throw_value);
  
    input.value = value;
    screen_throw_input.value = throw_value;
    throw_slider.value = throw_value;
  };
  
  const updateThrowTooltip = (slider, tooltip, input) => {
    const value = slider.value;
    updateRange(slider, tooltip, value);
  
    const width_value = Math.floor(Math.min(500, parseInt(value) / parseFloat(a_projector_throw_min.textContent)));
    updateRange(width_slider, width_tooltip, width_value);
  
    input.value = value;
    screen_width_input.value = width_value;
    width_slider.value = width_value;
  };
  
  width_slider.addEventListener('input', () => {
    updateWidthTooltip(width_slider, width_tooltip, screen_width_input);
  });
  
  screen_width_input.addEventListener('input', () => {
    const val = parseInt(screen_width_input.value);
    
    if (val > 500) screen_width_input.value = "500";
    else if (val < 0) screen_width_input.value = "0";
  
    const value = screen_width_input.value;
    updateRange(width_slider, width_tooltip, value);
    width_slider.value = value;
  
    const min_throw = a_projector_throw_min.textContent;
    let min_throw_int = 0;
    if(min_throw != "")
      min_throw_int = parseFloat(min_throw);
    
    const throw_value = Math.floor(Math.min(1000, parseFloat(value) * min_throw_int));
    updateRange(throw_slider, throw_tooltip, throw_value);
    screen_throw_input.value = throw_value;
    throw_slider.value = throw_value;
  });
  
  throw_slider.addEventListener('input', () => {
    updateThrowTooltip(throw_slider, throw_tooltip, screen_throw_input);
  });
  
  screen_throw_input.addEventListener('input', () => {
    const val = parseInt(screen_throw_input.value);
    
    if (val > 1000) screen_throw_input.value = "1000";
    else if (val < 0) screen_throw_input.value = "0";
  
    const value = screen_throw_input.value;
    updateRange(throw_slider, throw_tooltip, value);
    throw_slider.value = value;
  
    const min_throw = getMinThrow();
    let min_throw_int = 0;
    if(min_throw != "")
      min_throw_int = parseFloat(min_throw);
    
    const width_value = Math.floor(Math.min(500, parseFloat(value) / min_throw_int));
    updateRange(width_slider, width_tooltip, width_value);
    screen_width_input.value = width_value;
    width_slider.value = width_value;
  });
    
  });
  
  