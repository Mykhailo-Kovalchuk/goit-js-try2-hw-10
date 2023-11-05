
import { fetchBreeds, fillBreedsSelect, fetchCatByBreed, catMarkup, loaderShow, loaderHide, errorWrongShow, errorWrongHide } from "./cat-api.js";
import SlimSelect from 'slim-select';



fetchBreeds().then(breedArray => { 
  
    // console.log(breedArray);
    fillBreedsSelect(breedArray);

    new SlimSelect({
      select: '.breed-select'
    });
  });

  const breedSelect = document.querySelector('.breed-select');


  // const breedSelect = document.querySelector('.breed-select');
  // const breedSelect = new SlimSelect(".breed-select"); // ініціація Слім бібліотеки
  const catInfo = document.querySelector('.cat-info');
  catInfo.style.paddingTop = 20 + "px";
  catInfo.style.display = 'flex';
  catInfo.style.flexDirection = 'row';
  catInfo.style.gap = 20 + "px"

  breedSelect.addEventListener('change', handler);
  // breedSelect.on('change', handler); // Використовуємо метод "on" бібліотеки Slim Select для обробки події зміни вибору


  function handler() {
    const selectedBreedId = breedSelect.value;
    // const selectedBreedId = breedSelect.selected(); // Отримуємо вибране значення з використанням Slim Select
    // console.log(selectedBreedId)

    loaderShow();

    
   fetchCatByBreed(selectedBreedId)
   .then(catData => { 
    loaderHide();
    catInfo.innerHTML = catMarkup(catData);

   })
   .catch(err => {
    console.error(`Error fetching cat data: ${err}`);
    loaderHide();
    errorWrongShow();
    
  });

  }





