import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

fetchBreeds().then(breedArray => { // одразу викликаю ф-цію яка робить запит і одразу розпарсую її і отримую масив значень з котами.
  console.log(breedArray);
  fillBreedsSelect(breedArray); // "не відходячи від каси" викликаю функцію яка прийме отриманий масив, після чого перебере його через forEach, після чого створимо опції для селекту, 
  // далі кожен елемент масиву передамо в опцію селекту і отримані опції через DOM-дерево закинемо в наш селект за допомогою append.

  new SlimSelect({ // знову ж таки одразу ініціюємо бібліотеку при виклику функції. Функція викликається одразу при завантаженні сторінки, а отже і наш селект починає взаємодіяти з бібліотекою одразу.  
    select: '.breed-select',
  });
});

const breedSelect = document.querySelector('.breed-select');

const catInfo = document.querySelector('.cat-info'); // задав трохи стилізації, щоб оку було приємніше.
catInfo.style.paddingTop = 20 + 'px';
catInfo.style.display = 'flex';
catInfo.style.flexDirection = 'row';
catInfo.style.gap = 20 + 'px';

breedSelect.addEventListener('change', handler); // вішаємо слухача на зміну в селекті

function handler() {
  catInfo.innerHTML = ''; // очищуємо розмітку перед наступним запитом

  const selectedBreedId = breedSelect.value;
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

function catMarkup({ id, url, breeds }) {  // відмальовую розмітку для інформації про кота
  // breeds це властивість яка являє собою масив з 1 елементу, в якому є 1 об`єкт в якому є інші необхідні нам властивості з даними про кота.

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
    `;
}

function fillBreedsSelect(breeds) {
  // додає масив об`єктів в поле select, а далі ми вже задаємо опції як все буде відображатись і прийматись.
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
const errorWrong = document.querySelector('.error');

loaderHide(); // одразу викликаю функцію, щоб в мене не крутилось кільце завантаження без потреби. 
function loaderShow() {
  // ф-ція показує завантаження
  loader.style.display = 'block'; // просто знову відображаю елемент.
  // Notiflix.Notify.success('Loading data, please wait...');
}

function loaderHide() {
  // ф-ція приховує завантаження
  loader.style.display = 'none';
}

function errorWrongShow() {
  // ф-ція показує помилку
  // errorWrong.style.display = 'block';

  catInfo.innerHTML = ''; // Коли виникне помилка, ми викличемо функцію errorWrongShow і вона очистить розмітку, після чого поверне сповіщення-нотифікашку.
  return Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  ); // додав нотіфікашку про помилку, якшо виникне
}

errorWrongHide();// одразу викликаю функцію, щоб приховати дефолтний теск.
function errorWrongHide() {
  // ф-ція приховує помилку (текст)
  errorWrong.style.display = 'none';
}
