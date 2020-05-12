import axios from 'axios';
import {
    key,
    proxy
} from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/search?query=${this.query}&apiKey=${key}`);
            //const res = await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${key}`);
            //this.result = res.data.hits;
            this.result = res.data.results;
            // data.results is my data results./console.log(this.result)to see;
        } catch (error) {
            alert(error);
        }
    }

}