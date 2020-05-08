import axios from 'axios';
import {
    key,
    proxy
} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = iid;
    }
    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${key}`);
        } catch (error) {
            console.log(error);
        }
    }
}