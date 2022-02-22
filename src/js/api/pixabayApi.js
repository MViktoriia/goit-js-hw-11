import axios from "axios";
import apiSettings from './settings';

const { pixabayApiKey, PIXABAY_API_URL } = apiSettings;


export const getImages = (searchTerm, page = 1) => {
    return axios.get(`${PIXABAY_API_URL}?key=${pixabayApiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
};
