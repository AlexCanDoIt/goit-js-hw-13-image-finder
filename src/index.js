import './sass/styles.scss';
import refs from './js/refs';
import ApiService from './js/api-service';
import imageCardTpl from './temptates/image-card.hbs';

const debounce = require('lodash.debounce');
const apiService = new ApiService();
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '1px',
  threshold: 1.0,
});

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
  apiService.query = e.target.value;

  if (apiService.query === '') {
    return alert('Введи что-то нормальное!');
  }

  observer.unobserve(refs.anchor);
  apiService.resetPage();
  clearGallery();
  fetchImages();
}

function fetchImages() {
  apiService.fetchImages().then(images => {
    appendImagesMarkup(images);
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageCardTpl(images));
  observer.observe(refs.anchor);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchImages();
    }
  });
}
