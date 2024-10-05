import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const API_KEY = '46256747-1d18669c2152ad7d06c950e83';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

function createImageCard(image) {
  return `
    <div class="gallery-item">
      <a href="${image.largeImageURL}">
        <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="div-info">
        <div class="img-info">
        <span class="name">Likes</span>
        <span class="value">${image.likes}</span>
        </div>
        <div class="img-info">
        <span class="name">Views</span>
        <span class="value">${image.views}</span>
        </div>
        <div class="img-info">
        <span class="name">Comments</span>
        <span class="value">${image.comments}</span>
        </div>
        <div class="img-info">
        <span class="name">Downloads</span>
        <span class="value">${image.downloads}</span>
        </div>
      </div>
    </div>
  `;
}

function showLoader() {
  document.querySelector('.loading-spinner').style.display = 'block';
}

function hideLoader() {
  document.querySelector('.loading-spinner').style.display = 'none';
}

const PER_PAGE = 40;
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

function buildApiUrl(queryInput, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: queryInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page: page,
  });

  return `${BASE_URL}?${params.toString()}`;
}

function createGallery(images) {
  const imagesMarkup = images.map(image => createImageCard(image)).join('');
  gallery.insertAdjacentHTML('beforeend', imagesMarkup);
}

function useLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

async function fetchImages(queryInput, page) {
  try {
    showLoader();
    const url = buildApiUrl(queryInput, page);
    const response = await axios.get(url);
    hideLoader();

    const images = response.data.hits;
    totalHits = response.data.totalHits;

    if (images.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(images);
    useLightbox();

    if (page * PER_PAGE < totalHits) {
      loadMore.style.display = 'block';
    } else {
      loadMore.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    hideLoadingSpinnerMore();
  } catch (error) {
    console.log(error);
    hideLoader();
    hideLoadingSpinnerMore();
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const queryInput = form.querySelector('.search-input').value.trim();

  currentQuery = queryInput;
  currentPage = 1;
  gallery.innerHTML = '';

  showLoader();

  fetchImages(currentQuery, currentPage);
});

const loadingSpinnerMore = document.querySelector('.loading-spinner-more');

function showLoadingSpinnerMore() {
  loadingSpinnerMore.style.display = 'block';
}

function hideLoadingSpinnerMore() {
  loadingSpinnerMore.style.display = 'none';
}
loadMore.addEventListener('click', () => {
  currentPage += 1;
  showLoadingSpinnerMore();
  fetchImages(currentQuery, currentPage);
  //   hideLoadingSpinnerMore();
});
