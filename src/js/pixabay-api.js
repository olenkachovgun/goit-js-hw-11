// У файлі pixabay-api.js зберігай функції для HTTP-запитів.
const BASE_URL = 'https://pixabay.com/api/';
const API_key = '47377871-88caea6ffc61c5284332b3ad8';

export function fetchImages(search) {
  const params = new URLSearchParams({
    key: API_key,
    q: search,
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error('The link provided is incorrect.');
    }
    return response.json();
  });
}
