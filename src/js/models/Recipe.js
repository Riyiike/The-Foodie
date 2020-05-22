import axios from 'axios';
import {
    key,
    proxy
} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${key}`);
            this.title = res.data.title;
            this.author = res.data.sourceName;
            this.url = res.data.sourceUrl;
            this.ingredients = res.data.ingredients;
            this.img = res.data.image;
            console.log(res);
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        //Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        //this element is each of the element of the array
        const newIngredients = this.ingredients.map(el => {

            //1) Uniform units
            let ingredients = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });
            //2) Remove parentheses
            ingredients = ingredient.replace( /*\([^)]*\) */ g, '');

            //3) Parse ingredients into count, unit and ingredient 

            return ingredient;

        });
        this.ingredients = newIngredients;
    }

}