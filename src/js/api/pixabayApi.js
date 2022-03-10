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

    }

    getImages() {
        return axios.get(`${PIXABAY_API_URL}?key=${pixabayApiKey}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`).then(response => {
            // const data = response.data.hits;
    
            this.incrementPage();
            console.log(response.data);
            // console.log(data);
            return response;       
            
        }).catch(error => console.log(error));
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
