import Notiflix from 'notiflix';
import './sass/main.scss';
import PixabayApiService from './js/api/pixabayApi';
import imageCardTamplate from './js/components/imageCard.hbs' 


const ref = {
    formEl: document.querySelector(".search-form"),
    galleryEl: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more")    
}

const pixabayApiService = new PixabayApiService;

ref.formEl.addEventListener("submit", formSubmitHandler);
ref.loadMoreBtn.addEventListener("click", onLoadMoreClick);


function formSubmitHandler(event) {
    event.preventDefault();
    
    pixabayApiService.query = event.target[0].value;

    pixabayApiService.getImages();

    ref.loadMoreBtn.classList.remove('visually-hidden');

}

function onLoadMoreClick () {
    pixabayApiService.getImages();
    // renderImages(data); 

}

function renderImages(images) {
    const imageList = images.map(image => {
        const { webformatURL, tags, likes, views, comments, downloads } = image;
        return { webformatURL, tags, likes, views, comments, downloads };
    });

    ref.galleryEl.innerHTML = imageCardTamplate(imageList);
        
}