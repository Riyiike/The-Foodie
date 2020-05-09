import axios from 'axios';
import {
    key,
    proxy,
    app_id
} from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        // const proxy = 'https://cors-anywhere.herokuapp.com/';
        // const spoonacularKey = '877c0683ee3d476fa05e6c3a2a8e5c5e';
        //const key = 'e73763935af70ea5fcfaa91c7675d76b';
        // const app_id = '67259000';
        try {
            //const res = await axios(`${proxy}https://api.spoonacular.com/recipes/search?query=${this.query}&apiKey=${key}`);
            const res = await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${key}`);
            this.result = res.data.hits;
            // this.result = res.data.results;
            // data.results is my data results./console.log(this.result)to see;
        } catch (error) {
            alert(error);
        }
    }

}