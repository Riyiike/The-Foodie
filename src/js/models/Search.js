import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '877c0683ee3d476fa05e6c3a2a8e5c5e';
        try {
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/search?query=${this.query}&apiKey=${key}`);
            this.result = res.data.results;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}