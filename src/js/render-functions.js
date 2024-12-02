export function createMarkUp(arr) {
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
    <span class="loader"></span>
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
      style="display: none;"
      onload="this.style.display='block'; this.previousElementSibling.style.display='none';"
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

export function showLoadingMessage(loadingMessage) {
  loadingMessage.style.display = 'block';
}

export function hideLoadingMessage(loadingMessage) {
  loadingMessage.style.display = 'none';
}
