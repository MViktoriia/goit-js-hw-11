import axios from "axios";
import apiSettings from './settings';

const { pixabayApiKey, PIXABAY_API_URL } = apiSettings;


// export const getImages = (searchTerm, page = 1) => {
//     return axios.get(`${PIXABAY_API_URL}?key=${pixabayApiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
// };

export default class PixabayApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
        console.log(this);
    }
    

    getImages() {
        return axios.get(`${PIXABAY_API_URL}?key=${pixabayApiKey}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`).then(response => {
            const data = response.data.hits;
    
            if (data.length === 0) {
    
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");            
            }

            this.page += 1;
            console.log(data);
            console.log(this);        
            
        }).catch(error => console.log(error));
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
