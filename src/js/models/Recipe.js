import axios from 'axios';
import {
    key,
    proxy,
    app_id
} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://api.edamam.com/search?r=${this.id}&app_id=${app_id}&app_key=${key}`);
            //this.title = res.data.
            console.log(res);
            //https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_b79327d05b8e5b838ad6cfd9576b30b6&app_id=67259000&app_key=e73763935af70ea5fcfaa91c7675d76b
        } catch (error) {
            console.log(error);
        }
    }
}