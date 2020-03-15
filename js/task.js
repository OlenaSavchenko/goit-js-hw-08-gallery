import items from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.lightbox__image'),
  lightBox: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__content'),
  arrowLeft: document.querySelector('.arrow__btn-prev'),
  arrowRight: document.querySelector('.arrow__btn-next'),
};
let activeIndex;
let galleryLength;

refs.galleryList.addEventListener('click', onGalleryClick);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackDropClick);
refs.arrowLeft.addEventListener('click', onLeftArrowClick);
refs.arrowRight.addEventListener('click', onRightArrowClick);

function createGalleryItem(items) {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = items.original;

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = items.preview;
  galleryImage.alt = items.description;
  galleryImage.dataset.source = items.original;

  galleryLink.append(galleryImage);
  galleryItem.append(galleryLink);
  return galleryItem;
}
function appendGalleryItem() {
  const gallery = items.map(item => createGalleryItem(item));
  refs.galleryList.append(...gallery);
}
appendGalleryItem();

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const image = event.target;
  activeIndex = Number(image.dataset.index);
  onOpenModal(activeIndex);
}

function setLargeImage(index) {
  activeIndex = index;
  refs.largeImage.setAttribute('src', items[activeIndex].original);
}

function onOpenModal(index) {
  setLargeImage(index);
  refs.lightBox.classList.add('is-open');
  window.addEventListener('keydown', onPressKey);
}

function onCloseModal() {
  refs.lightBox.classList.remove('is-open');
  refs.largeImage.src = '';
  window.removeEventListener('keydown', onPressKey);
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressKey(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  } else if (event.code === 'ArrowLeft') {
    onLeftArrowClick();
  } else if (event.code === 'ArrowRight') {
    onRightArrowClick();
  }
}

function createIndex() {
  const galleryImages = document.querySelectorAll('.gallery__image');

  galleryImages.forEach((element, index) => (element.dataset.index = index));
  galleryLength = galleryImages.length;
}
createIndex();

function onLeftArrowClick() {
  const previousIndex = activeIndex === 0 ? galleryLength - 1 : activeIndex - 1;
  setLargeImage(previousIndex);
}

function onRightArrowClick() {
  const nextIndex = activeIndex === galleryLength - 1 ? 0 : activeIndex + 1;
  setLargeImage(nextIndex);
}
