//SKRPYT DO KALKULATORA
document.addEventListener('DOMContentLoaded', function() {
    const selectRatio = document.getElementById('select-ratio');
    const widthInput = document.getElementById('width-input');
    const diagonalInput = document.getElementById('diagonal-input');
    const selectCategory = document.getElementById('select-category');
     
    const searchButton = document.getElementById('search-button');
    if(searchButton){
      searchButton.onclick = function(){
       if(!isNaN(widthInput.value) && widthInput.value !== ''){
         category = selectCategory.value;
         let width = '';
         let ratio = '';
         if(category == 'ekran_ramowy_przenosny' || category == 'pl/c/Ekrany-ramowe/42'){
           width = getWidthFrame(parseFloat(widthInput.value));
           ratio = getRatioFrame(selectRatio.value);
         }
         else{
           width = getWidth(parseFloat(widthInput.value));
           ratio = getRatio(selectRatio.value);
         }
         var URL = 'https://www.ekrany.pl/' + category + '/1/default/1/' + width + '/1/' + ratio + '/1';
         // category/1/default/1/width/1/ratio/1
         window.open(URL, '_blank');
       } 
      }
    }
   
    
    // Funkcja do pobierania zakresu szerokości z filtra
    function getWidth(width){
      if(width <= 200){
        return 'f_at_144_184';
      }
      if(width > 200 && width <= 240){
        return 'f_at_144_179';
      }
      else if(width > 240 && width <= 280){
        return 'f_at_144_181';
      }
      else if(width > 280 && width <= 320){
        return 'f_at_144_182';
      }
      else if(width > 320 && width <= 360){
        return 'f_at_144_183';
      }
      else if(width > 360 && width <= 400){
        return 'f_at_144_185';
      }
      else if(width > 400 && width <= 440){
        return 'f_at_144_186';
      }
      else if(width > 440 && width <= 480){
        return 'f_at_144_187';
      }
      else if(width > 480){
        return 'f_at_144_188';
      }
      return 'error';
    }
    
     // Funkcja do pobierania formatu z filtra
    function getRatio(ratio){
      if(ratio == '4:3'){
        return 'f_at_28_66';
      }
      else if(ratio == '16:9'){
        return 'f_at_28_67';
      }
      else if(ratio == '16:10'){
        return 'f_at_28_68';
      }
      else if(ratio == '1:1'){
        return 'f_at_28_69';
      }
      return 'error';
    }
    
     // Funkcja do pobierania zakresu szerokości z filtra dla ekranów ramowych
    function getWidthFrame(width){
      if(width <= 200){
        return 'f_at_145_189';
      }
      if(width > 200 && width <= 240){
        return 'f_at_145_190';
      }
      else if(width > 240 && width <= 280){
        return 'f_at_145_191';
      }
      else if(width > 280 && width <= 320){
        return 'f_at_145_192';
      }
      else if(width > 320 && width <= 360){
        return 'f_at_145_193';
      }
      else if(width > 360 && width <= 400){
        return 'f_at_145_194';
      }
      else if(width > 400 && width <= 440){
        return 'f_at_145_195';
      }
      else if(width > 440 && width <= 480){
        return 'f_at_145_196';
      }
      else if(width > 480){
        return 'f_at_145_197';
      }
      return 'error';
    }
    
     // Funkcja do pobierania formatu z filtra dla ekranów ramowych
    function getRatioFrame(ratio){
      if(ratio == '4:3'){
        return 'f_at_39_85';
      }
      else if(ratio == '16:9'){
        return 'f_at_39_86';
      }
      else if(ratio == '16:10'){
        return 'f_at_39_87';
      }
   
      return 'error';
    }
    
    // Aktualizowanie inputów
    function updateWidthInputs() {
      const widthRatio = getWidthRatio();
      const heightRatio = getHeightRatio();
      setDiagonalInput(widthRatio, heightRatio);
    }
    
    function updateDiagonalInputs() {
      const widthRatio = getWidthRatio();
      const heightRatio = getHeightRatio();
      setWidthInput(widthRatio, heightRatio);
    }
    
    
    widthInput.addEventListener('change', updateWidthInputs);
  
    widthInput.addEventListener('input', function() {
      updateWidthInputs();
    });
    
    diagonalInput.addEventListener('change', updateDiagonalInputs);
  
    diagonalInput.addEventListener('input', function() {
      updateDiagonalInputs();
    });
    
    selectRatio.addEventListener('change', updateWidthInputs);
      
    selectRatio.addEventListener('input', function() {
      updateWidthInputs();
    });
    
    //Ustawianie szerokości w polu input
    function setWidthInput(widthRatioInt, heightRatioInt){
       // Sprawdzamy czy wartość w polu height jest liczbą i czy nie jest pusta
        if(!isNaN(diagonalInput.value) && diagonalInput.value !== '') {     
          // Parsujemy wartość wysokości na liczbę
          const height = parseFloat(calculateHeightFromDiagonal(diagonalInput.value, widthRatioInt, heightRatioInt));
          // Obliczamy wysokość i aktualizujemy pole heightInput
          widthInput.value = floatRound(calculateWidth(height, widthRatioInt, heightRatioInt));
        } else {
          // Jeśli pole heightInput jest puste lub nie zawiera liczby, ustawiamy pole widthInput na puste
          widthInput.value = '';
        }
      }
    
    //Ustawianie przekątnej w polu input
    function setDiagonalInput(widthRatioInt, heightRatioInt){
       // Sprawdzamy czy wartość w polu widthInput jest liczbą i czy nie jest pusta
        if(!isNaN(widthInput.value) && widthInput.value !== '') {
          // Parsujemy wartość szerokości na liczbę
          const width = parseFloat(widthInput.value);
          // Obliczamy przekątną i aktualizujemy pole heightInput
          diagonalInput.value = floatRound(calculateDiagonal(width, widthRatioInt, heightRatioInt));
        } else {
          // Jeśli pole widthInput jest puste lub nie zawiera liczby, ustawiamy pole heightInput na puste
          diagonalInput.value = '';
        }
      }
    
    // Do wyciąganie ratio
    function getHeightRatio(){
      const heightRatio = getSubstringAfterColon(selectRatio.value);
      return parseInt(heightRatio);
    }
  
    function getWidthRatio(){
      const widthRatio = getSubstringBeforeColon(selectRatio.value);
      return parseInt(widthRatio);
    }
  });
   
  // Do wyciągania szerokości z ratio np. "16:10" -> 16
  function getSubstringBeforeColon(str) {
    const colonIndex = str.indexOf(':');
    if (colonIndex !== -1) {
      return str.substring(0, colonIndex);
    }
    return str;
  }
    
  // Do wyciągania wysokości z ratio np. "16:10" -> 10
  function getSubstringAfterColon(str) {
    const colonIndex = str.indexOf(':');
    if (colonIndex !== -1) {
      return str.substring(colonIndex+1, str.length);
    }
    return str;
  }
  
  // Obliczanie wysokości z ratio i szerokości np. 4:3 i 5 -> 3.75
  function calculateHeight(width, widthRatio, heightRatio) {
    return width*heightRatio/widthRatio;
  }
  
  // Obliczanie szerokości z ratio i wysokosci np. 4:3 i 5 -> 6.67
  function calculateWidth(height, widthRatio, heightRatio) {
    return height*widthRatio/heightRatio;
  }
  
  // Obliczanie przekątnej z wysokości i szerokości np. 10 i 7.5 -> 12.50
  function calculateDiagonal(width, widthRatio, heightRatio) {
    const height = calculateHeight(width, widthRatio, heightRatio);
    return Math.sqrt(width*width + height*height);
  }
  
  // Obliczanie wysokości z przekątnej i ratio
  function calculateHeightFromDiagonal(diagonal, widthRatio, heightRatio) {
    return diagonal / Math.sqrt(Math.pow(widthRatio / heightRatio, 2) + 1);
  }
  
  // Zaokrąglanie do 2 miejsc po przecinku
  function floatRound(number){
    return number.toFixed(2);
  }
  
  /*-------------------------------------------------------------------------*/
  // SKRYPT DO USUWANIA "Szerokość projekcyjna" z tabeli
  document.addEventListener('DOMContentLoaded', function() {
      const rows = document.querySelectorAll('table tr');
   
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
          if (cell.textContent.includes('Szerokość projekcyjna')) {
            row.style.display = 'none';;
          }
        });
      });
  });
  /*
  // SKRYPT DO POKAZYWANIA KALKULATORA NA STRONIE NA PODSTAWIE NAZWY STRONY - Kalkulator - Ekrany.pl
      document.addEventListener('DOMContentLoaded', function() {
        const pageTitle = document.title;
  
        if (pageTitle.includes('Kalkulator - Ekrany.pl')) {
          const calculatorContainer = document.querySelector('.calculator-container');
  
          if (calculatorContainer) {
            calculatorContainer.style.display = 'flex';
          }
        }
      });
  */
  
  // SKRYPT DO USUWANIA WYŚWIETLANIA SIĘ 1 Z KATEGORI Z MENU -- 'Ekran' i 'Projektor'
  document.addEventListener('DOMContentLoaded', function() {
      const rows = document.querySelectorAll('.submenu.level1 ul.level1 li');
  
      rows.forEach(row => {
          const span = row.querySelector('span');
          if (span && span.textContent.trim() === 'Ekran' || span && span.textContent.trim() === 'Projektor') {
              row.style.display = 'none';
          }
      });
  });
  
  // SKRYPT DO USUWANIA WYŚWIETLANIA SIĘ 1 Z KATEGORI Z MENUBOX -- 'Ekran' i 'Projektor'
  document.addEventListener('DOMContentLoaded', function() {
      const rows = document.querySelectorAll('.box ul li');
  
      rows.forEach(row => {
            const a = row.querySelector('a');
            const name = a.textContent.trim();  
            if (a && name === 'Ekran' || a && name === 'Projektor') {
              row.style.display = 'none';
          }
      });
  });
  
  //SKRYPT DO PRZESKAKIWANIA ELEMENTÓW DO NOWYCH KOLUMN W MENU
  document.addEventListener('DOMContentLoaded', function() {
    const menulist = document.querySelectorAll('.menu-list > li');
    const maxHeight = 900; // Ustalona wysokość kolumny
    
    menulist.forEach(menuli => {
      const container = menuli.querySelector('.jm-categories');
      if (!container) return
      const originalList = menuli.querySelector('ul.level1');
      if (!originalList) return
  
      // Usuwanie niepotrzebnych podkategorii, wyskakiwało na ekranie 900x700 pod menu
      const subcategories = container.nextElementSibling;
      if (subcategories) 
          subcategories.style.display = "none";
      
      const items = Array.from(originalList.children);
      const baseColumn = createBaseColumn(container);
      let currentColumn = createNewColumn(baseColumn);
  
      let currentHeight = 0;
  
      items.forEach(item => {
        container.appendChild(item);
        const itemHeight = item.offsetHeight;
        container.removeChild(item);
  
        if (currentHeight + itemHeight > maxHeight) {
          currentColumn = createNewColumn(baseColumn);
          currentHeight = 0;
        }
  
        currentColumn.appendChild(item);
        currentHeight += itemHeight;
      });
  
      function createBaseColumn(container) {
        const column = document.createElement('ul');
        column.classList.add('base-column');
        container.appendChild(column);
        return column;
      }
  
      function createNewColumn(container) {
        const column = document.createElement('ul');
        column.classList.add('grid-column');
        container.appendChild(column);
        return column;
      }
    });
  });
  
   //SKRYPT DO OBLICZANIA ODLEGLOSCI OD EKRANU
  document.addEventListener('DOMContentLoaded', function() {
    const select_producer = document.querySelector('#projector-distance-select-producer');
    const select_model = document.querySelector('#projector-distance-select-model');
    const projector_view = document.querySelector('.projector-view');
    const projector_name = document.querySelector('#projector-content-name');
    const projector_resolution = document.querySelector('#projector-content-resolution');
    const projector_ratio = document.querySelector('#projector-content-ratio');
    const projector_image = document.querySelector('.projector-image');
    
   const options = {
      "Epson": {
        "EB-L520U": {
          image: 'https://www.ekrany.pl/userdata/public/gfx/6974/EB-L52U.jpg',
          resolution: '1920x1200 (WUXGA)',
          ratio: '16:9',
          'lens-min': '2.92',
          'lens-max': '4.73'
        }
      },
      "Optoma": {
        "UHD35X": {
          image: 'https://www.ekrany.pl/userdata/public/gfx/4491/glw.jpg',
          resolution: '3840x2160 (UHD)',
          ratio: '16:9',
          'lens-min': '1.47',
          'lens-max': '1.62'
        }
      }
    };
    
    select_producer.addEventListener("change", () => {
      const producer = select_producer.value;
      select_model.disabled = !producer;
      projector_view.style.display = "none";
      select_model.innerHTML = "";
      select_model.innerHTML = '<option value="wybierz">Wybierz...</option>';
      
      if (producer && options[producer]) {
        Object.keys(options[producer]).forEach(model => {
          addOption(model);
        });
        if(select_producer.value == 'wybierz'){
          projector_view.style.display = "none";
        }
      }
    });
    
    select_model.addEventListener("change", () => {
      if(select_model.value != 'wybierz'){
        getProjectorInfo();
        projector_view.style.display = "flex";
      }
      else{
        projector_view.style.display = "none";
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
        projector_ratio.textContent = `Proporcje: ${projector.ratio}`;
      }
    }
  });