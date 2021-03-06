import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';
import PixabayApiService from './js/api/pixabayApi';
import imageCardTamplate from './js/components/imageCard.hbs';
import LoadMoreBtn from './js/components/load-more-btn';

const ref = {
    formEl: document.querySelector(".search-form"),
    galleryEl: document.querySelector(".gallery"),    
}

const loadMoreBtn = new LoadMoreBtn({selector: ".load-more", hidden: true,});
const pixabayApiService = new PixabayApiService;
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

ref.formEl.addEventListener("submit", formSubmitHandler);
loadMoreBtn.refs.button.addEventListener("click", onLoadMoreClick);

function formSubmitHandler(event) {
    event.preventDefault();
    
    clearGalleryContainer();
    pixabayApiService.query = event.target[0].value;

    loadMoreBtn.show();
    loadMoreBtn.disable();

    pixabayApiService.resetPage();
    pixabayApiService.getImages().then(response => {
        const data = response.data.hits;
        const totalHits = response.data.totalHits;
        if (data.length === 0) {
    
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            loadMoreBtn.hide();
            event.target.reset();
            return;            
        }
        renderImages(data);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        lightbox.refresh();
        loadMoreBtn.enable();
    }).catch(error => console.log(error));

}

function onLoadMoreClick () {
    loadMoreBtn.disable;
    console.log(pixabayApiService.page);
    pixabayApiService.getImages().then(response => {
        const data = response.data.hits;
        const totalData = response.data.totalHits;
        
        console.log((pixabayApiService.page)  * data.length - totalData);
                
        if (((pixabayApiService.page  * data.length - totalData) > data.length) || (data.length === 0)) {
    
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            loadMoreBtn.hide();
            return;            
        }
                
        renderImages(data);
        smoothScroll();
        lightbox.refresh();
        loadMoreBtn.enable();
    
    }).catch(error => console.log(error));

}

function renderImages(images) {
    const imageList = images.map(image => {
        const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
        return { largeImageURL, webformatURL, tags, likes, views, comments, downloads };
    });

    ref.galleryEl.insertAdjacentHTML("beforeend", imageCardTamplate(imageList));
            
}

function clearGalleryContainer() {
    ref.galleryEl.innerHTML = "";
    loadMoreBtn.hide();

}

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}