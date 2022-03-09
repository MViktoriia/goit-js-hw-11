import Notiflix from 'notiflix';
import './sass/main.scss';
import PixabayApiService from './js/api/pixabayApi';
import imageCardTamplate from './js/components/imageCard.hbs' 
import LoadMoreBtn from './js/components/load-more-btn';


const ref = {
    formEl: document.querySelector(".search-form"),
    galleryEl: document.querySelector(".gallery"),
    // loadMoreBtn: document.querySelector(".load-more")    
}
const loadMoreBtn = new LoadMoreBtn({selector: ".load-more", hidden: true,});
const pixabayApiService = new PixabayApiService;

ref.formEl.addEventListener("submit", formSubmitHandler);
loadMoreBtn.refs.button.addEventListener("click", onLoadMoreClick);


function formSubmitHandler(event) {
    event.preventDefault();
    
    clearGalleryContainer();
    pixabayApiService.query = event.target[0].value;

    loadMoreBtn.show();
    loadMoreBtn.disable();

    pixabayApiService.resetPage();
    pixabayApiService.getImages().then(data => {
        if (data.length === 0) {
    
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");            
        }
        renderImages(data);
        loadMoreBtn.enable();
    });

}

function onLoadMoreClick () {
    loadMoreBtn.disable;
    pixabayApiService.getImages().then(data => {
        renderImages(data);
        loadMoreBtn.enable();
    });

}

function renderImages(images) {
    const imageList = images.map(image => {
        const { webformatURL, tags, likes, views, comments, downloads } = image;
        return { webformatURL, tags, likes, views, comments, downloads };
    });

    ref.galleryEl.insertAdjacentHTML("beforeend", imageCardTamplate(imageList)); 
        
}

function clearGalleryContainer() {
    ref.galleryEl.innerHTML = "";

}