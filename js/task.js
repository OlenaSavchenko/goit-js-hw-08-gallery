import items from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.lightbox__image'),
  galleryImage: document.querySelector('.gallery__image'),
};

function createGalleryItem(items) {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = items.original;

  const galleryImage = document.createElement('img');
  galleryImage.src = items.preview;
  galleryImage.alt = items.description;
  galleryImage.classList.add('gallery__image');
  galleryImage.dataset.source = items.original;

  galleryLink.append(galleryImage);
  galleryItem.append(galleryLink);
  return galleryItem;
}

const createGallery = items.map(item => createGalleryItem(item));
refs.galleryList.append(...createGallery);

refs.galleryList.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const image = event.target;
  const largeImageURL = image.dataset.source;
  setLargeImageSrc(largeImageURL);
}

function setLargeImageSrc(url) {
  refs.largeImage.src = url;
}
