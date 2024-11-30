import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import errorImage from './img/error.svg';

const BASE_URL = 'https://pixabay.com/api/';
const API_key = '47377871-88caea6ffc61c5284332b3ad8';
const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const btnSeach = document.querySelector('.btn');
const loadingMessage = document.querySelector('.loading-message');
let search = '';
form.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  search = event.target.elements.search.value.trim();
  searchImages();
}

function searchImages() {
  const params = new URLSearchParams({
    key: API_key,
    q: search,
  });
  showLoadingMessage();
  fetch(`${BASE_URL}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      hideLoadingMessage();
      if (data.hits.length === 0) {
        gallery.innerHTML = '';

        iziToast.show({
          title: '',
          iconUrl: `${errorImage}`,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'white',
          messageSize: '16px',
          backgroundColor: 'red',
          position: 'topRight',
        });
      } else {
        gallery.innerHTML = createMarkUp(data.hits);
        galleryLightbox.refresh();
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      setTimeout(() => {
        form.reset();
      }, 1000);
    });
}

function createMarkUp(arr) {
  return arr
    .map(
      ({
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item" data-id="${id}">
          
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
    <ul class="list-infoImg">
    <li class="item-infoImg"><span>Likes</span>${likes}</li>
    <li class="item-infoImg"><span>Views</span>${views}</li>
    <li class="item-infoImg"><span>Comments</span>${comments}</li>
    <li class="item-infoImg"><span>Downloads</span>${downloads}</li>
    </ul>
  </a>
</li>`
    )
    .join('');
}
//use SimpleLightbox:
let galleryLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

galleryLightbox.on('error.simplelightbox', function (e) {
  console.log(e); // Some usefull information
});

function showLoadingMessage() {
  loadingMessage.style.display = 'block';
}
function hideLoadingMessage() {
  loadingMessage.style.display = 'none';
}
