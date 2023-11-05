import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY =  'live_HgDkXwnDoC1nYgOYwMvyw8sz3SXrfNKGcXoHyaWqZ7cKjzY5EEkt4g7hCXzQWfca';
axios.defaults.headers.common['x-api-key'] = API_KEY;




export function fetchCatByBreed(breedId) { // ф-ція ствоює запит на сервер і повертає детальну інформацію про вибранку породу користувачем. 
   
    const BASE_URL = "https://api.thecatapi.com"; 
    const END_POINT = "/v1/images/search?";
    const PARAMS = `breed_ids=${breedId}`;
    
    const URL = BASE_URL + END_POINT + PARAMS; // збираю до купи всю url адресу 
  //  console.log(URL);
   
  //  loaderShow();
  //  errorWrongHide();

    return axios.get(URL)
    .then(response => {
      loaderHide();
      errorWrongHide();
        // console.log(response.data[0])
        
        return response.data[0];
    }

    )
    .catch(err => {
        loaderHide();
      errorWrongShow();
      console.log(`cat request: ${err}`)})
}





export function catMarkup({id, url, breeds }) { // відмальовую розмітку для інформації про кота
  // breeds це властивість яка являє собою масив з 1 елементу, в якому є 1 об`єкт в якому є інші необхідні нам властивосьі з даними про кота.
  
 const { name, description, temperament, wikipedia_url } = breeds.flat()[0]; // тому тут я розгладжую масив і одразу деструктуризую об`єкт який в ньому зберігається дістаючи звідти необхідні властивості (довго до цього приходив)

 // Далі повертаємо розмітку
    return ` 
   <div id="${id}">
      <img src="${url}" alt="${name}" width="600"></div>
      <div style="max-width: 600px">
        <p><b>Name:</b> <span style="font-size: 20px;">${name}</span></p>
        <p><b>Desctiption:</b> ${description}</p>
        <p><b>Temperament:</b> ${temperament}</p>
        <p>Read more: <a href="${wikipedia_url}" target="_blank">${name} on Wikipedia</a></p>
      </div>
  `
}




export function fetchBreeds() { // ф-ція робить запит на сервер і повертає масив об`єктів (повертає як проміс, тому далі результат її виклику треба буде ще розпарсити через then)
  const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
loaderShow();
errorWrongHide();

  return axios
    .get(BREEDS_URL) // замість fetch використувуємо axios. синтксис хожий але розпарсувти не треба в json. відповідто трохи менше коду.
    .then(resp => {
      
      loaderHide();
      errorWrongHide();
      //   if(!resp.ok){   // при fetch ця умова перевірки потрібна, але при axios - ні (якм мінімум тому що axios не повертає  ok, a status)
      //     throw new Error('error')
      //   }
      
      // console.log(resp);
      // console.log(resp.data);
      // console.log(resp.data.forEach(element => {
      //     console.log(element)
      // }))
      
      return resp.data;
    })
    .catch(err => {
      loaderHide();
      errorWrongShow();
      console.log(`error: ${err}`)
    
    });

  //     return fetch(BREEDS_URL)  // Ось спосіб через fetch
  //     .then(response => {
  //         if(!response.ok) {
  //             throw new Error('upsss eror')
  //         }
  //         return response.json()})
  //     .then(data => {
  //         console.log(data)
  //     return data;
  //     })
  // .catch(err => console.log(err))
}




export function fillBreedsSelect(breeds) { // додає масив об`єктів в поле select, а далі ми вже задаємо опції як все буде відображатись і прийматись.
  breeds.forEach(breed => {
     // "перебираєио" кожен елемент (в нас елементом є об`єкт) масиву через forEach
    const option = document.createElement('option'); //створюємо на на кожному елементі новий елемент option (саме він буде "опцією" вибору для користувача) через який надалі будемо взаємодіяти з select та поточним об`єктом масиву. Будемо наповнювати нашу опцію властивостями.
    option.value = breed.id; // значенням нашої опції буде властивість "id" поточного об`єкту з масиву.
    option.textContent = breed.name; // Для користувача у селекті опція (як контент) буде відображатись властивіть 'name' з поточного об`єкту
 
    const breedSelect = document.querySelector('.breed-select');

    breedSelect.append(option); // після чого додаємо в наш елемент (тег select) нашу опцію з вищезазначеними умовами. 


    
  });
} // таким чином , грубо кажучи, наш селект наповнений кожним об`єктом з масиву і тепер доступний для вибору кожного з них користувачем.






// функції помічники для опрацювання завантажень

const loader = document.querySelector('.loader');
const errorWrong = document.querySelector('.error')

function loaderShow(){ // ф-ція показує завантаження
  loader.style.display = 'block'; // просто знову відображаю елемент. 
  // Notiflix.Notify.success('Loading data, please wait...');
}

function loaderHide(){ // ф-ція приховує завантаження
loader.style.display = 'none';
}

function errorWrongShow() { // ф-ція показує помилку
  // errorWrong.style.display = 'block';
  return  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'); // додав нотіфікашку про помилку, якшо виникне
}

function errorWrongHide() { // ф-ція приховує помилку
errorWrong.style.display = 'none';
}

export { loaderShow, loaderHide, errorWrongShow, errorWrongHide }; // експортую функції-помічники.
