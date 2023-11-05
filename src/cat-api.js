import axios from 'axios';

const API_KEY =
  'live_HgDkXwnDoC1nYgOYwMvyw8sz3SXrfNKGcXoHyaWqZ7cKjzY5EEkt4g7hCXzQWfca';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchCatByBreed(breedId) {
  // ф-ція ствоює запит на сервер і повертає детальну інформацію про вибранку породу користувачем.

  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/images/search?';
  const PARAMS = `breed_ids=${breedId}`;
  const URL = BASE_URL + END_POINT + PARAMS; // збираю до купи всю url адресу
  //  console.log(URL);

  return axios
    .get(URL)
    .then(response => {
      // console.log(response.data[0])
      return response.data[0];
    })
    .catch(err => {
      console.log(`cat request: ${err}`);
    });
}

export function fetchBreeds() {
  // ф-ція робить запит на сервер і повертає масив об`єктів (повертає як проміс, тому далі результат її виклику треба буде ще розпарсити через then)
  const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(BREEDS_URL) // замість fetch використувуємо axios. синтксис хожий але розпарсувти не треба в json. відповідто трохи менше коду.
    .then(resp => {
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
      console.log(`error: ${err}`);
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
