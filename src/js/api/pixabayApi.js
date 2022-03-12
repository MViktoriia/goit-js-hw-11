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

    async getImages() {
        const response = await axios.get(`${PIXABAY_API_URL}?key=${pixabayApiKey}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
        this.incrementPage();
        console.log(response.data);
        return response;       
    
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
