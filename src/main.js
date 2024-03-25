import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import request from './js/pixabay-api';
import createContent from './js/render-functions';

const formForSearch = document.querySelector('.form');
const inputFormForSearch = document.querySelector('.form-input');
const gallary = document.querySelector('.gallary');


formForSearch.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  const wordForSearch = inputFormForSearch.value.trim();

  if (!wordForSearch) return;

  gallary.innerHTML = '<span class="loader"></span>';

  request(wordForSearch)
    .then(resultOfSearch => {
      if (resultOfSearch.hits.length === 0) {
        gallary.innerHTML = '';
        inputFormForSearch.value = '';
    
        iziToast.error({
          close: false,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          progressBar: false,
        });
        return;
      }
      
      gallary.innerHTML = createContent(resultOfSearch);
      inputFormForSearch.value = '';

      const lightbox = new SimpleLightbox('.gallary-item-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      lightbox.refresh();
    })
    .catch(error => console.log(error));
}