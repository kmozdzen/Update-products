const format_buttons = document.querySelectorAll(".spectator-distance-screen-type-button");
const spectator_distance_width_input = document.getElementById("spectator-distance-width-input");
const spectator_distance_calculate_button = document.getElementById("spectator-distance-calculate-button");
const spectator_distance_max_viewing = document.getElementById("spectator-distance-max-viewing");
const color_before_click = "white";
const color_after_click = "#303C4B";

const max_viewing_factor_16_9 = 4.524; // Współczynnik dla 16:9
const max_viewing_factor_16_10 = 4.404; // Współcznnik dla 16:10
const max_viewing_factor_4_3 = 4.152; // Współczynnik dla 4:3
const max_viewing_factor_1_1 = 3.672; // Współczynnik dla 1:1
const inch_to_cm = 2.54; // Przelicznik cali na cm

let clicked_button = ""; // 

format_buttons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.style.backgroundColor != color_after_click){
            button.style.backgroundColor=color_after_click;
            //white
            
            clicked_button = button.innerText;
            format_buttons.forEach(button => {
                if(button.innerText != clicked_button){
                    button.style.backgroundColor = color_before_click;
                    //black 
                }
            });  
        }   
    });
});

spectator_distance_width_input.addEventListener('input', () => {
    const val = parseInt(spectator_distance_width_input.value);
    
    //ograniczenie zakresu wpisywania 0 - 500
    if (val > 500) spectator_distance_width_input.value = "500";
    else if (val < 0) spectator_distance_width_input.value = "0";
  
    let value = spectator_distance_width_input.value;
    if(value === '')
      value = 0;
  }); 

// pozwala jedynie na prowadzenie cyfr i kropek
spectator_distance_width_input.addEventListener('keypress', (e) => {
    if (!/^\d$/.test(e.key)) {
        e.preventDefault();
    }
});

// obliczanie odległości widza od ekranu
spectator_distance_calculate_button.addEventListener("click", () => {
    
    format_buttons.forEach(button => {
        if(button.style.backgroundColor == color_after_click){
            let max_viewing_factor = 0;

            if(button.innerText == "16:9"){
                 max_viewing_factor = max_viewing_factor_16_9;
            } else if(button.innerText == "16:10"){
                 max_viewing_factor = max_viewing_factor_16_10;
            } else if(button.innerText == "4:3"){
                 max_viewing_factor = max_viewing_factor_4_3;
            } else if(button.innerText == "1:1"){
                 max_viewing_factor = max_viewing_factor_1_1;
            } 

            const max_viewing = spectator_distance_width_input.value * max_viewing_factor * inch_to_cm;
            spectator_distance_max_viewing.value = Math.round(max_viewing);
        }
        
    });
});