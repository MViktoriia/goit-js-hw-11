import Notiflix from 'notiflix';
import './sass/main.scss';
import { getImages } from './js/api/pixabayApi';
import imageCardTamplate from './js/components/imageCard.hbs' 

const ref = {
    formEl: document.querySelector(".search-form"),
    galleryEl: document.querySelector(".gallery")    
}

ref.formEl.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(event) {
    event.preventDefault();

    const searchTerm = event.target[0].value;
    console.log(searchTerm);

    getImages(searchTerm).then(response => {
        const data = response.data.hits;

        if (data.length === 0) {

            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");            
        }
        
        console.log(data);
        renderImages(data);
        
    }).catch(error => console.log(error));

}

function renderImages(images) {
    const imageList = images.map(image => {
        const { webformatURL, tags, likes, views, comments, downloads } = image;
        return { webformatURL, tags, likes, views, comments, downloads };
    });

    ref.galleryEl.innerHTML = imageCardTamplate(imageList);
        
}